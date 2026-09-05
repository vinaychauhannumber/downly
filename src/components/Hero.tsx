import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { YouTubeIcon, InstagramIcon } from './icons';

export function Hero() {
  return (
    <div className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 text-center max-w-4xl mx-auto px-4">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-inner mb-6 backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-semibold text-slate-300 tracking-wide">
          Free Online Media Downloader & Converter
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-xs text-cyan-400 font-medium flex items-center gap-1">
          <Zap className="w-3 h-3" /> 1080p HD & 320kbps MP3
        </span>
      </div>

      {/* Primary SEO H1 */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
        Free Instagram Reel &{' '}
        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
          YouTube Video Downloader
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
        Download public Instagram Reels, feed videos, YouTube videos, and Shorts in high-definition <strong className="text-white font-semibold">1080p MP4</strong> or extract crystal-clear <strong className="text-white font-semibold">320kbps MP3 audio</strong>. Fast, free, and no watermark.
      </p>

      {/* Platform Support Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
        <span className="text-slate-500">Fast downloads for:</span>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
          <YouTubeIcon className="w-3.5 h-3.5" />
          <span>YouTube (Videos & Shorts)</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-medium">
          <InstagramIcon className="w-3.5 h-3.5" />
          <span>Instagram (Reels & Posts)</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>320kbps MP3 Audio</span>
        </div>
      </div>
    </div>
  );
}
