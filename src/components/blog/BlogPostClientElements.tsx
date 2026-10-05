'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Check, MessageCircle, Copy } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function ReadingProgressBar({ slug = '', title = '' }: { slug?: string; title?: string }) {
  const [progress, setProgress] = useState(0);
  const firedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const percent = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setProgress(percent);

      if (percent >= 75 && !firedRef.current) {
        firedRef.current = true;
        trackEvent({
          name: 'blog_read_75',
          params: { slug, title },
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, title]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-blue transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ShareButtons({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Read "${title}" by Waadi Media: ${url}`
  )}`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={handleCopyLink}
        type="button"
        className="inline-flex items-center gap-2 px-4 h-11 min-h-[44px] rounded-full border-[2px] border-ink bg-white text-xs font-bold text-ink hover:bg-paper transition-colors shadow-hard-sm active:translate-y-0.5"
        title="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-mint stroke-[2.5]" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-ink stroke-[2.5]" />
            <span>Copy link</span>
          </>
        )}
      </button>

      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent({ name: 'click_whatsapp', params: { location: 'blog_share' } })}
        className="inline-flex items-center gap-2 px-4 h-11 min-h-[44px] rounded-full border-[2px] border-ink bg-mint text-xs font-bold text-ink hover:opacity-90 transition-opacity shadow-hard-sm active:translate-y-0.5"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 stroke-[2.5]" />
        <span>Share</span>
      </a>
    </div>
  );
}
