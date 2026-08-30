'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, Menu, X, ChevronDown, BookOpen } from 'lucide-react';
import { GitHubIcon } from './icons';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0d0f18] rounded-[11px] flex items-center justify-center">
                <Download className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Downly
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Fast HD
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Downloader
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                type="button"
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1 py-2"
              >
                <span>Tools</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 p-3 rounded-2xl bg-[#0e121d] border border-white/10 shadow-2xl space-y-1 animate-fadeIn">
                  <Link
                    href="/instagram-reel-downloader"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                  >
                    Instagram Reel Downloader
                  </Link>
                  <Link
                    href="/youtube-video-downloader"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                  >
                    YouTube Video Downloader
                  </Link>
                  <Link
                    href="/youtube-mp3-downloader"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                  >
                    YouTube to MP3 (320kbps)
                  </Link>
                  <Link
                    href="/youtube-shorts-downloader"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                  >
                    YouTube Shorts Downloader
                  </Link>
                  <Link
                    href="/youtube-1080p-downloader"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                  >
                    YouTube 1080p Downloader
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/instagram-reel-downloader"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Instagram
            </Link>

            <Link
              href="/youtube-video-downloader"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              YouTube
            </Link>

            <Link
              href="/youtube-mp3-downloader"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              MP3 Audio
            </Link>

            <Link
              href="/guides"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guides</span>
            </Link>
          </nav>

          {/* Right Action & Status */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Media Engine Online</span>
            </div>

            <a
              href="https://github.com/vinaychauhannumber/downly"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="GitHub Repository"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d0f18]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Media Engine Online</span>
          </div>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
          >
            Downloader
          </Link>

          <Link
            href="/instagram-reel-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
          >
            Instagram Reel Downloader
          </Link>

          <Link
            href="/youtube-video-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
          >
            YouTube Video Downloader
          </Link>

          <Link
            href="/youtube-mp3-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
          >
            YouTube to MP3 Converter
          </Link>

          <Link
            href="/guides"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
          >
            Guides & Tutorials
          </Link>

          <div className="pt-2 border-t border-white/10">
            <a
              href="https://github.com/vinaychauhannumber/downly"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-sm font-medium"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>View Source on GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
