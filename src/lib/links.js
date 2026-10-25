import { site } from '../config/site.js';

export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export function whatsappHref(number, message, source) {
  const text = source ? `${message} (ref: ${source})` : message;
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export const directionsHref = ({ mapsPlaceUrl, mapsQuery }) =>
  mapsPlaceUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`;

export const mapEmbedSrc = (query) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

// Links shared from QR codes, ads and posts carry ?src=… so the WhatsApp
// message tells the owner which channel the guest came from.
export function readSource(search) {
  const src = new URLSearchParams(search).get('src');
  return src ? src.replace(/[^\w-]/g, '').slice(0, 40) || null : null;
}

const source = typeof window === 'undefined' ? null : readSource(window.location.search);

export const links = {
  call: telHref(site.phone),
  whatsapp: whatsappHref(site.whatsapp, site.whatsappMessage, source),
  directions: directionsHref(site),
  mapEmbed: mapEmbedSrc(site.mapsQuery),
};
