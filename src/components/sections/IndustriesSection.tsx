import React from 'react';
import Link from 'next/link';

export function IndustriesSection() {
  const industries = [
    {
      name: 'Tourism and hospitality',
      desc: 'Hotels, houseboats, tour operators and cab services.',
      href: '/work/wonder-delight-tours-travels',
      linkText: 'See Wonder Delight case study',
    },
    {
      name: 'Education',
      desc: 'Consultancies, schools, academies and coaching institutes.',
      href: '/work/kaali-edge',
      linkText: 'See Kaali Edge case study',
    },
    {
      name: 'Horticulture and agriculture',
      desc: 'Apple growers, saffron and dry fruit sellers, cold stores.',
      href: '/services/ecommerce-websites',
      linkText: 'Explore e-commerce for sellers',
    },
    {
      name: 'Handicrafts and retail',
      desc: 'Pashmina, carpets, wood carving, papier-mâché and local shops.',
      href: '/services/ecommerce-websites',
      linkText: 'Explore online store design',
    },
    {
      name: 'Startups',
      desc: 'Early-stage founders building web applications or tech products in J&K.',
      href: '/work/smarthire',
      linkText: 'See SmartHire software demo',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-snow border-t border-line">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <h2 className="text-h2 text-ink">Built for Kashmir&apos;s businesses.</h2>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-sans font-semibold text-ink mb-1">
                  {ind.name}
                </h3>
                <p className="text-sm text-graphite">
                  {ind.desc}
                </p>
              </div>

              <Link
                href={ind.href}
                className="text-sm font-medium text-blue hover:text-blue-deep whitespace-nowrap self-start md:self-auto"
              >
                {ind.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
