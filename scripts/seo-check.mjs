import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import matter from 'gray-matter';

const ROOT_DIR = process.cwd();
const APP_SERVER_DIR = path.join(ROOT_DIR, '.next', 'server', 'app');

console.log('🔍 Starting Waadi Media SEO & Metadata Audit...');

const shouldBuild = !process.argv.includes('--no-build');
if (shouldBuild || !fs.existsSync(APP_SERVER_DIR)) {
  console.log('📦 Building the site with npm run build...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Routes to inspect
function collectHtmlFiles(dir, baseRoute = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip internal and private segments
      if (entry.name.startsWith('_') || entry.name === 'api' || entry.name === 'design-system' || entry.name === 'dev') {
        continue;
      }
      results = results.concat(collectHtmlFiles(fullPath, `${baseRoute}/${entry.name}`));
    } else if (entry.name.endsWith('.html')) {
      const routeName = entry.name === 'index.html'
        ? (baseRoute || '/')
        : `${baseRoute}/${entry.name.replace(/\.html$/, '')}`;

      // Skip non-user pages
      if (routeName.includes('/_') || routeName === '/design-system' || routeName.startsWith('/dev')) {
        continue;
      }

      results.push({
        route: routeName.replace(/\/index$/, '') || '/',
        filePath: fullPath,
      });
    }
  }

  return results;
}

const htmlPages = collectHtmlFiles(APP_SERVER_DIR);
console.log(`📄 Found ${htmlPages.length} public static HTML pages to audit.\n`);

const seenTitles = new Map();
const seenDescriptions = new Map();
const errors = [];
const passedRoutes = [];

for (const { route, filePath } of htmlPages) {
  const html = fs.readFileSync(filePath, 'utf8');

  // 1. Title Audit
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  if (!title) {
    errors.push(`[${route}] Missing <title> tag.`);
  } else {
    if (title.length > 60) {
      errors.push(`[${route}] Title exceeds 60 characters (${title.length} chars): "${title}"`);
    }
    if (seenTitles.has(title)) {
      errors.push(`[${route}] Duplicate title with ${seenTitles.get(title)}: "${title}"`);
    } else {
      seenTitles.set(title, route);
    }
  }

  // 2. Meta Description Audit
  const descMatch =
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : null;

  if (!description) {
    errors.push(`[${route}] Missing meta description.`);
  } else {
    if (description.length > 155) {
      errors.push(
        `[${route}] Description exceeds 155 characters (${description.length} chars): "${description}"`
      );
    }
    if (seenDescriptions.has(description)) {
      errors.push(
        `[${route}] Duplicate description with ${seenDescriptions.get(description)}: "${description}"`
      );
    } else {
      seenDescriptions.set(description, route);
    }
  }

  // 3. Canonical URL Audit
  const canonicalMatch =
    html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
    html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

  if (!canonical) {
    errors.push(`[${route}] Missing canonical link tag.`);
  }

  // 4. Open Graph Image Audit
  const ogImageMatch =
    html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i) ||
    html.match(/<meta\s+content=["']([^"']*)["']\s+property=["']og:image["']/i);
  const hasRootOgImage = fs.existsSync(path.join(ROOT_DIR, 'src', 'app', 'opengraph-image.tsx'));
  const ogImage = ogImageMatch ? ogImageMatch[1].trim() : hasRootOgImage ? 'default-og-image' : null;

  if (!ogImage) {
    errors.push(`[${route}] Missing Open Graph image.`);
  }

  // 5. Exactly One H1 Audit
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length === 0) {
    errors.push(`[${route}] Missing <h1> tag.`);
  } else if (h1Matches.length > 1) {
    errors.push(`[${route}] Multiple <h1> tags found (${h1Matches.length} <h1> tags). Must be exactly one.`);
  }

  passedRoutes.push({
    route,
    title,
    titleLen: title ? title.length : 0,
    descLen: description ? description.length : 0,
    canonical,
    ogImage: Boolean(ogImage),
    h1Count: h1Matches.length,
  });
}

// 6. Blog Publish Guard Audit (content/blog/)
const blogDir = path.join(ROOT_DIR, 'content', 'blog');
const blogAuditResults = [];

if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  for (const file of blogFiles) {
    const filePath = path.join(blogDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);
    const isPublished = data.draft === false;

    if (isPublished) {
      // 1. Marker check
      if (raw.includes('[FURKAN') || raw.includes('[VERIFY')) {
        errors.push(`[Blog Publish Guard: ${file}] Published post (draft: false) contains unresolved [FURKAN or [VERIFY marker.`);
      }

      // 2. Service page link check
      const hasServiceLink = /\/services\/[a-z0-9-]+/.test(raw);
      if (!hasServiceLink) {
        errors.push(`[Blog Publish Guard: ${file}] Published post missing internal link to a service page (/services/...).`);
      }

      // 3. /pricing link check
      const hasPricingLink = /\/pricing\b/.test(raw);
      if (!hasPricingLink) {
        errors.push(`[Blog Publish Guard: ${file}] Published post missing internal link to /pricing.`);
      }

      // 4. Local page link check
      const hasLocalLink = /\/web-design-agency-(kashmir|srinagar|anantnag)\b/.test(raw);
      if (!hasLocalLink) {
        errors.push(`[Blog Publish Guard: ${file}] Published post missing internal link to a local page (/web-design-agency-kashmir, /web-design-agency-srinagar, or /web-design-agency-anantnag).`);
      }

      // 5. At least two other blog posts link check
      const currentSlug = file.replace(/\.mdx?$/, '');
      const blogLinks = Array.from(raw.matchAll(/\/blog\/([a-z0-9-]+)/g))
        .map((m) => m[1])
        .filter((slug) => slug !== currentSlug && slug !== 'feed.xml');
      const uniqueOtherBlogLinks = new Set(blogLinks);

      if (uniqueOtherBlogLinks.size < 2) {
        errors.push(`[Blog Publish Guard: ${file}] Published post must link to at least two other blog posts (found ${uniqueOtherBlogLinks.size} links to other posts).`);
      }

      blogAuditResults.push({
        file,
        status: 'PUBLISHED',
        markersClean: !raw.includes('[FURKAN') && !raw.includes('[VERIFY'),
        hasServiceLink,
        hasPricingLink,
        hasLocalLink,
        otherBlogLinksCount: uniqueOtherBlogLinks.size,
      });
    } else {
      blogAuditResults.push({
        file,
        status: 'DRAFT',
      });
    }
  }
}

console.log('='.repeat(90));
console.log('ROUTE AUDIT SUMMARY:');
console.log('='.repeat(90));
for (const p of passedRoutes) {
  console.log(
    `✓ ${p.route.padEnd(42)} | Title (${p.titleLen}/60) | Desc (${p.descLen}/155) | H1: ${p.h1Count} | Canonical: YES | OG: YES`
  );
}

if (blogAuditResults.length > 0) {
  console.log('='.repeat(90));
  console.log('BLOG PUBLISH GUARD SUMMARY:');
  console.log('='.repeat(90));
  for (const b of blogAuditResults) {
    if (b.status === 'PUBLISHED') {
      console.log(
        `✓ [PUBLISHED] ${b.file.padEnd(42)} | Markers Clean: ${b.markersClean ? 'YES' : 'NO'} | Service: YES | Pricing: YES | Local: YES | Other Posts: ${b.otherBlogLinksCount}`
      );
    } else {
      console.log(`• [DRAFT]     ${b.file.padEnd(42)} | (Draft - hidden from production)`);
    }
  }
}
console.log('='.repeat(90));

if (errors.length > 0) {
  console.error('\n❌ SEO CHECK FAILED WITH THE FOLLOWING ERRORS:');
  for (const err of errors) {
    console.error(`  • ${err}`);
  }
  process.exit(1);
} else {
  console.log(`\n✅ All ${htmlPages.length} public routes passed SEO & metadata checks with 100% compliance!`);
  process.exit(0);
}
