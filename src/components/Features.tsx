'use client';

import React from 'react';
import {
  Zap,
  Film,
  Music2,
  Smartphone,
  ShieldCheck,
  Trash2,
  Sparkles,
} from 'lucide-react';

export function Features() {
  const features = [
    {
      title: 'Lightning Fast Processing',
      description:
        'Dedicated worker engine with stream optimization and parallel job processing for immediate downloads.',
      icon: Zap,
      accent: 'text-amber-400',
      bgGlow: 'from-amber-500/10 to-orange-500/5',
      borderColor: 'group-hover:border-amber-500/40',
    },
    {
      title: 'Multiple Video Qualities',
      description:
        'Download in 1080p Full HD, 720p HD, 480p, or 360p based on real-time stream availability.',
      icon: Film,
      accent: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10 to-blue-500/5',
      borderColor: 'group-hover:border-cyan-500/40',
    },
    {
      title: 'MP3 Audio Extraction',
      description:
        'Isolate crystal-clear audio tracks with high-fidelity encoding up to 320 kbps with accurate tagging.',
      icon: Music2,
      accent: 'text-purple-400',
      bgGlow: 'from-purple-500/10 to-pink-500/5',
      borderColor: 'group-hover:border-purple-500/40',
    },
    {
      title: '100% Mobile Responsive',
      description:
        'Flawless touch controls and adaptive layouts designed for smartphones, tablets, and desktops.',
      icon: Smartphone,
      accent: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'group-hover:border-emerald-500/40',
    },
    {
      title: 'Sandboxed & Secure',
      description:
        'Zero shell injection, SSRF prevention, sanitized filenames, and strict rate-limiting protections.',
      icon: ShieldCheck,
      accent: 'text-indigo-400',
      bgGlow: 'from-indigo-500/10 to-violet-500/5',
      borderColor: 'group-hover:border-indigo-500/40',
    },
    {
      title: 'Auto Temporary Cleanup',
      description:
        'Zero long-term media storage. Temporary job files are automatically cleaned up within 30 minutes.',
      icon: Trash2,
      accent: 'text-rose-400',
      bgGlow: 'from-rose-500/10 to-red-500/5',
      borderColor: 'group-hover:border-rose-500/40',
    },
  ];

  return (
    <section className="py-16 max-w-6xl mx-auto px-4" id="features">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Engineered for Performance & Security
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Everything you need in a modern, production-grade media downloader.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`group relative rounded-2xl p-6 bg-gradient-to-b ${item.bgGlow} bg-[#0e111a] border border-white/10 ${item.borderColor} transition-all duration-300 shadow-lg`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mb-5 ${item.accent} shadow-md group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
