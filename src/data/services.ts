import { PriceItem, PriceUnit, getPriceItemsByService } from './pricing';

export type Service = {
  slug: string;
  name: string;
  shortLine: string;
  startingPrice: number;
  priceUnit: PriceUnit;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  included: string[];
  howItWorks: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  proofProjectSlug?: string;
  proofNote?: string;
};

export const servicesData: Service[] = [
  {
    slug: 'website-design-development',
    name: 'Website design and development',
    shortLine: 'Fast, mobile-friendly websites with on-page SEO that turn visitors into phone calls and enquiries.',
    startingPrice: 5000,
    priceUnit: 'one-time',
    icon: 'Layout',
    metaTitle: 'Website Design and Development in Kashmir - Waadi Media',
    metaDescription: 'Fast, mobile-friendly websites with on-page SEO for Kashmir businesses. Business sites from ₹15,000. Free call to start.',
    h1: 'Website design and development in Kashmir',
    intro: 'Your website is the shop window for people who never walked past your door. We design and build fast, clear websites that look right on every phone and help visitors call, message or buy.',
    included: [
      'Design made for your business, not recycled templates',
      'Mobile-first, fast loading pages',
      'On-page SEO: titles, descriptions, schema, sitemap, speed',
      'Contact form and WhatsApp button',
      'Google Analytics and Search Console set up',
      'Simple training so you can manage your site',
      'Help with domain and hosting',
    ],
    howItWorks: [
      { title: 'Talk about your goals', text: 'We start with a free call to understand your business, your customers and what you want the website to achieve.' },
      { title: 'Agree pages, price and timeline', text: 'You get a clear proposal with fixed pricing and milestones in writing before any work begins.' },
      { title: 'Design and build with your feedback', text: 'You review the design at key stages so the finished site matches exactly what you envisioned.' },
      { title: 'Launch, train and support', text: 'We set up your domain, test everything thoroughly, train you to update content, and stay on hand.' },
    ],
    faqs: [
      {
        q: 'How long does a website take?',
        a: 'A landing page usually takes 3 to 5 days and a business website 2 to 3 weeks. We confirm the exact date before we start. [CONFIRM]',
      },
      {
        q: 'Can I edit the website myself?',
        a: 'Yes. With a CMS-based site we train you to update text, images and pages without a developer.',
      },
      {
        q: 'Do you also build the SEO?',
        a: 'Yes. Every website includes on-page SEO so Google can understand and rank it.',
      },
    ],
    related: ['seo', 'brand-identity'],
    proofProjectSlug: 'wonder-delight-tours-travels',
    proofNote: 'See our work on Wonder Delight Tours & Travels, built with a custom CMS and trip inquiry flows.',
  },
  {
    slug: 'ecommerce-websites',
    name: 'E-commerce websites',
    shortLine: 'Online stores built for Kashmir sellers with UPI and card payments, shipping setup, and product SEO.',
    startingPrice: 35000,
    priceUnit: 'one-time',
    icon: 'ShoppingBag',
    metaTitle: 'E-commerce Website Development in Kashmir - Waadi Media',
    metaDescription: 'Sell online with a store built for Kashmir sellers: UPI and card payments, shipping setup and product SEO. From ₹35,000.',
    h1: "E-commerce websites for Kashmir's sellers",
    intro: 'From saffron and dry fruits to shawls and handicrafts, Kashmir makes things the whole country wants. We build online stores that let you sell beyond the valley, with simple payments and easy order management.',
    included: [
      'Product catalogue with categories and search',
      'UPI, card and net banking payments',
      'Shipping and delivery setup',
      'Order emails and WhatsApp notifications',
      'Product-page SEO',
      'Analytics and conversion tracking',
      'Training to add products and manage orders',
    ],
    howItWorks: [
      { title: 'Plan products and shipping', text: 'We organize your product inventory, delivery zones, packaging requirements, and payment gateways.' },
      { title: 'Design and build the store', text: 'We create a clean, trustworthy shopping experience optimized for mobile shoppers on Indian 4G networks.' },
      { title: 'Test orders and payments', text: 'We test live UPI transactions, order tracking, shipping label generation, and automated notifications.' },
      { title: 'Launch and promote', text: 'We take the store live, submit products to Google Shopping, and provide guidance on first sales.' },
    ],
    faqs: [
      {
        q: 'Which platform do you use?',
        a: 'We choose between Shopify, WooCommerce or a custom build depending on your products and budget, and explain why.',
      },
      {
        q: 'Can I accept UPI?',
        a: 'Yes. We set up UPI, cards and net banking through a trusted payment gateway.',
      },
      {
        q: 'Can you help with product photos?',
        a: 'Yes. See our photography and content service.',
      },
    ],
    related: ['website-design-development', 'digital-advertising'],
  },
  {
    slug: 'seo',
    name: 'SEO',
    shortLine: 'Local SEO, technical audits, and Google Business Profile optimization to get your business found on Google.',
    startingPrice: 2000,
    priceUnit: 'one-time',
    icon: 'Search',
    metaTitle: 'SEO Services in Kashmir - Waadi Media',
    metaDescription: 'Get found on Google. Local SEO, audits, Google Business Profile and monthly SEO for Kashmir businesses. From ₹2,000.',
    h1: 'SEO services in Kashmir: get found on Google',
    intro: 'When someone nearby searches for what you sell, you should show up. We improve your Google Business Profile and your website so the right customers find you.',
    included: [
      'Google Business Profile setup and optimization',
      'Technical and on-page SEO audit',
      'Keyword research and content plan',
      'Local SEO for Srinagar, Anantnag and your area',
      'Monthly reports in plain language',
    ],
    howItWorks: [
      { title: 'Audit your current position', text: 'We analyze your website, Google Maps ranking, competitor strengths, and search opportunities.' },
      { title: 'Fix the basics', text: 'We correct technical issues, indexing errors, page titles, descriptions, and local business citations.' },
      { title: 'Publish helpful content', text: 'We target customer queries with clean, local landing pages and informative answers.' },
      { title: 'Track and improve every month', text: 'We monitor keyword movements, website traffic and phone calls, reporting progress in plain words.' },
    ],
    faqs: [
      {
        q: 'How long until I see results?',
        a: 'SEO is steady, not instant. Most businesses see movement in 3 to 6 months. We never promise a number-one ranking, and we show you what is improving.',
      },
      {
        q: 'Do you need access to my website?',
        a: 'Yes, to make the fixes. We only change what we agree on.',
      },
      {
        q: 'Is monthly SEO needed?',
        a: 'Setup helps right away; monthly work keeps you ahead as competitors improve.',
      },
    ],
    related: ['website-design-development', 'digital-advertising'],
    proofProjectSlug: 'kaali-edge',
    proofNote: 'See our work on Kaali Edge, structured for international education search visibility and lead flow.',
  },
  {
    slug: 'brand-identity',
    name: 'Brand identity',
    shortLine: 'Logos, color systems, and stationery templates that make your business look established and trusted.',
    startingPrice: 3000,
    priceUnit: 'one-time',
    icon: 'Sparkles',
    metaTitle: 'Brand Identity and Logo Design in Kashmir - Waadi Media',
    metaDescription: 'Logos, brand kits and templates that make your business look trusted. Logo design from ₹3,500.',
    h1: 'Brand identity and logo design in Kashmir',
    intro: 'People judge a business in seconds. A clear logo, colors and style make you look trusted before you say a word.',
    included: [
      'Logo with files for print and web',
      'Colors and fonts chosen for your business',
      'Brand guideline so everyone uses it correctly',
      'Templates for social media, stationery and presentations',
    ],
    howItWorks: [
      { title: 'Learn about your business', text: 'We understand your story, your target audience, and how you want to be perceived in the market.' },
      { title: 'Show direction and options', text: 'We present thoughtful design directions with real-world mockups on packaging, screens, and stationery.' },
      { title: 'Refine together', text: 'We fine-tune typography, color codes, and proportions based on your direct input.' },
      { title: 'Deliver all files', text: 'You receive vector SVGs, high-resolution PNGs, PDFs, and a clear guide on how to use them.' },
    ],
    faqs: [
      {
        q: 'Do I own the logo?',
        a: 'Yes, once the project is paid for, you own the final design. [CONFIRM]',
      },
      {
        q: 'How many logo options do I get?',
        a: 'We start with a direction we believe in, and refine it with you. [CONFIRM]',
      },
      {
        q: 'Can you refresh an existing logo?',
        a: 'Yes.',
      },
    ],
    related: ['website-design-development', 'social-media-content'],
  },
  {
    slug: 'digital-advertising',
    name: 'Digital advertising',
    shortLine: 'Google and Meta ads managed to deliver genuine enquiries and calls, not wasted clicks.',
    startingPrice: 3000,
    priceUnit: 'one-time',
    icon: 'Megaphone',
    metaTitle: 'Google and Meta Ads Management in Kashmir - Waadi Media',
    metaDescription: 'Run Google, Facebook and Instagram ads that bring real enquiries. Management from ₹8,000 per month plus ad spend.',
    h1: 'Google and Meta ads management in Kashmir',
    intro: 'Ads can bring customers this week, not next year. We set up and manage Google, Facebook and Instagram ads so your money goes toward real enquiries.',
    included: [
      'Campaign setup and targeting',
      'Ad design and copy',
      'Conversion tracking so we know what works',
      'Monthly reports in plain language',
    ],
    howItWorks: [
      { title: 'Set goals and budget', text: 'We define the target audience, suitable channels, and a realistic daily advertising budget.' },
      { title: 'Build and launch campaigns', text: 'We craft compelling ad copy, select graphics, configure landing pages, and launch.' },
      { title: 'Watch results daily', text: 'We adjust bids, remove negative keywords, and reallocate budget to the highest-performing ads.' },
      { title: 'Improve and report monthly', text: 'You receive an honest breakdown of ad spend, cost per lead, and recommended adjustments.' },
    ],
    faqs: [
      {
        q: 'How much should I spend on ads?',
        a: 'We suggest a starting budget after learning your goals, and you can change it any time.',
      },
      {
        q: 'Do I own the ad accounts?',
        a: 'Yes. Accounts are in your name. [CONFIRM]',
      },
      {
        q: 'Is there a minimum contract?',
        a: 'Monthly services run on a 3-month minimum so we have time to test and improve. [CONFIRM]',
      },
    ],
    related: ['social-media-content', 'seo'],
  },
  {
    slug: 'social-media-content',
    name: 'Social media and content',
    shortLine: 'Consistent monthly posts, reels, product photos, and copywriting that keep your brand top-of-mind.',
    startingPrice: 1000,
    priceUnit: 'per page',
    icon: 'Share2',
    metaTitle: 'Social Media and Content in Kashmir - Waadi Media',
    metaDescription: 'Posts, reels, photos, copy and email marketing for Kashmir businesses. Social media management from ₹8,000 per month.',
    h1: 'Social media and content for Kashmir businesses',
    intro: 'Consistent, good-looking content keeps customers coming back. We plan, design and post so you can focus on running your business.',
    included: [
      'Monthly content calendar',
      '12 designed posts and reels per month',
      'Captions and hashtags',
      'Product photography and short videos',
      'Website and ad copywriting',
      'Email campaigns',
    ],
    howItWorks: [
      { title: 'Plan the month', text: 'We establish a monthly theme, key promotions, and a publication schedule aligned with local seasons.' },
      { title: 'Create content', text: 'We write captions, shoot photography or video, and design branded graphics for your review.' },
      { title: 'Post and engage', text: 'We schedule posts at optimal times and monitor comments and customer inquiries.' },
      { title: 'Review and improve', text: 'We analyze what content connected best with your audience to guide the following month.' },
    ],
    faqs: [
      {
        q: 'Which platforms do you cover?',
        a: 'Instagram and Facebook first, with LinkedIn and YouTube as needed.',
      },
      {
        q: 'Will you visit for photoshoots?',
        a: 'We arrange shoots depending on the location and project. [CONFIRM]',
      },
      {
        q: 'Can I approve posts before they go live?',
        a: 'Yes, always.',
      },
    ],
    related: ['digital-advertising', 'brand-identity'],
  },
  {
    slug: 'custom-software-apps',
    name: 'Custom software and apps',
    shortLine: 'Bespoke web applications, CRM systems, booking portals, and mobile apps built for your workflow.',
    startingPrice: 60000,
    priceUnit: 'one-time',
    icon: 'Code',
    metaTitle: 'Custom Software and App Development in Kashmir - Waadi Media',
    metaDescription: 'CRMs, booking systems, dashboards and mobile apps built for your business. From ₹60,000.',
    h1: 'Custom software and app development in Kashmir',
    intro: "When off-the-shelf tools don't fit, we build software that does. Booking systems, CRMs, dashboards and mobile apps made around how your business actually works.",
    included: [
      'A short discovery phase to define what you need',
      'Web or mobile (Android, iOS)',
      'Secure login and data storage',
      'Admin dashboard',
      'Training and handover',
    ],
    howItWorks: [
      { title: 'Define the problem', text: 'We map out your business workflow, identify bottlenecks, and define software requirements.' },
      { title: 'Design the flow', text: 'We create intuitive wireframes and user journeys before writing production code.' },
      { title: 'Build in stages you can review', text: 'We develop iteratively, allowing you to test each milestone as it is finished.' },
      { title: 'Launch and support', text: 'We deploy to cloud infrastructure, train your team, and provide ongoing maintenance.' },
    ],
    faqs: [
      {
        q: 'Can you build just a first version?',
        a: 'Yes. We recommend starting with the smallest useful version and growing it.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do, once the project is paid for. [CONFIRM]',
      },
      {
        q: 'Do you support it after launch?',
        a: 'Yes, with a monthly support plan.',
      },
    ],
    related: ['automation-ai', 'website-design-development'],
    proofProjectSlug: 'smarthire',
    proofNote: 'An AI hiring platform we built from scratch, managing candidate assessment stages end-to-end.',
  },
  {
    slug: 'automation-ai',
    name: 'Automation and AI',
    shortLine: 'WhatsApp automations, customer chatbots, and payment integrations that eliminate repetitive admin work.',
    startingPrice: 5000,
    priceUnit: 'one-time',
    icon: 'Bot',
    metaTitle: 'WhatsApp Automation and AI Chatbots in Kashmir - Waadi Media',
    metaDescription: 'Answer customers instantly with WhatsApp automation and AI chatbots. Chatbots from ₹15,000.',
    h1: 'WhatsApp automation and AI chatbots in Kashmir',
    intro: 'Customers expect fast replies. We automate the repeat work, such as answering common questions, sending confirmations and following up, so nothing slips through.',
    included: [
      'WhatsApp and SMS automation',
      'AI chatbot trained on your business information',
      'Payment gateway and API integrations',
      'Booking confirmations and reminders',
    ],
    howItWorks: [
      { title: 'Find the repeat tasks', text: 'We pinpoint repetitive customer inquiries, booking confirmations, or invoice reminders that consume your time.' },
      { title: 'Design the flow', text: 'We build natural conversational scripts and automation triggers.' },
      { title: 'Build and test', text: 'We integrate with your WhatsApp Business API, CRM, or booking system and conduct edge-case testing.' },
      { title: 'Launch and tune', text: 'We go live and refine responses based on real customer interactions.' },
    ],
    faqs: [
      {
        q: 'Will a chatbot replace my staff?',
        a: 'No. It handles the common questions so your team can focus on real conversations.',
      },
      {
        q: 'Can the chatbot speak Urdu or Kashmiri?',
        a: 'We build in English first and can discuss other languages for your project.',
      },
      {
        q: 'Is it safe with customer data?',
        a: 'We only collect what is needed and explain how it is stored.',
      },
    ],
    related: ['custom-software-apps', 'website-design-development'],
    proofProjectSlug: 'smarthire',
    proofNote: 'SmartHire showcases AI applied to real-world candidate screening and workflow automation.',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getServicePriceItems(slug: string): PriceItem[] {
  return getPriceItemsByService(slug);
}
