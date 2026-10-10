import { test, describe } from 'node:test';
import assert from 'node:assert';
import { redirectsList } from '../src/config/redirects.ts';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

describe('Website Migration Redirect Rules Audit', () => {
  // 1. Gather all actual current valid routes in the system
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

  const servicesFile = fs.readFileSync('src/data/services.ts', 'utf8');
  const serviceSlugs = [...servicesFile.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]);
  const serviceRoutes = [...new Set(serviceSlugs)].map((s) => `/services/${s}`);

  const projectsFile = fs.readFileSync('src/data/projects.ts', 'utf8');
  const projectSlugs = [...projectsFile.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]);
  const projectRoutes = [...new Set(projectSlugs)].map((p) => `/work/${p}`);

  const blogDir = 'content/blog';
  const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  const blogRoutes = [];
  for (const file of blogFiles) {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const { data } = matter(raw);
    if (!data.draft) {
      blogRoutes.push(`/blog/${data.slug || file.replace(/\.mdx?$/, '')}`);
    }
  }

  const validDestinations = new Set([
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...blogRoutes,
    '/sitemap.xml',
  ]);

  test('contains at least 25 redirect rules', () => {
    assert.ok(redirectsList.length >= 25, `Found ${redirectsList.length} rules`);
  });

  test('no source is identical to its destination (no direct loop)', () => {
    for (const r of redirectsList) {
      assert.notStrictEqual(r.source, r.destination, `Source matches destination: ${r.source}`);
    }
  });

  test('all destinations are valid, existing canonical pages (no 404 targets)', () => {
    for (const r of redirectsList) {
      assert.ok(
        validDestinations.has(r.destination),
        `Redirect destination does not exist in valid routes: ${r.source} -> ${r.destination}`
      );
    }
  });

  test('no redirect chains (a destination is never a source)', () => {
    const sources = new Set(redirectsList.map((r) => r.source));
    for (const r of redirectsList) {
      assert.ok(
        !sources.has(r.destination),
        `Redirect chain detected: ${r.source} -> ${r.destination} (which is also a source)`
      );
    }
  });

  test('no duplicate sources', () => {
    const seen = new Set();
    for (const r of redirectsList) {
      assert.ok(!seen.has(r.source), `Duplicate source found: ${r.source}`);
      seen.add(r.source);
    }
  });

  test('sources start with /', () => {
    for (const r of redirectsList) {
      assert.ok(r.source.startsWith('/'), `Source must start with /: ${r.source}`);
      assert.ok(r.destination.startsWith('/'), `Destination must start with /: ${r.destination}`);
    }
  });
});
