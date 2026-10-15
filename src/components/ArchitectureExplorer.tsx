import React, { useState } from 'react';
import { ARCHITECTURE_ZONES } from '../data/learningContent';
import { Layers, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const ArchitectureExplorer: React.FC = () => {
  const [activeZoneIdx, setActiveZoneIdx] = useState(0);

  const activeZone = ARCHITECTURE_ZONES[activeZoneIdx];

  return (
    <div className="bg-white/80 rounded-2xl border border-amber-200/90 shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          Bố cục không gian chữ Đinh
        </div>
        <h3 className="text-2xl font-serif-culture font-bold text-amber-950">
          Khám Phá Kết Cấu Kiến Trúc Gỗ Đình Làng Sở Thượng
        </h3>
        <p className="text-stone-600 text-sm mt-1">
          Chọn từng phân khu trong quần thể di tích để tìm hiểu chi tiết về nghệ thuật điêu khắc và cấu trúc công trình.
        </p>
      </div>

      {/* Zone selection buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {ARCHITECTURE_ZONES.map((zone, idx) => (
          <button
            key={zone.name}
            type="button"
            onClick={() => setActiveZoneIdx(idx)}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeZoneIdx === idx
                ? 'border-red-700 bg-gradient-to-br from-red-50 to-amber-50 text-red-950 font-bold shadow-sm ring-2 ring-red-600/30'
                : 'border-stone-200 bg-stone-50/70 hover:bg-amber-50/50 text-stone-700'
            }`}
          >
            <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
              Phân khu 0{idx + 1}
            </span>
            <span className="text-xs md:text-sm line-clamp-2 leading-snug">
              {zone.name}
            </span>
          </button>
        ))}
      </div>

      {/* Active Zone Detail Display */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border border-amber-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4 border-b border-amber-100 pb-3">
          <div>
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider bg-red-100/70 px-2.5 py-0.5 rounded">
              {activeZone.zone}
            </span>
            <h4 className="text-xl md:text-2xl font-serif-culture font-bold text-stone-900 mt-1">
              {activeZone.name}
            </h4>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Phong cách kiến trúc thời Hậu Lê - Nguyễn
          </span>
        </div>

        <p className="text-stone-700 text-sm md:text-base leading-relaxed mb-6">
          {activeZone.description}
        </p>

        <div>
          <h5 className="text-xs uppercase font-bold tracking-wider text-amber-900 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
            Đặc trưng nổi bật & Điểm nhấn mỹ thuật:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeZone.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-amber-200/70 shadow-2xs text-xs text-stone-800"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
