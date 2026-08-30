import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Downly – Download Videos & Reels in MP4 or MP3',
  description:
    'Download supported public videos and reels in MP4 or extract audio as MP3 with your preferred quality.',
  keywords: [
    'video downloader',
    'reel downloader',
    'youtube to mp4',
    'youtube to mp3',
    'instagram reel download',
    'fast video converter',
    'ffmpeg media processing',
  ],
  authors: [{ name: 'Downly Media Team' }],
  creator: 'Downly',
  publisher: 'Downly',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://downly.media',
    title: 'Downly – Download Videos & Reels in MP4 or MP3',
    description:
      'Download supported public videos and reels in MP4 or extract audio as MP3 with your preferred quality.',
    siteName: 'Downly',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Downly Media Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Downly – Download Videos & Reels in MP4 or MP3',
    description:
      'Download supported public videos and reels in MP4 or extract audio as MP3 with your preferred quality.',
    creator: '@downly',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Downly',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    description:
      'Download supported public videos and reels in MP4 or extract audio as MP3 with your preferred quality.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#08090d] text-slate-100">
        {children}
      </body>
    </html>
  );
}
