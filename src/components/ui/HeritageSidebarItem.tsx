import React from 'react';
import { soundManager } from '../../utils/audio';

interface HeritageSidebarItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const HeritageSidebarItem: React.FC<HeritageSidebarItemProps> = ({
  label,
  isActive,
  onClick,
  style = {},
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClickSound();
    onClick();
  };

  const handleMouseEnter = () => {
    soundManager.playHoverSound();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={style}
      title={label}
      aria-label={label}
      className={`w-full h-full text-left rounded-xl transition-all duration-200 cursor-pointer select-none border focus:outline-none ${
        isActive
          ? 'bg-amber-400/10 border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/40'
          : 'bg-transparent border-transparent hover:bg-amber-400/15 hover:border-amber-400/60 hover:shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:scale-[1.01] active:scale-[0.99]'
      } ${className}`}
    >
      {/* Screen reader only - Keep original visual graphics & icons 100% visible from background image */}
      <span className="sr-only">{label}</span>
    </button>
  );
};
