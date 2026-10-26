// Tiny static server for local testing. Mimics Netlify: applies dist/_redirects (301),
// adds trailing slashes to directory URLs and serves dist/404.html for unknown paths.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = 'dist';
const PORT = Number(process.env.PORT || 8080);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.mp4': 'video/mp4', '.webm': 'video/webm' };

const rules = readFileSync(join(ROOT, '_redirects'), 'utf8').split('\n')
  .filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.trim().split(/\s+/));

createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const path = decodeURIComponent(url.pathname);
  for (const [from, to, code] of rules) {
    const hit = from.endsWith('/*') ? path.startsWith(from.slice(0, -1)) : path === from;
    if (hit) { res.writeHead(Number(code), { Location: to }); return res.end(); }
  }
  let file = join(ROOT, path);
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!path.endsWith('/')) { res.writeHead(301, { Location: path + '/' + url.search }); return res.end(); }
    file = join(file, 'index.html');
  }
  if (!existsSync(file)) {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    return res.end(readFileSync(join(ROOT, '404.html')));
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
