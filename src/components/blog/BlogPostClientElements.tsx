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
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopyLink}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line text-xs font-medium text-graphite hover:border-blue hover:text-blue transition-colors"
        title="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-success" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-mist" />
            <span>Copy link</span>
          </>
        )}
      </button>

      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent({ name: 'click_whatsapp', params: { location: 'blog_share' } })}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line text-xs font-medium text-graphite hover:border-whatsapp hover:text-whatsapp transition-colors"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 text-whatsapp" />
        <span>Share</span>
      </a>
    </div>
  );
}
