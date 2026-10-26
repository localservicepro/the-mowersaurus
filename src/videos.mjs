// ─────────────────────────────────────────────────────────────────────────────
//  FACEBOOK VIDEOS: paste embed codes here.
//
//  On Facebook: open the video → ••• → Embed → copy the code. Paste it between the
//  backticks of `embed`. The plain video URL works too, e.g.
//  https://www.facebook.com/reel/1234567890 or https://www.facebook.com/TheMowersaurus/videos/1234567890
//
//  • The FIRST video (or the one marked featured: true) is the big highlight video at the
//    top of /projects/ and the "Watch our work" teaser on the homepage.
//  • Every other video goes in the grid below it (click to play in a pop-up).
//  • caption: short description of the job. Service and suburb only, never a client's name.
//  • poster (optional): a thumbnail image in public/img/…; otherwise a branded tile is shown.
//  • The video must be set to Public on Facebook or it won't play on the site.
//
//  Then run `node build.mjs`. Leave the list empty to show the "coming soon" placeholder.
// ─────────────────────────────────────────────────────────────────────────────
export const VIDEOS = [
  // {
  //   featured: true,
  //   caption: 'Highlight reel: stripes, edges, hedges and big transformations',
  //   embed: `<iframe src="https://www.facebook.com/plugins/video.php?href=..." width="560" height="314" ...></iframe>`,
  // },
  // {
  //   caption: 'Mowing stripes into a front lawn',
  //   embed: `https://www.facebook.com/reel/1234567890`,
  // },
];

// ───────────────────────────── parsing (no need to edit below) ─────────────────────────────
const FB_HOSTS = /(^|\.)(facebook\.com|fb\.watch)$/i;

// Accepts a Facebook <iframe> embed code, the SDK <div class="fb-video" data-href=…> code,
// or a plain video URL. Returns a clean, safe player URL plus the video's aspect ratio.
export function parseFacebook(input) {
  const raw = String(input).trim().replace(/&amp;/g, '&');
  let href, w, h;
  const src = raw.match(/\ssrc=["']([^"']+)["']/i)?.[1];
  const dataHref = raw.match(/data-href=["']([^"']+)["']/i)?.[1];
  if (src) {
    const u = new URL(src);
    href = u.searchParams.get('href');
    w = +(raw.match(/\swidth=["']?(\d+)/i)?.[1] || u.searchParams.get('width'));
    h = +(raw.match(/\sheight=["']?(\d+)/i)?.[1] || u.searchParams.get('height'));
  } else if (dataHref) {
    href = dataHref;
  } else if (/^https?:\/\//i.test(raw)) {
    href = raw;
  }
  if (!href) throw new Error(`Facebook video: couldn't find a video link in:\n${raw.slice(0, 200)}`);
  const hu = new URL(href);
  if (!FB_HOSTS.test(hu.hostname)) throw new Error(`Facebook video: not a Facebook link: ${href}`);
  const vertical = /\/reel\//i.test(href) || (w && h && h > w);
  if (!w || !h) [w, h] = vertical ? [267, 476] : [560, 315];
  const player = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(hu.toString())}&show_text=false&width=${w}&height=${h}&t=0`;
  return { player, href: hu.toString(), w, h, vertical: h > w };
}

export const videos = () => {
  const list = VIDEOS.map((v) => ({ ...v, ...parseFacebook(v.embed) }));
  const i = Math.max(0, list.findIndex((v) => v.featured));
  return { featured: list[i] || null, rest: list.filter((_, k) => k !== i) };
};
