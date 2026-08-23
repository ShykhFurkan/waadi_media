import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.waadimedia.com';
  const currentDate = new Date();

  // Core Pages
  const coreRoutes = [
    '',
    '/services',
    '/work',
    '/method',
    '/lets-talk',
    '/about',
    '/privacy',
    '/terms',
    '/cookies'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  // Dedicated Service SEO Pages
  const serviceRoutes = [
    '/services/web-development',
    '/services/software-development',
    '/services/saas-development',
    '/services/social-media-marketing',
    '/services/branding',
    '/services/automation-ai',
    '/services/digital-marketing',
    '/services/seo-services',
    '/services/ecommerce-development',
    '/services/media-production'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Kashmir Local SEO Pages
  const locationRoutes = [
    '/locations/kashmir',
    '/locations/srinagar',
    '/locations/srinagar-digital-agency'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Detailed Portfolio & Case Study Pages
  const workRoutes = [
    '/work/wonder-delight',
    '/work/kaali-edge',
    '/work/smart-hire',
    '/work/kehribal-fc',
    '/work/zenith-resort',
    '/work/zoon-pashmina'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // Insights / Blog Articles
  const insightRoutes = [
    '/insights',
    '/insights/how-to-scale-kashmir-businesses-digitally',
    '/insights/web-development-guide-kashmir',
    '/insights/local-seo-and-google-business-profile-kashmir'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...workRoutes,
    ...insightRoutes
  ];
}
