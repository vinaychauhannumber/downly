export type SupportedPlatform = 'youtube' | 'instagram' | 'unknown';

export type MediaFormatType = 'mp4' | 'mp3';

export type VideoQuality = '1080p' | '720p' | '480p' | '360p' | 'best';

export type AudioQuality = '320kbps' | '256kbps' | '192kbps' | '128kbps';

export interface MediaFormatOption {
  type: MediaFormatType;
  quality: string;
  label: string;
  resolution?: string;
  bitrate?: string;
  estimatedSize?: string;
  fps?: number;
  hasAudio?: boolean;
}

export interface MediaMetadata {
  id: string;
  url: string;
  platform: SupportedPlatform;
  title: string;
  author: string;
  authorUrl?: string;
  thumbnail: string;
  duration: number; // in seconds
  durationFormatted: string;
  viewCount?: number;
  formats: MediaFormatOption[];
  isPrivate?: boolean;
  requiresAuth?: boolean;
}

export type JobStatus = 'queued' | 'fetching' | 'transcoding' | 'packaging' | 'completed' | 'failed';

export interface JobProgress {
  jobId: string;
  status: JobStatus;
  progress: number; // 0 - 100
  stage: string;
  error?: string;
  fileName?: string;
  fileSize?: string;
  downloadUrl?: string;
  expiresAt?: string;
  createdAt: number;
}

export interface DownloadRequestPayload {
  url: string;
  format: MediaFormatType;
  quality: string;
}

export interface DownloadHistoryItem {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  platform: SupportedPlatform;
  format: MediaFormatType;
  quality: string;
  timestamp: number;
  fileName: string;
  fileSize?: string;
}
