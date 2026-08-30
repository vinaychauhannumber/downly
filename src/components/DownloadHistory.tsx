'use client';

import React from 'react';
import { DownloadHistoryItem } from '@/lib/types';
import { timeAgo } from '@/lib/utils';
import {
  History,
  Trash2,
  X,
  RotateCcw,
} from 'lucide-react';

interface DownloadHistoryProps {
  history: DownloadHistoryItem[];
  onClear: () => void;
  onRemoveItem: (id: string) => void;
  onSelectUrl: (url: string) => void;
}

export function DownloadHistory({
  history,
  onClear,
  onRemoveItem,
  onSelectUrl,
}: DownloadHistoryProps) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-12">
      <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Recent Downloads</h3>
              <p className="text-xs text-slate-400">
                Lightweight local session history ({history.length} items)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>

        {/* History List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {history.map((item) => {
            return (
              <div
                key={item.id}
                className="group relative flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="relative w-14 h-10 rounded-md overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).setAttribute(
                          'src',
                          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
                        );
                      }}
                    />
                    <div className="absolute bottom-0 right-0 px-1 py-0.2 bg-black/80 text-[9px] font-mono text-white">
                      {item.platform === 'youtube' ? 'YT' : 'IG'}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-semibold text-slate-300 uppercase">
                        {item.format} • {item.quality}
                      </span>
                      <span>•</span>
                      <span>{timeAgo(item.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelectUrl(item.url)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
                    title="Process link again"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remove from history"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
