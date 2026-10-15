import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/audio';

interface InteractiveMangNonProps {
  onInteract?: () => void;
  style?: React.CSSProperties;
  className?: string;
  src?: string;
  animation?: 'none' | 'breathe' | 'float' | 'pulse' | 'bounce';
}

export const InteractiveMangNon: React.FC<InteractiveMangNonProps> = ({
  onInteract,
  style,
  className = '',
  src = '/assets/home/mang-non-chinh.png',
  animation = 'none',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Ensure any background TTS is cancelled on mount / unmount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  const handleCharacterClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    soundManager.playClickSound();
    if (!soundManager.isPlaying()) {
      soundManager.startBgm();
    }
    if (onInteract) onInteract();
  };

  // Determine animation class
  let animClass = '';
  if (animation === 'breathe') animClass = 'animate-layer-breathe';
  else if (animation === 'float') animClass = 'animate-layer-float';
  else if (animation === 'bounce') animClass = 'animate-layer-bounce';
  else if (animation === 'pulse') animClass = 'animate-layer-pulse';

  const defaultStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '1.5%',
    left: '1.0%',
    height: '50%',
    aspectRatio: '1312 / 1199',
  };

  return (
    <div
      style={style || defaultStyle}
      className={`z-25 select-none pointer-events-auto ${className} ${animClass}`}
    >
      {/* CHARACTER BODY */}
      <div
        onClick={handleCharacterClick}
        onMouseEnter={() => {
          soundManager.playHoverSound();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        title="Bạn Măng Non - Người bạn đồng hành khám phá"
        className="relative w-full h-full cursor-pointer focus:outline-none"
      >
        {/* Subtle glowing halo on hover */}
        <div
          className={`absolute inset-0 rounded-3xl transition-opacity duration-200 pointer-events-none ${
            isHovered
              ? 'opacity-100 ring-2 ring-amber-400/60 bg-amber-300/10 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
              : 'opacity-0'
          }`}
        />

        {/* Character Image */}
        <img
          src={src}
          alt="Nhân vật Măng Non"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
          loading="eager"
        />

        <span className="sr-only">Nhân vật Măng Non chính - Hướng dẫn viên học liệu số</span>
      </div>
    </div>
  );
};

export default InteractiveMangNon;
