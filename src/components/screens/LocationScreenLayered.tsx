import React, { useEffect } from 'react';
import { HeritageNavBar } from '../ui/HeritageNavBar';
import { HeritageSidebarItem } from '../ui/HeritageSidebarItem';
import { ScreenId } from '../../data/hotspots';
import { soundManager } from '../../utils/audio';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface LocationScreenLayeredProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenModal: (modalType: string) => void;
  onOpenSearch: () => void;
  showOriginalPng?: boolean;
}

export const LocationScreenLayered: React.FC<LocationScreenLayeredProps> = ({
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
      {/* BASE LAYER: Authentic original design image preserving all photos, maps, and illustrations */}
      <img
        src="/location.png"
        alt="Giới thiệu - Vị trí di tích Đình Làng Sở Thượng"
        className="w-full h-full object-contain block pointer-events-none"
        loading="eager"
      />

      {/* LAYERED PROGRAMMED COMPONENTS */}
      {!showOriginalPng && (
        <div className="absolute inset-0">
          
          {/* LAYER 1: Programmed Navigation Bar (Top ~5.8% height) */}
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
              currentScreen="location"
              onNavigate={onNavigate}
              onOpenModal={onOpenModal}
              onOpenSearch={onOpenSearch}
            />
          </div>

          {/* LAYER 3: Breadcrumb "Trang chủ" clickable link */}
          <button
            type="button"
            onClick={() => { soundManager.playClickSound(); onNavigate('home'); }}
            style={{
              position: 'absolute',
              top: '28.8%',
              left: '2.8%',
              width: '6.5%',
              height: '2.8%',
            }}
            className="z-10 text-transparent hover:text-amber-900 font-bold text-xs flex items-center px-1 rounded-sm hover:bg-amber-400/20 transition-all cursor-pointer border border-transparent hover:border-amber-400/60"
            title="Quay về Trang chủ"
          >
            <span className="sr-only">Về Trang chủ</span>
          </button>

          {/* LAYER 4: Left Sidebar Sub-Navigation (5 Programmed Interactive Buttons) */}
          <div
            style={{
              position: 'absolute',
              top: '32.5%',
              left: '2.8%',
              width: '19.0%',
              height: '7.0%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="1. Vị trí di tích"
              isActive={true}
              onClick={() => onNavigate('location')}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '41.2%',
              left: '2.8%',
              width: '19.0%',
              height: '7.2%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="2. Lịch sử hình thành và những đổi thay"
              isActive={false}
              onClick={() => onNavigate('history')}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '50.0%',
              left: '2.8%',
              width: '19.0%',
              height: '7.0%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="3. Nhân vật lịch sử"
              isActive={false}
              onClick={() => onNavigate('linh-lang')}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '57.0%',
              left: '2.8%',
              width: '19.0%',
              height: '6.8%',
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
              top: '63.8%',
              left: '2.8%',
              width: '19.0%',
              height: '7.0%',
            }}
            className="z-10"
          >
            <HeritageSidebarItem
              label="5. Những đồ vật được lưu giữ"
              isActive={false}
              onClick={() => onNavigate('artifacts')}
            />
          </div>

          {/* LAYER 5: Interactive Direction / Google Maps trigger in Directions block */}
          <div
            onClick={() => onOpenModal('map-guide')}
            style={{
              position: 'absolute',
              top: '72.0%',
              left: '25.0%',
              width: '70.0%',
              height: '24.0%',
            }}
            className="z-10 cursor-pointer rounded-2xl group transition-all"
            title="Nhấp để mở bản đồ hướng dẫn đường đi chi tiết"
          >
            <div className="w-full h-full rounded-2xl group-hover:bg-amber-400/10 group-hover:ring-2 group-hover:ring-amber-500/40 transition-all p-3 flex items-start justify-end">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold px-3 py-1.5 rounded-full bg-red-900 text-white shadow-md flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" />
                <span>Xem bản đồ chi tiết & Google Maps</span>
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
