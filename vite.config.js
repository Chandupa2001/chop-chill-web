import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { readFileSync } from 'node:fs';
import { site } from './src/config/site.js';
import { buildHead } from './src/lib/seo.js';
import { buildHeroPreload } from './src/lib/heroImage.js';

const readHero = () => JSON.parse(readFileSync(new URL('./src/config/hero.json', import.meta.url), 'utf8'));

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-head',
      transformIndexHtml: (html) =>
        html.replace('<!-- site-head -->', `${buildHeroPreload(readHero())}\n    ${buildHead(site)}`),
    },
    // Compresses the photos in /public/images at build time.
    ViteImageOptimizer({
      test: /\.(jpe?g|png|webp|avif)$/i,
      jpg: { quality: 78, mozjpeg: true },
      jpeg: { quality: 78, mozjpeg: true },
      png: { quality: 80 },
      webp: { quality: 78 },
      avif: { quality: 60 },
    }),
  ],
  test: {
    environment: 'node',
  },
});
