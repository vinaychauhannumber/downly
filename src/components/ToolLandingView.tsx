'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SeoToolData, SEO_TOOLS } from '@/lib/seo-data';
import { useDownload } from '@/hooks/useDownload';
import { Header } from '@/components/Header';
import { UrlInput } from '@/components/UrlInput';
import { MediaPreview } from '@/components/MediaPreview';
import { FormatSelector } from '@/components/FormatSelector';
import { QualitySelector } from '@/components/QualitySelector';
import { DownloadProgress } from '@/components/DownloadProgress';
import { DownloadResult } from '@/components/DownloadResult';
import { DownloadHistory } from '@/components/DownloadHistory';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { AdBanner } from '@/components/AdBanner';
import { Footer } from '@/components/Footer';
import {
  Download,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Video,
  Music,
  Zap,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface ToolLandingViewProps {
  tool: SeoToolData;
}

export function ToolLandingView({ tool }: ToolLandingViewProps) {
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

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="w-5 h-5" />;
      case 'Music':
        return <Music className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const breadcrumbs = [
    { name: 'Home', url: 'https://downlyfree.onrender.com' },
    { name: tool.h1, url: `https://downlyfree.onrender.com/${tool.slug}` },
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      {/* Schema.org Structured Data */}
      <StructuredData
        appName={`Downly – ${tool.h1}`}
        appDescription={tool.metaDescription}
        appUrl={`https://downlyfree.onrender.com/${tool.slug}`}
        breadcrumbs={breadcrumbs}
        faqItems={tool.faqs}
      />

      <Header />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="pt-2">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Section */}
        <section className="relative pt-6 pb-12 px-4 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            {/* SEO Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tool.badge}</span>
            </div>

            {/* Primary H1 */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {tool.h1}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {tool.subtitle}
            </p>
          </div>
        </section>

        {/* Top Ad Unit */}
        <AdBanner slot="1000000003" label="Sponsored" />

        {/* Downloader Section */}
        <UrlInput
          url={url}
          setUrl={setUrl}
          onAnalyze={analyzeUrl}
          analyzing={analyzing}
          error={analyzeError}
        />

        {/* Media Analysis & Download Card */}
        {metadata && (
          <div className="w-full max-w-3xl mx-auto px-4 mt-8 animate-fadeIn">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/25 shadow-2xl space-y-6 relative overflow-hidden bg-[#0d101b]/90">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

              <MediaPreview metadata={metadata} />

              {downloadReady ? (
                <DownloadResult
                  jobProgress={jobProgress}
                  metadata={metadata}
                  onReset={reset}
                />
              ) : processing ? (
                <DownloadProgress jobProgress={jobProgress} />
              ) : (
                <div className="space-y-6 pt-2">
                  <FormatSelector
                    selectedFormat={selectedFormat}
                    onChange={setSelectedFormat}
                    disabled={processing}
                  />

                  <QualitySelector
                    formats={metadata.formats}
                    selectedFormat={selectedFormat}
                    selectedQuality={selectedQuality}
                    onChange={setSelectedQuality}
                    disabled={processing}
                  />

                  {processError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-200">Processing Failed</p>
                        <p className="text-xs text-red-300/90 mt-0.5">{processError}</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={startDownload}
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/25 transition-all duration-200 active:scale-[0.99]"
                  >
                    <Download className="w-5 h-5 stroke-[2.5]" />
                    <span>Download {selectedFormat.toUpperCase()} ({selectedQuality})</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Download History */}
        <DownloadHistory
          history={history}
          onClear={clearHistory}
          onRemoveItem={removeHistoryItem}
          onSelectUrl={(selectedUrl) => {
            setUrl(selectedUrl);
            analyzeUrl(selectedUrl);
          }}
        />

        {/* How It Works (Step by step) */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How to Use {tool.h1}
            </h2>
            <p className="text-sm text-slate-400">
              Download your media in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold flex items-center justify-center">
                  {idx + 1}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Informative Intro Article Section */}
        <section className="max-w-4xl mx-auto px-4 py-10">
          <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-6">
            <h2 className="text-2xl font-bold text-white">
              {tool.intro.heading}
            </h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              {tool.intro.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Format & Codec Specifications Table */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-white">
              Supported Formats & Quality Specifications
            </h2>
            <p className="text-xs text-slate-400">
              Standards compliant H.264 video and MP3 audio encoding
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-200 uppercase font-semibold border-b border-white/10">
                <tr>
                  <th className="p-4">Format / Quality</th>
                  <th className="p-4">Resolution / Bitrate</th>
                  <th className="p-4">Device Compatibility</th>
                  <th className="p-4">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {tool.formatSpecs.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-semibold text-cyan-400">{spec.format}</td>
                    <td className="p-4">{spec.resolutionOrBitrate}</td>
                    <td className="p-4 font-sans text-slate-300">{spec.compatibility}</td>
                    <td className="p-4 font-sans text-slate-400">{spec.recommendedFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tool.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/50 border border-white/5 space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  {getFeatureIcon(feat.icon)}
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400">
              Everything you need to know about {tool.h1}
            </p>
          </div>

          <div className="space-y-3">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-slate-950/70 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Tools Internal Linking Matrix */}
        <section className="max-w-5xl mx-auto px-4 py-12 border-t border-white/10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Related Downloader Tools
                </h2>
                <p className="text-xs text-slate-400">
                  Explore other high-performance media conversion tools
                </p>
              </div>
              <Link
                href="/#platforms"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <span>View All Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {tool.relatedSlugs.map((slug) => {
                const rel = SEO_TOOLS[slug];
                if (!rel) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="p-4 rounded-xl bg-slate-950/50 border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-cyan-400/90 uppercase tracking-wider">
                        {rel.badge}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                      {rel.h1}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {rel.subtitle}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Helpful Guides Section */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900 to-purple-950/30 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Looking for Step-by-Step Guides?
                </h3>
                <p className="text-xs text-slate-400">
                  Read our free tutorials on downloading videos on iPhone, Android, and PC.
                </p>
              </div>
            </div>

            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shrink-0"
            >
              <span>Browse Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
