import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Book a Free Call - Waadi Media',
  description:
    'Pick a time for a free 20-minute call. Tell us about your business and we will suggest the right next step.',
};

export default function BookACallPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-4xl mx-auto">
      <h1 className="text-h1 mb-4 text-ink">Book a free call</h1>
      <p className="text-lead text-mist mb-8">
        20 minutes, no pressure. Tell us about your business and we&apos;ll suggest the right next step.
      </p>

      <div className="p-8 bg-paper border border-line rounded-3xl mb-8">
        <p className="text-sm text-graphite mb-4">
          Online scheduler connection: <span className="font-mono text-xs bg-snow px-2 py-1 rounded">{siteConfig.calLink}</span>
        </p>
        <div className="border border-dashed border-line rounded-2xl p-12 text-center text-mist">
          [Cal.com inline embed container]
        </div>
      </div>

      <div className="text-center text-sm text-mist">
        Prefer to talk now?{' '}
        <a href={`tel:${siteConfig.contact.tel}`} className="text-blue font-medium underline">
          Call us directly
        </a>{' '}
        or{' '}
        <a href={siteConfig.contact.whatsappLink} className="text-[#25D366] font-medium underline">
          Message on WhatsApp
        </a>
      </div>
    </div>
  );
}
