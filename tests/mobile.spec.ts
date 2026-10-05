import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const KEY_PAGES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'services-seo', path: '/services/seo' },
  { name: 'pricing', path: '/pricing' },
  { name: 'work', path: '/work' },
  { name: 'work-kaali-edge', path: '/work/kaali-edge' },
  { name: 'blog', path: '/blog' },
  { name: 'blog-post', path: '/blog/how-much-does-a-website-cost-in-kashmir-2026-price-guide' },
  { name: 'contact', path: '/contact' },
  { name: 'book-a-call', path: '/book-a-call' },
  { name: 'about', path: '/about' },
  { name: 'local-srinagar', path: '/web-design-agency-srinagar' },
  { name: '404', path: '/_not-found' },
];

test.beforeAll(() => {
  const screenshotDir = path.join(process.cwd(), 'tests', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
});

for (const pageItem of KEY_PAGES) {
  test(`Mobile verification for ${pageItem.name} (${pageItem.path})`, async ({ page }, testInfo) => {
    await page.goto(pageItem.path, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const viewport = page.viewportSize();
    expect(viewport).toBeDefined();
    const vpHeight = viewport!.height;

    // 1. Horizontal Scroll Check
    const scrollInfo = await page.evaluate(() => ({
      docWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    const hasHorizontalOverflow =
      scrollInfo.docWidth > scrollInfo.innerWidth + 1 ||
      scrollInfo.bodyWidth > scrollInfo.innerWidth + 1;
    expect(hasHorizontalOverflow, `Horizontal scroll detected on ${pageItem.name}`).toBe(false);

    // 2. H1 Fully Visible at Load Check
    const h1Count = await page.locator('h1').count();
    if (h1Count > 0) {
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      const h1Box = await h1.boundingBox();
      if (h1Box) {
        expect(h1Box.y, `H1 top should be inside viewport on ${pageItem.name}`).toBeGreaterThanOrEqual(0);
        expect(h1Box.y, `H1 top should appear within the first screen on ${pageItem.name}`).toBeLessThan(vpHeight);
      }
    }

    // 3. Interactive elements >= 44x44 (excluding inline text links)
    const smallInteractives = await page.evaluate(() => {
      const issues: { text: string; tag: string; width: number; height: number }[] = [];
      const interactives = Array.from(
        document.querySelectorAll('a, button, input, select, textarea, [role="button"], summary')
      );

      for (const el of interactives) {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
        if (el.closest('[aria-hidden="true"]')) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        if (el.classList.contains('sr-only') || el.closest('.sr-only') || (rect.width <= 1 && rect.height <= 1)) continue;

        if (el.tagName.toLowerCase() === 'input' && ['checkbox', 'radio'].includes((el as HTMLInputElement).type)) {
          const label = el.closest('label');
          if (label) {
            const lRect = label.getBoundingClientRect();
            if (lRect.width >= 43 && lRect.height >= 43) continue;
          }
        }

        const isInlineLink =
          el.tagName.toLowerCase() === 'a' &&
          (style.display === 'inline' ||
            Boolean(el.closest('nav[aria-label*="readcrumb"], [aria-label*="Breadcrumb"], .breadcrumb')) ||
            (el.parentElement &&
              ['P', 'LI', 'BLOCKQUOTE', 'SMALL', 'SPAN'].includes(el.parentElement.tagName) &&
              !el.className.includes('btn') &&
              !el.className.includes('button')));

        if (!isInlineLink) {
          // Allow small subpixel leeway (43.0px)
          if (rect.width < 43 || rect.height < 43) {
            const text = (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30);
            issues.push({
              tag: el.tagName.toLowerCase(),
              text,
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            });
          }
        }
      }
      return issues;
    });
    expect(smallInteractives.length, `Found small tap targets on ${pageItem.name}: ${JSON.stringify(smallInteractives.slice(0, 3))}`).toBe(0);

    // 4. Input font-size >= 16px
    const smallInputs = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      const issues: { name: string; size: string }[] = [];
      for (const inp of inputs) {
        const style = window.getComputedStyle(inp);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        const fontSize = parseFloat(style.fontSize);
        if (fontSize < 15.5) {
          issues.push({
            name: (inp as HTMLInputElement).name || inp.id || 'input',
            size: `${fontSize}px`,
          });
        }
      }
      return issues;
    });
    expect(smallInputs.length, `Found inputs with font < 16px on ${pageItem.name}: ${JSON.stringify(smallInputs)}`).toBe(0);

    // 5. Bottom bar does not overlap main call-to-action
    const overlapIssue = await page.evaluate((height) => {
      const bottomBar = document.querySelector('div.fixed.bottom-0');
      if (!bottomBar) return false;
      const barRect = bottomBar.getBoundingClientRect();
      if (barRect.height === 0 || barRect.top >= height) return false;

      // Look for the main hero or header CTA
      const mainCta = document.querySelector('section a[href="/book-a-call"], main a[href="/book-a-call"]');
      if (!mainCta) return false;
      const ctaRect = mainCta.getBoundingClientRect();

      // Check if bounding boxes intersect
      const overlaps = !(
        ctaRect.bottom <= barRect.top ||
        ctaRect.top >= barRect.bottom ||
        ctaRect.right <= barRect.left ||
        ctaRect.left >= barRect.right
      );
      return overlaps;
    }, vpHeight);
    expect(overlapIssue, `Bottom bar overlaps main CTA on ${pageItem.name}`).toBe(false);

    // 6. Combined fixed UI <= 20% of viewport height
    const fixedRatio = await page.evaluate(() => {
      const header = document.querySelector('header.fixed');
      const bottomBar = document.querySelector('div.fixed.bottom-0');
      let combined = 0;
      if (header) {
        const style = window.getComputedStyle(header);
        if (style.display !== 'none' && style.visibility !== 'hidden') {
          combined += header.getBoundingClientRect().height;
        }
      }
      if (bottomBar) {
        const style = window.getComputedStyle(bottomBar);
        if (style.display !== 'none' && style.visibility !== 'hidden') {
          combined += bottomBar.getBoundingClientRect().height;
        }
      }
      return combined / window.innerHeight;
    });
    expect(fixedRatio, `Combined fixed UI should not exceed 20% of viewport (${(fixedRatio * 100).toFixed(1)}%)`).toBeLessThanOrEqual(0.205);

    // 7. Screenshot saving
    const safeProjectName = testInfo.project.name.replace(/\s+/g, '-').toLowerCase();
    const screenshotPath = path.join(process.cwd(), 'tests', 'screenshots', `${pageItem.name}-${safeProjectName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
  });
}
