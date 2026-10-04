import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export function IndustriesSection() {
  const industries = [
    {
      name: 'Tourism & hospitality',
      desc: 'Hotels, houseboats, tour operators, and private transport.',
      href: '/work/wonder-delight-tours-travels',
      linkText: 'See Wonder Delight case study',
    },
    {
      name: 'Higher education',
      desc: 'Consultancies, institutes, international student advisories.',
      href: '/work/kaali-edge',
      linkText: 'See Kaali Edge case study',
    },
    {
      name: 'Horticulture & agriculture',
      desc: 'Apple growers, saffron producers, dry fruit exporters, cold stores.',
      href: '/services/ecommerce-websites',
      linkText: 'Explore e-commerce for sellers',
    },
    {
      name: 'Handicrafts & heritage',
      desc: 'Pashmina, artisanal carpets, wood carving, papier-mâché.',
      href: '/services/ecommerce-websites',
      linkText: 'Explore online store design',
    },
    {
      name: 'Software startups',
      desc: 'Early-stage founders building scalable web apps and platforms.',
      href: '/work/smarthire',
      linkText: 'See SmartHire software demo',
    },
  ];

  return (
    <section id="industries" className="py-24 sm:py-36 bg-snow border-t border-line">
      <Container>
        {/* Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest text-mist font-semibold block mb-3">
              Sectors
            </span>
            <h2 className="text-h2 text-ink">
              Built for Kashmir&apos;s businesses.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-lead text-graphite">
              Every industry in the valley has distinct commercial rhythms, payment patterns, and customer trust signals.
            </p>
          </div>
        </div>

        {/* Typographic List of Large Words */}
        <div className="divide-y divide-line border-y border-line">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="group py-8 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors hover:bg-pearl/40 px-2 sm:px-4 rounded-xl"
            >
              <div className="space-y-2 max-w-3xl">
                <h3 className="font-serif text-[clamp(1.75rem,3.6vw,3rem)] font-medium text-ink group-hover:text-blue transition-colors">
                  {ind.name}
                </h3>
                <p className="text-body text-graphite">
                  {ind.desc}
                </p>
              </div>

              <Link
                href={ind.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-deep whitespace-nowrap self-start lg:self-auto shrink-0 transition-colors"
              >
                <span>{ind.linkText}</span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
