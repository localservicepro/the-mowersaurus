import { SITE, SERVICES, SERVICE_OPTIONS, SUBURBS, MAP_ROUTE, TIER_SCOPE, LAWN_PRICING, REEL, svc } from './data.mjs';
import media from './media.json' with { type: 'json' };

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ------------------------------------------------------------------ icons
// Simple stroked 24×24 icons, drawn for this site.
const P = {
  lawn: '<path d="M3 20h18M5 20c0-4 1-7 2-9M9 20c0-5 1-9 3-12M13 20c0-4 1.5-7 3-9M17 20c0-3 .7-5 2-7"/>',
  mower: '<path d="M4 15h11l2-5h-9l-1 5"/><circle cx="7" cy="18" r="2"/><circle cx="15" cy="18" r="2"/><path d="M17 10 20 4"/>',
  shears: '<circle cx="6" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M8 15 18 4M15 15 5 4"/>',
  leaf: '<path d="M5 19c9 1 14-5 14-14C10 5 5 10 5 19Z"/><path d="M5 19 13 11"/>',
  mulch: '<path d="M3 18h18"/><path d="M5 18c1-3 3-4 5-4s3 1 4 0 3-2 5 4"/><path d="M12 14V7m0 0c-2 0-4-1-4-3 2 0 4 1 4 3Zm0 0c2 0 4-1 4-3-2 0-4 1-4 3Z"/>',
  aerate: '<path d="M3 9h18"/><path d="M6 9v7M10 9v9M14 9v7M18 9v9"/><path d="M5 5h14"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  cap: '<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  home: '<path d="M4 11 12 4l8 7v9H4v-9Z"/><path d="M10 20v-6h4v6"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  sprout: '<path d="M12 20v-8"/><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6Zm0 0c0-3 2-5 6-5 0 3-2 5-6 5Z"/>',
  bug: '<rect x="8" y="7" width="8" height="12" rx="4"/><path d="M12 7V4M4 11h4M16 11h4M5 17l3-2M19 17l-3-2M9 4l1.5 2M15 4l-1.5 2"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  arrows: '<path d="m9 7-5 5 5 5M15 7l5 5-5 5"/>',
  google: '<path d="M19 12.5a7 7 0 1 1-2.1-5"/><path d="M12.5 12H19"/>',
  play: '<path d="M8 5v14l11-7L8 5Z" fill="currentColor"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  google_unused: '<path d="M20 12.2c0-.6 0-1.2-.2-1.7H12v3.3h4.5a3.8 3.8 0 0 1-1.7 2.5v2h2.7c1.6-1.5 2.5-3.6 2.5-6.1Z"/><path d="M12 20.5c2.3 0 4.2-.8 5.5-2.1l-2.7-2a5 5 0 0 1-7.5-2.7H4.6v2.1A8.5 8.5 0 0 0 12 20.5Z"/><path d="M7.3 13.7a5 5 0 0 1 0-3.4V8.2H4.6a8.5 8.5 0 0 0 0 7.6l2.7-2.1Z"/><path d="M12 6.9c1.3 0 2.4.4 3.3 1.3l2.5-2.4A8.5 8.5 0 0 0 4.6 8.2l2.7 2.1A5 5 0 0 1 12 6.9Z"/>',
};
export const icon = (name, cls = '') =>
  `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;
const caret = '<svg class="caret" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

// Grass-tuft ground line echoing the tuft behind the wordmark.
export const grassEdge = (fill = '#fff', flip = false) => `<svg class="grass-edge${flip ? ' flip' : ''}" viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true"><path fill="${fill}" d="M0 28V18l14-4 6-12 6 12 16-6 6-6 4 10 18-2 8-8 5 9 20 1 10-9 4 9 22-3 7-7 5 8 16 1 9-10 6 11 20-2 6-8 5 8 19 0 9-11 5 11 17-1 8-9 6 9 21-2 7-8 4 9 18 0 10-10 5 10 20-3 6-6 5 8 17 2 9-11 6 11 18-1 7-8 5 8 20-2 8-9 5 10 18 0 9-9 5 9 21-3 7-7 4 9 19 1 9-10 6 10 20-2 6-8 5 8 18 0 10-11 5 11 17-1 8-9 6 9 21-2 7-8 4 9 18 0 10-10 5 10 20-3 6-6 5 8 17 2 9-11 6 11 18-1 7-8 5 8 20-2 8-9 5 10 18 0 9-9 5 9 21-3 7-7 4 9 19 1 9-10 6 10 20-2 6-8 5 8 18 0 10-11 5 11 17-1 8-9 6 9 21-2 7-8 4 9 18 0 10-10 5 10 20-3 6-6 5 8 17 2 9-11 6 11 18-1 7-8 5 8 14 0V28Z"/></svg>`;

// ------------------------------------------------------------------ images
const imgByAlt = (alt) => esc(alt);
export function picture(set, alt, { sizes = '(min-width: 900px) 50vw, 100vw', eager = false, cls = '' } = {}) {
  const srcset = set.map((s) => `${s.src} ${s.w}w`).join(', ');
  const big = set[0];
  return `<img${cls ? ` class="${cls}"` : ''} src="${big.src}" srcset="${srcset}" sizes="${sizes}" width="${big.w}" height="${big.h}" alt="${imgByAlt(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
export const work = (slug) => {
  const g = media.gallery.find((x) => x.slug === slug);
  if (!g) throw new Error('missing gallery image ' + slug);
  return g;
};
export const workImg = (slug, opts) => { const g = work(slug); return picture(g.img, g.alt, opts); };
export const pair = (slug) => {
  const p = media.pairs.find((x) => x.slug === slug);
  if (!p) throw new Error('missing pair ' + slug);
  return p;
};

export function baSlider(slug, { heading = 'h3' } = {}) {
  const p = pair(slug);
  const sizes = '(min-width: 1100px) 380px, (min-width: 760px) 50vw, 48vw'; // mobile: capped so 3x screens don't pull 960px images
  const s = svc(p.service);
  return `<figure class="ba reveal">
  <div class="ba-frame">
    ${picture(p.after_img, `After: ${p.alt} (${p.suburb})`, { sizes, cls: 'ba-after' })}
    <div class="ba-before">${picture(p.before_img, `Before: ${p.alt} (${p.suburb})`, { sizes })}</div>
    <span class="ba-tag b">Before</span><span class="ba-tag a">After</span>
    <span class="ba-line"></span>
    <input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after: ${esc(p.title)}">
    <span class="ba-knob">${icon('arrows')}</span>
  </div>
  <figcaption><${heading === 'h3' ? 'strong' : 'strong'}>${esc(p.title)}</strong><span>${esc(p.suburb)} · <a href="${s.path}">${esc(s.short)}</a></span></figcaption>
</figure>`;
}

// ------------------------------------------------------------------ header
const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Lawn Programs', href: '/lawn-care-programs/' },
  { label: 'Garden Programs', href: '/garden-maintenance-programs/' },
  { label: 'Services', dropdown: true, href: '/services/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

function ddItems(cls = 'dd-item') {
  return `<a class="${cls} all" href="/services/"><span class="dd-icon">${icon('grid')}</span><span class="dd-text"><strong>All Services</strong><em>Complete lawn &amp; garden care across Melbourne's north east</em></span></a>` +
    SERVICES.map((s) => `<a class="${cls}" href="${s.path}"><span class="dd-icon">${icon(s.icon)}</span><span class="dd-text"><strong>${esc(s.short)}</strong><em>${esc(s.descriptor)}</em></span></a>`).join('');
}

export function header(path) {
  const cur = (href) => (href === path || (href !== '/' && path.startsWith(href)) ? ' aria-current="page"' : '');
  const links = NAV.map((n) => n.dropdown
    ? `<div class="nav-dropdown"><button class="nav-link nav-trigger" aria-expanded="false" aria-controls="services-menu"${SERVICES.some((s) => s.path === path) || path === '/services/' ? ' aria-current="page"' : ''}>Services ${caret}</button><div class="dropdown-panel" id="services-menu">${ddItems()}</div></div>`
    : `<a class="nav-link" href="${n.href}"${cur(n.href)}>${n.label}</a>`).join('');
  const mobile = NAV.map((n) => n.dropdown
    ? `<button class="acc" aria-expanded="false">Services ${caret}</button><div class="acc-body"><a href="/services/">All Services</a>${SERVICES.map((s) => `<a href="${s.path}">${esc(s.name)}</a>`).join('')}</div>`
    : `<a href="${n.href}"${cur(n.href)}>${n.label}</a>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="wrap">
  <ul><li>${icon('shield')}Fully insured · residential &amp; commercial</li><li class="tb-extra">${icon('cap')}Qualified horticulturalists</li></ul>
  <ul class="tb-extra"><li>${icon('clock')}${SITE.hours}</li><li>${icon('pin')}Based in ${SITE.locationLine}</li></ul>
</div></div>
<header class="site-header" id="top">
  <div class="nav-inner">
    <a href="/" class="brand"><img src="/img/brand/logo-on-white.webp" width="447" height="324" alt="The Mowersaurus home"></a>
    <nav class="nav-main" aria-label="Main navigation">${links}</nav>
    <div class="nav-actions">
      <a href="${SITE.phoneHref}" class="nav-phone" data-track="call">${icon('phone')}<span class="num">${SITE.phone}</span><span class="sr-only">Call ${SITE.phone}</span></a>
      <a href="#quote" class="btn btn-primary" data-quote-modal>Get a Quote</a>
    </div>
    <button class="nav-burger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
  </div>
</header>
<nav class="mobile-panel" id="mobile-menu" aria-label="Mobile navigation">${mobile}
  <a class="btn btn-primary" href="#quote" data-quote-modal>Get a Quote</a>
  <a class="btn btn-ghost" href="${SITE.phoneHref}">${icon('phone')} Call ${SITE.phone}</a>
</nav>`;
}

// ------------------------------------------------------------------ footer
export function footer() {
  const svcLinks = SERVICES.map((s) => `<li><a href="${s.path}">${esc(s.name)}</a></li>`).join('');
  const subs = SUBURBS.map((s) => `<li>${s.page && s.page.startsWith('/service-areas/') ? `<a href="${s.page}">${s.name}</a>` : s.name}</li>`).join('');
  return `<footer class="site-footer">
  ${grassEdge('#142A17', true).replace('class="grass-edge flip"', 'class="grass-edge flip" style="margin-top:-27px;position:relative"')}
  <div class="wrap footer-top">
    <div>
      <img class="footer-logo" src="/img/brand/logo-on-dark.webp" width="340" height="243" alt="The Mowersaurus" loading="lazy">
      <p style="margin-top:16px">Horticulturalist-run lawn care and garden maintenance programs for homes and businesses across Melbourne's north east. Founded in ${SITE.founded} by ${SITE.founder}.</p>
      <p class="insured">${icon('shield')}Fully insured, residential &amp; commercial</p>
      <div class="socials">
        <a href="${SITE.facebook}" rel="noopener" target="_blank" aria-label="The Mowersaurus on Facebook">${icon('facebook')}</a>
        <a href="${SITE.instagram}" rel="noopener" target="_blank" aria-label="The Mowersaurus on Instagram">${icon('instagram')}</a>
        <a href="${SITE.gbp}" rel="noopener" target="_blank" aria-label="The Mowersaurus on Google">${icon('google')}</a>
      </div>
    </div>
    <div>
      <h2>Services</h2>
      <ul>${svcLinks}<li><a href="/projects/">Projects</a></li><li><a href="/faq/">FAQ</a></li></ul>
    </div>
    <div>
      <h2>Contact</h2>
      <ul>
        <li><a href="${SITE.phoneHref}" data-track="call">${SITE.phone}</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li>${SITE.locationLine}</li>
        <li>${SITE.hours}</li>
        <li><a href="/contact/">Get a free quote</a></li>
      </ul>
      <h2 style="margin-top:22px">Yard Tips</h2>
      <ul><li><a href="/types-of-turf/">Types of turf</a></li><li><a href="/weed-control/">Weed control</a></li><li><a href="/fertilizing/">Fertilising</a></li></ul>
    </div>
    <div>
      <h2><a href="/service-areas/">Service areas</a></h2>
      <ul class="footer-suburbs">${subs}</ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© ${new Date().getFullYear()} The Mowersaurus · ABN ${SITE.abn}</span>
    <span><a href="/privacy-policy/">Privacy policy</a></span>
  </div>
</footer>`;
}

// ------------------------------------------------------------------ quote form
export function quoteForm({ preselect = '', title = 'Get a free quote', idPrefix = 'q', formId = 'quote-form' } = {}) {
  const opts = SERVICE_OPTIONS.map((o) => `<option${o === preselect ? ' selected' : ''}>${esc(o)}</option>`).join('');
  const f = (id) => `${idPrefix}-${id}`;
  return `<div class="quote-card">
  <h2>${title}</h2>
  <p class="note">Tell us about your property and we'll be in touch, usually within 2 hours on business days.</p>
  <form class="qf" id="${formId}" action="/thank-you/" method="post" novalidate data-quote-form>
    <div class="field"><label for="${f('name')}">Name <span class="req">*</span></label><input id="${f('name')}" name="full_name" autocomplete="name" required><p class="err">Please enter your name.</p></div>
    <div class="field"><label for="${f('phone')}">Phone <span class="req">*</span></label><input id="${f('phone')}" name="phone" type="tel" autocomplete="tel" inputmode="tel" required pattern="[0-9 +()-]{8,}"><p class="err">Please enter a phone number we can call.</p></div>
    <div class="field full"><label for="${f('email')}">Email <span class="req">*</span></label><input id="${f('email')}" name="email" type="email" autocomplete="email" required><p class="err">Please enter a valid email.</p></div>
    <div class="field full"><label for="${f('addr')}">Property address <span class="req">*</span></label><input id="${f('addr')}" name="property_address" autocomplete="street-address" required><p class="err">We need the suburb at least, to check it's in our area.</p></div>
    <div class="field"><label for="${f('size')}">Property size</label><input id="${f('size')}" name="property_size" placeholder="e.g. 350 m² or quarter-acre"></div>
    <div class="field"><label for="${f('svc')}">Service needed <span class="req">*</span></label><select id="${f('svc')}" name="service_needed" required><option value=""${preselect ? '' : ' selected'} disabled>Choose a service</option>${opts}</select><p class="err">Please choose a service.</p></div>
    <div class="field full"><label for="${f('notes')}">Job notes</label><textarea id="${f('notes')}" name="job_notes" placeholder="Anything we should know: lawn type, access, how often, what's bugging you about the yard…"></textarea></div>
    <div class="hp" aria-hidden="true"><label for="${f('website')}">Website</label><input id="${f('website')}" name="website" tabindex="-1" autocomplete="off"></div>
    <div class="full"><button class="btn btn-primary" type="submit">Request my free quote</button></div>
    <p class="form-foot full">${icon('shield')}<span>We only use your details to quote and book your job. See our <a href="/privacy-policy/">privacy policy</a>.</span></p>
  </form>
</div>`;
}

export function quoteSection({ preselect = '', heading = 'Ready for a lawn that looks after itself?', text = '' } = {}) {
  return `<section class="section quote-section" id="quote" aria-labelledby="quote-h">
  <div class="wrap grid-2">
    <div>
      <span class="eyebrow" style="color:var(--tan)">Free quote</span>
      <h2 id="quote-h">${heading}</h2>
      <p class="lead">${text || "Tell us what's going on with your lawn or garden and which level of care you're after. We'll come back with a clear quote, no pressure."}</p>
      <ul class="contact-list">
        <li><span class="ic">${icon('phone')}</span><a href="${SITE.phoneHref}" data-track="call">${SITE.phone}</a></li>
        <li><span class="ic">${icon('mail')}</span><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><span class="ic">${icon('clock')}</span>${SITE.hours}</li>
        <li><span class="ic">${icon('pin')}</span>Servicing Melbourne's north east from ${SITE.locationLine}</li>
      </ul>
    </div>
    ${quoteForm({ preselect })}
  </div>
</section>`;
}

// ------------------------------------------------------------------ program tiers
const TIERS = [
  { key: 'good', name: 'Good', score: 7, pos: 'A tidy, healthy 7/10, built around your budget.', meter: 58 },
  { key: 'great', name: 'Great', score: 9, pos: 'Our specialty: a 9/10 for house-proud homeowners.', meter: 82, featured: true },
  { key: 'amazing', name: 'Amazing', score: 12, pos: 'Golf-course quality. Our cheeky "12 out of 10".', meter: 100 },
];
export function tierSection(kind, { headingLevel = 2, intro = true } = {}) {
  const isLawn = kind === 'lawn';
  const s = isLawn ? svc('lawn-care-programs') : svc('garden-maintenance-programs');
  const what = isLawn ? 'Lawn' : 'Garden';
  const H = `h${headingLevel}`;
  const h3 = `h${headingLevel + 1}`;
  const cards = TIERS.map((t) => `<article class="tier${t.featured ? ' featured' : ''} reveal">
    ${t.featured ? '<span class="badge orange flag">★ Most popular · our specialty</span>' : ''}
    <${h3}>${t.name} ${what} Program</${h3}>
    <div class="score" aria-label="${t.score} out of 10${t.score > 10 ? ' (brand language, not a literal rating)' : ''}"><b>${t.score}</b><span>/10</span></div>
    <div class="meter" aria-hidden="true"><i style="width:${t.meter}%"></i></div>
    <p class="pos">${t.pos}</p>
    ${isLawn ? `<p class="price">Indicative: <b>${LAWN_PRICING[t.key]}</b> / month<br><span class="note">for an average 350 m² lawn</span></p>` : ''}
    <a class="btn ${t.featured ? 'btn-primary' : 'btn-ghost'}" href="#quote" data-quote data-service="${esc(s.option)}" data-tier="${t.name} ${what} Program">Get a Quote</a>
  </article>`).join('');
  const scope = (isLawn ? TIER_SCOPE.lawn : TIER_SCOPE.garden).map((x) => `<li>${icon('check')}${x}</li>`).join('');
  return `<section class="tiers-wrap" aria-labelledby="tiers-${kind}">
  <div class="wrap">
    <div class="center">
      <span class="eyebrow">${what} programs</span>
      <${H} id="tiers-${kind}">${isLawn ? 'Good, Great & Amazing lawn care programs' : 'Good, Great & Amazing garden maintenance programs'}</${H}>
      ${intro ? `<p class="lead">Choose the result you want and we handle the rest. Every ${what.toLowerCase()} program is all-inclusive, so there's nothing to organise between visits.</p>` : ''}
    </div>
    <div class="tier-grid">${cards}</div>
    <ul class="scope" aria-label="Program scope">${scope}</ul>
    <p class="note center" style="margin-top:12px">Across the three levels, programs cover the work above. Exactly which treatments and visit frequency sit in each level will be confirmed by ${SITE.founder.split(' ')[0]} and listed here.</p>
    ${mixMatch()}
  </div>
</section>`;
}

export function mixMatch() {
  return `<div class="mix reveal">
    <div>
      <h3>Mix &amp; match lawn and garden</h3>
      <p class="muted" style="margin:0">Lawn and garden programs are chosen separately, so you only pay for the level you want in each part of the yard. One of our most common combinations is a Great Lawn Program with a Good Garden Program: a standout lawn, with tidy, healthy garden beds around it.</p>
    </div>
    <div class="combo" aria-label="Example combination">
      <span class="chip hl">Great Lawn<small>9/10 lawn</small></span><span class="plus" aria-hidden="true">+</span><span class="chip">Good Garden<small>7/10 garden</small></span>
    </div>
  </div>`;
}

// ------------------------------------------------------------------ misc blocks
export function faqBlock(items, { heading = 'Frequently asked questions', id = 'faq' } = {}) {
  return `<section class="section" aria-labelledby="${id}">
  <div class="wrap">
    <div class="center"><span class="eyebrow">FAQ</span><h2 id="${id}">${heading}</h2></div>
    <div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="ans">${a.startsWith('<') ? a : `<p>${a}</p>`}</div></details>`).join('')}</div>
  </div>
</section>`;
}

export function ctaBand({ heading = 'Want results like these?', text = 'Get a free quote for your lawn or garden, or give us a call.', service = '' } = {}) {
  return `<section class="cta-band"><div class="wrap">
    <div><h2>${heading}</h2><p>${text}</p></div>
    <div class="btn-row"><a class="btn btn-primary" href="#quote" data-quote${service ? ` data-service="${esc(service)}"` : ''}>Get a Quote</a><a class="btn btn-outline-light" href="${SITE.phoneHref}" data-track="call">${icon('phone')}${SITE.phone}</a></div>
  </div></section>`;
}

export function crumbs(trail) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map((t, i) => i === trail.length - 1 ? `<li><span aria-current="page">${esc(t.name)}</span></li>` : `<li><a href="${t.href}">${esc(t.name)}</a></li>`).join('')}</ol></nav>`;
}

export function pageHero({ trail, h1, lead, img, cta = true, service = '', byline = true }) {
  const g = img ? work(img) : null;
  return `<section class="page-hero${g ? '' : ' plain'}">
  ${g ? `<div class="hero-media">${picture(g.img, g.alt, { sizes: '100vw', eager: true })}</div>` : ''}
  <div class="wrap">
    ${crumbs(trail)}
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${cta ? `<div class="btn-row"><a class="btn btn-primary" href="#quote" data-quote${service ? ` data-service="${esc(service)}"` : ''}>Get a Quote</a><a class="btn btn-outline-light" href="${SITE.phoneHref}" data-track="call">${icon('phone')}Call ${SITE.phone}</a></div>` : ''}
    ${byline ? `<p class="byline">${icon('cap')}Written by ${SITE.founder}, qualified horticulturalist and founder of The Mowersaurus</p>` : ''}
  </div>
  <div class="hero-edge">${grassEdge('#fff')}</div>
</section>`;
}

export function related(keys) {
  return `<div class="related">${keys.map((k) => { const s = svc(k); return `<a href="${s.path}"><span class="dd-icon">${icon(s.icon)}</span>${esc(s.name)}</a>`; }).join('')}</div>`;
}

export function suburbList({ highlight = [], wide = false } = {}) {
  return `<ul class="suburb-list${wide ? ' wide' : ''}">${SUBURBS.map((s, i) => `<li class="${i < 4 || highlight.includes(s.name) ? 'prio' : ''}">${s.page ? `<a href="${s.page}">${s.name}</a>` : s.name}</li>`).join('')}</ul>`;
}

// ------------------------------------------------------------------ animated service-area map
// Stylised, not to scale: suburb centroids are projected onto a 1000×720 board.
export function areaMap() {
  const W = 1000, H = 720;
  const lng0 = 145.012, lng1 = 145.178, lat0 = -37.636, lat1 = -37.795;
  const X = (lng) => Math.round(70 + ((lng - lng0) / (lng1 - lng0)) * (W - 140));
  const Y = (lat) => Math.round(60 + ((lat - lat0) / (lat1 - lat0)) * (H - 120));
  const pts = Object.fromEntries(SUBURBS.map((s) => [s.name, [X(s.lng), Y(s.lat)]]));
  // Catmull-Rom → cubic Bézier through a list of points.
  const smooth = (R) => {
    let d = `M${R[0][0]} ${R[0][1]}`;
    for (let i = 0; i < R.length - 1; i++) {
      const p0 = R[i - 1] || R[i], p1 = R[i], p2 = R[i + 1], p3 = R[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    return d;
  };
  const d = smooth(MAP_ROUTE.map((n) => pts[n]));
  const ll = (arr) => smooth(arr.map(([la, lo]) => [X(lo), Y(la)]));
  // Simplified river courses (lat, lng waypoints).
  const yarra = ll([[-37.736, 145.205], [-37.738, 145.168], [-37.739, 145.145], [-37.745, 145.125], [-37.751, 145.100], [-37.758, 145.080], [-37.765, 145.058], [-37.772, 145.030], [-37.778, 144.995]]);
  const plenty = ll([[-37.615, 145.110], [-37.645, 145.112], [-37.672, 145.104], [-37.690, 145.098], [-37.706, 145.097], [-37.718, 145.110], [-37.732, 145.110], [-37.747, 145.112]]);
  const yLbl = [X(145.040), Y(-37.776)];
  const pLbl = [X(145.118), Y(-37.655)];
  // label placement tweaks to avoid collisions
  const off = { 'Watsonia': [-16, 26, 'end'], 'Watsonia North': [18, -14, 'start'], 'Greensborough': [16, 6, 'start'], 'Yallambie': [14, 22, 'start'], 'Viewbank': [-12, 28, 'end'], 'Macleod': [-16, 6, 'end'], 'Rosanna': [-16, 6, 'end'], 'Lower Plenty': [16, 6, 'start'], 'Montmorency': [0, -18, 'middle'], 'Bundoora': [-16, 6, 'end'], 'Lower Templestowe': [-16, 24, 'end'], 'Templestowe': [16, -10, 'start'], 'Doncaster': [0, 34, 'middle'], 'Doncaster East': [0, 34, 'middle'], 'Eltham': [16, 6, 'start'], 'St Helena': [16, 0, 'start'], 'Epping': [0, -18, 'middle'], 'Mill Park': [-16, 6, 'end'], 'South Morang': [16, -6, 'start'], 'Diamond Creek': [16, -8, 'start'] };
  const subs = SUBURBS.map((s, i) => {
    const [x, y] = pts[s.name];
    const [dx, dy, a] = off[s.name] || [14, 5, 'start'];
    const cls = ['sub', s.base ? 'base' : '', i < 4 ? 'prio' : ''].filter(Boolean).join(' ');
    return `<g class="${cls}" data-name="${s.name}" data-x="${x}" data-y="${y}" tabindex="0"><circle cx="${x}" cy="${y}" r="${s.base ? 12 : 9}"/><text x="${x + dx}" y="${y + dy}" text-anchor="${a}">${s.name}</text></g>`;
  }).join('');
  // Cartoon ride-on mower (no mascot), drawn facing +x; rotated along the path in JS.
  const mower = `<g class="mower" id="map-mower" transform="translate(${pts['Watsonia North'][0]} ${pts['Watsonia North'][1]})"><g transform="scale(1.5) translate(-22 -26)">
    <rect x="4" y="16" width="38" height="16" rx="6" fill="#8A8F94" stroke="#111" stroke-width="3"/>
    <rect x="10" y="6" width="14" height="13" rx="4" fill="#EA7724" stroke="#111" stroke-width="3"/>
    <path d="M30 16 L36 4" stroke="#111" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="4" r="3" fill="#111"/>
    <circle cx="12" cy="34" r="7" fill="#222" stroke="#111" stroke-width="3"/><circle cx="12" cy="34" r="2.5" fill="#EBC06A"/>
    <circle cx="35" cy="35" r="5" fill="#222" stroke="#111" stroke-width="3"/>
    <rect x="16" y="22" width="18" height="5" rx="2" fill="#59B548" stroke="#111" stroke-width="2"/>
  </g></g>`;
  const base = pts['Watsonia North'];
  return `<div class="area-map" data-area-map>
<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="map-t map-d">
  <title id="map-t">Map of The Mowersaurus service area</title>
  <desc id="map-d">A stylised map of Melbourne's north east. A ride-on mower drives out from Watsonia North and visits each suburb we service, which light up in orange.</desc>
  <defs>
    <pattern id="mow" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)"><rect width="30" height="60" fill="#5DB64C"/><rect x="30" width="30" height="60" fill="#52A842"/></pattern>
    <clipPath id="land-clip"><path d="M40 120 C 60 40, 260 20, 420 40 S 760 10, 900 70 S 990 260, 960 420 S 900 690, 700 690 S 360 700, 220 660 S 30 560, 40 400 S 20 200, 40 120Z"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="#F5F8EF"/>
  <path d="M40 120 C 60 40, 260 20, 420 40 S 760 10, 900 70 S 990 260, 960 420 S 900 690, 700 690 S 360 700, 220 660 S 30 560, 40 400 S 20 200, 40 120Z" fill="url(#mow)" stroke="#111" stroke-width="5"/>
  <g clip-path="url(#land-clip)" fill="none" stroke-linecap="round">
    <path d="${yarra}" stroke="#111" stroke-width="22"/><path d="${yarra}" stroke="#E9F3F5" stroke-width="15"/>
    <path d="${plenty}" stroke="#111" stroke-width="12"/><path d="${plenty}" stroke="#E9F3F5" stroke-width="6"/>
  </g>
  <text x="${yLbl[0]}" y="${yLbl[1]}" font-family="Nunito Sans, sans-serif" font-weight="800" font-size="16" fill="#142A17" transform="rotate(14 ${yLbl[0]} ${yLbl[1]})">Yarra River</text>
  <text x="${pLbl[0]}" y="${pLbl[1]}" font-family="Nunito Sans, sans-serif" font-weight="800" font-size="14" fill="#142A17">Plenty River</text>
  <path id="route" d="${d}" fill="none" stroke="#111" stroke-width="4" stroke-dasharray="1 12" stroke-linecap="round" opacity=".55"/>
  <circle cx="${base[0]}" cy="${base[1]}" r="34" fill="none" stroke="#326F36" stroke-width="4" stroke-dasharray="6 8" opacity=".7"/>
  ${subs}
  ${mower}
  <g transform="translate(${W - 92} 92)" aria-hidden="true"><circle r="34" fill="#fff" stroke="#111" stroke-width="4"/><path d="M0-24 8 4H-8Z" fill="#EA7724" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="M0 24-8-4H8Z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/><text y="-38" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="20" fill="#111">N</text></g>
</svg>
</div>
<div class="map-legend"><span><i style="background:#326F36"></i>Home base: Watsonia North</span><span><i style="background:#EA7724"></i>Suburb visited</span><span><i style="background:#EBC06A"></i>Coming up next</span><span class="muted">Stylised map, not to scale.</span></div>`;
}

// ------------------------------------------------------------------ schema
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    additionalType: ['https://en.wikipedia.org/wiki/Lawn', 'https://en.wikipedia.org/wiki/Landscaping'],
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    taxID: `ABN ${SITE.abn}`,
    description: "Horticulturalist-run lawn care and garden maintenance programs (Good, Great & Amazing) for residential and commercial properties across Melbourne's north east.",
    url: `${SITE.url}/`,
    telephone: SITE.phoneIntl,
    email: SITE.email,
    logo: `${SITE.url}/img/brand/logo-on-white.png`,
    image: `${SITE.url}/img/brand/og-image.jpg`,
    foundingDate: SITE.founded,
    founder: { '@type': 'Person', name: SITE.founder, jobTitle: 'Founder & qualified horticulturalist' },
    address: { '@type': 'PostalAddress', addressLocality: SITE.locality, addressRegion: SITE.region, postalCode: SITE.postcode, addressCountry: 'AU' },
    areaServed: SUBURBS.map((s) => ({ '@type': 'City', name: `${s.name}, VIC`, containedInPlace: { '@type': 'State', name: 'Victoria' } })),
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' }],
    sameAs: [SITE.gbp, SITE.facebook, SITE.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Lawn & garden services',
      itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${SITE.url}${s.path}` } })),
    },
  };
}
export function serviceSchema(s, areas) {
  return {
    '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, description: s.blurb,
    url: `${SITE.url}${s.path}`, provider: { '@id': `${SITE.url}/#business` },
    areaServed: areas.map((a) => ({ '@type': 'City', name: `${a}, VIC` })),
  };
}
export function faqSchema(items) {
  const strip = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };
}
export function breadcrumbSchema(trail) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${SITE.url}${t.href}` })) };
}

// ------------------------------------------------------------------ highlight reel
// Poster image paints first (LCP); site.js then attaches the right-sized silent loop and
// autoplays it while on screen. Skipped for reduced motion and Save-Data.
export function reelMedia({ eager = false, alt = 'The Mowersaurus team mowing, edging and hedge trimming on local jobs' } = {}) {
  const p = REEL.poster;
  return `<img class="reel-poster" src="${p[1280]}" srcset="${p[640]} 640w, ${p[1280]} 1280w" sizes="100vw" width="1280" height="720" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
    <video class="reel-video" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" data-reel-video
      data-720-webm="${REEL.loop[720].webm}" data-720-mp4="${REEL.loop[720].mp4}" data-360-webm="${REEL.loop[360].webm}" data-360-mp4="${REEL.loop[360].mp4}"></video>`;
}
export const reelSoundButton = (cls = 'btn-light') =>
  `<button type="button" class="btn ${cls}" data-video-lightbox="${REEL.full.mp4}" data-video-webm="${REEL.full.webm}" data-caption="${esc(REEL.name)}">${icon('play')}Watch with sound</button>`;
export function reelSchema() {
  return { '@context': 'https://schema.org', '@type': 'VideoObject', name: REEL.name, description: REEL.description,
    thumbnailUrl: [`${SITE.url}${REEL.poster[1280]}`], uploadDate: REEL.uploadDate, duration: REEL.duration,
    contentUrl: `${SITE.url}${REEL.full.mp4}`, publisher: { '@id': `${SITE.url}/#business` } };
}

// ------------------------------------------------------------------ quote pop-up
// One per page, opened by the header / hero "Get a Quote" buttons. Same fields as the
// in-page form, so the GHL tracking script captures it the same way.
export function quoteModal() {
  return `<dialog class="quote-modal" id="quote-modal" aria-labelledby="mq-title">
  <button type="button" class="qm-close" data-close-modal aria-label="Close">×</button>
  ${quoteForm({ title: 'Get a free quote', idPrefix: 'mq', formId: 'quote-form-modal' }).replace('<h2>', '<h2 id="mq-title">')}
</dialog>`;
}

// Map + suburb list side by side. The list is kept in sync with the map by site.js:
// each suburb highlights (and scrolls into view) as the mower reaches it.
export function areaPanel({ listHeading = 'Every suburb we service' } = {}) {
  const items = SUBURBS.map((s, i) => `<li data-name="${s.name}" class="${s.base ? 'base' : ''}${i < 4 ? ' prio' : ''}" tabindex="0">
      <span class="dot" aria-hidden="true"></span>
      <span class="name">${s.page ? `<a href="${s.page}">${s.name}</a>` : s.name}</span>
      ${s.base ? '<span class="tag">Home base</span>' : i < 4 ? '<span class="tag prio">Priority</span>' : ''}
    </li>`).join('');
  return `<div class="area-section" data-area-section>
    <div class="area-col-map">${areaMap()}</div>
    <div class="area-col-list">
      <h3 class="area-list-h">${listHeading}</h3>
      <ol class="area-list" data-area-list aria-label="Suburbs we service">${items}</ol>
      <p class="note area-list-note">Each suburb lights up as the mower reaches it. Click one to find it on the map.</p>
    </div>
  </div>`;
}
