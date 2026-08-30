'use client';

import React, { useState } from 'react';
import { JobProgress, MediaMetadata } from '@/lib/types';
import {
  CheckCircle2,
  Download,
  RotateCcw,
  FileCheck,
  Loader2,
  ExternalLink,
} from 'lucide-react';

interface DownloadResultProps {
  jobProgress: JobProgress | null;
  metadata?: MediaMetadata | null;
  onReset: () => void;
}

export function DownloadResult({
  jobProgress,
  onReset,
}: DownloadResultProps) {
  const [downloading, setDownloading] = useState(false);
  const fileName = jobProgress?.fileName || 'media_download.mp4';
  const fileSize = jobProgress?.fileSize || '1.2 MB';
  const downloadUrl = jobProgress?.downloadUrl || '#';

  const handleFetchDownload = async () => {
    if (!downloadUrl || downloadUrl === '#') return;

    try {
      setDownloading(true);

      const res = await fetch(downloadUrl);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      // Determine the correct MIME type from the response or file extension
      const isMp3 = fileName.toLowerCase().endsWith('.mp3');
      const mimeType = isMp3 ? 'audio/mpeg' : 'video/mp4';

      // Read the full binary as ArrayBuffer and wrap in a typed Blob
      const arrayBuffer = await res.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: mimeType });

      // Create a temporary object URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Trigger the download via a hidden anchor
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // CRITICAL: Delay revoking the blob URL so the browser has time
      // to fully read it before it's released. Immediate revocation
      // truncates the file and makes it unplayable.
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 5000);
    } catch {
      // Fallback: navigate directly so the browser handles the download natively
      window.location.href = downloadUrl;
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0e121c] border border-emerald-500/30 shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Background ambient success glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Success Badge */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white">
            Your Media is Ready!
          </h4>
          <p className="text-xs text-emerald-400/90 font-medium">
            High-speed transcode and packaging completed successfully
          </p>
        </div>
      </div>

      {/* File Details Box */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-100 truncate">
              {fileName}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Size: {fileSize} • Valid Playable File
            </p>
          </div>
        </div>

        <span className="self-start sm:self-center px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          Ready
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Direct Download Button with double trigger protection */}
        <a
          href={downloadUrl}
          download={fileName}
          onClick={(e) => {
            e.preventDefault();
            handleFetchDownload();
          }}
          className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 cursor-pointer text-center"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Saving to device...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download File ({fileSize})</span>
            </>
          )}
        </a>

        {/* Alternative direct link for restricted webview browsers */}
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          title="Open direct file link in new tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Direct Link</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all duration-200 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Convert Another</span>
        </button>
      </div>
    </div>
  );
}
