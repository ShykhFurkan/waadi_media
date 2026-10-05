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

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Quick-start Chips (min 44px height, 8px spacing per B.12) */}
      <div className="mb-8 p-5 sm:p-6 bg-paper border-[3px] border-ink rounded-[20px] shadow-hard-sm">
        <span className="text-xs uppercase tracking-wider text-ink/75 font-mono font-bold block mb-3">
          Quick start combinations
        </span>
        <div className="flex flex-wrap gap-2">
          {quickStarts.map((qs) => (
            <button
              key={qs.label}
              type="button"
              onClick={() => handleQuickStart(qs.ids)}
              className="h-11 min-h-[44px] px-4 rounded-full border-[2px] border-ink bg-white hover:bg-saffron text-sm font-bold text-ink transition-colors cursor-pointer select-none shadow-hard-sm active:translate-y-0.5"
            >
              {qs.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Single column on mobile, 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (12 cols on mobile, 8 cols on desktop): Step 1 & Step 2 */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Select services & features */}
          <div>
            <div className="mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-chinar block mb-1">
                Step 1 of 2
              </span>
              <h3 className="text-2xl font-display font-black text-ink uppercase">
                What do you need?
              </h3>
              <p className="text-sm font-medium text-ink/80 mt-1">
                Select the items relevant to your project. Starting prices shown in INR.
              </p>
            </div>

            <div className="space-y-6">
              {serviceGroups.map((group) => (
                <div key={group.slug} className="p-4 sm:p-6 bg-paper border-[3px] border-ink rounded-[20px] shadow-hard-sm">
                  <h4 className="text-base font-display font-black text-ink uppercase mb-3 pb-2 border-b-2 border-ink/20">
                    {group.serviceName}
                  </h4>
                  <div className="space-y-2.5">
                    {group.items.map((item) => {
                      const isChecked = selectedIds.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className={cn(
                            'flex items-center justify-between gap-3 p-3.5 sm:p-4 min-h-[52px] rounded-[14px] border-[2px] border-ink transition-all cursor-pointer select-none',
                            isChecked
                              ? 'bg-saffron/40 text-ink shadow-hard-sm'
                              : 'bg-white hover:bg-paper text-ink'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleItem(item.id)}
                              className="w-5 h-5 min-w-[20px] rounded border-2 border-ink accent-chinar cursor-pointer"
                            />
                            <div>
                              <span className="font-bold text-base text-ink block leading-snug">
                                {item.label}
                              </span>
                              {item.note && (
                                <span className="text-xs text-ink/75 block mt-0.5">
                                  {item.note}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-sm sm:text-base font-bold text-ink tabular-numbers font-mono block">
                              {formatINR(item.price)}
                            </span>
                            <span className="text-[11px] text-ink/75 block font-medium">
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
          <div className="p-4 sm:p-6 bg-paper border-[3px] border-ink rounded-[20px] shadow-hard-sm">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-chinar block mb-1">
              Step 2 of 2 (Optional)
            </span>
            <h3 className="text-xl font-display font-black text-ink uppercase mb-1">
              Tell us a little about your business
            </h3>
            <p className="text-sm font-medium text-ink/80 mb-4">
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
                      'h-11 min-h-[44px] px-4 rounded-full text-xs font-bold border-[2px] border-ink transition-colors cursor-pointer select-none shadow-hard-sm active:translate-y-0.5',
                      isSelected
                        ? 'bg-chinar text-white'
                        : 'bg-white text-ink hover:bg-paper'
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Summary on Desktop */}
        <div className="hidden lg:block lg:col-span-4 sticky top-28">
          <div className="p-7 bg-paper border-[3px] border-ink rounded-[24px] shadow-hard-md space-y-6">
            <div>
              <span className="text-xs uppercase font-mono font-bold text-ink/70 block mb-1">
                Estimate Summary
              </span>
              <h4 className="text-xl font-display font-black text-ink uppercase">
                Estimated starting price
              </h4>
              <p className="text-xs text-ink/75 mt-0.5">
                Your final quote comes after a free call.
              </p>
            </div>

            {/* Live Totals Region */}
            <div
              role="region"
              aria-live="polite"
              aria-atomic="true"
              className="space-y-4 border-y-2 border-ink/20 py-5"
            >
              {/* One-time total */}
              <div>
                <span className="text-xs text-ink/70 font-mono font-bold uppercase block">One-time (from)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-price text-ink tabular-numbers font-display font-bold">
                    {formatINR(estimate.oneTimeTotal)}
                  </span>
                  {estimate.appliesDiscount && (
                    <span className="text-xs line-through text-ink/60 tabular-numbers font-mono">
                      {formatINR(estimate.oneTimeSubtotal)}
                    </span>
                  )}
                </div>

                {estimate.appliesDiscount && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-saffron border border-ink text-ink text-xs font-bold shadow-hard-sm">
                    10% bundle saving (-{formatINR(estimate.bundleSaving)})
                  </span>
                )}
              </div>

              {/* Monthly total */}
              {estimate.monthlyTotal > 0 && (
                <div className="border-t-2 border-ink/20 pt-3">
                  <span className="text-xs text-ink/70 font-mono font-bold uppercase block">Monthly retainer (from)</span>
                  <span className="text-2xl font-display font-bold text-ink tabular-numbers">
                    {formatINR(estimate.monthlyTotal)}
                    <span className="text-xs font-bold text-ink/75 ml-1">/month</span>
                  </span>
                </div>
              )}
            </div>

            {/* Selected Items List with Remove Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono text-ink uppercase tracking-wider">
                  Selected items ({estimate.selectedItems.length})
                </span>
                {estimate.selectedItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIds([]);
                      updateUrl([]);
                    }}
                    className="text-xs text-chinar hover:underline font-bold"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {estimate.selectedItems.length === 0 ? (
                <p className="text-xs text-ink/60 py-3 italic">
                  Select items from the list to build an estimate.
                </p>
              ) : (
                <ul className="max-h-48 overflow-y-auto divide-y-2 divide-ink/10 pr-1 space-y-1">
                  {estimate.selectedItems.map((item) => (
                    <li
                      key={item.id}
                      className="py-1.5 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-ink font-medium truncate max-w-[190px]">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-bold font-mono text-ink tabular-numbers">
                          {formatINR(item.price)}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${item.label}`}
                          onClick={() => handleToggleItem(item.id)}
                          className="w-6 h-6 rounded-full border border-ink bg-white flex items-center justify-center text-ink hover:bg-chinar hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3 stroke-[2.5]" />
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
                className="btn-neo w-full h-12 bg-mint text-ink font-bold flex items-center justify-center gap-2 text-sm shadow-hard-sm hover:shadow-hard-md"
              >
                <MessageSquare className="w-4 h-4 stroke-[2.5]" />
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
                className="btn-neo w-full h-12 bg-saffron text-ink flex items-center justify-center text-sm font-bold shadow-hard-sm hover:shadow-hard-md"
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
                className="w-full h-11 text-xs font-bold text-ink/80 hover:text-ink hover:underline flex items-center justify-center transition-colors"
              >
                Book a free call
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Summary Bar (Requirement B.10) */}
      <div className="lg:hidden fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-30 bg-paper border-t-[3px] border-ink shadow-hard-md">
        {/* Expandable Breakdown Drawer */}
        {mobileDrawerOpen && (
          <div className="p-4 border-b-2 border-ink/20 max-h-[50vh] overflow-y-auto space-y-4 bg-paper-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
                Selected ({estimate.selectedItems.length} items)
              </span>
              <div className="flex items-center gap-3">
                {estimate.selectedItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIds([]);
                      updateUrl([]);
                    }}
                    className="min-h-[44px] flex items-center text-xs text-chinar font-bold hover:underline"
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-ink bg-white flex items-center justify-center text-ink text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            <ul className="divide-y divide-ink/15 space-y-1">
              {estimate.selectedItems.map((item) => (
                <li key={item.id} className="py-2 flex items-center justify-between gap-2 text-xs">
                  <span className="text-ink font-medium truncate max-w-[200px]">{item.label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono font-bold text-ink">{formatINR(item.price)}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${item.label}`}
                      onClick={() => handleToggleItem(item.id)}
                      className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-ink bg-white flex items-center justify-center text-ink"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile Actions: WhatsApp, Get quote, Book a call (all full-width) */}
            <div className="space-y-2 pt-2 border-t-2 border-ink/20">
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
                className="btn-neo w-full h-11 min-h-[44px] bg-mint text-ink font-bold flex items-center justify-center gap-2 text-xs shadow-hard-sm"
              >
                <MessageSquare className="w-4 h-4 stroke-[2.5]" />
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
                className="btn-neo w-full h-11 min-h-[44px] bg-saffron text-ink font-bold flex items-center justify-center text-xs shadow-hard-sm"
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
                className="btn-neo w-full h-11 min-h-[44px] bg-white text-ink font-bold flex items-center justify-center text-xs shadow-hard-sm"
              >
                Book a free call
              </Link>
            </div>
          </div>
        )}

        {/* Compact Collapsed Bar */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-display font-black text-lg text-ink tabular-numbers">
                {formatINR(estimate.oneTimeTotal)}
              </span>
              {estimate.monthlyTotal > 0 && (
                <span className="text-xs font-mono font-bold text-chinar">
                  +{formatINR(estimate.monthlyTotal)}/mo
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="min-h-[44px] flex items-center text-[11px] font-bold text-ink/75 hover:text-ink underline"
            >
              {mobileDrawerOpen ? 'Hide breakdown ▾' : `View breakdown (${estimate.selectedItems.length}) ▴`}
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={quoteContactUrl}
              className="btn-neo h-11 min-h-[44px] px-4 bg-saffron text-ink font-bold text-xs flex items-center justify-center shadow-hard-sm"
            >
              Get quote
            </Link>
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
