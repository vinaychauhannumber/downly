import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/media-worker';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;

    if (!jobId || typeof jobId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid Job ID' },
        { status: 400 }
      );
    }

    const job = getJob(jobId);
    if (!job) {
      return NextResponse.json(
        {
          error: 'Job Not Found',
          message: 'The requested download job has expired or does not exist.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job: {
        jobId: job.jobId,
        status: job.status,
        progress: job.progress,
        stage: job.stage,
        fileName: job.fileName,
        fileSize: job.fileSize,
        downloadUrl: job.downloadUrl,
        error: job.error,
        expiresAt: job.expiresAt,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[API status error]:', message);
    return NextResponse.json(
      { error: 'Server Error', message: 'Could not fetch job status' },
      { status: 500 }
    );
  }
}
