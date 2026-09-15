import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { JobProgress, MediaFormatType } from './types';
import { createSafeFileName } from './security';
import { getProviderForUrl } from './providers';
import { formatFileSize } from './utils';

// ─── Paths ────────────────────────────────────────────────────────────────────
// ─── Paths ────────────────────────────────────────────────────────────────────
const TEMP_DIR =
  process.env.TEMP_DIR ||
  (process.env.VERCEL
    ? path.join('/tmp', '.tmp_downloads')
    : path.join(process.cwd(), '.tmp_downloads'));
const FFMPEG_BIN = locateFFmpeg();
const YTDLP_BIN = locateYtDlp();

if (!fs.existsSync(TEMP_DIR)) {
  try { fs.mkdirSync(TEMP_DIR, { recursive: true }); } catch { /* ignore */ }
}

function locateFFmpeg(): string {
  // Allow explicit override via environment variable (useful for Render/Railway/Vercel)
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  const candidates = [
    '/usr/bin/ffmpeg',                  // Render / Ubuntu Linux
    '/usr/local/bin/ffmpeg',            // Render custom install
    '/opt/homebrew/bin/ffmpeg',         // macOS Homebrew
    path.join(process.cwd(), 'node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg'),
    path.join(process.cwd(), 'node_modules/@ffmpeg-installer/darwin-x64/ffmpeg'),
    path.join(process.cwd(), 'node_modules/@ffmpeg-installer/linux-x64/ffmpeg'),
    path.join(process.cwd(), 'node_modules/@ffmpeg-installer/linux-arm64/ffmpeg'),
  ];
  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch { /* skip */ }
  }
  return 'ffmpeg';
}

function locateYtDlp(): string {
  // Allow explicit override via environment variable (useful for Render/Railway/Vercel)
  if (process.env.YTDLP_PATH) return process.env.YTDLP_PATH;
  const candidates = [
    path.join(process.cwd(), 'bin/yt-dlp'), // Render project bin (build.sh)
    '/tmp/bin/yt-dlp',                     // Vercel serverless bin
    '/tmp/yt-dlp',
    '/usr/local/bin/yt-dlp',
    '/usr/bin/yt-dlp',
    '/opt/homebrew/bin/yt-dlp',
    path.join(process.env.HOME || '', '.local/bin/yt-dlp'),
  ];
  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch { /* skip */ }
  }
  return 'yt-dlp';
}

// ─── Job Store (Global + Disk) ────────────────────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var __downly_jobs: Map<string, JobProgress & { filePath?: string; title?: string }> | undefined;
}
const jobs =
  global.__downly_jobs ||
  new Map<string, JobProgress & { filePath?: string; title?: string }>();
global.__downly_jobs = jobs;

function metaPath(jobId: string) {
  return path.join(TEMP_DIR, `${jobId}.meta.json`);
}
function persist(job: JobProgress & { filePath?: string; title?: string }) {
  try { fs.writeFileSync(metaPath(job.jobId), JSON.stringify(job)); } catch { /* ignore */ }
}
function loadFromDisk(jobId: string) {
  try {
    const p = metaPath(jobId);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf-8')) as JobProgress & { filePath?: string };
  } catch { /* ignore */ }
}

// Garbage-collect files > 30 min old
setInterval(() => {
  try {
    const cutoff = Date.now() - 30 * 60 * 1000;
    fs.readdirSync(TEMP_DIR).forEach((f) => {
      const fp = path.join(TEMP_DIR, f);
      try { if (fs.statSync(fp).mtimeMs < cutoff) fs.unlinkSync(fp); } catch { /* skip */ }
    });
  } catch { /* ignore */ }
}, 5 * 60 * 1000);

export function getJob(jobId: string): (JobProgress & { filePath?: string }) | undefined {
  return jobs.get(jobId) ?? loadFromDisk(jobId);
}

export function createJob(url: string, format: MediaFormatType, quality: string): string {
  const jobId = crypto.randomUUID();
  const job: JobProgress & { filePath?: string } = {
    jobId,
    status: 'queued',
    progress: 5,
    stage: 'Job queued, preparing download...',
    createdAt: Date.now(),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  };
  jobs.set(jobId, job);
  persist(job);

  processJob(jobId, url, format, quality).catch((err) => {
    console.error(`[Worker] Job ${jobId} failed:`, err);
    update(jobId, { status: 'failed', progress: 100, stage: 'Processing failed', error: String(err) });
  });

  return jobId;
}

function update(jobId: string, patch: Partial<JobProgress & { filePath?: string; title?: string }>) {
  const base = jobs.get(jobId) ?? loadFromDisk(jobId) ?? { jobId, status: 'queued', progress: 5, stage: '', createdAt: Date.now() };
  const next = { ...base, ...patch };
  jobs.set(jobId, next);
  persist(next);
}

// ─── Main Job Processor ───────────────────────────────────────────────────────
async function processJob(jobId: string, url: string, format: MediaFormatType, quality: string) {
  const provider = getProviderForUrl(url);
  if (!provider) {
    update(jobId, { status: 'failed', progress: 100, stage: 'Unsupported platform', error: 'Platform not supported.' });
    return;
  }

  // Step 1 — Fetch metadata (title, author, etc.)
  update(jobId, { status: 'fetching', progress: 15, stage: 'Fetching video information...' });

  let metadata;
  try {
    metadata = await provider.extractMetadata(url);
  } catch (err) {
    update(jobId, { status: 'failed', progress: 100, stage: 'Metadata failed', error: err instanceof Error ? err.message : 'Could not fetch media info.' });
    return;
  }

  const safeTitle = createSafeFileName(metadata.title, quality, format);
  const outputPath = path.join(TEMP_DIR, `${jobId}_${safeTitle}`);

  update(jobId, { status: 'fetching', progress: 30, stage: 'Starting download from source...', title: metadata.title });

  // Step 2 — Download using yt-dlp
  try {
    update(jobId, { progress: 45, stage: format === 'mp3' ? `Downloading & extracting audio (${quality})...` : `Downloading video (${quality})...` });

    await downloadWithYtDlp(url, format, quality, outputPath);

    update(jobId, { status: 'transcoding', progress: 85, stage: 'Finalizing and packaging...' });
  } catch (err) {
    console.error('[Worker] yt-dlp failed:', err);
    update(jobId, { status: 'failed', progress: 100, stage: 'Download failed', error: `Could not download media: ${err instanceof Error ? err.message : err}` });
    return;
  }

  // Step 3 — Verify output exists
  if (!fs.existsSync(outputPath)) {
    update(jobId, { status: 'failed', progress: 100, stage: 'Output file missing', error: 'The downloaded file was not found after processing.' });
    return;
  }

  const stats = fs.statSync(outputPath);
  const fileSize = formatFileSize(stats.size);

  update(jobId, {
    status: 'completed',
    progress: 100,
    stage: 'Your download is ready!',
    fileName: safeTitle,
    fileSize,
    filePath: outputPath,
    downloadUrl: `/api/download/file/${jobId}`,
  });
}

// ─── yt-dlp Download Logic ────────────────────────────────────────────────────

/**
 * Resolves the path to YouTube/browser cookies if provided via environment or filesystem.
 * Render/Railway users can supply `YTDLP_COOKIES` (raw text) or `YTDLP_COOKIES_BASE64`.
 */
function getCookiesPath(): string | null {
  // 1. Explicit path in environment variable
  if (process.env.COOKIES_PATH && fs.existsSync(process.env.COOKIES_PATH)) {
    return process.env.COOKIES_PATH;
  }

  // 2. Base64-encoded cookies (preserves newlines cleanly across cloud config dashboards)
  if (process.env.YTDLP_COOKIES_BASE64) {
    try {
      const decoded = Buffer.from(process.env.YTDLP_COOKIES_BASE64, 'base64').toString('utf-8');
      const target = path.join(TEMP_DIR, 'cookies.txt');
      fs.writeFileSync(target, decoded, 'utf-8');
      return target;
    } catch (e) {
      console.error('[Worker] Failed to decode YTDLP_COOKIES_BASE64:', e);
    }
  }

  // 3. Raw cookies string in environment variable
  const rawCookies = process.env.YTDLP_COOKIES || process.env.YOUTUBE_COOKIES;
  if (rawCookies && rawCookies.trim().length > 0) {
    try {
      const target = path.join(TEMP_DIR, 'cookies.txt');
      fs.writeFileSync(target, rawCookies.trim(), 'utf-8');
      return target;
    } catch (e) {
      console.error('[Worker] Failed to write YTDLP_COOKIES:', e);
    }
  }

  // 4. Local cookies.txt in workspace root
  const rootCookies = path.join(process.cwd(), 'cookies.txt');
  if (fs.existsSync(rootCookies)) {
    return rootCookies;
  }

  return null;
}

/**
 * Builds optimized yt-dlp argument array.
 * On datacenter/cloud IPs (Render, AWS, DigitalOcean), the default `web` client triggers
 * YouTube's bot-detection ("Sign in to confirm you're not a bot").
 * Using `tv,android,ios` player clients bypasses the web challenge without requiring browser JS.
 */
function buildYtDlpArgs(
  url: string,
  format: MediaFormatType,
  quality: string,
  outputPath: string,
  playerClients = 'tv,android,ios'
): string[] {
  const args: string[] = [
    '--ffmpeg-location', FFMPEG_BIN,
    '--no-playlist',
    '--no-check-certificates',
    '--socket-timeout', '30',
    '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  ];

  // Pass cookies if configured
  const cookiesPath = getCookiesPath();
  if (cookiesPath) {
    args.push('--cookies', cookiesPath);
  }

  // Pass proxy if configured
  const proxy = process.env.YTDLP_PROXY || process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
  if (proxy) {
    args.push('--proxy', proxy);
  }

  // Platform-specific extractor optimizations
  const isYouTube = /youtu\.?be/i.test(url);
  if (isYouTube) {
    if (cookiesPath) {
      // With authenticated cookies, include web along with mobile/tv clients
      args.push('--extractor-args', 'youtube:player_client=tv,android,web,ios');
    } else {
      // Without cookies on cloud datacenter IPs, web client triggers bot check.
      // tv, android, and ios clients bypass the web bot check.
      args.push('--extractor-args', `youtube:player_client=${playerClients}`);
    }
  }

  if (format === 'mp3') {
    // Extract audio and convert to MP3 at the selected bitrate
    const bitrate = quality.replace('kbps', '');
    args.push(
      '-x',
      '--audio-format', 'mp3',
      '--audio-quality', `${bitrate}K`,
      '-o', outputPath,
      url
    );
  } else {
    // Download video + audio and merge into MP4
    const heightLimit = quality.replace('p', '');
    args.push(
      '-f', `bestvideo[height<=${heightLimit}][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=${heightLimit}]+bestaudio/best[height<=${heightLimit}]/18/best`,
      '--merge-output-format', 'mp4',
      '-o', outputPath,
      url
    );
  }

  return args;
}

function executeYtDlp(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('[Worker] Executing yt-dlp:', YTDLP_BIN, args.join(' '));

    const proc = spawn(YTDLP_BIN, args, { shell: false });
    let stderr = '';

    proc.stdout?.on('data', (d) => process.stdout.write(d));
    proc.stderr?.on('data', (d) => {
      const line = d.toString();
      stderr += line;
      process.stderr.write(line);
    });

    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`yt-dlp exited ${code}: ${stderr.slice(-400)}`));
    });
  });
}

function sanitizeYtDlpError(err: unknown): Error {
  const raw = err instanceof Error ? err.message : String(err);
  if (raw.includes("Sign in to confirm you're not a bot") || raw.includes("cookies-from-browser")) {
    return new Error(
      "YouTube is requiring bot verification on this cloud server IP. " +
      "To resolve permanently on Render, add your YouTube cookies.txt to the YTDLP_COOKIES environment variable in the Render Dashboard."
    );
  }
  if (raw.includes("HTTP Error 429")) {
    return new Error("YouTube has temporarily rate-limited this video. Please try again in 1-2 minutes.");
  }
  if (raw.includes("Video unavailable") || raw.includes("Private video")) {
    return new Error("This video is unavailable or set to private.");
  }
  return new Error(raw.slice(-300));
}

async function downloadWithYtDlp(
  url: string,
  format: MediaFormatType,
  quality: string,
  outputPath: string
): Promise<void> {
  const isYouTube = /youtu\.?be/i.test(url);
  const primaryArgs = buildYtDlpArgs(url, format, quality, outputPath, 'tv,android,ios');

  try {
    await executeYtDlp(primaryArgs);
  } catch (err) {
    const errMsg = String(err);
    const isBotBlock =
      errMsg.includes("Sign in to confirm you're not a bot") ||
      errMsg.includes('cookies-from-browser') ||
      errMsg.includes('HTTP Error 429');

    // Auto-retry once with strict TV client if primary client combination was challenged
    if (isYouTube && isBotBlock) {
      console.warn('[Worker] Bot verification triggered on primary client. Retrying with fallback TV client...');
      const fallbackArgs = buildYtDlpArgs(url, format, quality, outputPath, 'tv,android');
      try {
        await executeYtDlp(fallbackArgs);
        return;
      } catch (retryErr) {
        console.error('[Worker] Fallback client attempt also failed:', retryErr);
        throw sanitizeYtDlpError(retryErr);
      }
    }

    throw sanitizeYtDlpError(err);
  }
}
