import React, { useEffect } from 'react';
import { Sparkles, Scroll, Crown, Shield, Landmark } from 'lucide-react';

export const LinhLangDetailContent: React.FC = () => {
  // Ensure any background TTS is cancelled
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  const paragraphs = [
    {
      id: 'linh-lang-p1',
      title: 'Vùng đất cổ Sở Thượng - Hoàng Mai',
      text: 'Sở Thượng - Hoàng Mai là một vùng đất cổ, có lịch sử tồn tại và phát triển từ khá lâu đời, xưa kia khu vực này có nhiều sông chảy qua như: sông Lừ, sông Kim Ngưu, sông Tô Lịch, sông Sét. Các đường giao thông quan trọng huyết mạch đi qua: đường Pháp Vân - Cầu Giẽ, đường thủy sông Hồng. Vùng đất này vừa là vành đai, áo giáp, hậu cứ bảo vệ cửa ngõ phía Nam cho thủ đô Hà Nội. Với vị trí địa lý như vậy, Hoàng mai có nhiều lợi thế trong xây dựng căn cứ, trong phòng thủ cũng như tiến công kẻ thù đồng thời cũng trở thành vùng tranh chấp quyết liệt trong các cuộc chiến tranh bảo vệ quê hương, gìn giữ đất nước. Chính mảnh đất này hiện còn lưu giữ hệ thống các di tích lịch sử văn hoá vừa tôn vinh, vừa nhắc nhớ những trang hào kiệt trong sự nghiệp chống giặc ngoại xâm bảo vệ nền độc lập tự chủ của dân tộc.'
    },
    {
      id: 'linh-lang-p2',
      title: 'Thần phả Sở Thượng xã Thần tích (1737)',
      text: 'Theo cuốn Thần phả 河 東 省 青 池 縣 所 上 社 神 蹐 (Hà Đông tỉnh,Thanh Trì huyện, Sở Thượng xã Thần tích) do Quản Giám bách thần Nguyễn Hiền soạn năm Vĩnh Hựu 03 (1737) hiện lưu giữ tại di tích thì đình làng Sở Thượng là nơi thờ Hoàng tử Hoàng Chân tức Linh Lang Đại vương - là con thứ tư của vua Lý Thánh Tông đã có công trong cuộc đấu tranh chống Tống xâm lược.'
    },
    {
      id: 'linh-lang-p3',
      title: 'Dấu ấn kháng chiến chống Nguyên - Mông (1257) & Mẫu Quốc linh từ',
      text: 'Năm 1257, khi quân Nguyên - Mông xâm lược nước ta, để tránh thế hung bạo ban đầu, triều đình nhà Trần tạm rút khỏi kinh đô, bà Trần Thị Dung tức Trinh Thuận phu nhân vợ vua Lý Huệ Tông đã huy động nhân dân dùng thuyền chuyên chở những kho vũ khí và lương thực từ phía Giảng Võ theo các sông Tô, Kim Ngưu ra sông Hồng để về mạn Thiên Trường (thuộc tỉnh Nam Định ngày nay) thì Kẻ Mui, Yên Duyên đã góp công sức, thuyền bè. Khi giặc Nguyên kéo tới, Thăng Long chỉ còn là một khu kinh thành vườn không nhà trống. Nhờ công trạng này, sau khi mất Bà được lập đền thờ gọi là Mẫu Quốc linh từ.'
    },
    {
      id: 'linh-lang-p4',
      title: 'Chiến công Tướng quân Trần Khát Chân (1390) & Tục kiêng kỵ',
      text: 'Năm 1390, vua Chiêm Thành là Chế Bồng Nga đưa đoàn thuyền chiến giao tranh với nhà Trần. Tướng nhà Trần là Trần Khát Chân( ) đã dàn trận chặn đánh và giết chết Chế Bồng Nga trên sông Hồng. Triều đình đã ban cho Trần Khát Chân vùng đất Cổ Mai, Thanh Đàm làm thái ấp. Năm 1399, Trần Khát Chân và một số tôn thất nhà Trần bị Hồ Quý Ly giết chết tại Đốn Sơn - Thanh Hóa. Người nhà Trần Khát Chân đem thóc lúa, của cải ở Cổ Mai chia cho bà con làng xã. Nhớ công ơn đó, nhân dân các xã Yên Duyên, Khuyến Lương, Tương Mai và Hoàng Mai đã lập đền thờ Trần Khát Chân. Do đó, ở đây trước kia có lệ kiêng gọi không gọi “chân” mà gọi chệch là “cẳng”.'
    },
    {
      id: 'linh-lang-p5',
      title: 'Thần tích 88 bản & Thần thoại Đức Thánh Linh Lang',
      text: 'Các tư liệu Hán Nôm hiện còn được lưu giữ tại di tích đều cho biết Thành hoàng làng Sở Thượng là Linh Lang Đại Vương. Sự tích về Thần có rất nhiều bản chép. Theo nghiên cứu, trong số thần tích hiện nay đã thu thập được có 88 văn bản trên cả nước về Linh Lang. Về lai lịch và sự tích của Thần có thể tóm lược như sau: Linh Lang Đại Vương là con trai thứ tư của vua Lý Thánh Tông. Tương truyền, bấy giờ hoàng phi họ Nguyễn đang tắm ở Dâm Đàm (Hồ Tây) bỗng có rồng thần hiện ra phun nước thơm vào mình, về nhà bà mang thai, 14 tháng sinh ra Linh Lang. Vua Lý Thánh Tông cho bà đưa Hoàng tử về nuôi dưỡng tại nơi ở cũ của bà trong trại Thủ Lệ. Linh Lang lớn lên tướng mạo khôi ngô, trên người có tướng lạ. Bấy giờ quân nhà Tống do Triệu Tiết chỉ huy sang cướp phá biên giới nước ta, kinh thành náo động. Vua sai sứ đi chiêu mộ người có tài đi đánh giặc. Sứ giả tới trại Thủ Lệ, Linh Lang sai mời sứ giả vào nhà, bảo sứ giả trở về xin vua ban cho một lá cờ đỏ, một thớt voi để đi đánh giặc. Vua y theo, cho sắm sửa các thứ mang tới, Linh Lang hô to một tiếng, con voi lập tức nằm phục xuống. Linh Lang cầm cờ nhảy lên lưng voi phóng ra trận, vừa phất cờ vừa đánh, giặc thua chạy tan tác. Sau khi chiến thắng quân giặc, Linh Lang trở về nơi ở cũ, ít lâu sau thì mắc bệnh nặng. Vua tới thăm hỏi, Linh Lang tâu rằng mình không phải là người trần, nay đã đến hạn phải ra đi. Nói rồi hóa thành con giao long trắng dài trăm trượng, trườn xuống Dâm Đàm biến mất. Sau đó trời mưa liền trong mấy ngày. Khi trời vừa tạnh, từ trên trời bay xuống rất nhiều cờ đỏ, cắm xuống trước cửa Ngọ môn. Vua bèn phong tước cho Thần là Linh Lang Đại Vương, sửa lại nơi ở cũ của Đại Vương làm đền thờ.'
    },
    {
      id: 'linh-lang-p6',
      title: 'Mỹ tự Thượng Đẳng Phúc Thần & Sự tích lập miếu Sở Thượng',
      text: 'Xét công trạng của Ngài nhà Vua ban phong Mỹ tự Linh Lang Đại Vương Thượng Đẳng Phúc Thần. Truyền thuyết còn ghi: Ngài ném cây cờ lên trời, hễ cây bay đến đâu thì vua sẽ ban cho được thờ ở đó. Cho nên có 269 làng trại trong cả nước xây đền miếu thờ Linh Lang Đại Vương. Trong đó, có xã Sở Thượng, huyện Thanh Trì (nay là phường Sở Thượng, quận Hoàng Mai) cũng được phụng sự Ngài. Lúc bấy giờ trời đất tối đen, trên hồ sóng lớn nổi lên, cá miệt, giảo long đều nổi cả lên, hôm đó là ngày mùng 10 tháng 2, lại thấy cờ bay đến đó, tức đất Sở Thượng thì rơi xuống, dân làng liền lập đền thờ. Ngày 12 tháng 2, Vua truyền bách quan hành lễ, ban dựng miếu thờ.'
    },
    {
      id: 'linh-lang-p7',
      title: 'Tục thờ tự 269 làng miếu & Sắc phong Chính Hòa 4 (1683)',
      text: 'Hiện nay, Linh Lang Đại Vương còn thấy được thờ ở Hà Nội, Thái Bình, Nam Hà, Nam Định, Hải Dương, Bắc Ninh, Phúc Yên, Bắc Giang, Phú Thọ, Thanh Hóa, Hưng Yên. Như vậy, đã phản ánh tính phổ biến của Linh Lang Đại Vương. Nhưng dù thần tích đa dạng như thế nào thì đất phát tích của Linh Lang vẫn là Thăng Long. Linh Lang Đại Vương - một danh tướng chống giặc ngoại xâm bảo vệ Thăng Long, chính vì thế Ngài được phong vị thần trấn giữ phía tây kinh thành, trong “Thăng Long tứ trấn”. Sắc phong ngày 12 tháng 2 niên hiệu Chính Hòa 4 (1683) có viết: “Sắc cho đương cảnh Thành hoàng thông minh chính trực, phù quốc an dân, thuần phúc linh Lang Đại Vương. Thần được khí thiêng non sông chung đúc, đức lớn như bể, trừ tai dẹp loạn, ban phúc cho dân, giúp cơ đồ vững bền như bàn thạch. Thần lại luôn cảm ứng màu nhiệm nên được gia phong điển lễ phụng thờ, ban mỹ tự. Nay phong sắc”.'
    },
    {
      id: 'linh-lang-p8',
      title: 'Tôn kính và phụng thờ trường tồn',
      text: 'Từ đó trở đi, các triều đại phong kiến đã ban thưởng sắc phong với nhiều mỹ tự để tỏ lòng thành kính, đều được ghi vào trong điển sách, đến ngày kỵ Thánh đền miếu, cúng mừng tuổi nhang khói nghi ngút, bốn mùa không dứt. Trải qua thời gian, nhân dân nơi đây thờ phụng ngài theo điển lễ để bày tỏ sự tri ân, kính ngưỡng công lao của thần, đồng thời mong thần luôn âm phù, bảo trợ đời sống tinh thần cho nhân dân.'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#FFFDF7]/96 backdrop-blur-xs rounded-2xl border-2 border-[#D4A359]/70 shadow-2xl overflow-hidden text-stone-800">
      
      {/* Top Banner Header inside the Scroll Panel */}
      <div className="px-5 sm:px-7 py-3.5 bg-gradient-to-r from-[#2B100B] via-[#4A1512] to-[#2B100B] text-white flex items-center justify-between border-b border-[#D4A359]/40 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E5B564] to-[#B8860B] flex items-center justify-center text-[#2B100B] shadow-xs">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#FDE49E] uppercase block">
              GIỚI THIỆU &gt; 3. NHÂN VẬT LỊCH SỬ
            </span>
            <h3 className="text-sm sm:text-base font-bold font-serif-culture text-[#FFF1D0] leading-none mt-0.5">
              THÀNH HOÀNG LINH LANG ĐẠI VƯƠNG & LỊCH SỬ VÙNG ĐẤT SỞ THƯỢNG
            </h3>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#E5C49F]">
          <span className="w-2 h-2 rounded-full bg-[#E5B564] animate-pulse" />
          <span>8 chuyên đoạn tư liệu lịch sử đầy đủ</span>
        </div>
      </div>

      {/* Scrollable Content Body with custom scrollbar */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 space-y-5 scrollbar-thin">
        
        {/* Quote Header */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FDE6B0]/40 to-[#FFF7E3]/60 border border-[#D4A359]/50 text-xs italic text-[#5A1D11] flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#B8860B] shrink-0" />
          <span>
            “Linh Lang Đại Vương là biểu tượng của lòng yêu nước, trí dũng và tinh thần bảo vệ quê hương, đất nước.”
          </span>
        </div>

        {/* 8 Full Paragraphs with inline Audio Buttons */}
        {paragraphs.map((p, idx) => (
          <div
            key={p.id}
            className="p-4 rounded-xl border transition-all duration-200 bg-white/80 hover:bg-[#FFFDF9] border-[#E8D4B5] hover:border-[#D4A359] shadow-xs"
          >
            {/* Paragraph Header: Subtitle */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#E8D4B5]/60 gap-2">
              <span className="text-xs font-bold text-[#8E2218] flex items-center gap-1.5 font-serif-culture">
                <span className="w-5 h-5 rounded-full bg-[#8E2218] text-white flex items-center justify-center text-[10px] font-sans font-bold">
                  {idx + 1}
                </span>
                <span>{p.title}</span>
              </span>
            </div>

            {/* Paragraph text */}
            <p className="text-xs sm:text-[13px] text-stone-800 leading-relaxed text-justify">
              {p.text}
            </p>
          </div>
        ))}

        {/* Footer acknowledgment */}
        <div className="pt-2 text-center text-[11px] text-[#8E2218] font-medium border-t border-[#D4A359]/30">
          Tư liệu trích lục Thần phả Sở Thượng (1737) & Sắc phong Chính Hòa 4 (1683) lưu giữ tại Đình làng Sở Thượng.
        </div>

      </div>

    </div>
  );
};

export default LinhLangDetailContent;
