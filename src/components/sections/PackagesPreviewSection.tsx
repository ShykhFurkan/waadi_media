import React from 'react';
import Link from 'next/link';
import { packagesData } from '@/data/packages';
import { formatINR } from '@/data/pricing';
import { Button } from '@/components/ui/Button';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

export function PackagesPreviewSection() {
  // Preview shows 3 key packages per Section 10.1: Starter Launch, Business Launch, Growth
  const previewPackages = packagesData.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-snow border-t border-line">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-h2 text-ink mb-2">Clear packages, clear prices.</h2>
            <p className="text-lead text-mist">
              Fixed scopes for new businesses, growing companies and online sellers.
            </p>
          </div>
          <div>
            <Button href="/pricing" variant="text">
              Compare all packages
            </Button>
          </div>
        </div>

        {/* 3 Package Columns (Section 6.6: featured card sits 12px higher with 1.5px blue border) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center pt-3">
          {previewPackages.map((pkg) => {
            const isFeatured = pkg.popular;
            const packageWhatsAppUrl = whatsappLink(defaultWhatsAppMessages.package(pkg.name));

            return (
              <div
                key={pkg.id}
                className={`p-7 sm:p-8 bg-paper rounded-[20px] flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'border-[1.5px] border-blue shadow-floating md:-translate-y-3 z-10'
                    : 'border border-line'
                }`}
              >
                <div>
                  {isFeatured && (
                    <div className="inline-block px-3 py-1 bg-blue text-white text-xs font-semibold rounded-full mb-3 select-none">
                      Most popular
                    </div>
                  )}

                  <h3 className="text-2xl font-sans font-bold text-ink mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-mist mb-6 min-h-[32px]">
                    {pkg.forWhom}
                  </p>

                  <div className="mb-6">
                    <span className="text-xs text-mist block">Starting at</span>
                    <span className="text-price text-ink tabular-numbers">
                      {formatINR(pkg.price)}
                    </span>
                    <span className="text-xs text-mist ml-1 font-normal">
                      /{pkg.unit}
                    </span>
                  </div>

                  {/* Inclusions */}
                  <ul className="space-y-3 border-t border-line pt-6 mb-8">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="text-sm text-graphite flex items-start gap-2.5">
                        <span className="text-blue font-bold shrink-0">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-2.5">
                  <Link
                    href={`/contact?package=${pkg.id}`}
                    className={`w-full h-12 rounded-full font-medium text-sm flex items-center justify-center transition-colors ${
                      isFeatured
                        ? 'bg-blue text-white hover:bg-blue-deep'
                        : 'border-[1.5px] border-ink text-ink hover:bg-snow'
                    }`}
                  >
                    Get this package
                  </Link>
                  <a
                    href={packageWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 text-xs font-medium text-graphite hover:text-blue flex items-center justify-center transition-colors"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
