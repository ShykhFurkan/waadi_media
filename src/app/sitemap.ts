import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { servicesData } from '@/data/services';
import { projectsData } from '@/data/projects';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    '',
    'services',
    'pricing',
    'work',
    'blog',
    'about',
    'contact',
    'book-a-call',
    'web-design-agency-kashmir',
    'web-design-agency-srinagar',
    'web-design-agency-anantnag',
    'privacy',
    'terms',
  ];

  const serviceRoutes = servicesData.map((s) => `services/${s.slug}`);
  const projectRoutes = projectsData.map((p) => `work/${p.slug}`);
  const blogRoutes = getAllPosts().map((p) => `blog/${p.slug}`);

  const allPaths = [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];

  return allPaths.map((path) => ({
    url: path === '' ? base : `${base}/${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' || path === 'blog' || path.startsWith('blog/') ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path.startsWith('services') || path === 'pricing' ? 0.9 : 0.8,
  }));
}
