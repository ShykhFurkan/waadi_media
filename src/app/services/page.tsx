import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { formatINR } from '@/data/pricing';
import { Button } from '@/components/ui/Button';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Digital Services in Kashmir - Waadi Media',
  description:
    'Website design, e-commerce, SEO, branding, ads, social media, software and automation from a Kashmir agency. See starting prices.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Digital Services in Kashmir - Waadi Media',
    description:
      'Website design, e-commerce, SEO, branding, ads, social media, software and automation from a Kashmir agency. See starting prices.',
    url: '/services',
  },
};

export default function ServicesPage() {
  const whatsappUrl = whatsappLink(defaultWhatsAppMessages.general);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ];

  return (
    <div className="w-full min-h-screen bg-snow text-graphite pt-32 pb-24">
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <nav className="flex items-center gap-2 text-xs text-mist mb-2">
            <Link href="/" className="hover:text-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink font-medium">Services</span>
          </nav>
          <h1 className="text-h1 text-ink">
            Digital services for Kashmir&apos;s businesses
          </h1>
          <p className="text-lead text-mist">
            One team for your website, brand, marketing and software. Start with what you need today and add more as you grow.
          </p>
        </div>

        {/* 8 Services as List Rows (Section 6.7, 10.2) */}
        <div className="border-t border-line">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block py-8 border-b border-line relative transition-colors focus-visible:outline-2 focus-visible:outline-blue"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <h2 className="text-h3 text-ink group-hover:text-blue transition-colors mb-1.5">
                    {service.name}
                  </h2>
                  <p className="text-sm text-mist line-clamp-2">
                    {service.shortLine}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-start md:self-auto shrink-0">
                  <span className="text-price text-graphite group-hover:text-blue tabular-numbers transition-all duration-200 group-hover:translate-x-1.5">
                    From {formatINR(service.startingPrice)}
                    {service.priceUnit === 'per month' && (
                      <span className="text-xs text-mist font-normal ml-1 font-sans">
                        /month
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Blue underline drawing on hover */}
              <div
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        {/* Not Sure Where to Start? Block */}
        <div className="p-8 sm:p-12 bg-paper border border-line rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-floating">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl font-sans font-bold text-ink">
              Not sure where to start?
            </h2>
            <p className="text-body text-mist">
              Tell us about your business goals and where you are today. We will suggest the right first step with no pressure to buy anything.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Button href="/book-a-call" variant="primary" magnetic>
              Book a free call
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans font-medium text-[16px] h-[52px] px-7 rounded-full border-[1.5px] border-ink text-ink bg-transparent hover:bg-snow transition-colors"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>

        {/* Package Teaser linking to /pricing */}
        <div className="border-t border-line pt-12 text-center space-y-4">
          <h2 className="text-h2 text-ink">
            Want a bundled package instead?
          </h2>
          <p className="text-lead text-mist max-w-xl mx-auto">
            Our fixed-price launch and growth packages bundle branding, websites, and marketing at a lower cost than buying services separately.
          </p>
          <div className="pt-2">
            <Button href="/pricing" variant="secondary">
              Compare all packages
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
