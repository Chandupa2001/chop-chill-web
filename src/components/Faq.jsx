import { site } from '../config/site.js';
import { links } from '../lib/links.js';
import Icon from './ui/Icon.jsx';
import styles from './Faq.module.css';

export default function Faq() {
  return (
    <section id="faq" className={`container ${styles.faq}`} aria-labelledby="faq-title">
      <div className={styles.main}>
        <p className="eyebrow" data-reveal>
          FAQ
        </p>
        <h2 id="faq-title" className="display h2" data-reveal>
          Good <span className="serif">to</span> know
        </h2>

        <div className={styles.list} data-reveal>
          {site.faq.map((item) => (
            <details key={item.q} className={styles.item}>
              <summary className={styles.q}>
                {item.q}
                <span className={styles.plus} aria-hidden="true">
                  <Icon name="plus" />
                </span>
              </summary>
              <p className={styles.a}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <aside className={styles.card} data-reveal style={{ '--i': 1 }}>
        <p className={styles.cardText}>Still have a question? Planning something special?</p>
        <a href={links.call} className={styles.cardLink}>
          <span className="display">Call us</span>
          <span className={styles.cardPhone}>
            {site.phone}
            <span className={styles.cardIcon}>
              <Icon name="phone" size={18} />
            </span>
          </span>
        </a>
      </aside>
    </section>
  );
}
