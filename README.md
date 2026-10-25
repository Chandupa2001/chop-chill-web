# Chop & Chill Family Restaurant: website

A one-page marketing site for Chop & Chill in Nawala. Its only job is to get visitors to **call** the restaurant. WhatsApp and Directions are the secondary actions.

It is built with React and Vite, and Vercel hosts it as a static site.

---

## 1. Replace the placeholders

**Everything the site says lives in one file:** [`src/config/site.js`](src/config/site.js).

Search it for `PLACEHOLDER` and replace each value. The ones to fix first:

| Field | What to put |
|---|---|
| `phone` | The number guests should call, e.g. `+94 11 234 5678` |
| `whatsapp` | The WhatsApp number, in any format |
| `address` | **Done:** 297/A Nawala Rd, Sri Jayawardenepura Kotte 10100 |
| `mapsPlaceUrl` | The restaurant's Google Maps share link. In Google Maps, tap **Share** and copy the link. |
| `hours` | Opening hours for each day, Sunday first. Use `null` for a closed day. |
| `dishes` | Names, short descriptions and prices |
| `stats`, `menuCount`, `faq` | The numbers and answers, made true for the restaurant |
| `url` | The final website address, once you have it |

The page title, the Facebook/WhatsApp link preview and the Google structured data are **generated from this same file** at build time. There is nothing else to keep in sync.

**Reviews:** the reviews section stays hidden until you add real reviews to `reviews` (copy them word for word from Google or Facebook). Please don't invent them.

## 2. Add the photos

Put photos in [`public/images/`](public/images/) with these exact names:

| File | Used for | Best size |
|---|---|---|
| `hero-new-2.jpeg` | Big photo at the top. **Done.** To change it, replace this file (or set `SOURCE_FILE` in [scripts/hero-image.mjs](scripts/hero-image.mjs)) and run `npm run hero`. That regenerates the optimised versions, including the portrait crop for phones. | 2400+ px wide (landscape) |
| `space.jpeg` | The "Our space" photo. **Done.** It's set as `spacePhoto` in `site.js`. After changing it, run `npm run photos`. | 2000+ px wide (landscape 4:3) |
| Dish photos (e.g. `mix-kottu.jpeg`) | Signature dishes. **Done.** Each dish names its file in `photo` in `site.js`. After adding or changing one, run `npm run photos` to make the web-sized versions. | 1200 × 1500 (portrait 4:5) |
| `og-image.jpg` | The preview image when the link is shared on Facebook or WhatsApp | exactly 1200 × 630 |

An `og-image.jpg` made from the logo is already included. Swap it for an appetising food photo (1200 × 630) whenever you have one.

Until a photo is added, its slot shows a warm placeholder with the expected file name, so you can see where each photo goes. Photos are compressed automatically when the site is built. Still, export them at roughly the sizes above (as JPGs under ~500 KB) so the page stays fast on mobile data.

Photos can be `.jpeg`, `.jpg`, `.png` or `.webp`. Just use the exact file name in `site.js` (or `SOURCE_FILE` in `scripts/hero-image.mjs` for the hero).

### The logo

The original logo is `public/images/logo.jpeg`. These files are generated from it:

- the round chef emblem in the header and on the rotating stamp
- the full logo in the footer
- the favicons

If the logo ever changes, replace `logo.jpeg` and run:

```bash
npm run brand
```

## 3. Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run test      # opening-hours logic tests
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## 4. Deploy to Vercel

1. Push this folder to a GitHub repo, or drag the folder into Vercel, or run `npx vercel` in it.
2. Vercel detects **Vite** automatically. If it asks, use build command `npm run build` and output directory `dist`.
3. Once it's live, set `url` in `site.js` to the real address and redeploy, so link previews use the right domain.
4. Paste the URL into [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/) and click **Scrape Again** to refresh the preview.

## 5. Tracking where guests come from

Add `?src=` to the link wherever you share it. The source is added to the end of the pre-filled WhatsApp message, so you can see which channel brought each chat in:

| Where | Link |
|---|---|
| Facebook bio | `https://your-site/?src=fb-bio` |
| Table QR code | `https://your-site/?src=qr-table` |
| Flyer QR code | `https://your-site/?src=qr-flyer` |
| A specific ad | `https://your-site/?src=ad-oct` |

A chat from the table QR code arrives as: *"Hi Chop & Chill! I'd like to reserve a table. (ref: qr-table)"*.

## Project map

```
src/config/site.js        ← all content
src/components/           ← one file per page section (+ .module.css)
src/components/ui/        ← shared pieces: buttons, icons, photo slots, open-now badge
src/lib/hours.js          ← "Open now / Closed" logic in Sri Lanka time
src/lib/links.js          ← call / WhatsApp / directions links
src/lib/seo.js            ← builds <head> tags from the config
src/styles/tokens.css     ← colours, fonts, spacing
```
