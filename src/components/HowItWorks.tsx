'use client';

import React from 'react';
import { Link2, Sliders, DownloadCloud, Sparkles } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Paste Public URL',
      desc: 'Copy and paste any supported public YouTube video or Instagram reel link into the input box above.',
      icon: Link2,
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      num: '02',
      title: 'Customize Format & Quality',
      desc: 'Select MP4 for crisp video or MP3 for audio, then pick your desired resolution or bitrate up to 1080p / 320 kbps.',
      icon: Sliders,
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      num: '03',
      title: 'Process & Download',
      desc: 'Our high-performance media worker transcodes the stream and delivers your clean file in seconds.',
      icon: DownloadCloud,
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <section className="py-16 max-w-6xl mx-auto px-4" id="how-it-works">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Workflow</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Three Simple Steps to Save Media
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Streamlined, frictionless experience with zero intrusive ads or bloatware.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="relative rounded-2xl p-7 bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${step.gradient} p-[1px] shadow-lg`}
                >
                  <div className="w-full h-full bg-[#0d0f18] rounded-[11px] flex items-center justify-center text-white">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <span className="text-3xl font-black font-mono text-slate-700 group-hover:text-slate-500 transition-colors">
                  {step.num}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2.5">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
