import React, { useEffect } from 'react';
import { HeritageNavBar } from '../ui/HeritageNavBar';
import { LinhLangDetailContent } from './LinhLangDetailContent';
import { ScreenId } from '../../data/hotspots';
import { soundManager } from '../../utils/audio';
import { Navigation } from 'lucide-react';

export type AboutSectionId = 'location' | 'history' | 'linh-lang';

interface AboutLayoutProps {
  activeSection: AboutSectionId;
  onNavigate: (screen: ScreenId) => void;
  onOpenModal: (modalType: string) => void;
  onOpenSearch: () => void;
  showOriginalPng?: boolean;
}

export const AboutLayout: React.FC<AboutLayoutProps> = ({
  activeSection,
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

  // Configuration for each screen in Giới thiệu
  const screenMeta = {
    location: {
      image: '/location.png',
      title: 'Giới thiệu - Vị trí di tích Đình Làng Sở Thượng',
      breadcrumbHome: { top: '28.8%', left: '2.8%', width: '6.5%', height: '2.8%' },
      sidebarItems: [
        { id: 'location', label: '1. Vị trí địa lí (Vị trí di tích)', target: 'location' as ScreenId, top: '32.5%', left: '2.8%', width: '19.0%', height: '7.0%' },
        { id: 'history', label: '2. Lịch sử hình thành và những đổi thay', target: 'history' as ScreenId, top: '41.2%', left: '2.8%', width: '19.0%', height: '7.2%' },
        { id: 'linh-lang', label: '3. Nhân vật lịch sử Linh Lang Đại Vương', target: 'linh-lang' as ScreenId, top: '50.0%', left: '2.8%', width: '19.0%', height: '7.0%' },
        { id: 'architecture', label: '4. Kiến trúc', target: 'architecture' as ScreenId, top: '57.0%', left: '2.8%', width: '19.0%', height: '6.8%' },
        { id: 'artifacts', label: '5. Những đồ vật được lưu giữ', target: 'artifacts' as ScreenId, top: '63.8%', left: '2.8%', width: '19.0%', height: '7.0%' },
      ],
      hasMapTrigger: true
    },
    history: {
      image: '/history.png',
      title: 'Giới thiệu - Lịch sử hình thành Đình Làng Sở Thượng',
      breadcrumbHome: { top: '29.5%', left: '2.8%', width: '6.5%', height: '2.8%' },
      sidebarItems: [
        { id: 'location', label: '1. Vị trí địa lí', target: 'location' as ScreenId, top: '37.2%', left: '2.0%', width: '18.5%', height: '7.8%' },
        { id: 'history', label: '2. Lịch sử hình thành và những đổi thay', target: 'history' as ScreenId, top: '45.0%', left: '2.0%', width: '18.5%', height: '8.0%' },
        { id: 'linh-lang', label: '3. Nhân vật lịch sử', target: 'linh-lang' as ScreenId, top: '53.0%', left: '2.0%', width: '18.5%', height: '7.8%' },
        { id: 'architecture', label: '4. Kiến trúc', target: 'architecture' as ScreenId, top: '61.2%', left: '2.0%', width: '18.5%', height: '7.8%' },
        { id: 'artifacts', label: '5. Những đồ vật được lưu giữ', target: 'artifacts' as ScreenId, top: '69.0%', left: '2.0%', width: '18.5%', height: '9.2%' },
      ],
      hasMapTrigger: false
    },
    'linh-lang': {
      image: '/linh-lang.png',
      title: 'Giới thiệu - Nhân vật lịch sử Linh Lang Đại Vương',
      breadcrumbHome: { top: '34.0%', left: '3.0%', width: '5.2%', height: '2.5%' },
      sidebarItems: [
        { id: 'location', label: '1. Vị trí địa lí', target: 'location' as ScreenId, top: '39.8%', left: '2.5%', width: '17.5%', height: '4.8%' },
        { id: 'history', label: '2. Lịch sử hình thành', target: 'history' as ScreenId, top: '46.2%', left: '2.5%', width: '17.5%', height: '5.5%' },
        { id: 'linh-lang', label: '3. Nhân vật lịch sử', target: 'linh-lang' as ScreenId, top: '52.5%', left: '2.5%', width: '18.5%', height: '7.5%' },
        { id: 'architecture', label: '4. Kiến trúc', target: 'architecture' as ScreenId, top: '61.2%', left: '2.5%', width: '17.5%', height: '4.8%' },
        { id: 'artifacts', label: '5. Những đồ vật được lưu giữ', target: 'artifacts' as ScreenId, top: '68.8%', left: '2.5%', width: '17.5%', height: '5.5%' },
      ],
      hasMapTrigger: false
    }
  };

  const current = screenMeta[activeSection] || screenMeta.location;

  const handleButtonClick = (target: ScreenId) => {
    soundManager.playClickSound();
    onNavigate(target);
  };

  const handleButtonHover = () => {
    soundManager.playHoverSound();
  };

  return (
    <div
      className="relative w-full shadow-2xl bg-[#F7F2E7] overflow-hidden select-none"
      style={{ aspectRatio: '1536 / 1024' }}
    >
      {/* LỚP NỀN NGUYÊN BẢN: Bảo toàn 100% hình ảnh, biểu tượng, số thứ tự và hoa văn gốc */}
      <img
        src={current.image}
        alt={current.title}
        className="w-full h-full object-contain block pointer-events-none"
        loading="eager"
      />

      {/* LỚP LẬP TRÌNH TƯƠNG TÁC TÁCH LỚP */}
      {!showOriginalPng && (
        <div className="absolute inset-0">
          
          {/* 1. Thanh điều hướng đỉnh (Header Navigation Bar) */}
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
              currentScreen={activeSection}
              onNavigate={onNavigate}
              onOpenModal={onOpenModal}
              onOpenSearch={onOpenSearch}
            />
          </div>

          {/* 3. Breadcrumb "Trang chủ" clickable */}
          <button
            type="button"
            onClick={() => { soundManager.playClickSound(); onNavigate('home'); }}
            style={{
              position: 'absolute',
              top: current.breadcrumbHome.top,
              left: current.breadcrumbHome.left,
              width: current.breadcrumbHome.width,
              height: current.breadcrumbHome.height,
            }}
            className="z-10 text-transparent hover:text-amber-900 font-bold text-xs flex items-center px-1 rounded-sm hover:bg-amber-400/20 transition-all cursor-pointer border border-transparent hover:border-amber-400/60"
            title="Quay về Trang chủ"
          >
            <span className="sr-only">Về Trang chủ</span>
          </button>

          {/* 4. Các nút tương tác Menu Giới thiệu bên trái:
                 'Vị trí địa lí', 'Lịch sử hình thành', 'Nhân vật lịch sử', 'Kiến trúc', 'Những đồ vật được lưu giữ'
                 ĐƯỢC GIỮ NGUYÊN 100% BIỂU TƯỢNG VÀ NÉT VẼ GỐC TỪ ẢNH, KHÔNG BỊ PHỦ MÀU CHE */}
          {current.sidebarItems.map((item) => {
            const isItemActive = item.id === activeSection;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleButtonClick(item.target)}
                onMouseEnter={handleButtonHover}
                title={item.label}
                aria-label={item.label}
                style={{
                  position: 'absolute',
                  top: item.top,
                  left: item.left,
                  width: item.width,
                  height: item.height,
                }}
                className={`z-10 rounded-xl transition-all duration-200 cursor-pointer select-none border focus:outline-none ${
                  isItemActive
                    ? 'bg-amber-400/10 border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/40'
                    : 'bg-transparent border-transparent hover:bg-amber-400/15 hover:border-amber-400/60 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {/* Giữ nguyên biểu tượng và hình vẽ từ ảnh nền - không phủ chữ đè lên */}
                <span className="sr-only">{item.label}</span>
              </button>
            );
          })}

          {/* 5. Vùng tương tác mở bản đồ đường đi chỉ dẫn thực tế (khi ở trang Vị trí) */}
          {current.hasMapTrigger && (
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
          )}

          {/* 6. MỤC 3. NHÂN VẬT LỊCH SỬ: MỞ RỘNG PHẦN VĂN BẢN THEO CHIỀU DỌC (CUỘN CÓ THANH CUỘN & LOA ĐỌC ĐOẠN) */}
          {activeSection === 'linh-lang' && (
            <div
              style={{
                position: 'absolute',
                top: '31.5%',
                left: '22.5%',
                width: '75.5%',
                height: '66.5%',
              }}
              className="z-15"
            >
              <LinhLangDetailContent />
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AboutLayout;
