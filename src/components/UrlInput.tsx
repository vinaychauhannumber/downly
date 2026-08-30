'use client';

import React from 'react';
import {
  Link as LinkIcon,
  Clipboard,
  X,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { detectPlatform } from '@/lib/utils';
import { SupportedPlatform } from '@/lib/types';
import { YouTubeIcon, InstagramIcon } from './icons';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: (customUrl?: string) => void;
  analyzing: boolean;
  error: string | null;
}

export function UrlInput({
  url,
  setUrl,
  onAnalyze,
  analyzing,
  error,
}: UrlInputProps) {
  const platform = detectPlatform(url);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch {
      // Fallback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !analyzing && url.trim()) {
      onAnalyze();
    }
  };

  const renderPlatformBadge = (p: SupportedPlatform) => {
    if (p === 'youtube') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold">
          <YouTubeIcon className="w-3.5 h-3.5" />
          <span>YouTube Detected</span>
        </span>
      );
    }
    if (p === 'instagram') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-semibold">
          <InstagramIcon className="w-3.5 h-3.5" />
          <span>Instagram Reel Detected</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium">
        <LinkIcon className="w-3.5 h-3.5" />
        <span>Paste URL</span>
      </span>
    );
  };

  const sampleLinks = [
    {
      name: 'Sample YouTube Video',
      url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      platform: 'youtube',
    },
    {
      name: 'Sample Instagram Reel',
      url: 'https://www.instagram.com/reel/C3x8M40rP8K/',
      platform: 'instagram',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4" id="downloader">
      <div className="relative group">
        {/* Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500 group-focus-within:opacity-75" />

        {/* Input Container */}
        <div className="relative glass-panel rounded-2xl p-2 sm:p-3 shadow-2xl border border-white/15 bg-[#0f121d]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Left Icon & Input */}
            <div className="flex items-center flex-1 min-w-0 px-3 py-2">
              <div className="mr-3 hidden sm:block">
                {renderPlatformBadge(platform)}
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste public YouTube or Instagram link..."
                disabled={analyzing}
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-0 disabled:opacity-50"
              />
              {url && (
                <button
                  onClick={() => setUrl('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors ml-1"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Actions: Paste & Analyze */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
              {!url && (
                <button
                  type="button"
                  onClick={handlePaste}
                  disabled={analyzing}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all active:scale-95"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Paste</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onAnalyze()}
                disabled={analyzing || !url.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-95"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-200">Unable to process URL</p>
            <p className="text-xs text-red-300/90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Demo Links for instant testing */}
      {!url && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="text-slate-500">Quick Test Samples:</span>
          {sampleLinks.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => {
                setUrl(sample.url);
                onAnalyze(sample.url);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all"
            >
              {sample.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
