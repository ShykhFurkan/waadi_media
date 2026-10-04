import React from 'react';
import Link from 'next/link';
import { packagesData } from '@/data/packages';
import { formatINR } from '@/data/pricing';
import { Button } from '@/components/ui/Button';
import { Sticker } from '@/components/ui/Sticker';
import { Container } from '@/components/layout/Container';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

export function PackagesPreviewSection() {
  const previewPackages = packagesData.slice(0, 3);

  return (
    <section id="packages" className="py-24 sm:py-36 bg-paper relative border-t-[3px] border-ink">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-block mb-3">
              <Sticker color="almond" rotate={-1.5} icon={<StickerIcon name="star" size={16} />}>
                Fixed Scopes
              </Sticker>
            </div>
            <h2 className="text-h2 text-ink">
              CLEAR PACKAGES, CLEAR PRICES.
            </h2>
            <p className="text-lead mt-2">
              Fixed scopes for new businesses, growing companies and online sellers.
            </p>
          </div>
          <div>
            <Button href="/pricing" variant="outline">
              Compare all packages
            </Button>
          </div>
        </div>

        {/* 3 Neo-Brutalist Package Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pt-4">
          {previewPackages.map((pkg) => {
            const isFeatured = pkg.popular;
            const packageWhatsAppUrl = whatsappLink(defaultWhatsAppMessages.package(pkg.name));

            return (
              <div
                key={pkg.id}
                className={`tile-neo p-8 sm:p-10 rounded-[20px] border-[3px] border-ink flex flex-col justify-between transition-all ${
                  isFeatured
                    ? 'bg-saffron md:-translate-y-4 shadow-hard-lg z-10'
                    : 'bg-paper-2 shadow-hard-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink/70">
                      Package
                    </span>
                    {isFeatured && (
                      <Sticker color="white" rotate={2} icon={<StickerIcon name="star" size={16} />}>
                        Most Popular
                      </Sticker>
                    )}
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-ink uppercase mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-sm font-medium text-ink/80 mb-6 min-h-[36px]">
                    {pkg.forWhom}
                  </p>

                  <div className="mb-6 pb-6 border-b-2 border-ink/20">
                    <span className="text-xs uppercase font-mono font-bold text-ink/70 block mb-1">
                      Starting at
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl sm:text-5xl font-black text-ink">
                        {formatINR(pkg.price)}
                      </span>
                      <span className="text-sm font-bold text-ink/75">
                        /{pkg.unit}
                      </span>
                    </div>
                  </div>

                  {/* Feature inclusions */}
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="text-sm font-medium text-ink flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-white border-2 border-ink flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                          ✓
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t-2 border-ink/20">
                  <Link
                    href={`/contact?package=${pkg.id}`}
                    className={`btn-neo w-full h-[52px] rounded-full font-sans font-bold text-base flex items-center justify-center transition-all ${
                      isFeatured
                        ? 'bg-ink text-white hover:bg-black'
                        : 'bg-saffron text-ink hover:bg-yellow-400'
                    }`}
                  >
                    Get this package
                  </Link>
                  <a
                    href={packageWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 text-xs font-mono font-bold uppercase tracking-wider text-ink/80 hover:text-ink hover:underline flex items-center justify-center transition-colors"
                  >
                    Ask on WhatsApp ↗
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
