import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'Home page', url: 'http://localhost:3000/' },
  { name: 'Service page', url: 'http://localhost:3000/services/website-design-development' },
  { name: 'Pricing page', url: 'http://localhost:3000/pricing' },
  { name: 'Case study', url: 'http://localhost:3000/work/wonder-delight-tours-travels' },
  { name: 'Blog post', url: 'http://localhost:3000/blog/how-much-does-a-website-cost-in-kashmir-2026-price-guide' },
];

const results = [];

for (const p of pages) {
  const tmpFile = path.resolve(`./lh-${Date.now()}.json`);
  console.log(`Auditing ${p.name} (${p.url})...`);
  try {
    execSync(
      `npx lighthouse "${p.url}" --output=json --output-path="${tmpFile}" --only-categories=performance --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --chrome-flags="--headless=new --no-sandbox"`,
      { stdio: 'ignore', timeout: 90000 }
    );
    if (fs.existsSync(tmpFile)) {
      const data = JSON.parse(fs.readFileSync(tmpFile, 'utf8'));
      fs.unlinkSync(tmpFile);
      const perfScore = Math.round((data.categories.performance?.score || 0) * 100);
      const fcp = data.audits['first-contentful-paint']?.displayValue || 'N/A';
      const lcp = data.audits['largest-contentful-paint']?.displayValue || 'N/A';
      const tbt = data.audits['total-blocking-time']?.displayValue || 'N/A';
      const cls = data.audits['cumulative-layout-shift']?.displayValue || 'N/A';
      
      const lcpBreakdownNode = data.audits['lcp-breakdown-insight']?.details?.items?.find((it) => it.type === 'node');
      const legacyLcpItem = data.audits['largest-contentful-paint-element']?.details?.items?.[0];
      const lcpElement = lcpBreakdownNode?.nodeLabel || lcpBreakdownNode?.snippet || legacyLcpItem?.node?.snippet || legacyLcpItem?.node?.nodeLabel || 'N/A';

      results.push({
        name: p.name,
        url: p.url,
        score: perfScore,
        fcp,
        lcp,
        tbt,
        cls,
        lcpElement: lcpElement.replace(/\s+/g, ' ').trim().slice(0, 120),
      });
      console.log(`  ✓ Score: ${perfScore}, FCP: ${fcp}, LCP: ${lcp}, TBT: ${tbt}, CLS: ${cls}`);
      console.log(`    LCP Element: ${lcpElement.slice(0, 100)}`);
    }
  } catch (err) {
    console.error(`  ✗ Error auditing ${p.name}:`, err.message);
  }
}

console.log('\n=== FINAL LIGHTHOUSE AUDIT REPORT ===');
console.table(results);
