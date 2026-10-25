import { useState } from 'react';
import { site } from '../config/site.js';
import { DAY_NAMES, formatTime } from '../lib/hours.js';
import { links } from '../lib/links.js';
import Icon from './ui/Icon.jsx';
import OpenBadge, { useOpenStatus } from './ui/OpenBadge.jsx';
import styles from './Visit.module.css';

const WEEK = [1, 2, 3, 4, 5, 6, 0]; // Monday first

function HoursList() {
  const { today } = useOpenStatus();
  return (
    <dl className={styles.hours}>
      {WEEK.map((d) => {
        const h = site.hours[d];
        return (
          <div key={d} className={`${styles.hoursRow} ${d === today ? styles.today : ''}`}>
            <dt>
              {DAY_NAMES[d]}
              {d === today && <span className={styles.todayTag}>Today</span>}
            </dt>
            <dd>{h ? `${formatTime(h.open)} – ${formatTime(h.close)}` : 'Closed'}</dd>
          </div>
        );
      })}
    </dl>
  );
}

// The Google Map only loads after a tap, which keeps the first page load light.
function MapEmbed() {
  const [active, setActive] = useState(false);
  return (
    <div className={styles.map}>
      {active ? (
        <iframe
          title={`Map showing ${site.name}`}
          src={links.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button type="button" className={styles.mapCover} onClick={() => setActive(true)}>
          <span className={styles.mapPin} aria-hidden="true">
            <Icon name="pin" size={26} />
          </span>
          <span className={styles.mapCta}>Tap to load map</span>
        </button>
      )}
    </div>
  );
}

export default function Visit() {
  const { street, city, postalCode } = site.address;
  return (
    <section id="visit" className={`container section ${styles.visit}`} aria-labelledby="visit-title">
      <div className={styles.head}>
        <p className="eyebrow" data-reveal>
          Visit us
        </p>
        <h2 id="visit-title" className="display h2" data-reveal>
          Come <span className="serif">hungry,</span> leave <span className="serif">happy.</span>
        </h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.info} data-reveal>
          <address className={styles.address}>
            {street},
            <br />
            {city} {postalCode}
          </address>
          <OpenBadge className={styles.badge} />
          <HoursList />
          <div className="cta-row">
            <a href={links.call} className="btn btn--call">
              <Icon name="phone" />
              Call {site.phone}
            </a>
            <a href={links.directions} className="btn btn--ghost" target="_blank" rel="noopener">
              <Icon name="pin" />
              Directions
            </a>
          </div>
          <a href={site.social.facebook} className={styles.fb} target="_blank" rel="noopener">
            <Icon name="facebook" size={18} />
            Follow us on Facebook for specials
            <Icon name="arrow" size={16} />
          </a>
        </div>

        <div data-reveal style={{ '--i': 1 }}>
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
