export interface GuideData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  summary: string;
  category: 'Instagram' | 'YouTube' | 'Audio' | 'Tips';
  readTime: string;
  publishedDate: string;
  keywords: string[];
  sections: {
    heading: string;
    content: string[];
    tips?: string[];
  }[];
  steps?: {
    name: string;
    text: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedToolSlug: string;
}

export const GUIDES_DATA: Record<string, GuideData> = {
  'how-to-download-instagram-reels': {
    slug: 'how-to-download-instagram-reels',
    title: 'How to Download Instagram Reels in HD (iPhone, Android & PC)',
    metaDescription: 'Step-by-step tutorial on how to download Instagram Reels in 1080p HD with audio. Learn how to save Reels on iPhone, Android, Mac, and Windows PC.',
    h1: 'How to Download Instagram Reels in HD with Audio',
    summary: 'A complete, step-by-step guide to saving public Instagram Reels to your phone or computer in full 1080p quality without watermarks.',
    category: 'Instagram',
    readTime: '4 min read',
    publishedDate: '2026-08-30',
    keywords: [
      'how to download instagram reels',
      'save instagram reels to camera roll',
      'download instagram reels with audio',
      'instagram reel downloader guide',
    ],
    sections: [
      {
        heading: 'Why Save Instagram Reels for Offline Viewing?',
        content: [
          'Instagram Reels are one of the most engaging ways creators share creative tips, cooking recipes, fitness workouts, travel vlogs, and comedy sketches. However, because Instagram is an online-only platform, saving your favorite Reels offline lets you watch them without internet or preserve them before creators remove them.',
          'Using a dedicated web tool like Downly allows you to download clean MP4 files directly to your device without downloading questionable third-party apps.',
        ],
      },
      {
        heading: 'Step-by-Step: Downloading on iPhone (iOS)',
        content: [
          'Saving Instagram Reels to an iPhone camera roll is straightforward when using Safari:',
          '1. Open the Instagram app and find the Reel you want to save.',
          '2. Tap the "Share" paper airplane icon and tap "Copy Link".',
          '3. Open Safari and navigate to Downly (downlyfree.onrender.com/instagram-reel-downloader).',
          '4. Paste the link and tap "Analyze".',
          '5. Tap "Download File" and select "Download" in the Safari prompt.',
          '6. Open the Files app or tap the Downloads arrow in Safari to save the video directly to your Photos library.',
        ],
        tips: [
          'Tip: If you only want the trending sound, switch the format to MP3 Audio before downloading!',
        ],
      },
      {
        heading: 'Step-by-Step: Downloading on Android',
        content: [
          'Android users can download directly to their Downloads folder or Google Photos with Chrome:',
          '1. In the Instagram app, tap the three dots on the bottom right of the Reel.',
          '2. Tap "Link" or "Copy link".',
          '3. Open Chrome, paste the link into Downly, and tap "Analyze".',
          '4. Choose 1080p and tap "Download File". The video will automatically appear in your Gallery app under Downloads.',
        ],
      },
    ],
    steps: [
      {
        name: 'Copy Reel Link',
        text: 'Tap the Share icon on any public Instagram Reel and select Copy Link.',
      },
      {
        name: 'Paste into Downly',
        text: 'Paste the URL into the Downly Instagram Downloader and click Analyze.',
      },
      {
        name: 'Download & Save',
        text: 'Select 1080p MP4 or MP3 audio and click Download to save the media file.',
      },
    ],
    faqs: [
      {
        question: 'Can I download Reels from private accounts?',
        answer: 'No. To protect creator privacy, Downly only downloads media from publicly accessible Instagram accounts.',
      },
      {
        question: 'Does downloading an Instagram Reel notify the creator?',
        answer: 'No. Instagram does not notify creators when someone downloads or views their public videos via browser tools.',
      },
    ],
    relatedToolSlug: 'instagram-reel-downloader',
  },

  'how-to-download-youtube-videos-in-mp4': {
    slug: 'how-to-download-youtube-videos-in-mp4',
    title: 'How to Download YouTube Videos in MP4 Format (Fast & Free)',
    metaDescription: 'Learn how to download YouTube videos in MP4 format with audio. Works on all devices with no software installation required.',
    h1: 'How to Download YouTube Videos in MP4 Format',
    summary: 'A complete tutorial explaining how to download YouTube videos in MP4 format with high-definition visuals and synchronized stereo sound.',
    category: 'YouTube',
    readTime: '3 min read',
    publishedDate: '2026-08-30',
    keywords: [
      'how to download youtube videos in mp4',
      'save youtube video as mp4',
      'youtube to mp4 guide',
      'download youtube video on pc',
    ],
    sections: [
      {
        heading: 'Why MP4 is the Optimal Video Format',
        content: [
          'MP4 (MPEG-4 Part 14) is universally recognized across every operating system, smartphone, smart TV, and video editing software. By combining H.264 video encoding with AAC stereo audio, MP4 provides high-definition clarity at efficient file sizes.',
          'Downly ensures every MP4 file is properly structured with faststart atoms so you never experience playback stutter or black screen errors.',
        ],
      },
      {
        heading: 'How to Download YouTube MP4 Videos on PC / Mac',
        content: [
          '1. Open YouTube in your browser and locate the video you wish to save.',
          '2. Copy the video URL from your browser address bar (e.g. https://www.youtube.com/watch?v=...).',
          '3. Visit Downly’s YouTube MP4 Downloader.',
          '4. Paste the URL into the input field and click "Analyze".',
          '5. Choose your preferred quality (1080p, 720p, or 480p) and click "Download MP4".',
          '6. The file will be saved in your Downloads folder ready for offline playback.',
        ],
      },
    ],
    steps: [
      {
        name: 'Copy Video URL',
        text: 'Copy the YouTube video link from your browser or app.',
      },
      {
        name: 'Choose MP4 Quality',
        text: 'Paste into Downly and pick 1080p Full HD or 720p HD.',
      },
      {
        name: 'Save to Device',
        text: 'Click Download to transcode and save your universal MP4 video.',
      },
    ],
    faqs: [
      {
        question: 'Will the downloaded MP4 have audio included?',
        answer: 'Yes! Downly automatically muxes the high-definition video track with high-fidelity AAC stereo audio so your video plays with sound everywhere.',
      },
    ],
    relatedToolSlug: 'youtube-mp4-downloader',
  },

  'how-to-download-youtube-videos-in-1080p': {
    slug: 'how-to-download-youtube-videos-in-1080p',
    title: 'How to Download YouTube Videos in 1080p Full HD (With Sound)',
    metaDescription: 'Step-by-step guide on downloading 1080p Full HD YouTube videos with synchronized audio. Fix the "no audio on 1080p" issue permanently.',
    h1: 'How to Download YouTube Videos in 1080p Full HD with Audio',
    summary: 'Learn how to easily download true 1080p Full HD YouTube videos with combined, high-fidelity audio streams.',
    category: 'YouTube',
    readTime: '4 min read',
    publishedDate: '2026-08-30',
    keywords: [
      'how to download youtube videos in 1080p',
      'youtube 1080p download with audio',
      'download 1080p 60fps youtube video',
    ],
    sections: [
      {
        heading: 'Why Many 1080p Downloaders Have No Sound',
        content: [
          'YouTube uses DASH (Dynamic Adaptive Streaming over HTTP) for all resolutions above 720p. This means the 1080p video stream is delivered separately from the audio stream.',
          'Basic download sites simply grab the video stream and miss the audio track. Downly’s server architecture uses FFmpeg to merge both streams together into a complete 1080p MP4 file with crisp stereo sound.',
        ],
      },
      {
        heading: 'How to Download in 1080p on Downly',
        content: [
          '1. Copy any YouTube video URL that supports 1080p resolution.',
          '2. Paste the link into Downly and click Analyze.',
          '3. In the Quality Selector, choose "1080p (Full HD)".',
          '4. Click Download. Downly will mux the video and audio in seconds and deliver your Full HD MP4 file.',
        ],
      },
    ],
    steps: [
      {
        name: 'Copy 1080p YouTube Link',
        text: 'Copy the link of any 1080p YouTube video.',
      },
      {
        name: 'Select 1080p Quality',
        text: 'Paste in Downly and ensure 1080p Full HD is chosen.',
      },
      {
        name: 'Download & Play',
        text: 'Save the video file and play in QuickTime, VLC, or your favorite player.',
      },
    ],
    faqs: [
      {
        question: 'Does 1080p support 60fps videos?',
        answer: 'Yes! If the original YouTube video was uploaded in 60fps, Downly preserves the full 60fps framerate in the downloaded MP4.',
      },
    ],
    relatedToolSlug: 'youtube-1080p-downloader',
  },

  'how-to-convert-youtube-videos-to-mp3': {
    slug: 'how-to-convert-youtube-videos-to-mp3',
    title: 'How to Convert YouTube Videos to 320kbps MP3 Audio',
    metaDescription: 'Complete tutorial on converting YouTube videos to high-quality 320kbps MP3 audio files. Fast, free, and compatible with all music players.',
    h1: 'How to Convert YouTube Videos to MP3 Audio',
    summary: 'A simple guide to extracting audio tracks from YouTube videos and converting them into 320kbps MP3 files with ID3 tags.',
    category: 'Audio',
    readTime: '3 min read',
    publishedDate: '2026-08-30',
    keywords: [
      'how to convert youtube to mp3',
      'extract audio from youtube video',
      'youtube to 320kbps mp3 guide',
      'youtube audio download tutorial',
    ],
    sections: [
      {
        heading: 'Why Convert YouTube to MP3?',
        content: [
          'Many great speeches, podcast episodes, music sets, and educational discussions are hosted on YouTube. Converting them to MP3 lets you listen on your commute, during workouts, or while traveling without burning mobile screen battery.',
        ],
      },
      {
        heading: 'Step-by-Step Conversion Guide',
        content: [
          '1. Copy the YouTube video link from your browser or the YouTube app.',
          '2. Paste the link into Downly’s YouTube to MP3 Converter.',
          '3. Under Format, select "MP3 Audio".',
          '4. Choose your bitrate (320kbps for maximum quality, or 192kbps for smaller size).',
          '5. Click Download to extract and download your audio file.',
        ],
      },
    ],
    steps: [
      {
        name: 'Paste YouTube URL',
        text: 'Paste any public video link into Downly.',
      },
      {
        name: 'Select MP3 & 320kbps',
        text: 'Select MP3 Audio and choose 320kbps bitrate.',
      },
      {
        name: 'Download MP3',
        text: 'Click Download to receive your tagged MP3 track.',
      },
    ],
    faqs: [
      {
        question: 'Which bitrate should I choose for music?',
        answer: 'For music and high-fidelity sound, 320kbps is strongly recommended. For voice podcasts or lectures, 192kbps or 128kbps is more than adequate.',
      },
    ],
    relatedToolSlug: 'youtube-mp3-downloader',
  },

  'how-to-download-youtube-shorts': {
    slug: 'how-to-download-youtube-shorts',
    title: 'How to Download YouTube Shorts in HD (Mobile & Desktop)',
    metaDescription: 'Learn how to download vertical YouTube Shorts videos in 1080p MP4. Free, fast, and watermark-free guide for iPhone, Android, and PC.',
    h1: 'How to Download YouTube Shorts in HD',
    summary: 'A quick guide on how to save vertical YouTube Shorts to your camera roll or PC in full portrait 1080p HD.',
    category: 'YouTube',
    readTime: '3 min read',
    publishedDate: '2026-08-30',
    keywords: [
      'how to download youtube shorts',
      'save youtube shorts to camera roll',
      'youtube shorts download on mobile',
      'youtube shorts to mp4 guide',
    ],
    sections: [
      {
        heading: 'Downloading Shorts in Vertical 9:16 Format',
        content: [
          'YouTube Shorts are designed specifically for smartphones with a 9:16 aspect ratio. Downly captures the original high-resolution stream so your saved video looks sharp on full-screen displays.',
        ],
      },
      {
        heading: 'How to Copy & Download a Short',
        content: [
          '1. On YouTube mobile app, tap the "Share" icon on the Short and choose "Copy link".',
          '2. On desktop, copy the URL from the browser address bar (e.g. youtube.com/shorts/...).',
          '3. Open Downly, paste the Shorts link, and click Analyze.',
          '4. Click Download to save the vertical MP4 video file.',
        ],
      },
    ],
    steps: [
      {
        name: 'Copy Shorts URL',
        text: 'Tap Share on the YouTube Short and copy the link.',
      },
      {
        name: 'Paste in Downly',
        text: 'Paste into Downly and analyze the media stream.',
      },
      {
        name: 'Download Vertical HD',
        text: 'Save the 9:16 portrait MP4 video directly.',
      },
    ],
    faqs: [
      {
        question: 'Does Downly work with shortened youtu.be links for Shorts?',
        answer: 'Yes! Downly automatically resolves youtu.be, youtube.com/shorts, and standard YouTube URLs.',
      },
    ],
    relatedToolSlug: 'youtube-shorts-downloader',
  },

  'how-to-download-instagram-videos-on-mobile': {
    slug: 'how-to-download-instagram-videos-on-mobile',
    title: 'How to Download Instagram Videos on Mobile (iPhone & Android)',
    metaDescription: 'Easy mobile guide to downloading Instagram feed videos and Reels on iOS and Android. No apps required.',
    h1: 'How to Download Instagram Videos on Mobile Devices',
    summary: 'Learn the easiest way to save Instagram feed videos and reels directly to your iPhone or Android gallery using your mobile browser.',
    category: 'Instagram',
    readTime: '4 min read',
    publishedDate: '2026-08-30',
    keywords: [
      'how to download instagram videos on mobile',
      'download instagram videos on iphone',
      'save instagram video android gallery',
    ],
    sections: [
      {
        heading: 'No App Store Installs Needed',
        content: [
          'Many mobile app store downloaders contain excessive ads, request unnecessary device permissions, or stop working after Instagram updates. Downly works directly through Safari and Chrome without installing anything on your phone.',
        ],
      },
      {
        heading: 'iOS Safari Download Steps',
        content: [
          '1. Copy the Instagram video link.',
          '2. Open Safari and visit Downly.',
          '3. Paste and analyze the link.',
          '4. Tap Download, then tap the download icon in Safari’s URL bar to access the file.',
          '5. Tap the Share icon and select "Save Video" to add it to your Photos app.',
        ],
      },
      {
        heading: 'Android Chrome Download Steps',
        content: [
          '1. Copy the Instagram video link.',
          '2. Open Chrome and visit Downly.',
          '3. Paste and tap Analyze.',
          '4. Tap Download. The file will immediately download to your device and appear in your Photos or Files app.',
        ],
      },
    ],
    steps: [
      {
        name: 'Copy Video Link',
        text: 'Copy the Instagram link from the app.',
      },
      {
        name: 'Open Mobile Browser',
        text: 'Open Safari or Chrome and navigate to Downly.',
      },
      {
        name: 'Download to Gallery',
        text: 'Tap Download and save the video directly to your photos.',
      },
    ],
    faqs: [
      {
        question: 'Is it free to download Instagram videos on mobile?',
        answer: 'Yes! Downly is 100% free with no hidden subscriptions or mobile app purchases.',
      },
    ],
    relatedToolSlug: 'instagram-video-downloader',
  },
};
