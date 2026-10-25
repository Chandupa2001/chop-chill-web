// Shared by the Hero component and the <head> preload (vite.config.js), so the
// preloaded image is always the one the page actually uses.
// The manifest (src/config/hero.json) is written by `npm run hero`.

export const HERO_MOBILE_MEDIA = '(max-width: 719px)';
export const HERO_SIZES = '(min-width: 1440px) 1360px, 100vw';

export const heroSrcSet = (hero) => hero.landscape.map((l) => `${l.src} ${l.w}w`).join(', ');

export function buildHeroPreload(hero) {
  return [
    `<link rel="preload" as="image" href="${hero.mobile}" media="${HERO_MOBILE_MEDIA}" fetchpriority="high" />`,
    `<link rel="preload" as="image" imagesrcset="${heroSrcSet(hero)}" imagesizes="${HERO_SIZES}" media="not all and ${HERO_MOBILE_MEDIA}" fetchpriority="high" />`,
  ].join('\n    ');
}
