import React, { useState, useEffect } from 'react';
import { SCREENS, ScreenId, Hotspot } from './data/hotspots';
import { HeritageModal } from './components/HeritageModal';
import { SearchDialog } from './components/SearchDialog';
import { HomeScreenLayered } from './components/screens/HomeScreenLayered';
import { AboutLayout, AboutSectionId } from './components/screens/AboutLayout';
import { CompareBar } from './components/ui/CompareBar';
import { soundManager, AudioPlaybackState } from './utils/audio';
import { LayerProvider, useLayers } from './context/LayerContext';
import { AdminStudio } from './components/admin/AdminStudio';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { ScreenLayerKey } from './types/layer';
import { Eye, EyeOff, Volume2, VolumeX, ShieldCheck, Sparkles, RotateCcw } from 'lucide-react';

function AppContent() {
  const {
    activeScreen,
    setActiveScreen,
    isEditorOpen,
    openEditor,
    closeEditor,
    isAdmin,
  } = useLayers();

  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [displayedScreen, setDisplayedScreen] = useState<ScreenId>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showHotspotHints, setShowHotspotHints] = useState(false);
  const [audioState, setAudioState] = useState<AudioPlaybackState>({
    bgmPlaying: false,
    voicePlaying: false,
    autoplayBlocked: false,
    hasPlayedVoice: false,
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Compare mode states for testing & verification
  const [viewMode, setViewMode] = useState<'layered' | 'original' | 'split'>('layered');
  const [overlayOpacity, setOverlayOpacity] = useState<number>(100);

  // Subscribe to SoundManager state and attempt initial playback
  useEffect(() => {
    const unsubscribe = soundManager.subscribe((state) => {
      setAudioState(state);
    });

    // Attempt to start BGM (will start immediately or queue on first click per browser policy)
    soundManager.startBgm();

    return () => {
      unsubscribe();
    };
  }, []);

  // Synchronize activeScreen in editor when navigating in student view
  useEffect(() => {
    setActiveScreen(displayedScreen as ScreenLayerKey);
  }, [displayedScreen, setActiveScreen]);

  // Smooth page transition handler
  const navigateTo = (targetScreen: ScreenId) => {
    if (targetScreen === currentScreen) return;
    soundManager.playClickSound();

    if (!soundManager.isPlaying()) {
      soundManager.startBgm();
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(targetScreen);
      setDisplayedScreen(targetScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    soundManager.playClickSound();

    if (!soundManager.isPlaying()) {
      soundManager.startBgm();
    }

    if (hotspot.action === 'nav' && hotspot.target) {
      navigateTo(hotspot.target as ScreenId);
    } else if (hotspot.action === 'modal' && hotspot.target) {
      setActiveModal(hotspot.target);
    } else if (hotspot.action === 'search') {
      setSearchOpen(true);
    }
  };

  const handleHotspotHover = () => {
    soundManager.playHoverSound();
  };

  const handleToggleBgm = () => {
    soundManager.toggleBgm();
  };

  const handleOpenAdmin = () => {
    if (isAdmin) {
      openEditor();
    } else {
      setLoginModalOpen(true);
    }
  };

  const screenConfig = SCREENS[displayedScreen] || SCREENS.home;

  const isAboutSection =
    displayedScreen === 'location' ||
    displayedScreen === 'history' ||
    displayedScreen === 'linh-lang';

  const isLayeredScreen = displayedScreen === 'home' || isAboutSection;

  return (
    <div className="min-h-screen bg-[#3F1610] flex flex-col items-center justify-start select-none relative">
      
      {/* Compare Inspection Bar (Available on all layered screens) */}
      {isLayeredScreen && (
        <CompareBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          overlayOpacity={overlayOpacity}
          setOverlayOpacity={setOverlayOpacity}
          onOpenAdmin={handleOpenAdmin}
        />
      )}

      {/* Main Image Stage Container */}
      <div className="w-full max-w-[1680px] flex justify-center p-0 sm:p-2 md:p-3">
        <div
          className={`relative w-full shadow-2xl bg-stone-900 overflow-hidden transition-all duration-300 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-[0.985] blur-[1px]' : 'opacity-100 scale-100 blur-0'
          }`}
          style={{ aspectRatio: screenConfig.aspectRatio }}
        >
          {/* 1. HOME SCREEN: Layered Component Rendering */}
          {displayedScreen === 'home' && (
            <div className="relative w-full h-full">
              <div
                style={{
                  opacity: viewMode === 'original' ? 0 : overlayOpacity / 100,
                  transition: 'opacity 0.15s ease-out',
                }}
                className="w-full h-full"
              >
                <HomeScreenLayered
                  onNavigate={navigateTo}
                  onOpenModal={(modal) => setActiveModal(modal)}
                  onOpenSearch={() => setSearchOpen(true)}
                  showOriginalPng={viewMode === 'original'}
                />
              </div>

              {viewMode === 'original' && (
                <img
                  src="/home.png"
                  alt="Ảnh gốc Trang chủ"
                  className="w-full h-full object-contain block pointer-events-none absolute inset-0"
                  loading="eager"
                />
              )}
            </div>
          )}

          {/* 2. GIỚI THIỆU SECTIONS: Using AboutLayout for location, history, and linh-lang */}
          {isAboutSection && (
            <div className="relative w-full h-full">
              <div
                style={{
                  opacity: viewMode === 'original' ? 0 : overlayOpacity / 100,
                  transition: 'opacity 0.15s ease-out',
                }}
                className="w-full h-full"
              >
                <AboutLayout
                  activeSection={displayedScreen as AboutSectionId}
                  onNavigate={navigateTo}
                  onOpenModal={(modal) => setActiveModal(modal)}
                  onOpenSearch={() => setSearchOpen(true)}
                  showOriginalPng={viewMode === 'original'}
                />
              </div>

              {viewMode === 'original' && (
                <img
                  src={screenConfig.image}
                  alt={screenConfig.name}
                  className="w-full h-full object-contain block pointer-events-none absolute inset-0"
                  loading="eager"
                />
              )}
            </div>
          )}

          {/* 3. KHÁM PHÁ DI TÍCH (Architecture, Artifacts) */}
          {(displayedScreen === 'architecture' || displayedScreen === 'artifacts') && (
            <div className="relative w-full h-full">
              <img
                src={screenConfig.image}
                alt={screenConfig.name}
                className="w-full h-full object-contain block pointer-events-none"
                loading="eager"
              />

              <div className="absolute inset-0">
                {screenConfig.hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => handleHotspotClick(hotspot)}
                    onMouseEnter={handleHotspotHover}
                    title={hotspot.label}
                    aria-label={hotspot.label}
                    style={{
                      position: 'absolute',
                      top: `${hotspot.top}%`,
                      left: `${hotspot.left}%`,
                      width: `${hotspot.width}%`,
                      height: `${hotspot.height}%`,
                    }}
                    className={`cursor-pointer transition-all duration-200 ease-out focus:outline-none rounded-lg ${
                      showHotspotHints
                        ? 'bg-amber-400/25 border-2 border-dashed border-amber-400 ring-2 ring-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'opacity-0 hover:opacity-100 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 border border-amber-300/80 shadow-[0_0_15px_rgba(251,191,36,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Dual-track audio controls in bottom-right corner */}
      <div className="fixed bottom-3 right-3 z-40 flex items-center gap-2">
        {/* Voice status indicator */}
        {audioState.voicePlaying && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/90 text-amber-200 border border-amber-600/70 text-xs shadow-lg backdrop-blur-md animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-medium text-[11px]">Măng Non đang giới thiệu...</span>
          </div>
        )}

        {/* Replay voice button (only available if voice already played in session and BGM is active) */}
        {audioState.bgmPlaying && audioState.hasPlayedVoice && !audioState.voicePlaying && (
          <button
            type="button"
            onClick={() => soundManager.replayVoice()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-amber-300 border border-amber-700/60 text-[11px] shadow-md backdrop-blur-md transition cursor-pointer"
            title="Nghe lại lời giới thiệu của Măng Non"
          >
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Nghe lại lời chào</span>
          </button>
        )}

        {/* Main BGM Play/Pause Button */}
        <button
          type="button"
          onClick={handleToggleBgm}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 shadow-xl backdrop-blur-md border cursor-pointer ${
            audioState.bgmPlaying
              ? 'bg-amber-600/90 hover:bg-amber-500 text-white border-amber-300 ring-2 ring-amber-400/50 scale-105'
              : 'bg-[#A62B16] hover:bg-[#8B2312] text-amber-100 border-amber-400/80 ring-2 ring-amber-500/40 animate-pulse'
          }`}
          title={audioState.bgmPlaying ? 'Tắt nhạc nền trang chủ' : 'Bật nhạc nền trang chủ'}
          aria-label={audioState.bgmPlaying ? 'Tắt âm thanh' : 'Bật âm thanh'}
        >
          {audioState.bgmPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-amber-100" />
              <span className="text-xs font-semibold pr-1">Tắt nhạc nền</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-amber-200" />
              <span className="text-xs font-semibold pr-1">Bật nhạc nền</span>
            </>
          )}
        </button>
      </div>

      {/* Discreet Bottom Bar */}
      <footer className="w-full max-w-[1680px] px-4 py-2 flex items-center justify-between text-[11px] text-amber-200/70 border-t border-amber-900/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
          <span>Đang xem: <strong>{screenConfig.name}</strong></span>
        </div>

        <div className="flex items-center gap-3 pr-10">
          {/* Teacher Admin Entry Button */}
          <button
            type="button"
            onClick={handleOpenAdmin}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-700/60 transition cursor-pointer"
            title="Mở trình chỉnh sửa layer trực quan"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAdmin ? 'Mở Trình Sửa Layer' : 'Chế độ Giáo viên'}</span>
          </button>

          {!isLayeredScreen && (
            <button
              type="button"
              onClick={() => setShowHotspotHints(!showHotspotHints)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 hover:bg-black/60 text-amber-300 border border-amber-800/60 transition"
              title="Bật/tắt đường viền hiển thị vị trí các nút trên ảnh"
            >
              {showHotspotHints ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showHotspotHints ? 'Ẩn gợi ý nút' : 'Hiện gợi ý nút'}</span>
            </button>
          )}

          {displayedScreen !== 'home' && (
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="px-2.5 py-1 rounded bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700/60 transition cursor-pointer"
            >
              Về Trang chủ
            </button>
          )}
        </div>
      </footer>

      {/* Fullscreen Canva-like Admin Layer Studio */}
      {isEditorOpen && (
        <AdminStudio onClose={closeEditor} />
      )}

      {/* Admin Login Modal for Teacher */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Interactive Popups for Content Details */}
      <HeritageModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
        onNavigate={(screen) => navigateTo(screen)}
      />

      {/* Search Dialog */}
      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(screen) => navigateTo(screen)}
      />

    </div>
  );
}

export function App() {
  return (
    <LayerProvider>
      <AppContent />
    </LayerProvider>
  );
}

export default App;
