'use client';

import React from 'react';
import { MediaMetadata } from '@/lib/types';
import { Clock, ExternalLink, User } from 'lucide-react';
import { YouTubeIcon, InstagramIcon } from './icons';

interface MediaPreviewProps {
  metadata: MediaMetadata;
}

export function MediaPreview({ metadata }: MediaPreviewProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start p-4 rounded-xl bg-slate-900/60 border border-white/10">
      {/* Thumbnail with overlay duration & platform */}
      <div className="relative w-full sm:w-48 aspect-video rounded-lg overflow-hidden bg-slate-950 shrink-0 shadow-md">
        <img
          src={metadata.thumbnail}
          alt={metadata.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute(
              'src',
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
            );
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Platform Badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white flex items-center gap-1">
          {metadata.platform === 'youtube' ? (
            <>
              <YouTubeIcon className="w-3 h-3 text-red-500" />
              <span>YouTube</span>
            </>
          ) : (
            <>
              <InstagramIcon className="w-3 h-3 text-pink-500" />
              <span>Instagram</span>
            </>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[11px] font-mono font-medium text-white flex items-center gap-1">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>{metadata.durationFormatted}</span>
        </div>
      </div>

      {/* Metadata Info */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 leading-snug">
          {metadata.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>{metadata.author}</span>
          </div>

          {metadata.authorUrl && (
            <a
              href={metadata.authorUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>View Channel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Verified Public Stream • Ready for Transcoding</span>
        </div>
      </div>
    </div>
  );
}
