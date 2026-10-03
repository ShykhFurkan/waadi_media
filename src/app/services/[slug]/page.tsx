import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicesData, getServiceBySlug } from '@/data/services';
import { getPriceItemsByService, formatINR } from '@/data/pricing';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found - Waadi Media' };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const priceItems = getPriceItemsByService(slug);

  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-5xl mx-auto">
      <Link href="/services" className="text-sm text-blue hover:text-blue-deep mb-8 inline-block">
        ← Back to all services
      </Link>

      <div className="mb-12">
        <span className="inline-block px-3 py-1 bg-blue-tint text-blue text-xs font-semibold rounded-full mb-4">
          Starting from {formatINR(service.startingPrice)}
        </span>
        <h1 className="text-h1 text-ink mb-6">{service.h1}</h1>
        <p className="text-lead text-graphite max-w-3xl mb-8">{service.intro}</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/contact?service=${service.slug}`}
            className="px-7 py-3.5 bg-blue text-white rounded-full font-medium shadow-floating hover:bg-blue-deep transition-colors"
          >
            Get a quote
          </Link>
          <Link
            href="/book-a-call"
            className="px-7 py-3.5 border-1.5 border-ink text-ink rounded-full font-medium hover:bg-paper transition-colors"
          >
            Book a free call
          </Link>
        </div>
      </div>

      {/* What's included */}
      <section className="mb-12 p-8 bg-paper border border-line rounded-3xl">
        <h2 className="text-h3 text-ink mb-6">What&apos;s included</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.included.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm">
              <span className="text-blue font-bold">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Price items */}
      {priceItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-h3 text-ink mb-4">Pricing breakdown</h2>
          <div className="border-t border-line">
            {priceItems.map((item) => (
              <div key={item.id} className="py-4 border-b border-line flex items-center justify-between">
                <div>
                  <span className="font-medium text-ink">{item.label}</span>
                  {item.note && <p className="text-xs text-mist mt-0.5">{item.note}</p>}
                </div>
                <span className="text-price text-blue whitespace-nowrap">
                  {formatINR(item.price)} <span className="text-xs text-mist font-normal">({item.unit})</span>
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-mist mt-3">
            Final price depends on your project. Get an exact quote after a free call.
          </p>
        </section>
      )}
    </div>
  );
}
