'use client';

import React from 'react';
import { Zap } from 'lucide-react';
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
          Ultra-Fast Next-Gen Media Downloader
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-xs text-cyan-400 font-medium flex items-center gap-1">
          <Zap className="w-3 h-3" /> 1080p & Lossless MP3
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
        Download Videos.{' '}
        <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Save What Matters.
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
        Download public videos and reels in high quality <span className="text-slate-200 font-medium">MP4</span> or extract pure audio as <span className="text-slate-200 font-medium">MP3</span>. Fast, private, and secure.
      </p>

      {/* Platform Support Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
        <span className="text-slate-500">Directly supports public media on:</span>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
          <YouTubeIcon className="w-3.5 h-3.5" />
          <span>YouTube (Videos & Shorts)</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-medium">
          <InstagramIcon className="w-3.5 h-3.5" />
          <span>Instagram (Public Reels)</span>
        </div>
      </div>
    </div>
  );
}
