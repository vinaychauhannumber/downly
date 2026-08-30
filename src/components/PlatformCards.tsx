'use client';

import React from 'react';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { YouTubeIcon, InstagramIcon } from './icons';

export function PlatformCards() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4" id="platforms">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Supported Platforms</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Optimized for Popular Video Formats
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Direct stream analysis and high-throughput transcoding for public videos and reels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* YouTube Card */}
        <div className="relative group rounded-3xl p-8 bg-gradient-to-b from-[#131726] to-[#0c0e17] border border-white/10 hover:border-red-500/40 shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <YouTubeIcon className="w-32 h-32 text-red-500" />
          </div>

          <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mb-6">
            <YouTubeIcon className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">YouTube Support</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Download standard public YouTube videos and trending vertical Shorts in full high definition or extract standalone audio tracks.
          </p>

          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Public Videos (1080p, 720p, 480p, 360p)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>YouTube Shorts vertical format</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Studio MP3 audio extraction up to 320 kbps</span>
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Public, non-DRM videos with creator rights</span>
          </div>
        </div>

        {/* Instagram Card */}
        <div className="relative group rounded-3xl p-8 bg-gradient-to-b from-[#131726] to-[#0c0e17] border border-white/10 hover:border-pink-500/40 shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <InstagramIcon className="w-32 h-32 text-pink-500" />
          </div>

          <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center justify-center mb-6">
            <InstagramIcon className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Instagram Support</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Fast analysis and download for public Instagram Reels and video posts. Perfect for offline archiving and creators.
          </p>

          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Public Reels & video posts</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Original high-clarity 9:16 vertical video</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Clean audio track extraction</span>
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Public profiles and accounts only</span>
          </div>
        </div>
      </div>
    </section>
  );
}
