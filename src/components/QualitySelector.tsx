'use client';

import React from 'react';
import { MediaFormatOption, MediaFormatType } from '@/lib/types';
import { Check, Film, Disc } from 'lucide-react';

interface QualitySelectorProps {
  formats: MediaFormatOption[];
  selectedFormat: MediaFormatType;
  selectedQuality: string;
  onChange: (quality: string) => void;
  disabled?: boolean;
}

export function QualitySelector({
  formats,
  selectedFormat,
  selectedQuality,
  onChange,
  disabled = false,
}: QualitySelectorProps) {
  const filteredFormats = formats.filter((f) => f.type === selectedFormat);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {selectedFormat === 'mp4' ? 'Choose Video Quality' : 'Choose Audio Quality'}
        </label>
        <span className="text-xs text-slate-400">
          {filteredFormats.length} Available options
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filteredFormats.map((item) => {
          const isSelected = selectedQuality === item.quality;
          const isHighest =
            item.quality === '1080p' || item.quality === '320kbps';

          return (
            <button
              key={item.quality}
              type="button"
              onClick={() => onChange(item.quality)}
              disabled={disabled}
              className={`relative flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10 text-white'
                  : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {selectedFormat === 'mp4' ? (
                    <Film className="w-4 h-4" />
                  ) : (
                    <Disc className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {item.quality}
                    </span>
                    {isHighest && (
                      <span className="px-1.5 py-0.2 text-[10px] font-semibold uppercase rounded bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950">
                        Best
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.label}
                  </p>
                </div>
              </div>

              {/* Right side: Estimated size & checkmark */}
              <div className="flex items-center gap-3">
                {item.estimatedSize && (
                  <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-white/5">
                    ~{item.estimatedSize}
                  </span>
                )}
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                      : 'border-slate-600 bg-transparent'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
