import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface HeritageButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  style?: React.CSSProperties;
}

export const HeritageButton: React.FC<HeritageButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  className = '',
  style = {}
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClickSound();
    onClick();
  };

  const handleMouseEnter = () => {
    soundManager.playHoverSound();
  };

  if (variant === 'primary') {
    return (
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        style={style}
        className={`group relative inline-flex items-center justify-center font-bold text-white rounded-full transition-all duration-200 cursor-pointer select-none overflow-hidden shadow-md hover:shadow-lg hover:shadow-amber-900/30 active:scale-95 bg-gradient-to-r from-[#B93822] via-[#C94A29] to-[#D95F31] border border-amber-300/60 ${className}`}
      >
        {/* Shimmer light effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        <span className="relative z-10 flex items-center gap-1.5 tracking-wide">
          <span>{label}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={style}
      className={`group relative inline-flex items-center justify-center font-semibold text-amber-950 rounded-full transition-all duration-200 cursor-pointer select-none overflow-hidden shadow-xs hover:shadow-md active:scale-95 bg-gradient-to-r from-[#FDE8B3] to-[#FCE09B] border border-amber-500/70 hover:border-amber-600 hover:from-[#FFF0C8] hover:to-[#FDE8B3] ${className}`}
    >
      <span className="relative z-10 flex items-center gap-1.5 tracking-wide">
        <span>{label}</span>
        <ArrowRight className="w-3.5 h-3.5 text-amber-900 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
};
