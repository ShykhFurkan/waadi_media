import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { servicesData } from '@/data/services';
import { projectsData } from '@/data/projects';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // 1. Static Core & Marketing Routes
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/book-a-call`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/web-design-agency-kashmir`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/web-design-agency-srinagar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/web-design-agency-anantnag`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 2. Dynamic Service Routes
  const serviceEntries: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // 3. Dynamic Case Study / Work Routes
  const projectEntries: MetadataRoute.Sitemap = projectsData.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 4. Dynamic Blog Post Routes (with authentic publication / update dates from MDX)
  const posts = getAllPosts(false);
  const blogPostEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updated ? new Date(p.updated) : p.date ? new Date(p.date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Blog Index Route (lastModified reflects the latest published post)
  const latestPostDate =
    posts.length > 0 && posts[0].date
      ? new Date(posts[0].updated || posts[0].date)
      : new Date();

  const blogIndexEntry: MetadataRoute.Sitemap = [
    {
      url: `${base}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  return [
    ...staticEntries,
    ...blogIndexEntry,
    ...serviceEntries,
    ...projectEntries,
    ...blogPostEntries,
  ];
}

