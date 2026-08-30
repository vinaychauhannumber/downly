'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What platforms are supported?',
      a: 'Downly currently supports publicly accessible YouTube videos, YouTube Shorts, and public Instagram Reels. Content must be publicly accessible without requiring authentication or login.',
    },
    {
      q: 'Can I download 1080p Full HD videos?',
      a: 'Yes! If 1080p is available for the source stream, Downly dynamically exposes the 1080p option and merges the high-resolution video and audio streams seamlessly.',
    },
    {
      q: 'Can I convert and extract videos to MP3?',
      a: 'Yes, for supported public media where audio extraction is permitted, you can choose MP3 with bitrates ranging from 128 kbps up to 320 kbps studio quality.',
    },
    {
      q: 'Are private or login-restricted videos supported?',
      a: 'No. Downly strictly complies with platform access controls and does not support private profiles, DRM-protected videos, or content behind login paywalls.',
    },
    {
      q: 'Where are my downloads stored and how long are they kept?',
      a: 'Media is processed on isolated temporary storage and is automatically deleted by our garbage collector within 30 minutes. We do not store permanent user files or track your downloads.',
    },
    {
      q: 'How does Downly prevent rate limits and abuse?',
      a: 'We implement intelligent sliding-window rate limiting, SSRF domain verification, and sandboxed job queues to ensure maximum uptime and security for all users.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 max-w-4xl mx-auto px-4" id="faq">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Have questions about supported platforms, media formats, or security?
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 flex items-center justify-between text-left text-base font-semibold text-white hover:text-cyan-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 ml-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
