import React, { useState } from 'react';
import { useLayers } from '../../context/LayerContext';
import { Lock, KeyRound, X, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin } = useLayers();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu quản trị.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await loginAdmin(password.trim());
    setLoading(false);

    if (result.success) {
      setPassword('');
      onClose();
    } else {
      setError(result.message || 'Mật khẩu chưa chính xác. Vui lòng thử lại.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden text-stone-100">
        
        {/* Header gradient banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-900/80 via-yellow-900/60 to-stone-900 border-b border-amber-600/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-culture text-lg font-bold text-amber-200">
                Chế độ Giáo viên & Quản trị
              </h3>
              <p className="text-xs text-amber-300/80">Trình biên tập Layer trực quan</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3.5 bg-amber-950/40 border border-amber-800/40 rounded-xl text-xs text-amber-200/90 leading-relaxed">
            <p className="flex items-center gap-1.5 font-semibold text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Dành cho Giáo viên tiểu học:
            </p>
            Bạn có thể tùy ý kéo thả, chỉnh sửa nhân vật Măng Non, các nút bấm, loa đọc và nội dung trực tiếp trên giao diện như Canva mà không cần lập trình.
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-stone-300">
              Mật khẩu truy cập
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu (ví dụ: 1806 hoặc admin)"
                className="w-full pl-9 pr-3 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                autoFocus
              />
            </div>
            <p className="text-[11px] text-stone-400">
              Gợi ý mật khẩu giáo viên: <span className="text-amber-300 font-mono">1806</span> hoặc <span className="text-amber-300 font-mono">admin</span>
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-700/60 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-sm font-medium transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold rounded-xl text-sm shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Đang mở...' : 'Mở Trình Biên Tập'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
