#!/usr/bin/env bash
# Render build script — installs yt-dlp and ffmpeg before Next.js build
set -e

echo "==> Installing system dependencies..."

# Install ffmpeg
if ! command -v ffmpeg &> /dev/null; then
  apt-get update -qq && apt-get install -y -qq ffmpeg
fi
echo "FFmpeg: $(ffmpeg -version 2>&1 | head -1)"

# Install yt-dlp latest binary
if ! command -v yt-dlp &> /dev/null; then
  curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp
  chmod a+rx /usr/local/bin/yt-dlp
fi
echo "yt-dlp: $(yt-dlp --version)"

# Create temp directory
mkdir -p .tmp_downloads

echo "==> Building Next.js..."
npm install
npm run build
echo "==> Build complete!"
