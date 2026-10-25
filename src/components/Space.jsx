import { site } from '../config/site.js';
import { photoProps } from '../lib/photos.js';
import Icon from './ui/Icon.jsx';
import ImageSlot from './ui/ImageSlot.jsx';
import Stamp from './ui/Stamp.jsx';
import styles from './Space.module.css';

export default function Space() {
  return (
    <section id="space" className={styles.space} aria-labelledby="space-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-reveal>
            Our space
          </p>
          <h2 id="space-title" className="display h2" data-reveal>
            Room for <span className="serif">the whole</span> family.
          </h2>
          <p className="lede" data-reveal>
            Long tables for big gatherings, cosy corners for two, and nobody minds a little noise. Birthdays, Sunday lunches and
            “we couldn’t be bothered to cook” nights are all welcome here.
          </p>
          {/* BYOB is a big draw, so it gets its own feature card */}
          <div className={styles.byob} data-reveal>
            <span className={styles.byobIcon} aria-hidden="true">
              <Icon name="wine" size={26} />
            </span>
            <div>
              <p className={styles.byobTag}>We’re BYOB</p>
              <p className={`display ${styles.byobTitle}`}>
                Bring your <span className="serif">own</span> bottle.
              </p>
              <p className={styles.byobText}>
                Pick up your favourite bottle on the way and pair it with a sizzling kottu or a grill platter.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.photoWrap} data-reveal>
          <ImageSlot
            {...photoProps(site.spacePhoto)}
            sizes="(min-width: 900px) 56vw, 100vw"
            alt="Friends sharing dinner and drinks at Chop & Chill"
            tone={2}
            className={styles.photo}
          />
          <Stamp solid text="Bring your own bottle ✱ Bring your own bottle ✱ " className={styles.stamp}>
            <span className={`display ${styles.stampMark}`}>BYOB</span>
          </Stamp>
        </div>
      </div>

      <ul className={`container ${styles.stats}`}>
        {site.stats.map((stat, i) => (
          <li key={stat.label} className={styles.stat} data-reveal style={{ '--i': i }}>
            <span className={styles.num}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
