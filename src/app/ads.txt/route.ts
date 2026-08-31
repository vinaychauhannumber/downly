import { NextResponse } from 'next/server';

export async function GET() {
  const publisherNumber = 'pub-9656841908386656';
  const adsTxtContent = `google.com, ${publisherNumber}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
