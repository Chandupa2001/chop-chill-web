import CtaButtons from './ui/CtaButtons.jsx';
import OpenBadge from './ui/OpenBadge.jsx';
import styles from './CtaBand.module.css';

export default function CtaBand() {
  return (
    <section className={styles.band} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`}>
        <OpenBadge />
        <h2 id="cta-title" className={`display ${styles.title}`} data-reveal>
          Hungry? <span className="serif">we’re one call away.</span>
        </h2>
        <CtaButtons variant="light" size="lg" className={styles.buttons} />
      </div>
    </section>
  );
}
