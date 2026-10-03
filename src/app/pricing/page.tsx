import React from 'react';
import type { Metadata } from 'next';
import { packagesData, packageDisclaimers } from '@/data/packages';
import { pricingItems, formatINR } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Pricing: Websites, SEO, Ads and Branding - Waadi Media',
  description:
    'See our starting prices, compare packages and estimate your project with our calculator. No hidden costs.',
};

export default function PricingPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-5xl mx-auto">
      <h1 className="text-h1 mb-4 text-ink">Prices you can see before you call</h1>
      <p className="text-lead text-mist mb-12">
        These are starting prices. Your final quote depends on what you need, and we tell you exactly what it will be after a free call. No hidden costs.
      </p>

      {/* Packages Preview */}
      <section className="mb-16">
        <h2 className="text-h2 text-ink mb-6">Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 bg-paper border rounded-2xl flex flex-col justify-between ${
                pkg.popular ? 'border-blue shadow-floating' : 'border-line'
              }`}
            >
              <div>
                {pkg.popular && (
                  <span className="text-xs uppercase tracking-wider text-blue font-semibold block mb-2">
                    Most Popular
                  </span>
                )}
                <h3 className="text-h3 text-ink mb-1">{pkg.name}</h3>
                <p className="text-xs text-mist mb-4">{pkg.forWhom}</p>
                <div className="text-price text-ink mb-6">
                  {formatINR(pkg.price)}{pkg.plus ? '+' : ''}{' '}
                  <span className="text-xs font-normal text-mist">/{pkg.unit}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((inc, i) => (
                    <li key={i} className="text-xs text-graphite flex items-center gap-2">
                      <span className="text-blue">✓</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-xs text-mist space-y-1">
          {packageDisclaimers.map((d, i) => (
            <p key={i}>• {d}</p>
          ))}
        </div>
      </section>

      {/* Full Price List */}
      <section className="mb-16">
        <h2 className="text-h2 text-ink mb-6">Price list</h2>
        <div className="border-t border-line">
          {pricingItems.map((item) => (
            <div key={item.id} className="py-4 border-b border-line flex items-center justify-between">
              <div>
                <span className="font-medium text-ink">{item.label}</span>
                {item.note && <p className="text-xs text-mist mt-0.5">{item.note}</p>}
              </div>
              <span className="text-price text-blue whitespace-nowrap">
                {formatINR(item.price)} <span className="text-xs text-mist font-normal">({item.unit})</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
