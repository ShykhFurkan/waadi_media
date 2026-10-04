import React from 'react';
import Link from 'next/link';
import { packagesData } from '@/data/packages';
import { formatINR } from '@/data/pricing';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

export function PackagesPreviewSection() {
  const previewPackages = packagesData.slice(0, 3);

  return (
    <section id="packages" className="py-24 sm:py-36 bg-snow border-t border-line">
      <Container>
        {/* Asymmetric Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest text-mist font-semibold block mb-3">
              Fixed Scopes
            </span>
            <h2 className="text-h2 text-ink">
              Clear packages, clear prices.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-start gap-4">
            <p className="text-lead text-graphite">
              Fixed scopes for new businesses, growing companies and online sellers. Everything you need to get moving quickly.
            </p>
            <Button href="/pricing" variant="text">
              Compare all packages
            </Button>
          </div>
        </div>

        {/* 3 Package Panels with 28px rounded corners and hairline dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {previewPackages.map((pkg) => {
            const isFeatured = pkg.popular;
            const packageWhatsAppUrl = whatsappLink(defaultWhatsAppMessages.package(pkg.name));

            return (
              <div
                key={pkg.id}
                className={`p-8 sm:p-10 bg-paper rounded-[28px] border flex flex-col justify-between transition-colors ${
                  isFeatured
                    ? 'border-blue/50 shadow-sm relative'
                    : 'border-line'
                }`}
              >
                <div>
                  {isFeatured && (
                    <div className="inline-block px-3 py-1 bg-blue-tint text-blue text-xs font-semibold rounded-full mb-4">
                      Most popular
                    </div>
                  )}

                  <h3 className="font-serif text-3xl font-medium text-ink mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-sm text-mist mb-6 min-h-[36px]">
                    {pkg.forWhom}
                  </p>

                  <div className="mb-8 pb-6 border-b border-line">
                    <span className="text-xs uppercase tracking-widest text-mist block mb-1">
                      Starting at
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-price text-4xl font-medium text-ink">
                        {formatINR(pkg.price)}
                      </span>
                      <span className="text-sm text-mist font-normal">
                        /{pkg.unit}
                      </span>
                    </div>
                  </div>

                  {/* Included features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="text-sm text-graphite flex items-start gap-3">
                        <span className="text-blue font-semibold shrink-0 mt-0.5">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-line">
                  <Link
                    href={`/contact?package=${pkg.id}`}
                    className={`w-full h-[52px] rounded-full font-medium text-sm flex items-center justify-center transition-colors ${
                      isFeatured
                        ? 'bg-blue text-white hover:bg-blue-deep'
                        : 'border border-ink text-ink hover:bg-snow'
                    }`}
                  >
                    Get this package
                  </Link>
                  <a
                    href={packageWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 text-xs font-medium text-mist hover:text-blue flex items-center justify-center transition-colors"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
