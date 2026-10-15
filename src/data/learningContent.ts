export interface SectionContent {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  image: string;
  description: string;
  highlights: string[];
  audioScript: string;
}

export interface Artifact {
  id: string;
  name: string;
  period: string;
  category: string;
  description: string;
  significance: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: string;
}

export interface ArchitecturalZone {
  name: string;
  zone: string;
  description: string;
  features: string[];
}

export const SECTIONS: SectionContent[] = [
  {
    id: 'overview',
    title: 'Tổng Quan Ứng Dụng Học Liệu Số',
    shortTitle: 'Trang chủ',
    subtitle: 'Khám phá di sản Đình làng Sở Thượng qua lăng kính số hóa',
    image: '/home.png',
    description: 'Dự án "Lăng Kính Diệu Kì" là học liệu số đa phương tiện giúp học sinh, nhân dân và du khách tiếp cận toàn diện về quần thể di tích lịch sử - văn hóa Đình làng Sở Thượng, phường Yên Sở, quận Hoàng Mai, Hà Nội. Ứng dụng cung cấp tư liệu chuẩn xác, hình ảnh trực quan, câu hỏi tương tác và sơ đồ thuyết minh sinh động.',
    highlights: [
      'Di tích Lịch sử - Kiến trúc Nghệ thuật cấp Quốc gia xếp hạng năm 1998',
      'Không gian văn hóa truyền thống châu thổ sông Hồng ngàn năm văn hiến',
      'Học liệu số đa phương tiện tích hợp âm thanh, câu đố và thẻ kiến thức',
      'Tư liệu nghiên cứu lịch sử lập làng từ thời vua Lê Thánh Tông (thế kỷ XV)'
    ],
    audioScript: 'Chào mừng các bạn đến với ứng dụng học liệu số Lăng Kính Diệu Kì, chuyên đề tìm hiểu về di tích lịch sử và văn hóa Đình làng Sở Thượng, phường Yên Sở, quận Hoàng Mai, Hà Nội.'
  },
  {
    id: 'history',
    title: 'Lịch Sử Hình Thành & Phát Triển',
    shortTitle: 'Lịch sử',
    subtitle: 'Dấu ấn thời vua Lê Thánh Tông và căn cứ cách mạng kiên trung',
    image: '/history.png',
    description: 'Vào nửa cuối thế kỷ XV (1460 - 1497), vua Lê Thánh Tông cho khai hoang vùng bãi bồi trù phú ven đê sông Hồng, đưa tù binh và binh lính lập nên sở đồn điền Sở Thượng. Trải qua các thời kỳ phong kiến và cách mạng giải phóng dân tộc, Đình làng Sở Thượng không chỉ là chốn tâm linh của cộng đồng mà còn là căn cứ bí mật nuôi giấu cán bộ Xứ ủy Bắc Kỳ thời kỳ kháng chiến chống Pháp.',
    highlights: [
      'Nguồn gốc đồn điền thế kỷ XV dưới triều vua Lê Thánh Tông anh minh',
      'Sự hòa huyết văn hóa độc đáo giữa cư dân Thăng Long và người bản địa',
      'Căn cứ kháng chiến an toàn của Thành ủy Hà Nội và Xứ ủy Bắc Kỳ',
      'Trải qua nhiều lần trùng tu tôn tạo giữ nguyên cốt cách di sản cổ kính'
    ],
    audioScript: 'Làng Sở Thượng có lịch sử hình thành từ thế kỷ thứ 15 thời vua Lê Thánh Tông. Nơi đây là đồn điền ven sông Hồng, và sau này là cơ sở cách mạng vẻ vang của thủ đô.'
  },
  {
    id: 'architecture',
    title: 'Kiến Trúc Nghệ Thuật Đình Làng',
    shortTitle: 'Kiến trúc',
    subtitle: 'Nét chạm khắc tinh xảo, bố cục chữ Đinh truyền thống',
    image: '/architecture.png',
    description: 'Đình làng Sở Thượng quay mặt về hướng nam đón gió mát lành, phía trước có hồ bán nguyệt và cây đa cổ thụ. Tổng thể công trình gồm Cổng Nghi môn, Tả vu - Hữu vu, Tòa Đại bái 5 gian 2 dĩ và Tòa Hậu cung sâu thẳm. Điêu khắc gỗ tại đình mang phong cách chạm lộng, chạm nổi kênh bong tuyệt mỹ với đề tài tứ linh, hoa cúc vạn thọ và mây lửa thời Hậu Lê - Nguyễn.',
    highlights: [
      'Bộ vì kèo kết cấu "chồng rường giá chiêng" vững chãi bằng gỗ lim quý',
      'Bờ nóc đắp nổi "Lưỡng long triều nguyệt" biểu trưng cho sự hài hòa âm dương',
      'Các đầu dư chạm đầu rồng ngậm ngọc miệng mở rộng, bờm tóc cuộn bay sinh động',
      'Mái ngói mũi hài cổ kính uốn cong mềm mại bay bổng nơi góc đao'
    ],
    audioScript: 'Kiến trúc Đình làng Sở Thượng nổi bật với kết cấu khung gỗ lim vững chãi, hệ vì kèo chạm trổ rồng mây tinh xảo mang đậm dấu ấn mỹ thuật truyền thống Việt Nam.'
  },
  {
    id: 'artifacts',
    title: 'Di Vật & Cổ Vật Quý Giá',
    shortTitle: 'Hiện vật',
    subtitle: 'Kho tàng sắc phong, hương án, kiệu thờ sơn son thếp vàng',
    image: '/artifacts.png',
    description: 'Đình hiện còn lưu giữ hệ thống di vật đồ sộ bao gồm 18 đạo sắc phong của các triều đại phong kiến ban tặng cho Thành hoàng, kiệu bát cống tinh xảo thế kỷ XVIII, hệ thống hoành phi câu đối sơn then thếp vàng rực rỡ, cùng nhiều bia đá, chuông đồng và đồ tế tự quý giá khẳng định bề dày lịch sử ngàn năm văn hiến.',
    highlights: [
      '18 đạo sắc phong thời Hậu Lê và triều Nguyễn được bảo quản nguyên vẹn',
      'Kiệu bát cống chạm khắc rồng, phụng, hoa lá phủ vàng kim lộng lẫy',
      'Hương án gỗ sơn son thếp vàng đồ sộ đặt tại gian chính điện uy nghiêm',
      'Đôi hạc ngự lưng rùa chầu trước bàn thờ biểu tượng cho sự trường tồn vĩnh cửu'
    ],
    audioScript: 'Hệ thống di vật tại đình gồm hàng chục đạo sắc phong cổ kính, kiệu bát cống, hoành phi câu đối và chuông đồng, là bằng chứng lịch sử vô giá của cha ông để lại.'
  },
  {
    id: 'linh-lang',
    title: 'Thành Hoàng - Linh Lang Đại Vương',
    shortTitle: 'Linh Lang',
    subtitle: 'Vị thần hộ quốc an dân, hiển linh đánh tan giặc Tống',
    image: '/linh-lang.png',
    description: 'Đức Thánh Linh Lang Đại Vương là hoàng tử thứ tư của vua Lý Thánh Tông, mẹ là Hoàng phi Hạo Nương. Khi giặc Tống tràn sang xâm lược, hoàng tử đã đứng lên dẹp giặc, lập chiến công hiển hách trên phòng tuyến sông Như Nguyệt (sông Cầu). Sau khi hóa thân thành rồng bay về trời, Ngài được hàng trăm làng xã suy tôn làm Thành hoàng, ban cho dân làng Sở Thượng nghìn đời thờ phụng.',
    highlights: [
      'Vị thần tối thượng trong hệ thống Thần linh tứ trấn và Thăng Long cổ kính',
      'Chiến công hiển hách đánh giặc ngoại xâm gìn giữ nền độc lập non sông',
      'Lễ hội truyền thống linh thiêng diễn ra vào tháng 2 và tháng 3 âm lịch',
      'Nghi thức rước nước thiêng sông Hồng cầu cho quốc thái dân an, mùa màng bội thu'
    ],
    audioScript: 'Thành hoàng Linh Lang Đại Vương là danh tướng triều Lý có công đánh giặc Tống bảo vệ biên cương, được nhân dân tôn kính là vị thánh hộ quốc thương dân.'
  },
  {
    id: 'location',
    title: 'Vị Trí & Cẩm Nang Tham Quan',
    shortTitle: 'Vị trí',
    subtitle: 'Chỉ đường, thời gian mở cửa và quy định văn minh khi viếng đình',
    image: '/location.png',
    description: 'Đình làng Sở Thượng tọa lạc tại tổ dân phố Sở Thượng, phường Yên Sở, quận Hoàng Mai, Hà Nội. Nằm cách trung tâm hồ Hoàn Kiếm khoảng 8,5 km về phía nam, gần kề hồ điều hòa Yên Sở trong lành. Nơi đây là điểm đến lý tưởng cho các buổi học tập ngoại khóa, tham quan dã ngoại lịch sử và giáo dục truyền thống yêu nước cho thế hệ trẻ.',
    highlights: [
      'Địa chỉ: Phố Sở Thượng, Phường Yên Sở, Quận Hoàng Mai, Hà Nội',
      'Giao thông thuận tiện: Kết nối qua đường Vành đai 3, Tam Trinh, Giải Phóng',
      'Mở cửa phục vụ khách tham quan, học sinh nghiên cứu tất cả các ngày trong tuần',
      'Có hướng dẫn viên là các cụ cao niên thủ từ am hiểu sâu sắc truyền thống'
    ],
    audioScript: 'Đình làng Sở Thượng nằm tại phường Yên Sở, quận Hoàng Mai, Hà Nội. Di tích mở cửa chào đón các đoàn tham quan, thầy cô và học sinh đến nghiên cứu, học tập.'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: 'Năm 1471 (Thế kỷ XV)',
    era: 'Triều Lê Sơ (Lê Thánh Tông)',
    title: 'Khai hoang lập sở đồn điền Sở Thượng',
    description: 'Vua Lê Thánh Tông ban lệnh lập các sở đồn điền ven bờ nam sông Hồng, đưa cư dân và binh lính đến canh tác màu mỡ, đặt nền móng cho làng Sở Thượng ngày nay.'
  },
  {
    year: 'Năm 1680 - 1740',
    era: 'Thời Hậu Lê',
    title: 'Khởi dựng ngôi đình gỗ bề thế',
    description: 'Dân làng Sở Thượng cùng nhau công đức dựng ngôi đình lớn bằng gỗ tứ thiết, nghênh rước bài vị Đức Thánh Linh Lang Đại Vương làm Thành hoàng bảo trợ xóm làng.'
  },
  {
    year: 'Năm 1783 - 1889',
    era: 'Triều Tây Sơn & Triều Nguyễn',
    title: 'Ban tặng các sắc phong qua các đời vua',
    description: 'Các triều vua Cảnh Hưng, Gia Long, Minh Mạng, Thiệu Trị, Tự Đức liên tiếp ban sắc phong chuẩn cho làng Sở Thượng phụng thờ Linh Lang Thượng đẳng thần.'
  },
  {
    year: '1945 - 1954',
    era: 'Kháng chiến chống Pháp',
    title: 'Căn cứ bí mật bảo vệ cán bộ cách mạng',
    description: 'Đình làng, chùa và miếu Sở Thượng là hầm bí mật che chở cán bộ Thành ủy Hà Nội và Xứ ủy Bắc Kỳ, góp phần làm nên thắng lợi lịch sử của Thủ đô.'
  },
  {
    year: 'Năm 1998',
    era: 'Thời kỳ đổi mới',
    title: 'Xếp hạng Di tích Kiến trúc Nghệ thuật Quốc gia',
    description: 'Bộ Văn hóa - Thông tin chính thức công nhận cụm di tích Đình - Chùa Sở Thượng là Di tích Kiến trúc Nghệ thuật cấp Quốc gia cần bảo tồn nghiêm ngặt.'
  },
  {
    year: 'Hiện nay',
    era: 'Thời đại chuyển đổi số',
    title: 'Học liệu số & Không gian di sản xanh',
    description: 'Đình làng trở thành địa chỉ đỏ giáo dục truyền thống văn hóa - lịch sử cho học sinh các trường trên địa bàn quận Hoàng Mai và du khách thập phương.'
  }
];

export const ARTIFACTS_LIST: Artifact[] = [
  {
    id: 'art-1',
    name: '18 Đạo Sắc Phong Cổ',
    period: 'Thời Hậu Lê đến triều Nguyễn',
    category: 'Văn bản Hán Nôm',
    description: 'Hệ thống văn bản quý bằng giấy long đằng vẽ rồng ẩn mây, viền vàng kim, có dấu ấn son đỏ vương triều.',
    significance: 'Ghi nhận và tôn vinh công đức hộ quốc an dân của Thành hoàng Linh Lang Đại Vương qua nhiều triều đại.'
  },
  {
    id: 'art-2',
    name: 'Bộ Kiệu Bát Cống Rước Thánh',
    period: 'Thế kỷ XVIII',
    category: 'Đồ mộc chạm khắc tế tự',
    description: 'Gồm 8 đòn khiêng được đục chạm hình rồng uốn lượn tinh xảo, sơn son thếp vàng nguyên bản.',
    significance: 'Dùng trong nghi lễ rước kiệu thánh thiêng liêng vào ngày hội làng mùng 12 tháng Hai âm lịch.'
  },
  {
    id: 'art-3',
    name: 'Bức Đại Tự - Hoành Phi Cổ',
    period: 'Niên hiệu Khải Định (đầu thế kỷ XX)',
    category: 'Mỹ thuật sơn son thếp vàng',
    description: 'Chạm khắc 4 đại tự Hán tự "Hộ Quốc Tí Dân" (Bảo vệ đất nước, che chở nhân dân) viền rồng phượng.',
    significance: 'Biểu thị lòng biết ơn của trăm họ với vị anh hùng hoàng tử Lý Linh Lang có công giúp nước.'
  },
  {
    id: 'art-4',
    name: 'Hương Án Gỗ Sơn Son Thếp Vàng',
    period: 'Thời Nguyễn (Thế kỷ XIX)',
    category: 'Đồ thờ tự chính điện',
    description: 'Kích thước đồ sộ, chia làm nhiều tầng diềm chạm nổi tứ linh (Long, Ly, Quy, Phượng) và tứ quý.',
    significance: 'Nơi đặt lư hương, đỉnh đồng và đồ tế khí trang nghiêm nhất tại tòa Đại bái.'
  },
  {
    id: 'art-5',
    name: 'Chuông Đồng Cổ & Khánh Đá',
    period: 'Niên hiệu Cảnh Thịnh & Minh Mạng',
    category: 'Pháp khí & Âm nhạc cổ truyền',
    description: 'Chuông đồng đúc quai hình bồ lao, thân chuông khắc bài minh văn ghi lại họ tên người công đức đúc chuông.',
    significance: 'Âm thanh ngân vang mỗi dịp tế lễ mang lại sự bình yên, thanh tịnh cho toàn thể thôn làng.'
  },
  {
    id: 'art-6',
    name: 'Đôi Hạc Ngự Lưng Rùa Bằng Gỗ Quý',
    period: 'Thế kỷ XIX',
    category: 'Đồ thờ linh thú',
    description: 'Chim hạc ngậm cành sen thanh cao đứng trên lưng cụ rùa vững chãi, thếp vàng điểm xuyết.',
    significance: 'Tượng trưng cho sự gắn kết trời đất, âm dương hòa hợp và ước vọng trường tồn muôn thuở.'
  }
];

export const ARCHITECTURE_ZONES: ArchitecturalZone[] = [
  {
    name: 'Cổng Nghi Môn (Tam Quan Đình)',
    zone: 'Khu vực ngoại vi đón khách',
    description: 'Gồm 4 cột đồng trụ sừng sững đắp nghê chầu, lồng đèn trang trí tứ linh và câu đối Hán Nôm đối xứng.',
    features: ['Cột hoa biểu uy nghiêm', 'Đỉnh cột đắp hình lân chầu', 'Cổng mở rộng hướng về hồ sen']
  },
  {
    name: 'Sân Đình & Giếng Bán Nguyệt',
    zone: 'Không gian văn hóa cộng đồng',
    description: 'Lát gạch Bát Tràng cổ kính rợp bóng cây bồ đề và cây muỗm cổ thụ hàng trăm năm tuổi tỏa bóng mát rượi.',
    features: ['Nơi diễn ra các trò chơi dân gian', 'Hồ nước tụ thủy tụ phúc', 'Bia đá lưu danh tiền nhân']
  },
  {
    name: 'Tòa Đại Bái (Tiền Tế)',
    zone: 'Khu vực hành lễ trung tâm',
    description: 'Quy mô 5 gian 2 dĩ bề thế, vì nóc kiểu giá chiêng chồng rường, hệ thống cột gỗ lim tròn to lớn.',
    features: ['Chạm lộng rồng bay phượng múa', 'Cửa bức bàn gỗ lim chạm hoa sen', 'Bố trí hương án uy nghiêm']
  },
  {
    name: 'Tòa Hậu Cung Thâm Nghiêm',
    zone: 'Nơi phụng thờ Thánh vị cấm cung',
    description: 'Nối liền với Đại bái tạo hình chữ Đinh, nơi tôn trí khám thờ, long ngai, bài vị Linh Lang Đại Vương.',
    features: ['Không gian linh thiêng tĩnh mịch', 'Khám thờ sơn then rực rỡ', 'Nơi bảo quản 18 đạo sắc phong']
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Đình làng Sở Thượng thuộc địa phận hành chính nào hiện nay?',
    options: [
      'Phường Yên Sở, Quận Hoàng Mai, Thành phố Hà Nội',
      'Xã Bát Tràng, Huyện Gia Lâm, Thành phố Hà Nội',
      'Phường Láng Thượng, Quận Đống Đa, Thành phố Hà Nội',
      'Xã Đông Mỹ, Huyện Thanh Trì, Thành phố Hà Nội'
    ],
    correctIndex: 0,
    explanation: 'Đình làng Sở Thượng thuộc tổ dân phố Sở Thượng, phường Yên Sở, quận Hoàng Mai, Hà Nội.'
  },
  {
    id: 2,
    question: 'Làng Sở Thượng có nguồn gốc hình thành từ thế kỷ nào và gắn với vị vua nào?',
    options: [
      'Thế kỷ XI - Thời vua Lý Thái Tổ',
      'Thế kỷ XIII - Thời vua Trần Nhân Tông',
      'Thế kỷ XV - Thời vua Lê Thánh Tông',
      'Thế kỷ XIX - Thời vua Gia Long'
    ],
    correctIndex: 2,
    explanation: 'Dưới thời vua Lê Thánh Tông (nửa cuối thế kỷ XV), triều đình cho lập các sở đồn điền ven sông Hồng, khai hoang lập nên Sở Thượng.'
  },
  {
    id: 3,
    question: 'Vị Thành hoàng được phụng thờ tại Đình làng Sở Thượng là ai?',
    options: [
      'Quang Trung Nguyễn Huệ',
      'Đức Thánh Linh Lang Đại Vương',
      'Tản Viên Sơn Thánh',
      'Phù Đổng Thiên Vương'
    ],
    correctIndex: 1,
    explanation: 'Đình thờ Đức Thánh Linh Lang Đại Vương, hoàng tử triều Lý có công đánh giặc Tống xâm lược.'
  },
  {
    id: 4,
    question: 'Năm nào cụm di tích Đình - Chùa Sở Thượng được Bộ Văn hóa Thông tin xếp hạng Di tích Quốc gia?',
    options: [
      'Năm 1975',
      'Năm 1990',
      'Năm 1998',
      'Năm 2010'
    ],
    correctIndex: 2,
    explanation: 'Năm 1998, Đình - Chùa Sở Thượng chính thức được xếp hạng Di tích Kiến trúc Nghệ thuật cấp Quốc gia.'
  },
  {
    id: 5,
    question: 'Đình làng Sở Thượng còn lưu giữ bao nhiêu đạo sắc phong cổ của các triều đại phong kiến?',
    options: [
      '3 đạo sắc phong',
      '8 đạo sắc phong',
      '18 đạo sắc phong',
      '36 đạo sắc phong'
    ],
    correctIndex: 2,
    explanation: 'Đình lưu giữ nguyên vẹn 18 đạo sắc phong quý báu từ thời Hậu Lê cho đến triều Nguyễn.'
  },
  {
    id: 6,
    question: 'Trong thời kỳ kháng chiến chống thực dân Pháp, cụm di tích Sở Thượng có vai trò đặc biệt gì?',
    options: [
      'Là xưởng may quân phục',
      'Là căn cứ bí mật nuôi giấu cán bộ Xứ ủy Bắc Kỳ và Thành ủy Hà Nội',
      'Là trường đào tạo sĩ quan quân sự',
      'Là kho tàng lương thực quốc gia'
    ],
    correctIndex: 1,
    explanation: 'Đình và chùa Sở Thượng là an toàn khu, cơ sở bí mật nuôi giấu các đồng chí lãnh đạo Xứ ủy Bắc Kỳ và Thành ủy Hà Nội.'
  },
  {
    id: 7,
    question: 'Đặc trưng điêu khắc gỗ nổi bật tại tòa Đại bái Đình làng Sở Thượng mang đề tài gì?',
    options: [
      'Hình học trừu tượng phương Tây',
      'Tứ linh (Long - Ly - Quy - Phụng) và hoa cúc, rồng mây tinh xảo',
      'Chiến xa và binh khí hiện đại',
      'Cảnh chăn nuôi săn bắn phương Bắc'
    ],
    correctIndex: 1,
    explanation: 'Mỹ thuật điêu khắc gỗ cổ truyền chạm lộng đề tài Tứ linh, hoa lá vân mây uốn lượn mang đậm bản sắc văn hóa Việt.'
  },
  {
    id: 8,
    question: 'Lễ hội truyền thống tưởng nhớ Thành hoàng làng thường diễn ra vào thời gian nào?',
    options: [
      'Tháng Tám âm lịch',
      'Tháng Một âm lịch (Tết Nguyên Đán)',
      'Tháng Hai hoặc tháng Ba âm lịch (ngày 11-12)',
      'Đêm giao thừa'
    ],
    correctIndex: 2,
    explanation: 'Lễ hội thường niên được tổ chức vào trung tuần tháng Hai hoặc tháng Ba âm lịch với các nghi lễ rước nước, tế thánh và trò chơi dân gian.'
  }
];

export const STUDY_FLASHCARDS = [
  {
    front: 'Tên di tích',
    back: 'Đình làng Sở Thượng (Cụm di tích Đình - Chùa - Miếu Sở Thượng)',
    tag: 'Địa danh'
  },
  {
    front: 'Vị trí địa lý',
    back: 'Tổ dân phố Sở Thượng, phường Yên Sở, quận Hoàng Mai, Hà Nội',
    tag: 'Địa lý'
  },
  {
    front: 'Thành hoàng làng',
    back: 'Đức Thánh Linh Lang Đại Vương (Thời vua Lý Thánh Tông thế kỷ XI)',
    tag: 'Nhân vật'
  },
  {
    front: 'Thời gian lập làng',
    back: 'Thế kỷ XV dưới triều vua Lê Thánh Tông (sở đồn điền ven đê sông Hồng)',
    tag: 'Lịch sử'
  },
  {
    front: 'Số lượng sắc phong',
    back: '18 đạo sắc phong thời Hậu Lê và triều Nguyễn',
    tag: 'Cổ vật'
  },
  {
    front: 'Cấp xếp hạng',
    back: 'Di tích Kiến trúc Nghệ thuật cấp Quốc gia (Quyết định năm 1998)',
    tag: 'Xếp hạng'
  }
];
