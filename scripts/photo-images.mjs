// Generates web-sized versions of the site's photos listed in site.js:
// the signature dish photos and the "Our space" photo.
// Run with `npm run photos` after adding or changing one.
//
//   public/images/<group>/<name>-<width>.webp   resized WebP versions
//   src/config/photos.json                       what was generated; read by the page
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { site } from '../src/config/site.js';

const groups = [
  // Cards are ~320px wide, the featured dish up to ~800px
  { dir: 'dishes', widths: [640, 1200], photos: site.dishes.map((d) => d.photo) },
  // The space photo is up to ~780px wide on desktop
  { dir: 'space', widths: [800, 1600], photos: [site.spacePhoto] },
];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const images = join(root, 'public', 'images');

const manifest = {};
for (const group of groups) {
  const out = join(images, group.dir);
  mkdirSync(out, { recursive: true });
  const written = new Set();

  for (const photo of group.photos.filter(Boolean)) {
    const source = join(images, photo);
    if (!existsSync(source)) {
      console.warn(`missing: public/images/${photo}. It will show a placeholder`);
      continue;
    }
    const { width, height } = await sharp(source).metadata();
    // Never upscale: keep the sizes the photo can fill, and use the photo's own
    // width in place of any larger size it can't reach.
    const widths = group.widths.filter((w) => w <= width);
    if (widths.length < group.widths.length) widths.push(width);

    const srcSet = [];
    for (const w of widths) {
      const file = `${parse(photo).name}-${w}.webp`;
      await sharp(source).resize(w).webp({ quality: 76 }).toFile(join(out, file));
      srcSet.push({ src: `/images/${group.dir}/${file}`, w });
      written.add(file);
    }
    const largest = srcSet.at(-1).w;
    manifest[photo] = { srcSet, width: largest, height: Math.round((height * largest) / width) };
  }

  // Remove versions of photos that are no longer used
  for (const file of readdirSync(out)) if (!written.has(file)) rmSync(join(out, file));
}

writeFileSync(join(root, 'src', 'config', 'photos.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`web-sized versions written for ${Object.keys(manifest).length} photos`);
