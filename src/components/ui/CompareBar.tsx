import React from 'react';
import { Sliders, Layers, Image as ImageIcon, Sparkles, ShieldCheck } from 'lucide-react';
import { useLayers } from '../../context/LayerContext';

interface CompareBarProps {
  viewMode: 'layered' | 'original' | 'split';
  setViewMode: (mode: 'layered' | 'original' | 'split') => void;
  overlayOpacity: number;
  setOverlayOpacity: (opacity: number) => void;
  onOpenAdmin: () => void;
}

export const CompareBar: React.FC<CompareBarProps> = ({
  viewMode,
  setViewMode,
  overlayOpacity,
  setOverlayOpacity,
  onOpenAdmin,
}) => {
  const { isAdmin } = useLayers();

  return (
    <div className="w-full max-w-[1680px] px-3 py-2 bg-[#2B100B] border-b border-[#D4A359]/40 flex flex-wrap items-center justify-between gap-3 text-xs text-[#E5C49F]">
      
      {/* Left: Purpose label */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#E5B564] animate-ping" />
        <span className="font-semibold text-white">
          Kiểm thử Tách Lớp & Chỉnh sửa Layer
        </span>
      </div>

      {/* Middle: Mode Switch Buttons */}
      <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-amber-900/50">
        <button
          type="button"
          onClick={() => setViewMode('layered')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
            viewMode === 'layered'
              ? 'bg-[#B93822] text-white shadow-xs font-bold'
              : 'text-[#D0B298] hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Giao diện lập trình (Tách lớp)</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('original')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
            viewMode === 'original'
              ? 'bg-[#B93822] text-white shadow-xs font-bold'
              : 'text-[#D0B298] hover:text-white hover:bg-white/5'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Ảnh PNG gốc (Đối chiếu)</span>
        </button>
      </div>

      {/* Right: Compare slider & Admin button */}
      <div className="flex items-center gap-2">
        {/* Opacity slider */}
        <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-xl border border-amber-900/40">
          <Sliders className="w-3.5 h-3.5 text-[#E5B564]" />
          <span className="text-[11px] text-[#D0B298]">Độ mờ:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={overlayOpacity}
            onChange={(e) => {
              setOverlayOpacity(Number(e.target.value));
              if (viewMode === 'original') setViewMode('layered');
            }}
            className="w-16 sm:w-20 accent-[#E5B564] cursor-pointer"
            title="Kéo thanh trượt để so khớp trực tiếp giữa lớp lập trình và ảnh gốc"
          />
          <span className="text-[11px] font-mono text-[#F4D089] w-7 text-right">
            {overlayOpacity}%
          </span>
        </div>

        {/* Teacher / Admin Layer Studio Button */}
        <button
          type="button"
          onClick={onOpenAdmin}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-600/30 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          title="Mở trình chỉnh sửa kéo thả layer trực quan dành cho Giáo viên"
        >
          <Sparkles className="w-3.5 h-3.5 fill-stone-950 text-stone-950" />
          <span>Chế độ Giáo viên (Sửa Layer)</span>
        </button>
      </div>

    </div>
  );
};
