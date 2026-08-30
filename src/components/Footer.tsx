'use client';

import React from 'react';
import Link from 'next/link';
import { Download, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07080d] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#0d0f18] rounded-[7px] flex items-center justify-center">
                  <Download className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Downly
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Download your media, your way. High-speed, ad-free media converter and downloader for public YouTube videos, Shorts, and Instagram Reels.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#downloader" className="hover:text-cyan-400 transition-colors">
                  Media Downloader
                </a>
              </li>
              <li>
                <a href="#platforms" className="hover:text-cyan-400 transition-colors">
                  Supported Platforms
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
                  Workflow Guide
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">
                  Core Features
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  FAQ & Help
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Security & Engine
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Zero Permanent Storage</span>
              </li>
              <li className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>FFmpeg Transcoder</span>
              </li>
              <li className="text-slate-400">
                <span>Auto-Purge within 30 mins</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 mb-8 text-[11px] text-slate-400 leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-slate-300 mb-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Legal Disclaimer & Responsible Use Notice</span>
          </div>
          <p>
            This service is intended strictly for downloading public content that you have the legal right or explicit permission to download. Users are solely responsible for complying with applicable copyright laws and platform terms of service. Private, login-gated, or DRM-protected content is not supported.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Downly. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Built with precision & high performance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
