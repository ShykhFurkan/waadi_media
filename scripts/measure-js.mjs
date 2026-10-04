import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const pages = [
  { name: 'Home page (/)', file: '.next/server/app/index.html' },
  { name: 'Service page (/services/website-design-development)', file: '.next/server/app/services/website-design-development.html' },
  { name: 'Pricing page (/pricing)', file: '.next/server/app/pricing.html' },
  { name: 'Case study (/work/wonder-delight-tours-travels)', file: '.next/server/app/work/wonder-delight-tours-travels.html' },
  { name: 'Blog post (/blog/how-much-does-a-website-cost-in-kashmir-2026-price-guide)', file: '.next/server/app/blog/how-much-does-a-website-cost-in-kashmir-2026-price-guide.html' },
];

for (const p of pages) {
  if (!fs.existsSync(p.file)) {
    console.log(p.name, 'NOT FOUND:', p.file);
    continue;
  }
  const html = fs.readFileSync(p.file, 'utf8');
  const matches = [...html.matchAll(/src="\/_next\/(static\/chunks\/[^"]+\.js)"/g)];
  const scriptPaths = [...new Set(matches.map(m => m[1]))];
  
  let rawBytes = 0;
  let gzipBytes = 0;

  for (const s of scriptPaths) {
    const full = path.join('.next', s);
    if (fs.existsSync(full)) {
      const buf = fs.readFileSync(full);
      rawBytes += buf.length;
      gzipBytes += zlib.gzipSync(buf).length;
    }
  }

  console.log(`=== ${p.name} ===`);
  console.log(`  Scripts loaded: ${scriptPaths.length}`);
  console.log(`  Total Raw JS: ${(rawBytes / 1024).toFixed(1)} KB`);
  console.log(`  Total Gzipped JS: ${(gzipBytes / 1024).toFixed(1)} KB`);
}

const htmlS = fs.readFileSync('.next/server/app/services/website-design-development.html', 'utf8');
const htmlH = fs.readFileSync('.next/server/app/index.html', 'utf8');
const sS = new Set([...htmlS.matchAll(/src="\/_next\/(static\/chunks\/[^"]+\.js)"/g)].map(m => m[1]));
const sH = new Set([...htmlH.matchAll(/src="\/_next\/(static\/chunks\/[^"]+\.js)"/g)].map(m => m[1]));
const diff = [...sS].filter(x => !sH.has(x));
console.log('\nExtra scripts on service page:');
diff.forEach(s => {
  const buf = fs.readFileSync(path.join('.next', s));
  console.log(' - ' + s + ' (' + (buf.length/1024).toFixed(1) + ' KB raw, ' + (zlib.gzipSync(buf).length/1024).toFixed(1) + ' KB gzip)');
});
