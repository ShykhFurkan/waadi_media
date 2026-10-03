export type PriceUnit = 'one-time' | 'per month';

export type PriceItem = {
  id: string;
  label: string;
  price: number;
  unit: PriceUnit;
  serviceSlug: string;
  note?: string;
};

/**
 * Format any currency value strictly adhering to Indian Rupee standard format
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * All prices in INR.
 * PRD Rule 2: Prices must exist in exactly one place (/src/data/pricing.ts).
 */
export const pricingItems: PriceItem[] = [
  {
    id: 'gbp',
    serviceSlug: 'seo',
    label: 'Google Business Profile setup',
    price: 2000,
    unit: 'one-time',
  },
  {
    id: 'social-templates',
    serviceSlug: 'brand-identity',
    label: 'Social media templates (set of 10)',
    price: 3000,
    unit: 'one-time',
  },
  {
    id: 'analytics',
    serviceSlug: 'digital-advertising',
    label: 'Analytics and conversion tracking setup',
    price: 3000,
    unit: 'one-time',
  },
  {
    id: 'report',
    serviceSlug: 'digital-advertising',
    label: 'Monthly reporting dashboard',
    price: 3000,
    unit: 'per month',
  },
  {
    id: 'logo',
    serviceSlug: 'brand-identity',
    label: 'Logo design',
    price: 3500,
    unit: 'one-time',
  },
  {
    id: 'landing',
    serviceSlug: 'website-design-development',
    label: 'Landing page',
    price: 5000,
    unit: 'one-time',
  },
  {
    id: 'seo-audit',
    serviceSlug: 'seo',
    label: 'SEO audit (technical and on-page)',
    price: 5000,
    unit: 'one-time',
  },
  {
    id: 'local-seo',
    serviceSlug: 'seo',
    label: 'Local SEO',
    price: 5000,
    unit: 'per month',
  },
  {
    id: 'pitch-deck',
    serviceSlug: 'brand-identity',
    label: 'Pitch deck design',
    price: 5000,
    unit: 'one-time',
  },
  {
    id: 'email',
    serviceSlug: 'social-media-content',
    label: 'Email marketing',
    price: 5000,
    unit: 'per month',
  },
  {
    id: 'photoshoot',
    serviceSlug: 'social-media-content',
    label: 'Product photoshoot',
    price: 5000,
    unit: 'one-time',
  },
  {
    id: 'gateway',
    serviceSlug: 'automation-ai',
    label: 'Payment gateway or API integration',
    price: 5000,
    unit: 'one-time',
  },
  {
    id: 'whatsapp-auto',
    serviceSlug: 'automation-ai',
    label: 'WhatsApp or SMS automation',
    price: 5000,
    unit: 'one-time',
  },
  {
    id: 'keywords',
    serviceSlug: 'seo',
    label: 'Keyword research and content strategy',
    price: 6000,
    unit: 'one-time',
  },
  {
    id: 'meta-ads',
    serviceSlug: 'digital-advertising',
    label: 'Meta Ads management',
    price: 8000,
    unit: 'per month',
    note: 'Ad spend is paid by you directly to Meta. Management fee covers ongoing setup and optimization.',
  },
  {
    id: 'social-mgmt',
    serviceSlug: 'social-media-content',
    label: 'Social media management (12 posts and reels)',
    price: 8000,
    unit: 'per month',
  },
  {
    id: 'video',
    serviceSlug: 'social-media-content',
    label: 'Promo or reel video',
    price: 8000,
    unit: 'one-time',
  },
  {
    id: 'google-ads',
    serviceSlug: 'digital-advertising',
    label: 'Google Ads management',
    price: 10000,
    unit: 'per month',
    note: 'Ad spend is paid by you directly to Google. Management fee covers ongoing keyword and bid optimization.',
  },
  {
    id: 'seo-retainer',
    serviceSlug: 'seo',
    label: 'Full SEO retainer',
    price: 10000,
    unit: 'per month',
  },
  {
    id: 'redesign',
    serviceSlug: 'website-design-development',
    label: 'Website redesign or speed optimization',
    price: 12000,
    unit: 'one-time',
  },
  {
    id: 'brand-kit',
    serviceSlug: 'brand-identity',
    label: 'Full brand identity kit',
    price: 15000,
    unit: 'one-time',
  },
  {
    id: 'business-site',
    serviceSlug: 'website-design-development',
    label: 'Business website (5 pages, on-page SEO)',
    price: 15000,
    unit: 'one-time',
  },
  {
    id: 'chatbot',
    serviceSlug: 'automation-ai',
    label: 'AI chatbot',
    price: 15000,
    unit: 'one-time',
  },
  {
    id: 'cms-site',
    serviceSlug: 'website-design-development',
    label: 'CMS-based website',
    price: 25000,
    unit: 'one-time',
  },
  {
    id: 'ecommerce',
    serviceSlug: 'ecommerce-websites',
    label: 'E-commerce store',
    price: 35000,
    unit: 'one-time',
  },
  {
    id: 'mobile-app',
    serviceSlug: 'custom-software-apps',
    label: 'Mobile app (Android or iOS)',
    price: 60000,
    unit: 'one-time',
  },
  {
    id: 'web-app',
    serviceSlug: 'website-design-development',
    label: 'Custom web app or portal',
    price: 75000,
    unit: 'one-time',
  },
  {
    id: 'custom-software',
    serviceSlug: 'custom-software-apps',
    label: 'Custom software (CRM, booking, ERP)',
    price: 80000,
    unit: 'one-time',
  },
  {
    id: 'maintenance',
    serviceSlug: 'website-design-development',
    label: 'Website maintenance plan',
    price: 1500,
    unit: 'per month',
  },
  {
    id: 'copywriting',
    serviceSlug: 'social-media-content',
    label: 'Copywriting (per page)',
    price: 1000,
    unit: 'one-time',
  },
];

/**
 * Get pricing items for a given service slug
 */
export function getPriceItemsByService(serviceSlug: string): PriceItem[] {
  return pricingItems.filter((item) => item.serviceSlug === serviceSlug);
}

/**
 * Calculate totals and bundle discount
 */
export function calculatePricingEstimate(
  selectedIds: string[],
  discountRate = 0.10,
  minItemsForDiscount = 3
) {
  const selected = pricingItems.filter((item) => selectedIds.includes(item.id));
  
  const oneTimeItems = selected.filter((item) => item.unit === 'one-time');
  const monthlyItems = selected.filter((item) => item.unit === 'per month');

  const oneTimeSubtotal = oneTimeItems.reduce((acc, curr) => acc + curr.price, 0);
  const monthlyTotal = monthlyItems.reduce((acc, curr) => acc + curr.price, 0);

  const appliesDiscount = oneTimeItems.length >= minItemsForDiscount;
  const bundleSaving = appliesDiscount ? Math.round(oneTimeSubtotal * discountRate) : 0;
  const oneTimeTotal = oneTimeSubtotal - bundleSaving;

  return {
    selectedItems: selected,
    oneTimeSubtotal,
    bundleSaving,
    oneTimeTotal,
    monthlyTotal,
    appliesDiscount,
  };
}
