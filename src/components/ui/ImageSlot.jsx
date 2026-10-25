import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import styles from './ImageSlot.module.css';

/**
 * A photo frame. Shows a warm placeholder (labelled with the expected file
 * name) until the real photo in /public/images loads, so the owner can see
 * exactly where each photo goes. Missing files simply keep the placeholder.
 * `srcSet`/`sizes` pick a resolution; `sources` ({ media, srcSet, sizes })
 * swap in a differently cropped image per screen size.
 *
 * Non-priority photos only start downloading when their section is about to
 * scroll into view. Mobile browsers fetch `loading="lazy"` images from far
 * below the screen, which would compete with the hero on slow connections.
 */
export default function ImageSlot({
  src,
  srcSet,
  sizes,
  sources = [],
  alt,
  width,
  height,
  priority = false,
  tone = 0,
  className = '',
  showLabel = true,
  label,
}) {
  const [state, setState] = useState('loading');
  const [near, setNear] = useState(priority);
  const ref = useRef(null);
  const file = label ?? src?.split('/').pop();

  useEffect(() => {
    if (near) return undefined;
    // Watch the whole section, so cards in a sideways-scrolling row load together
    const target = ref.current?.closest('section') ?? ref.current;
    if (!target || !('IntersectionObserver' in window)) {
      setNear(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [near]);

  const img = near && src && state !== 'error' && (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      // Priority images paint immediately (no fade) so they count as loaded sooner
      className={priority || state === 'loaded' ? styles.loaded : undefined}
      onLoad={() => setState('loaded')}
      onError={() => setState('error')}
    />
  );

  return (
    <div ref={ref} className={`${styles.slot} ${styles[`tone${tone % 4}`]} ${className}`}>
      {state !== 'loaded' && showLabel && file && (
        <span className={styles.label} aria-hidden="true">
          <Icon name="plate" size={22} />
          {file}
        </span>
      )}
      {img && sources.length > 0 ? (
        <picture>
          {sources.map((s) => (
            <source key={s.media} media={s.media} srcSet={s.srcSet} sizes={s.sizes} />
          ))}
          {img}
        </picture>
      ) : (
        img
      )}
    </div>
  );
}
