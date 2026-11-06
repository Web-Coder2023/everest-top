// Подготовка картинки для сайта: node scripts/optimize-images.mjs <исходный.png> <имя>
// Создаёт public/images/<имя>-800.webp и <имя>-1600.webp. Нужен пакет sharp (ставится отдельно, в проект не входит).
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const [src, name] = process.argv.slice(2);
if (!src || !name) { console.error('Использование: node scripts/optimize-images.mjs <файл> <имя>'); process.exit(1); }
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
for (const w of [800, 1600]) {
  const i = await sharp(src).resize({ width: w }).webp({ quality: 82, effort: 5 }).toFile(join(out, `${name}-${w}.webp`));
  console.log(`${name}-${w}.webp ${i.width}x${i.height} ${(i.size / 1024).toFixed(0)} КБ`);
}
