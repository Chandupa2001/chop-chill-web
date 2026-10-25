import { useRef, useState } from 'react';
import { site } from '../config/site.js';
import { links } from '../lib/links.js';
import { photoProps } from '../lib/photos.js';
import Icon from './ui/Icon.jsx';
import ImageSlot from './ui/ImageSlot.jsx';
import styles from './Dishes.module.css';

export default function Dishes() {
  const { dishes } = site;
  const [index, setIndex] = useState(0);
  const railRef = useRef(null);
  const featured = dishes[index];

  // Arrows change the featured dish and bring its card into view in the rail.
  const step = (delta) => {
    const next = (index + delta + dishes.length) % dishes.length;
    setIndex(next);
    const rail = railRef.current;
    const card = rail?.children[next];
    if (card) rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft), behavior: 'smooth' });
  };

  return (
    <section id="menu" className={`container ${styles.dishes}`} aria-labelledby="menu-title">
      <div className={styles.head}>
        <p className="eyebrow" data-reveal>
          Signature dishes
        </p>
        <h2 id="menu-title" className="display h2" data-reveal>
          The <span className="serif">crowd</span> favourites
        </h2>
      </div>

      <div className={styles.split}>
        {/* Featured dish */}
        <figure className={styles.feature} data-reveal>
          <ImageSlot
            key={featured.photo}
            {...photoProps(featured.photo)}
            sizes="(min-width: 900px) 58vw, 100vw"
            alt={featured.name}
            tone={index}
            className={styles.featureImg}
          />
          <ul className={styles.chips} aria-label="On the menu">
            {site.categories.map((c, i) => (
              <li key={c} className={`chip ${i % 3 === 1 ? 'chip--hot' : ''}`}>
                {c}
              </li>
            ))}
          </ul>
          <figcaption className={styles.caption} aria-live="polite">
            <span className={styles.capName}>{featured.name}</span>
            {featured.price && <span className={`serif ${styles.capPrice}`}>{featured.price}</span>}
            <span className={styles.capDesc}>{featured.desc}</span>
          </figcaption>
        </figure>

        {/* Stat + controls */}
        <div className={styles.side} data-reveal style={{ '--i': 1 }}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{site.menuCount}</span>
            <span className={styles.statLabel}>
              dishes on
              <br />
              the menu
            </span>
          </div>
          <p className={styles.sideText}>
            Kottu and devilled classics, wok-fired rice and noodles, sizzling grills and pasta, cooked fresh and made for
            sharing. There’s something here for every fussy eater.
          </p>

          <div className={styles.controls}>
            <div className={styles.arrows}>
              <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous dish">
                <Icon name="left" />
              </button>
              <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next dish">
                <Icon name="right" />
              </button>
            </div>
            <span className={styles.counter} aria-hidden="true">
              {index + 1}/{dishes.length}
            </span>
          </div>

          <div className="cta-row">
            <a href={links.call} className="btn btn--call">
              <Icon name="phone" />
              Call to order
            </a>
            <a href="#full-menu" className="btn btn--ghost">
              See the full menu
            </a>
          </div>
        </div>
      </div>

      {/* The full line-up */}
      <ul className={styles.rail} ref={railRef}>
        {dishes.map((dish, i) => (
          <li key={dish.name} className={styles.card} data-reveal style={{ '--i': i % 3 }}>
            <ImageSlot
              {...photoProps(dish.photo)}
              sizes="(min-width: 1231px) 320px, (min-width: 924px) 26vw, 240px"
              alt={dish.name}
              tone={i}
              className={styles.cardImg}
            />
            <div className={styles.cardMeta}>
              <h3 className={styles.cardName}>{dish.name}</h3>
              {dish.price && <span className={`serif ${styles.cardPrice}`}>{dish.price}</span>}
            </div>
            <p className={styles.cardDesc}>{dish.desc}</p>
          </li>
        ))}
        <li className={`${styles.card} ${styles.cardCta}`}>
          <a href={links.call} className={styles.ctaLink}>
            <span className="display">
              Hungry
              <br />
              <span className="serif">yet?</span>
            </span>
            <span className={styles.ctaRow}>
              Call to order
              <span className={styles.ctaIcon}>
                <Icon name="arrow" />
              </span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
