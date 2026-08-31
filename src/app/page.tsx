'use client';

import React from 'react';
import Link from 'next/link';
import { useDownload } from '@/hooks/useDownload';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { UrlInput } from '@/components/UrlInput';
import { MediaPreview } from '@/components/MediaPreview';
import { FormatSelector } from '@/components/FormatSelector';
import { QualitySelector } from '@/components/QualitySelector';
import { DownloadProgress } from '@/components/DownloadProgress';
import { DownloadResult } from '@/components/DownloadResult';
import { DownloadHistory } from '@/components/DownloadHistory';
import { PlatformCards } from '@/components/PlatformCards';
import { HowItWorks } from '@/components/HowItWorks';
import { Features } from '@/components/Features';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';
import { AdBanner } from '@/components/AdBanner';
import { SEO_TOOLS } from '@/lib/seo-data';
import { GUIDES_DATA } from '@/lib/guides-data';
import { Download, AlertTriangle, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export default function HomePage() {
  const {
    url,
    setUrl,
    analyzing,
    analyzeError,
    metadata,
    selectedFormat,
    setSelectedFormat,
    selectedQuality,
    setSelectedQuality,
    jobProgress,
    processing,
    processError,
    downloadReady,
    history,
    analyzeUrl,
    startDownload,
    reset,
    clearHistory,
    removeHistoryItem,
  } = useDownload();

  const homepageFaqs = [
    {
      question: 'What platforms are supported by Downly?',
      answer: 'Downly currently supports publicly accessible YouTube videos, YouTube Shorts, Instagram Reels, and Instagram video posts in full compliance with public access policies.',
    },
    {
      question: 'Can I download 1080p Full HD YouTube videos with sound?',
      answer: 'Yes! Downly merges separate 1080p Full HD video streams and high-fidelity AAC stereo audio into a single, perfectly synchronized MP4 file with zero audio lag.',
    },
    {
      question: 'Can I convert videos to 320kbps MP3 audio?',
      answer: 'Yes. Switch the format to MP3 Audio and choose up to 320 kbps studio quality bitrate with embedded ID3 metadata tags.',
    },
    {
      question: 'Is Downly free and safe to use?',
      answer: 'Downly is 100% free with no registration, no adware, and no desktop executable software required. All processing is securely executed in the cloud.',
    },
  ];

  const toolsList = Object.values(SEO_TOOLS);
  const guidesList = Object.values(GUIDES_DATA).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      {/* Schema.org Structured Data */}
      <StructuredData
        appName="Downly – Free Instagram Reel & YouTube Video Downloader"
        appDescription="Download public Instagram Reels, feed videos, YouTube videos, and Shorts in 1080p MP4 or 320kbps MP3 audio."
        appUrl="https://downly.media"
        faqItems={homepageFaqs}
      />

      {/* Top Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section with primary H1 */}
        <Hero />

        {/* Top Ad Unit */}
        <AdBanner slot="1000000001" label="Sponsored" />

        {/* URL Input Bar */}
        <UrlInput
          url={url}
          setUrl={setUrl}
          onAnalyze={analyzeUrl}
          analyzing={analyzing}
          error={analyzeError}
        />

        {/* Media Analysis & Download Configuration Card */}
        {metadata && (
          <div className="w-full max-w-3xl mx-auto px-4 mt-8 animate-fadeIn">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/25 shadow-2xl space-y-6 relative overflow-hidden bg-[#0d101b]/90">
              {/* Subtle top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

              {/* 1. Media Preview (Thumbnail, Title, Author) */}
              <MediaPreview metadata={metadata} />

              {/* Download Flow States */}
              {downloadReady ? (
                // Completed State
                <DownloadResult
                  jobProgress={jobProgress}
                  metadata={metadata}
                  onReset={reset}
                />
              ) : processing ? (
                // Active Multi-Stage Progress State
                <DownloadProgress jobProgress={jobProgress} />
              ) : (
                // Format & Quality Selection State
                <div className="space-y-6 pt-2">
                  {/* Format Selector (MP4 vs MP3) */}
                  <FormatSelector
                    selectedFormat={selectedFormat}
                    onChange={setSelectedFormat}
                    disabled={processing}
                  />

                  {/* Quality Selector */}
                  <QualitySelector
                    formats={metadata.formats}
                    selectedFormat={selectedFormat}
                    selectedQuality={selectedQuality}
                    onChange={setSelectedQuality}
                    disabled={processing}
                  />

                  {/* Processing Error Message */}
                  {processError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-200">Processing Failed</p>
                        <p className="text-xs text-red-300/90 mt-0.5">{processError}</p>
                      </div>
                    </div>
                  )}

                  {/* Start Download Button */}
                  <button
                    type="button"
                    onClick={startDownload}
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 active:scale-[0.99]"
                  >
                    <Download className="w-5 h-5 stroke-[2.5]" />
                    <span>Download {selectedFormat.toUpperCase()} ({selectedQuality})</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Local Download History */}
        <DownloadHistory
          history={history}
          onClear={clearHistory}
          onRemoveItem={removeHistoryItem}
          onSelectUrl={(selectedUrl) => {
            setUrl(selectedUrl);
            analyzeUrl(selectedUrl);
          }}
        />

        {/* Supported Platforms Section */}
        <PlatformCards />

        {/* Mid-Page Ad Unit */}
        <AdBanner slot="1000000002" label="Advertisement" />

        {/* Dedicated High-Intent Downloader Tools Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Downloader Tools</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Fast, Specialized Tools for Every Media Type
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Access optimized download pipelines tailored specifically for Instagram Reels, YouTube videos, vertical Shorts, and MP3 conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {toolsList.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group p-6 rounded-3xl bg-slate-950/60 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.02] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-[11px] font-semibold uppercase">
                      {tool.badge}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tool.h1}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {tool.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Core Features */}
        <Features />

        {/* SEO Guides Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge & Step-by-Step Guides</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Latest Download Tutorials
              </h2>
            </div>

            <Link
              href="/guides"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 shrink-0"
            >
              <span>View All Guides ({Object.keys(GUIDES_DATA).length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {guidesList.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group p-5 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold uppercase">
                    {guide.category}
                  </span>
                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {guide.h1}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 mt-4 text-[11px] text-slate-500 font-mono">
                  {guide.readTime}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
