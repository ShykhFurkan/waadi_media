import React from 'react';
import type { Metadata } from 'next';
import { CalEmbed } from '@/components/booking/CalEmbed';

export const metadata: Metadata = {
  title: 'Book a Free Call - Waadi Media',
  description:
    'Pick a time for a free 20-minute call. Tell us about your business and we will suggest the right next step.',
  alternates: {
    canonical: '/book-a-call',
  },
  openGraph: {
    title: 'Book a Free Call - Waadi Media',
    description:
      'Pick a time for a free 20-minute call. Tell us about your business and we will suggest the right next step.',
    url: '/book-a-call',
  },
};

export default function BookACallPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-h1 text-ink mb-4">
            Book a free call
          </h1>
          <p className="text-lead text-mist">
            20 minutes, no pressure. Tell us about your business and we&apos;ll suggest the right next step.
          </p>
        </div>

        <CalEmbed />
      </div>
    </div>
  );
}
