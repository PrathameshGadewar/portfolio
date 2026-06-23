import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Profile } from '@/models/Portfolio';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const isDownload = searchParams.get('download') === 'true';

    const profile = await Profile.findOne({});
    if (!profile || !profile.resumeLink) {
      return new NextResponse('Resume not found', { status: 404 });
    }

    const resumeLink = profile.resumeLink.trim();

    // Check if the resume link is a Base64 data URL
    if (resumeLink.startsWith('data:')) {
      const matches = resumeLink.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        const contentType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': isDownload ? 'attachment; filename="Resume.pdf"' : 'inline; filename="Resume.pdf"',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        });
      }
    }

    // Fallback: If it's a normal URL, redirect the browser to it
    return NextResponse.redirect(resumeLink);
  } catch (error: any) {
    console.error('Resume Fetch Error:', error);
    return new NextResponse('Internal Server Error: ' + error.message, { status: 500 });
  }
}
