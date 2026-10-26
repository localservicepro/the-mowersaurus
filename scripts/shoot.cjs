// Usage: node scripts/shoot.cjs <path> <out.png> [width] [height] [full]
const { chromium } = require('playwright');
(async () => {
  const [, , path, out, w = '1440', h = '900', full = '1'] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('http://localhost:8080' + path, { waitUntil: 'load' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 140)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(600);
  await p.screenshot({ path: out, fullPage: full === '1' });
  console.log(JSON.stringify({ errs: errs.filter(e => !/ERR_FAILED|net::/.test(e)), w: await p.evaluate(() => [document.documentElement.scrollWidth, innerWidth]) }));
  await b.close();
})();
