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

const emptySubscribe = () => () => {};

export function CookieNotice({ gaId }: CookieNoticeProps) {
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleAccept = () => {
    setAnalyticsConsent('granted');
  };

  const handleDecline = () => {
    setAnalyticsConsent('denied');
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      {/* Load GA4 only if consent is granted and gaId exists */}
      {consent === 'granted' && gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Show notice only if user hasn't made a choice yet */}
      {consent === null && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px))] md:bottom-6 left-3 right-3 md:right-auto md:left-6 md:max-w-sm max-h-[120px] z-40 p-3 sm:p-4 bg-paper border-[3px] border-ink rounded-2xl shadow-hard-md text-ink flex flex-col justify-between animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs leading-snug text-ink font-medium">
              We use privacy-friendly analytics to improve the site.{' '}
              <Link href="/privacy" className="text-blue underline font-semibold hover:text-chinar">
                Privacy policy
              </Link>
            </p>
            <button
              onClick={handleDecline}
              type="button"
              aria-label="Dismiss notice"
              className="text-ink/70 hover:text-ink w-11 h-11 min-h-[44px] min-w-[44px] -mr-2 -mt-2 flex items-center justify-center font-bold text-lg shrink-0 cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              type="button"
              className="h-11 min-h-[44px] px-4 bg-blue text-white border-2 border-ink rounded-full text-xs font-bold shadow-hard-sm active:translate-y-0.5 transition-transform"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              type="button"
              className="h-11 min-h-[44px] px-4 bg-paper-2 text-ink border-2 border-ink rounded-full text-xs font-bold shadow-hard-sm active:translate-y-0.5 transition-transform"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
