'use client';

export type CustomAnalyticsEvent =
  | { name: 'click_whatsapp'; params: { location: string; targetUrl?: string } }
  | { name: 'click_call'; params: { location: string; phone?: string } }
  | { name: 'click_email'; params: { location: string; email?: string } }
  | { name: 'form_start'; params: { formName: string } }
  | { name: 'form_submit'; params: { formName: string; service?: string } }
  | { name: 'form_error'; params: { formName: string; error: string } }
  | { name: 'book_call_view'; params?: Record<string, unknown> }
  | { name: 'book_call_scheduled'; params?: Record<string, unknown> }
  | { name: 'calculator_used'; params: { selectedCount: number } }
  | { name: 'calculator_cta_click'; params: { action: 'whatsapp' | 'quote' | 'call'; totalOneTime: number; totalMonthly: number } }
  | { name: 'cta_click'; params: { label: string; location: string } }
  | { name: 'outbound_click'; params: { url: string; label: string } }
  | { name: 'blog_read_75'; params: { slug: string; title: string } };

export const CONSENT_COOKIE_NAME = 'waadi_analytics_consent';

export function getAnalyticsConsent(): 'granted' | 'denied' | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`));
  return match ? (decodeURIComponent(match[1]) as 'granted' | 'denied') : null;
}

export function setAnalyticsConsent(consent: 'granted' | 'denied') {
  if (typeof document === 'undefined') return;
  const maxAge = 365 * 24 * 60 * 60; // 1 year
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(consent)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  // Dispatch custom event for listener components
  window.dispatchEvent(new CustomEvent('waadi-consent-change', { detail: consent }));
}

export function trackEvent(event: CustomAnalyticsEvent) {
  if (typeof window === 'undefined') return;
  
  // Rule: Nothing may fire before consent
  const consent = getAnalyticsConsent();
  if (consent !== 'granted') {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (typeof win.gtag === 'function') {
    win.gtag('event', event.name, event.params || {});
  }
}
