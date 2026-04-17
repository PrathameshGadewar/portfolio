import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
  if (!verifyToken(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
