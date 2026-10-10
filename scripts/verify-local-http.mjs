import { spawn } from 'child_process';
import { redirectsList } from '../src/config/redirects.ts';

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function testHttp() {
  console.log('🚀 Starting Next.js production server on port', PORT, '...');
  const nextServer = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    shell: true,
    stdio: 'inherit',
  });

  // Wait for server to become responsive
  let started = false;
  for (let i = 0; i < 30; i++) {
    await sleep(500);
    try {
      const res = await fetch(`${BASE_URL}/robots.txt`);
      if (res.status === 200) {
        started = true;
        break;
      }
    } catch {
      // not yet up
    }
  }

  if (!started) {
    console.error('❌ Failed to start Next.js local server.');
    nextServer.kill();
    process.exit(1);
  }

  console.log('✅ Next.js server is UP! Running HTTP validation...\n');

  const results = [];
  let failures = 0;

  // 1. Test canonical routes
  const canonicalRoutes = [
    '/',
    '/services',
    '/pricing',
    '/work',
    '/about',
    '/contact',
    '/book-a-call',
    '/blog',
    '/web-design-agency-kashmir',
    '/services/website-design-development',
    '/services/custom-software-apps',
    '/services/automation-ai',
    '/work/wonder-delight-tours-travels',
    '/work/kaali-edge',
    '/work/smarthire',
  ];

  for (const r of canonicalRoutes) {
    const res = await fetch(`${BASE_URL}${r}`, { redirect: 'manual' });
    const pass = res.status === 200;
    if (!pass) failures++;
    results.push({
      category: 'Canonical Route',
      url: r,
      status: res.status,
      expected: 200,
      pass,
    });
  }

  // 2. Test robots.txt and sitemap.xml
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsText = await robotsRes.text();
  const robotsPass = robotsRes.status === 200 && robotsText.includes('Sitemap: https://www.waadimedia.com/sitemap.xml');
  if (!robotsPass) failures++;
  results.push({
    category: 'Robots.txt Directive',
    url: '/robots.txt',
    status: robotsRes.status,
    expected: '200 + https://www.waadimedia.com/sitemap.xml',
    pass: robotsPass,
  });

  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  const sitemapPass =
    sitemapRes.status === 200 &&
    sitemapText.includes('<loc>https://www.waadimedia.com</loc>') &&
    !sitemapText.includes('<loc>https://waadimedia.com/</loc>') &&
    !sitemapText.includes('<loc>https://waadimedia.com</loc>');
  if (!sitemapPass) failures++;
  results.push({
    category: 'Sitemap Canonical Domain',
    url: '/sitemap.xml',
    status: sitemapRes.status,
    expected: '200 + exclusively www.waadimedia.com URLs',
    pass: sitemapPass,
  });

  // 3. Test all configured redirects
  for (const entry of redirectsList) {
    const res = await fetch(`${BASE_URL}${entry.source}`, { redirect: 'manual' });
    const location = res.headers.get('location');
    const isRedirect = res.status === 308 || res.status === 307 || res.status === 301;
    const correctTarget = location === entry.destination;
    const pass = isRedirect && correctTarget;
    if (!pass) failures++;
    results.push({
      category: 'Permanent Redirect',
      url: entry.source,
      status: res.status,
      expected: `308 -> ${entry.destination}`,
      actualLocation: location,
      pass,
    });
  }

  const missingRoutes = [
    '/sports',
    '/sports/live',
    '/cms/sports/broadcast',
    '/deskash',
    '/work/kehribal-fc',
    '/work/zenith-resort',
    '/work/zoon-pashmina',
    '/some-random-404-url',
  ];
  for (const r of missingRoutes) {
    const res = await fetch(`${BASE_URL}${r}`, { redirect: 'manual' });
    const pass = res.status === 404;
    if (!pass) failures++;
    results.push({
      category: 'Obsolete 404',
      url: r,
      status: res.status,
      expected: 404,
      pass,
    });
  }

  // Teardown
  nextServer.kill();

  console.log('='.repeat(95));
  console.log('LOCAL HTTP REDIRECT & INTEGRITY AUDIT RESULTS:');
  console.log('='.repeat(95));
  for (const r of results) {
    const mark = r.pass ? '✓ PASS' : '❌ FAIL';
    console.log(
      `${mark.padEnd(8)} | [${r.category.padEnd(20)}] | ${r.url.padEnd(35)} | Status: ${r.status} | Exp: ${r.expected}${
        r.actualLocation ? ` (Loc: ${r.actualLocation})` : ''
      }`
    );
  }
  console.log('='.repeat(95));
  console.log(`TOTAL CHECKS: ${results.length} | PASSED: ${results.length - failures} | FAILED: ${failures}`);
  console.log('='.repeat(95));

  if (failures > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

testHttp().catch((err) => {
  console.error('Fatal error in testHttp:', err);
  process.exit(1);
});
