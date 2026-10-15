import React, { useState } from 'react';
import { useLayers } from '../../context/LayerContext';
import { ScreenLayerKey, SCREEN_DISPLAY_NAMES } from '../../types/layer';
import { LayerSidebarLeft } from './LayerSidebarLeft';
import { CanvasStage } from './CanvasStage';
import { LayerPropertiesRight } from './LayerPropertiesRight';
import {
  Save,
  Undo2,
  Redo2,
  RotateCcw,
  Eye,
  LogOut,
  Sparkles,
  CheckCircle2,
  Layers,
  ChevronDown,
  Monitor,
} from 'lucide-react';

interface AdminStudioProps {
  onClose: () => void;
}

export const AdminStudio: React.FC<AdminStudioProps> = ({ onClose }) => {
  const {
    activeScreen,
    setActiveScreen,
    canUndo,
    canRedo,
    undo,
    redo,
    resetToDefaults,
    saveToServer,
    isSaving,
    hasUnsavedChanges,
    logoutAdmin,
  } = useLayers();

  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const handleSave = async () => {
    const success = await saveToServer();
    if (success) {
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3000);
    }
  };

  const handleLogout = async () => {
    if (hasUnsavedChanges) {
      const confirmExit = window.confirm(
        'Bạn có thay đổi chưa lưu. Bạn có muốn lưu trước khi thoát không?'
      );
      if (confirmExit) {
        await saveToServer();
      }
    }
    await logoutAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-stone-950 text-stone-100 select-none animate-fadeIn">
      
      {/* TOP HEADER TOOLBAR */}
      <header className="h-14 px-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between shadow-md shrink-0">
        
        {/* Left: Branding & Screen Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md">
              <Layers className="w-4 h-4 text-stone-950" />
            </div>
            <div>
              <h1 className="font-serif-culture text-sm font-bold text-amber-200 tracking-wide flex items-center gap-2">
                Trình Biên Tập Layer
                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Dành cho Giáo viên
                </span>
              </h1>
            </div>
          </div>

          <div className="h-5 w-[1px] bg-stone-700 mx-1 hidden sm:block" />

          {/* Screen Dropdown */}
          <div className="relative flex items-center gap-2">
            <span className="text-xs text-stone-400 hidden md:inline">Màn hình:</span>
            <select
              value={activeScreen}
              onChange={(e) => setActiveScreen(e.target.value as ScreenLayerKey)}
              className="bg-stone-800 border border-stone-700 hover:border-amber-500 text-stone-100 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 transition cursor-pointer font-medium"
            >
              {Object.entries(SCREEN_DISPLAY_NAMES).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Undo, Redo, Reset */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
            title="Hoàn tác (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
            title="Làm lại (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-stone-700 mx-1" />

          <button
            type="button"
            onClick={() => resetToDefaults()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-950/60 text-stone-300 hover:text-amber-300 border border-stone-700 transition text-xs cursor-pointer"
            title="Khôi phục màn hình này về mẫu gốc ban đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Khôi phục gốc</span>
          </button>
        </div>

        {/* Right: Save, Student Preview, Exit */}
        <div className="flex items-center gap-2.5">
          
          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition cursor-pointer ${
              saveSuccessMsg
                ? 'bg-emerald-600 text-white'
                : hasUnsavedChanges
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
            }`}
            title="Lưu lại toàn bộ thay đổi để học sinh xem"
          >
            {saveSuccessMsg ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã lưu thành công!</span>
              </>
            ) : isSaving ? (
              <span>Đang lưu...</span>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{hasUnsavedChanges ? 'Lưu thay đổi' : 'Đã lưu'}</span>
              </>
            )}
          </button>

          {/* Student Mode / Preview Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 border border-amber-700/50 text-xs font-medium transition cursor-pointer"
            title="Thoát trình biên tập và quay lại xem trang web như học sinh"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Về xem trang web</span>
          </button>

          {/* Logout button */}
          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-lg bg-stone-800 hover:bg-red-950/60 text-stone-400 hover:text-red-300 transition cursor-pointer"
            title="Đăng xuất chế độ Giáo viên"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* 3-COLUMN STUDIO WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. Left Column: Layer List & Add */}
        <LayerSidebarLeft />

        {/* 2. Middle Column: Interactive Canvas Stage */}
        <CanvasStage />

        {/* 3. Right Column: Property Inspector */}
        <LayerPropertiesRight />
      </div>

    </div>
  );
};
