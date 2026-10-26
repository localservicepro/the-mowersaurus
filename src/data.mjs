// Single source of truth for business facts, services and suburbs.
// Never add a street address here: the business is a service-area business.

export const SITE = {
  name: 'The Mowersaurus',
  url: 'https://www.themowersaurus.com.au',
  phone: '0459 960 501',
  phoneHref: 'tel:+61459960501',
  phoneIntl: '+61 459 960 501',
  email: 'enquiries@mowersaurus.com.au',
  locality: 'Watsonia North',
  region: 'VIC',
  postcode: '3087',
  locationLine: 'Watsonia North VIC 3087',
  abn: '49 341 320 766',
  legalName: 'TRAVASSAROS, DANIEL WILLIAM',
  founded: '2021',
  founder: 'Dan Travassaros',
  hours: 'Monday – Friday, 8am – 5pm',
  facebook: 'https://www.facebook.com/TheMowersaurus/',
  instagram: 'https://www.instagram.com/the_mowersaurus/',
  // Google Business Profile, from the CID in the supplied map embed (0x1f581ba04b608a80).
  gbp: 'https://maps.google.com/?cid=2258585588399639168',
  trackingId: 'tk_19d668aabd334c46b09cdc8c3191e2a6',
};

// Service Needed dropdown — this exact list and order.
export const SERVICE_OPTIONS = [
  'Lawn Care Programs (Good, Great & Amazing)',
  'Lawn Mowing & Overgrown Lawn Cuts',
  'Garden Tidy-Ups & General Gardening',
  'Garden Maintenance Programs',
  'Mulching & Small Landscaping',
  'Lawn Renovation & Aeration',
  'Other',
];

// Order matches the dropdown. `option` is the exact dropdown label a CTA pre-selects.
export const SERVICES = [
  {
    key: 'lawn-care-programs', path: '/lawn-care-programs/', option: SERVICE_OPTIONS[0],
    name: 'Lawn Care Programs', short: 'Lawn Programs', icon: 'lawn',
    descriptor: 'Good, Great & Amazing · Templestowe & surrounds',
    blurb: 'All-inclusive ongoing lawn care in three levels: mowing, edging, fertilising, weed and grub control and soil amendments.',
    keyword: 'lawn care templestowe',
  },
  {
    key: 'lawn-mowing', path: '/lawn-mowing/', option: SERVICE_OPTIONS[1],
    name: 'Lawn Mowing & Overgrown Lawn Cuts', short: 'Lawn Mowing', icon: 'mower',
    descriptor: 'Overgrown cuts · Mill Park & South Morang',
    blurb: 'Overgrown lawns cut back under control, then kept that way with regular mowing and edging.',
    keyword: 'lawn mowing mill park',
  },
  {
    key: 'gardening', path: '/gardening/', option: SERVICE_OPTIONS[2],
    name: 'Garden Tidy-Ups & General Gardening', short: 'Garden Tidy-Ups', icon: 'shears',
    descriptor: 'Weeding, pruning & hedging · Doncaster',
    blurb: 'One-off or general gardening: weeding, pruning and hedge trimming for a full garden tidy-up.',
    keyword: 'gardener doncaster',
  },
  {
    key: 'garden-maintenance-programs', path: '/garden-maintenance-programs/', option: SERVICE_OPTIONS[3],
    name: 'Garden Maintenance Programs', short: 'Garden Programs', icon: 'leaf',
    descriptor: 'Scheduled garden care · Eltham & Montmorency',
    blurb: 'Scheduled, all-inclusive garden care: pest and disease control, fertilising, weed control and all pruning, hedging and trimming.',
    keyword: 'garden maintenance eltham',
  },
  {
    key: 'mulching-landscaping', path: '/mulching-landscaping/', option: SERVICE_OPTIONS[4],
    name: 'Mulching & Small Landscaping', short: 'Mulching & Landscaping', icon: 'mulch',
    descriptor: 'Garden beds & planting · Templestowe',
    blurb: 'Garden bed mulching to save water and keep things tidy, plus small projects like planting and laying paths.',
    keyword: 'landscaping templestowe',
  },
  {
    key: 'lawn-renovation', path: '/lawn-renovation/', option: SERVICE_OPTIONS[5],
    name: 'Lawn Renovation & Aeration', short: 'Lawn Renovation', icon: 'aerate',
    descriptor: 'Dethatch, aerate & rebuild · Melbourne-wide',
    blurb: 'From a minor height reset and dethatch to a full renovation with soil testing, coring, scalping and feeding.',
    keyword: 'lawn renovation melbourne',
  },
];

export const svc = (key) => SERVICES.find((s) => s.key === key);

// Client priority order (confirmed against the SEO strategy). `page` = has a suburb landing page.
// lat/lng are suburb centroids (approximate), used only to draw the stylised map.
export const SUBURBS = [
  { name: 'Lower Templestowe', lat: -37.766, lng: 145.112, page: '/service-areas/lower-templestowe/' },
  { name: 'Templestowe', lat: -37.754, lng: 145.142, page: '/lawn-care-programs/' },
  { name: 'Doncaster East', lat: -37.783, lng: 145.162, page: '/service-areas/doncaster-east/' },
  { name: 'Doncaster', lat: -37.786, lng: 145.126, page: '/service-areas/doncaster/' },
  { name: 'Diamond Creek', lat: -37.673, lng: 145.158 },
  { name: 'Mill Park', lat: -37.666, lng: 145.062, page: '/lawn-mowing/' },
  { name: 'South Morang', lat: -37.648, lng: 145.093 },
  { name: 'Rosanna', lat: -37.742, lng: 145.068 },
  { name: 'Lower Plenty', lat: -37.733, lng: 145.117 },
  { name: 'Viewbank', lat: -37.738, lng: 145.095 },
  { name: 'Yallambie', lat: -37.723, lng: 145.103 },
  { name: 'Macleod', lat: -37.725, lng: 145.069 },
  { name: 'Eltham', lat: -37.714, lng: 145.148, page: '/garden-maintenance-programs/' },
  { name: 'Montmorency', lat: -37.716, lng: 145.124 },
  { name: 'St Helena', lat: -37.691, lng: 145.129 },
  { name: 'Greensborough', lat: -37.703, lng: 145.106 },
  { name: 'Watsonia', lat: -37.711, lng: 145.083 },
  { name: 'Watsonia North', lat: -37.697, lng: 145.087, base: true },
  { name: 'Bundoora', lat: -37.699, lng: 145.058 },
  { name: 'Epping', lat: -37.645, lng: 145.027 },
];

// Driving order for the animated map: a loop out of Watsonia North and back.
export const MAP_ROUTE = [
  'Watsonia North', 'Bundoora', 'Mill Park', 'Epping', 'South Morang', 'Diamond Creek', 'St Helena',
  'Eltham', 'Montmorency', 'Lower Plenty', 'Templestowe', 'Doncaster East', 'Doncaster',
  'Lower Templestowe', 'Viewbank', 'Rosanna', 'Macleod', 'Yallambie', 'Greensborough', 'Watsonia',
  'Watsonia North',
];

export const TIER_SCOPE = {
  lawn: ['Mowing', 'Edging', 'Fertilising', 'Weed control', 'Grub control', 'Soil amendments', 'Pest & disease control'],
  garden: ['Weed control', 'Fertilising', 'Pest & disease control', 'Pruning', 'Hedging', 'Trimming'],
};

// Indicative monthly pricing published on the client's current site (350 m² average lawn).
export const LAWN_PRICING = { good: '$300 – $350', great: '$375 – $425', amazing: '$650 – $700' };
