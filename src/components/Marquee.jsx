import { site } from '../config/site.js';
import styles from './Marquee.module.css';

export default function Marquee() {
  const row = (
    <ul className={styles.row}>
      {site.marquee.map((dish) => (
        <li key={dish}>
          {dish}
          <span className={styles.star}>✱</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`display ${styles.marquee}`} aria-hidden="true">
      <div className={styles.track}>
        {row}
        {row}
      </div>
    </div>
  );
}
