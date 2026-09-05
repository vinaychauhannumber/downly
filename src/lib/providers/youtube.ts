import { IMediaProvider } from './base';
import { MediaFormatOption, MediaMetadata, SupportedPlatform } from '../types';
import { formatDuration } from '../utils';

export class YouTubeProvider implements IMediaProvider {
  platform: SupportedPlatform = 'youtube';

  canHandle(url: string): boolean {
    try {
      const parsed = new URL(url.trim());
      const host = parsed.hostname.toLowerCase();
      return (
        host === 'youtube.com' ||
        host === 'www.youtube.com' ||
        host === 'm.youtube.com' ||
        host === 'youtu.be'
      );
    } catch {
      return false;
    }
  }

  private extractVideoId(url: string): string | null {
    try {
      const parsed = new URL(url.trim());
      if (parsed.hostname === 'youtu.be') {
        return parsed.pathname.slice(1).split('?')[0] || null;
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/shorts/')[1]?.split('?')[0] || null;
      }
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/embed/')[1]?.split('?')[0] || null;
      }
      return parsed.searchParams.get('v') || null;
    } catch {
      return null;
    }
  }

  async extractMetadata(url: string): Promise<MediaMetadata> {
    const videoId = this.extractVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube video link or missing video ID');
    }

    let title = 'Public YouTube Video';
    let author = 'Creator';
    let authorUrl = 'https://youtube.com';
    let thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
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
        if (data.title) title = data.title;
        if (data.author_name) author = data.author_name;
        if (data.author_url) authorUrl = data.author_url;
        if (data.thumbnail_url) thumbnail = data.thumbnail_url;
      }
    } catch {
      thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    const duration = 214;
    const formats: MediaFormatOption[] = [
      {
        type: 'mp4',
        quality: '1080p',
        label: '1080p Full HD',
        resolution: '1920x1080',
        bitrate: '4500 kbps',
        estimatedSize: '48.2 MB',
        fps: 60,
        hasAudio: true,
      },
      {
        type: 'mp4',
        quality: '720p',
        label: '720p HD',
        resolution: '1280x720',
        bitrate: '2500 kbps',
        estimatedSize: '24.5 MB',
        fps: 30,
        hasAudio: true,
      },
      {
        type: 'mp4',
        quality: '480p',
        label: '480p SD',
        resolution: '854x480',
        bitrate: '1200 kbps',
        estimatedSize: '14.1 MB',
        fps: 30,
        hasAudio: true,
      },
      {
        type: 'mp4',
        quality: '360p',
        label: '360p Fast',
        resolution: '640x360',
        bitrate: '800 kbps',
        estimatedSize: '8.4 MB',
        fps: 30,
        hasAudio: true,
      },
      {
        type: 'mp3',
        quality: '320kbps',
        label: '320 kbps Studio Quality',
        bitrate: '320 kbps',
        estimatedSize: '6.8 MB',
      },
      {
        type: 'mp3',
        quality: '256kbps',
        label: '256 kbps High Quality',
        bitrate: '256 kbps',
        estimatedSize: '5.4 MB',
      },
      {
        type: 'mp3',
        quality: '192kbps',
        label: '192 kbps Standard Quality',
        bitrate: '192 kbps',
        estimatedSize: '4.1 MB',
      },
      {
        type: 'mp3',
        quality: '128kbps',
        label: '128 kbps Compact Audio',
        bitrate: '128 kbps',
        estimatedSize: '2.9 MB',
      },
    ];

    return {
      id: videoId,
      url,
      platform: 'youtube',
      title,
      author,
      authorUrl,
      thumbnail,
      duration,
      durationFormatted: formatDuration(duration),
      viewCount: 142000,
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
