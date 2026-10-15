import React, { useState } from 'react';
import { useLayers } from '../../context/LayerContext';
import { CanvasLayer, LayerType } from '../../types/layer';
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  ChevronUp,
  ChevronDown,
  Type,
  Image as ImageIcon,
  User,
  MousePointer,
  Compass,
  Sparkles,
  Search,
} from 'lucide-react';

export const LayerSidebarLeft: React.FC = () => {
  const {
    layers,
    activeScreen,
    selectedLayerId,
    setSelectedLayerId,
    addLayer,
    removeLayer,
    duplicateLayer,
    reorderLayer,
    toggleLayerVisibility,
    toggleLayerLock,
  } = useLayers();

  const [showAddMenu, setShowAddMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentLayers = layers[activeScreen] || [];

  // Filter layers by search term
  const filteredLayers = currentLayers.filter((layer) =>
    layer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to render layer type icon
  const getLayerIcon = (type: LayerType) => {
    switch (type) {
      case 'character':
        return <User className="w-4 h-4 text-emerald-400" />;
      case 'button':
        return <MousePointer className="w-4 h-4 text-amber-400" />;
      case 'text':
        return <Type className="w-4 h-4 text-purple-400" />;
      case 'nav':
        return <Compass className="w-4 h-4 text-blue-400" />;
      case 'image':
      default:
        return <ImageIcon className="w-4 h-4 text-rose-400" />;
    }
  };

  const getLayerBadge = (type: LayerType) => {
    switch (type) {
      case 'character':
        return 'Nhân vật';
      case 'button':
        return 'Nút bấm';
      case 'text':
        return 'Chữ viết';
      case 'nav':
        return 'Thanh menu';
      case 'image':
      default:
        return 'Ảnh';
    }
  };

  return (
    <aside className="w-80 h-full bg-stone-900 border-r border-stone-800 flex flex-col select-none text-stone-200">
      
      {/* Header with Title and Add Button */}
      <div className="p-3.5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-stone-100 tracking-wide">Danh sách Layer</h2>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-stone-800 text-stone-400 font-mono">
            {currentLayers.length}
          </span>
        </div>

        {/* Add Layer Menu Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-medium text-xs shadow-md transition cursor-pointer"
            title="Thêm layer mới vào màn hình"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Thêm Layer</span>
          </button>

          {showAddMenu && (
            <div
              className="absolute right-0 mt-2 w-56 bg-stone-800 border border-stone-700 rounded-xl shadow-2xl py-1.5 z-50 animate-fadeIn"
              onClick={() => setShowAddMenu(false)}
            >
              <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Chọn loại thành phần
              </div>

              <button
                type="button"
                onClick={() => addLayer('character')}
                className="w-full px-3 py-2 text-left text-xs text-stone-200 hover:bg-stone-700 hover:text-white flex items-center gap-2.5 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-medium">Nhân vật hoạt hình</div>
                  <div className="text-[10px] text-stone-400">Măng Non cử động hoặc tĩnh</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => addLayer('text')}
                className="w-full px-3 py-2 text-left text-xs text-stone-200 hover:bg-stone-700 hover:text-white flex items-center gap-2.5 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Type className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-medium">Văn bản & Chú thích</div>
                  <div className="text-[10px] text-stone-400">Đoạn văn, tiêu đề bài học</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => addLayer('button')}
                className="w-full px-3 py-2 text-left text-xs text-stone-200 hover:bg-stone-700 hover:text-white flex items-center gap-2.5 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <MousePointer className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-medium">Nút bấm tương tác</div>
                  <div className="text-[10px] text-stone-400">Chuyển trang, mở xem chi tiết</div>
                </div>
              </button>



              <button
                type="button"
                onClick={() => addLayer('image')}
                className="w-full px-3 py-2 text-left text-xs text-stone-200 hover:bg-stone-700 hover:text-white flex items-center gap-2.5 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <ImageIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-medium">Ảnh minh họa chi tiết</div>
                  <div className="text-[10px] text-stone-400">Ảnh hiện vật, phù điêu, di tích</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Search Layer */}
      <div className="p-2 border-b border-stone-800">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm layer..."
            className="w-full pl-8 pr-2 py-1.5 bg-stone-800/80 border border-stone-700/60 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Layer List Scrollable */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredLayers.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-500">
            Không tìm thấy layer nào phù hợp
          </div>
        ) : (
          filteredLayers
            // Render in reverse so top z-index appears on top (Photoshop / Canva convention)
            .slice()
            .reverse()
            .map((layer) => {
              const isSelected = layer.id === selectedLayerId;

              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`group relative rounded-xl border p-2 flex items-center gap-2 transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/70 text-amber-100 shadow-sm'
                      : 'bg-stone-800/40 border-stone-800 hover:bg-stone-800/80 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  {/* Layer Type Icon */}
                  <div className="shrink-0">{getLayerIcon(layer.type)}</div>

                  {/* Layer Title & Badge */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate flex items-center gap-1.5">
                      <span className="truncate">{layer.name}</span>
                      {layer.isOriginalProtected && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-950/70 text-amber-400 font-semibold border border-amber-800/50">
                          Gốc
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-stone-400 flex items-center gap-2">
                      <span>{getLayerBadge(layer.type)}</span>
                      <span>•</span>
                      <span>Z:{layer.zIndex}</span>
                      <span>•</span>
                      <span>{Math.round(layer.width)}% × {Math.round(layer.height)}%</span>
                    </div>
                  </div>

                  {/* Actions: Eye, Lock, Reorder, Delete */}
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    {/* Visibility */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLayerVisibility(layer.id);
                      }}
                      className={`p-1 rounded hover:bg-stone-700 transition cursor-pointer ${
                        layer.visible ? 'text-stone-300' : 'text-stone-600'
                      }`}
                      title={layer.visible ? 'Ẩn layer này' : 'Hiện layer này'}
                    >
                      {layer.visible ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Lock */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLayerLock(layer.id);
                      }}
                      className={`p-1 rounded hover:bg-stone-700 transition cursor-pointer ${
                        layer.locked ? 'text-amber-400' : 'text-stone-500'
                      }`}
                      title={layer.locked ? 'Mở khóa để di chuyển' : 'Khóa vị trí layer'}
                    >
                      {layer.locked ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Reorder Up / Down */}
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          reorderLayer(layer.id, 'up');
                        }}
                        className="p-0.5 rounded hover:bg-stone-700 text-stone-400 hover:text-white transition cursor-pointer"
                        title="Đưa lên trên 1 lớp"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          reorderLayer(layer.id, 'down');
                        }}
                        className="p-0.5 rounded hover:bg-stone-700 text-stone-400 hover:text-white transition cursor-pointer"
                        title="Hạ xuống dưới 1 lớp"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Duplicate */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateLayer(layer.id);
                      }}
                      className="p-1 rounded hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition cursor-pointer"
                      title="Nhân bản layer này"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete (if not protected) */}
                    {!layer.isOriginalProtected && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Xóa layer "${layer.name}"?`)) {
                            removeLayer(layer.id);
                          }
                        }}
                        className="p-1 rounded hover:bg-red-950/60 text-stone-500 hover:text-red-400 transition cursor-pointer"
                        title="Xóa layer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
        )}
      </div>

      {/* Bottom Hint */}
      <div className="p-3 bg-stone-950/50 border-t border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Bấm chọn layer để điều chỉnh tọa độ và thuộc tính ở bảng bên phải.</span>
      </div>

    </aside>
  );
};
