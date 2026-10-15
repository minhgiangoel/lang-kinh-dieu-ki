import React, { useRef, useState, useEffect } from 'react';
import { useLayers } from '../../context/LayerContext';
import { CanvasLayer } from '../../types/layer';
import { SCREENS, ScreenId } from '../../data/hotspots';
import { HeritageNavBar } from '../ui/HeritageNavBar';
import { HeritageButton } from '../ui/HeritageButton';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Lock,
  Sparkles,
} from 'lucide-react';

interface CanvasStageProps {
  onNavigatePreview?: (screen: ScreenId) => void;
}

export const CanvasStage: React.FC<CanvasStageProps> = ({ onNavigatePreview }) => {
  const {
    layers,
    activeScreen,
    selectedLayerId,
    setSelectedLayerId,
    updateLayer,
  } = useLayers();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [zoom, setZoom] = useState<number>(100);
  const [isDragging, setIsDragging] = useState(false);
  const [dragHandle, setDragHandle] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{
    mouseX: number;
    mouseY: number;
    layerLeft: number;
    layerTop: number;
    layerWidth: number;
    layerHeight: number;
  } | null>(null);

  const currentLayers = layers[activeScreen] || [];
  const selectedLayer = currentLayers.find((l) => l.id === selectedLayerId) || null;
  const screenConfig = SCREENS[activeScreen as ScreenId] || SCREENS.home;

  // Keyboard micro-nudge for selected layer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedLayer || selectedLayer.locked) return;
      // Don't intercept if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      const step = e.shiftKey ? 1.0 : 0.2;
      let handled = false;

      if (e.key === 'ArrowLeft') {
        updateLayer(selectedLayer.id, {
          left: Math.max(0, parseFloat((selectedLayer.left - step).toFixed(2))),
        });
        handled = true;
      } else if (e.key === 'ArrowRight') {
        updateLayer(selectedLayer.id, {
          left: Math.min(100 - selectedLayer.width, parseFloat((selectedLayer.left + step).toFixed(2))),
        });
        handled = true;
      } else if (e.key === 'ArrowUp') {
        updateLayer(selectedLayer.id, {
          top: Math.max(0, parseFloat((selectedLayer.top - step).toFixed(2))),
        });
        handled = true;
      } else if (e.key === 'ArrowDown') {
        updateLayer(selectedLayer.id, {
          top: Math.min(100 - selectedLayer.height, parseFloat((selectedLayer.top + step).toFixed(2))),
        });
        handled = true;
      }

      if (handled) e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLayer, updateLayer]);

  // Mouse move and mouse up for drag/resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart || !selectedLayer || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const deltaXPercent = ((e.clientX - dragStart.mouseX) / rect.width) * 100;
      const deltaYPercent = ((e.clientY - dragStart.mouseY) / rect.height) * 100;

      if (dragHandle === 'move') {
        // Move operation
        const newLeft = Math.max(0, Math.min(100 - dragStart.layerWidth, dragStart.layerLeft + deltaXPercent));
        const newTop = Math.max(0, Math.min(100 - dragStart.layerHeight, dragStart.layerTop + deltaYPercent));
        updateLayer(selectedLayer.id, {
          left: parseFloat(newLeft.toFixed(2)),
          top: parseFloat(newTop.toFixed(2)),
        });
      } else if (dragHandle) {
        // Resize operations
        let newWidth = dragStart.layerWidth;
        let newHeight = dragStart.layerHeight;
        let newLeft = dragStart.layerLeft;
        let newTop = dragStart.layerTop;

        const lockRatio = selectedLayer.lockAspectRatio;
        const initialAspect = dragStart.layerWidth / dragStart.layerHeight;

        if (dragHandle.includes('e')) {
          newWidth = Math.max(1, dragStart.layerWidth + deltaXPercent);
          if (lockRatio) newHeight = newWidth / initialAspect;
        }
        if (dragHandle.includes('s')) {
          newHeight = Math.max(1, dragStart.layerHeight + deltaYPercent);
          if (lockRatio) newWidth = newHeight * initialAspect;
        }
        if (dragHandle.includes('w')) {
          const proposedWidth = Math.max(1, dragStart.layerWidth - deltaXPercent);
          newLeft = dragStart.layerLeft + (dragStart.layerWidth - proposedWidth);
          newWidth = proposedWidth;
          if (lockRatio) newHeight = newWidth / initialAspect;
        }
        if (dragHandle.includes('n')) {
          const proposedHeight = Math.max(1, dragStart.layerHeight - deltaYPercent);
          newTop = dragStart.layerTop + (dragStart.layerHeight - proposedHeight);
          newHeight = proposedHeight;
          if (lockRatio) newWidth = newHeight * initialAspect;
        }

        updateLayer(selectedLayer.id, {
          width: parseFloat(newWidth.toFixed(2)),
          height: parseFloat(newHeight.toFixed(2)),
          left: parseFloat(newLeft.toFixed(2)),
          top: parseFloat(newTop.toFixed(2)),
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragHandle(null);
        setDragStart(null);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragHandle, dragStart, selectedLayer, updateLayer]);

  const handleStartDrag = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    if (!selectedLayer || selectedLayer.locked) return;

    setIsDragging(true);
    setDragHandle(handle);
    setDragStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      layerLeft: selectedLayer.left,
      layerTop: selectedLayer.top,
      layerWidth: selectedLayer.width,
      layerHeight: selectedLayer.height,
    });
  };

  // Helper to render layer content on canvas
  const renderLayerContent = (layer: CanvasLayer) => {
    if (!layer.visible) return null;

    // Animation class
    let animClass = '';
    if (layer.animation === 'breathe') animClass = 'animate-layer-breathe';
    else if (layer.animation === 'float') animClass = 'animate-layer-float';
    else if (layer.animation === 'bounce') animClass = 'animate-layer-bounce';
    else if (layer.animation === 'pulse') animClass = 'animate-layer-pulse';

    switch (layer.type) {
      case 'character':
        return (
          <div className={`w-full h-full relative select-none ${animClass}`}>
            <img
              src={layer.src || '/assets/home/mang-non-chinh.png'}
              alt={layer.name}
              className="w-full h-full object-contain pointer-events-none drop-shadow-md"
            />
          </div>
        );

      case 'nav':
        return (
          <div className="w-full h-full pointer-events-none">
            <HeritageNavBar
              currentScreen={activeScreen as any}
              onNavigate={(s) => onNavigatePreview && onNavigatePreview(s)}
              onOpenModal={() => {}}
              onOpenSearch={() => {}}
            />
          </div>
        );

      case 'button':
        return (
          <div className="w-full h-full flex items-center justify-center pointer-events-none">
            <HeritageButton
              label={layer.text || 'Khám phá ngay'}
              variant={layer.id.includes('explore') ? 'primary' : 'secondary'}
              onClick={() => {}}
              className="w-full h-full text-xs shadow-md"
            />
          </div>
        );



      case 'text':
        return (
          <div
            style={{
              color: layer.color || '#1C1917',
              fontSize: `${layer.fontSize || 16}px`,
              fontWeight: layer.fontWeight || 'normal',
              textAlign: layer.textAlign || 'left',
              backgroundColor: layer.backgroundColor || 'transparent',
              borderRadius: `${layer.borderRadius || 0}px`,
              border: layer.borderWidth ? `${layer.borderWidth}px solid ${layer.borderColor || '#D97706'}` : 'none',
            }}
            className="w-full h-full p-2 flex items-center overflow-hidden"
          >
            <p className="w-full leading-relaxed">{layer.text}</p>
          </div>
        );

      case 'image':
      default:
        return (
          <div className={`w-full h-full select-none flex items-center justify-center ${animClass}`}>
            <img
              src={layer.src || '/assets/home/home-background.png'}
              alt={layer.name}
              className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
            />
          </div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 h-full bg-stone-950 flex flex-col relative overflow-hidden select-none"
      onClick={() => setSelectedLayerId(null)}
    >
      {/* Zoom & Helper Toolbar */}
      <div className="absolute top-3 left-4 z-30 flex items-center gap-2 bg-stone-900/90 border border-stone-800 rounded-xl px-2.5 py-1.5 shadow-xl backdrop-blur-md text-xs text-stone-300">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setZoom((z) => Math.max(50, z - 10));
          }}
          className="p-1 rounded hover:bg-stone-800 text-stone-300 transition cursor-pointer"
          title="Thu nhỏ xem tổng thể"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="font-mono text-[11px] w-12 text-center text-amber-300">{zoom}%</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setZoom((z) => Math.min(150, z + 10));
          }}
          className="p-1 rounded hover:bg-stone-800 text-stone-300 transition cursor-pointer"
          title="Phóng to để căn chi tiết"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-3.5 bg-stone-700 mx-1" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setZoom(100);
          }}
          className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-200 transition cursor-pointer"
        >
          100% Chuẩn
        </button>
      </div>

      {/* Center Canvas Viewport */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-6 sm:p-10">
        <div
          ref={canvasRef}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            aspectRatio: screenConfig.aspectRatio || '1672 / 941',
            maxWidth: '1280px',
            width: '100%',
          }}
          className="relative bg-stone-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-stone-800 rounded-sm overflow-hidden select-none"
        >
          {/* Base Background Image Layer */}
          <img
            src={screenConfig.image || '/home.png'}
            alt="Màn hình gốc"
            className="w-full h-full object-contain block pointer-events-none opacity-40 absolute inset-0"
          />

          {/* Render All Layers sorted by zIndex */}
          {currentLayers
            .slice()
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((layer) => {
              const isSelected = layer.id === selectedLayerId;

              return (
                <div
                  key={layer.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLayerId(layer.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: `${layer.top}%`,
                    left: `${layer.left}%`,
                    width: `${layer.width}%`,
                    height: `${layer.height}%`,
                    zIndex: layer.zIndex,
                    opacity: (layer.opacity ?? 100) / 100,
                  }}
                  className={`cursor-pointer transition-shadow ${
                    isSelected ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-black/50' : ''
                  }`}
                >
                  {/* Layer content */}
                  {renderLayerContent(layer)}

                  {/* Bounding Box & 8 Handles for Selected Layer */}
                  {isSelected && (
                    <div
                      className={`absolute inset-0 pointer-events-auto border-2 ${
                        layer.locked
                          ? 'border-amber-600/70 border-dashed'
                          : 'border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.6)] cursor-move'
                      }`}
                      onMouseDown={(e) => {
                        if (!layer.locked) handleStartDrag(e, 'move');
                      }}
                    >
                      {/* Floating Info Tag */}
                      <div className="absolute -top-7 left-0 px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-bold text-[10px] whitespace-nowrap shadow flex items-center gap-1.5 pointer-events-none">
                        {layer.locked && <Lock className="w-3 h-3 text-stone-950" />}
                        <span>{layer.name}</span>
                        <span className="font-mono text-[9px] opacity-80">
                          ({layer.left.toFixed(1)}%, {layer.top.toFixed(1)}%) [{layer.width.toFixed(1)}% × {layer.height.toFixed(1)}%]
                        </span>
                      </div>

                      {/* 8 Resize Handles (only when unlocked) */}
                      {!layer.locked && (
                        <>
                          {/* NW */}
                          <div
                            onMouseDown={(e) => handleStartDrag(e, 'nw')}
                            className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-amber-500 rounded-full cursor-nwse-resize hover:scale-125 transition-transform"
                          />
                          {/* N */}
                          <div
                            onMouseDown={(e) => handleStartDrag(e, 'n')}
                            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-amber-500 rounded-sm cursor-ns-resize hover:scale-125 transition-transform"
                          />
                          {/* NE */}
                          <div
                            onMouseDown={(e) => handleStartDrag(e, 'ne')}
                            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-amber-500 rounded-full cursor-nesw-resize hover:scale-125 transition-transform"
                          />
                          {/* E */}
                          <div
                            onMouseDown={(e) => handleStartDrag(e, 'e')}
                            className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white border-2 border-amber-500 rounded-sm cursor-ew-resize hover:scale-125 transition-transform"
                          />
                          {/* SE */}
                          <div
                            onMouseDown={(e) => handleStartDrag(e, 'se')}
                            className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-amber-500 rounded-full cursor-nwse-resize hover:scale-125 transition-transform"
                          />
                          {/* S */}
                          <div
                            onMouseDown={(e) => handleStartDrag(e, 's')}
                            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-amber-500 rounded-sm cursor-ns-resize hover:scale-125 transition-transform"
                          />
                          {/* SW */}
                          <div
                            onMouseDown={(e) => handleStartDrag(e, 'sw')}
                            className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-amber-500 rounded-full cursor-nesw-resize hover:scale-125 transition-transform"
                          />
                          {/* W */}
                          <div
                            onMouseDown={(e) => handleStartDrag(e, 'w')}
                            className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-white border-2 border-amber-500 rounded-sm cursor-ew-resize hover:scale-125 transition-transform"
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

    </div>
  );
};
