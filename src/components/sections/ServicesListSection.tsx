import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { formatStartingPrice } from '@/data/pricing';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';

export function ServicesListSection() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-snow border-t border-line">
      <Container>
        {/* Asymmetric Section Header: Heading in cols 1-6, intro in 8-12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest text-mist font-semibold block mb-3">
              Capabilities
            </span>
            <h2 className="text-h2 text-ink">
              Everything your business needs online.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-start gap-4">
            <p className="text-lead text-graphite">
              Pick one service or let us handle the lot. Every project is scoped with fixed milestones and clear deliverables.
            </p>
            <Button href="/services" variant="text">
              See all services
            </Button>
          </div>
        </div>

        {/* Large Services Rows: 40 to 64px typography, hover blue-tint + saffron hairline */}
        <div className="divide-y divide-line border-y border-line">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block py-8 sm:py-10 px-4 sm:px-6 rounded-2xl relative transition-all duration-300 hover:bg-blue-tint focus-visible:outline-2 focus-visible:outline-blue"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="max-w-3xl">
                  <h3 className="font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] font-medium leading-[1.05] text-ink group-hover:text-blue transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm sm:text-base text-graphite/90 mt-2 line-clamp-1 max-w-2xl font-normal">
                    {service.shortLine}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start lg:self-auto shrink-0 mt-2 lg:mt-0">
                  <span className="text-xs uppercase tracking-widest text-mist font-medium">From</span>
                  <span className="text-price text-2xl sm:text-3xl text-ink font-medium group-hover:text-blue tabular-nums transition-colors">
                    {formatStartingPrice(service.startingPrice, service.priceUnit)}
                  </span>
                  <span className="text-mist group-hover:text-blue group-hover:translate-x-1 transition-all duration-200">
                    →
                  </span>
                </div>
              </div>

              {/* Hover draws a saffron hairline along bottom per brief */}
              <div
                className="absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 h-[1px] bg-saffron origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
