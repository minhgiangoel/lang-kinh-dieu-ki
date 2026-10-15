export type LayerType = 'image' | 'character' | 'text' | 'button' | 'nav';

export interface CanvasLayer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
  zIndex: number;
  // Percentage coordinates relative to 1672 x 941 canvas
  top: number;
  left: number;
  width: number;
  height: number;
  // Visual & Media properties
  src?: string;
  text?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'semibold' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number; // 0 to 100
  lockAspectRatio?: boolean;
  aspectRatio?: string;
  animation?: 'none' | 'breathe' | 'float' | 'pulse' | 'bounce';
  // Action properties (for button / interactive elements)
  action?: 'nav' | 'modal' | 'search' | 'url';
  target?: string;
  // Protection flag for base background
  isOriginalProtected?: boolean;
}

export type ScreenLayerKey = 'home' | 'location' | 'history' | 'linh-lang' | 'architecture' | 'artifacts';

export type ScreenLayersState = Record<ScreenLayerKey, CanvasLayer[]>;

export const DEFAULT_HOME_LAYERS: CanvasLayer[] = [
  {
    id: 'layer-bg-home',
    name: 'Ảnh nền di tích & khung cảnh',
    type: 'image',
    visible: true,
    locked: true,
    zIndex: 1,
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    src: '/assets/home/home-background.png',
    opacity: 100,
    isOriginalProtected: true,
  },
  {
    id: 'layer-nav-bar',
    name: 'Thanh điều hướng đỉnh',
    type: 'nav',
    visible: true,
    locked: false,
    zIndex: 20,
    top: 0,
    left: 0,
    width: 100,
    height: 6.2,
    opacity: 100,
    isOriginalProtected: true,
  },
  {
    id: 'layer-character-main',
    name: 'Nhân vật Măng Non chính (Tương tác)',
    type: 'character',
    visible: true,
    locked: false,
    zIndex: 25,
    top: 48.5,
    left: 1.0,
    width: 30.5,
    height: 50.0,
    src: '/assets/home/mang-non-chinh.png',
    lockAspectRatio: true,
    aspectRatio: '1312 / 1199',
    opacity: 100,
    animation: 'float',
  },
  {
    id: 'layer-character-secondary',
    name: 'Nhân vật Măng Non phụ',
    type: 'image',
    visible: true,
    locked: false,
    zIndex: 15,
    top: 67.5,
    left: 76.5,
    width: 21.0,
    height: 31.0,
    src: '/assets/home/mang-non-phu.png',
    lockAspectRatio: true,
    opacity: 100,
    animation: 'float',
  },
  {
    id: 'layer-btn-explore',
    name: 'Nút chính: Khám phá ngay',
    type: 'button',
    visible: true,
    locked: false,
    zIndex: 10,
    top: 46.5,
    left: 21.0,
    width: 16.2,
    height: 7.2,
    text: 'Khám phá ngay',
    action: 'nav',
    target: 'architecture',
    opacity: 100,
  },
  {
    id: 'layer-btn-learn-more',
    name: 'Nút phụ: Tìm hiểu thêm',
    type: 'button',
    visible: true,
    locked: false,
    zIndex: 10,
    top: 89.8,
    left: 43.8,
    width: 14.8,
    height: 5.5,
    text: 'Tìm hiểu thêm',
    action: 'nav',
    target: 'location',
    opacity: 100,
  },
];

export const DEFAULT_LOCATION_LAYERS: CanvasLayer[] = [
  {
    id: 'layer-bg-location',
    name: 'Ảnh gốc: Vị trí địa lý',
    type: 'image',
    visible: true,
    locked: true,
    zIndex: 1,
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    src: '/location.png',
    opacity: 100,
    isOriginalProtected: true,
  },
  {
    id: 'layer-nav-location',
    name: 'Thanh điều hướng đỉnh',
    type: 'nav',
    visible: true,
    locked: false,
    zIndex: 20,
    top: 0,
    left: 0,
    width: 100,
    height: 6.2,
    opacity: 100,
    isOriginalProtected: true,
  },
  {
    id: 'layer-loc-map-btn',
    name: 'Nút: Mở bản đồ Google Maps',
    type: 'button',
    visible: true,
    locked: false,
    zIndex: 10,
    top: 26.5,
    left: 64.5,
    width: 28.5,
    height: 29.5,
    text: 'Xem bản đồ vệ tinh',
    action: 'url',
    target: 'https://maps.google.com/?q=Đình+Sở+Thượng+Yên+Sở+Hoàng+Mai+Hà+Nội',
    opacity: 100,
  },
];

export const DEFAULT_HISTORY_LAYERS: CanvasLayer[] = [
  {
    id: 'layer-bg-history',
    name: 'Ảnh gốc: Lịch sử hình thành',
    type: 'image',
    visible: true,
    locked: true,
    zIndex: 1,
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    src: '/history.png',
    opacity: 100,
    isOriginalProtected: true,
  },
  {
    id: 'layer-nav-history',
    name: 'Thanh điều hướng đỉnh',
    type: 'nav',
    visible: true,
    locked: false,
    zIndex: 20,
    top: 0,
    left: 0,
    width: 100,
    height: 6.2,
    opacity: 100,
    isOriginalProtected: true,
  },
];

export const DEFAULT_LINH_LANG_LAYERS: CanvasLayer[] = [
  {
    id: 'layer-bg-linh-lang',
    name: 'Ảnh gốc: Linh Lang Đại Vương',
    type: 'image',
    visible: true,
    locked: true,
    zIndex: 1,
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    src: '/linh-lang.png',
    opacity: 100,
    isOriginalProtected: true,
  },
  {
    id: 'layer-nav-linh-lang',
    name: 'Thanh điều hướng đỉnh',
    type: 'nav',
    visible: true,
    locked: false,
    zIndex: 20,
    top: 0,
    left: 0,
    width: 100,
    height: 6.2,
    opacity: 100,
    isOriginalProtected: true,
  },
];

export const DEFAULT_ARCHITECTURE_LAYERS: CanvasLayer[] = [
  {
    id: 'layer-bg-architecture',
    name: 'Ảnh gốc: Kiến trúc Đình làng',
    type: 'image',
    visible: true,
    locked: true,
    zIndex: 1,
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    src: '/architecture.png',
    opacity: 100,
    isOriginalProtected: true,
  },
  {
    id: 'layer-nav-arch',
    name: 'Thanh điều hướng đỉnh',
    type: 'nav',
    visible: true,
    locked: false,
    zIndex: 20,
    top: 0,
    left: 0,
    width: 100,
    height: 6.2,
    opacity: 100,
    isOriginalProtected: true,
  },
];

export const DEFAULT_ARTIFACTS_LAYERS: CanvasLayer[] = [
  {
    id: 'layer-bg-artifacts',
    name: 'Ảnh gốc: Di vật cổ & Hiện vật',
    type: 'image',
    visible: true,
    locked: true,
    zIndex: 1,
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    src: '/artifacts.png',
    opacity: 100,
    isOriginalProtected: true,
  },
  {
    id: 'layer-nav-artifacts',
    name: 'Thanh điều hướng đỉnh',
    type: 'nav',
    visible: true,
    locked: false,
    zIndex: 20,
    top: 0,
    left: 0,
    width: 100,
    height: 6.2,
    opacity: 100,
    isOriginalProtected: true,
  },
];

export const INITIAL_ALL_SCREEN_LAYERS: ScreenLayersState = {
  home: DEFAULT_HOME_LAYERS,
  location: DEFAULT_LOCATION_LAYERS,
  history: DEFAULT_HISTORY_LAYERS,
  'linh-lang': DEFAULT_LINH_LANG_LAYERS,
  architecture: DEFAULT_ARCHITECTURE_LAYERS,
  artifacts: DEFAULT_ARTIFACTS_LAYERS,
};

export const SCREEN_DISPLAY_NAMES: Record<ScreenLayerKey, string> = {
  home: 'Trang chủ (Khám phá & Giới thiệu)',
  location: '1. Vị trí địa lý Sở Thượng',
  history: '2. Lịch sử hình thành & phát triển',
  'linh-lang': '3. Nhân vật lịch sử - Linh Lang Đại Vương',
  architecture: '4. Kiến trúc Đình làng Sở Thượng',
  artifacts: '5. Hiện vật di sản & Di vật quý',
};
