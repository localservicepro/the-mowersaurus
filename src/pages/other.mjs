import { SITE, SERVICES, SUBURBS, REEL, svc } from '../data.mjs';
import { icon, picture, workImg, baSlider, quoteSection, faqBlock, faqSchema, pageHero, related, suburbList, areaPanel, ctaBand, esc, grassEdge, crumbs, reelMedia, reelSoundButton, reelSchema } from '../ui.mjs';
import { HOME_FAQ } from './home.mjs';
import media from '../media.json' with { type: 'json' };

const HOME = { name: 'Home', href: '/' };

const CATS = [
  ['all', 'All'], ['lawn-programs', 'Lawn Programs'], ['lawn-renovation', 'Lawn Renovation'], ['mowing', 'Mowing'],
  ['hedging', 'Hedging & Pruning'], ['garden', 'Garden Maintenance'], ['mulching', 'Mulching & Landscaping'], ['commercial', 'Commercial'],
];

// ------------------------------------------------------------------ projects
function projects() {
  const trail = [HOME, { name: 'Projects', href: '/projects/' }];
  // Before/after pairs also feed the gallery filters (hedging + commercial would otherwise be thin).
  const pairCat = { 'gardening': 'hedging', 'lawn-mowing': 'mowing', 'lawn-renovation': 'lawn-renovation', 'lawn-care-programs': 'lawn-programs', 'garden-maintenance-programs': 'garden' };
  const extra = media.pairs.filter((p) => ['hedge-and-lawn-tidy-rosanna', 'hedge-trimming-footpath-rosanna', 'commercial-grounds-tidy-up-doncaster'].includes(p.slug))
    .map((p) => ({ slug: p.slug + '-after', cat: p.slug.startsWith('commercial') ? 'commercial' : pairCat[p.service], alt: `${p.title}, ${p.suburb} (after)`, img: p.after_img }));
  const items = media.gallery.filter((g) => !g.slug.startsWith('hero')).concat(extra);
  const gallery = items.map((g) => `<figure class="g-item" data-cat="${g.cat}"><button type="button" data-lightbox="${g.img[0].src}" data-caption="${esc(g.alt)}" aria-label="Enlarge photo: ${esc(g.alt)}">${picture(g.img, g.alt, { sizes: '(min-width:1200px) 290px, (min-width:520px) 34vw, 46vw' })}</button><figcaption>${esc(CATS.find((c) => c[0] === g.cat)[1])}${g.suburb ? ` · ${esc(g.suburb)}` : ''}</figcaption></figure>`).join('');

  const body = `
<section class="reel-hero" aria-labelledby="reel-h">
  <div class="wrap">
    ${crumbs(trail)}
    <h1 id="reel-h">Our Lawn &amp; Garden Projects</h1>
    <p class="lead">Real jobs from across Melbourne's north east: lawn programs, renovations, hedging, garden makeovers and commercial grounds. No stock photos. Here's the team at work.</p>
    <div class="reel reel-main">
      ${reelMedia({ eager: true })}
      <div class="reel-actions">${reelSoundButton('btn-primary')}</div>
    </div>
  </div>
  <div class="hero-edge">${grassEdge('#fff')}</div>
</section>

<section class="section" aria-labelledby="ba-h">
  <div class="wrap">
    <div class="center"><span class="eyebrow">Before &amp; after</span><h2 id="ba-h">Drag to see the difference</h2>
    <p class="lead">Every pair is a real Mowersaurus job. We label them by service and suburb only, to respect our clients' privacy.</p></div>
    <div class="ba-grid three">${media.pairs.map((p) => baSlider(p.slug)).join('')}</div>
  </div>
</section>

<section class="section tint" aria-labelledby="gal-h">
  <div class="wrap">
    <span class="eyebrow">Project gallery</span>
    <h2 id="gal-h">Browse by service</h2>
    <div class="filters" role="group" aria-label="Filter projects by service">${CATS.map(([k, l], i) => `<button type="button" data-filter="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
    <div class="gallery" data-gallery>${gallery}</div>
    <p class="note" style="margin-top:14px" aria-live="polite" data-gallery-count></p>
  </div>
</section>

${ctaBand({ heading: 'Want results like these?', text: 'Get a free quote for your lawn or garden, or call us to talk it through.' })}
${quoteSection({ heading: 'Start your own before &amp; after' })}
`;
  const schema = [reelSchema()];
  return { preload: `<link rel="preload" as="image" href="${REEL.poster[1280]}" imagesrcset="${REEL.poster[640]} 640w, ${REEL.poster[1280]} 1280w" imagesizes="100vw" fetchpriority="high">`, path: '/projects/', title: 'Lawn & Garden Projects | Before & After | The Mowersaurus', description: 'Real before & after lawn and garden projects across Melbourne\'s north east: lawn programs, renovations, hedging, mulching & commercial grounds.', body, trail, schema };
}

// ------------------------------------------------------------------ service areas
function areas() {
  const trail = [HOME, { name: 'Service Areas', href: '/service-areas/' }];
  const pages = SUBURBS.filter((s) => s.page && s.page.startsWith('/service-areas/'));
  const body = `
${pageHero({ trail, h1: 'Lawn Care &amp; Garden Maintenance Service Areas', lead: 'Based in Watsonia North and working within about a 10 km radius across Melbourne\'s north east.', img: 'nature-strip-mowing-eltham', byline: false })}
<section class="section"><div class="wrap">
  ${areaPanel({ listHeading: 'Suburbs we service' })}
  <p class="note" style="margin-top:14px">Listed in order of where we're busiest. Orange marks our priority suburbs.</p>
  <div class="grid-2 top" style="margin-top:48px">
    <div>
      <h2>Local lawn care pages</h2>
      <div class="related">${pages.map((s) => `<a href="${s.page}"><span class="dd-icon">${icon('pin')}</span>Lawn care ${s.name}</a>`).join('')}
        <a href="/lawn-care-programs/"><span class="dd-icon">${icon('pin')}</span>Lawn care Templestowe</a>
        <a href="/lawn-mowing/"><span class="dd-icon">${icon('pin')}</span>Lawn mowing Mill Park</a>
        <a href="/garden-maintenance-programs/"><span class="dd-icon">${icon('pin')}</span>Garden maintenance Eltham</a>
        <a href="/gardening/"><span class="dd-icon">${icon('pin')}</span>Gardener Doncaster</a>
      </div>
    </div>
    <div>
      <div class="callout" style="margin-top:0"><strong>Just outside the list?</strong> If you're close to one of these suburbs, ask anyway. If your property is in range, we'll happily quote.</div>
    </div>
  </div>
</div></section>
${quoteSection()}
`;
  return { path: '/service-areas/', title: 'Service Areas | North East Melbourne | The Mowersaurus', description: 'The Mowersaurus services 20 suburbs across Melbourne\'s north east, including Lower Templestowe, Templestowe, Doncaster East & Doncaster.', body, trail };
}

// ------------------------------------------------------------------ suburb pages
function suburbPage(c) {
  const trail = [HOME, { name: 'Service Areas', href: '/service-areas/' }, { name: c.name, href: c.path }];
  const lawn = svc('lawn-care-programs');
  const body = `
${pageHero({ trail, h1: c.h1, lead: c.lead, img: c.heroImg, service: lawn.option })}
<section class="section"><div class="wrap grid-2 top">
  <div class="prose">
    <span class="eyebrow">${esc(c.eyebrow)}</span>
    <h2>${c.h2}</h2>
    ${c.copy}
  </div>
  <div class="stack">
    ${baSlider(c.pair)}
    <div class="feature-item"><h3>Popular in ${c.name}</h3><ul class="checks">${c.popular.map(([k, t]) => `<li>${icon('check')}<span><a href="${svc(k).path}">${esc(svc(k).name)}</a>: ${t}</span></li>`).join('')}</ul></div>
  </div>
</div></section>
<section class="section tint tight"><div class="wrap">
  <h2 style="font-size:1.6rem">Nearby suburbs we also service</h2>
  <p>${c.nearby}</p>
  <p><a class="link-arrow" href="/service-areas/">All service areas</a></p>
</div></section>
${faqBlock(c.faqs, { heading: `Lawn care in ${c.name}: FAQs` })}
${quoteSection({ preselect: lawn.option, heading: `Get a lawn care quote in ${c.name}` })}
`;
  return { path: c.path, title: c.title, description: c.description, body, trail, schema: [faqSchema(c.faqs)] };
}

const lowerTemplestowe = () => suburbPage({
  name: 'Lower Templestowe', path: '/service-areas/lower-templestowe/',
  title: 'Lawn Care Lower Templestowe | The Mowersaurus',
  description: 'Lawn care in Lower Templestowe from local, qualified horticulturalists. Good, Great & Amazing lawn and garden programs. Get a free quote.',
  h1: 'Lawn Care in Lower Templestowe',
  lead: 'Horticulturalist-run lawn and garden programs for Lower Templestowe homes, just across the Yarra from our Watsonia North base.',
  heroImg: 'dense-healthy-lawn-beside-stone-wall', eyebrow: 'Lawn care Lower Templestowe',
  h2: 'Lower Templestowe lawns need more than a mow',
  copy: `<p>Lower Templestowe (officially Templestowe Lower) is one of our busiest suburbs, and the yards here are a big part of why. Many homes sit on generous, established blocks with large front lawns, mature trees and gardens that have been growing for decades. That's a lovely setting, and a demanding one for a lawn.</p>
<p>Shade and root competition from big trees thin the grass out. Plenty of Manningham yards sit on heavy clay that compacts over time, so water runs off instead of soaking in. Slopes dry out faster at the top and stay soggy at the bottom. A weekly mow doesn't fix any of that. Lawn care in Lower Templestowe works best as a program that feeds the lawn, improves the soil and keeps weeds and grubs in check through the year.</p>
<p>That's exactly what our <a href="/lawn-care-programs/">Good, Great and Amazing lawn programs</a> do. Most of our Lower Templestowe clients choose the Great Lawn Program, a 9/10 lawn that makes the front of the house. Many pair it with a Good Garden Program to keep the beds and hedges just as tidy.</p>
<p>We're based in Watsonia North, less than 10 km away, so Lower Templestowe is part of our regular rounds rather than an occasional trip.</p>`,
  pair: 'backyard-lawn-transformation-templestowe',
  popular: [['lawn-care-programs', 'year-round lawn health'], ['lawn-renovation', 'fixing tired, compacted lawns'], ['gardening', 'hedges and garden tidy-ups']],
  nearby: 'Alongside Lower Templestowe we look after lawns in <a href="/lawn-care-programs/">Templestowe</a>, <a href="/service-areas/doncaster/">Doncaster</a>, <a href="/service-areas/doncaster-east/">Doncaster East</a>, Viewbank, Rosanna and the rest of the north east.',
  faqs: [
    ['Do you service all of Lower Templestowe?', '<p>Yes. Lower Templestowe is one of our priority suburbs and is well within our service area.</p>'],
    ['My lawn is under big trees. Can it still look good?', '<p>Usually, yes. Shade, root competition and soil all play a part. We\'ll look at what\'s going on and recommend the right level of program, or a renovation if the lawn needs a reset.</p>'],
    ['How much does lawn care cost in Lower Templestowe?', '<p>Every lawn is quoted individually. As a guide, our indicative monthly pricing for an average 350 m² lawn ranges from about $300 (Good) to $700 (Amazing).</p>'],
  ],
});

const doncaster = () => suburbPage({
  name: 'Doncaster', path: '/service-areas/doncaster/',
  title: 'Lawn Care Doncaster | Garden Maintenance | The Mowersaurus',
  description: 'Lawn care, lawn mowing, garden maintenance & landscaping in Doncaster by qualified horticulturalists. Homes, townhouses & commercial. Free quote.',
  h1: 'Lawn Care &amp; Garden Maintenance in Doncaster',
  lead: 'From family homes to townhouse courtyards and commercial grounds, we keep Doncaster lawns and gardens in top shape.',
  heroImg: 'commercial-lawn-maintenance-doncaster', eyebrow: 'Lawn care Doncaster',
  h2: 'Big blocks, small courtyards, and everything between',
  copy: `<p>Doncaster has changed a lot. Established family homes with big front lawns now sit alongside subdivided blocks, townhouses with compact courtyard gardens, and apartments and commercial sites around Doncaster Hill. We look after all of them.</p>
<p>For houses with a proper lawn, our <a href="/lawn-care-programs/">lawn care programs</a> handle everything: lawn mowing in Doncaster, edging, fertilising, weed and grub control and soil amendments, on a schedule. For smaller townhouse gardens, a <a href="/garden-maintenance-programs/">garden maintenance program</a> keeps hedges, beds and courtyard lawns neat without you lifting a finger.</p>
<p>We also take on landscaping in Doncaster, from fresh mulch and new garden beds to planting and footpaths through our <a href="/mulching-landscaping/">mulching and small landscaping</a> service. For one-off jobs, our <a href="/gardening/">gardeners</a> handle weeding, pruning and hedge trimming.</p>
<p>We're fully insured and maintain commercial and body corporate grounds in Doncaster too. Our commercial clients like that the grounds simply stay looked after, without needing to be chased.</p>`,
  pair: 'commercial-grounds-tidy-up-doncaster',
  popular: [['lawn-care-programs', 'all-inclusive lawn care'], ['garden-maintenance-programs', 'townhouse & body corporate gardens'], ['mulching-landscaping', 'mulch, planting & paths']],
  nearby: 'We also service <a href="/service-areas/doncaster-east/">Doncaster East</a>, <a href="/service-areas/lower-templestowe/">Lower Templestowe</a>, <a href="/lawn-care-programs/">Templestowe</a> and the wider north east.',
  faqs: [
    ['Do you maintain body corporate gardens in Doncaster?', '<p>Yes. We\'re fully insured and maintain strata, body corporate and commercial grounds on a regular schedule.</p>'],
    ['Do you mow small townhouse lawns?', '<p>Yes. Small lawns and courtyards are a big part of what we do in Doncaster, often as part of a garden program.</p>'],
    ['Do you do landscaping in Doncaster?', '<p>We do small landscaping: mulching, planting, garden bed rejuvenation and footpaths.</p>'],
  ],
});

const doncasterEast = () => suburbPage({
  name: 'Doncaster East', path: '/service-areas/doncaster-east/',
  title: 'Lawn Care Doncaster East | The Mowersaurus',
  description: 'Lawn care in Doncaster East by qualified horticulturalists: lawn programs, garden maintenance, renovations & tidy-ups. Get a free quote today.',
  h1: 'Lawn Care in Doncaster East',
  lead: 'Lawn programs, garden maintenance and one-off tidy-ups for Doncaster East homes, from leafy courts to compact courtyards.',
  heroImg: 'garden-bed-edge-and-lawn', eyebrow: 'Lawn care Doncaster East',
  h2: 'Leafy streets and lawns worth looking after',
  copy: `<p>Doncaster East is full of quiet courts and leafy streets, with established homes on good-sized blocks and plenty of newer townhouses in between. Front lawns here are on show, and our clients want them to look the part.</p>
<p>Our <a href="/lawn-care-programs/">lawn care programs</a> are built for that. Pick Good, Great or Amazing and our horticulturalists handle mowing, edging, fertilising, weed and grub control and soil amendments on a schedule, so the lawn keeps improving rather than just staying short.</p>
<p>Smaller spaces get the same care. We regularly clean up side courtyards and narrow strips of lawn that have been left to the weeds. Drag the slider to see a Doncaster East courtyard we brought back. For hedges and garden beds, our <a href="/gardening/">garden tidy-ups</a> and <a href="/garden-maintenance-programs/">garden programs</a> have it covered.</p>
<p>Doncaster East sits at the outer edge of our service area, about 12 km from our Watsonia North base, and it's one of our priority suburbs for regular programs.</p>`,
  pair: 'side-courtyard-lawn-doncaster-east',
  popular: [['lawn-care-programs', 'front lawns that stand out'], ['gardening', 'courtyard & hedge tidy-ups'], ['lawn-renovation', 'reviving tired lawns']],
  nearby: 'We also look after lawns and gardens in <a href="/service-areas/doncaster/">Doncaster</a>, <a href="/lawn-care-programs/">Templestowe</a>, <a href="/service-areas/lower-templestowe/">Lower Templestowe</a> and across the north east.',
  faqs: [
    ['Do you service Doncaster East regularly?', '<p>Yes. Doncaster East is one of our priority suburbs and part of our regular rounds.</p>'],
    ['Can you fix a weedy courtyard lawn?', '<p>Yes. We\'ll clean it up, then recommend either regular care or a small renovation depending on the state of the grass.</p>'],
    ['What lawn program do most people choose?', '<p>The Great Lawn Program, a 9/10 lawn, is our specialty and the most popular choice.</p>'],
  ],
});

// ------------------------------------------------------------------ about
function about() {
  const trail = [HOME, { name: 'About', href: '/about/' }];
  const body = `
${pageHero({ trail, h1: 'About The Mowersaurus', lead: 'A horticulture business with a fun brand, founded in Watsonia North in 2021.', img: 'front-lawn-mowing-stripes-in-progress', byline: false })}
<section class="section"><div class="wrap grid-2 top">
  <div class="prose">
    <span class="eyebrow">Our story</span>
    <h2>Started by a horticulturalist who saw a gap</h2>
    <p>${SITE.founder} founded The Mowersaurus in ${SITE.founded}. As a qualified horticulturalist, he saw a gap in Melbourne's north east for genuinely high-quality, all-inclusive lawn and garden maintenance: care that looks after the whole lawn and garden, not just the mowing.</p>
    <p>So he built the business around a simple idea. Instead of a long menu of separate services, customers choose the result they want (<strong>Good</strong>, <strong>Great</strong> or <strong>Amazing</strong>) and the team takes care of everything needed to get there. That means feeding, weed and grub control, soil amendments, pest and disease control, and the physical work of mowing, edging, hedging and pruning.</p>
    <p>The dinosaur? That's the fun part. Our green T-rex in a sombrero and hi-vis vest is hard to forget, and it reminds everyone that great lawn care doesn't have to be stuffy. Behind the dino is a serious horticulture team.</p>
    <h2>How we work</h2>
    <ul class="checks">
      <li>${icon('check')}<span><strong>Qualified, experienced horticulturalists</strong> who diagnose problems, not just mow over them.</span></li>
      <li>${icon('check')}<span><strong>A simple three-level model.</strong> Good (7/10), Great (9/10) or Amazing (our playful "12/10").</span></li>
      <li>${icon('check')}<span><strong>Mix &amp; match</strong> lawn and garden programs. Great Lawn + Good Garden is a favourite.</span></li>
      <li>${icon('check')}<span><strong>Hands-off for you.</strong> We schedule visits and treatments so you don't have to.</span></li>
      <li>${icon('check')}<span><strong>Fully insured</strong> for residential and commercial properties.</span></li>
    </ul>
  </div>
  <div class="stack">
    <div class="photo-frame reveal" style="aspect-ratio:4/3">${workImg('freshly-striped-front-lawn-mowing', { sizes: '(min-width:900px) 45vw, 100vw' })}</div>
    <div class="feature-item" style="text-align:center"><img src="/img/brand/logo-on-white.webp" alt="The Mowersaurus logo" width="447" height="324" loading="lazy" style="width:220px;margin:0 auto 12px"><p class="muted" style="margin:0">Based in ${SITE.locationLine} · ABN ${SITE.abn}<br>${SITE.hours}</p></div>
    <a class="btn btn-ghost" href="${SITE.gbp}" target="_blank" rel="noopener">${icon('google')}Read our Google reviews</a>
  </div>
</div></section>
${ctaBand({ heading: 'Let\'s talk about your lawn', text: 'Get a free quote, or give us a call during business hours.' })}
${quoteSection()}
`;
  return { path: '/about/', title: 'About Us | Horticulturalist-Run Lawn Care | The Mowersaurus', description: 'The Mowersaurus was founded in 2021 by qualified horticulturalist Dan Travassaros to offer all-inclusive lawn & garden programs in Melbourne\'s north east.', body, trail, schema: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About The Mowersaurus', about: { '@id': `${SITE.url}/#business` } }] };
}

// ------------------------------------------------------------------ contact
// The client's GBP map embed, pasted exactly as supplied.
const GBP_EMBED = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3333.71223184353!2d145.08911569999998!3d-37.6972417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x237f77f959734795%3A0x1f581ba04b608a80!2sThe%20Mowersaurus!5e1!3m2!1sen!2sph!4v1792985369261!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>';

function contact() {
  const trail = [HOME, { name: 'Contact', href: '/contact/' }];
  const body = `
${pageHero({ trail, h1: 'Contact The Mowersaurus', lead: 'Request a free quote online or call us during business hours. We aim to call back within 2 hours on business days.', cta: false, byline: false })}
${quoteSection({ heading: 'Request a free quote' })}
<section class="section" aria-labelledby="find-h"><div class="wrap grid-2 top">
  <div>
    <span class="eyebrow">Find us</span>
    <h2 id="find-h">Servicing Melbourne's north east</h2>
    <p class="lead">We're a mobile, service-area business based in ${SITE.locationLine}. We come to you anywhere within about 10 km.</p>
    <ul class="checks" style="margin-top:20px">
      <li>${icon('phone')}<a href="${SITE.phoneHref}" data-track="call"><strong>${SITE.phone}</strong></a></li>
      <li>${icon('mail')}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
      <li>${icon('clock')}<span>${SITE.hours}</span></li>
      <li>${icon('pin')}<span>${SITE.locationLine}</span></li>
    </ul>
    <div class="socials" style="margin-top:20px">
      <a class="btn btn-ghost" href="${SITE.facebook}" target="_blank" rel="noopener">${icon('facebook')}Facebook</a>
      <a class="btn btn-ghost" href="${SITE.instagram}" target="_blank" rel="noopener">${icon('instagram')}Instagram</a>
    </div>
  </div>
  <div class="map-embed">${GBP_EMBED}</div>
</div></section>
`;
  return { path: '/contact/', title: 'Contact Us | Free Lawn Care Quote | The Mowersaurus', description: 'Get a free lawn care or garden maintenance quote from The Mowersaurus. Call 0459 960 501 or request a quote online. Servicing Melbourne\'s north east.', body, trail, schema: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact The Mowersaurus', about: { '@id': `${SITE.url}/#business` } }] };
}

// ------------------------------------------------------------------ faq
const MORE_FAQ = [
  ['Do you offer regular service?', '<p>Absolutely. We encourage a regular plan so lawns and gardens stay consistently healthy. Most clients are on a two-weekly, three-weekly or monthly schedule, depending on growth and the level of care they want.</p>'],
  ['What if I\'m not happy after a service?', '<p>Contact us and we\'ll put it right. We want you to be genuinely happy with your lawn after every visit.</p>'],
  ['Do you offer other services?', '<p>Yes. Ask us about any other work in the yard, including grub and insect treatments, soil health testing and planting. Choose "Other" on the quote form.</p>'],
  ['How quickly will you get back to me?', '<p>We aim to call within 2 hours of a quote request on business days (Monday to Friday, 8am–5pm).</p>'],
  ['Are you insured?', '<p>Yes. The Mowersaurus is fully insured for residential and commercial work.</p>'],
];
function faq() {
  const trail = [HOME, { name: 'FAQ', href: '/faq/' }];
  const all = HOME_FAQ.concat(MORE_FAQ);
  const body = `
${pageHero({ trail, h1: 'Lawn Care &amp; Garden Maintenance FAQs', lead: 'Answers to the questions we get asked most, from pricing to renovation timing.', cta: false, byline: true })}
${faqBlock(all, { heading: 'Your questions, answered' })}
${quoteSection()}
`;
  return { path: '/faq/', title: 'Lawn Care FAQs | The Mowersaurus', description: 'Answers about lawn care pricing, Good/Great/Amazing programs, lawn renovation timing, service areas and more from The Mowersaurus.', body, trail, schema: [faqSchema(all)] };
}

// ------------------------------------------------------------------ yard tips (kept at their ranking URLs)
function tip({ path, title, description, h1, lead, img, html, cta }) {
  const trail = [HOME, { name: h1.replace('&amp;', '&'), href: path }];
  const body = `
${pageHero({ trail, h1, lead, img, cta: false })}
<section class="section"><div class="wrap grid-2 top">
  <article class="prose">${html}</article>
  <aside class="stack">
    <div class="feature-item"><h3>Need a hand?</h3><p>${cta}</p><a class="btn btn-primary" href="#quote" data-quote-modal style="margin-top:10px">Get a Quote</a></div>
    <div class="feature-item"><h3>More yard tips</h3><ul class="checks"><li>${icon('check')}<a href="/types-of-turf/">Common types of turf</a></li><li>${icon('check')}<a href="/weed-control/">Weed control</a></li><li>${icon('check')}<a href="/fertilizing/">Fertilising your lawn</a></li></ul></div>
  </aside>
</div></section>
${quoteSection()}
`;
  return { path, title, description, body, trail, schema: [{ '@context': 'https://schema.org', '@type': 'Article', headline: h1, author: { '@type': 'Person', name: SITE.founder, jobTitle: 'Qualified horticulturalist' }, publisher: { '@id': `${SITE.url}/#business` }, mainEntityOfPage: `${SITE.url}${path}` }] };
}

const turf = () => tip({
  path: '/types-of-turf/', title: 'Types of Turf Australia | Couch vs Kikuyu | The Mowersaurus',
  description: 'Common types of turf in Australian yards (buffalo, zoysia, couch and kikuyu) and how to look after each one. Yard tips from a horticulturalist.',
  h1: 'Common Types of Turf in Australian Yards', lead: 'Buffalo, zoysia, couch or kikuyu? How to recognise your lawn and look after it.', img: 'dense-healthy-lawn-beside-stone-wall',
  cta: 'Not sure what grass you have? We\'ll identify it and recommend the right care when we quote.',
  html: `<p>Australian residential yards suit a handful of hardy, mostly warm-season grasses. Knowing which one you have makes a big difference to how you mow, water and feed it.</p>
<h2>Buffalo grass</h2><p>A warm-season favourite with a soft, luxurious feel and good tolerance of dry conditions. Buffalo does best in well-drained soil and doesn't like being overwatered. Mow it at roughly 5–7.5 cm (2–3 inches) to keep it tidy and prevent thatch. Feed it in spring and aerate occasionally to keep the soil healthy.</p>
<h2>Zoysia grass</h2><p>Another warm-season option, prized for its dense turf and adaptability. Mowing at about 2.5–5 cm (1–2 inches) encourages sideways growth and discourages thatch. Water consistently but let it dry out between waterings to reduce the risk of disease. Fertilise in late spring and early summer, and dethatch occasionally.</p>
<h2>Couch grass</h2><p>Also known as Bermuda grass, couch is popular for its fine texture and toughness. Mow it at about 2.5–5 cm for a manicured look and good thatch control. It's drought-tolerant, but regular watering keeps it looking its best. Fertilise in late spring and early summer for strong colour, and aerate to keep it vigorous.</p>
<h2>Kikuyu grass</h2><p>Originally from East Africa, kikuyu thrives in Australian lawns thanks to its rapid growth and bright green colour. Regular mowing at about 4–5 cm (1.5–2 inches) keeps thatch under control and encourages lush growth. It handles heavy foot traffic well. Feed it in spring and early summer, and dethatch and aerate periodically.</p>
<h2>Couch vs kikuyu: which suits you?</h2><p>Both are tough, fast-recovering warm-season grasses. Couch has a finer leaf and a more manicured look but needs more frequent mowing to stay neat. Kikuyu is coarser, grows aggressively and fills in bare patches quickly, which is great for busy family yards but means more edging to keep it out of garden beds.</p>
<div class="callout">Every one of these grasses responds well to a proper program of feeding, weed control and soil care. That's what our <a href="/lawn-care-programs/">lawn care programs</a> are for.</div>`,
});

const weeds = () => tip({
  path: '/weed-control/', title: 'Mulching & Weed Control Tips | The Mowersaurus',
  description: 'Practical mulching and weed control tips for Melbourne gardens and lawns: mulching, hand weeding, herbicides, soil health and watering.',
  h1: 'Mulching &amp; Weed Control Tips', lead: 'Keeping a garden and lawn weed-free comes down to a few good habits.', img: 'mulched-garden-beds-front-lawn-rosanna',
  cta: 'We handle weed control as part of every lawn and garden program, and mulch beds through our mulching service.',
  html: `<p>Keeping your garden and lawn weed-free is crucial for their health and appearance. Here's how we approach it.</p>
<h2>Mulching</h2><p>Apply a thick layer of natural mulch such as wood chips, bark or straw to garden beds. Mulch is a barrier against weeds: it stops seeds reaching the soil and sprouting. It also holds moisture in and keeps soil temperatures even, which makes life harder for weeds. See our <a href="/mulching-landscaping/">mulching service</a>.</p>
<h2>Know your weeds</h2><p>Learn the common weeds in your area so you can deal with them early. Removing weeds before they set seed is the key to keeping them under control. Inspect the garden regularly and act quickly.</p>
<h2>Plant placement</h2><p>Space plants so there are fewer gaps for weeds to take root. A healthy, well-planted garden shades the soil and naturally outcompetes weeds for light and nutrients.</p>
<h2>Soil health</h2><p>Keep soil fertile with appropriate fertilising and organic matter like compost. Strong, healthy plants are much better at competing with weeds.</p>
<h2>Selective herbicides</h2><p>Use selective herbicides carefully and always follow the label. Choose products that target specific weeds and apply them while the weeds are actively growing.</p>
<h2>Hand weeding</h2><p>Pull weeds by hand regularly, ideally before they flower. A weeding tool helps get the roots out too.</p>
<h2>Pre-emergent herbicides</h2><p>Pre-emergent products stop weed seeds from germinating by forming a barrier in the soil. Timing matters: apply them before the main growing season.</p>
<h2>Watering</h2><p>Water at the base of plants rather than soaking the whole bed. Drip irrigation and soaker hoses keep the surface drier, which discourages weed seeds from germinating.</p>`,
});

const fert = () => tip({
  path: '/fertilizing/', title: 'Lawn Fertilising Guide | The Mowersaurus',
  description: 'How to fertilise an Australian lawn: understand your soil, choose the right fertiliser, time it for warm-season grasses and apply it evenly.',
  h1: 'Fertilising Your Lawn', lead: 'A practical roadmap to feeding an Australian lawn for strong, even, green growth.', img: 'sloping-lawn-with-stepping-stones',
  cta: 'Fertilising is built into our lawn care programs, timed for your grass and the season.',
  html: `<p>A thriving lawn needs the right nutrients at the right time. Here's a practical guide to feeding yours.</p>
<h2>Understand your soil</h2><p>Australian soils range from sandy to heavy clay. A soil test reveals pH and nutrient levels, which guides the right fertiliser for your lawn. (Soil testing is part of our <a href="/lawn-renovation/">full lawn renovations</a>.)</p>
<h2>Choose the right fertiliser</h2><p>Look for a balanced fertiliser formulated for Australian lawns, with an N-P-K ratio suited to your grass. Slow-release products give a steady supply of nutrients. Some soils benefit from added micronutrients like iron and manganese.</p>
<h2>Timing is crucial</h2><p>For the warm-season grasses common in Australia, spring and early summer are the ideal feeding times, when growth peaks. Avoid fertilising in extreme heat, which stresses the grass.</p>
<h2>Tips for application</h2><ul><li><strong>Measure accurately:</strong> work out your lawn's area so you apply the right amount.</li><li><strong>Spread evenly:</strong> use a broadcast spreader and take care around borders and edges.</li><li><strong>Water it in:</strong> water straight after fertilising to activate nutrients and prevent burning.</li><li><strong>Think about runoff:</strong> choose products with low runoff potential and keep fertiliser off paths and driveways.</li></ul>
<h2>Common issues</h2><ul><li><strong>Yellowing grass</strong> can signal a nitrogen deficiency.</li><li><strong>Weeds</strong> can take advantage of fertiliser, so pair feeding with weed control.</li><li><strong>Patchy growth</strong> often comes from uneven application. Calibrate your spreader and overlap passes.</li></ul>
<p>A well-fed lawn is a happy lawn. Or let us take care of it with a <a href="/lawn-care-programs/">lawn care program</a>.</p>`,
});

// ------------------------------------------------------------------ utility pages
function privacy() {
  const trail = [HOME, { name: 'Privacy policy', href: '/privacy-policy/' }];
  const body = `
${pageHero({ trail, h1: 'Privacy Policy', lead: 'How The Mowersaurus collects and uses your information.', cta: false, byline: false })}
<section class="section"><div class="wrap prose">
<p class="pending">Draft for client review</p>
<p>The Mowersaurus (ABN ${SITE.abn}) respects your privacy. This policy explains what information we collect through this website and how we use it.</p>
<h2>What we collect</h2><p>When you request a quote, we collect the details you enter: your name, email address, phone number, property address, property size, the service you need and any job notes.</p>
<h2>How we use it</h2><p>We use your details only to respond to your enquiry, prepare a quote and book and carry out work. We don't sell your information.</p>
<h2>Website analytics &amp; tracking</h2><p>This website uses a tracking script from our customer-management platform to record enquiries and understand how visitors use the site. It may use cookies.</p>
<h2>Photos of our work</h2><p>Project photos on this site are labelled by service and suburb only. We don't publish client names, street addresses or house numbers.</p>
<h2>Access &amp; contact</h2><p>To ask about, update or delete the information we hold about you, email <a href="mailto:${SITE.email}">${SITE.email}</a> or call ${SITE.phone}.</p>
</div></section>`;
  return { path: '/privacy-policy/', title: 'Privacy Policy | The Mowersaurus', description: 'How The Mowersaurus collects, uses and protects the information you provide through our website.', body, trail };
}

function thanks() {
  const body = `
<section class="page-hero plain" style="min-height:60vh;display:grid;align-items:center">
  <div class="wrap center" style="padding-top:60px;padding-bottom:90px">
    <img src="/img/brand/logo-on-dark.webp" alt="" width="340" height="243" style="width:200px;margin:0 auto 18px">
    <h1 style="margin-inline:auto">Thanks, we've got your request!</h1>
    <p class="lead" style="margin-inline:auto">We'll be in touch soon, usually within 2 hours on business days (${SITE.hours}). Need us sooner? Give us a call.</p>
    <div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="${SITE.phoneHref}" data-track="call">${icon('phone')}${SITE.phone}</a><a class="btn btn-outline-light" href="/projects/">See our projects</a></div>
  </div>
  <div class="hero-edge">${grassEdge('#fff')}</div>
</section>`;
  return { path: '/thank-you/', title: 'Thank You | The Mowersaurus', description: 'Thanks for your quote request. The Mowersaurus will be in touch soon.', body, noindex: true };
}

function notFound() {
  const body = `
<section class="page-hero plain"><div class="wrap center" style="padding-top:60px;padding-bottom:100px">
  <h1 style="margin-inline:auto">This page has gone extinct</h1>
  <p class="lead" style="margin-inline:auto">We couldn't find that page. It may have moved when we rebuilt the site.</p>
  <div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="/">Back to home</a><a class="btn btn-outline-light" href="/services/">Our services</a></div>
</div><div class="hero-edge">${grassEdge('#fff')}</div></section>`;
  return { path: '/404.html', file: '404.html', title: 'Page Not Found | The Mowersaurus', description: 'Page not found.', body, noindex: true };
}

export default [projects, areas, lowerTemplestowe, doncaster, doncasterEast, about, contact, faq, turf, weeds, fert, privacy, thanks, notFound];
