import { useEffect, useState } from 'react';
import { site } from '../../config/site.js';
import { getOpenStatus } from '../../lib/hours.js';
import styles from './OpenBadge.module.css';

export function useOpenStatus() {
  const [status, setStatus] = useState(() => getOpenStatus(site.hours));
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus(site.hours)), 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

export default function OpenBadge({ className = '' }) {
  const status = useOpenStatus();
  const tone = status.isOpen ? (status.closingSoon ? styles.soon : styles.open) : styles.closed;
  return (
    <span className={`${styles.badge} ${tone} ${className}`}>
      <span className={styles.dot} aria-hidden="true" />
      {status.label}
    </span>
  );
}
