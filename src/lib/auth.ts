import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

export function verifyToken(req: Request): boolean {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
    if (!tokenMatch) return false;
    jwt.verify(tokenMatch[1], JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function getTokenPayload(req: Request): { userId: string; email: string } | null {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
    if (!tokenMatch) return null;
    return jwt.verify(tokenMatch[1], JWT_SECRET) as { userId: string; email: string };
  } catch {
    return null;
  }
}
