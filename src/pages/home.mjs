import { SITE, SERVICES, REEL, svc } from '../data.mjs';
import { layout } from '../layout.mjs';
import { icon, picture, work, workImg, baSlider, quoteSection, tierSection, areaMap, suburbList, faqBlock, faqSchema, ctaBand, grassEdge, esc, reelMedia, reelSoundButton, reelSchema } from '../ui.mjs';
import media from '../media.json' with { type: 'json' };

export const HOME_FAQ = [
  ['How much does lawn care cost in Melbourne\'s north east?',
    '<p>Every property is quoted on its size, condition and access. As a guide, our indicative pricing for an average 350 m² lawn is around <strong>$300–$350 a month</strong> on the Good Lawn Program, <strong>$375–$425</strong> on the Great Lawn Program and <strong>$650–$700</strong> on the Amazing Lawn Program. <a href="#quote">Request a quote</a> for an exact figure for your place.</p>'],
  ['What\'s the difference between the Good, Great and Amazing lawn programs?',
    '<p>All three are all-inclusive lawn care programs. The difference is the result you want. <strong>Good</strong> keeps a lawn at a healthy, tidy 7/10 on a sensible budget. <strong>Great</strong> is our specialty, a 9/10 lawn for house-proud homeowners. <strong>Amazing</strong> is golf-course quality, which we jokingly call a "12 out of 10". The higher the level, the more attention and treatment your lawn gets through the year.</p>'],
  ['Do you service Doncaster, Templestowe and Lower Templestowe?',
    '<p>Yes. Lower Templestowe, Templestowe, Doncaster East and Doncaster are some of our busiest suburbs for lawn care in Melbourne\'s north east, alongside the rest of Melbourne\'s north east, from Epping and Mill Park through to Eltham, Diamond Creek and Rosanna. See every suburb on our <a href="/service-areas/">service areas</a> page.</p>'],
  ['When is the best time to renovate a lawn in Melbourne?',
    '<p>For the warm-season grasses most Melbourne homes have (couch, kikuyu, buffalo and zoysia), the best window is mid-spring into early summer, once the lawn is actively growing and can recover quickly. We don\'t renovate in winter, when the grass is dormant. Read more about <a href="/lawn-renovation/">lawn renovation</a>.</p>'],
  ['Can I combine a lawn program with a garden maintenance program in Eltham or Greensborough?',
    '<p>Absolutely, and lots of our clients do. Lawn and garden programs are chosen separately, so you can mix and match levels. A popular combination is the Great Lawn Program with the Good Garden Program. This works anywhere we service, including Eltham and Greensborough.</p>'],
  ['Do you look after commercial and body corporate gardens in Doncaster?',
    '<p>Yes. We\'re fully insured and maintain commercial, strata and body corporate grounds as well as homes, in Doncaster and right across our service area. Our programs suit commercial sites well because the grounds are looked after on a schedule without anyone needing to chase it.</p>'],
];

export default function home() {
  const hero = media.hero;
  const lawn = svc('lawn-care-programs');
  const garden = svc('garden-maintenance-programs');
  const others = SERVICES.filter((s) => !['lawn-care-programs', 'garden-maintenance-programs'].includes(s.key));
  const cardImg = { 'lawn-mowing': 'front-lawn-mow-and-edge-in-progress', 'gardening': 'front-lawn-and-clipped-hedge', 'mulching-landscaping': 'mulched-garden-beds-front-lawn-rosanna', 'lawn-renovation': 'dethatching-backyard-lawn-renovation' };

  const body = `
<section class="hero has-reel solo">
  <div class="hero-media">${reelMedia({ eager: true })}</div>
  <div class="wrap">
    <div>
      <span class="eyebrow">Lawn care · Garden maintenance · Since ${SITE.founded}</span>
      <h1>Lawn Care in Melbourne's North East, Built by Horticulturalists</h1>
      <p class="lead">Looking for lawn care in Melbourne that looks after the whole lawn, not just the mow? Our qualified horticulturalists run all-inclusive lawn and garden programs across the north east, from Watsonia North to Doncaster and Templestowe. You pick the result. We handle the rest.</p>
      <div class="btn-row"><a class="btn btn-primary" href="#quote" data-quote-modal>Get a Free Quote</a><a class="btn btn-outline-light" href="${SITE.phoneHref}" data-track="call">${icon('phone')}${SITE.phone}</a></div>
      <p class="hero-watch">${reelSoundButton('btn-link-light')}</p>
    </div>
  </div>
  <div class="hero-edge">${grassEdge('#fff')}</div>
</section>

<section class="trust-bar" aria-label="Why choose The Mowersaurus">
  <div class="wrap">
    <ul class="trust-list">
      <li>${icon('cap')}<span><strong>Qualified horticulturalists</strong>Experienced, not just enthusiastic</span></li>
      <li>${icon('shield')}<span><strong>Fully insured</strong>Residential &amp; commercial</span></li>
      <li>${icon('star')}<span><strong>Good, Great or Amazing</strong>You choose the result</span></li>
      <li>${icon('pin')}<span><strong>Local since ${SITE.founded}</strong>Based in Watsonia North</span></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="programs-h">
  <div class="wrap">
    <div class="grid-2">
      <div>
        <span class="eyebrow">A great lawn starts here</span>
        <h2 id="programs-h">Lawn care Melbourne homeowners can hand over completely</h2>
        <p class="lead">Most mowing services cut the grass and leave. Our programs look after the whole lawn and garden: feeding, weed and grub control, soil health and pest and disease control, plus the mowing, edging, hedging and pruning that keep it all sharp.</p>
        <p>${SITE.founder} started The Mowersaurus in ${SITE.founded}. He's a qualified horticulturalist who saw a gap for genuinely high-quality, all-inclusive lawn and garden care in Melbourne's north east. The model is simple. Choose the level that matches your expectations (Good, Great or Amazing) and our team takes it from there, visit after visit.</p>
      </div>
      <div class="photo-pair reveal">${workImg('lush-front-lawn-great-lawn-program', { sizes: '(min-width:900px) 25vw, 50vw' })}${workImg('dense-healthy-lawn-beside-stone-wall', { sizes: '(min-width:900px) 25vw, 50vw' })}</div>
    </div>
    <div class="program-cards" style="margin-top:48px">
      <a class="program-card reveal" href="${lawn.path}">${workImg('freshly-striped-front-lawn-mowing', { sizes: '(min-width:900px) 50vw, 100vw' })}
        <div class="pc-body"><span class="badge orange">Hero program</span><h3 style="margin-top:12px">Lawn Care Programs</h3><div class="tiers"><span>Good 7/10</span><span class="hl">Great 9/10</span><span>Amazing 12/10</span></div><p>${esc(lawn.blurb)}</p><span class="link-arrow" style="color:#fff">Explore lawn programs</span></div></a>
      <a class="program-card reveal" href="${garden.path}">${workImg('lawn-and-garden-beds-rock-wall', { sizes: '(min-width:900px) 50vw, 100vw' })}
        <div class="pc-body"><span class="badge">Pairs with any lawn program</span><h3 style="margin-top:12px">Garden Maintenance Programs</h3><div class="tiers"><span>Good</span><span class="hl">Great</span><span>Amazing</span></div><p>${esc(garden.blurb)}</p><span class="link-arrow" style="color:#fff">Explore garden programs</span></div></a>
    </div>
  </div>
</section>

<div data-tabs class="tier-tabs">
  <div class="wrap center" style="padding-top:8px"><div class="filters" role="tablist" aria-label="Program type" style="justify-content:center;margin:0 0 -40px;position:relative;z-index:2">
    <button role="tab" id="tab-lawn" aria-controls="panel-lawn" aria-selected="true" aria-pressed="true">Lawn programs</button>
    <button role="tab" id="tab-garden" aria-controls="panel-garden" aria-selected="false" aria-pressed="false" tabindex="-1">Garden programs</button>
  </div></div>
  <div role="tabpanel" id="panel-lawn" aria-labelledby="tab-lawn">${tierSection('lawn')}</div>
  <div role="tabpanel" id="panel-garden" aria-labelledby="tab-garden" hidden>${tierSection('garden')}</div>
</div>

<section class="section" aria-labelledby="projects-h">
  <div class="wrap">
    <div class="grid-2">
      <div>
        <span class="eyebrow">Recent projects</span>
        <h2 id="projects-h">Real lawns, real results, right across the north east</h2>
        <p class="lead">No stock photos. This is real lawn care in Melbourne, photographed on our clients' properties. Drag the sliders to see the difference.</p>
      </div>
      <div class="btn-row" style="justify-content:flex-end"><a class="btn btn-ghost" href="/projects/">See all our projects</a></div>
    </div>
    <div class="ba-grid three">
      ${baSlider('dry-lawn-revival-watsonia')}
      ${baSlider('backyard-lawn-transformation-templestowe')}
      ${baSlider('backyard-lawn-transformation-mill-park')}
    </div>
    <div class="reel teaser" style="margin-top:36px">
      <div class="teaser-video">
        <div>
          <span class="eyebrow" style="color:var(--tan)">Highlight reel</span>
          <p style="font-family:var(--head);font-size:1.7rem;color:#fff;line-height:1.15;margin:0 0 10px">Stripes, edges, hedges and a wave from the team</p>
          <p style="color:#D6E6D1">22 seconds of real Mowersaurus jobs. Turn the sound on.</p>
          <a class="btn btn-light" href="/projects/">See all our projects</a>
        </div>
        <button type="button" class="reel-tile" data-video-lightbox="${REEL.full.mp4}" data-video-webm="${REEL.full.webm}" data-caption="${esc(REEL.name)}" aria-label="Play the highlight reel with sound">
          <img src="${REEL.poster[640]}" srcset="${REEL.poster[640]} 640w, ${REEL.poster[1280]} 1280w" sizes="(min-width:900px) 560px, 100vw" width="1280" height="720" alt="" loading="lazy">
          <span class="play-badge">${icon("play")}</span>
        </button>
      </div>
    </div>
  </div>
</section>

<section class="section tint" aria-labelledby="services-h">
  <div class="wrap">
    <div class="center"><span class="eyebrow">More services</span><h2 id="services-h">One-off jobs and everything in between</h2>
    <p class="lead">Not every job needs a program. Alongside our lawn care in Melbourne's north east, we take on one-off work, and plenty of clients start here before moving onto regular care.</p></div>
    <div class="cards four" style="margin-top:34px">
      ${others.map((s) => `<article class="card reveal"><div class="media">${workImg(cardImg[s.key], { sizes: '(min-width:1200px) 290px, (min-width:640px) 50vw, 100vw' })}</div><div class="body"><span class="dd-icon">${icon(s.icon)}</span><h3><a href="${s.path}">${esc(s.name)}</a></h3><p>${esc(s.blurb)}</p><span class="link-arrow">Learn more</span></div></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="why-h">
  <div class="wrap">
    <div class="grid-2 top">
      <div>
        <span class="eyebrow">Why The Mowersaurus</span>
        <h2 id="why-h">A serious horticulture team with a dinosaur for a mascot</h2>
        <p class="lead">The dino keeps it fun. The horticulture is what makes our lawn care in Melbourne stand out. Here's what you get with us.</p>
        <div class="photo-frame reveal" style="margin-top:26px;aspect-ratio:4/3">${workImg('front-lawn-mowing-stripes-in-progress', { sizes: '(min-width:900px) 45vw, 100vw' })}</div>
      </div>
      <div class="features two" style="margin-top:0">
        <div class="feature-item reveal"><div class="fi">${icon('cap')}</div><h3>Qualified horticulturalists</h3><p>Our team is qualified and experienced, and knows why a lawn is struggling, not just how to cut it.</p></div>
        <div class="feature-item reveal"><div class="fi">${icon('sprout')}</div><h3>Results that last</h3><p>Fertilising, grub control, soil amendments, weed, pest and disease control, as well as the mowing and edging.</p></div>
        <div class="feature-item reveal"><div class="fi">${icon('star')}</div><h3>Pick your level</h3><p>Good, Great or Amazing. Choose the result that suits your expectations and budget.</p></div>
        <div class="feature-item reveal"><div class="fi">${icon('calendar')}</div><h3>Hands-off for you</h3><p>We schedule the visits and the treatments. You just enjoy the yard.</p></div>
        <div class="feature-item reveal"><div class="fi">${icon('shield')}</div><h3>Fully insured</h3><p>Covered for residential and commercial work, from family homes to body corporate grounds.</p></div>
        <div class="feature-item reveal"><div class="fi">${icon('pin')}</div><h3>Genuinely local</h3><p>Based in Watsonia North and working within about 10 km, so we're never far away.</p></div>
      </div>
    </div>
    <ol class="steps">
      <li class="reveal"><h3>Request a quote</h3><p>Tell us about your property using the form or give us a call.</p></li>
      <li class="reveal"><h3>We recommend a level</h3><p>We look at the lawn and garden and talk through Good, Great or Amazing.</p></li>
      <li class="reveal"><h3>Scheduled visits</h3><p>Mowing, edging, feeding and treatments, all done on a regular schedule.</p></li>
      <li class="reveal"><h3>Enjoy the results</h3><p>A lawn and garden that keep improving, season after season.</p></li>
    </ol>
  </div>
</section>

<section class="section tint" id="areas" aria-labelledby="areas-h">
  <div class="wrap">
    <div class="grid-2">
      <div>
        <span class="eyebrow">Service areas</span>
        <h2 id="areas-h">Lawn care across Melbourne's north east</h2>
      </div>
      <p class="lead">From our base in Watsonia North we provide lawn care in Melbourne's north east across roughly a 10 km radius, with regular rounds through Lower Templestowe, Templestowe, Doncaster East and Doncaster. Watch the mower do its rounds.</p>
    </div>
    <div style="margin-top:28px">${areaMap()}</div>
    <h3 style="margin-top:40px">Every suburb we service</h3>
    ${suburbList({ wide: true })}
    <p style="margin-top:18px"><a class="link-arrow" href="/service-areas/">View all service areas</a></p>
  </div>
</section>

${quoteSection()}

${faqBlock(HOME_FAQ, { heading: 'Lawn care questions, answered' })}

${ctaBand({ heading: 'Want a lawn like these?', text: `Get a free quote from a qualified horticulturalist. We service ${'Melbourne\'s north east'}, residential and commercial.` })}
`;
  return {
    path: '/',
    title: 'Lawn Care Melbourne North East | The Mowersaurus',
    description: 'Lawn care Melbourne homeowners rate 9/10. Horticulturalist-run lawn & garden programs from Watsonia North to Doncaster & Templestowe. Get a free quote.',
    body,
    schema: [faqSchema(HOME_FAQ), reelSchema()],
    preload: `<link rel="preload" as="image" href="${REEL.poster[1280]}" imagesrcset="${REEL.poster[640]} 640w, ${REEL.poster[1280]} 1280w" imagesizes="100vw" fetchpriority="high">`,
  };
}
