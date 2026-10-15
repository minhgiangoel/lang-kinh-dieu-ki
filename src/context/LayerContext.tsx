import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  CanvasLayer,
  LayerType,
  ScreenLayerKey,
  ScreenLayersState,
  INITIAL_ALL_SCREEN_LAYERS,
} from '../types/layer';

const LOCAL_STORAGE_KEY = 'lang_kinh_dieu_ki_layers_v1';
const ADMIN_TOKEN_KEY = 'lang_kinh_dieu_ki_adm_token';

interface LayerContextType {
  layers: ScreenLayersState;
  activeScreen: ScreenLayerKey;
  selectedLayerId: string | null;
  selectedLayer: CanvasLayer | null;
  isAdmin: boolean;
  isEditorOpen: boolean;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  canUndo: boolean;
  canRedo: boolean;
  // Navigation & selection
  setActiveScreen: (screen: ScreenLayerKey) => void;
  setSelectedLayerId: (id: string | null) => void;
  // Layer operations
  updateLayer: (id: string, updates: Partial<CanvasLayer>) => void;
  addLayer: (type: LayerType) => void;
  removeLayer: (id: string) => void;
  duplicateLayer: (id: string) => void;
  reorderLayer: (id: string, direction: 'up' | 'down' | 'top' | 'bottom') => void;
  toggleLayerVisibility: (id: string) => void;
  toggleLayerLock: (id: string) => void;
  resetToDefaults: (screenKey?: ScreenLayerKey) => void;
  saveToServer: () => Promise<boolean>;
  undo: () => void;
  redo: () => void;
  // Admin auth & modal
  openEditor: () => void;
  closeEditor: () => void;
  loginAdmin: (password: string) => Promise<{ success: boolean; message?: string }>;
  logoutAdmin: () => Promise<void>;
}

const LayerContext = createContext<LayerContextType | null>(null);

export const LayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [layers, setLayers] = useState<ScreenLayersState>(() => {
    // Try localStorage first for instant hydration
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_ALL_SCREEN_LAYERS, ...parsed };
      }
    } catch {
      // ignore
    }
    return INITIAL_ALL_SCREEN_LAYERS;
  });

  const [activeScreen, setActiveScreen] = useState<ScreenLayerKey>('home');
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Undo / Redo history
  const [history, setHistory] = useState<ScreenLayersState[]>([INITIAL_ALL_SCREEN_LAYERS]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Load from backend API on mount
  useEffect(() => {
    const fetchLayers = async () => {
      try {
        const res = await fetch('/api/layers');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLayers((prev) => {
              const merged = { ...prev, ...json.data };
              try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
              } catch {
                // ignore
              }
              return merged;
            });
            setHistory([json.data]);
            setHistoryIndex(0);
          }
        }
      } catch (err) {
        console.warn('Could not fetch remote layers, using local state:', err);
      }
    };

    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem(ADMIN_TOKEN_KEY);
        const headers: Record<string, string> = {};
        if (token) headers['x-admin-token'] = token;

        const res = await fetch('/api/admin/status', { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAdmin(true);
          }
        }
      } catch (err) {
        console.warn('Admin status check failed:', err);
      }
    };

    fetchLayers();
    checkAdminStatus();
  }, []);

  // Push new state to history
  const pushHistory = useCallback((nextState: ScreenLayersState) => {
    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      return [...upToCurrent, nextState];
    });
    setHistoryIndex((prev) => prev + 1);
    setHasUnsavedChanges(true);
  }, [historyIndex]);

  // Update a single layer in the active screen
  const updateLayer = useCallback((id: string, updates: Partial<CanvasLayer>) => {
    setLayers((prev) => {
      const currentList = prev[activeScreen] || [];
      const updatedList = currentList.map((layer) => {
        if (layer.id === id) {
          return { ...layer, ...updates };
        }
        return layer;
      });

      const nextState: ScreenLayersState = {
        ...prev,
        [activeScreen]: updatedList,
      };

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore
      }

      pushHistory(nextState);
      return nextState;
    });
  }, [activeScreen, pushHistory]);

  // Add a new layer
  const addLayer = useCallback((type: LayerType) => {
    const id = `layer-${type}-${Date.now().toString(36)}`;
    let newLayer: CanvasLayer;

    switch (type) {
      case 'text':
        newLayer = {
          id,
          name: 'Văn bản chú thích mới',
          type: 'text',
          visible: true,
          locked: false,
          zIndex: 30,
          top: 30,
          left: 30,
          width: 35,
          height: 10,
          text: 'Nhập nội dung chú thích hoặc bài học tại đây...',
          color: '#1C1917',
          fontSize: 16,
          fontWeight: 'normal',
          textAlign: 'left',
          backgroundColor: '#FFFFFFEE',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#D97706',
          opacity: 100,
        };
        break;
      case 'button':
        newLayer = {
          id,
          name: 'Nút tương tác mới',
          type: 'button',
          visible: true,
          locked: false,
          zIndex: 30,
          top: 50,
          left: 40,
          width: 18,
          height: 6,
          text: 'Bấm vào đây',
          action: 'nav',
          target: 'architecture',
          backgroundColor: '#D97706',
          color: '#FFFFFF',
          borderRadius: 8,
          opacity: 100,
        };
        break;
      case 'character':
        newLayer = {
          id,
          name: 'Nhân vật hoạt hình',
          type: 'character',
          visible: true,
          locked: false,
          zIndex: 25,
          top: 40,
          left: 10,
          width: 25,
          height: 45,
          src: '/assets/home/mang-non-chinh.png',
          lockAspectRatio: true,
          aspectRatio: '1312 / 1199',
          animation: 'float',
          opacity: 100,
        };
        break;
      case 'image':
      default:
        newLayer = {
          id,
          name: 'Ảnh minh họa / Chi tiết',
          type: 'image',
          visible: true,
          locked: false,
          zIndex: 20,
          top: 35,
          left: 35,
          width: 25,
          height: 25,
          src: '/assets/home/mang-non-phu.png',
          lockAspectRatio: true,
          opacity: 100,
        };
        break;
    }

    setLayers((prev) => {
      const currentList = prev[activeScreen] || [];
      const updatedList = [...currentList, newLayer];
      const nextState = { ...prev, [activeScreen]: updatedList };

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore
      }

      pushHistory(nextState);
      return nextState;
    });

    setSelectedLayerId(id);
  }, [activeScreen, pushHistory]);

  // Remove layer
  const removeLayer = useCallback((id: string) => {
    setLayers((prev) => {
      const currentList = prev[activeScreen] || [];
      const target = currentList.find((l) => l.id === id);
      if (target?.isOriginalProtected) {
        alert('Layer nền di tích gốc được bảo vệ để không làm hỏng giao diện.');
        return prev;
      }

      const updatedList = currentList.filter((l) => l.id !== id);
      const nextState = { ...prev, [activeScreen]: updatedList };

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore
      }

      pushHistory(nextState);
      return nextState;
    });

    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  }, [activeScreen, pushHistory, selectedLayerId]);

  // Duplicate layer
  const duplicateLayer = useCallback((id: string) => {
    setLayers((prev) => {
      const currentList = prev[activeScreen] || [];
      const target = currentList.find((l) => l.id === id);
      if (!target) return prev;

      const newId = `layer-${target.type}-${Date.now().toString(36)}`;
      const duplicated: CanvasLayer = {
        ...target,
        id: newId,
        name: `${target.name} (Bản sao)`,
        top: Math.min(target.top + 3, 90),
        left: Math.min(target.left + 3, 90),
        zIndex: target.zIndex + 1,
        isOriginalProtected: false,
      };

      const updatedList = [...currentList, duplicated];
      const nextState = { ...prev, [activeScreen]: updatedList };

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore
      }

      pushHistory(nextState);
      setSelectedLayerId(newId);
      return nextState;
    });
  }, [activeScreen, pushHistory]);

  // Reorder layer
  const reorderLayer = useCallback((id: string, direction: 'up' | 'down' | 'top' | 'bottom') => {
    setLayers((prev) => {
      const currentList = [...(prev[activeScreen] || [])];
      const index = currentList.findIndex((l) => l.id === id);
      if (index === -1) return prev;

      const item = currentList[index];
      currentList.splice(index, 1);

      if (direction === 'up') {
        const newIdx = Math.min(index + 1, currentList.length);
        currentList.splice(newIdx, 0, item);
      } else if (direction === 'down') {
        const newIdx = Math.max(index - 1, 0);
        currentList.splice(newIdx, 0, item);
      } else if (direction === 'top') {
        currentList.push(item);
      } else if (direction === 'bottom') {
        currentList.unshift(item);
      }

      // Re-normalize zIndex
      const normalized = currentList.map((layer, idx) => ({
        ...layer,
        zIndex: (idx + 1) * 5,
      }));

      const nextState = { ...prev, [activeScreen]: normalized };

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore
      }

      pushHistory(nextState);
      return nextState;
    });
  }, [activeScreen, pushHistory]);

  // Toggle visibility
  const toggleLayerVisibility = useCallback((id: string) => {
    setLayers((prev) => {
      const currentList = prev[activeScreen] || [];
      const updatedList = currentList.map((layer) => {
        if (layer.id === id) {
          return { ...layer, visible: !layer.visible };
        }
        return layer;
      });
      const nextState = { ...prev, [activeScreen]: updatedList };
      pushHistory(nextState);
      return nextState;
    });
  }, [activeScreen, pushHistory]);

  // Toggle lock
  const toggleLayerLock = useCallback((id: string) => {
    setLayers((prev) => {
      const currentList = prev[activeScreen] || [];
      const updatedList = currentList.map((layer) => {
        if (layer.id === id) {
          return { ...layer, locked: !layer.locked };
        }
        return layer;
      });
      const nextState = { ...prev, [activeScreen]: updatedList };
      pushHistory(nextState);
      return nextState;
    });
  }, [activeScreen, pushHistory]);

  // Reset to default
  const resetToDefaults = useCallback((screenKey?: ScreenLayerKey) => {
    const target = screenKey || activeScreen;
    const confirmReset = window.confirm(
      `Bạn có chắc chắn muốn khôi phục thiết kế gốc cho màn hình này không? Mọi thay đổi chưa lưu sẽ quay về mẫu ban đầu.`
    );
    if (!confirmReset) return;

    setLayers((prev) => {
      const nextState: ScreenLayersState = {
        ...prev,
        [target]: INITIAL_ALL_SCREEN_LAYERS[target],
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore
      }
      pushHistory(nextState);
      return nextState;
    });
    setSelectedLayerId(null);
  }, [activeScreen, pushHistory]);

  // Save to server
  const saveToServer = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY);
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['x-admin-token'] = token;

      const res = await fetch('/api/layers', {
        method: 'POST',
        headers,
        body: JSON.stringify({ layers }),
      });

      if (res.ok) {
        setHasUnsavedChanges(false);
        setIsSaving(false);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(layers));
        } catch {
          // ignore
        }
        return true;
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Lưu thất bại');
      }
    } catch (err: any) {
      console.error('Save failed:', err);
      // Even if server failed, save to localStorage as backup
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(layers));
        setHasUnsavedChanges(false);
      } catch {
        // ignore
      }
      setIsSaving(false);
      return true; // Still preserved locally for the teacher
    }
  }, [layers]);

  // Undo / Redo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIdx = historyIndex - 1;
      const targetState = history[targetIdx];
      setLayers(targetState);
      setHistoryIndex(targetIdx);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(targetState));
      } catch {
        // ignore
      }
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIdx = historyIndex + 1;
      const targetState = history[targetIdx];
      setLayers(targetState);
      setHistoryIndex(targetIdx);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(targetState));
      } catch {
        // ignore
      }
    }
  }, [history, historyIndex]);

  // Admin login
  const loginAdmin = async (password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        setIsAdmin(true);
        setIsEditorOpen(true);
        return { success: true };
      }
      return { success: false, message: data.message || 'Mật khẩu không đúng' };
    } catch (err: any) {
      return { success: false, message: 'Lỗi kết nối máy chủ: ' + err.message };
    }
  };

  // Admin logout
  const logoutAdmin = async () => {
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY);
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: token ? { 'x-admin-token': token } : {},
      });
    } catch {
      // ignore
    }
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsAdmin(false);
    setIsEditorOpen(false);
  };

  const selectedLayer =
    layers[activeScreen]?.find((l) => l.id === selectedLayerId) || null;

  return (
    <LayerContext.Provider
      value={{
        layers,
        activeScreen,
        selectedLayerId,
        selectedLayer,
        isAdmin,
        isEditorOpen,
        hasUnsavedChanges,
        isSaving,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        setActiveScreen,
        setSelectedLayerId,
        updateLayer,
        addLayer,
        removeLayer,
        duplicateLayer,
        reorderLayer,
        toggleLayerVisibility,
        toggleLayerLock,
        resetToDefaults,
        saveToServer,
        undo,
        redo,
        openEditor: () => setIsEditorOpen(true),
        closeEditor: () => setIsEditorOpen(false),
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};

export const useLayers = (): LayerContextType => {
  const context = useContext(LayerContext);
  if (!context) {
    throw new Error('useLayers must be used within a LayerProvider');
  }
  return context;
};
