import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO_TOOLS } from '@/lib/seo-data';
import { ArrowLeft, Sparkles, Download } from 'lucide-react';

export default function NotFound() {
  const topTools = Object.values(SEO_TOOLS).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider">
              <span>Error 404</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
              The page you are looking for might have been moved or doesn’t exist. Check out our most popular media downloader tools below.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-lg shadow-cyan-500/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Homepage Downloader</span>
            </Link>
          </div>

          {/* Popular Tools Links */}
          <div className="pt-8 border-t border-white/10 space-y-4 text-left">
            <h2 className="text-sm font-bold text-slate-200 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Popular Free Downloader Tools</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      {tool.h1}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {tool.subtitle}
                    </p>
                  </div>
                  <Download className="w-4 h-4 text-cyan-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
