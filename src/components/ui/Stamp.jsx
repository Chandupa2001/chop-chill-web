import { useId } from 'react';
import styles from './Stamp.module.css';

const RING_TEXT = 'Family restaurant ✱ Nawala ✱ Chop & Chill ✱ ';

/**
 * A slowly turning ring of text around a centre mark: the chef emblem by
 * default, or any `children`. `solid` puts it on a cream disc so it reads on
 * top of photos.
 */
export default function Stamp({ text = RING_TEXT, solid = false, children, className = '' }) {
  const pathId = `stamp-${useId().replace(/[^\w-]/g, '')}`;
  return (
    <div className={`${styles.stamp} ${solid ? styles.solid : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={styles.ring}>
        <defs>
          <path id={pathId} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text>
          <textPath href={`#${pathId}`} textLength="512">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
      {children ? (
        <div className={styles.centre}>{children}</div>
      ) : (
        <img src="/images/brand/emblem.webp" alt="" width="320" height="320" loading="lazy" decoding="async" className={styles.emblem} />
      )}
    </div>
  );
}
