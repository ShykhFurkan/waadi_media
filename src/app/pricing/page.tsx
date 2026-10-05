import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PackagesSection, PriceListSection } from './PricingClientSections';
import { PricingCalculator } from '@/components/calculator/PricingCalculator';
import { Accordion } from '@/components/ui/Accordion';
import { CtaBandSection } from '@/components/sections/CtaBandSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { mainFaqs } from '@/data/faqs';
import { getFaqPageSchema, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Pricing: Websites, SEO, Ads and Branding - Waadi Media',
  description:
    'See our starting prices, compare packages and estimate your project with our calculator. No hidden costs.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing: Websites, SEO, Ads and Branding - Waadi Media',
    description:
      'See our starting prices, compare packages and estimate your project with our calculator. No hidden costs.',
    url: '/pricing',
  },
};

export default function PricingPage() {
  // Pricing FAQs filtered from mainFaqs
  const pricingFaqs = mainFaqs.filter(
    (f) => f.category === 'pricing' || f.id === 'timeline' || f.id === 'ownership'
  );

  const cleanPricingFaqs = pricingFaqs.map((f) => ({
    id: f.id,
    question: f.question.replace(/\[CONFIRM\]/g, '').trim(),
    answer: f.answer.replace(/\[CONFIRM\]/g, '').trim(),
  }));

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' },
  ];

  const whatAffectsThePrice = [
    {
      title: 'Number of pages and templates',
      text: 'A concise 3-page landing page takes less time than a 15-page structure with multiple service and location landing pages.',
    },
    {
      title: 'Custom engineering features',
      text: 'Custom booking engines, e-commerce checkouts, WhatsApp automated notifications, or candidate portals require specialized backend development.',
    },
    {
      title: 'How much content you already have',
      text: 'If your brand copy, high-resolution photography, and logo files are ready, we can launch faster and with less research overhead.',
    },
    {
      title: 'How fast you need it delivered',
      text: 'Standard delivery takes 2 to 3 weeks. Urgent turnarounds requiring dedicated priority sprints may affect project pricing.',
    },
    {
      title: 'How long we support you after launch',
      text: 'All builds include 1 month of complimentary handover support. Continued monthly maintenance plans are available from ₹1,500/month.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-snow text-graphite pt-32 pb-0">
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={getFaqPageSchema(cleanPricingFaqs)} />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-24">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-mist">
            <Link href="/" className="hover:text-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink font-medium">Pricing</span>
          </nav>
          <h1 className="text-h1 text-ink">
            Prices you can see before you call
          </h1>
          <p className="text-lead text-mist">
            These are starting prices. Your final quote depends on what you need, and we tell you exactly what it will be after a free call. No hidden costs.
          </p>
        </div>

        {/* Section A: Packages Preview */}
        <section id="packages">
          <PackagesSection />
        </section>

        {/* Section B: Complete Price List */}
        <section id="price-list">
          <PriceListSection />
        </section>

        {/* Section C: Pricing Calculator */}
        <section id="calculator" className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
              Section C
            </span>
            <h2 className="text-h2 text-ink">
              Project cost estimator
            </h2>
            <p className="text-lead text-mist mt-1">
              Select what your business needs to estimate your starting investment.
            </p>
          </div>

          <PricingCalculator />
        </section>

        {/* Section D: What affects the price */}
        <section className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
              Section D
            </span>
            <h2 className="text-h2 text-ink">
              What affects the price
            </h2>
            <p className="text-lead text-mist mt-1">
              Every project is scoped individually based on these key factors.
            </p>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {whatAffectsThePrice.map((item, idx) => (
              <div key={idx} className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-3">
                <h3 className="text-lg font-sans font-semibold text-ink md:w-1/3">
                  {item.title}
                </h3>
                <p className="text-body text-graphite md:w-2/3">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section E: FAQ */}
        <section className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
              Section E
            </span>
            <h2 className="text-h2 text-ink">
              Pricing questions answered
            </h2>
          </div>

          <div className="p-8 bg-paper border border-line rounded-3xl max-w-3xl">
            <Accordion items={cleanPricingFaqs} />
          </div>
        </section>
      </div>

      {/* Section F: Final CTA Band */}
      <div className="mt-24">
        <CtaBandSection />
      </div>
    </div>
  );
}
