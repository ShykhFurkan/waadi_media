'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(
  () => import('@/components/forms/ContactForm').then((m) => m.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 bg-paper border border-line rounded-3xl min-h-[400px] animate-pulse" />
    ),
  }
);

export function ServiceQuoteForm({
  serviceName,
  serviceSlug,
}: {
  serviceName: string;
  serviceSlug: string;
}) {
  return (
    <div id="quote-form" className="space-y-4">
      <div className="max-w-xl">
        <h3 className="text-2xl font-sans font-semibold text-ink">
          Get a quote for {serviceName}
        </h3>
        <p className="text-sm text-mist mt-1">
          Tell us about your project. We reply within one business day with clear recommendations.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 bg-paper border border-line rounded-3xl min-h-[400px] animate-pulse" />}>
        <ContactForm
          initialServices={[serviceName]}
          sourcePage={`/services/${serviceSlug}`}
        />
      </Suspense>
    </div>
  );
}
