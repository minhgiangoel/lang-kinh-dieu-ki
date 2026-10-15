import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Download, Info } from 'lucide-react';

interface OriginalGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImage: string;
  title: string;
}

export const OriginalGalleryModal: React.FC<OriginalGalleryModalProps> = ({
  isOpen,
  onClose,
  initialImage,
  title
}) => {
  const [zoom, setZoom] = useState(1);
  const [selectedImage, setSelectedImage] = useState(initialImage);

  const images = [
    { src: '/home.png', label: 'Trang Chủ Tổng Quan', id: 'home' },
    { src: '/history.png', label: 'Lịch Sử Lập Làng', id: 'history' },
    { src: '/architecture.png', label: 'Kiến Trúc & Hoa Văn', id: 'architecture' },
    { src: '/artifacts.png', label: 'Cổ Vật & Sắc Phong', id: 'artifacts' },
    { src: '/linh-lang.png', label: 'Đức Thánh Linh Lang', id: 'linh-lang' },
    { src: '/location.png', label: 'Bản Đồ & Vị Trí', id: 'location' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative flex flex-col w-full max-w-6xl h-[90vh] bg-stone-900 border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden text-stone-100">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950/80 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h3 className="text-lg font-semibold text-amber-200">
              Tư liệu gốc: {title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.25, 2.5))}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.75))}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300"
            >
              Mặc định (100%)
            </button>
            <a
              href={selectedImage}
              download
              className="p-2 rounded-lg bg-amber-800/80 hover:bg-amber-700 text-white transition ml-2"
              title="Tải tư liệu gốc"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-950 hover:bg-red-800 text-red-200 transition ml-2"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-stone-950/60">
          <div
            style={{ transform: `scale(${zoom})`, transition: 'transform 0.15s ease-out' }}
            className="flex items-center justify-center origin-center max-w-full max-h-full"
          >
            <img
              src={selectedImage}
              alt={title}
              className="max-h-[70vh] object-contain rounded-lg shadow-2xl border border-stone-800"
            />
          </div>
        </div>

        {/* Thumbnail Selector Bar */}
        <div className="p-3 bg-stone-950/90 border-t border-stone-800 flex items-center justify-center gap-3 overflow-x-auto">
          {images.map(img => (
            <button
              key={img.id}
              onClick={() => {
                setSelectedImage(img.src);
                setZoom(1);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all whitespace-nowrap ${
                selectedImage === img.src
                  ? 'border-amber-500 bg-amber-950/70 text-amber-200 shadow-md ring-1 ring-amber-500/50'
                  : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <img src={img.src} alt="" className="w-6 h-6 object-cover rounded" />
              <span>{img.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
