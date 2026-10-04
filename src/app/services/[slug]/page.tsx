import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { servicesData, getServiceBySlug } from '@/data/services';
import { getPriceItemsByService, formatINR, formatStartingPrice, formatItemUnitLabel } from '@/data/pricing';
import { getProjectBySlug } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import dynamic from 'next/dynamic';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

const ServiceQuoteForm = dynamic(() =>
  import('@/components/forms/ServiceQuoteForm').then((m) => m.ServiceQuoteForm)
);
import {
  getServiceSchema,
  getBreadcrumbSchema,
  getFaqPageSchema,
} from '@/lib/seo';

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
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const priceItems = getPriceItemsByService(slug);
  const proofProject = service.proofProjectSlug
    ? getProjectBySlug(service.proofProjectSlug)
    : undefined;

  // Clean FAQs by removing any [CONFIRM] tags from user-facing copy
  const cleanFaqs = service.faqs.map((f) => ({
    question: f.q.replace(/\[CONFIRM\]/g, '').trim(),
    answer: f.a.replace(/\[CONFIRM\]/g, '').trim(),
  }));

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.name, url: `/services/${service.slug}` },
  ];

  const whatsappUrl = whatsappLink(defaultWhatsAppMessages.service(service.name));

  // Related services
  const relatedServices = service.related
    .map((rSlug) => getServiceBySlug(rSlug))
    .filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-snow text-graphite pt-32 pb-24">
      {/* Structured Data Schemas */}
      <JsonLd data={getServiceSchema(service)} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={getFaqPageSchema(cleanFaqs)} />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-24">
        {/* 1. Hero Section */}
        <section className="max-w-4xl space-y-6">
          <nav className="flex items-center gap-2 text-xs text-mist">
            <Link href="/" className="hover:text-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-blue transition-colors">Services</Link>
            <span>/</span>
            <span className="text-ink font-medium">{service.name}</span>
          </nav>

          <div>
            <Badge className="mb-4">
              {formatStartingPrice(service.startingPrice, service.priceUnit).replace('From ', 'Starting from ')}
            </Badge>
            <h1 className="text-h1 text-ink mb-6">
              {service.h1}
            </h1>
            <p className="text-lead text-graphite max-w-3xl">
              {service.intro}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center font-sans font-medium text-[16px] h-[52px] px-7 rounded-full bg-blue text-white hover:bg-blue-deep transition-colors"
            >
              Get a quote
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans font-medium text-[16px] h-[52px] px-7 rounded-full border-[1.5px] border-ink text-ink bg-transparent hover:bg-paper transition-colors"
            >
              Message on WhatsApp
            </a>
          </div>
        </section>

        {/* 2. What's Included */}
        <section className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
              Deliverables
            </span>
            <h2 className="text-h2 text-ink">
              What&apos;s included
            </h2>
          </div>

          <div className="p-8 sm:p-10 bg-paper border border-line rounded-3xl">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.included.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-body">
                  <span className="w-5 h-5 rounded-full bg-blue-tint text-blue flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. How It Works */}
        <section className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
              Process
            </span>
            <h2 className="text-h2 text-ink">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="p-6 bg-paper border border-line rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-3xl text-blue font-light block mb-3">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-sans font-semibold text-ink mb-2">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-graphite leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Pricing Table from pricing.ts */}
        {priceItems.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
                Pricing Breakdown
              </span>
              <h2 className="text-h2 text-ink">
                Starting prices for {service.name}
              </h2>
            </div>

            <div className="border-t border-line bg-paper rounded-2xl border px-6">
              {priceItems.map((item) => (
                <div
                  key={item.id}
                  className="py-5 border-b border-line last:border-b-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-ink text-base">
                      {item.label}
                    </span>
                    {item.note && (
                      <p className="text-xs text-mist mt-0.5 max-w-xl">
                        {item.note}
                      </p>
                    )}
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-price text-blue tabular-numbers">
                      {formatINR(item.price)}
                    </span>
                    <span className="text-xs text-mist ml-1 font-normal font-sans">
                      {formatItemUnitLabel(item.unit)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-xs text-mist">
              <p>
                Final price depends on your project. Get an exact quote after a free call.
              </p>
              {service.slug === 'digital-advertising' && (
                <p>
                  Ad spend is paid by you directly to Google or Meta. Our fee covers the work of managing the ads.
                </p>
              )}
            </div>
          </section>
        )}

        {/* 5. Related Work Proof */}
        {proofProject && (
          <section className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
                Real Work
              </span>
              <h2 className="text-h2 text-ink">
                See this in action
              </h2>
            </div>

            <div className="p-8 sm:p-10 bg-paper border border-line rounded-3xl shadow-floating grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-line bg-snow aspect-[16/10] relative">
                <Image
                  src={proofProject.coverImage}
                  alt={`${proofProject.name} project cover`}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <Badge>{proofProject.sector}</Badge>
                <h3 className="text-h2 text-ink">{proofProject.name}</h3>
                <p className="text-body text-graphite">{proofProject.summary}</p>
                <p className="text-xs text-mist">{service.proofNote}</p>
                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href={`/work/${proofProject.slug}`}
                    className="text-sm font-medium text-blue hover:text-blue-deep transition-colors"
                  >
                    Read case study
                  </Link>
                  <a
                    href={proofProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-graphite hover:text-ink transition-colors"
                  >
                    Visit live site ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. Service FAQs */}
        {cleanFaqs.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
                Questions
              </span>
              <h2 className="text-h2 text-ink">
                Common questions about {service.name}
              </h2>
            </div>

            <div className="p-8 bg-paper border border-line rounded-3xl max-w-3xl">
              <Accordion
                items={cleanFaqs.map((f, i) => ({
                  id: `faq-${i}`,
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </div>
          </section>
        )}

        {/* 7. Related Services */}
        {relatedServices.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-h3 text-ink">
              Related services you might need
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedServices.map((rel) => {
                if (!rel) return null;
                return (
                  <Link
                    key={rel.slug}
                    href={`/services/${rel.slug}`}
                    className="p-6 bg-paper border border-line rounded-2xl hover:border-blue transition-colors group block"
                  >
                    <h3 className="text-xl font-semibold text-ink group-hover:text-blue transition-colors mb-1">
                      {rel.name}
                    </h3>
                    <p className="text-sm text-mist line-clamp-2 mb-3">
                      {rel.shortLine}
                    </p>
                    <span className="text-sm font-medium text-blue">
                      {formatStartingPrice(rel.startingPrice, rel.priceUnit)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 8. Quote Form */}
        <section>
          <ServiceQuoteForm
            serviceName={service.name}
            serviceSlug={service.slug}
          />
        </section>
      </div>
    </div>
  );
}
