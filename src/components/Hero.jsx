import { site } from '../config/site.js';
import hero from '../config/hero.json';
import { HERO_MOBILE_MEDIA, HERO_SIZES, heroSrcSet } from '../lib/heroImage.js';
import { links } from '../lib/links.js';
import CtaButtons from './ui/CtaButtons.jsx';
import ImageSlot from './ui/ImageSlot.jsx';
import OpenBadge from './ui/OpenBadge.jsx';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.frame}>
        <ImageSlot
          src={hero.landscape[0].src}
          srcSet={heroSrcSet(hero)}
          sizes={HERO_SIZES}
          sources={[{ media: HERO_MOBILE_MEDIA, srcSet: hero.mobile }]}
          alt="A table spread with kottu, seafood noodles, fried rice, a grill platter, devilled dishes and mojitos at Chop & Chill"
          width={hero.width}
          height={hero.height}
          priority
          className={styles.media}
        />
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.content}>
          <h1 id="hero-title" className={`display ${styles.title}`}>
            Good food <span className="serif">tastes better</span> together.
          </h1>
          <div className={styles.aside}>
            <OpenBadge />
            <p className={styles.intro}>
              Big plates, bigger tables and a warm welcome for the whole family, right here in {site.address.locality}.
            </p>
          </div>
        </div>

        <div className={styles.wordmarkRow}>
          <div className={styles.stickers}>
            <span className="sticker">Family restaurant</span>
            <span className="sticker sticker--dark">Nawala · Colombo</span>
            <span className="sticker sticker--hot">BYOB · Bring your own bottle</span>
          </div>

          {/* Giant wordmark bleeding off the bottom of the photo */}
          <p className={`display ${styles.wordmark}`} aria-hidden="true">
            <span>Chop</span>
            <span className={styles.amp}>&amp;</span>
            <span>Chill</span>
          </p>
        </div>
      </div>

      <div className={styles.below} id="hero-actions">
        <p className={styles.note}>
          Walk-ins welcome. Coming with six or more? Call{' '}
          <a href={links.call} className={styles.phone}>
            {site.phone}
          </a>
        </p>
        <CtaButtons />
      </div>
    </section>
  );
}
