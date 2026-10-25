import { site } from '../config/site.js';
import Icon from './ui/Icon.jsx';
import styles from './Reviews.module.css';

// Hidden until real reviews are added to site.reviews.
export default function Reviews() {
  if (!site.reviews.length) return null;

  return (
    <section className={`container section ${styles.reviews}`} aria-labelledby="reviews-title">
      <p className="eyebrow" data-reveal>
        Kind words
      </p>
      <h2 id="reviews-title" className="display h2" data-reveal>
        Families <span className="serif">keep</span> coming back.
      </h2>

      <ul className={styles.list}>
        {site.reviews.map((review, i) => (
          <li key={i} className={styles.card} data-reveal style={{ '--i': i % 3 }}>
            <blockquote className={styles.quote}>“{review.quote}”</blockquote>
            <p className={styles.who}>
              {review.name}
              {review.source && <span> · {review.source}</span>}
            </p>
          </li>
        ))}
      </ul>

      {site.googleReviewsUrl && (
        <a href={site.googleReviewsUrl} className="btn btn--ghost" target="_blank" rel="noopener">
          Read more reviews
          <Icon name="arrow" />
        </a>
      )}
    </section>
  );
}
