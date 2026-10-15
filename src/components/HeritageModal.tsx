import React from 'react';
import { X, Calendar, Sparkles, ShieldCheck, BookOpen, Volume2, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import { ScreenId } from '../data/hotspots';

interface HeritageModalProps {
  type: string | null;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const HeritageModal: React.FC<HeritageModalProps> = ({ type, onClose, onNavigate }) => {
  if (!type) return null;

  const contentMap: Record<string, {
    title: string;
    tag: string;
    icon: any;
    body: React.ReactNode;
  }> = {
    festival: {
      title: 'Lễ Hội Truyền Thống Đình Làng Sở Thượng',
      tag: 'Lễ hội truyền thống',
      icon: Calendar,
      body: (
        <div className="space-y-4 text-sm text-stone-700">
          <p className="leading-relaxed">
            Hằng năm vào trung tuần tháng Hai và tháng Ba âm lịch (chính hội diễn ra vào ngày 11 và 12), dân làng Sở Thượng long trọng mở hội để tưởng nhớ công đức Đức Thánh Linh Lang Đại Vương và Thái Phu Đại Vương.
          </p>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
            <h5 className="font-bold text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Các nghi lễ chính trong ngày hội làng:
            </h5>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-800">
              <li><strong>Nghi lễ rước nước:</strong> Đoàn rước thuyền rồng ra giữa dòng sông Hồng lấy nước trong lành về bao sái đồ tế khí.</li>
              <li><strong>Nghi lễ rước kiệu Thánh:</strong> Bộ kiệu bát cống thế kỷ XVIII sơn son thếp vàng rước quanh làng trong tiếng trống chiêng vang dội.</li>
              <li><strong>Tế lễ trang nghiêm:</strong> Các cụ bô lão trong đội tế nam và tế nữ cử hành theo nghi thức cổ truyền Thăng Long.</li>
              <li><strong>Hội vui dân gian:</strong> Hát quan họ thuyền rồng, thi đấu vật cổ truyền, chọi gà, cờ người, đập niêu đất, kéo co.</li>
            </ul>
          </div>
        </div>
      )
    },
    heritage: {
      title: 'Giá Trị Lịch Sử & Kiến Trúc Nghệ Thuật',
      tag: 'Giá trị di sản',
      icon: Sparkles,
      body: (
        <div className="space-y-4 text-sm text-stone-700">
          <p className="leading-relaxed">
            Đình làng Sở Thượng là một trong những di tích tiêu biểu của vùng đất Hoàng Mai - Thăng Long, được Bộ Văn hóa - Thông tin chính thức xếp hạng <strong>Di tích Kiến trúc Nghệ thuật cấp Quốc gia năm 1998</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-red-50 rounded-xl border border-red-200">
              <strong className="text-red-950 block mb-1">Giá trị lịch sử & Cách mạng:</strong>
              <p className="leading-relaxed text-stone-700">
                Lập làng từ thời vua Lê Thánh Tông (thế kỷ XV), nơi đây là cơ sở bí mật bảo vệ Thành ủy Hà Nội và Xứ ủy Bắc Kỳ thời kỳ kháng chiến chống Pháp.
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <strong className="text-amber-950 block mb-1">Giá trị kiến trúc & Mỹ thuật:</strong>
              <p className="leading-relaxed text-stone-700">
                Bố cục chữ Đinh truyền thống, bộ khung gỗ lim vững chãi, chạm lộng rồng mây tinh xảo và 18 đạo sắc phong cổ quý báu.
              </p>
            </div>
          </div>
        </div>
      )
    },
    preservation: {
      title: 'Gìn Giữ & Bảo Tồn Di Sản Cùng Măng Non',
      tag: 'Bảo tồn di sản học đường',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-sm text-stone-700">
          <p className="leading-relaxed">
            “Giữ gìn di sản là giữ gìn cội nguồn của chính chúng ta.” Cùng Măng Non thực hiện đúng các quy tắc văn minh khi đến thăm và học tập tại đình:
          </p>
          <div className="space-y-2">
            {[
              'Đi nhẹ, nói khẽ, giữ gìn sự trang nghiêm nơi thờ tự.',
              'Quan sát hiện vật bằng mắt, không chạm tay hoặc tự ý xê dịch đồ thờ.',
              'Không viết, vẽ, bôi bẩn lên cột gỗ lim, tường đình và bia đá.',
              'Giữ gìn vệ sinh chung, không xả rác bừa bãi trong khuôn viên di tích.',
              'Tích cực tìm hiểu, tham gia bảo vệ và giới thiệu di tích đến bạn bè quốc tế.'
            ].map((rule, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-800">
                <CheckCircle className="w-4 h-4 text-green-700 shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    library: {
      title: 'Thư Viện Học Liệu Số & Tư Liệu Ảnh',
      tag: 'Thư viện số',
      icon: BookOpen,
      body: (
        <div className="space-y-4 text-sm text-stone-700">
          <p className="leading-relaxed text-xs">
            Khám phá 6 chuyên đề học liệu số chuẩn hóa về Đình làng Sở Thượng:
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => { onNavigate('home'); onClose(); }}
              className="p-3 text-left rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
            >
              <span className="font-bold text-amber-950 block">1. Trang chủ</span>
              <span className="text-stone-500 text-[11px]">Tổng quan dự án học liệu số</span>
            </button>
            <button
              onClick={() => { onNavigate('history'); onClose(); }}
              className="p-3 text-left rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
            >
              <span className="font-bold text-amber-950 block">2. Lịch sử hình thành</span>
              <span className="text-stone-500 text-[11px]">Đồn điền thời Lê & Căn cứ cách mạng</span>
            </button>
            <button
              onClick={() => { onNavigate('linh-lang'); onClose(); }}
              className="p-3 text-left rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
            >
              <span className="font-bold text-amber-950 block">3. Đức Thánh Linh Lang</span>
              <span className="text-stone-500 text-[11px]">Thần tích hoàng tử thời Lý đánh Tống</span>
            </button>
            <button
              onClick={() => { onNavigate('architecture'); onClose(); }}
              className="p-3 text-left rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
            >
              <span className="font-bold text-amber-950 block">4. Kiến trúc nghệ thuật</span>
              <span className="text-stone-500 text-[11px]">Sơ đồ phân khu & Chạm trổ rồng mây</span>
            </button>
            <button
              onClick={() => { onNavigate('artifacts'); onClose(); }}
              className="p-3 text-left rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
            >
              <span className="font-bold text-amber-950 block">5. Đồ vật lưu giữ</span>
              <span className="text-stone-500 text-[11px]">18 đạo sắc phong, hoành phi, kiệu</span>
            </button>
            <button
              onClick={() => { onNavigate('location'); onClose(); }}
              className="p-3 text-left rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
            >
              <span className="font-bold text-amber-950 block">6. Vị trí & Tham quan</span>
              <span className="text-stone-500 text-[11px]">Chỉ dẫn đường đi & Tuyến xe buýt</span>
            </button>
          </div>
        </div>
      )
    },
    'map-guide': {
      title: 'Chỉ Dẫn Đường Đi Thực Tế Đến Đình Sở Thượng',
      tag: 'Chỉ đường thực địa',
      icon: MapPin,
      body: (
        <div className="space-y-4 text-sm text-stone-700">
          <p className="leading-relaxed">
            Đình nằm ở tổ 24, phố Hưng Phúc, phường Yên Sở, Hoàng Mai, Hà Nội (đối diện chùa Sở Thượng - Hưng Phúc tự).
          </p>
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1.5">
            <p><strong>Lộ trình từ Bờ Hồ (trung tâm):</strong> Bưu điện Bờ Hồ → Cửa Nam → Lê Duẩn → Giải Phóng → Giáp Bát → Vành đai 3 → Rẽ trái qua công viên Yên Sở 2 km → Rẽ phải vào cổng làng Sở Thượng.</p>
            <p><strong>Xe buýt:</strong> Tuyến số 04, 28, 48 đi qua gần khu vực Yên Sở.</p>
          </div>
          <div className="pt-2 flex justify-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=%C4%90%C3%ACnh+l%C3%A0ng+S%E1%BB%9F+Th%C6%B0%E1%BB%A3ng+Y%C3%AAn+S%E1%BB%9F+Ho%C3%A0ng+Mai+H%C3%A0+N%E1%BB%99i"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition shadow"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Mở Google Maps chỉ đường</span>
            </a>
          </div>
        </div>
      )
    }
  };

  // Check if it's an architectural zone or artifact detail
  if (type.startsWith('arch-') || type.startsWith('art-')) {
    const itemNames: Record<string, { title: string; desc: string }> = {
      'hau-cung': { title: 'Tòa Hậu Cung', desc: 'Nằm sâu phía trong cùng, nơi tôn trí ngai thờ và bài vị Đức Thánh Linh Lang Đại Vương. Đây là khu vực thâm nghiêm và linh thiêng nhất trong đình.' },
      'trung-cung': { title: 'Tòa Trung Cung', desc: 'Nằm giữa Đại bái và Hậu cung, là không gian đệm kết nối, nơi đặt một số đồ thờ tự và hương án trang trọng.' },
      'dai-bai': { title: 'Tòa Đại Bái (Tiền Tế)', desc: 'Là khu thờ chính đầu tiên với quy mô 5 gian bề thế, hệ vì kèo giá chiêng chạm trổ tứ linh tinh xảo, nơi diễn ra các nghi thức tế lễ cộng đồng.' },
      'san-dinh': { title: 'Sân Đình Rộng Rãi', desc: 'Khoảng sân lát gạch Bát Tràng cổ kính dưới bóng cây cổ thụ, là nơi hội tụ dân làng tổ chức các hoạt động hội hè và trò chơi dân gian.' },
      'nghi-mon': { title: 'Cổng Nghi Môn (Tam Quan)', desc: 'Cổng lễ gồm các cột đồng trụ đắp nghê chầu uy nghiêm, tạo nên không gian trang trọng khi bước vào sân đình.' },
      'cong-dinh': { title: 'Cổng Đình Làng', desc: 'Lối vào chính từ đường làng dẫn vào khuôn viên di tích, giữ nét kiến trúc cổng làng truyền thống Bắc Bộ.' },
      'art-sac-phong': { title: '18 Đạo Sắc Phong Cổ', desc: 'Văn bản do vua các triều đại Hậu Lê và triều Nguyễn ban phong, ghi nhận công lao hiển hách hộ quốc an dân của Linh Lang Đại Vương.' },
      'art-hoanh-phi': { title: 'Bức Hoành Phi (Đại Tự)', desc: 'Tấm bảng gỗ lớn đề chữ Hán thếp vàng rực rỡ, treo trang trọng ở gian giữa ca ngợi công đức thánh tổ.' },
      'art-cau-doi': { title: 'Đôi Câu Đối Cổ', desc: 'Hai vế đối chữ Hán sơn son thếp vàng thể hiện lòng tôn kính sâu sắc của con cháu và ước nguyện sơn hà thái bình.' },
      'art-cua-vong': { title: 'Cửa Võng Chạm Lộng', desc: 'Kiệt tác điêu khắc gỗ chạm hình rồng chầu mặt nguyệt và hoa lá tinh vi, ngăn cách không gian tiền tế và hậu cung.' },
      'art-bat-huong': { title: 'Bát Hương Cổ', desc: 'Vật phẩm thờ cúng thiêng liêng bằng gốm sứ men lam và đồng cổ đặt trên hương án chính điện.' },
      'art-chan-nen': { title: 'Đôi Chân Nến Đồng', desc: 'Pháp khí đặt hai bên bàn thờ, tượng trưng cho ánh sáng soi đường và sự trường tồn.' },
      'art-lu-huong': { title: 'Đỉnh / Lư Hương Đồng', desc: 'Dùng để đốt trầm hương thơm ngát trong các dịp lễ tết hội hè, xua tan uế khí.' },
      'art-ngai-tho': { title: 'Ngai Thờ Sơn Son Thếp Vàng', desc: 'Chiếc ngai gỗ quý chạm khắc hình rồng tôn nghiêm, nơi đặt bài vị của Đức Thánh Linh Lang.' },
      'art-bai-vi': { title: 'Bài Vị Thần Thành Hoàng', desc: 'Tấm gỗ chạm khắc tôn danh hiệu tôn kính của Đức Thánh Linh Lang Đại Vương phụng thờ nghìn thu.' }
    };

    const item = itemNames[type] || itemNames[type.replace('arch-', '').replace('art-', '')];
    if (item) {
      contentMap[type] = {
        title: item.title,
        tag: 'Chi tiết di sản',
        icon: Sparkles,
        body: (
          <div className="space-y-3 text-sm text-stone-700">
            <p className="leading-relaxed bg-amber-50/70 p-4 rounded-xl border border-amber-200">
              {item.desc}
            </p>
          </div>
        )
      };
    }
  }

  const current = contentMap[type] || {
    title: 'Thông Tin Di Tích',
    tag: 'Học liệu số',
    icon: Sparkles,
    body: <p className="text-sm text-stone-700">Thông tin chi tiết về chuyên mục đang được mở.</p>
  };

  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl border-2 border-amber-300 max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-900">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {current.tag}
              </span>
              <h4 className="text-lg font-serif-culture font-bold text-amber-950 mt-0.5">
                {current.title}
              </h4>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center font-bold transition"
            title="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-2">
          {current.body}
        </div>

        <div className="mt-5 pt-3 border-t border-amber-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow transition"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
