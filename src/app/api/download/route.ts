import { NextRequest, NextResponse } from 'next/server';
import { DownloadRequestSchema } from '@/lib/validators';
import { checkRateLimit, isSafeUrl } from '@/lib/security';
import { getProviderForUrl } from '@/lib/providers';
import { createJob } from '@/lib/media-worker';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    // Rate Limiting (15 downloads per minute)
    const rateLimit = checkRateLimit(`download_${ip}`, 15, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'You have reached the maximum processing request limit. Please wait a moment.',
          resetInSeconds: rateLimit.resetInSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetInSeconds),
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const validation = DownloadRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid Request',
          message: validation.error.issues?.[0]?.message || 'Invalid format or quality parameters.',
        },
        { status: 400 }
      );
    }

    const { url, format, quality } = validation.data;

    // SSRF Check
    const securityCheck = isSafeUrl(url);
    if (!securityCheck.safe) {
      return NextResponse.json(
        {
          error: 'Security Error',
          message: 'This URL is not permitted.',
        },
        { status: 400 }
      );
    }

    // Platform Check
    const provider = getProviderForUrl(url);
    if (!provider) {
      return NextResponse.json(
        {
          error: 'Unsupported Platform',
          message: 'Platform not supported for processing.',
        },
        { status: 422 }
      );
    }

    // Create job in the processing worker
    const jobId = createJob(url, format, quality);

    return NextResponse.json({
      success: true,
      jobId,
      status: 'queued',
      statusUrl: `/api/download/status/${jobId}`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[API /api/download error]:', message);
    return NextResponse.json(
      {
        error: 'Processing Error',
        message: 'Could not initialize media processing. Please try again.',
      },
      { status: 500 }
    );
  }
}
