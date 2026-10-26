import { SITE, SERVICES, svc } from '../data.mjs';
import { icon, workImg, baSlider, tierSection, quoteSection, faqBlock, faqSchema, serviceSchema, pageHero, related, suburbList, esc, ctaBand } from '../ui.mjs';

const HOME = { name: 'Home', href: '/' };
const ALL = { name: 'Services', href: '/services/' };

function photoRow(slugs) {
  return `<div class="gallery" style="margin-top:28px">${slugs.map((s) => `<figure class="g-item reveal">${workImg(s, { sizes: '(min-width:1200px) 380px, (min-width:640px) 50vw, 100vw' })}</figure>`).join('')}</div>`;
}

function servicePage(c) {
  const s = svc(c.key);
  const trail = [HOME, ALL, { name: s.name, href: s.path }];
  const body = `
${pageHero({ trail, h1: c.h1, lead: c.lead, img: c.heroImg, service: s.option })}

<section class="section" aria-labelledby="intro-h">
  <div class="wrap grid-2 top">
    <div class="prose">
      <span class="eyebrow">${esc(c.eyebrow)}</span>
      <h2 id="intro-h">${c.introH}</h2>
      ${c.intro}
    </div>
    <div class="stack">
      <div class="photo-frame reveal" style="aspect-ratio:4/3">${workImg(c.sideImg, { sizes: '(min-width:900px) 45vw, 100vw' })}</div>
      <div class="feature-item reveal">
        <h3>${c.includedH || 'What\'s included'}</h3>
        <ul class="checks">${c.included.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>

${c.tiers ? tierSection(c.tiers) : ''}

${c.extra || ''}

<section class="section${c.tiers ? '' : ' tint'}" aria-labelledby="ba-h">
  <div class="wrap">
    <div class="center"><span class="eyebrow">Before &amp; after</span><h2 id="ba-h">${c.baH}</h2></div>
    <div class="ba-grid">${c.pairs.map((p) => baSlider(p)).join('')}</div>
    ${c.photos ? photoRow(c.photos) : ''}
    <p class="center" style="margin-top:26px"><a class="link-arrow" href="/projects/">See more of our projects</a></p>
  </div>
</section>

<section class="section${c.tiers ? ' tint' : ''}" aria-labelledby="how-h">
  <div class="wrap">
    <div class="center"><span class="eyebrow">How it works</span><h2 id="how-h">${c.stepsH}</h2></div>
    <ol class="steps">${c.steps.map(([h, p]) => `<li class="reveal"><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section${c.tiers ? '' : ' tint'}" aria-labelledby="areas-h">
  <div class="wrap grid-2 top">
    <div class="prose">
      <span class="eyebrow">Where we work</span>
      <h2 id="areas-h">${c.areasH}</h2>
      ${c.areas}
    </div>
    <div>${suburbList({ highlight: c.focus })}</div>
  </div>
</section>

${faqBlock(c.faqs, { heading: c.faqH || `${s.short} FAQs` })}

<section class="section tint tight" aria-labelledby="rel-h">
  <div class="wrap"><h2 id="rel-h" style="font-size:1.6rem">Related services</h2>${related(c.related)}</div>
</section>

${quoteSection({ preselect: s.option, heading: c.quoteH, text: c.quoteText })}
`;
  return {
    path: s.path, title: c.title, description: c.description, body, trail,
    schema: [serviceSchema(s, c.focus.concat(['Watsonia North'])), faqSchema(c.faqs)],
  };
}

// --------------------------------------------------------------------------- pages
const lawnCare = () => servicePage({
  key: 'lawn-care-programs',
  title: 'Lawn Care Templestowe | Lawn Programs | The Mowersaurus',
  description: 'Lawn care in Templestowe & Lower Templestowe by qualified horticulturalists. Good, Great & Amazing lawn programs, all-inclusive. Get a free quote.',
  h1: 'Lawn Care Programs in Templestowe: Good, Great &amp; Amazing',
  lead: 'All-inclusive lawn care for Templestowe, Lower Templestowe and the rest of Melbourne\'s north east. Choose the result you want: a 7/10, a 9/10, or our cheeky 12/10.',
  heroImg: 'lush-front-lawn-great-lawn-program',
  eyebrow: 'Lawn care Templestowe',
  introH: 'A lawn program, not just a mow',
  intro: `<p>Most lawns in Templestowe don't need more mowing. They need a plan. Our lawn care programs look after everything that decides how a lawn looks and feels: soil health, feeding, weeds, grubs, pests and disease, as well as the regular cut and a sharp edge.</p>
<p>That's what makes our approach to lawn care in Templestowe different. ${SITE.founder}, our founder, is a qualified horticulturalist. The whole team works the same way: work out why a lawn is thin, patchy or weedy, then fix the cause instead of mowing over it.</p>
<p>You choose one of three levels. <strong>Good</strong> keeps things healthy and tidy at a 7/10. <strong>Great</strong>, our specialty, is a 9/10 lawn for house-proud homeowners. <strong>Amazing</strong> is golf-course quality, our "12 out of 10". Whichever you pick, we schedule the visits and treatments so you don't have to think about it.</p>
<p>Already happy with your lawn mowing in Templestowe but want more from the lawn itself? A program covers the mowing too, so you only deal with one team.</p>`,
  sideImg: 'freshly-striped-front-lawn-mowing',
  included: ['Mowing and edging on a regular schedule', 'Fertilising to suit your turf and the season', 'Weed control', 'Grub control', 'Soil amendments to fix the soil underneath', 'Pest and disease control'],
  includedH: 'Covered across our lawn programs',
  tiers: 'lawn',
  baH: 'Lawn program results',
  pairs: ['backyard-lawn-transformation-templestowe', 'dry-lawn-revival-watsonia', 'front-lawn-makeover-briar-hill', 'backyard-lawn-transformation-mill-park'],
  stepsH: 'Starting a lawn care program',
  steps: [['Quote & lawn check', 'We look at your lawn, the grass type, soil and problem areas, then recommend a level.'], ['Choose your level', 'Good, Great or Amazing. You can also add a garden program.'], ['First visit', 'We get the lawn cut, edged and on track with its first treatments.'], ['Ongoing care', 'Regular visits and seasonal treatments keep it improving year-round.']],
  areasH: 'Lawn care in Templestowe, Lower Templestowe & surrounds',
  areas: `<p>Templestowe and Lower Templestowe are two of our busiest suburbs. Big established blocks, sloping front yards and plenty of mature trees make lawn care here a real horticultural job. Shade, root competition and heavy soils all need managing, not just mowing.</p><p>We also run lawn programs across the rest of Melbourne's north east, from Doncaster and Doncaster East through to Eltham, Greensborough and Mill Park.</p>`,
  focus: ['Templestowe', 'Lower Templestowe'],
  faqs: [
    ['How much does a lawn care program cost in Templestowe?', '<p>It depends on the size and condition of the lawn and the level you choose. As a guide, our indicative pricing for an average 350 m² lawn is about $300–$350 a month (Good), $375–$425 (Great) and $650–$700 (Amazing). We\'ll give you an exact quote after a look at your lawn.</p>'],
    ['Is mowing included in the lawn programs?', '<p>Yes. Mowing and edging are part of every lawn program, along with feeding, weed and grub control and soil amendments.</p>'],
    ['Which program should I choose?', '<p>If you want a healthy, tidy lawn on a budget, start with Good. If you\'re house-proud and want the lawn to be a feature, Great is our specialty and our most popular level. If you want golf-course quality, go Amazing. We\'re happy to recommend one when we quote.</p>'],
    ['Can I add garden maintenance?', '<p>Yes. Lawn and garden programs mix and match. A common combination is the Great Lawn Program with the Good Garden Program. See our <a href="/garden-maintenance-programs/">garden maintenance programs</a>.</p>'],
    ['Do you service Lower Templestowe?', '<p>Yes, Lower Templestowe is one of our priority suburbs. See our <a href="/service-areas/lower-templestowe/">Lower Templestowe lawn care</a> page.</p>'],
  ],
  related: ['garden-maintenance-programs', 'lawn-renovation', 'lawn-mowing'],
  quoteH: 'Get a lawn care quote in Templestowe',
  quoteText: 'Tell us about your lawn and the level you\'re interested in. If you\'re not sure, we\'ll help you choose.',
});

const mowing = () => servicePage({
  key: 'lawn-mowing',
  title: 'Lawn Mowing Mill Park | The Mowersaurus',
  description: 'Lawn mowing in Mill Park & South Morang, including overgrown lawn cuts. Qualified horticulturalists, fully insured. Get a free quote today.',
  h1: 'Lawn Mowing in Mill Park for Overgrown Lawns',
  lead: 'Overgrown, patchy or simply out of hand? We cut it back under control, clean up the edges, then keep it looking sharp with regular mowing.',
  heroImg: 'front-lawn-mow-and-edge-in-progress',
  eyebrow: 'Lawn mowing Mill Park',
  introH: 'Overgrown lawn? We\'ll bring it back',
  intro: `<p>Life gets busy, it rains for a fortnight, or you've just moved in, and the lawn gets away from you. Our lawn mowing in Mill Park is built for exactly that. We take long, overgrown grass back down in stages so the turf isn't scalped or shocked, then edge the paths, driveway and garden beds so the whole yard looks cared for again.</p>
<p>Once it's under control, most clients keep it that way with regular mowing. Plenty of people then move onto one of our <a href="/lawn-care-programs/">lawn care programs</a>, which add fertilising, weed and grub control and soil care to the mow.</p>
<p>Because our team are horticulturalists, we'll also tell you what we see. If your lawn has a grub problem, compacted soil or a weed takeover, you'll know, along with what it would take to fix it.</p>`,
  sideImg: 'freshly-striped-front-lawn-mowing',
  included: ['Overgrown lawn cuts, done in stages where needed', 'Mowing at the right height for your grass type', 'Edging along paths, driveways and garden beds', 'Line trimming around fences, trees and tight spots', 'Clippings blown off hard surfaces', 'Regular ongoing mowing to keep it under control'],
  baH: 'Lawn mowing before &amp; after',
  pairs: ['backyard-lawn-transformation-mill-park', 'commercial-grounds-tidy-up-doncaster', 'backyard-lawn-edges-rosanna', 'nature-strip-mow-rosanna'],
  photos: ['crisp-lawn-boundary-lines', 'nature-strip-mowing-eltham', 'corner-front-lawn-mowing'],
  stepsH: 'From overgrown to under control',
  steps: [['Quote', 'Send through a few details or photos and we\'ll quote the first cut and regular mowing.'], ['The big cut', 'We bring the grass down safely, edge everything and clean up.'], ['Regular mowing', 'Choose a schedule that keeps it neat through the growing season.'], ['Level up (optional)', 'Add feeding and treatments with a lawn care program.']],
  areasH: 'Lawn mowing in Mill Park, South Morang & nearby',
  areas: `<p>We mow lawns right through Mill Park and South Morang, along with Epping, Bundoora and the rest of Melbourne's north east. Plenty of homes here have big front lawns and wide nature strips that get away quickly in spring. We're based just down the road in Watsonia North.</p>`,
  focus: ['Mill Park', 'South Morang'],
  faqs: [
    ['How overgrown is too overgrown?', '<p>Nothing\'s too overgrown. For very long grass we cut in stages so the lawn isn\'t scalped, and we clean up all the clippings.</p>'],
    ['How often should my lawn be mowed?', '<p>During the growing season most lawns in Mill Park need mowing every one to three weeks, depending on the grass and how fast it\'s growing. Most of our regular clients are on a two-weekly, three-weekly or monthly schedule.</p>'],
    ['Do you mow nature strips?', '<p>Yes. Nature strips are mowed and edged along the footpath and kerb as part of the job.</p>'],
    ['Do you mow commercial properties?', '<p>Yes. We\'re fully insured and look after commercial, strata and body corporate lawns as well as homes.</p>'],
  ],
  related: ['lawn-care-programs', 'lawn-renovation', 'gardening'],
  quoteH: 'Get a lawn mowing quote in Mill Park',
  quoteText: 'Let us know roughly how big the lawn is and how long it\'s been since the last cut.',
});

const renovation = () => servicePage({
  key: 'lawn-renovation',
  title: 'Lawn Renovation Melbourne | The Mowersaurus',
  description: 'Lawn renovation in Melbourne: soil testing, dethatching, core aeration, scalping & fertilising by qualified horticulturalists. Get a free quote.',
  h1: 'Lawn Renovation Melbourne: Dethatch, Aerate &amp; Rebuild',
  lead: 'Patchy, spongy, compacted or thin? A renovation fixes the problems underneath, so your lawn can grow back thicker and healthier.',
  heroImg: 'dethatching-backyard-lawn-renovation',
  eyebrow: 'Lawn renovation Melbourne',
  introH: 'When a lawn needs more than a mow',
  intro: `<p>Over time, lawns build up thatch (a spongy layer of dead runners), the soil compacts and the grass thins out. Fertiliser and water alone won't fix it. Lawn renovation is how we reset the lawn so it can recover properly.</p>
<p>We offer two levels. A <strong>minor renovation</strong> resets the mowing height and dethatches the lawn, a great option for lawns that are basically healthy but have grown tall and spongy. A <strong>full renovation</strong> goes further. We test the soil, apply soil amendments, core aerate, dethatch, scalp and fertilise, rebuilding the lawn from the soil up.</p>
<p>As qualified horticulturalists we time the work around your grass type and the season, so the lawn is growing strongly enough to bounce back fast. For lawn renovation in Melbourne that usually means mid-spring into early summer.</p>`,
  sideImg: 'scalped-lawn-ready-for-renovation',
  includedH: 'Minor vs full renovation',
  included: ['<strong>Minor:</strong> mowing height reset', '<strong>Minor:</strong> dethatching', '<strong>Full:</strong> soil testing and soil amendments', '<strong>Full:</strong> core aeration', '<strong>Full:</strong> dethatching and scalping', '<strong>Full:</strong> fertilising to drive recovery'],
  baH: 'Lawn renovation results',
  pairs: ['nature-strip-renovation-templestowe', 'dry-front-lawn-recovery-watsonia-north'],
  photos: ['lawn-renovation-scalping-front-yard', 'lawn-after-dethatch-renovation', 'nature-strip-renovation-dethatched'],
  stepsH: 'How a full lawn renovation works',
  steps: [['Assess & test', 'We look at the lawn and test the soil so we know what we\'re fixing.'], ['Open it up', 'Scalping, dethatching and core aeration remove thatch and relieve compaction.'], ['Feed the soil', 'Soil amendments and fertiliser give the lawn what it needs to regrow.'], ['Recover & maintain', 'We guide the lawn through recovery, ideally onto a lawn care program.']],
  areasH: 'Lawn renovation across Melbourne\'s north east',
  areas: `<p>We renovate lawns right across our service area, from Watsonia North out to Doncaster, Templestowe, Eltham, Diamond Creek and Mill Park. Renovation slots fill up quickly in spring, so it's worth getting your quote in early.</p>`,
  focus: [],
  faqs: [
    ['When is the best time to renovate a lawn in Melbourne?', '<p>For warm-season grasses like couch, kikuyu, buffalo and zoysia, mid-spring into early summer is ideal, once the lawn is actively growing. We avoid winter, when the grass is dormant and can\'t recover.</p>'],
    ['How long does a lawn take to recover?', '<p>A renovated lawn looks rough for the first couple of weeks. With good growing conditions, warm-season lawns typically fill back in over the following weeks. We\'ll talk you through what to expect for your lawn.</p>'],
    ['What\'s the difference between a minor and full renovation?', '<p>A minor renovation resets the height and dethatches. A full renovation adds soil testing, soil amendments, core aeration, scalping and fertilising.</p>'],
    ['Will my lawn need watering afterwards?', '<p>Yes. Consistent watering is important while the lawn recovers. We\'ll give you clear watering instructions for your lawn.</p>'],
  ],
  related: ['lawn-care-programs', 'lawn-mowing', 'mulching-landscaping'],
  quoteH: 'Get a lawn renovation quote',
  quoteText: 'Tell us what\'s going on with the lawn (thin, spongy, patchy or weedy) and roughly how big it is.',
});

const gardenPrograms = () => servicePage({
  key: 'garden-maintenance-programs',
  title: 'Garden Maintenance Eltham | The Mowersaurus',
  description: 'Garden maintenance in Eltham & Montmorency: scheduled, all-inclusive garden programs by qualified horticulturalists. Good, Great & Amazing. Get a quote.',
  h1: 'Garden Maintenance Programs in Eltham',
  lead: 'Scheduled, all-inclusive garden care for Eltham, Montmorency and the north east, with pest and disease control, feeding, weed control and all the pruning.',
  heroImg: 'lawn-and-garden-beds-rock-wall',
  eyebrow: 'Garden maintenance Eltham',
  introH: 'An established garden, kept at its best',
  intro: `<p>Eltham gardens are something special: big native plantings, mature trees, mudbrick character and plenty of slope. They're also a lot of work to keep healthy. Our garden maintenance programs in Eltham take that work off your hands with scheduled visits from a qualified horticulturalist team.</p>
<p>Like our lawn programs, there are three levels: <strong>Good</strong>, <strong>Great</strong> and <strong>Amazing</strong>. Each one is all-inclusive. Pest and disease control, fertilising, weed control and every bit of pruning, hedging and trimming are covered, so the garden keeps improving rather than just getting tidied.</p>
<p>Garden programs pair perfectly with a <a href="/lawn-care-programs/">lawn care program</a>. Many clients choose a Great Lawn Program with a Good Garden Program.</p>`,
  sideImg: 'brick-path-garden-maintenance-eltham',
  includedH: 'Covered across our garden programs',
  included: ['Pest and disease control', 'Fertilising', 'Weed control in beds and paths', 'All pruning', 'Hedging and shaping', 'Trimming and general tidying'],
  tiers: 'garden',
  baH: 'Garden maintenance results',
  pairs: ['front-lawn-garden-bed-refresh-watsonia-north', 'front-lawn-and-garden-rosanna'],
  photos: ['garden-bed-edge-and-lawn', 'brick-path-garden-lawn', 'native-garden-bed-and-lawn-watsonia-north'],
  stepsH: 'Starting a garden maintenance program',
  steps: [['Garden walk-through', 'We look at your plants, beds and problem areas and talk about what you want.'], ['Choose your level', 'Good, Great or Amazing, with or without a lawn program.'], ['Scheduled visits', 'Regular visits cover pruning, weeding, feeding and treatments.'], ['Season by season', 'We adjust the work through the year as the garden changes.']],
  areasH: 'Garden maintenance in Eltham, Montmorency & beyond',
  areas: `<p>We look after gardens throughout Eltham and Montmorency, plus St Helena, Lower Plenty, Greensborough and the rest of the north east. We also maintain body corporate and commercial gardens.</p>`,
  focus: ['Eltham', 'Montmorency'],
  faqs: [
    ['What\'s included in a garden maintenance program?', '<p>Programs cover pest and disease control, fertilising, weed control and all pruning, hedging and trimming. The exact visit frequency and treatments depend on the level you choose, and we\'ll confirm them in your quote.</p>'],
    ['Do you maintain body corporate gardens?', '<p>Yes. We\'re fully insured and maintain body corporate, strata and commercial gardens on a schedule.</p>'],
    ['Can I combine a garden program with a lawn program?', '<p>Yes, they\'re designed to mix and match. A Great Lawn Program with a Good Garden Program is one of our most popular combinations.</p>'],
    ['Do you do one-off garden clean-ups too?', '<p>Yes. See our <a href="/gardening/">garden tidy-ups</a> for one-off weeding, pruning and hedging.</p>'],
  ],
  related: ['lawn-care-programs', 'gardening', 'mulching-landscaping'],
  quoteH: 'Get a garden maintenance quote in Eltham',
  quoteText: 'Tell us about the garden and how often you\'d like it looked after.',
});

const gardening = () => servicePage({
  key: 'gardening',
  title: 'Gardener Doncaster | The Mowersaurus',
  description: 'Need a gardener in Doncaster? Garden tidy-ups, weeding, pruning & hedge trimming by qualified horticulturalists. Fully insured. Get a free quote.',
  h1: 'Gardener in Doncaster for Weeding, Pruning &amp; Hedging',
  lead: 'One-off garden tidy-ups and general gardening for Doncaster and Doncaster East: weeds out, hedges shaped, shrubs pruned, beds cleaned up.',
  heroImg: 'front-lawn-and-clipped-hedge',
  eyebrow: 'Gardener Doncaster',
  introH: 'A full garden tidy-up, done properly',
  intro: `<p>Sometimes the garden just needs a proper reset. Our gardeners in Doncaster handle the whole job in one go: weeding the beds, pruning shrubs, trimming hedges back into shape and cleaning everything up so you can see the garden again.</p>
<p>Because we're horticulturalists, we prune with the plant in mind: the right cut, at the right time of year, so it grows back healthier and flowers where it should. Hedges are cut straight and even, and kept off fences, paths and footpaths.</p>
<p>A one-off tidy-up is also a great way to start. Once the garden is back on track, a <a href="/garden-maintenance-programs/">garden maintenance program</a> keeps it there without you having to book each visit.</p>`,
  sideImg: 'lawn-and-garden-beds-rock-wall',
  included: ['Weeding garden beds, paths and paving', 'Pruning shrubs, roses and small trees', 'Hedge trimming and shaping', 'Cutting back overgrowth from paths and fences', 'Green waste cleaned up', 'Advice on what your garden needs next'],
  baH: 'Garden tidy-up &amp; hedging results',
  pairs: ['hedge-and-lawn-tidy-rosanna', 'hedge-trimming-footpath-rosanna', 'side-courtyard-lawn-doncaster-east', 'under-stair-lawn-edging-rosanna'],
  stepsH: 'How a garden tidy-up works',
  steps: [['Quote', 'Send through some details or photos of the garden and what you\'d like done.'], ['Plan the job', 'We agree on priorities: weeds, hedges, pruning, clean-up.'], ['Tidy-up day', 'Our team works through the garden and leaves it clean.'], ['Keep it that way', 'Optional ongoing care with a garden program.']],
  areasH: 'Gardener in Doncaster, Doncaster East & surrounds',
  areas: `<p>We work as gardeners right through Doncaster and Doncaster East, as well as Templestowe, Lower Templestowe and the rest of Melbourne's north east. Doncaster's mix of established family homes and newer townhouses means we do everything from big hedge jobs to small courtyard tidy-ups.</p><p>Read more on our <a href="/service-areas/doncaster/">Doncaster</a> and <a href="/service-areas/doncaster-east/">Doncaster East</a> pages.</p>`,
  focus: ['Doncaster', 'Doncaster East'],
  faqs: [
    ['Do you take the green waste away?', '<p>We clean up after every job. Let us know in your quote request if there\'s a large amount of green waste, so we can plan for it.</p>'],
    ['Can you trim tall hedges?', '<p>Yes, we trim and shape hedges of most sizes. Tell us roughly how tall and long the hedge is when you request a quote.</p>'],
    ['Do you do regular gardening as well as one-offs?', '<p>Yes. Many clients start with a tidy-up and move onto a scheduled <a href="/garden-maintenance-programs/">garden maintenance program</a>.</p>'],
    ['Are you insured?', '<p>Yes, we\'re fully insured for residential and commercial work.</p>'],
  ],
  related: ['garden-maintenance-programs', 'mulching-landscaping', 'lawn-mowing'],
  quoteH: 'Get a quote from a Doncaster gardener',
  quoteText: 'Let us know what needs doing (weeding, pruning, hedges) and roughly how big the garden is.',
});

const mulching = () => servicePage({
  key: 'mulching-landscaping',
  title: 'Landscaping Templestowe | Mulching | The Mowersaurus',
  description: 'Mulching & small landscaping in Templestowe: garden bed mulching, planting and footpaths by qualified horticulturalists. Get a free quote today.',
  h1: 'Mulching &amp; Landscaping in Templestowe',
  lead: 'Fresh mulch, new plants and small landscaping projects that make the garden easier to look after and better to look at.',
  heroImg: 'mulched-garden-beds-front-lawn-rosanna',
  eyebrow: 'Landscaping Templestowe',
  introH: 'Mulch that works as hard as it looks',
  intro: `<p>A good layer of mulch is one of the best things you can do for a garden. It holds moisture in the soil, so you water less. It keeps weeds down. It protects plant roots from heat, and it makes the whole property look finished.</p>
<p>Our mulching and small landscaping service in Templestowe covers the jobs that sit between gardening and a full landscape build. We prepare and weed the beds, then spread mulch at the right depth, keeping it clear of stems and trunks. We also plant new garden beds and lay footpaths.</p>
<p>As horticulturalists we'll help you pick plants that suit the spot: sun or shade, clay or sandy soil, and how much care you want to give them.</p>`,
  sideImg: 'mulched-bed-and-curved-lawn-edge-rosanna',
  included: ['Garden bed preparation and weeding', 'Mulching to save water and suppress weeds', 'Planting and garden bed rejuvenation', 'Laying footpaths', 'Clean edges between beds and lawn', 'Plant advice from a horticulturalist'],
  baH: 'Garden bed &amp; landscaping results',
  pairs: ['front-lawn-garden-bed-refresh-watsonia-north', 'front-lawn-and-garden-rosanna'],
  photos: ['mulched-garden-beds-front-lawn-rosanna', 'native-garden-bed-and-lawn-watsonia-north', 'garden-bed-edge-and-lawn'],
  stepsH: 'How a mulching or landscaping job works',
  steps: [['Quote', 'Tell us what you have in mind and send a few photos if you can.'], ['Plan', 'We agree on materials, plants and the scope of work.'], ['Prepare', 'Beds are weeded and prepared properly before anything goes down.'], ['Finish', 'Mulch, plants or paths are installed and everything is cleaned up.']],
  areasH: 'Mulching &amp; landscaping in Templestowe &amp; Lower Templestowe',
  areas: `<p>We take on mulching and small landscaping jobs across Templestowe and Lower Templestowe, plus the wider north east. Templestowe's large, sloping blocks and established gardens are ideal candidates for a mulch refresh and a few well-chosen plants.</p>`,
  focus: ['Templestowe', 'Lower Templestowe'],
  faqs: [
    ['How deep should mulch be?', '<p>For most garden beds, a layer of around 50–75 mm does the job: thick enough to hold moisture and suppress weeds. We keep mulch clear of plant stems and tree trunks.</p>'],
    ['How often should garden beds be re-mulched?', '<p>Most organic mulches break down over time and need topping up roughly once a year. It\'s often done in spring, ahead of the warmer months.</p>'],
    ['Do you do large landscaping projects?', '<p>We focus on small landscaping: mulching, planting, garden bed rejuvenation and footpaths. Get in touch and we\'ll tell you honestly if your project is a good fit.</p>'],
    ['Can you weed before mulching?', '<p>Yes. Beds are always weeded and prepared before mulch goes down. Mulching over weeds just hides them for a while.</p>'],
  ],
  related: ['gardening', 'garden-maintenance-programs', 'lawn-care-programs'],
  quoteH: 'Get a mulching or landscaping quote',
  quoteText: 'Tell us roughly how many garden beds, or what you\'d like built or planted.',
});

// --------------------------------------------------------------------------- hub
function hub() {
  const trail = [HOME, ALL];
  const img = { 'lawn-care-programs': 'lush-front-lawn-great-lawn-program', 'lawn-mowing': 'front-lawn-mow-and-edge-in-progress', 'gardening': 'front-lawn-and-clipped-hedge', 'garden-maintenance-programs': 'lawn-and-garden-beds-rock-wall', 'mulching-landscaping': 'mulched-garden-beds-front-lawn-rosanna', 'lawn-renovation': 'dethatching-backyard-lawn-renovation' };
  const body = `
${pageHero({ trail, h1: 'Lawn &amp; Garden Services in Melbourne\'s North East', lead: 'Programs for ongoing care, plus one-off mowing, tidy-ups, mulching and renovations. All carried out by qualified horticulturalists.', img: 'freshly-striped-front-lawn-mowing' })}
<section class="section"><div class="wrap">
  <div class="cards">
    ${SERVICES.map((s, i) => `<article class="card${i < 1 || s.key === 'garden-maintenance-programs' ? ' feature' : ''} reveal"><div class="media">${workImg(img[s.key], { sizes: '(min-width:1200px) 380px, (min-width:640px) 50vw, 100vw' })}</div><div class="body">${i === 0 || s.key === 'garden-maintenance-programs' ? '<span class="badge orange" style="align-self:flex-start">Program · Good, Great &amp; Amazing</span>' : ''}<h2 style="font-size:1.45rem;margin:0"><a href="${s.path}" style="text-decoration:none;color:inherit">${esc(s.name)}</a></h2><p>${esc(s.blurb)}</p><span class="link-arrow">Learn more</span></div></article>`).join('')}
  </div>
  <div class="callout" style="margin-top:36px"><strong>Something else?</strong> We also help with grub and insect treatments, soil health testing and planting. Choose "Other" on the quote form and tell us what you need.</div>
</div></section>
${tierSection('lawn')}
${quoteSection()}
`;
  return { path: '/services/', title: 'Lawn & Garden Services | The Mowersaurus', description: 'Lawn care programs, garden maintenance, mowing, garden tidy-ups, mulching and lawn renovation across Melbourne\'s north east. Get a free quote.', body, trail };
}

export default [lawnCare, mowing, gardening, gardenPrograms, mulching, renovation, hub];
