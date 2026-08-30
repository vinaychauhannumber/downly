'use client';

import { useState, useCallback, useSyncExternalStore, useMemo } from 'react';
import {
  MediaMetadata,
  MediaFormatType,
  JobProgress,
  DownloadHistoryItem,
} from '@/lib/types';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'downly_download_history_v1';

function subscribeToHistory(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('downly_history_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('downly_history_updated', callback);
  };
}

function getHistorySnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return localStorage.getItem(STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getHistoryServerSnapshot(): string {
  return '[]';
}

function notifyHistoryChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('downly_history_updated'));
  }
}

export function useDownload() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);

  const [selectedFormat, setSelectedFormatState] = useState<MediaFormatType>('mp4');
  const [selectedQuality, setSelectedQuality] = useState<string>('1080p');

  const [jobId, setJobId] = useState<string | null>(null);
  const [jobProgress, setJobProgress] = useState<JobProgress | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  // useSyncExternalStore for hydration-safe external storage
  const historyRaw = useSyncExternalStore(
    subscribeToHistory,
    getHistorySnapshot,
    getHistoryServerSnapshot
  );

  const history: DownloadHistoryItem[] = useMemo(() => {
    try {
      return JSON.parse(historyRaw);
    } catch {
      return [];
    }
  }, [historyRaw]);

  const setSelectedFormat = useCallback((format: MediaFormatType) => {
    setSelectedFormatState(format);
    if (metadata) {
      const available = metadata.formats.filter((f) => f.type === format);
      if (available.length > 0) {
        setSelectedQuality(available[0].quality);
      }
    }
  }, [metadata]);

  // Save history to localStorage
  const saveToHistory = useCallback((item: DownloadHistoryItem) => {
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY) || '[]';
      const prev: DownloadHistoryItem[] = JSON.parse(currentRaw);
      const filtered = prev.filter((h) => h.id !== item.id);
      const updated = [item, ...filtered].slice(0, 15);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      notifyHistoryChange();
    } catch {
      // Ignore
    }
  }, []);

  const clearHistory = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      notifyHistoryChange();
    } catch {
      // Ignore
    }
  }, []);

  const removeHistoryItem = useCallback((id: string) => {
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY) || '[]';
      const prev: DownloadHistoryItem[] = JSON.parse(currentRaw);
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      notifyHistoryChange();
    } catch {
      // Ignore
    }
  }, []);

  // Analyze URL Action
  const analyzeUrl = useCallback(
    async (inputUrl?: string) => {
      const targetUrl = (inputUrl || url).trim();
      if (!targetUrl) {
        setAnalyzeError('Please enter a valid video or reel URL');
        return;
      }

      setAnalyzing(true);
      setAnalyzeError(null);
      setMetadata(null);
      setJobId(null);
      setJobProgress(null);
      setDownloadReady(false);
      setProcessError(null);

      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetUrl }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || data.error || 'Failed to analyze URL');
        }

        const meta: MediaMetadata = data.data;
        setMetadata(meta);
        setSelectedFormatState('mp4');
        const defaultQuality = meta.formats.find((f) => f.type === 'mp4')?.quality || '1080p';
        setSelectedQuality(defaultQuality);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Could not process this media URL.';
        setAnalyzeError(errorMsg);
      } finally {
        setAnalyzing(false);
      }
    },
    [url]
  );

  // Poll Job Status
  const pollJobStatus = useCallback(
    (currentJobId: string, meta: MediaMetadata) => {
      let isSubscribed = true;
      const interval = setInterval(async () => {
        if (!isSubscribed) return;

        try {
          const res = await fetch(`/api/download/status/${currentJobId}`);
          const data = await res.json();

          if (!res.ok || !data.success) {
            clearInterval(interval);
            setProcessing(false);
            setProcessError(data.message || 'Error checking download status.');
            return;
          }

          const job: JobProgress = data.job;
          setJobProgress(job);

          if (job.status === 'completed') {
            clearInterval(interval);
            setProcessing(false);
            setDownloadReady(true);

            // Trigger celebration confetti
            try {
              confetti({
                particleCount: 70,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#06b6d4', '#6366f1', '#a855f7'],
              });
            } catch {
              // Ignore confetti error
            }

            // Record in local history
            saveToHistory({
              id: `${currentJobId}`,
              url: meta.url,
              title: meta.title,
              thumbnail: meta.thumbnail,
              platform: meta.platform,
              format: selectedFormat,
              quality: selectedQuality,
              timestamp: Date.now(),
              fileName: job.fileName || 'media_download',
              fileSize: job.fileSize,
            });
          } else if (job.status === 'failed') {
            clearInterval(interval);
            setProcessing(false);
            setProcessError(job.error || 'Media processing failed.');
          }
        } catch {
          // Retry on network glitch
        }
      }, 500);

      return () => {
        isSubscribed = false;
        clearInterval(interval);
      };
    },
    [saveToHistory, selectedFormat, selectedQuality]
  );

  // Start Download Job
  const startDownload = useCallback(async () => {
    if (!metadata) return;

    setProcessing(true);
    setProcessError(null);
    setDownloadReady(false);
    setJobProgress({
      jobId: 'init',
      status: 'queued',
      progress: 5,
      stage: 'Initializing download worker...',
      createdAt: Date.now(),
    });

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: metadata.url,
          format: selectedFormat,
          quality: selectedQuality,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to initialize processing job.');
      }

      setJobId(data.jobId);
      pollJobStatus(data.jobId, metadata);
    } catch (err: unknown) {
      setProcessing(false);
      const msg = err instanceof Error ? err.message : 'Failed to start download.';
      setProcessError(msg);
    }
  }, [metadata, selectedFormat, selectedQuality, pollJobStatus]);

  const reset = useCallback(() => {
    setUrl('');
    setMetadata(null);
    setAnalyzeError(null);
    setJobId(null);
    setJobProgress(null);
    setProcessing(false);
    setDownloadReady(false);
    setProcessError(null);
  }, []);

  return {
    url,
    setUrl,
    analyzing,
    analyzeError,
    metadata,
    selectedFormat,
    setSelectedFormat,
    selectedQuality,
    setSelectedQuality,
    jobId,
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
  };
}
