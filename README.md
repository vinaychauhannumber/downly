# Downly – Next-Gen Public Video & Reel Downloader

> **"Download your media, your way."**

Downly is a modern, high-performance full-stack web application designed for fast, seamless downloading and audio extraction of **publicly accessible media** (YouTube Videos, Shorts, and Instagram Reels) into high-definition **MP4** or crystal-clear **MP3** formats.

---

## 🚀 Key Features

- ⚡ **Ultra-Fast Transcoding**: Dedicated media worker queue with multi-stage progress tracking.
- 🎥 **Multi-Resolution Video**: Dynamic stream discovery for 1080p Full HD, 720p HD, 480p SD, and 360p.
- 🎵 **Lossless MP3 Audio Extraction**: Extract studio-quality audio streams (up to 320 kbps) with zero quality loss.
- 🛡️ **Production-Grade Security**:
  - Sliding-window IP rate limiting
  - SSRF protection against loopback/internal CIDR blocks
  - No shell injection (safe `spawn` parameter arrays with `{ shell: false }`)
  - Strict filename sanitization preventing path traversal (`../`)
  - Automatic temporary file cleanup garbage collector (every 30 minutes)
- 💾 **Lightweight Session History**: Local browser history via `localStorage` with quick re-download & clearing.
- 📱 **2026 SaaS Dark Theme**: Built with rich glassmorphism, responsive mobile drawer, and animated interactions.
- 🌐 **SEO Optimized**: Open Graph cards, Twitter metadata, Schema.org JSON-LD structured data, dynamic `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS, Lucide React, Framer Motion, Canvas Confetti.
- **Backend & API**: Next.js Server Handlers, Zod Validation, Child Process Engine.
- **Media Engine**: FFmpeg with safe argument binding + streaming fallback generator.
- **Storage**: Isolated temporary scratch directory with TTL-based background garbage collector.

---

## 📦 System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Next.js Frontend                     │
│  (Hero, UrlInput, MediaPreview, Format/Quality Select, │
│   Live Progress Tracker, Download History, FAQ, etc.)  │
└──────────────────────────┬─────────────────────────────┘
                           │ API Calls
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Next.js API Layer                    │
│   ├── POST /api/analyze (oEmbed metadata & formats)    │
│   ├── POST /api/download (Job creation & queuing)      │
│   ├── GET  /api/download/status/:id (Progress polling) │
│   └── GET  /api/download/file/:id (Stream delivery)    │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│             Modular Media Engine & Worker              │
│   ├── Providers: YouTube, Instagram                    │
│   ├── Job Queue & State Store (TTL auto-expiration)    │
│   ├── FFmpeg Transcoder (safe spawn, stream merge)     │
│   ├── SSRF Guard, Sanitizer & In-Memory Rate Limiter   │
│   └── Temp File Cleanup Garbage Collector              │
└────────────────────────────────────────────────────────┘
```

---

## 🔧 Prerequisites & FFmpeg Installation

### 1. Install Node.js
Requires Node.js `v18.x` or higher (`v20.x` or `v24.x` recommended).

### 2. Install FFmpeg (Optional but Recommended)

#### macOS (via Homebrew):
```bash
brew install ffmpeg
```

#### Ubuntu / Debian:
```bash
sudo apt update
sudo apt install -y ffmpeg
```

#### Docker / Alpine:
```dockerfile
RUN apk add --no-cache ffmpeg
```

> **Note**: If FFmpeg is not detected on your host system, Downly automatically falls back to its built-in media stream packager so local development and testing work without disruption.

---

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/downly.git
   cd downly
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Production Deployment

### Option 1: Vercel + Standalone Media Worker
- Deploy the frontend Next.js App on **Vercel**.
- Point `MEDIA_PROCESSOR_URL` to a standalone Node.js/Docker instance running on **Railway**, **Render**, or **Fly.io** with native FFmpeg support for long-running transcode tasks.

### Option 2: Docker Container (All-in-One)
```dockerfile
FROM node:20-alpine AS runner
RUN apk add --no-cache ffmpeg
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📡 API Specification

### 1. Analyze Media URL
**`POST /api/analyze`**

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "dQw4w9WgXcQ",
    "platform": "youtube",
    "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    "author": "Rick Astley",
    "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    "duration": 214,
    "durationFormatted": "3:34",
    "formats": [
      { "type": "mp4", "quality": "1080p", "label": "1080p Full HD", "estimatedSize": "48.2 MB" },
      { "type": "mp4", "quality": "720p", "label": "720p HD", "estimatedSize": "24.5 MB" },
      { "type": "mp3", "quality": "320kbps", "label": "320 kbps Studio Quality", "estimatedSize": "6.8 MB" }
    ]
  }
}
```

### 2. Create Download Job
**`POST /api/download`**

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "format": "mp4",
  "quality": "1080p"
}
```

**Response:**
```json
{
  "success": true,
  "jobId": "f8a12c4b-81d2-4b2a-89cf-12e0fa92b3c1",
  "status": "queued",
  "statusUrl": "/api/download/status/f8a12c4b-81d2-4b2a-89cf-12e0fa92b3c1"
}
```

### 3. Check Job Status
**`GET /api/download/status/:jobId`**

**Response:**
```json
{
  "success": true,
  "job": {
    "jobId": "f8a12c4b-81d2-4b2a-89cf-12e0fa92b3c1",
    "status": "completed",
    "progress": 100,
    "stage": "Your download is ready!",
    "fileName": "Rick_Astley_Never_Gonna_Give_You_Up_1080p.mp4",
    "fileSize": "48.2 MB",
    "downloadUrl": "/api/download/file/f8a12c4b-81d2-4b2a-89cf-12e0fa92b3c1"
  }
}
```

---

## ⚖️ Legal & Responsible Use Policy

Downly is strictly intended for downloading **publicly accessible media** where the user holds the legal rights or explicit permission from the copyright owner. Downly **never bypasses DRM**, authentication walls, private account restrictions, or platform access controls.

---

## 📄 License

MIT © [Downly](https://downly.media)
