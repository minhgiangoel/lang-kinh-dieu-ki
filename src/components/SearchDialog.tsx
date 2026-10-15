import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { ScreenId } from '../data/hotspots';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchableItems = [
    { title: 'Trang chủ - Giới thiệu tổng quan', screen: 'home' as ScreenId, desc: 'Lăng Kính Diệu Kì, học liệu số Đình làng Sở Thượng' },
    { title: 'Vị trí di tích & Chỉ dẫn đường đi', screen: 'location' as ScreenId, desc: 'Phường Yên Sở, Hoàng Mai, lộ trình từ Bờ Hồ, xe buýt' },
    { title: 'Lịch sử hình thành & Những đổi thay', screen: 'history' as ScreenId, desc: 'Thời vua Lê Thánh Tông thế kỷ XV, kháng chiến chống Pháp' },
    { title: 'Nhân vật lịch sử Linh Lang Đại Vương', screen: 'linh-lang' as ScreenId, desc: 'Hoàng tử triều Lý đánh giặc Tống, truyền thuyết rồng bay' },
    { title: 'Kiến trúc nghệ thuật & Sơ đồ phân khu', screen: 'architecture' as ScreenId, desc: 'Đại bái, Trung cung, Hậu cung, Cổng đình, Nghi môn' },
    { title: 'Những đồ vật được lưu giữ (Hiện vật)', screen: 'artifacts' as ScreenId, desc: '18 đạo sắc phong, hoành phi, câu đối, cửa võng, ngai thờ' },
  ];

  const results = searchableItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl border-2 border-amber-300 max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-amber-700" />
            <h4 className="text-base font-bold text-amber-950 font-serif-culture">
              Tìm Kiếm Trong Học Liệu Số
            </h4>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập từ khóa (vd: lịch sử, sắc phong, kiến trúc, vị trí)..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(item.screen);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100 border border-amber-200/80 transition flex items-center justify-between group"
              >
                <div>
                  <h5 className="text-xs font-bold text-amber-950 group-hover:text-red-900">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>
            ))
          ) : (
            <p className="text-xs text-stone-500 text-center py-4">
              Không tìm thấy nội dung phù hợp với từ khóa.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
