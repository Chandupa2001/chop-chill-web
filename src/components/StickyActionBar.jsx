import { useEffect, useState } from 'react';
import { links } from '../lib/links.js';
import Icon from './ui/Icon.jsx';
import styles from './StickyActionBar.module.css';

// Mobile only: the three actions, always one thumb away. It slides in once
// the buttons under the hero have been scrolled past (until then the header's
// Call pill and those buttons are on screen).
export default function StickyActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const actions = document.getElementById('hero-actions');
    if (!actions || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(actions);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`${styles.bar} ${visible ? styles.visible : ''}`} aria-label="Quick actions">
      <a href={links.call} className={`btn btn--call ${styles.call}`}>
        <Icon name="phone" />
        Call now
      </a>
      <a href={links.whatsapp} className={`${styles.round} ${styles.wa}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <Icon name="whatsapp" size={22} />
      </a>
      <a href={links.directions} className={styles.round} target="_blank" rel="noopener" aria-label="Get directions">
        <Icon name="pin" size={22} />
      </a>
    </nav>
  );
}
