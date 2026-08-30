'use client';

import React from 'react';
import { JobProgress } from '@/lib/types';
import { Loader2, CheckCircle2, Cpu, Sparkles, Layers, Box } from 'lucide-react';

interface DownloadProgressProps {
  jobProgress: JobProgress | null;
}

export function DownloadProgress({ jobProgress }: DownloadProgressProps) {
  const progress = jobProgress?.progress || 10;
  const stage = jobProgress?.stage || 'Preparing media stream...';

  const steps = [
    { label: 'Worker Queued', icon: Cpu, minProgress: 0 },
    { label: 'Stream Extraction', icon: Layers, minProgress: 20 },
    { label: 'FFmpeg Transcoding', icon: Sparkles, minProgress: 50 },
    { label: 'Packaging', icon: Box, minProgress: 90 },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#0e111a] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">
              Processing Media
            </h4>
            <p className="text-xs text-cyan-300/80 font-medium">
              {stage}
            </p>
          </div>
        </div>

        <span className="text-lg font-extrabold font-mono text-cyan-400">
          {progress}%
        </span>
      </div>

      {/* Modern Shimmering Progress Bar */}
      <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-[1px]">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer light bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Multi-step Visual Trackers */}
      <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-white/5">
        {steps.map((step) => {
          const isDone = progress >= step.minProgress + 20;
          const isCurrent =
            progress >= step.minProgress && progress < step.minProgress + 25;
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className={`flex flex-col items-center text-center ${
                isDone
                  ? 'text-cyan-400'
                  : isCurrent
                  ? 'text-white'
                  : 'text-slate-600'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                  isDone
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : isCurrent
                    ? 'bg-indigo-600 text-white animate-pulse'
                    : 'bg-slate-800 text-slate-600 border border-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>
              <span className="text-[10px] font-semibold leading-tight hidden sm:block">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
