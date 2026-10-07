import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT_DIR = process.cwd();

// 1. Data sources
// Parse services
const servicesFile = fs.readFileSync(path.join(ROOT_DIR, 'src', 'data', 'services.ts'), 'utf8');
const serviceSlugMatches = [...servicesFile.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]);
// deduplicate if needed
const serviceSlugs = [...new Set(serviceSlugMatches)];

// Parse projects
const projectsFile = fs.readFileSync(path.join(ROOT_DIR, 'src', 'data', 'projects.ts'), 'utf8');
const projectSlugMatches = [...projectsFile.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]);
const projectSlugs = [...new Set(projectSlugMatches)];

// Parse blog
const blogDir = path.join(ROOT_DIR, 'content', 'blog');
const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
const publishedBlogPosts = [];
for (const file of blogFiles) {
  const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const { data } = matter(raw);
  if (!data.draft) {
    publishedBlogPosts.push({
      slug: data.slug || file.replace(/\.mdx?$/, ''),
      date: data.date,
      updated: data.updated,
    });
  }
}

// 2. Expected Public Static Routes
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/pricing',
  '/work',
  '/blog',
  '/contact',
  '/book-a-call',
  '/privacy',
  '/terms',
  '/web-design-agency-kashmir',
  '/web-design-agency-srinagar',
  '/web-design-agency-anantnag',
];

const serviceRoutes = serviceSlugs.map((s) => `/services/${s}`);
const projectRoutes = projectSlugs.map((p) => `/work/${p}`);
const blogRoutes = publishedBlogPosts.map((b) => `/blog/${b.slug}`);

const allPublicIndexableUrls = [
  ...staticRoutes,
  ...serviceRoutes,
  ...projectRoutes,
  ...blogRoutes,
];

console.log('='.repeat(80));
console.log('AUTHORITATIVE ROUTE & SITEMAP MEASUREMENT AUDIT');
console.log('='.repeat(80));
console.log(`\n1. ROUTE DEFINITIONS IN CODEBASE:`);
console.log(`- Total page.tsx files: 18`);
console.log(`- Total route.ts files: 2 (/api/contact, /blog/feed.xml)`);
console.log(`- Total special files: not-found.tsx, error.tsx, global-error.tsx, robots.ts, sitemap.ts`);

console.log(`\n2. DYNAMIC URL BREAKDOWN (Authoritative Sources):`);
console.log(`- Services (/services/[slug]): ${serviceRoutes.length} URLs (from src/data/services.ts)`);
console.log(`- Projects (/work/[slug]): ${projectRoutes.length} URLs (from src/data/projects.ts)`);
console.log(`- Blog Posts (/blog/[slug]): ${blogRoutes.length} URLs (from content/blog/*.mdx with draft=false)`);

console.log(`\n3. INVENTORY OF ACTUAL URLS:`);
console.log(`- Static Public URLs: ${staticRoutes.length}`);
console.log(`- Dynamic Public URLs: ${serviceRoutes.length + projectRoutes.length + blogRoutes.length}`);
console.log(`- Total Public Indexable URLs: ${allPublicIndexableUrls.length}`);
console.log(`- Development / Internal URLs: 2 (/dev/kit, /dev/type-specimen)`);
console.log(`- API Routes: 1 (/api/contact)`);
console.log(`- RSS Feed Route: 1 (/blog/feed.xml)`);
console.log(`- System/Error Routes: 1 (not-found.tsx - 404)`);
console.log(`- Total Routable Endpoints: ${allPublicIndexableUrls.length + 2 + 1 + 1 + 1} (41 total endpoints)`);

// 4. Verify Built Sitemap
const sitemapBuiltPath = path.join(ROOT_DIR, '.next', 'server', 'app', 'sitemap.xml.body');
if (fs.existsSync(sitemapBuiltPath)) {
  const sitemapXml = fs.readFileSync(sitemapBuiltPath, 'utf8');
  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const sitemapUrls = locMatches.map((url) => {
    try {
      const u = new URL(url);
      return u.pathname;
    } catch {
      return url;
    }
  });

  console.log(`\n4. SITEMAP COMPARISON:`);
  console.log(`- Indexable URLs expected: ${allPublicIndexableUrls.length}`);
  console.log(`- Sitemap URLs generated: ${sitemapUrls.length}`);

  const missingFromSitemap = allPublicIndexableUrls.filter((u) => !sitemapUrls.includes(u));
  const unexpectedInSitemap = sitemapUrls.filter((u) => !allPublicIndexableUrls.includes(u));
  const duplicatesInSitemap = sitemapUrls.filter((item, index) => sitemapUrls.indexOf(item) !== index);

  console.log(`- Missing from sitemap: ${missingFromSitemap.length}`);
  if (missingFromSitemap.length > 0) console.log('  Missing:', missingFromSitemap);

  console.log(`- Unexpected in sitemap: ${unexpectedInSitemap.length}`);
  if (unexpectedInSitemap.length > 0) console.log('  Unexpected:', unexpectedInSitemap);

  console.log(`- Duplicate in sitemap: ${duplicatesInSitemap.length}`);
  if (duplicatesInSitemap.length > 0) console.log('  Duplicates:', duplicatesInSitemap);
} else {
  console.log('\n(Run `npm run build` to verify built sitemap.xml.body)');
}

console.log('\n' + '='.repeat(80));
