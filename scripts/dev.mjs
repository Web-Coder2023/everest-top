// Локальный сервер для dist/: node scripts/dev.mjs  (сначала собирает сайт)
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
if (!process.argv.includes('--dist')) execFileSync('node', [join(root, 'scripts/build.mjs')], { stdio: 'inherit' });
const dist = join(root, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.png': 'image/png', '.woff2': 'font/woff2' };
const port = Number(process.env.PORT) || 4321;
createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(dist, u);
  if (!f.startsWith(dist)) { res.writeHead(403).end(); return; }
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404, { 'content-type': types['.html'] }).end(readFileSync(join(dist, '404.html'))); return; }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }).end(readFileSync(f));
}).listen(port, () => console.log(`http://localhost:${port}`));
