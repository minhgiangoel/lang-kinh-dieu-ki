import React from 'react';
import { TIMELINE } from '../data/learningContent';
import { Calendar, History, Flag, Shield, Landmark } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200/80 p-6 md:p-8 shadow-sm">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          <History className="w-3.5 h-3.5 text-amber-700" />
          Tiến trình lịch sử
        </div>
        <h3 className="text-2xl font-serif-culture font-bold text-amber-950">
          Biên Niên Sử Hình Thành Đình Làng Sở Thượng
        </h3>
        <p className="text-stone-600 text-sm mt-1">
          Hành trình hơn 500 năm từ sở đồn điền thời vua Lê Thánh Tông đến Di tích Quốc gia thời hiện đại.
        </p>
      </div>

      <div className="relative pl-6 md:pl-10 border-l-2 border-amber-300 space-y-8 my-4">
        {TIMELINE.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-amber-600 border-4 border-amber-100 group-hover:scale-125 transition-transform"></div>

            <div className="p-5 bg-gradient-to-br from-amber-50/50 to-white rounded-xl border border-amber-200/70 hover:border-amber-400 hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 text-xs font-bold">
                  <Calendar className="w-3 h-3" />
                  {item.year}
                </span>
                <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {item.era}
                </span>
              </div>

              <h4 className="text-lg font-bold font-serif-culture text-stone-900 mb-1 group-hover:text-red-900 transition-colors">
                {item.title}
              </h4>
              <p className="text-stone-700 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
