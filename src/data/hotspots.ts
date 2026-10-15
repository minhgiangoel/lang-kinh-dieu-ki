export interface Hotspot {
  id: string;
  label: string;
  top: number;    // %
  left: number;   // %
  width: number;  // %
  height: number; // %
  action: 'nav' | 'modal' | 'search';
  target?: string;
  description?: string;
}

export type ScreenId = 'home' | 'location' | 'history' | 'linh-lang' | 'architecture' | 'artifacts';

export interface ScreenConfig {
  id: ScreenId;
  name: string;
  image: string;
  aspectRatio: string; // e.g. '1672 / 941' or '1536 / 1024'
  hotspots: Hotspot[];
}

// Common header bar for 1536x1024 pages
const commonHeaderHotspots1536: Hotspot[] = [
  { id: 'logo', label: 'Logo Đình Làng Sở Thượng', top: 1.0, left: 3.5, width: 22.0, height: 4.5, action: 'nav', target: 'home' },
  { id: 'nav-home', label: 'Trang chủ', top: 1.5, left: 32.5, width: 6.0, height: 3.2, action: 'nav', target: 'home' },
  { id: 'nav-intro', label: 'Giới thiệu', top: 1.5, left: 40.0, width: 6.2, height: 3.2, action: 'nav', target: 'location' },
  { id: 'nav-explore', label: 'Khám phá di tích', top: 1.5, left: 47.5, width: 9.5, height: 3.2, action: 'nav', target: 'architecture' },
  { id: 'nav-festival', label: 'Lễ hội', top: 1.5, left: 58.5, width: 4.5, height: 3.2, action: 'modal', target: 'festival' },
  { id: 'nav-heritage', label: 'Giá trị di sản', top: 1.5, left: 64.5, width: 7.5, height: 3.2, action: 'modal', target: 'heritage' },
  { id: 'nav-preservation', label: 'Gìn giữ', top: 1.5, left: 73.5, width: 5.0, height: 3.2, action: 'modal', target: 'preservation' },
  { id: 'nav-library', label: 'Thư viện', top: 1.5, left: 79.8, width: 5.5, height: 3.2, action: 'modal', target: 'library' },
  { id: 'nav-search', label: 'Tìm kiếm', top: 1.2, left: 91.0, width: 3.8, height: 3.8, action: 'search' },
];

export const SCREENS: Record<ScreenId, ScreenConfig> = {
  home: {
    id: 'home',
    name: 'Trang chủ',
    image: '/home.png',
    aspectRatio: '1672 / 941',
    hotspots: [
      { id: 'h-logo', label: 'Logo Đình Làng Sở Thượng', top: 1.0, left: 3.0, width: 22.0, height: 5.0, action: 'nav', target: 'home' },
      { id: 'h-nav-home', label: 'Trang chủ', top: 1.6, left: 32.5, width: 6.0, height: 4.2, action: 'nav', target: 'home' },
      { id: 'h-nav-intro', label: 'Giới thiệu', top: 1.6, left: 40.0, width: 5.5, height: 4.2, action: 'nav', target: 'location' },
      { id: 'h-nav-explore', label: 'Khám phá di tích', top: 1.6, left: 47.0, width: 9.2, height: 4.2, action: 'nav', target: 'architecture' },
      { id: 'h-nav-fest', label: 'Lễ hội', top: 1.6, left: 57.8, width: 4.2, height: 4.2, action: 'modal', target: 'festival' },
      { id: 'h-nav-val', label: 'Giá trị di sản', top: 1.6, left: 63.5, width: 7.2, height: 4.2, action: 'modal', target: 'heritage' },
      { id: 'h-nav-keep', label: 'Gìn giữ', top: 1.6, left: 72.2, width: 4.8, height: 4.2, action: 'modal', target: 'preservation' },
      { id: 'h-nav-lib', label: 'Thư viện', top: 1.6, left: 78.5, width: 5.2, height: 4.2, action: 'modal', target: 'library' },
      { id: 'h-nav-search', label: 'Tìm kiếm', top: 1.3, left: 89.2, width: 3.5, height: 4.8, action: 'search' },
      // Banner CTA button "Khám phá ngay"
      { id: 'btn-explore-now', label: 'Nút: Khám phá ngay', top: 46.5, left: 21.0, width: 16.2, height: 7.2, action: 'nav', target: 'architecture' },
      // Bottom CTA button "Tìm hiểu thêm"
      { id: 'btn-learn-more', label: 'Nút: Tìm hiểu thêm', top: 89.8, left: 43.8, width: 14.8, height: 5.5, action: 'nav', target: 'location' },
    ]
  },

  location: {
    id: 'location',
    name: 'Vị trí di tích',
    image: '/location.png',
    aspectRatio: '1536 / 1024',
    hotspots: [
      ...commonHeaderHotspots1536,
      // Breadcrumb "Trang chủ"
      { id: 'loc-bc-home', label: 'Breadcrumb: Trang chủ', top: 32.5, left: 3.0, width: 6.2, height: 2.2, action: 'nav', target: 'home' },
      // Sidebar items
      { id: 'loc-sb-1', label: '1. Vị trí di tích (Hiện tại)', top: 32.5, left: 2.8, width: 19.0, height: 7.0, action: 'nav', target: 'location' },
      { id: 'loc-sb-2', label: '2. Lịch sử hình thành và những đổi thay', top: 41.2, left: 2.8, width: 19.0, height: 7.2, action: 'nav', target: 'history' },
      { id: 'loc-sb-3', label: '3. Nhân vật lịch sử', top: 50.0, left: 2.8, width: 19.0, height: 7.0, action: 'nav', target: 'linh-lang' },
      { id: 'loc-sb-4', label: '4. Kiến trúc', top: 57.0, left: 2.8, width: 19.0, height: 6.8, action: 'nav', target: 'architecture' },
      { id: 'loc-sb-5', label: '5. Những đồ vật được lưu giữ', top: 63.8, left: 2.8, width: 19.0, height: 7.0, action: 'nav', target: 'artifacts' },
      // Interactive card on map
      { id: 'loc-map-btn', label: 'Mở bản đồ vị trí thực tế', top: 72.0, left: 25.0, width: 70.0, height: 23.0, action: 'modal', target: 'map-guide' },
    ]
  },

  history: {
    id: 'history',
    name: 'Lịch sử hình thành',
    image: '/history.png',
    aspectRatio: '1536 / 1024',
    hotspots: [
      ...commonHeaderHotspots1536,
      // Breadcrumb "Trang chủ"
      { id: 'his-bc-home', label: 'Breadcrumb: Trang chủ', top: 32.5, left: 3.2, width: 6.5, height: 2.5, action: 'nav', target: 'home' },
      // Sidebar items
      { id: 'his-sb-1', label: '1. Vị trí di tích', top: 37.2, left: 2.0, width: 18.5, height: 7.8, action: 'nav', target: 'location' },
      { id: 'his-sb-2', label: '2. Lịch sử hình thành và những đổi thay', top: 45.0, left: 2.0, width: 18.5, height: 8.0, action: 'nav', target: 'history' },
      { id: 'his-sb-3', label: '3. Nhân vật lịch sử', top: 53.0, left: 2.0, width: 18.5, height: 7.8, action: 'nav', target: 'linh-lang' },
      { id: 'his-sb-4', label: '4. Kiến trúc', top: 61.2, left: 2.0, width: 18.5, height: 7.8, action: 'nav', target: 'architecture' },
      { id: 'his-sb-5', label: '5. Những đồ vật được lưu giữ', top: 69.0, left: 2.0, width: 18.5, height: 9.2, action: 'nav', target: 'artifacts' },
    ]
  },

  'linh-lang': {
    id: 'linh-lang',
    name: 'Nhân vật lịch sử Linh Lang',
    image: '/linh-lang.png',
    aspectRatio: '1536 / 1024',
    hotspots: [
      ...commonHeaderHotspots1536,
      // Breadcrumb "Trang chủ"
      { id: 'll-bc-home', label: 'Breadcrumb: Trang chủ', top: 34.2, left: 3.2, width: 5.0, height: 2.2, action: 'nav', target: 'home' },
      { id: 'll-bc-intro', label: 'Breadcrumb: Giới thiệu', top: 34.2, left: 9.0, width: 5.0, height: 2.2, action: 'nav', target: 'location' },
      // Sidebar items
      { id: 'll-sb-1', label: '1. Vị trí di tích', top: 39.8, left: 2.5, width: 17.5, height: 4.8, action: 'nav', target: 'location' },
      { id: 'll-sb-2', label: '2. Lịch sử hình thành và những đổi thay', top: 46.2, left: 2.5, width: 17.5, height: 5.5, action: 'nav', target: 'history' },
      { id: 'll-sb-3', label: '3. Nhân vật lịch sử (Hiện tại)', top: 52.5, left: 2.5, width: 18.5, height: 7.5, action: 'nav', target: 'linh-lang' },
      { id: 'll-sb-4', label: '4. Kiến trúc', top: 61.2, left: 2.5, width: 17.5, height: 4.8, action: 'nav', target: 'architecture' },
      { id: 'll-sb-5', label: '5. Những đồ vật được lưu giữ', top: 68.8, left: 2.5, width: 17.5, height: 5.5, action: 'nav', target: 'artifacts' },
    ]
  },

  architecture: {
    id: 'architecture',
    name: 'Kiến trúc đình làng',
    image: '/architecture.png',
    aspectRatio: '1536 / 1024',
    hotspots: [
      ...commonHeaderHotspots1536,
      // Breadcrumb "Trang chủ"
      { id: 'arch-bc-home', label: 'Breadcrumb: Trang chủ', top: 32.5, left: 2.8, width: 5.5, height: 2.2, action: 'nav', target: 'home' },
      // Sidebar items
      { id: 'arch-sb-1', label: '1. Lịch sử', top: 37.0, left: 2.0, width: 18.2, height: 5.5, action: 'nav', target: 'history' },
      { id: 'arch-sb-2', label: '2. Linh Lang Đại Vương', top: 43.8, left: 2.0, width: 18.2, height: 5.5, action: 'nav', target: 'linh-lang' },
      { id: 'arch-sb-3', label: '3. Kiến trúc (Hiện tại)', top: 49.5, left: 2.0, width: 18.2, height: 7.2, action: 'nav', target: 'architecture' },
      { id: 'arch-sb-4', label: '4. Hiện vật', top: 58.2, left: 2.0, width: 18.2, height: 5.5, action: 'nav', target: 'artifacts' },
      // Interactive Diagram Zones on the floor plan
      { id: 'arch-hau-cung', label: 'Sơ đồ: Hậu cung', top: 44.5, left: 77.0, width: 18.0, height: 4.5, action: 'modal', target: 'hau-cung' },
      { id: 'arch-trung-cung', label: 'Sơ đồ: Trung cung', top: 50.0, left: 77.0, width: 18.0, height: 4.5, action: 'modal', target: 'trung-cung' },
      { id: 'arch-dai-bai', label: 'Sơ đồ: Đại bái', top: 55.5, left: 77.0, width: 18.0, height: 4.5, action: 'modal', target: 'dai-bai' },
      { id: 'arch-san-dinh', label: 'Sơ đồ: Sân đình', top: 61.0, left: 77.0, width: 18.0, height: 4.5, action: 'modal', target: 'san-dinh' },
      { id: 'arch-nghi-mon', label: 'Sơ đồ: Nghi môn', top: 66.5, left: 77.0, width: 18.0, height: 4.5, action: 'modal', target: 'nghi-mon' },
      { id: 'arch-cong-dinh', label: 'Sơ đồ: Cổng đình', top: 72.0, left: 77.0, width: 18.0, height: 4.5, action: 'modal', target: 'cong-dinh' },
    ]
  },

  artifacts: {
    id: 'artifacts',
    name: 'Hiện vật & Đồ vật lưu giữ',
    image: '/artifacts.png',
    aspectRatio: '1536 / 1024',
    hotspots: [
      ...commonHeaderHotspots1536,
      // Breadcrumb "Trang chủ"
      { id: 'art-bc-home', label: 'Breadcrumb: Trang chủ', top: 29.2, left: 2.5, width: 5.5, height: 2.2, action: 'nav', target: 'home' },
      // Sidebar items
      { id: 'art-sb-1', label: '1. Lịch sử', top: 32.0, left: 1.8, width: 17.8, height: 7.0, action: 'nav', target: 'history' },
      { id: 'art-sb-2', label: '2. Linh Lang Đại Vương', top: 40.0, left: 1.8, width: 17.8, height: 7.0, action: 'nav', target: 'linh-lang' },
      { id: 'art-sb-3', label: '3. Kiến trúc', top: 46.8, left: 1.8, width: 17.8, height: 7.0, action: 'nav', target: 'architecture' },
      { id: 'art-sb-4', label: '4. Hiện vật / 5. Những đồ vật được lưu giữ', top: 53.5, left: 1.8, width: 17.8, height: 13.0, action: 'nav', target: 'artifacts' },
      // Artifact Items Quick Detail Hotspots
      { id: 'art-sac-phong', label: '1. Sắc phong', top: 49.5, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-sac-phong' },
      { id: 'art-hoanh-phi', label: '2. Hoành phi', top: 55.0, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-hoanh-phi' },
      { id: 'art-cau-doi', label: '3. Câu đối', top: 60.5, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-cau-doi' },
      { id: 'art-cua-vong', label: '4. Cửa võng', top: 66.0, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-cua-vong' },
      { id: 'art-bat-huong', label: '5. Bát hương', top: 71.5, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-bat-huong' },
      { id: 'art-chan-nen', label: '6. Chân nến', top: 77.0, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-chan-nen' },
      { id: 'art-lu-huong', label: '7. Lư hương', top: 82.5, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-lu-huong' },
      { id: 'art-ngai-tho', label: '8. Ngai thờ', top: 88.0, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-ngai-tho' },
      { id: 'art-bai-vi', label: '9. Bài vị', top: 93.5, left: 24.5, width: 23.0, height: 5.0, action: 'modal', target: 'art-bai-vi' },
    ]
  }
};
