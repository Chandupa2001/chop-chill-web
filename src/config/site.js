// ─────────────────────────────────────────────────────────────────────────────
// Chop & Chill: everything the website says about the restaurant lives here.
// Anything marked PLACEHOLDER must be replaced with the real details before
// the site goes live. The page, the Google/Facebook previews (meta tags) and
// the structured data in <head> are all generated from this one file.
// Keep this file plain data: it is also imported by vite.config.js (Node).
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'Chop & Chill Family Restaurant',
  shortName: 'Chop & Chill',

  // The public URL once deployed (used for link previews). PLACEHOLDER
  url: 'https://chop-and-chill.vercel.app',

  description:
    'Chop & Chill is a family restaurant in Nawala. Generous plates, big tables and a warm welcome for the whole family. Call to reserve a table.',

  // ── Contact ────────────────────────────────────────────────────────────────
  phone: '+94 71 260 0816', // PLACEHOLDER (shown on the page and used for tap-to-call)
  whatsapp: '+94 71 260 0816', // PLACEHOLDER (any format; non-digits are stripped)
  whatsappMessage: 'Hi Chop & Chill! I’d like to reserve a table.',

  address: {
    street: '297/A Nawala Rd',
    locality: 'Nawala', // the neighbourhood, used in the page copy
    city: 'Sri Jayawardenepura Kotte',
    postalCode: '10100',
    country: 'LK',
  },
  // Text Google Maps searches for. An exact share link (maps.app.goo.gl/…)
  // in mapsPlaceUrl is more precise and takes priority for directions.
  mapsQuery: 'Chop & Chill Family Restaurant, 297/A Nawala Rd, Sri Jayawardenepura Kotte 10100',
  mapsPlaceUrl: '', // PLACEHOLDER

  // ── Opening hours (Sri Lanka time) ─────────────────────────────────────────
  // Index 0 = Sunday … 6 = Saturday. Use null for a closed day.
  // A closing time earlier than the opening time means "after midnight".
  hours: [
    { open: '11:00', close: '22:30' }, // Sunday     PLACEHOLDER
    { open: '11:00', close: '22:00' }, // Monday     PLACEHOLDER
    { open: '11:00', close: '22:00' }, // Tuesday    PLACEHOLDER
    { open: '11:00', close: '22:00' }, // Wednesday  PLACEHOLDER
    { open: '11:00', close: '22:00' }, // Thursday   PLACEHOLDER
    { open: '11:00', close: '23:00' }, // Friday     PLACEHOLDER
    { open: '11:00', close: '23:00' }, // Saturday   PLACEHOLDER
  ],

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100070771752286',
    instagram: '', // optional
  },
  googleReviewsUrl: '', // optional: link to the Google reviews page

  // ── Copy ───────────────────────────────────────────────────────────────────
  about:
    'Chop & Chill is a family-run restaurant in the heart of Nawala. We cook the dishes we grew up sharing, in portions made for passing around the table. Bring the grandparents, bring the kids, bring an appetite.', // PLACEHOLDER
  cuisine: ['Sri Lankan', 'Chinese', 'Western', 'Grills'],
  priceRange: 'Rs. 1,000 – 4,000', // PLACEHOLDER

  // Dish names that scroll across the page under the hero
  marquee: [
    'Chop & Chill mix kottu',
    'Cheese kottu',
    'Devilled chicken',
    'Hot butter cuttlefish',
    'BYOB: bring your own bottle',
    'Nasi goreng',
    'Mongolian fried rice',
    'Pad thai noodles',
    'Sri Lankan black pork',
    'Seafood tom yum',
    'Strawberry mojito',
  ],

  // Chips over the featured dish photo
  categories: ['Kottu', 'Fried rice', 'Noodles', 'Chopsuey', 'Grills', 'Mojitos'],

  menuCount: '80+', // big number beside the dishes

  // ── Signature dishes ───────────────────────────────────────────────────────
  // `photo` is a file in /public/images (portrait 4:5 works best). After adding
  // or changing one, run `npm run dishes` to make the web-sized versions.
  // Prices were unreadable in the menu photos; fill them in (e.g. 'Rs. 1,650')
  // and they appear on the cards. Empty prices are simply hidden.
  dishes: [
    { name: 'Chop & Chill mix kottu', desc: 'The house kottu, loaded with chicken, sausage, beef and pork.', price: '', photo: 'mix-kottu.jpeg' },
    { name: 'Cheese kottu (chicken)', desc: 'Chopped godamba roti and chicken, folded through with melted cheese.', price: '', photo: 'cheese-kottu-chicken.jpeg' },
    { name: 'Devilled chicken', desc: 'Boneless chicken tossed with onion, capsicum and a sweet-hot chilli glaze.', price: '', photo: 'devilled-chicken.png' },
    { name: 'Hot butter cuttlefish', desc: 'Golden, crunchy and buttery, with spring onion and chilli.', price: '', photo: 'hot-butter-cuttlefish.jpeg' },
    { name: 'Nasi goreng (seafood)', desc: 'Spiced seafood fried rice, the Indonesian way.', price: '', photo: 'nasi-goreng.jpeg' },
    { name: 'Special mix meat platter', desc: 'A Chop & Chill grill platter of mixed meats, built for sharing.', price: '', photo: 'meat-platter.jpeg' },
  ],

  // ── Full menu ──────────────────────────────────────────────────────────────
  // Transcribed from photos of the printed menu. The photos were low
  // resolution, so items that couldn't be read with confidence are left out
  // and prices are not shown. Check spelling against the real menu and add
  // anything missing.
  menu: [
    {
      category: 'Kottu',
      note: 'Regular & large',
      items: ['Vegetable kottu', 'Egg kottu', 'Chicken kottu', 'Pork kottu', 'Beef kottu', 'Chicken masala kottu', 'Cheese kottu (chicken)', 'Chop & Chill mix kottu (chicken, sausage, beef, pork)'],
    },
    {
      category: 'Fried rice',
      note: 'Regular & large',
      items: [
        'Vegetable fried rice',
        'Egg fried rice',
        'Chicken fried rice',
        'Chicken garlic fried rice with kankung',
        'Seafood fried rice',
        'Mongolian fried rice (chicken)',
        'Nasi goreng (seafood)',
        'Thai pineapple rice (seafood)',
        'Chop & Chill mix rice',
        'Chop & Chill all mix special',
        'Steamed rice bowl',
      ],
    },
    {
      category: 'Noodles',
      note: 'Regular & large',
      items: [
        'Vegetable noodles',
        'Egg noodles',
        'Chicken noodles',
        'Seafood noodles',
        'Mongolian noodles (chicken)',
        'Mee goreng noodles (seafood)',
        'Pad thai noodles (chicken)',
        'Chop & Chill mix noodles',
        'Special mix noodles',
      ],
    },
    { category: 'Chopsuey', items: ['Vegetable chopsuey', 'Chicken chopsuey', 'Seafood chopsuey', 'Mix chopsuey'] },
    { category: 'Pasta', items: ['Pasta in cream sauce', 'Spaghetti carbonara (pork)', 'Seafood marinara'] },
    {
      category: 'Chicken',
      note: 'Boneless, 250 g',
      items: ['Devilled chicken', 'Fried chicken', 'Chilli chicken with cashew nuts', 'Pepper chicken with kankung', 'Fried kochchi chicken with steamed rice'],
    },
    {
      category: 'Beef',
      note: '250 g',
      items: ['Devilled beef', 'Pepper beef with kankung', 'Fried beef', 'Chilli beef', 'Beef stew', 'Fried kochchi beef with steamed rice'],
    },
    { category: 'Pork', note: '250 g', items: ['Devilled pork', 'Fried pork', 'Pork stew', 'Pepper pork with kankung', 'Sri Lankan style black pork'] },
    { category: 'Fish & prawns', note: 'Fish 250 g', items: ['Devilled fish', 'Fried fish', 'Hot butter prawns', 'Devilled prawns', 'Tempura prawns', 'Chilli garlic prawns'] },
    {
      category: 'Grills',
      note: 'Sides: fries, potato wedges, steamed rice, butter vegetables, mashed potato',
      items: [
        'Pan-seared chicken breast with pepper sauce',
        'Grilled beef steak with pepper sauce',
        'Grilled pork chop with pepper sauce',
        'Grilled seafood platter',
        'Chop & Chill special mix meat platter',
      ],
    },
    {
      category: 'Bites & starters',
      items: [
        'Hot butter cuttlefish',
        'Hot butter mushroom',
        'Devilled sausages',
        'Fried sausages',
        'Chicken omelette',
        'Cheese balls (6 pcs)',
        'Kochchi chicken balls (6 pcs)',
        'Garlic kankung',
        'French fries',
        'Potato wedges',
        'Cheese fries',
        'Fish & chips',
      ],
    },
    { category: 'Soup', items: ['Seafood tom yum soup', 'Mushroom soup', 'Sweet corn egg drop soup', 'Mushroom chicken soup', 'Sweet corn chicken soup'] },
    {
      category: 'Drinks',
      note: 'Mojitos & fresh juice · BYOB welcome',
      items: ['Virgin mojito', 'Strawberry mojito', 'Blue curaçao mojito', 'Apple mojito', 'Lime juice', 'Ambarella juice', 'Cucumber juice'],
    },
  ],

  // ── The space ──────────────────────────────────────────────────────────────
  // A file in /public/images; run `npm run photos` after changing it
  spacePhoto: 'space.jpeg',

  stats: [
    { value: '120', label: 'Seats, big tables welcome' }, // PLACEHOLDER
    { value: '25', label: 'Car park spaces' }, // PLACEHOLDER
    { value: '7', label: 'Days a week' }, // PLACEHOLDER
  ],

  // ── Reviews ────────────────────────────────────────────────────────────────
  // Only add real reviews, copied word for word (e.g. from Google or Facebook).
  // The section stays hidden while this list is empty.
  // Example: { quote: 'Lovely food…', name: 'Nimali P.', source: 'Google' }
  reviews: [
    {quote: 'The food was fresh and tasty, with good portion sizes 🍝 Service was friendly and quick. The place is clean and cozy, perfect for a casual meal. Prices are reasonable for the quality. Would definitely visit again! 💯', name: 'Achini Kalpana', source: 'Google'},
    {quote: 'Such a wonderful find! The service was top-notch and the staff made us feel right at home. The food was flavorful and fresh—honestly, everything we ordered was delicious. Definitely worth a visit!', name: 'Wijeweera KS', source: 'Google'}
  ],

  // ── FAQ ────────────────────────────────────────────────────────────────────
  faq: [
    { q: 'Do I need to reserve a table?', a: 'Walk-ins are always welcome. For groups of six or more, or on Friday and Saturday evenings, give us a quick call and we’ll keep a table ready.' }, // PLACEHOLDER
    { q: 'Is there parking?', a: 'Yes, there is free parking right at the restaurant.' }, // PLACEHOLDER
    { q: 'Is it good for kids?', a: 'Very. High chairs, a kids’ menu and plenty of space to wriggle.' }, // PLACEHOLDER
    { q: 'Can I bring my own drinks?', a: 'Yes, we’re BYOB. Bring your own bottle and enjoy it with your meal. Planning a bigger celebration? Give us a call and we’ll get the table ready.' },
    { q: 'Do you do takeaway?', a: 'Yes. Call ahead with your order and it’ll be hot and ready when you arrive.' }, // PLACEHOLDER
    { q: 'Can we celebrate a birthday or family event?', a: 'Absolutely. Call us with your date and headcount and we’ll help you plan the table and the food.' }, // PLACEHOLDER
  ],
};
