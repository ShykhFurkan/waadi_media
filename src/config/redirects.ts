/**
 * Permanent 301/308 Redirect Map for Waadi Media Website Migration.
 * Maps all historical URLs discovered from previous releases and Google Search Console
 * to their authoritative current destinations.
 */

export interface RedirectEntry {
  source: string;
  destination: string;
}

export const redirectsList: RedirectEntry[] = [
  // 1. Core Pages & Former Company Routes
  { source: '/method', destination: '/about' },
  { source: '/lets-talk', destination: '/contact' },
  { source: '/cookies', destination: '/privacy' },
  { source: '/portfolio', destination: '/work' },

  // 2. Former Location Routes
  { source: '/anantnag-kashmir', destination: '/web-design-agency-anantnag' },
  { source: '/locations', destination: '/web-design-agency-kashmir' },
  { source: '/locations/kashmir', destination: '/web-design-agency-kashmir' },
  { source: '/locations/srinagar', destination: '/web-design-agency-srinagar' },
  { source: '/locations/srinagar-digital-agency', destination: '/web-design-agency-srinagar' },

  // 3. Former Service Routes
  { source: '/services/web-development', destination: '/services/website-design-development' },
  { source: '/services/software-development', destination: '/services/custom-software-apps' },
  { source: '/services/saas-development', destination: '/services/custom-software-apps' },
  { source: '/services/ai-automation', destination: '/services/automation-ai' },
  { source: '/services/branding', destination: '/services/brand-identity' },
  { source: '/services/brand-management', destination: '/services/brand-identity' },
  { source: '/services/digital-marketing', destination: '/services/digital-advertising' },
  { source: '/services/seo-services', destination: '/services/seo' },
  { source: '/services/ecommerce-development', destination: '/services/ecommerce-websites' },
  { source: '/services/social-media-marketing', destination: '/services/social-media-content' },
  { source: '/services/social-media-management', destination: '/services/social-media-content' },
  { source: '/services/media-production', destination: '/services/social-media-content' },

  // 4. Former Work / Case Study Routes (Only genuine 1-to-1 moves)
  { source: '/work/wonder-delight', destination: '/work/wonder-delight-tours-travels' },
  { source: '/work/smart-hire', destination: '/work/smarthire' },

  // 5. Former Insights & Blog Routes
  { source: '/insights', destination: '/blog' },
  { source: '/insights/how-to-scale-kashmir-businesses-digitally', destination: '/blog/kashmir-tech-boom-local-business-growth-online' },
  { source: '/insights/web-development-guide-kashmir', destination: '/blog/7-things-to-ask-before-hiring-a-web-design-agency-in-kashmir' },
  { source: '/insights/local-seo-and-google-business-profile-kashmir', destination: '/blog/local-seo-checklist-for-srinagar-and-anantnag-shops' },
  { source: '/blog/sell-kashmiri-saffron-dry-fruits-pashmina-online-d2c-guide', destination: '/blog/how-to-sell-kashmiri-products-online-saffron-dry-fruits-handicrafts' },
  { source: '/blog/kashmir-hotel-travel-agency-direct-bookings-guide', destination: '/blog/how-kashmir-tour-operators-can-get-more-direct-bookings' },
  { source: '/blog/kashmir-local-seo-rank-google-maps-srinagar-anantnag', destination: '/blog/local-seo-checklist-for-srinagar-and-anantnag-shops' },
  { source: '/blog/website-development-cost-in-kashmir-2026-guide', destination: '/blog/how-much-does-a-website-cost-in-kashmir-2026-price-guide' },
  { source: '/blog/social-media-marketing-kashmir-instagram-reels-sales-guide', destination: '/blog/do-you-need-a-website-or-is-an-instagram-page-enough' },
  { source: '/blog/whatsapp-automation-ai-business-growth-kashmir', destination: '/services/automation-ai' },

  // 6. Common Legacy Variations & Static HTML Extensions
  { source: '/home', destination: '/' },
  { source: '/index.html', destination: '/' },
  { source: '/about.html', destination: '/about' },
  { source: '/about-us', destination: '/about' },
  { source: '/contact.html', destination: '/contact' },
  { source: '/contact-us', destination: '/contact' },
  { source: '/services.html', destination: '/services' },
  { source: '/pricing.html', destination: '/pricing' },
  { source: '/work.html', destination: '/work' },
  { source: '/privacy.html', destination: '/privacy' },
  { source: '/terms.html', destination: '/terms' },

  // 7. Competing Sitemap Endpoints
  { source: '/sitemap_index.xml', destination: '/sitemap.xml' },
  { source: '/sitemap-index.xml', destination: '/sitemap.xml' },
];
