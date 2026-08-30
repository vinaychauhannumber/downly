import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { GUIDES_DATA } from '@/lib/guides-data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video & Audio Download Guides & Tutorials | Downly',
  description:
    'Free step-by-step guides on downloading Instagram Reels, converting YouTube videos to MP3, downloading 1080p videos with audio, and saving Shorts on mobile.',
  alternates: {
    canonical: 'https://downly.media/guides',
  },
  openGraph: {
    title: 'Video & Audio Download Guides & Tutorials | Downly',
    description:
      'Free step-by-step guides on downloading Instagram Reels, converting YouTube videos to MP3, and saving YouTube Shorts.',
    url: 'https://downly.media/guides',
    siteName: 'Downly',
    type: 'website',
  },
};

export default function GuidesIndexPage() {
  const guides = Object.values(GUIDES_DATA);

  const breadcrumbs = [
    { name: 'Guides & Tutorials', url: '/guides' },
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      <StructuredData
        appName="Downly Guides & Tutorials"
        appDescription="Step-by-step tutorials on video downloading and audio conversion."
        appUrl="https://downly.media/guides"
        breadcrumbs={breadcrumbs}
      />

      <Header />

      <main className="flex-1">
        <div className="pt-2">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero */}
        <section className="relative pt-8 pb-16 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Tutorials & Knowledge Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Video & Audio Download Guides
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Step-by-step walkthroughs to help you download, convert, and manage public media across iPhone, Android, Mac, and Windows PC.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <article
                key={guide.slug}
                className="group p-6 rounded-3xl bg-slate-950/60 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.02] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-400 text-[11px] font-semibold uppercase">
                      {guide.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{guide.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <Link href={`/guides/${guide.slug}`}>
                      {guide.h1}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Updated {guide.publishedDate}
                  </span>

                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
