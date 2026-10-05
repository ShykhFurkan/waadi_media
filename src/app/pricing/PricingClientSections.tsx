'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { packagesData } from '@/data/packages';
import { pricingItems, formatINR, formatItemUnitLabel } from '@/data/pricing';
import { servicesData } from '@/data/services';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';
import { Tabs } from '@/components/ui/Tabs';
import { cn } from '@/lib/utils';

export function PackagesSection() {
  const [filter, setFilter] = useState<'all' | 'one-time' | 'per month'>('all');

  const filteredPackages = packagesData.filter((pkg) => {
    if (filter === 'all') return true;
    return pkg.unit === filter;
  });

  return (
    <div className="space-y-8">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
            Section A
          </span>
          <h2 className="text-h2 text-ink">
            Launch and growth packages
          </h2>
          <p className="text-lead text-mist mt-1">
            Fixed scopes that give your business everything it needs at a lower cost than buying services separately.
          </p>
        </div>

        <Tabs
          tabs={[
            { id: 'all', label: 'All Packages' },
            { id: 'one-time', label: 'One-time' },
            { id: 'per month', label: 'Monthly' },
          ]}
          activeTab={filter}
          onChange={(id) => setFilter(id as 'all' | 'one-time' | 'per month')}
        />
      </div>

      {/* Package Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
        {filteredPackages.map((pkg) => {
          const isFeatured = pkg.popular;
          const packageWhatsAppUrl = whatsappLink(defaultWhatsAppMessages.package(pkg.name));

          return (
            <div
              key={pkg.id}
              className={cn(
                'p-5 sm:p-8 bg-paper rounded-[20px] border-[3px] border-ink flex flex-col justify-between transition-all duration-300',
                isFeatured
                  ? 'bg-saffron shadow-hard-md z-10'
                  : 'bg-paper-2 shadow-hard-sm sm:shadow-hard-md'
              )}
            >
              <div>
                {isFeatured && (
                  <div className="inline-block px-3 py-1 bg-white border-2 border-ink text-ink text-xs font-bold rounded-full mb-3 select-none shadow-hard-sm">
                    Most popular
                  </div>
                )}

                <h3 className="text-2xl font-sans font-bold text-ink mb-1.5">
                  {pkg.name}
                </h3>

                <p className="text-xs text-ink/75 mb-6 min-h-[32px]">
                  {pkg.forWhom}
                </p>

                <div className="mb-6">
                  <span className="text-xs text-ink/70 block">Starting at</span>
                  <span className="text-price text-ink tabular-numbers font-display font-bold">
                    {formatINR(pkg.price)}{pkg.plus ? '+' : ''}
                  </span>
                  <span className="text-xs text-ink/75 ml-1 font-normal font-sans">
                    /{pkg.unit}
                  </span>
                </div>

                <ul className="space-y-3 border-t-2 border-ink/20 pt-6 mb-8">
                  {pkg.includes.map((inc, i) => (
                    <li key={i} className="text-sm text-ink flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white border-2 border-ink flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/contact?package=${pkg.id}`}
                  className={cn(
                    'w-full h-11 sm:h-12 min-h-[44px] rounded-full font-bold text-sm flex items-center justify-center transition-colors border-[2px] border-ink shadow-hard-sm',
                    isFeatured
                      ? 'bg-ink text-white hover:bg-black'
                      : 'bg-white text-ink hover:bg-paper'
                  )}
                >
                  Get this package
                </Link>
                <a
                  href={packageWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 min-h-[44px] text-xs font-bold text-ink/80 hover:text-ink flex items-center justify-center transition-colors"
                >
                  Ask on WhatsApp ↗
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimers (No [CONFIRM] tags on screen per Rule 4) */}
      <div className="p-4 bg-paper-2 border-[2px] border-ink rounded-xl text-xs text-ink/80 space-y-1">
        <p>• Monthly packages run on a 3-month minimum.</p>
        <p>• Ad spend is paid directly by you to Google or Meta. Our fee covers strategy and management.</p>
        <p>• Packages save you money on the main services.</p>
      </div>
    </div>
  );
}

export function PriceListSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    ...servicesData.map((s) => ({ id: s.slug, label: s.name })),
  ];

  const filteredItems = pricingItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.serviceSlug === selectedCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h2 text-ink">
          Complete price list
        </h2>
        <p className="text-lead text-ink/80 mt-1">
          Every standard service item and starting cost. Transparent and published in one place.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto pb-2">
        <Tabs
          tabs={categories}
          activeTab={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* Table Rows / Stacked Cards below 640px */}
      <div className="border-[3px] border-ink bg-paper rounded-[20px] p-4 sm:p-6 shadow-hard-sm sm:shadow-hard-md divide-y-[2px] divide-ink/20">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
          >
            <div className="max-w-xl">
              <span className="font-bold text-ink text-base block font-sans">
                {item.label}
              </span>
              {item.note && (
                <p className="text-xs text-ink/75 mt-0.5">
                  {item.note}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0">
              <div className="text-left sm:text-right">
                <span className="text-price text-ink tabular-numbers font-display font-bold">
                  {formatINR(item.price)}
                </span>
                <span className="text-xs text-ink/70 ml-1 font-normal font-sans">
                  {formatItemUnitLabel(item.unit)}
                </span>
              </div>

              <Link
                href={`/contact?service=${item.id}`}
                className="h-11 min-h-[44px] px-4 rounded-full border-[2px] border-ink bg-saffron text-ink font-bold text-xs flex items-center justify-center hover:bg-yellow-400 transition-colors whitespace-nowrap shadow-hard-sm"
              >
                Get a quote
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
