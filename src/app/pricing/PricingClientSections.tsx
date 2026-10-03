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
                'p-8 bg-paper rounded-[20px] flex flex-col justify-between transition-all duration-300',
                isFeatured
                  ? 'border-[1.5px] border-blue shadow-floating z-10'
                  : 'border border-line'
              )}
            >
              <div>
                {isFeatured && (
                  <div className="inline-block px-3 py-1 bg-blue text-white text-xs font-semibold rounded-full mb-3 select-none">
                    Most popular
                  </div>
                )}

                <h3 className="text-2xl font-sans font-bold text-ink mb-1.5">
                  {pkg.name}
                </h3>

                <p className="text-xs text-mist mb-6 min-h-[32px]">
                  {pkg.forWhom}
                </p>

                <div className="mb-6">
                  <span className="text-xs text-mist block">Starting at</span>
                  <span className="text-price text-ink tabular-numbers font-display">
                    {formatINR(pkg.price)}{pkg.plus ? '+' : ''}
                  </span>
                  <span className="text-xs text-mist ml-1 font-normal font-sans">
                    /{pkg.unit}
                  </span>
                </div>

                <ul className="space-y-3 border-t border-line pt-6 mb-8">
                  {pkg.includes.map((inc, i) => (
                    <li key={i} className="text-sm text-graphite flex items-start gap-2.5">
                      <span className="text-blue font-bold shrink-0">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/contact?package=${pkg.id}`}
                  className={cn(
                    'w-full h-12 rounded-full font-medium text-sm flex items-center justify-center transition-colors',
                    isFeatured
                      ? 'bg-blue text-white hover:bg-blue-deep'
                      : 'border-[1.5px] border-ink text-ink hover:bg-snow'
                  )}
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

      {/* Disclaimers (No [CONFIRM] tags on screen per Rule 4) */}
      <div className="p-4 bg-snow border border-line rounded-xl text-xs text-mist space-y-1">
        <p>• Monthly packages run on a 3-month minimum so we have adequate time to test and optimize.</p>
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
        <p className="text-lead text-mist mt-1">
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

      {/* Table Rows */}
      <div className="border-t border-line bg-paper rounded-2xl border px-6 shadow-sm">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="py-5 border-b border-line last:border-b-0 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="max-w-xl">
              <span className="font-semibold text-ink text-base block">
                {item.label}
              </span>
              {item.note && (
                <p className="text-xs text-mist mt-0.5">
                  {item.note}
                </p>
              )}
            </div>

            <div className="flex items-center gap-6 self-start md:self-auto shrink-0">
              <div className="text-right">
                <span className="text-price text-blue tabular-numbers font-display">
                  {formatINR(item.price)}
                </span>
                <span className="text-xs text-mist ml-1 font-normal font-sans">
                  {formatItemUnitLabel(item.unit)}
                </span>
              </div>

              <Link
                href={`/contact?service=${item.id}`}
                className="text-xs font-semibold text-ink hover:text-blue py-1.5 px-3 rounded-full border border-line hover:border-blue transition-colors whitespace-nowrap"
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
