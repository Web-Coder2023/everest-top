// Сборка статического сайта: node scripts/build.mjs  ->  dist/
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../site.config.mjs';
import { layout } from '../src/lib/ui.mjs';
import { SEO } from '../src/data/seo.mjs';
import home from '../src/pages/home.mjs';
import services from '../src/pages/services.mjs';
import automation from '../src/pages/automation.mjs';
import { ai, web, products } from '../src/pages/services-detail.mjs';
import { projects, about, contacts, privacy, notFound } from '../src/pages/misc.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const pages = [home, services, automation, ai, web, products, projects, about, contacts, privacy, notFound];

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, 'assets'), { recursive: true });
if (existsSync(join(root, 'public'))) cpSync(join(root, 'public'), dist, { recursive: true });

// HTML
const urls = [];
for (const p of pages) {
  const seo = p.seo || SEO[p.path];
  if (!seo) throw new Error('Нет SEO для ' + p.path);
  const html = layout({ path: p.path, seo, crumbs: p.crumbs, body: p.body(), schema: p.schema ? p.schema() : [], noindex: !!p.noindex });
  const file = p.path.endsWith('.html') ? p.path.slice(1) : (p.path === '/' ? 'index.html' : join(p.path.slice(1), 'index.html'));
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  writeFileSync(join(dist, file), html);
  if (!p.noindex) urls.push(p.path);
}

// CSS и JS
const read = (f) => readFileSync(join(root, 'src', f), 'utf8');
const css = ['styles/variables.css', 'styles/global.css', 'styles/components.css', 'styles/visuals.css', 'styles/animations.css'].map(read).join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n').replace(/\n(?=[^{}]*\{)/g, '\n');
writeFileSync(join(dist, 'assets/styles.css'), css);
writeFileSync(join(dist, 'assets/main.js'), read('scripts/main.js'));

// sitemap и robots
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`Собрано страниц: ${pages.length}. Домен: ${site.url}${site.domainConfigured ? '' : '  (ЗАГЛУШКА: задайте SITE_URL)'}`);
