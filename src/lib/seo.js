// Builds the <head> tags (title, link previews, Restaurant structured data)
// from the site config at build time. Used by vite.config.js.
import { DAY_NAMES } from './hours.js';
import { directionsHref } from './links.js';

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function buildHead(site) {
  const url = site.url.replace(/\/$/, '');
  const title = `${site.shortName} | Family Restaurant in Nawala`;
  const image = `${url}/images/og-image.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    url,
    image,
    logo: `${url}/images/brand/logo-full.webp`,
    description: site.description,
    telephone: site.phone.replace(/\s/g, ''),
    servesCuisine: site.cuisine,
    priceRange: site.priceRange,
    acceptsReservations: true,
    hasMap: directionsHref(site),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: 'Western Province',
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours.flatMap((h, i) =>
      h ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${DAY_NAMES[i]}`, opens: h.open, closes: h.close }] : [],
    ),
    sameAs: Object.values(site.social).filter(Boolean),
  };

  const meta = [
    ['name', 'description', site.description],
    ['property', 'og:type', 'restaurant'],
    ['property', 'og:site_name', site.name],
    ['property', 'og:title', title],
    ['property', 'og:description', site.description],
    ['property', 'og:url', url],
    ['property', 'og:image', image],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:locale', 'en_GB'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', site.description],
    ['name', 'twitter:image', image],
  ];

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(url)}/" />`,
    ...meta.map(([attr, key, value]) => `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`),
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}
