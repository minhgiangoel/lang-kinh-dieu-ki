import React from 'react';
import { Search, Scroll } from 'lucide-react';
import { ScreenId } from '../../data/hotspots';
import { soundManager } from '../../utils/audio';

interface HeritageNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenModal: (modalType: string) => void;
  onOpenSearch: () => void;
}

export const HeritageNavBar: React.FC<HeritageNavBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenModal,
  onOpenSearch,
}) => {
  const navItems = [
    { id: 'home', label: 'Trang chủ', type: 'nav', target: 'home' as ScreenId },
    { id: 'intro', label: 'Giới thiệu', type: 'nav', target: 'location' as ScreenId },
    { id: 'explore', label: 'Khám phá di tích', type: 'nav', target: 'architecture' as ScreenId },
    { id: 'festival', label: 'Lễ hội', type: 'modal', target: 'festival' },
    { id: 'heritage', label: 'Giá trị di sản', type: 'modal', target: 'heritage' },
    { id: 'preservation', label: 'Gìn giữ', type: 'modal', target: 'preservation' },
    { id: 'library', label: 'Thư viện', type: 'modal', target: 'library' },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
    soundManager.playClickSound();
    if (item.type === 'nav' && item.target) {
      onNavigate(item.target as ScreenId);
    } else if (item.type === 'modal' && item.target) {
      onOpenModal(item.target);
    }
  };

  const handleHover = () => {
    soundManager.playHoverSound();
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-[3%] bg-gradient-to-r from-[#2A110B] via-[#35160F] to-[#2A110B] border-b border-[#D4A359]/30 text-white select-none">
      
      {/* Left Logo Section */}
      <button
        type="button"
        onClick={() => { soundManager.playClickSound(); onNavigate('home'); }}
        onMouseEnter={handleHover}
        className="flex items-center gap-2.5 text-left cursor-pointer group focus:outline-none"
      >
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center text-[#2A110B] shadow-xs group-hover:scale-105 transition-transform">
          <Scroll className="w-4 h-4" />
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-serif-culture font-extrabold tracking-wider text-[#F4D089] text-[13px] sm:text-[15px] group-hover:text-[#FFE7B3] transition-colors">
            LĂNG KÍNH DIỆU KÌ
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#E5B564]/90 tracking-widest font-medium uppercase mt-0.5">
            ĐÌNH LÀNG SỞ THƯỢNG
          </span>
        </div>
      </button>

      {/* Right Navigation Menu */}
      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3.5">
        {navItems.map((item) => {
          const isActive =
            (item.id === 'home' && currentScreen === 'home') ||
            (item.id === 'intro' && (currentScreen === 'location' || currentScreen === 'history' || currentScreen === 'linh-lang')) ||
            (item.id === 'explore' && (currentScreen === 'architecture' || currentScreen === 'artifacts'));

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
              onMouseEnter={handleHover}
              className={`relative px-2 sm:px-2.5 py-1 text-[11px] sm:text-[13px] font-medium transition-all duration-150 cursor-pointer rounded-md ${
                isActive
                  ? 'text-[#FDE49E] font-bold shadow-xs'
                  : 'text-[#E0CBB8] hover:text-[#FFF1D0] hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#F4D089] to-transparent rounded-full" />
              )}
            </button>
          );
        })}

        {/* Search Icon Button */}
        <button
          type="button"
          onClick={() => { soundManager.playClickSound(); onOpenSearch(); }}
          onMouseEnter={handleHover}
          className="p-1.5 rounded-full text-[#E0CBB8] hover:text-[#FDE49E] hover:bg-white/10 transition-colors ml-1 cursor-pointer"
          title="Tìm kiếm trong học liệu số"
          aria-label="Tìm kiếm"
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

    </div>
  );
};
