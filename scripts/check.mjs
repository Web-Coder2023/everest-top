// Статическая проверка dist/: node scripts/check.mjs (после npm run build)
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const htmls = walk(dist).filter((f) => f.endsWith('.html'));
let fail = 0; const bad = (m) => { fail++; console.log('FAIL', m); };
const titles = new Map(), descs = new Map();
const ids = {};
const rel = (f) => f.slice(dist.length).replace(/\\/g, '/');
for (const f of htmls) { const h = readFileSync(f, 'utf8'); ids[rel(f)] = new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])); }
const FORBID = ['индивидуальный подход', 'лучшие решения', 'инновационные технологии', 'на новый уровень', 'гарантируем рост', 'полностью избавля', 'динамично развивающаяся'];
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
for (const f of htmls) {
  const r = rel(f), h = readFileSync(f, 'utf8'), is404 = r === '/404.html';
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1], d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!t || !d) bad(r + ': нет title/description');
  if (titles.has(t)) bad(`${r}: дублирует title страницы ${titles.get(t)}`); titles.set(t, r);
  if (descs.has(d)) bad(`${r}: дублирует description страницы ${descs.get(d)}`); descs.set(d, r);
  if (t && t.length > 70) bad(`${r}: title длиннее 70 (${t.length})`);
  if (d && (d.length > 175 || d.length < 60)) bad(`${r}: description ${d.length} симв.`);
  const h1 = (h.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) bad(`${r}: h1 = ${h1}`);
  if (!is404 && !/<link rel="canonical" href="https?:\/\/[^"]+">/.test(h)) bad(r + ': нет canonical');
  if (!/property="og:title"/.test(h) || !/name="twitter:card"/.test(h)) bad(r + ': нет OG/Twitter');
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { bad(r + ': невалидный JSON-LD'); } }
  // пропуски уровней заголовков
  const lv = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]); lv.forEach((x, i) => { if (i && x - lv[i - 1] > 1) bad(`${r}: пропуск уровня h${lv[i - 1]} -> h${x}`); });
  const text = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ').toLowerCase();
  FORBID.forEach((w) => { if (text.includes(w)) bad(`${r}: запрещённая формулировка «${w}»`); });
  if (EMOJI.test(text)) bad(r + ': найден эмодзи');
  if (/<img(?![^>]*\balt=)/.test(h)) bad(r + ': img без alt');
  for (const m of h.matchAll(/<img\b([^>]*)>/g)) {
    const a = m[1];
    if (!/\bwidth="\d+"/.test(a) || !/\bheight="\d+"/.test(a)) bad(r + ': img без width/height (риск CLS)');
    if (/\balt=""/.test(a)) bad(r + ': пустой alt у информативной картинки');
  }
  for (const m of h.matchAll(/(?:src|srcset)="([^"]+)"/g)) for (const u of m[1].split(',').map((x) => x.trim().split(/\s+/)[0])) if (u.startsWith('/images/') && !existsSync(join(dist, u))) bad(`${r}: нет файла ${u}`);
  // кнопки без действия
  for (const m of h.matchAll(/<button\b([^>]*)>/g)) if (!/type="/.test(m[1])) bad(r + ': button без type');
  for (const m of h.matchAll(/<a\b([^>]*?)>/g)) {
    const href = (m[1].match(/href="([^"]*)"/) || [])[1];
    if (href === undefined) { bad(r + ': <a> без href'); continue; }
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [path0, hash] = href.split('#'); const q = path0.split('?')[0] || r;
    const file = q.endsWith('/') ? q + 'index.html' : q;
    const target = join(dist, file.startsWith('/') ? file : join(dirname(r), file));
    if (!existsSync(target)) { bad(`${r}: битая ссылка ${href}`); continue; }
    if (hash) { const key = (file.startsWith('/') ? file : '/' + file); if (!ids[key] || !ids[key].has(hash)) bad(`${r}: нет якоря #${hash} на ${key}`); }
  }
  // aria-controls ссылаются на существующие id
  for (const m of h.matchAll(/aria-controls="([^"]+)"/g)) if (!ids[r].has(m[1])) bad(`${r}: aria-controls → нет #${m[1]}`);
  const dup = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]); const seen = new Set(); dup.forEach((i) => { if (seen.has(i)) bad(`${r}: дубль id ${i}`); seen.add(i); });
}
for (const f of ['sitemap.xml', 'robots.txt', 'favicon.svg', 'assets/styles.css', 'assets/main.js']) if (!existsSync(join(dist, f))) bad('нет ' + f);
const sm = readFileSync(join(dist, 'sitemap.xml'), 'utf8'); if (sm.includes('404')) bad('404 попал в sitemap');
console.log(`Страниц: ${htmls.length}. ${fail ? 'Ошибок: ' + fail : 'Все проверки пройдены.'}`);
process.exit(fail ? 1 : 0);
