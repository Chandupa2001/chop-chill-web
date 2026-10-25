import { links } from '../lib/links.js';
import Icon from './ui/Icon.jsx';
import styles from './Header.module.css';

const nav = [
  { href: '#full-menu', label: 'Menu' },
  { href: '#space', label: 'Our space' },
  { href: '#visit', label: 'Visit' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label="Chop & Chill, back to top">
          <img src="/images/brand/emblem.webp" alt="" width="46" height="46" className={styles.emblem} />
          <span className={`display ${styles.wordmark}`}>
            Chop<span className={styles.amp}>&amp;</span>Chill
          </span>
        </a>

        <nav aria-label="Sections" className={styles.nav}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href={links.call} className={styles.call}>
          <span className={styles.callText}>Call</span>
          <span className={styles.callIcon}>
            <Icon name="phone" size={18} />
          </span>
        </a>
      </div>
    </header>
  );
}
