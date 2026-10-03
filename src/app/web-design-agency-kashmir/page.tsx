import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { locationsData } from '@/data/locations';

const data = locationsData['web-design-agency-kashmir'];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
};

export default function KashmirLocalPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-4xl mx-auto">
      <h1 className="text-h1 mb-6 text-ink">{data.h1}</h1>
      <p className="text-lead text-mist mb-8">{data.openingCopy}</p>

      <div className="space-y-6 text-body mb-12">
        {data.introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-h2 text-ink mb-6">Why a local agency matters in Kashmir</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.whyLocalMatters.map((item, i) => (
            <div key={i} className="p-6 bg-paper border border-line rounded-2xl">
              <h3 className="text-h3 text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-graphite">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="p-8 bg-paper border border-line rounded-3xl text-center">
        <h3 className="text-h3 text-ink mb-2">Ready to grow your Kashmiri business?</h3>
        <p className="text-mist mb-6">First call is completely free with no obligation.</p>
        <Link
          href="/book-a-call"
          className="inline-block px-7 py-3.5 bg-blue text-white rounded-full font-medium shadow-floating hover:bg-blue-deep transition-colors"
        >
          Book a free call
        </Link>
      </div>
    </div>
  );
}
