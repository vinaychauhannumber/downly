import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { getJob } from '@/lib/media-worker';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;

    if (!jobId) {
      return new NextResponse('Bad Request: Missing job ID', { status: 400 });
    }

    const job = getJob(jobId);
    if (!job || !job.filePath || !fs.existsSync(job.filePath)) {
      return new NextResponse('Download Not Found or Expired', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(job.filePath);
    const fileName = job.fileName || 'media_download.mp4';
    const isMp3 = fileName.toLowerCase().endsWith('.mp3');

    // Safe ASCII filename fallback for legacy user agents
    const safeAscii = fileName.replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '');

    const uint8 = new Uint8Array(fileBuffer);

    return new Response(uint8, {
      status: 200,
      headers: {
        'Content-Type': isMp3 ? 'audio/mpeg' : 'video/mp4',
        'Content-Disposition': `attachment; filename="${safeAscii}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Content-Length': uint8.byteLength.toString(),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600, no-transform',
      },
    });
  } catch (error) {
    console.error('[API file download error]:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
