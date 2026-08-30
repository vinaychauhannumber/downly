import { MediaMetadata, SupportedPlatform } from '../types';

export interface IMediaProvider {
  platform: SupportedPlatform;
  canHandle(url: string): boolean;
  extractMetadata(url: string): Promise<MediaMetadata>;
  getStreamUrl(
    url: string,
    format: 'mp4' | 'mp3',
    quality: string
  ): Promise<{ streamUrl?: string; directDownload?: boolean; fallbackAudioUrl?: string }>;
}
