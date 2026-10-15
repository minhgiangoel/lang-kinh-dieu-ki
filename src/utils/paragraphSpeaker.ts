// Chức năng giọng đọc AI đã được loại bỏ hoàn toàn khỏi toàn bộ website.
// Module này chỉ giữ lại hàm an toàn để đảm bảo hủy bỏ mọi tiến trình TTS ngầm của trình duyệt.

class ParagraphSpeaker {
  public setListener(_cb: (id: string | null) => void) {}

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }

  public play(_id: string, _text: string) {
    this.stop();
  }

  public getCurrentId(): string | null {
    return null;
  }
}

export const paragraphSpeaker = new ParagraphSpeaker();
