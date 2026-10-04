'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Deferred client-only components — split from critical JS bundle
const FloatingActions = dynamic(
  () => import('./FloatingActions').then((m) => m.FloatingActions),
  { ssr: false }
);

const CookieNotice = dynamic(
  () => import('./CookieNotice').then((m) => m.CookieNotice),
  { ssr: false }
);

interface ClientDeferredProps {
  gaId?: string;
}

/**
 * Wraps FloatingActions and CookieNotice, deferring them until idle or user interaction.
 * Keeps critical first-load JS minimal and prevents hydration blocking.
 */
export function ClientDeferred({ gaId }: ClientDeferredProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | null = null;
    let cancelled = false;

    const activate = () => {
      if (cancelled) return;
      setReady(true);
      window.removeEventListener('scroll', activate);
      window.removeEventListener('pointerdown', activate);
      window.removeEventListener('keydown', activate);
    };

    window.addEventListener('scroll', activate, { once: true, passive: true });
    window.addEventListener('pointerdown', activate, { once: true, passive: true });
    window.addEventListener('keydown', activate, { once: true, passive: true });

    if ('requestIdleCallback' in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(activate, { timeout: 2500 });
    } else {
      setTimeout(activate, 1000);
    }

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', activate);
      window.removeEventListener('pointerdown', activate);
      window.removeEventListener('keydown', activate);
      if (idleId !== null && 'cancelIdleCallback' in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <FloatingActions />
      <CookieNotice gaId={gaId} />
    </>
  );
}
