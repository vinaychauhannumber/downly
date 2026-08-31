import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX';
  const publisherNumber = clientId.replace(/^ca-/, '');

  const adsTxtContent = `# Google AdSense ads.txt for Downly
google.com, ${publisherNumber}, DIRECT, f08c47fec0942fa0
`;

  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
