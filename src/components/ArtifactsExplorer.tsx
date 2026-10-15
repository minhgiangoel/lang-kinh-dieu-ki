import React, { useState } from 'react';
import { ARTIFACTS_LIST, Artifact } from '../data/learningContent';
import { Search, Sparkles, Scroll, ShieldCheck, Tag } from 'lucide-react';

export const ArtifactsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const categories = ['all', 'Văn bản Hán Nôm', 'Đồ mộc chạm khắc tế tự', 'Mỹ thuật sơn son thếp vàng', 'Đồ thờ tự chính điện', 'Pháp khí & Âm nhạc cổ truyền', 'Đồ thờ linh thú'];

  const filtered = ARTIFACTS_LIST.filter(art => {
    const matchesSearch = art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.period.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm hiện vật, sắc phong, niên đại..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200 bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">Lọc nhóm:</span>
          {categories.slice(0, 4).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 border border-amber-200 text-stone-700 hover:bg-amber-100/60'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of artifacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(art => (
          <div
            key={art.id}
            onClick={() => setSelectedArtifact(art)}
            className="bg-white/85 rounded-2xl border border-amber-200/90 hover:border-amber-400 hover:shadow-lg transition-all p-5 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  {art.category}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {art.period}
                </span>
              </div>

              <h4 className="text-lg font-bold font-serif-culture text-stone-900 group-hover:text-red-900 transition-colors mb-2">
                {art.name}
              </h4>

              <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-4">
                {art.description}
              </p>
            </div>

            <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
              <span className="text-amber-800 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Di sản quý
              </span>
              <span className="text-stone-500 group-hover:text-amber-900 font-semibold flex items-center gap-1">
                Xem chi tiết
                <Sparkles className="w-3 h-3 text-amber-600" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-amber-300 max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-amber-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                  {selectedArtifact.category}
                </span>
                <h3 className="text-xl font-bold font-serif-culture text-stone-900 mt-1">
                  {selectedArtifact.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArtifact(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-stone-700">
              <div>
                <strong className="text-stone-900 block text-xs uppercase tracking-wider text-amber-900 mb-1">
                  Niên đại chế tác:
                </strong>
                <p className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 font-medium">
                  {selectedArtifact.period}
                </p>
              </div>

              <div>
                <strong className="text-stone-900 block text-xs uppercase tracking-wider text-amber-900 mb-1">
                  Đặc điểm miêu tả:
                </strong>
                <p className="leading-relaxed">
                  {selectedArtifact.description}
                </p>
              </div>

              <div>
                <strong className="text-stone-900 block text-xs uppercase tracking-wider text-amber-900 mb-1">
                  Giá trị & Ý nghĩa lịch sử:
                </strong>
                <p className="leading-relaxed bg-red-50/50 p-3 rounded-lg border border-red-100 text-stone-800">
                  {selectedArtifact.significance}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100 flex justify-end">
              <button
                onClick={() => setSelectedArtifact(null)}
                className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
