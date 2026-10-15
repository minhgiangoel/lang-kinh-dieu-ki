import React, { useEffect } from 'react';
import { HeritageNavBar } from '../ui/HeritageNavBar';
import { HeritageSidebarItem } from '../ui/HeritageSidebarItem';
import { ScreenId } from '../../data/hotspots';
import { soundManager } from '../../utils/audio';

interface LinhLangScreenLayeredProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenModal: (modalType: string) => void;
  onOpenSearch: () => void;
  showOriginalPng?: boolean;
}

export const LinhLangScreenLayered: React.FC<LinhLangScreenLayeredProps> = ({
  onNavigate,
  onOpenModal,
  onOpenSearch,
  showOriginalPng = false,
}) => {
  // Ensure no speech synthesis carries over
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }, []);

  return (
    <div
      className="relative w-full shadow-2xl bg-[#F7F2E7] overflow-hidden select-none"
      style={{ aspectRatio: '1536 / 1024' }}
    >
      <img
        src="/linh-lang.png"
        alt="Giới thiệu - Nhân vật lịch sử Linh Lang Đại Vương"
        className="w-full h-full object-contain block pointer-events-none"
        loading="eager"
      />

      {!showOriginalPng && (
        <div className="absolute inset-0">
          
          {/* Header Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '5.8%',
            }}
            className="z-20 shadow-xs"
          >
            <HeritageNavBar
              currentScreen="linh-lang"
              onNavigate={onNavigate}
              onOpenModal={onOpenModal}
              onOpenSearch={onOpenSearch}
            />
          </div>

          {/* Breadcrumb Links */}
          <button
            type="button"
            onClick={() => { soundManager.playClickSound(); onNavigate('home'); }}
            style={{
              position: 'absolute',
              top: '34.0%',
              left: '3.0%',
              width: '5.2%',
              height: '2.5%',
            }}
            className="z-10 text-transparent hover:text-amber-900 font-bold text-xs flex items-center px-1 rounded-sm hover:bg-amber-400/20 transition-all cursor-pointer border border-transparent hover:border-amber-400/60"
            title="Về Trang chủ"
          >
            <span className="sr-only">Về Trang chủ</span>
          </button>

          <button
            type="button"
            onClick={() => { soundManager.playClickSound(); onNavigate('location'); }}
            style={{
              position: 'absolute',
              top: '34.0%',
              left: '9.0%',
              width: '5.2%',
              height: '2.5%',
            }}
            className="z-10 text-transparent hover:text-amber-900 font-bold text-xs flex items-center px-1 rounded-sm hover:bg-amber-400/20 transition-all cursor-pointer border border-transparent hover:border-amber-400/60"
            title="Về mục Giới thiệu (Vị trí)"
          >
            <span className="sr-only">Về mục Giới thiệu</span>
          </button>

          {/* Left Sidebar Sub-Navigation (5 Programmed Interactive Buttons) */}
          <div
            style={{
              position: 'absolute',
              top: '39.8%',
              left: '2.5%',
              width: '17.5%',
              height: '4.8%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="1. Vị trí di tích"
              isActive={false}
              onClick={() => onNavigate('location')}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '46.2%',
              left: '2.5%',
              width: '17.5%',
              height: '5.5%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="2. Lịch sử hình thành"
              isActive={false}
              onClick={() => onNavigate('history')}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '52.5%',
              left: '2.5%',
              width: '18.5%',
              height: '7.5%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="3. Nhân vật lịch sử"
              isActive={true}
              onClick={() => onNavigate('linh-lang')}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '61.2%',
              left: '2.5%',
              width: '17.5%',
              height: '4.8%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="4. Kiến trúc"
              isActive={false}
              onClick={() => onNavigate('architecture')}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '68.8%',
              left: '2.5%',
              width: '17.5%',
              height: '5.5%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="5. Những đồ vật được lưu giữ"
              isActive={false}
              onClick={() => onNavigate('artifacts')}
            />
          </div>

        </div>
      )}

    </div>
  );
};
