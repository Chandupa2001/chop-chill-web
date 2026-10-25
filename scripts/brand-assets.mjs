// Generates the website's logo files from public/images/logo.jpeg.
// Run with `npm run brand` whenever the logo changes.
//
//   public/images/brand/emblem.webp      round chef badge (header, stamp)
//   public/images/brand/logo-full.webp   full logo, resized (footer)
//   public/favicon-32.png, public/apple-touch-icon.png
//   public/images/og-image.jpg           link preview, only if none exists yet
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const source = join(pub, 'images', 'logo.jpeg');
const out = join(pub, 'images', 'brand');
mkdirSync(out, { recursive: true });

// Logo geometry (measured on the 2048×2048 source)
const BG = { r: 0x17, g: 0x17, b: 0x19 };
const CX = 1040; // badge centre
const CY = 876;
const R = 690; // badge radius incl. a little dark margin around the orange ring
const TITLE_TOP = 1462; // "CHOP & CHILL" lettering starts below this line

const logo = sharp(source);
const { width } = await logo.metadata();
const scale = width / 2048;
const px = (n) => Math.round(n * scale);

// Round emblem: crop the badge, paint out the lettering that dips into the
// bottom of the circle, then mask to a circle with transparent corners.
const size = px(R * 2);
const left = px(CX - R);
const top = px(CY - R);
const cover = Buffer.from(
  `<svg width="${size}" height="${size}"><rect x="0" y="${px(TITLE_TOP) - top}" width="${size}" height="${size}" fill="rgb(${BG.r},${BG.g},${BG.b})"/></svg>`,
);
const circle = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`);
const emblem = await sharp(source)
  .extract({ left, top, width: size, height: size })
  .composite([{ input: cover }])
  .png()
  .toBuffer();
const emblemRound = await sharp(emblem).ensureAlpha().composite([{ input: circle, blend: 'dest-in' }]).png().toBuffer();

await sharp(emblemRound).resize(320).webp({ quality: 86 }).toFile(join(out, 'emblem.webp'));
await sharp(emblemRound).resize(32).png().toFile(join(pub, 'favicon-32.png'));
// iOS ignores transparency, so the touch icon sits on the logo's own background
await sharp(emblem).resize(180).flatten({ background: BG }).png().toFile(join(pub, 'apple-touch-icon.png'));

await sharp(source).resize(640).webp({ quality: 84 }).toFile(join(out, 'logo-full.webp'));

const og = join(pub, 'images', 'og-image.jpg');
if (!existsSync(og)) {
  const mark = await sharp(source).resize(560).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: BG } })
    .composite([{ input: mark, top: 35, left: 320 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(og);
  console.log('created og-image.jpg from the logo (replace it with a food photo any time)');
}

console.log('brand assets written to public/images/brand');
