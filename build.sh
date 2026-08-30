#!/usr/bin/env bash
# Render build script — installs yt-dlp to project directory before Next.js build
set -e

echo "==> Setting up local project binaries..."

# Create project-local bin directory
mkdir -p bin
mkdir -p .tmp_downloads

# Download yt-dlp standalone binary into local bin folder
echo "==> Downloading yt-dlp binary..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ./bin/yt-dlp
chmod +x ./bin/yt-dlp

# Verify yt-dlp
export PATH="$(pwd)/bin:$PATH"
echo "yt-dlp version: $(./bin/yt-dlp --version)"

# Check FFmpeg (available in Render or via @ffmpeg-installer npm package)
if command -v ffmpeg &> /dev/null; then
  echo "System FFmpeg: $(ffmpeg -version 2>&1 | head -n 1)"
else
  echo "Using bundled FFmpeg from npm packages"
fi

echo "==> Installing npm dependencies & building Next.js..."
npm install
npm run build

echo "==> Build completed successfully!"
