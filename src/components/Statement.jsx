import { site } from '../config/site.js';
import Stamp from './ui/Stamp.jsx';
import styles from './Statement.module.css';

const lines = [
  <>
    <span className="serif">we</span> cook like family.
  </>,
  <>
    you share <span className="serif">the</span> table.
  </>,
  <>
    the kids <span className="serif">run</span> the show.
  </>,
];

export default function Statement() {
  return (
    <section className={`container section ${styles.statement}`} aria-label="About Chop & Chill">
      <div className={styles.top}>
        <p className="eyebrow" data-reveal>
          A family restaurant in {site.address.locality}
        </p>
        <Stamp className={styles.stamp} />
      </div>

      <h2 className={styles.lines}>
        {lines.map((line, i) => (
          <span key={i} className={styles.line} data-reveal style={{ '--i': i }}>
            {line}
          </span>
        ))}
      </h2>

      <p className={`lede ${styles.about}`} data-reveal>
        {site.about}
      </p>
    </section>
  );
}
