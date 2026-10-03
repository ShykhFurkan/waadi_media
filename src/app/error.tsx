'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Ridgeline } from '@/components/illustrations/Ridgeline';
import { trackEvent } from '@/lib/analytics';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error message cleanly without sensitive data
    console.error('Application Error:', error.message);
  }, [error]);

  return (
    <div className="w-full min-h-[85vh] bg-snow text-graphite flex flex-col justify-between relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10 py-16 md:py-24">
        <div className="max-w-lg space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue block">
            Notice
          </span>
          <h1 className="text-display text-ink">
            Something went wrong.
          </h1>
          <p className="text-lead text-mist">
            We ran into an unexpected error loading this page. You can try refreshing, or reach out to us directly:
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              type="button"
              className="px-6 py-2.5 bg-blue text-white rounded-full text-sm font-medium hover:bg-blue-deep transition-colors shadow-sm"
            >
              Try again
            </button>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({
                  name: 'click_whatsapp',
                  params: { location: 'error_page' },
                })
              }
              className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue hover:text-blue transition-colors shadow-sm"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.contact.tel}`}
              onClick={() =>
                trackEvent({
                  name: 'click_call',
                  params: { location: 'error_page', phone: siteConfig.contact.tel },
                })
              }
              className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue hover:text-blue transition-colors shadow-sm"
            >
              Call us
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue hover:text-blue transition-colors shadow-sm"
            >
              Contact form
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full pointer-events-none opacity-85">
        <Ridgeline variant="divider" />
      </div>
    </div>
  );
}
