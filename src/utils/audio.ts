// Dual-Track Audio Player for Lăng Kính Diệu Kì:
// 1. Nhạc nền trang chủ (BGM): /assets/audio/nhac-nen-trang-chu.mp3 (lặp vô tận, âm lượng nhẹ nhàng 0.38)
// 2. Lời thoại nhân vật (Voice): /assets/audio/loi-nhan-vat-trang-chu.MP3 (phát đúng 1 lần sau khi nhạc nền phát ~3s, âm lượng rõ nét 0.88)
// Tuyệt đối không dùng AI Speech / SpeechSynthesis. Quản lý singleton an toàn, không phát chồng.

export interface AudioPlaybackState {
  bgmPlaying: boolean;
  voicePlaying: boolean;
  autoplayBlocked: boolean;
  hasPlayedVoice: boolean;
}

class SoundManager {
  private bgmAudio: HTMLAudioElement | null = null;
  private voiceAudio: HTMLAudioElement | null = null;

  private bgmSrc: string = '/assets/audio/nhac-nen-trang-chu.mp3';
  private voiceSrc: string = '/assets/audio/loi-nhan-vat-trang-chu.MP3';

  private bgmPlaying: boolean = false;
  private voicePlaying: boolean = false;
  private autoplayBlocked: boolean = false;
  private hasPlayedVoiceInSession: boolean = false;

  private voiceTimerId: number | null = null;
  private listeners: Set<(state: AudioPlaybackState) => void> = new Set();
  private interactionListenerAttached: boolean = false;
  private audioCtx: AudioContext | null = null;

  // Volumes
  private bgmVolume: number = 0.38;
  private voiceVolume: number = 0.88;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initBgmAudio();
      this.initVoiceAudio();
    }
  }

  private initBgmAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;

    if (!this.bgmAudio) {
      try {
        const audio = new Audio();
        audio.src = this.bgmSrc;
        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = this.bgmVolume;

        audio.addEventListener('play', () => {
          this.bgmPlaying = true;
          this.autoplayBlocked = false;
          this.notifyListeners();

          // Khi nhạc nền bắt đầu phát, nếu lời thoại chưa từng phát trong phiên này, lên lịch phát sau 3 giây
          this.scheduleVoiceAfterBgmStart();
        });

        audio.addEventListener('pause', () => {
          this.bgmPlaying = false;
          this.notifyListeners();
        });

        audio.addEventListener('ended', () => {
          if (this.bgmPlaying) {
            audio.play().catch(() => {});
          }
        });

        audio.addEventListener('error', (e) => {
          console.warn('[SoundManager] Lỗi tải nhạc nền:', this.bgmSrc, e);
          this.bgmPlaying = false;
          this.notifyListeners();
        });

        this.bgmAudio = audio;
      } catch (err) {
        console.warn('[SoundManager] Không thể khởi tạo Audio cho nhạc nền:', err);
      }
    }

    return this.bgmAudio;
  }

  private initVoiceAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;

    if (!this.voiceAudio) {
      try {
        const audio = new Audio();
        audio.src = this.voiceSrc;
        audio.loop = false;
        audio.preload = 'auto';
        audio.volume = this.voiceVolume;

        audio.addEventListener('play', () => {
          this.voicePlaying = true;
          this.notifyListeners();
        });

        audio.addEventListener('pause', () => {
          this.voicePlaying = false;
          this.notifyListeners();
        });

        audio.addEventListener('ended', () => {
          this.voicePlaying = false;
          this.notifyListeners();
        });

        audio.addEventListener('error', () => {
          // Thử fallback sang tên tệp viết thường nếu máy chủ phân biệt chữ hoa/thường
          if (this.voiceSrc.endsWith('.MP3')) {
            const fallbackSrc = '/assets/audio/loi-nhan-vat-trang-chu.mp3';
            if (audio.src !== fallbackSrc) {
              audio.src = fallbackSrc;
              return;
            }
          }
          console.warn('[SoundManager] Không thể phát tệp lời thoại nhân vật');
          this.voicePlaying = false;
          this.notifyListeners();
        });

        this.voiceAudio = audio;
      } catch (err) {
        console.warn('[SoundManager] Không thể khởi tạo Audio cho lời thoại:', err);
      }
    }

    return this.voiceAudio;
  }

  private notifyListeners() {
    const state: AudioPlaybackState = {
      bgmPlaying: this.bgmPlaying,
      voicePlaying: this.voicePlaying,
      autoplayBlocked: this.autoplayBlocked,
      hasPlayedVoice: this.hasPlayedVoiceInSession,
    };

    for (const listener of this.listeners) {
      try {
        listener(state);
      } catch {
        // Ignore listener error
      }
    }
  }

  // Lên lịch phát lời thoại đúng 3 giây sau khi nhạc nền thực sự bắt đầu
  private scheduleVoiceAfterBgmStart() {
    // Nếu lời thoại đã được phát một lần trong phiên, hoặc đang có hẹn giờ, không tạo thêm
    if (this.hasPlayedVoiceInSession) return;
    if (this.voiceTimerId !== null) return;

    this.voiceTimerId = window.setTimeout(() => {
      this.voiceTimerId = null;
      // Chỉ phát nếu nhạc nền vẫn đang chạy và chưa từng phát
      if (this.bgmPlaying && !this.hasPlayedVoiceInSession) {
        this.playVoiceAudio();
      }
    }, 3000);
  }

  // Phát lời thoại nhân vật
  public async playVoiceAudio(forceReplay: boolean = false): Promise<boolean> {
    if (!forceReplay && this.hasPlayedVoiceInSession) {
      return false;
    }

    const voice = this.initVoiceAudio();
    if (!voice) return false;

    try {
      voice.currentTime = 0;
      voice.volume = this.voiceVolume;
      const playPromise = voice.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      this.voicePlaying = true;
      this.hasPlayedVoiceInSession = true;
      this.notifyListeners();
      return true;
    } catch (err) {
      console.warn('[SoundManager] Trình duyệt chặn phát lời thoại:', err);
      this.voicePlaying = false;
      this.notifyListeners();
      return false;
    }
  }

  // Dừng lời thoại nếu đang phát và hủy tác vụ hẹn giờ
  public cancelVoicePlayback(): void {
    if (this.voiceTimerId !== null) {
      clearTimeout(this.voiceTimerId);
      this.voiceTimerId = null;
    }
    if (this.voiceAudio) {
      try {
        this.voiceAudio.pause();
        this.voiceAudio.currentTime = 0;
      } catch {
        // Ignore
      }
    }
    this.voicePlaying = false;
    this.notifyListeners();
  }

  // Lắng nghe tương tác đầu tiên của người dùng nếu trình duyệt chặn autoplay
  private attachFirstInteractionListener() {
    if (this.interactionListenerAttached || typeof window === 'undefined') return;
    this.interactionListenerAttached = true;

    const onUserInteraction = () => {
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
      this.interactionListenerAttached = false;

      // Nếu nhạc nền chưa phát, tiến hành phát
      if (!this.bgmPlaying) {
        this.startBgm();
      }
    };

    window.addEventListener('click', onUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onUserInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onUserInteraction, { once: true, passive: true });
  }

  // Bắt đầu nhạc nền
  public async startBgm(): Promise<boolean> {
    const audio = this.initBgmAudio();
    if (!audio) return false;

    try {
      audio.volume = this.bgmVolume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      this.bgmPlaying = true;
      this.autoplayBlocked = false;
      this.notifyListeners();
      return true;
    } catch (err: any) {
      // Trình duyệt chặn autoplay do thiếu tương tác
      this.bgmPlaying = false;
      this.autoplayBlocked = true;
      this.notifyListeners();
      this.attachFirstInteractionListener();
      return false;
    }
  }

  // Dừng nhạc nền
  public stopBgm(): void {
    if (this.bgmAudio) {
      try {
        this.bgmAudio.pause();
      } catch {
        // Ignore
      }
    }
    this.bgmPlaying = false;
    // Dừng cả lời thoại nếu đang chờ phát
    if (this.voiceTimerId !== null) {
      clearTimeout(this.voiceTimerId);
      this.voiceTimerId = null;
    }
    this.notifyListeners();
  }

  // Bật / tắt nhạc nền
  public async toggleBgm(): Promise<boolean> {
    if (this.isPlaying()) {
      this.stopBgm();
      return false;
    } else {
      return await this.startBgm();
    }
  }

  public isPlaying(): boolean {
    if (!this.bgmAudio) return false;
    return !this.bgmAudio.paused && !this.bgmAudio.ended && this.bgmAudio.readyState > 2;
  }

  public isVoicePlaying(): boolean {
    return this.voicePlaying;
  }

  public isAutoplayBlocked(): boolean {
    return this.autoplayBlocked;
  }

  public hasPlayedVoice(): boolean {
    return this.hasPlayedVoiceInSession;
  }

  // Cho phép người dùng chủ động bấm nghe lại lời thoại nếu muốn
  public replayVoice(): Promise<boolean> {
    return this.playVoiceAudio(true);
  }

  public setBgmVolume(vol: number): void {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmAudio) {
      this.bgmAudio.volume = this.bgmVolume;
    }
  }

  public setVoiceVolume(vol: number): void {
    this.voiceVolume = Math.max(0, Math.min(1, vol));
    if (this.voiceAudio) {
      this.voiceAudio.volume = this.voiceVolume;
    }
  }

  public subscribe(listener: (state: AudioPlaybackState) => void): () => void {
    this.listeners.add(listener);
    // Báo ngay trạng thái ban đầu
    listener({
      bgmPlaying: this.isPlaying(),
      voicePlaying: this.voicePlaying,
      autoplayBlocked: this.autoplayBlocked,
      hasPlayedVoice: this.hasPlayedVoiceInSession,
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  // --- Sound Effects (Web Audio API) cho click / hover ---
  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public playClickSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Ignore
    }
  }

  public playHoverSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundManager();
