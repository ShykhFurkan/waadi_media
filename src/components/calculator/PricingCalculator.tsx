'use client';

import React, { useState, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { pricingItems, calculatePricingEstimate, formatINR } from '@/data/pricing';
import { servicesData } from '@/data/services';
import { siteConfig } from '@/config/site';
import { whatsappLink } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const businessTypes = [
  'Tourism and hospitality',
  'Education and consultancies',
  'Horticulture and agriculture',
  'Handicrafts and retail',
  'Startup or software',
  'Other business',
];

const quickStarts: { label: string; ids: string[] }[] = [
  {
    label: 'New business',
    ids: ['logo', 'landing', 'gbp', 'social-templates'],
  },
  {
    label: 'Online store',
    ids: ['ecommerce', 'brand-kit', 'gateway', 'analytics'],
  },
  {
    label: 'Get more customers',
    ids: ['local-seo', 'meta-ads', 'social-mgmt', 'report'],
  },
];

function CalculatorInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [hasInteracted, setHasInteracted] = useState(false);
  const [businessType, setBusinessType] = useState<string>('');

  // Read initial selection from URL query (no localStorage per PRD Section 11.5)
  const initialItemsFromUrl = searchParams.get('items')?.split(',').filter(Boolean) || [
    'business-site',
    'gbp',
  ];

  const [selectedIds, setSelectedIds] = useState<string[]>(initialItemsFromUrl);

  // Sync state to URL query params
  const updateUrl = (newIds: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newIds.length > 0) {
      params.set('items', newIds.join(','));
    } else {
      params.delete('items');
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleToggleItem = (id: string) => {
    if (!hasInteracted) {
      setHasInteracted(true);
      trackEvent({ name: 'calculator_used', params: { selectedCount: selectedIds.length + 1 } });
    }

    let nextIds: string[];
    if (selectedIds.includes(id)) {
      nextIds = selectedIds.filter((item) => item !== id);
    } else {
      nextIds = [...selectedIds, id];
    }
    setSelectedIds(nextIds);
    updateUrl(nextIds);
  };

  const handleQuickStart = (ids: string[]) => {
    if (!hasInteracted) {
      setHasInteracted(true);
      trackEvent({ name: 'calculator_used', params: { selectedCount: ids.length } });
    }
    setSelectedIds(ids);
    updateUrl(ids);
  };

  const estimate = calculatePricingEstimate(
    selectedIds,
    siteConfig.calculator.bundleDiscountRate,
    siteConfig.calculator.minItemsForDiscount
  );

  // Group pricing items by category / service
  const serviceGroups = servicesData.map((service) => {
    const items = pricingItems.filter((item) => item.serviceSlug === service.slug);
    return {
      serviceName: service.name,
      slug: service.slug,
      items,
    };
  }).filter((group) => group.items.length > 0);

  // Generate WhatsApp prefilled message
  const generateWhatsAppMessage = () => {
    const itemNames = estimate.selectedItems
      .map((i) => `• ${i.label} (${formatINR(i.price)}${i.unit === 'per month' ? '/mo' : ''})`)
      .join('\n');

    let msg = `Hi Waadi Media, I built an estimate on your website calculator:\n\n${itemNames}\n\n`;
    if (businessType) {
      msg += `Business type: ${businessType}\n`;
    }
    if (estimate.oneTimeTotal > 0) {
      msg += `Estimated one-time total: ${formatINR(estimate.oneTimeTotal)}\n`;
    }
    if (estimate.bundleSaving > 0) {
      msg += `(Includes bundle saving of ${formatINR(estimate.bundleSaving)})\n`;
    }
    if (estimate.monthlyTotal > 0) {
      msg += `Estimated monthly retainer: ${formatINR(estimate.monthlyTotal)}/month\n`;
    }
    msg += `\nCan we discuss an exact quote?`;
    return msg;
  };

  const whatsappUrl = whatsappLink(generateWhatsAppMessage());

  // Contact page URL with preselected items
  const quoteContactUrl = `/contact?items=${selectedIds.join(',')}${businessType ? `&sector=${encodeURIComponent(businessType)}` : ''}`;

  return (
    <div className="w-full">
      {/* Quick-start Chips */}
      <div className="mb-10 p-6 bg-paper border border-line rounded-2xl">
        <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-3">
          Quick start combinations
        </span>
        <div className="flex flex-wrap gap-2.5">
          {quickStarts.map((qs) => (
            <button
              key={qs.label}
              type="button"
              onClick={() => handleQuickStart(qs.ids)}
              className="px-4 py-2 rounded-full border border-line bg-snow hover:border-blue hover:text-blue text-sm font-medium text-ink transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2"
            >
              {qs.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (8 cols): Step 1 & Step 2 */}
        <div className="lg:col-span-8 space-y-12">
          {/* Step 1: Select services & features */}
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue block mb-1">
                Step 1 of 2
              </span>
              <h3 className="text-2xl font-sans font-bold text-ink">
                What do you need?
              </h3>
              <p className="text-sm text-mist mt-1">
                Select the items relevant to your project. Starting prices shown in INR.
              </p>
            </div>

            <div className="space-y-8">
              {serviceGroups.map((group) => (
                <div key={group.slug} className="p-6 bg-paper border border-line rounded-2xl">
                  <h4 className="text-base font-semibold text-ink mb-4 pb-2 border-b border-line">
                    {group.serviceName}
                  </h4>
                  <div className="space-y-3">
                    {group.items.map((item) => {
                      const isChecked = selectedIds.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className={cn(
                            'flex items-start justify-between gap-4 p-3.5 rounded-xl border transition-all cursor-pointer select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue',
                            isChecked
                              ? 'border-blue bg-blue-tint/40 text-ink'
                              : 'border-line/70 hover:border-mist/50 bg-white text-graphite'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleItem(item.id)}
                              className="mt-1 w-4 h-4 rounded text-blue border-line focus:ring-blue accent-blue cursor-pointer focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2"
                            />
                            <div>
                              <span className="font-medium text-sm text-ink block">
                                {item.label}
                              </span>
                              {item.note && (
                                <span className="text-xs text-mist block mt-0.5">
                                  {item.note}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-sm font-semibold text-ink tabular-numbers">
                              {formatINR(item.price)}
                            </span>
                            <span className="text-[11px] text-mist block font-normal">
                              {item.unit}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Business type (optional) */}
          <div className="p-6 bg-paper border border-line rounded-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue block mb-1">
              Step 2 of 2 (Optional)
            </span>
            <h3 className="text-xl font-sans font-bold text-ink mb-2">
              Tell us a little about your business
            </h3>
            <p className="text-sm text-mist mb-4">
              Helps us understand your market and industry seasons.
            </p>
            <div className="flex flex-wrap gap-2">
              {businessTypes.map((type) => {
                const isSelected = businessType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBusinessType(isSelected ? '' : type)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border cursor-pointer select-none',
                      isSelected
                        ? 'bg-blue text-white border-blue'
                        : 'bg-snow border-line text-graphite hover:text-ink hover:border-mist/60'
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Sticky Summary on Desktop */}
        <div className="lg:col-span-4 sticky top-28">
          <div className="p-7 bg-paper border border-line rounded-3xl shadow-floating space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
                Estimate Summary
              </span>
              <h4 className="text-xl font-sans font-bold text-ink">
                Estimated starting price
              </h4>
              <p className="text-xs text-mist mt-0.5">
                Your final quote comes after a free call.
              </p>
            </div>

            {/* Live Totals Region (aria-live="polite" per Section 11.5) */}
            <div
              role="region"
              aria-live="polite"
              aria-atomic="true"
              className="space-y-4 border-y border-line py-5"
            >
              {/* One-time total */}
              <div>
                <span className="text-xs text-mist block">One-time (from)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-price text-ink tabular-numbers font-display">
                    {formatINR(estimate.oneTimeTotal)}
                  </span>
                  {estimate.appliesDiscount && (
                    <span className="text-xs line-through text-mist tabular-numbers">
                      {formatINR(estimate.oneTimeSubtotal)}
                    </span>
                  )}
                </div>

                {estimate.appliesDiscount && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-blue-tint text-blue text-xs font-semibold">
                    10% bundle saving (-{formatINR(estimate.bundleSaving)})
                  </span>
                )}
              </div>

              {/* Monthly total */}
              {estimate.monthlyTotal > 0 && (
                <div className="border-t border-line/60 pt-3">
                  <span className="text-xs text-mist block">Monthly retainer (from)</span>
                  <span className="text-2xl font-display text-ink tabular-numbers">
                    {formatINR(estimate.monthlyTotal)}
                    <span className="text-xs font-normal text-mist ml-1">/month</span>
                  </span>
                </div>
              )}
            </div>

            {/* Selected Items List with Remove Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-graphite uppercase tracking-wider">
                  Selected items ({estimate.selectedItems.length})
                </span>
                {estimate.selectedItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIds([]);
                      updateUrl([]);
                    }}
                    className="text-xs text-mist hover:text-error transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {estimate.selectedItems.length === 0 ? (
                <p className="text-xs text-mist py-3 italic">
                  Select items from the list to build an estimate.
                </p>
              ) : (
                <ul className="max-h-48 overflow-y-auto divide-y divide-line/60 pr-1 space-y-1">
                  {estimate.selectedItems.map((item) => (
                    <li
                      key={item.id}
                      className="py-1.5 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-graphite truncate max-w-[190px]">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-medium text-ink tabular-numbers">
                          {formatINR(item.price)}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${item.label}`}
                          onClick={() => handleToggleItem(item.id)}
                          className="w-4 h-4 rounded flex items-center justify-center text-mist hover:text-error"
                        >
                          <X className="w-3 h-3 stroke-[2]" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions: Send on WhatsApp, Get an exact quote, Book a call */}
            <div className="space-y-2.5 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: 'calculator_cta_click',
                    params: {
                      action: 'whatsapp',
                      totalOneTime: estimate.oneTimeTotal,
                      totalMonthly: estimate.monthlyTotal,
                    },
                  })
                }
                className="w-full h-12 rounded-full bg-[#25D366] text-ink font-semibold flex items-center justify-center gap-2 text-sm hover:opacity-95 transition-opacity"
              >
                <MessageSquare className="w-4 h-4 stroke-[1.5]" />
                <span>Send on WhatsApp</span>
              </a>

              <Link
                href={quoteContactUrl}
                onClick={() =>
                  trackEvent({
                    name: 'calculator_cta_click',
                    params: {
                      action: 'quote',
                      totalOneTime: estimate.oneTimeTotal,
                      totalMonthly: estimate.monthlyTotal,
                    },
                  })
                }
                className="w-full h-12 rounded-full border-[1.5px] border-ink text-ink flex items-center justify-center text-sm font-medium hover:bg-snow transition-colors"
              >
                Get an exact quote
              </Link>

              <Link
                href="/book-a-call"
                onClick={() =>
                  trackEvent({
                    name: 'calculator_cta_click',
                    params: {
                      action: 'call',
                      totalOneTime: estimate.oneTimeTotal,
                      totalMonthly: estimate.monthlyTotal,
                    },
                  })
                }
                className="w-full h-10 text-xs font-medium text-graphite hover:text-blue flex items-center justify-center transition-colors"
              >
                Book a free call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingCalculator() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-mist bg-paper border border-line rounded-3xl">
          Loading pricing calculator...
        </div>
      }
    >
      <CalculatorInner />
    </Suspense>
  );
}
