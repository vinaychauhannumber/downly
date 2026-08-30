'use client';

import React from 'react';
import { MediaFormatType } from '@/lib/types';
import { Video, Music } from 'lucide-react';

interface FormatSelectorProps {
  selectedFormat: MediaFormatType;
  onChange: (format: MediaFormatType) => void;
  disabled?: boolean;
}

export function FormatSelector({
  selectedFormat,
  onChange,
  disabled = false,
}: FormatSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Select Output Format
        </label>
        <span className="text-xs text-cyan-400 font-medium">
          {selectedFormat === 'mp4' ? 'High Definition Video' : 'HQ Lossless Audio'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-1.5 rounded-xl bg-slate-950/80 border border-white/10">
        {/* MP4 Option */}
        <button
          type="button"
          onClick={() => onChange('mp4')}
          disabled={disabled}
          className={`relative flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
            selectedFormat === 'mp4'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>MP4 Video</span>
          {selectedFormat === 'mp4' && (
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
              HD
            </span>
          )}
        </button>

        {/* MP3 Option */}
        <button
          type="button"
          onClick={() => onChange('mp3')}
          disabled={disabled}
          className={`relative flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
            selectedFormat === 'mp3'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>MP3 Audio</span>
          {selectedFormat === 'mp3' && (
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
              320k
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
