import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { formatINR } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Digital Services in Kashmir - Waadi Media',
  description:
    'Website design, e-commerce, SEO, branding, ads, social media, software and automation from a Kashmir agency. See starting prices.',
};

export default function ServicesOverviewPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-5xl mx-auto">
      <h1 className="text-h1 mb-4 text-ink">Digital services for Kashmir&apos;s businesses</h1>
      <p className="text-lead text-mist mb-12">
        One team for your website, brand, marketing and software. Start with what you need today and add more as you grow.
      </p>

      <div className="border-t border-line">
        {servicesData.map((service) => (
          <div key={service.slug} className="py-6 border-b border-line flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-h3 text-ink mb-1">{service.name}</h2>
              <p className="text-sm text-mist max-w-xl">{service.shortLine}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-price text-blue whitespace-nowrap">From {formatINR(service.startingPrice)}</span>
              <Link
                href={`/services/${service.slug}`}
                className="text-sm font-medium text-blue hover:text-blue-deep"
              >
                View service
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
