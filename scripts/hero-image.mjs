// Generates web-ready hero images from the hero photo below.
// Run with `npm run hero` whenever the hero photo changes.
//
//   public/images/hero/hero-<width>.webp  landscape sizes (only those the photo can supply)
//   public/images/hero/hero-mobile.webp   portrait crop centred on the food (phones)
//   src/config/hero.json                  what was generated; read by the page and <head>
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SOURCE_FILE = 'hero-new-2.jpeg'; // in public/images
const FOCUS_X = 0.48; // where the food sits, as a fraction of the width
const MOBILE_ASPECT = 0.78; // width / height of the phone crop
const WIDTHS = [1600, 2400];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'public', 'images', SOURCE_FILE);
const out = join(root, 'public', 'images', 'hero');
mkdirSync(out, { recursive: true });

const { width, height } = await sharp(source).metadata();

// Never upscale: keep the sizes the photo can fill, or just its own width.
const widths = WIDTHS.filter((w) => w <= width);
if (!widths.length) widths.push(width);

const landscape = [];
for (const w of widths) {
  const file = `hero-${w}.webp`;
  await sharp(source).resize(w).webp({ quality: 74 }).toFile(join(out, file));
  landscape.push({ src: `/images/hero/${file}`, w });
}

const cropW = Math.round(height * MOBILE_ASPECT);
const left = Math.max(0, Math.min(width - cropW, Math.round(width * FOCUS_X - cropW / 2)));
await sharp(source)
  .extract({ left, top: 0, width: cropW, height })
  .resize({ height: Math.min(height, 1500) })
  .webp({ quality: 74 })
  .toFile(join(out, 'hero-mobile.webp'));

// Remove sizes left over from a previous, larger photo
const keep = new Set([...landscape.map((l) => l.src.split('/').pop()), 'hero-mobile.webp']);
for (const file of readdirSync(out)) if (!keep.has(file)) rmSync(join(out, file));

const manifest = {
  source: SOURCE_FILE,
  width: landscape.at(-1).w,
  height: Math.round((height * landscape.at(-1).w) / width),
  landscape,
  mobile: '/images/hero/hero-mobile.webp',
};
writeFileSync(join(root, 'src', 'config', 'hero.json'), `${JSON.stringify(manifest, null, 2)}\n`);

if (width < 2400) {
  console.log(`note: ${SOURCE_FILE} is ${width}px wide; a 2400px+ original would look sharper on large/retina screens`);
}
console.log(`hero images written to public/images/hero (${landscape.map((l) => l.w).join(', ')} + mobile)`);
