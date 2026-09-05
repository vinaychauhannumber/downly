'use client';

import React from 'react';
import { useDownload } from '@/hooks/useDownload';
import { UrlInput } from '@/components/UrlInput';
import { MediaPreview } from '@/components/MediaPreview';
import { FormatSelector } from '@/components/FormatSelector';
import { QualitySelector } from '@/components/QualitySelector';
import { DownloadProgress } from '@/components/DownloadProgress';
import { DownloadResult } from '@/components/DownloadResult';
import { DownloadHistory } from '@/components/DownloadHistory';
import { Download, AlertTriangle } from 'lucide-react';

/**
 * HomeDownloader — interactive client widget.
 * Kept as a Client Component because it uses useDownload (state + fetch).
 * Imported into the Server Component page.tsx so the surrounding SEO
 * content (H1, FAQ, tools grid, guides grid) is pre-rendered in HTML.
 */
export function HomeDownloader() {
  const {
    url,
    setUrl,
    analyzing,
    analyzeError,
    metadata,
    selectedFormat,
    setSelectedFormat,
    selectedQuality,
    setSelectedQuality,
    jobProgress,
    processing,
    processError,
    downloadReady,
    history,
    analyzeUrl,
    startDownload,
    reset,
    clearHistory,
    removeHistoryItem,
  } = useDownload();

  return (
    <>
      {/* URL Input Bar */}
      <UrlInput
        url={url}
        setUrl={setUrl}
        onAnalyze={analyzeUrl}
        analyzing={analyzing}
        error={analyzeError}
      />

      {/* Media Analysis & Download Configuration Card */}
      {metadata && (
        <div className="w-full max-w-3xl mx-auto px-4 mt-8 animate-fadeIn">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/25 shadow-2xl space-y-6 relative overflow-hidden bg-[#0d101b]/90">
            {/* Subtle top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

            {/* 1. Media Preview (Thumbnail, Title, Author) */}
            <MediaPreview metadata={metadata} />

            {/* Download Flow States */}
            {downloadReady ? (
              // Completed State
              <DownloadResult
                jobProgress={jobProgress}
                metadata={metadata}
                onReset={reset}
              />
            ) : processing ? (
              // Active Multi-Stage Progress State
              <DownloadProgress jobProgress={jobProgress} />
            ) : (
              // Format & Quality Selection State
              <div className="space-y-6 pt-2">
                {/* Format Selector (MP4 vs MP3) */}
                <FormatSelector
                  selectedFormat={selectedFormat}
                  onChange={setSelectedFormat}
                  disabled={processing}
                />

                {/* Quality Selector */}
                <QualitySelector
                  formats={metadata.formats}
                  selectedFormat={selectedFormat}
                  selectedQuality={selectedQuality}
                  onChange={setSelectedQuality}
                  disabled={processing}
                />

                {/* Processing Error Message */}
                {processError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-200">Processing Failed</p>
                      <p className="text-xs text-red-300/90 mt-0.5">{processError}</p>
                    </div>
                  </div>
                )}

                {/* Start Download Button */}
                <button
                  type="button"
                  onClick={startDownload}
                  disabled={processing}
                  className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 active:scale-[0.99]"
                >
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>Download {selectedFormat.toUpperCase()} ({selectedQuality})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Local Download History */}
      <DownloadHistory
        history={history}
        onClear={clearHistory}
        onRemoveItem={removeHistoryItem}
        onSelectUrl={(selectedUrl) => {
          setUrl(selectedUrl);
          analyzeUrl(selectedUrl);
        }}
      />
    </>
  );
}
