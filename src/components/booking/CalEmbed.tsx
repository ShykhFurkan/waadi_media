'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/config/site';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export function CalEmbed() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || siteConfig.calLink;
  const isUnconfigured = !calLink || calLink.includes('your-username') || calLink === '';
  const [loadFailed, setLoadFailed] = useState(isUnconfigured);
  const [isLoading, setIsLoading] = useState(!isUnconfigured);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent({ name: 'book_call_view' });

    if (isUnconfigured) {
      return;
    }

    let isCancelled = false;
    const timeout = setTimeout(() => {
      if (!isCancelled && isLoading) {
        setLoadFailed(true);
        setIsLoading(false);
      }
    }, 8000);

    const initCal = async () => {
      try {
        const win = window as unknown as {
          Cal?: {
            (action: string, options?: unknown): void;
            loaded?: boolean;
            ns?: Record<string, unknown>;
            q?: unknown[];
          };
          document: Document;
        };

        if (!win.Cal) {
          (function (C: typeof win, A: string, L: string) {
            const p = function (a: { q?: unknown[] }, ar: unknown) {
              if (!a.q) a.q = [];
              a.q.push(ar);
            };
            const d = C.document;
            C.Cal = C.Cal || function (...args: unknown[]) {
              const cal = C.Cal as unknown as { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };
              if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                const s = d.createElement('script');
                s.src = A;
                s.async = true;
                s.onerror = () => {
                  if (!isCancelled) {
                    setLoadFailed(true);
                    setIsLoading(false);
                  }
                };
                d.head.appendChild(s);
                cal.loaded = true;
              }
              if (args[0] === L) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const api: any = function (...innerArgs: unknown[]) {
                  p(api, innerArgs);
                };
                const namespace = args[1];
                api.q = api.q || [];
                if (typeof namespace === 'string') {
                  cal.ns = cal.ns || {};
                  cal.ns[namespace] = api;
                  p(api, args);
                } else {
                  p(cal, args);
                }
                return;
              }
              p(cal, args);
            };
          })(win, 'https://app.cal.com/embed/embed.js', 'init');
        }

        const CalInstance = win.Cal;
        if (CalInstance) {
          CalInstance('init', { origin: 'https://app.cal.com' });
          CalInstance('inline', {
            elementOrSelector: '#cal-inline-embed',
            calLink: calLink,
            layout: 'month_view',
          });
          CalInstance('ui', {
            theme: 'light',
            styles: { branding: { brandColor: '#0057FF' } },
            hideEventTypeDetails: false,
          });
          CalInstance('on', {
            action: 'bookingSuccessful',
            callback: () => {
              trackEvent({ name: 'book_call_scheduled' });
            },
          });
          if (!isCancelled) {
            clearTimeout(timeout);
            setIsLoading(false);
          }
        }
      } catch {
        if (!isCancelled) {
          clearTimeout(timeout);
          setLoadFailed(true);
          setIsLoading(false);
        }
      }
    };

    initCal();

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [calLink, isLoading, isUnconfigured]);

  if (loadFailed) {
    return (
      <div className="p-8 sm:p-12 bg-paper border border-line rounded-3xl text-center space-y-6 shadow-floating">
        <div className="max-w-md mx-auto">
          <h2 className="text-h2 text-ink mb-2">Let&apos;s talk directly</h2>
          <p className="text-lead text-mist">
            Online calendar booking is currently updating. You can connect with us directly via phone, WhatsApp or our contact form.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
          <a
            href={`tel:${siteConfig.contact.tel}`}
            className="p-5 bg-snow hover:bg-blue-tint/50 border border-line hover:border-blue rounded-2xl flex flex-col items-center text-center transition-colors group"
          >
            <Phone className="w-6 h-6 text-blue mb-2 group-hover:scale-110 transition-transform" />
            <strong className="text-ink text-sm font-semibold">Call</strong>
            <span className="text-xs text-mist mt-1 tabular-numbers">{siteConfig.contact.phone}</span>
          </a>

          <a
            href={whatsappLink(defaultWhatsAppMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-snow hover:bg-whatsapp/10 border border-line hover:border-whatsapp rounded-2xl flex flex-col items-center text-center transition-colors group"
          >
            <MessageCircle className="w-6 h-6 text-whatsapp mb-2 group-hover:scale-110 transition-transform" />
            <strong className="text-ink text-sm font-semibold">WhatsApp</strong>
            <span className="text-xs text-mist mt-1">Instant chat</span>
          </a>

          <Link
            href="/contact"
            className="p-5 bg-snow hover:bg-blue-tint/50 border border-line hover:border-blue rounded-2xl flex flex-col items-center text-center transition-colors group"
          >
            <Mail className="w-6 h-6 text-blue mb-2 group-hover:scale-110 transition-transform" />
            <strong className="text-ink text-sm font-semibold">Contact form</strong>
            <span className="text-xs text-mist mt-1">Send a message</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-paper border border-line rounded-3xl overflow-hidden shadow-floating min-h-[600px] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-paper/80 z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-blue border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-mist">Loading calendar...</p>
            </div>
          </div>
        )}
        <div id="cal-inline-embed" ref={containerRef} className="w-full min-h-[600px]" />
      </div>

      <div className="text-center text-body text-mist">
        Prefer to talk now?{' '}
        <a
          href={`tel:${siteConfig.contact.tel}`}
          className="text-blue font-medium hover:underline"
        >
          Call
        </a>{' '}
        or{' '}
        <a
          href={whatsappLink(defaultWhatsAppMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-whatsapp font-medium hover:underline"
        >
          WhatsApp
        </a>{' '}
        us.
      </div>
    </div>
  );
}
