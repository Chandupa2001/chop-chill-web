import { site } from '../config/site.js';
import { DAY_NAMES, formatTime } from '../lib/hours.js';
import { links } from '../lib/links.js';
import styles from './Footer.module.css';

// "Mon – Thu 11 AM – 10 PM" style summary, grouping consecutive identical days.
function hoursSummary(hours) {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const key = (d) => (hours[d] ? `${hours[d].open}-${hours[d].close}` : 'closed');
  const groups = [];
  for (const d of order) {
    const last = groups.at(-1);
    if (last && last.key === key(d)) last.days.push(d);
    else groups.push({ key: key(d), days: [d] });
  }
  return groups.map(({ days }) => {
    const first = DAY_NAMES[days[0]].slice(0, 3);
    const lastDay = DAY_NAMES[days.at(-1)].slice(0, 3);
    const h = hours[days[0]];
    return {
      days: days.length > 1 ? `${first} – ${lastDay}` : first,
      time: h ? `${formatTime(h.open)} – ${formatTime(h.close)}` : 'Closed',
    };
  });
}

export default function Footer() {
  const { street, locality, city, postalCode } = site.address;
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <img
            src="/images/brand/logo-full.webp"
            alt={site.name}
            width="640"
            height="640"
            loading="lazy"
            decoding="async"
            className={styles.logo}
          />
          <address className={styles.text}>
            {street}, {city} {postalCode}
          </address>
        </div>

        <nav aria-label="Footer">
          <p className={styles.heading}>Explore</p>
          <ul className={styles.links}>
            <li><a href="#full-menu">Menu</a></li>
            <li><a href="#space">Our space</a></li>
            <li><a href="#visit">Visit</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </nav>

        <div>
          <p className={styles.heading}>Hours</p>
          <ul className={styles.links}>
            {hoursSummary(site.hours).map((row) => (
              <li key={row.days} className={styles.hoursRow}>
                <span>{row.days}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={styles.heading}>Talk to us</p>
          <ul className={styles.links}>
            <li><a href={links.call}>{site.phone}</a></li>
            <li><a href={links.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href={site.social.facebook} target="_blank" rel="noopener">Facebook</a></li>
            {site.social.instagram && (
              <li><a href={site.social.instagram} target="_blank" rel="noopener">Instagram</a></li>
            )}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.legal}`}>
        <span>© {new Date().getFullYear()} {site.name}</span>
        {/* <span>Made with love (and chilli) in {locality}</span> */}
      </div>

      <p className={`display ${styles.wordmark}`} aria-hidden="true">
        Chop<span>&amp;</span>Chill
      </p>
    </footer>
  );
}
