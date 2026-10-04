import { PriceUnit } from './pricing';

export type Package = {
  id: string;
  name: string;
  price: number;
  unit: PriceUnit;
  plus?: boolean;
  forWhom: string;
  includes: string[];
  popular?: boolean;
};

export const packagesData: Package[] = [
  {
    id: 'starter-launch',
    name: 'Starter Launch',
    price: 15000,
    unit: 'one-time',
    forWhom: 'A new business that needs to get online',
    includes: [
      'Logo design',
      '3 to 5 page website',
      'Basic on-page SEO',
      'Google Business Profile setup',
    ],
  },
  {
    id: 'business-launch',
    name: 'Business Launch',
    price: 35000,
    unit: 'one-time',
    popular: true,
    forWhom: 'A business that wants a proper brand and site',
    includes: [
      'Brand identity kit',
      '7-page CMS website',
      'On-page SEO',
      'Analytics and conversion tracking setup',
      '1 month of support and training',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 15000,
    unit: 'per month',
    forWhom: 'A business with a site that wants more customers',
    includes: [
      'Ongoing monthly SEO',
      'Social media management (12 posts/reels)',
      'One ad platform setup and management (Google or Meta)',
      'Monthly reporting dashboard',
    ],
  },
  {
    id: 'ecommerce-launch',
    name: 'E-commerce Launch',
    price: 60000,
    unit: 'one-time',
    forWhom: 'A seller ready to sell online',
    includes: [
      'Brand identity kit',
      'Online store with catalog and search',
      'Payment gateway and UPI integration',
      'Shipping and delivery setup',
      'Product SEO and conversion tracking',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 30000,
    unit: 'per month',
    forWhom: 'A business ready to grow across channels',
    includes: [
      'Full SEO retainer',
      'Social media management and reels',
      'Google and Meta ads management',
      'Email marketing campaigns',
      'Content copywriting',
      'Comprehensive monthly reporting',
    ],
  },
  {
    id: 'custom-tech-build',
    name: 'Custom Tech Build',
    price: 80000,
    unit: 'one-time',
    plus: true,
    forWhom: 'A business that needs software or an app',
    includes: [
      'Mobile app (Android/iOS) or custom software',
      'Admin dashboard and CRM/booking engine',
      'WhatsApp and SMS automation',
      'Custom API integrations',
      'Training and handover',
    ],
  },
];

export const packageDisclaimers = [
  'Monthly packages run on a 3-month initial period, then month-to-month. Cancel anytime with 30 days notice.',
  'Ad spend is paid directly to Google or Meta.',
  'Packages save you money on the main services.',
];
