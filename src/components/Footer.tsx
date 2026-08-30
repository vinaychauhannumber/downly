import React from 'react';
import Link from 'next/link';
import { Download, ShieldCheck, Heart } from 'lucide-react';
import { GitHubIcon } from './icons';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#06070a] text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#0d0f18] rounded-[11px] flex items-center justify-center">
                  <Download className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Downly
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Downly is an open, high-performance media transcoding utility for downloading public videos, reels, and extracting audio from supported platforms in MP4 and MP3 formats.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliant with Fair Use & Public APIs</span>
            </div>
          </div>

          {/* Column 1: Popular Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/instagram-reel-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Instagram Reel Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/instagram-video-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Instagram Video Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-video-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  YouTube Video Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-mp3-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  YouTube to MP3 (320kbps)
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-mp4-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  YouTube to MP4 Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-shorts-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  YouTube Shorts Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/video-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Universal Video Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resolutions & Audio */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Resolutions & Audio
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/youtube-1080p-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  YouTube 1080p Full HD
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-720p-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  YouTube 720p HD
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-mp3-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  MP3 320 kbps Studio Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-shorts-downloader"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Vertical 9:16 Shorts HD
                </Link>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-[11px]">
                  H.264 / AAC / MP3 LAME
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Guides & Tutorials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Guides & Tutorials
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/guides/how-to-download-instagram-reels"
                  className="hover:text-cyan-400 transition-colors"
                >
                  How to Download Reels in HD
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/how-to-download-youtube-videos-in-mp4"
                  className="hover:text-cyan-400 transition-colors"
                >
                  How to Download YouTube MP4
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/how-to-download-youtube-videos-in-1080p"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Download 1080p with Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/how-to-convert-youtube-videos-to-mp3"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Convert YouTube to MP3
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/how-to-download-youtube-shorts"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Download YouTube Shorts
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                >
                  Browse All Guides →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 pt-8 border-t border-white/10 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-400">Legal Disclaimer & Compliance Notice:</strong>{' '}
            Downly does not host, store, clone, or index copyrighted or private media on its servers. All media streams are processed on-the-fly and ephemerally purged after download. This service is intended strictly for personal archival of publicly accessible, royalty-free, or authorized media in compliance with platform terms and copyright laws.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
            <p className="text-slate-500">
              © {new Date().getFullYear()} Downly Media. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="/video-downloader" className="hover:text-white transition-colors">
                Tools
              </Link>
              <Link href="/guides" className="hover:text-white transition-colors">
                Guides
              </Link>
              <a
                href="https://github.com/vinaychauhannumber/downly"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
