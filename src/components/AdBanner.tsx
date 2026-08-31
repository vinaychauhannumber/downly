'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

export function AdBanner({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement',
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!adClient) return;

    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.warn('AdSense push error:', err);
    }
  }, [adClient, slot]);

  // If no AdSense Client ID is configured yet, render a subtle, clean placeholder
  if (!adClient) {
    return (
      <div
        className={`w-full max-w-4xl mx-auto my-6 px-4 ${className}`}
        aria-label={label}
      >
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-4 text-center">
          <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
            {label} Slot
          </span>
          <p className="text-xs text-slate-400 mt-1">
            Google AdSense responsive ad banner ready for your Publisher ID.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      className={`w-full max-w-4xl mx-auto my-6 overflow-hidden px-4 text-center ${className}`}
    >
      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
        {label}
      </div>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
