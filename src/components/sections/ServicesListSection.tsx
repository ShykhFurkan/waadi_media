import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { formatStartingPrice } from '@/data/pricing';
import { Button } from '@/components/ui/Button';

export function ServicesListSection() {
  return (
    <section className="py-20 md:py-28 bg-snow border-t border-line">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-h2 text-ink mb-2">Everything your business needs online.</h2>
            <p className="text-lead text-mist">Pick one service or let us handle the lot.</p>
          </div>
          <div>
            <Button href="/services" variant="text">
              See all services
            </Button>
          </div>
        </div>

        {/* Services List Rows (Section 6.7) */}
        <div className="border-t border-line">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block py-7 border-b border-line relative transition-colors focus-visible:outline-2 focus-visible:outline-blue"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <h3 className="text-h3 text-ink group-hover:text-blue transition-colors mb-1.5">
                    {service.name}
                  </h3>
                  <p className="text-sm text-mist line-clamp-2">
                    {service.shortLine}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-start md:self-auto shrink-0">
                  <span className="text-price text-graphite group-hover:text-blue tabular-numbers transition-all duration-200 group-hover:translate-x-1.5">
                    {formatStartingPrice(service.startingPrice, service.priceUnit)}
                  </span>
                </div>
              </div>

              {/* Blue underline drawing on hover per Section 6.7 */}
              <div
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
