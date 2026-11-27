// Functional browser checks for the built site (run with scripts/serve.mjs on :8080).
const { chromium, devices } = require('playwright');
const BASE = 'http://localhost:8080';
const ok = (name, cond, extra = '') => console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`);

(async () => {
  const b = await chromium.launch();
  const block = (p) => p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());

  // ---------- desktop
  const d = await b.newPage({ viewport: { width: 1440, height: 900 } }); await block(d);
  await d.goto(BASE + '/');
  await d.hover('.nav-trigger');
  await d.waitForTimeout(300);
  ok('Services dropdown opens on hover', await d.$eval('.dropdown-panel', (e) => getComputedStyle(e).visibility === 'visible'));
  await d.mouse.move(5, 500); await d.waitForTimeout(300);
  await d.click('.nav-trigger');
  ok('Services dropdown opens on click', await d.$eval('.nav-dropdown', (e) => e.classList.contains('open')));
  await d.keyboard.press('Escape');
  ok('Dropdown closes on Escape', !(await d.$eval('.nav-dropdown', (e) => e.classList.contains('open'))));
  ok('Dropdown lists All Services + 6 services', (await d.$$('.dropdown-panel .dd-item')).length === 7);

  // tier CTA opens the pop-up with service + tier pre-filled
  await d.click('#panel-lawn .tier.featured [data-quote-modal]');
  await d.waitForTimeout(500);
  ok('Great Lawn CTA opens pop-up', await d.$eval('#quote-modal', (x) => x.open));
  ok('Great Lawn CTA pre-selects Lawn Care Programs', (await d.$eval('#quote-form-modal select', (s) => s.value)) === 'Lawn Care Programs (Good, Great & Amazing)');
  ok('Great Lawn CTA notes tier', (await d.$eval('#quote-form-modal textarea', (t) => t.value)).includes('Great Lawn Program'));
  await d.keyboard.press('Escape'); await d.waitForTimeout(200);
  await d.click('#tab-garden');
  ok('Garden tab shows garden tiers', await d.$eval('#panel-garden', (e) => !e.hidden));
  await d.click('#panel-garden .tier [data-quote-modal]'); await d.waitForTimeout(400);
  ok('Garden CTA pre-selects Garden Maintenance Programs', (await d.$eval('#quote-form-modal select', (s) => s.value)) === 'Garden Maintenance Programs');
  await d.keyboard.press('Escape'); await d.waitForTimeout(200);
  await d.evaluate(() => { document.querySelector('#quote-form-modal').reset(); });

  // form validation + submit + redirect
  await d.fill('#quote-form textarea', '');
  await d.click('#quote-form button[type=submit]');
  ok('Empty submit blocked with errors', (await d.$$('#quote-form .field.invalid')).length >= 3 && d.url().endsWith('/') || d.url().includes('#quote'));
  await d.fill('#quote-form [name=full_name]', 'Test Person');
  await d.fill('#quote-form [name=phone]', '0400 000 000');
  await d.fill('#quote-form [name=email]', 'test@example.com');
  await d.fill('#quote-form [name=property_address]', 'Templestowe VIC');
  await d.fill('#quote-form [name=property_size]', '350 m2');
  await d.selectOption('#quote-form [name=service_needed]', { label: 'Lawn Mowing & Overgrown Lawn Cuts' });
  await d.fill('#quote-form [name=job_notes]', 'Browser test');
  const names = await d.$$eval('#quote-form [name]', (els) => els.map((e) => e.name));
  ok('GHL field names present', ['full_name', 'email', 'phone', 'property_address', 'property_size', 'service_needed', 'job_notes'].every((n) => names.includes(n)), names.join(','));
  let submitEvent = false;
  await d.exposeFunction('__sub', () => { submitEvent = true; });
  await d.evaluate(() => document.querySelector('#quote-form').addEventListener('submit', () => window.__sub()));
  await Promise.all([d.waitForURL('**/thank-you/', { timeout: 5000 }), d.click('#quote-form button[type=submit]')]);
  ok('Valid submit fires submit event (for tracking script)', submitEvent);
  ok('Valid submit redirects to /thank-you/', d.url().endsWith('/thank-you/'));
  ok('Thank-you page is noindex', (await d.$eval('meta[name=robots]', (m) => m.content)).includes('noindex'));

  // quote pop-up (header + hero buttons)
  await d.goto(BASE + '/');
  await d.click('.nav-actions [data-quote-modal]'); await d.waitForTimeout(400);
  ok('Header Get a Quote opens pop-up form', await d.$eval('#quote-modal', (x) => x.open));
  await d.keyboard.press('Escape'); await d.waitForTimeout(200);
  ok('Pop-up closes on Escape', !(await d.$eval('#quote-modal', (x) => x.open)));
  await d.click('.hero [data-quote-modal]'); await d.waitForTimeout(400);
  ok('Hero Get a Free Quote opens pop-up form', await d.$eval('#quote-modal', (x) => x.open));
  await d.click('#quote-modal [data-close-modal]'); await d.waitForTimeout(200);
  ok('Pop-up closes on X', !(await d.$eval('#quote-modal', (x) => x.open)));
  await d.goto(BASE + '/lawn-renovation/');
  await d.click('.nav-actions [data-quote-modal]'); await d.waitForTimeout(300);
  ok('Pop-up pre-selects the page service', (await d.$eval('#quote-form-modal select', (s) => s.value)) === 'Lawn Renovation & Aeration');
  await d.fill('#quote-form-modal [name=full_name]', 'Test'); await d.fill('#quote-form-modal [name=phone]', '0400000000');
  await d.fill('#quote-form-modal [name=email]', 't@example.com'); await d.fill('#quote-form-modal [name=property_address]', 'Eltham VIC');
  await Promise.all([d.waitForURL('**/thank-you/', { timeout: 5000 }), d.click('#quote-form-modal button[type=submit]')]);
  ok('Pop-up submit redirects to /thank-you/', d.url().endsWith('/thank-you/'));
  // page-ready time: main thread must not be blocked by the map pre-computation
  await d.goto(BASE + '/');
  const dcl = await d.evaluate(() => Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd));
  ok('Homepage DOMContentLoaded under 1s (local)', dcl < 1000, dcl + 'ms');

  // service-page pre-select on load
  await d.goto(BASE + '/lawn-renovation/');
  ok('Service page form pre-selects its service', (await d.$eval('#quote-form select', (s) => s.value)) === 'Lawn Renovation & Aeration');
  await d.goto(BASE + '/contact/?service=mulching-landscaping');
  ok('?service= query pre-selects', (await d.$eval('#quote-form select', (s) => s.value)) === 'Mulching & Small Landscaping');
  ok('GBP map iframe present, lazy', await d.$eval('.map-embed iframe', (f) => f.getAttribute('loading') === 'lazy' && f.src.includes('0x1f581ba04b608a80')));

  // map animation
  await d.goto(BASE + '/service-areas/');
  await d.locator('[data-area-map]').scrollIntoViewIfNeeded();
  const t0 = await d.$eval('#map-mower', (m) => m.getAttribute('transform'));
  await d.waitForTimeout(9000);
  const t1 = await d.$eval('#map-mower', (m) => m.getAttribute('transform'));
  const lit = await d.$$eval('.area-map .sub.lit', (e) => e.length);
  ok('Map mower moves', t0 !== t1, t1);
  ok('Map suburbs light up as mower arrives', lit > 0 && lit < 19, `${lit} lit after 9s`);

  // projects: gallery filter, lightbox, reel lazy
  await d.goto(BASE + '/projects/');
  const total = (await d.$$('.gallery .g-item')).length;
  await d.click('[data-filter=hedging]');
  const vis = await d.$$eval('.gallery .g-item', (els) => els.filter((e) => !e.hidden).length);
  ok('Gallery filter (Hedging)', vis > 0 && vis < total, `${vis}/${total}`);
  for (const [k] of [['lawn-programs'], ['lawn-renovation'], ['mowing'], ['garden'], ['mulching'], ['commercial']]) {
    await d.click(`[data-filter=${k}]`);
    const n = await d.$$eval('.gallery .g-item', (els) => els.filter((e) => !e.hidden).length);
    ok(`  filter ${k} has photos`, n > 0, String(n));
  }
  await d.click('[data-filter=all]');
  await d.click('.gallery .g-item button');
  ok('Lightbox opens', await d.$eval('dialog.lightbox', (x) => x.open));
  await d.keyboard.press('ArrowRight');
  await d.keyboard.press('Escape');
  ok('Lightbox closes on Escape', !(await d.$eval('dialog.lightbox', (x) => x.open)));
  ok('Before/after sliders on projects', (await d.$$('.ba-frame')).length >= 12);

  // reduced motion
  const rm = await b.newContext({ reducedMotion: 'reduce', viewport: { width: 1200, height: 900 } });
  const r = await rm.newPage(); await block(r);
  await r.goto(BASE + '/service-areas/');
  await r.waitForTimeout(800);
  const litRM = await r.$$eval('.area-map .sub.lit', (e) => e.length);
  const m1 = await r.$eval('#map-mower', (m) => m.getAttribute('transform'));
  await r.waitForTimeout(1500);
  ok('Reduced motion: map fully lit & static', litRM === 19 && m1 === (await r.$eval('#map-mower', (m) => m.getAttribute('transform'))), `${litRM} lit`);
  await rm.close();

  // ---------- mobile (touch)
  const mc = await b.newContext({ ...devices['iPhone 13'] });
  const m = await mc.newPage(); await block(m);
  await m.goto(BASE + '/');
  const heroFit = await m.evaluate(() => { const r = document.querySelector('.hero .lead').getBoundingClientRect(); const h = document.querySelector('.hero h1').getBoundingClientRect(); return { h1Top: Math.round(h.top), leadBottom: Math.round(r.bottom), vh: innerHeight }; });
  ok('Mobile hero: H1 and lead visible on first screen', heroFit.h1Top >= 0 && heroFit.leadBottom <= heroFit.vh, JSON.stringify(heroFit));
  ok('No sticky bottom bar on mobile', !(await m.$('.mbar')));
  ok('Mobile header shows call button', await m.$eval('.nav-actions .nav-phone', (a) => a.href === 'tel:+61459960501' && a.getBoundingClientRect().width > 0));
  ok('Mobile header shows Get a Quote', await m.$eval('.nav-actions [data-quote-modal]', (a) => a.getBoundingClientRect().width > 0));
  ok('Hero buttons side by side on mobile', await m.evaluate(() => { const [a, b] = document.querySelectorAll('.hero .btn-row .btn'); return Math.abs(a.getBoundingClientRect().top - b.getBoundingClientRect().top) < 2; }));
  ok('Mobile hero: buttons visible on first screen too', await m.evaluate(() => document.querySelector('.hero .btn-row').getBoundingClientRect().bottom <= innerHeight));
  ok('No horizontal scroll on mobile', await m.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await m.tap('.nav-burger');
  await m.waitForTimeout(400);
  ok('Burger opens mobile menu', await m.$eval('#mobile-menu', (e) => e.classList.contains('open')));
  await m.tap('#mobile-menu .acc');
  ok('Mobile Services accordion expands', await m.$eval('#mobile-menu .acc', (e) => e.getAttribute('aria-expanded') === 'true'));
  await m.tap('.nav-burger');
  // touch-drag a before/after slider
  const fr = m.locator('.ba-frame').first();
  await fr.scrollIntoViewIfNeeded();
  const box = await fr.boundingBox();
  const cdp = await mc.newCDPSession(m);
  const y = box.y + box.height / 2;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + box.width * 0.5, y }] });
  for (let i = 1; i <= 8; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: box.x + box.width * (0.5 - i * 0.05), y }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await m.waitForTimeout(200);
  const pos = await fr.evaluate((e) => e.style.getPropertyValue('--pos'));
  ok('Before/after slider drags on touch', pos && parseFloat(pos) < 40, pos);
  await m.tap('.nav-actions [data-quote-modal]');
  await m.waitForTimeout(600);
  ok('Mobile header quote button opens pop-up', await m.$eval('#quote-modal', (x) => x.open));
  await mc.close();
  await b.close();
})();
