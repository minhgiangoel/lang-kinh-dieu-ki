import React, { useEffect } from 'react';
import { HeritageNavBar } from '../ui/HeritageNavBar';
import { HeritageButton } from '../ui/HeritageButton';
import { InteractiveMangNon } from '../character/InteractiveMangNon';
import { ScreenId } from '../../data/hotspots';
import { useLayers } from '../../context/LayerContext';
import { CanvasLayer } from '../../types/layer';
import { soundManager } from '../../utils/audio';

interface HomeScreenLayeredProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenModal: (modalType: string) => void;
  onOpenSearch: () => void;
  showOriginalPng?: boolean;
}

export const HomeScreenLayered: React.FC<HomeScreenLayeredProps> = ({
  onNavigate,
  onOpenModal,
  onOpenSearch,
  showOriginalPng = false,
}) => {
  const { layers } = useLayers();

  const homeLayers = layers.home || [];

  // Ensure any background TTS voice is cancelled
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }, []);

  const handleLayerAction = (layer: CanvasLayer) => {
    soundManager.playClickSound();
    if (!soundManager.isPlaying()) {
      soundManager.startBgm();
    }

    if (layer.action === 'nav' && layer.target) {
      onNavigate(layer.target as ScreenId);
    } else if (layer.action === 'modal' && layer.target) {
      onOpenModal(layer.target);
    } else if (layer.action === 'search') {
      onOpenSearch();
    } else if (layer.action === 'url' && layer.target) {
      window.open(layer.target, '_blank');
    }
  };

  const bgLayer = homeLayers.find((l) => l.type === 'image' && l.id.includes('bg'));

  return (
    <div
      className="relative w-full shadow-2xl bg-[#F7F2E7] overflow-hidden select-none"
      style={{ aspectRatio: '1672 / 941' }}
    >
      {/* BASE LAYER: Background Image */}
      <img
        src={showOriginalPng ? '/home.png' : (bgLayer?.src || '/assets/home/home-background.png')}
        alt="Trang chủ Đình Làng Sở Thượng"
        className="w-full h-full object-contain block pointer-events-none"
        loading="eager"
      />

      {/* DYNAMIC PROGRAMMED LAYERS (Rendered according to teacher's layer configurations) */}
      {!showOriginalPng && (
        <div className="absolute inset-0 pointer-events-none">
          {homeLayers
            .slice()
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((layer) => {
              if (!layer.visible || layer.id.includes('bg')) return null;

              // Render Character Layer (Main Măng Non)
              if (layer.type === 'character') {
                return (
                  <div
                    key={layer.id}
                    style={{
                      position: 'absolute',
                      top: `${layer.top}%`,
                      left: `${layer.left}%`,
                      width: `${layer.width}%`,
                      height: `${layer.height}%`,
                      zIndex: layer.zIndex,
                      opacity: (layer.opacity ?? 100) / 100,
                    }}
                    className="pointer-events-auto"
                  >
                    <div className="w-full h-full animate-mang-non-main-entrance">
                      <InteractiveMangNon
                        src={layer.src || '/assets/home/mang-non-chinh.png'}
                        animation={layer.animation || 'float'}
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                        }}
                      />
                    </div>
                  </div>
                );
              }

              // Render Navigation Bar Layer
              if (layer.type === 'nav') {
                return (
                  <div
                    key={layer.id}
                    style={{
                      position: 'absolute',
                      top: `${layer.top}%`,
                      left: `${layer.left}%`,
                      width: `${layer.width}%`,
                      height: `${layer.height}%`,
                      zIndex: layer.zIndex,
                      opacity: (layer.opacity ?? 100) / 100,
                    }}
                    className="shadow-sm pointer-events-auto"
                  >
                    <HeritageNavBar
                      currentScreen="home"
                      onNavigate={onNavigate}
                      onOpenModal={onOpenModal}
                      onOpenSearch={onOpenSearch}
                    />
                  </div>
                );
              }

              // Render Button Layer
              if (layer.type === 'button') {
                const isPrimary = layer.id.includes('explore') || (layer.backgroundColor && layer.backgroundColor.includes('amber'));
                return (
                  <div
                    key={layer.id}
                    style={{
                      position: 'absolute',
                      top: `${layer.top}%`,
                      left: `${layer.left}%`,
                      width: `${layer.width}%`,
                      height: `${layer.height}%`,
                      zIndex: layer.zIndex,
                      opacity: (layer.opacity ?? 100) / 100,
                    }}
                    className="flex items-center justify-center pointer-events-auto"
                  >
                    <HeritageButton
                      variant={isPrimary ? 'primary' : 'secondary'}
                      label={layer.text || 'Bấm vào đây'}
                      onClick={() => handleLayerAction(layer)}
                      className="w-full h-full text-xs sm:text-sm md:text-[15px]"
                    />
                  </div>
                );
              }



              // Render Text Layer
              if (layer.type === 'text') {
                return (
                  <div
                    key={layer.id}
                    style={{
                      position: 'absolute',
                      top: `${layer.top}%`,
                      left: `${layer.left}%`,
                      width: `${layer.width}%`,
                      height: `${layer.height}%`,
                      zIndex: layer.zIndex,
                      opacity: (layer.opacity ?? 100) / 100,
                      color: layer.color || '#1C1917',
                      fontSize: `${layer.fontSize || 16}px`,
                      fontWeight: layer.fontWeight || 'normal',
                      textAlign: layer.textAlign || 'left',
                      backgroundColor: layer.backgroundColor || 'transparent',
                      borderRadius: `${layer.borderRadius || 0}px`,
                      border: layer.borderWidth ? `${layer.borderWidth}px solid ${layer.borderColor || '#D97706'}` : 'none',
                    }}
                    className="p-2 flex items-center overflow-hidden pointer-events-auto"
                  >
                    <p className="w-full leading-relaxed">{layer.text}</p>
                  </div>
                );
              }

              // Render Image Layer (Secondary Măng Non or decorative assets)
              if (layer.type === 'image') {
                const isSecondaryMangNon =
                  layer.id === 'layer-character-secondary' ||
                  (layer.src && layer.src.includes('mang-non-phu'));

                return (
                  <div
                    key={layer.id}
                    style={{
                      position: 'absolute',
                      top: `${layer.top}%`,
                      left: `${layer.left}%`,
                      width: `${layer.width}%`,
                      height: `${layer.height}%`,
                      zIndex: layer.zIndex,
                      opacity: (layer.opacity ?? 100) / 100,
                    }}
                    className="flex items-center justify-center pointer-events-none select-none"
                  >
                    <div
                      className={`w-full h-full flex items-center justify-center ${
                        isSecondaryMangNon ? 'animate-mang-non-secondary-entrance' : ''
                      }`}
                    >
                      <div
                        className={`w-full h-full flex items-center justify-center ${
                          isSecondaryMangNon
                            ? 'animate-mang-non-secondary-float'
                            : (layer.animation ? `animate-layer-${layer.animation}` : '')
                        }`}
                      >
                        <img
                          src={layer.src}
                          alt={layer.name}
                          className="w-full h-full object-contain drop-shadow-xs"
                          loading="eager"
                        />
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
        </div>
      )}

    </div>
  );
};

export default HomeScreenLayered;
