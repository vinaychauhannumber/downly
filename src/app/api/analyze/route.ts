import { NextRequest, NextResponse } from 'next/server';
import { AnalyzeRequestSchema } from '@/lib/validators';
import { checkRateLimit, isSafeUrl } from '@/lib/security';
import { getProviderForUrl } from '@/lib/providers';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    // Rate Limiting
    const rateLimit = checkRateLimit(ip, 30, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'Please wait a moment before analyzing more URLs.',
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
    const validation = AnalyzeRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid Request',
          message: validation.error.issues?.[0]?.message || 'Please provide a valid URL.',
        },
        { status: 400 }
      );
    }

    const { url } = validation.data;

    // SSRF & Security Check
    const securityCheck = isSafeUrl(url);
    if (!securityCheck.safe) {
      return NextResponse.json(
        {
          error: 'Security Error',
          message: securityCheck.reason || 'This URL is not permitted.',
        },
        { status: 400 }
      );
    }

    // Identify Provider
    const provider = getProviderForUrl(url);
    if (!provider) {
      return NextResponse.json(
        {
          error: 'Unsupported Platform',
          message: 'Currently supported platforms are YouTube (videos & shorts) and Instagram (public reels).',
        },
        { status: 422 }
      );
    }

    // Extract Media Metadata
    const metadata = await provider.extractMetadata(url);

    return NextResponse.json({
      success: true,
      data: metadata,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[API /api/analyze error]:', message);
    return NextResponse.json(
      {
        error: 'Analysis Failed',
        message: 'Could not fetch media details. Please make sure the video is public and the link is active.',
      },
      { status: 500 }
    );
  }
}
