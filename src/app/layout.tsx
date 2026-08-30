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
  metadataBase: new URL('https://downly.media'),
  title: {
    default: 'Downly – Free Instagram Reel & YouTube Video Downloader',
    template: '%s | Downly',
  },
  description:
    'Fast, free online video downloader. Download Instagram Reels, YouTube videos, and Shorts in 1080p MP4 or convert to 320kbps MP3 audio.',
  keywords: [
    'Instagram Reel Downloader',
    'YouTube Video Downloader',
    'Download Instagram Reels',
    'YouTube to MP4',
    'YouTube to MP3',
    'YouTube 1080p Downloader',
    'Free Video Downloader',
    'Online Video Downloader',
  ],
  authors: [{ name: 'Downly Media Team' }],
  creator: 'Downly',
  publisher: 'Downly',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://downly.media',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://downly.media',
    title: 'Downly – Free Instagram Reel & YouTube Video Downloader',
    description:
      'Download public Instagram Reels and YouTube videos in 1080p Full HD MP4 or 320kbps MP3 audio.',
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
    title: 'Downly – Free Instagram Reel & YouTube Video Downloader',
    description:
      'Download public Instagram Reels and YouTube videos in 1080p Full HD MP4 or 320kbps MP3 audio.',
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
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Downly',
    url: 'https://downly.media',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://downly.media/?url={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Downly',
    url: 'https://downly.media',
    logo: 'https://downly.media/favicon.svg',
    sameAs: [],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#08090d] text-slate-100">
        {children}
      </body>
    </html>
  );
}
