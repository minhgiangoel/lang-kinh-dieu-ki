import React, { useState } from 'react';
import { useLayers } from '../../context/LayerContext';
import {
  Sliders,
  Move,
  Maximize2,
  Lock,
  Unlock,
  Type,
  Sparkles,
  Link2,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Info,
} from 'lucide-react';

export const LayerPropertiesRight: React.FC = () => {
  const { selectedLayer, updateLayer, activeScreen } = useLayers();

  if (!selectedLayer) {
    return (
      <aside className="w-80 h-full bg-stone-900 border-l border-stone-800 flex flex-col p-6 items-center justify-center text-center select-none text-stone-400">
        <div className="w-14 h-14 rounded-2xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-center text-amber-400/80 mb-3 shadow-inner">
          <Sliders className="w-7 h-7" />
        </div>
        <h3 className="text-sm font-semibold text-stone-200 mb-1">Bảng thuộc tính</h3>
        <p className="text-xs text-stone-400 leading-relaxed max-w-[220px]">
          Hãy nhấp chọn một layer từ danh sách bên trái hoặc bấm trực tiếp trên khung ảnh ở giữa để điều chỉnh.
        </p>
        <div className="mt-6 p-3 bg-stone-800/40 border border-stone-700/40 rounded-xl text-[11px] text-amber-300/80 text-left space-y-1.5 w-full">
          <div className="font-semibold text-amber-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Mẹo cho Giáo viên:
          </div>
          <div>• Kéo trực tiếp trên ảnh để dời vị trí.</div>
          <div>• Kéo 8 điểm góc để phóng to / thu nhỏ.</div>
          <div>• Dùng phím mũi tên trên bàn phím để căn chỉnh chính xác từng chút một.</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 h-full bg-stone-900 border-l border-stone-800 flex flex-col select-none text-stone-200">
      
      {/* Header */}
      <div className="p-3.5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-stone-100 tracking-wide">Thuộc tính Layer</h2>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-400 border border-stone-700">
          {selectedLayer.type}
        </span>
      </div>

      {/* Scrollable Property Fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Layer Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-300">Tên định danh</label>
          <input
            type="text"
            value={selectedLayer.name}
            onChange={(e) => updateLayer(selectedLayer.id, { name: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Position & Size Grid */}
        <div className="p-3 bg-stone-800/40 border border-stone-800 rounded-xl space-y-3">
          <div className="text-[11px] font-semibold text-amber-300/90 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5" /> Tọa độ & Kích thước (%)
            </span>
            <button
              type="button"
              onClick={() =>
                updateLayer(selectedLayer.id, {
                  lockAspectRatio: !selectedLayer.lockAspectRatio,
                })
              }
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition cursor-pointer ${
                selectedLayer.lockAspectRatio
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-stone-800 text-stone-400'
              }`}
              title="Khóa tỷ lệ khung hình khi kéo dãn"
            >
              {selectedLayer.lockAspectRatio ? (
                <Lock className="w-3 h-3" />
              ) : (
                <Unlock className="w-3 h-3" />
              )}
              <span>Khóa tỉ lệ</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5">X (Trái %)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={Number(selectedLayer.left.toFixed(1))}
                onChange={(e) =>
                  updateLayer(selectedLayer.id, { left: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-2 py-1 bg-stone-800 border border-stone-700 rounded text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5">Y (Trên %)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={Number(selectedLayer.top.toFixed(1))}
                onChange={(e) =>
                  updateLayer(selectedLayer.id, { top: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-2 py-1 bg-stone-800 border border-stone-700 rounded text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5">Rộng (Width %)</label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="100"
                value={Number(selectedLayer.width.toFixed(1))}
                onChange={(e) =>
                  updateLayer(selectedLayer.id, { width: parseFloat(e.target.value) || 1 })
                }
                className="w-full px-2 py-1 bg-stone-800 border border-stone-700 rounded text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5">Cao (Height %)</label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="100"
                value={Number(selectedLayer.height.toFixed(1))}
                onChange={(e) =>
                  updateLayer(selectedLayer.id, { height: parseFloat(e.target.value) || 1 })
                }
                className="w-full px-2 py-1 bg-stone-800 border border-stone-700 rounded text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Opacity & Z-Index */}
        <div className="p-3 bg-stone-800/40 border border-stone-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <label className="text-stone-300 font-medium">Độ mờ / Độ rõ (Opacity)</label>
            <span className="text-amber-400 font-mono text-[11px]">
              {selectedLayer.opacity ?? 100}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={selectedLayer.opacity ?? 100}
            onChange={(e) =>
              updateLayer(selectedLayer.id, { opacity: parseInt(e.target.value, 10) })
            }
            className="w-full accent-amber-500 h-1.5 bg-stone-700 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="text-stone-300 font-medium">Thứ tự hiển thị (Z-Index)</label>
            <input
              type="number"
              min="1"
              max="99"
              value={selectedLayer.zIndex}
              onChange={(e) =>
                updateLayer(selectedLayer.id, { zIndex: parseInt(e.target.value, 10) || 1 })
              }
              className="w-16 px-2 py-0.5 bg-stone-800 border border-stone-700 rounded text-center text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* SPECIFIC: CHARACTER MĂNG NON */}
        {selectedLayer.type === 'character' && (
          <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-3">
            <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Hiệu ứng nhân vật Măng Non
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-stone-300 block">Chọn chuyển động hoạt họa:</label>
              <select
                value={selectedLayer.animation || 'none'}
                onChange={(e) =>
                  updateLayer(selectedLayer.id, { animation: e.target.value as any })
                }
                className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="none">Tĩnh (Không chuyển động)</option>
                <option value="breathe">Thở nhẹ tự nhiên (Breathe)</option>
                <option value="float">Lơ lửng bồng bềnh (Float)</option>
                <option value="bounce">Nhún nhảy vui tươi (Bounce)</option>
                <option value="pulse">Nhịp đập sinh động (Pulse)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-stone-300 block">Hình ảnh nhân vật:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateLayer(selectedLayer.id, {
                      src: '/assets/home/mang-non-chinh.png',
                      aspectRatio: '1312 / 1199',
                    })
                  }
                  className={`p-2 rounded-lg border text-center transition cursor-pointer ${
                    selectedLayer.src?.includes('mang-non-chinh')
                      ? 'border-emerald-500 bg-emerald-900/40 text-emerald-200'
                      : 'border-stone-700 bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <img
                    src="/assets/home/mang-non-chinh.png"
                    alt="Măng Non lớn"
                    className="w-12 h-12 object-contain mx-auto mb-1"
                  />
                  <span className="text-[10px] block font-medium">Măng Non chính</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateLayer(selectedLayer.id, {
                      src: '/assets/home/mang-non-phu.png',
                      aspectRatio: '1 / 1',
                    })
                  }
                  className={`p-2 rounded-lg border text-center transition cursor-pointer ${
                    selectedLayer.src?.includes('mang-non-phu')
                      ? 'border-emerald-500 bg-emerald-900/40 text-emerald-200'
                      : 'border-stone-700 bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <img
                    src="/assets/home/mang-non-phu.png"
                    alt="Măng Non nhỏ"
                    className="w-12 h-12 object-contain mx-auto mb-1"
                  />
                  <span className="text-[10px] block font-medium">Măng Non phụ</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SPECIFIC: TEXT LAYER */}
        {selectedLayer.type === 'text' && (
          <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl space-y-3">
            <div className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> Nội dung & Kiểu chữ
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-stone-300 block">Nội dung chữ:</label>
              <textarea
                rows={3}
                value={selectedLayer.text || ''}
                onChange={(e) => updateLayer(selectedLayer.id, { text: e.target.value })}
                placeholder="Nhập nội dung bài học..."
                className="w-full p-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-stone-400 block mb-0.5">Cỡ chữ (px)</label>
                <input
                  type="number"
                  min="10"
                  max="72"
                  value={selectedLayer.fontSize || 16}
                  onChange={(e) =>
                    updateLayer(selectedLayer.id, {
                      fontSize: parseInt(e.target.value, 10) || 16,
                    })
                  }
                  className="w-full px-2 py-1 bg-stone-800 border border-stone-700 rounded text-stone-100"
                />
              </div>

              <div>
                <label className="text-[10px] text-stone-400 block mb-0.5">Màu chữ</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={selectedLayer.color || '#1C1917'}
                    onChange={(e) => updateLayer(selectedLayer.id, { color: e.target.value })}
                    className="w-8 h-7 rounded border border-stone-700 bg-stone-800 cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-stone-400">
                    {selectedLayer.color || '#1C1917'}
                  </span>
                </div>
              </div>
            </div>

            {/* Align buttons */}
            <div className="space-y-1">
              <label className="text-[10px] text-stone-400 block">Căn lề chữ:</label>
              <div className="flex gap-1">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => updateLayer(selectedLayer.id, { textAlign: align })}
                    className={`flex-1 py-1 rounded border flex items-center justify-center transition cursor-pointer ${
                      selectedLayer.textAlign === align
                        ? 'border-purple-500 bg-purple-900/50 text-purple-200'
                        : 'border-stone-700 bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                    {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                    {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SPECIFIC: BUTTON LAYER */}
        {selectedLayer.type === 'button' && (
          <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl space-y-3">
            <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5" /> Thiết lập nút bấm
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-stone-300 block">Nhãn hiển thị trên nút:</label>
              <input
                type="text"
                value={selectedLayer.text || ''}
                onChange={(e) => updateLayer(selectedLayer.id, { text: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-stone-300 block">Hành động khi học sinh bấm:</label>
              <select
                value={selectedLayer.action || 'nav'}
                onChange={(e) => updateLayer(selectedLayer.id, { action: e.target.value as any })}
                className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value="nav">Chuyển sang trang khác</option>
                <option value="modal">Mở hộp thông tin di sản (Lễ hội / Di sản / Thư viện)</option>
                <option value="search">Mở ô tìm kiếm học liệu</option>
                <option value="url">Mở đường link liên kết ngoài (Bản đồ / Web)</option>
              </select>
            </div>

            {selectedLayer.action === 'nav' && (
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300 block">Trang đích chuyển đến:</label>
                <select
                  value={selectedLayer.target || 'architecture'}
                  onChange={(e) => updateLayer(selectedLayer.id, { target: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="home">Trang chủ</option>
                  <option value="location">1. Vị trí địa lý Sở Thượng</option>
                  <option value="history">2. Lịch sử hình thành</option>
                  <option value="linh-lang">3. Linh Lang Đại Vương</option>
                  <option value="architecture">4. Kiến trúc Đình làng</option>
                  <option value="artifacts">5. Hiện vật di tích</option>
                </select>
              </div>
            )}

            {selectedLayer.action === 'modal' && (
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300 block">Nội dung pop-up hiển thị:</label>
                <select
                  value={selectedLayer.target || 'festival'}
                  onChange={(e) => updateLayer(selectedLayer.id, { target: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="festival">Lễ hội Linh Lang truyền thống</option>
                  <option value="heritage">Giá trị di sản văn hóa</option>
                  <option value="preservation">Gìn giữ và bảo vệ di tích</option>
                  <option value="library">Thư viện số & Bộ ảnh đình làng</option>
                </select>
              </div>
            )}

            {selectedLayer.action === 'url' && (
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300 block">Địa chỉ liên kết URL:</label>
                <input
                  type="text"
                  value={selectedLayer.target || ''}
                  onChange={(e) => updateLayer(selectedLayer.id, { target: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>
        )}



        {/* SPECIFIC: IMAGE LAYER */}
        {selectedLayer.type === 'image' && !selectedLayer.isOriginalProtected && (
          <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-3">
            <div className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> Hình ảnh & Chuyển động
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-stone-300 block">Đường dẫn tệp ảnh:</label>
              <input
                type="text"
                value={selectedLayer.src || ''}
                onChange={(e) => updateLayer(selectedLayer.id, { src: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-stone-300 block">Hiệu ứng chuyển động (tốc độ nhẹ 0.5x):</label>
              <select
                value={selectedLayer.animation || 'none'}
                onChange={(e) =>
                  updateLayer(selectedLayer.id, { animation: e.target.value as any })
                }
                className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-rose-500"
              >
                <option value="none">Tĩnh (Không chuyển động)</option>
                <option value="float">Lơ lửng bồng bềnh (0.5x Float)</option>
                <option value="breathe">Thở nhẹ tự nhiên (0.5x Breathe)</option>
                <option value="bounce">Nhún nhảy vui tươi (Bounce)</option>
                <option value="pulse">Nhịp đập sinh động (Pulse)</option>
              </select>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
