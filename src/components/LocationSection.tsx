import React from 'react';
import { MapPin, Navigation, Bus, Clock, ShieldAlert, Phone, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white/80 rounded-2xl border border-amber-200/90 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              Chỉ dẫn đường đi & Thực địa
            </div>
            <h3 className="text-2xl font-serif-culture font-bold text-amber-950">
              Vị Trí & Cẩm Nang Tham Quan Thực Tế
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              Thông tin chi tiết hỗ trợ giáo viên, học sinh và du khách đến thăm Đình làng Sở Thượng.
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=%C4%90%C3%ACnh+l%C3%A0ng+S%E1%BB%9F+Th%C6%B0%E1%BB%A3ng+Y%C3%AAn+S%E1%BB%9F+Ho%C3%A0ng+Mai+H%C3%A0+N%E1%BB%99i"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-white text-xs font-bold shadow transition shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Mở Google Maps chỉ đường</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Columns Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Address & Route */}
          <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <MapPin className="w-4 h-4 text-red-700" />
              <span>Địa Chỉ Di Tích</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              Tổ dân phố Sở Thượng, Phường Yên Sở, Quận Hoàng Mai, Thành phố Hà Nội.
            </p>
            <div className="pt-2 border-t border-amber-200/80 text-xs text-stone-600 space-y-1">
              <p>• Cách hồ Hoàn Kiếm: ~8.5 km</p>
              <p>• Cách bến xe Nước Ngầm: ~3.2 km</p>
              <p>• Cách bến xe Giáp Bát: ~4.5 km</p>
            </div>
          </div>

          {/* Card 2: Transport & Bus */}
          <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <Bus className="w-4 h-4 text-red-700" />
              <span>Phương Tiện & Xe Buýt</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Các tuyến xe buýt chạy qua khu vực Yên Sở - Tam Trinh - Vành đai 3:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-1 bg-white rounded border border-amber-300 text-amber-900 font-bold text-xs">
                Bus 04 (Long Biên - BV Nội Tiết)
              </span>
              <span className="px-2 py-1 bg-white rounded border border-amber-300 text-amber-900 font-bold text-xs">
                Bus 48 (Bến xe Nam Thăng Long - Vạn Phúc)
              </span>
              <span className="px-2 py-1 bg-white rounded border border-amber-300 text-amber-900 font-bold text-xs">
                Bus 28 (Bến xe Giáp Bát - Đông Ngạc)
              </span>
            </div>
          </div>

          {/* Card 3: Opening Hours & Rules */}
          <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-red-700" />
              <span>Giờ Mở Cửa & Liên Hệ</span>
            </div>
            <div className="text-xs text-stone-700 space-y-1.5">
              <p><strong>Buổi sáng:</strong> 07:30 - 11:30</p>
              <p><strong>Buổi chiều:</strong> 13:30 - 17:30</p>
              <p className="text-amber-900 font-medium">Mở cửa tất cả các ngày trong tuần (đặc biệt vào ngày mùng 1 & ngày rằm).</p>
            </div>
            <div className="pt-2 border-t border-amber-200/80 text-[11px] text-stone-500">
              Các đoàn học sinh tham quan xin liên hệ trước với Ban quản lý di tích phường Yên Sở.
            </div>
          </div>
        </div>
      </div>

      {/* Rules and Etiquette */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-900 to-amber-900 text-amber-50 shadow-md">
        <h4 className="text-base font-bold flex items-center gap-2 mb-2 font-serif-culture text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          Nội Quy & Quy Tắc Ứng Xử Văn Minh Nơi Di Tích Tôn Nghiêm
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-amber-100/90 pt-2">
          <div className="bg-black/20 p-3 rounded-lg border border-amber-400/20">
            <strong>1. Trang phục:</strong> Mặc trang phục lịch sự, kín đáo, tháo giày dép khi vào tòa Hậu cung nếu có quy định.
          </div>
          <div className="bg-black/20 p-3 rounded-lg border border-amber-400/20">
            <strong>2. Giữ gìn trật tự:</strong> Đi nhẹ, nói khẽ, không đùa giỡn, không sờ chạm hay xê dịch hiện vật cổ và sắc phong.
          </div>
          <div className="bg-black/20 p-3 rounded-lg border border-amber-400/20">
            <strong>3. Bảo vệ môi trường:</strong> Không xả rác bừa bãi, không thắp hương tùy tiện ngoài khu vực quy định phòng chống cháy nổ.
          </div>
        </div>
      </div>
    </div>
  );
};
