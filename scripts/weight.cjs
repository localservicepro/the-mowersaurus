// Page weight: bytes loaded on first view vs after scrolling the whole page.
const { chromium, devices } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [label, ctxOpts] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['mobile', devices['iPhone 13']]]) {
    for (const path of (process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/projects/'])) {
      const ctx = await b.newContext(ctxOpts); const p = await ctx.newPage();
      await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
      let bytes = 0, n = 0; const byType = {};
      p.on('response', async (r) => { try { const len = (await r.body()).length; bytes += len; n++; const t = (r.headers()['content-type'] || '').split('/')[0]; byType[t] = (byType[t] || 0) + len; } catch {} });
      await p.goto('http://localhost:8080' + path, { waitUntil: 'networkidle' });
      const first = bytes;
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
      await p.waitForLoadState('networkidle');
      console.log(`${label.padEnd(8)} ${path.padEnd(12)} first view ${(first / 1024).toFixed(0)} KB · fully scrolled ${(bytes / 1024).toFixed(0)} KB (${n} requests) · images ${((byType.image || 0) / 1024).toFixed(0)} KB`);
      await ctx.close();
    }
  }
  await b.close();
})();
