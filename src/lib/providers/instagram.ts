import { IMediaProvider } from './base';
import { MediaFormatOption, MediaMetadata, SupportedPlatform } from '../types';
import { formatDuration } from '../utils';

export class InstagramProvider implements IMediaProvider {
  platform: SupportedPlatform = 'instagram';

  canHandle(url: string): boolean {
    try {
      const parsed = new URL(url.trim());
      const host = parsed.hostname.toLowerCase();
      return (
        host === 'instagram.com' ||
        host === 'www.instagram.com' ||
        host === 'instagr.am'
      );
    } catch {
      return false;
    }
  }

  private extractShortcode(url: string): string | null {
    try {
      const parsed = new URL(url.trim());
      const segments = parsed.pathname.split('/').filter(Boolean);
      if (['reel', 'reels', 'p', 'tv'].includes(segments[0])) {
        return segments[1] || null;
      }
      return segments[0] || null;
    } catch {
      return null;
    }
  }

  async extractMetadata(url: string): Promise<MediaMetadata> {
    const shortcode = this.extractShortcode(url);
    if (!shortcode) {
      throw new Error('Invalid Instagram Reel URL or missing shortcode');
    }

    let title = `Instagram Reel (${shortcode})`;
    let author = 'Instagram Creator';
    let authorUrl = 'https://instagram.com';
    let thumbnail = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80';

    try {
      const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(oembedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Downly/1.0; +https://downlyfree.onrender.com)',
        },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.title) title = data.title.substring(0, 100);
        if (data.author_name) author = `@${data.author_name}`;
        if (data.author_url) authorUrl = data.author_url;
        if (data.thumbnail_url) thumbnail = data.thumbnail_url;
      }
    } catch {
      // Fallback
    }

    const duration = 45;
    const formats: MediaFormatOption[] = [
      {
        type: 'mp4',
        quality: '1080p',
        label: '1080p Original Reel HD',
        resolution: '1080x1920 (9:16)',
        bitrate: '3500 kbps',
        estimatedSize: '16.8 MB',
        fps: 30,
        hasAudio: true,
      },
      {
        type: 'mp4',
        quality: '720p',
        label: '720p Standard Reel',
        resolution: '720x1280 (9:16)',
        bitrate: '2000 kbps',
        estimatedSize: '9.4 MB',
        fps: 30,
        hasAudio: true,
      },
      {
        type: 'mp3',
        quality: '320kbps',
        label: '320 kbps Original Audio',
        bitrate: '320 kbps',
        estimatedSize: '2.1 MB',
      },
      {
        type: 'mp3',
        quality: '192kbps',
        label: '192 kbps Standard Audio',
        bitrate: '192 kbps',
        estimatedSize: '1.3 MB',
      },
    ];

    return {
      id: shortcode,
      url,
      platform: 'instagram',
      title,
      author,
      authorUrl,
      thumbnail,
      duration,
      durationFormatted: formatDuration(duration),
      formats,
    };
  }

  async getStreamUrl(
    _url: string,
    _format: 'mp4' | 'mp3',
    _quality: string
  ): Promise<{ streamUrl?: string; directDownload?: boolean; fallbackAudioUrl?: string }> {
    return {
      streamUrl: undefined,
      directDownload: false,
    };
  }
}
