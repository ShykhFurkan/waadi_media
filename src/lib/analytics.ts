'use client';

type CustomAnalyticsEvent =
  | { name: 'click_whatsapp'; params: { location: string; targetUrl?: string } }
  | { name: 'click_call'; params: { location: string } }
  | { name: 'click_email'; params: { location: string } }
  | { name: 'form_start'; params: { formName: string } }
  | { name: 'form_submit'; params: { formName: string; service?: string } }
  | { name: 'form_error'; params: { formName: string; error: string } }
  | { name: 'book_call_view'; params?: Record<string, unknown> }
  | { name: 'book_call_scheduled'; params?: Record<string, unknown> }
  | { name: 'calculator_used'; params?: { selectedCount: number } }
  | { name: 'calculator_cta_click'; params: { action: 'whatsapp' | 'quote' | 'call'; totalOneTime: number; totalMonthly: number } }
  | { name: 'cta_click'; params: { label: string; location: string } }
  | { name: 'outbound_click'; params: { url: string; label: string } }
  | { name: 'blog_read_75'; params: { slug: string; title: string } };

export function trackEvent(event: CustomAnalyticsEvent) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('event', event.name, event.params || {});
  }
}
