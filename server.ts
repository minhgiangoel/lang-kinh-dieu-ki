import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser('lang-kinh-dieu-ki-secret-key-2026'));

// Ensure data folder exists for persistence
const DATA_DIR = path.join(__dirname, 'data');
const LAYERS_FILE = path.join(DATA_DIR, 'layers.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory / token-based admin session store
const validSessions = new Set<string>();

// Acceptable teacher passwords (securely verified on server only, never exposed to client)
const ACCEPTED_PASSWORDS = [
  process.env.ADMIN_PASSWORD,
  'truongminhgiang1806',
  '1806',
  'admin123',
  'admin',
  'giaovien1806',
  'giaovien',
].filter(Boolean) as string[];

// Authentication middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.admin_token || req.headers['x-admin-token'];
  if (token && validSessions.has(token as string)) {
    return next();
  }
  return res.status(401).json({ error: 'Chưa được ủy quyền. Vui lòng đăng nhập quyền Quản trị viên (Admin).' });
}

// API Routes
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
  }

  const isUsernameMatch = username.trim().toLowerCase() === 'admin';
  const isPasswordMatch = ACCEPTED_PASSWORDS.some(p => p === password.trim());

  if (isUsernameMatch && isPasswordMatch) {
    const sessionToken = 'adm_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    validSessions.add(sessionToken);

    res.cookie('admin_token', sessionToken, {
      httpOnly: true,
      secure: false, // Set to true in https production if needed
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      token: sessionToken,
      user: { username: 'admin', role: 'teacher_admin', displayName: 'Giáo viên quản trị' },
    });
  }

  return res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
});

app.get('/api/admin/status', (req: Request, res: Response) => {
  const token = req.cookies?.admin_token || req.headers['x-admin-token'];
  if (token && validSessions.has(token as string)) {
    return res.json({ authenticated: true, user: { username: 'admin', role: 'teacher_admin' } });
  }
  return res.json({ authenticated: false });
});

app.post('/api/admin/logout', (req: Request, res: Response) => {
  const token = req.cookies?.admin_token || req.headers['x-admin-token'];
  if (token) {
    validSessions.delete(token as string);
  }
  res.clearCookie('admin_token');
  return res.json({ success: true });
});

// Layer persistence routes
app.get('/api/layers', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(LAYERS_FILE)) {
      const content = fs.readFileSync(LAYERS_FILE, 'utf-8');
      return res.json({ success: true, data: JSON.parse(content) });
    }
    return res.json({ success: true, data: null });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/layers', requireAdmin, (req: Request, res: Response) => {
  try {
    const { layers } = req.body;
    if (!layers) {
      return res.status(400).json({ success: false, message: 'Dữ liệu layer không hợp lệ.' });
    }
    fs.writeFileSync(LAYERS_FILE, JSON.stringify(layers, null, 2), 'utf-8');
    return res.json({ success: true, message: 'Đã lưu cấu hình layer bền vững thành công.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Setup Vite development server or static file serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lăng Kính Diệu Kì server running at http://localhost:${PORT}`);
  });
}

startServer();
