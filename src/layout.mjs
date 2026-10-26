import { SITE } from './data.mjs';
import { header, footer, esc, businessSchema, breadcrumbSchema } from './ui.mjs';

// The GHL tracking snippet, exactly as supplied by the client.
const TRACKING = `<script
  src="https://link.msgsndr.com/js/external-tracking.js"
  data-tracking-id="tk_19d668aabd334c46b09cdc8c3191e2a6">
</script>`;

export function layout({ path, title, description, body, schema = [], trail, noindex = false, ogImage, preload = '' }) {
  const canonical = `${SITE.url}${path}`;
  const og = ogImage ? `${SITE.url}${ogImage}` : `${SITE.url}/img/brand/og-image.jpg`;
  const graphs = [businessSchema(), ...(trail ? [breadcrumbSchema(trail)] : []), ...schema];
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#326F36">
<meta property="og:type" content="website">
<meta property="og:site_name" content="The Mowersaurus">
<meta property="og:locale" content="en_AU">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/img/brand/icon-32.png">
<link rel="apple-touch-icon" href="/img/brand/icon-180.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/lilita-one-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/nunito-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="/css/site.css">
${graphs.map((g) => `<script type="application/ld+json">${JSON.stringify(g)}</script>`).join('\n')}
${TRACKING}
</head>
<body>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script src="/js/site.js" defer></script>
</body>
</html>
`;
}
