// Static site build: node build.mjs → dist/
import { mkdirSync, writeFileSync, rmSync, cpSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { layout } from './src/layout.mjs';
import { SITE } from './src/data.mjs';
import home from './src/pages/home.mjs';
import services from './src/pages/services.mjs';
import other from './src/pages/other.mjs';

const OUT = 'dist';

// Every old Wix URL → its closest new page (301). Kept-as-is URLs are not listed.
export const REDIRECTS = [
  ['/home', '/'],
  ['/copy-of-lawn-mowing', '/'], // Pressure washing x window washing (dropped service)
  ['/copy-of-pressure-washing-x-window-was-1', '/'], // Gutter cleaning (dropped service)
  ['/copy-of-pressure-washing-x-window-was', '/'], // Combination packages
  ['/hedging', '/gardening/'],
  ['/gardening-x-landscaping', '/gardening/'],
  ['/book-online', '/contact/'],
  ['/service-page/quote-request', '/contact/'],
  ['/service-page/*', '/contact/'],
  ['/inquiry-services-page', '/contact/'],
  ['/terms-conditions', '/privacy-policy/'],
  ['/blank', '/'],
];
// Old URLs that keep the same path (now with a trailing slash): /lawn-mowing, /types-of-turf,
// /weed-control, /fertilizing, /faq, /privacy-policy. Hosts add the slash automatically.

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('public', OUT, { recursive: true });

const pages = [home, ...services, ...other].map((fn) => fn());
for (const p of pages) {
  const html = layout(p);
  const file = p.file ? join(OUT, p.file) : join(OUT, p.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex);
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === '/' ? '1.0' : p.path.split('/').length > 3 ? '0.6' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

// Netlify (_redirects) — also understood by Cloudflare Pages.
writeFileSync(join(OUT, '_redirects'), [
  '# Old Wix URLs → new pages (301)',
  ...REDIRECTS.flatMap(([from, to]) => from.includes('*') ? [`${from}  ${to}  301`] : [`${from}  ${to}  301`, `${from}/  ${to}  301`]),
  '',
].join('\n'));

// Vercel
writeFileSync('vercel.json', JSON.stringify({
  cleanUrls: false, trailingSlash: true, outputDirectory: OUT, buildCommand: 'node build.mjs',
  redirects: REDIRECTS.flatMap(([from, to]) => from.includes('*')
    ? [{ source: from.replace('/*', '/:path*'), destination: to, statusCode: 301 }]
    : [{ source: from, destination: to, statusCode: 301 }, { source: `${from}/`, destination: to, statusCode: 301 }]),
}, null, 2) + '\n');

console.log(`Built ${pages.length} pages → ${OUT}/`);
