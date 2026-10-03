'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { GoogleAnalytics } from '@next/third-parties/google';
import { getAnalyticsConsent, setAnalyticsConsent } from '@/lib/analytics';

interface CookieNoticeProps {
  gaId?: string;
}

function subscribe(callback: () => void) {
  window.addEventListener('waadi-consent-change', callback);
  return () => window.removeEventListener('waadi-consent-change', callback);
}

function getSnapshot() {
  return getAnalyticsConsent();
}

function getServerSnapshot() {
  return null;
}

export function CookieNotice({ gaId }: CookieNoticeProps) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleAccept = () => {
    setAnalyticsConsent('granted');
  };

  const handleDecline = () => {
    setAnalyticsConsent('denied');
  };

  // If consent has already been chosen, or during SSR, don't show the banner
  const showBanner = typeof window !== 'undefined' && consent === null;

  return (
    <>
      {/* Load GA4 only if consent is granted and gaId exists */}
      {consent === 'granted' && gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Show notice only if user hasn't made a choice yet */}
      {showBanner && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 z-50 max-w-sm p-4 sm:p-5 bg-paper border border-line rounded-2xl shadow-floating text-graphite space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <p className="text-xs leading-relaxed text-graphite">
            We use analytics to improve this site. No ads, no tracking across other sites.{' '}
            <Link href="/privacy" className="text-blue underline hover:text-blue-deep transition-colors">
              Privacy policy
            </Link>
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              type="button"
              className="px-4 py-1.5 bg-blue text-white rounded-full text-xs font-medium hover:bg-blue-deep transition-colors focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              type="button"
              className="px-4 py-1.5 bg-snow border border-line text-graphite rounded-full text-xs font-medium hover:bg-line/40 transition-colors focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
