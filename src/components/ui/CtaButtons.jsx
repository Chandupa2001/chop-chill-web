import { links } from '../../lib/links.js';
import Icon from './Icon.jsx';

/**
 * The three actions, in priority order: Call, WhatsApp, Directions.
 * `variant="light"` is for dark backgrounds. `hideCall` drops the Call button
 * where a bigger Call element is already right next to it.
 */
export default function CtaButtons({ variant = 'default', size, hideCall = false, className = '' }) {
  const light = variant === 'light';
  const sizeClass = size === 'lg' ? ' btn--lg' : '';
  const secondary = `btn ${light ? 'btn--ghost-light' : 'btn--ghost'}${sizeClass}`;

  return (
    <div className={`cta-row ${className}`}>
      {!hideCall && (
        <a className={`btn ${light ? 'btn--light' : 'btn--call'}${sizeClass}`} href={links.call}>
          <Icon name="phone" />
          Call to reserve
        </a>
      )}
      <a className={secondary} href={links.whatsapp} target="_blank" rel="noopener">
        <Icon name="whatsapp" />
        WhatsApp
      </a>
      <a className={secondary} href={links.directions} target="_blank" rel="noopener">
        <Icon name="pin" />
        Directions
      </a>
    </div>
  );
}
