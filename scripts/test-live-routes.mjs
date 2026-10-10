const canonicalBase = 'https://www.waadimedia.com';

const testUrls = [
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
  '/services/website-design-development',
  '/services/custom-software-apps',
  '/services/automation-ai',
  '/services/brand-identity',
  '/services/digital-advertising',
  '/services/social-media-content',
  '/services/ecommerce-websites',
  '/services/seo',
  '/work/wonder-delight-tours-travels',
  '/work/kaali-edge',
  '/work/smarthire',
  '/robots.txt',
  '/sitemap.xml',
  // Historical / Old URLs to test live behavior
  '/services/web-development',
  '/services/software-development',
  '/services/saas-development',
  '/services/branding',
  '/services/digital-marketing',
  '/services/seo-services',
  '/services/ecommerce-development',
  '/services/social-media-marketing',
  '/services/media-production',
  '/locations/kashmir',
  '/locations/srinagar',
  '/locations/srinagar-digital-agency',
  '/insights',
  '/insights/how-to-scale-kashmir-businesses-digitally',
  '/insights/web-development-guide-kashmir',
  '/insights/local-seo-and-google-business-profile-kashmir',
  '/method',
  '/lets-talk',
  '/cookies',
  '/portfolio',
  '/deskash',
  '/anantnag-kashmir',
  '/work/wonder-delight',
  '/work/smart-hire',
  '/work/kehribal-fc',
  '/work/zenith-resort',
  '/work/zoon-pashmina',
  '/sports',
  '/sports/live',
  '/blog/sell-kashmiri-saffron-dry-fruits-pashmina-online-d2c-guide',
  '/blog/kashmir-hotel-travel-agency-direct-bookings-guide',
  '/blog/kashmir-local-seo-rank-google-maps-srinagar-anantnag',
  '/blog/website-development-cost-in-kashmir-2026-guide',
  '/blog/social-media-marketing-kashmir-instagram-reels-sales-guide',
  '/blog/whatsapp-automation-ai-business-growth-kashmir',
];

async function checkUrl(base, path) {
  const fullUrl = `${base}${path}`;
  try {
    const res = await fetch(fullUrl, { redirect: 'manual' });
    const location = res.headers.get('location') || '';
    let canonical = '';
    let robots = '';
    const xRobots = res.headers.get('x-robots-tag') || '';
    if (res.status === 200 && res.headers.get('content-type')?.includes('text/html')) {
      const html = await res.text();
      const canMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                        html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
      if (canMatch) canonical = canMatch[1];
      const robMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
      if (robMatch) robots = robMatch[1];
    }
    return {
      url: fullUrl,
      path,
      status: res.status,
      location,
      canonical,
      robots,
      xRobots
    };
  } catch (err) {
    return {
      url: fullUrl,
      path,
      status: 'ERR',
      error: err.message
    };
  }
}

async function main() {
  console.log('Testing Canonical Hostname (www.waadimedia.com):');
  for (const p of testUrls) {
    const r = await checkUrl(canonicalBase, p);
    console.log(`${r.status.toString().padEnd(4)} | ${p.padEnd(45)} | Loc: ${r.location || '-'} | Can: ${r.canonical || '-'}`);
  }
}

main();
