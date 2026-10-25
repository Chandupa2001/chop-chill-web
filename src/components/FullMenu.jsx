import { useRef, useState } from 'react';
import { site } from '../config/site.js';
import { links } from '../lib/links.js';
import Icon from './ui/Icon.jsx';
import styles from './FullMenu.module.css';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// "Cheese kottu (chicken)" → name + muted detail
function Item({ text }) {
  const match = text.match(/^(.*?)\s*\((.*)\)$/);
  if (!match) return text;
  return (
    <>
      {match[1]} <span className={styles.detail}>{match[2]}</span>
    </>
  );
}

export default function FullMenu() {
  const { menu } = site;
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  // Arrow keys move between categories, as expected for a tab list
  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    const jump = { Home: 0, End: menu.length - 1 }[e.key];
    if (step === undefined && jump === undefined) return;
    e.preventDefault();
    const next = jump ?? (active + step + menu.length) % menu.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="full-menu" className={`container ${styles.menu}`} aria-labelledby="full-menu-title">
      <div className={styles.head}>
        <p className="eyebrow" data-reveal>
          The full menu
        </p>
        <h2 id="full-menu-title" className="display h2" data-reveal>
          Something <span className="serif">for</span> everyone
        </h2>
      </div>

      <div className={styles.layout}>
        <div role="tablist" aria-label="Menu categories" className={styles.tabs} onKeyDown={onKeyDown}>
          {menu.map((section, i) => (
            <button
              key={section.category}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-${slug(section.category)}`}
              aria-selected={i === active}
              aria-controls={`panel-${slug(section.category)}`}
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(i)}
            >
              {section.category}
              <span className={styles.count}>{section.items.length}</span>
            </button>
          ))}
        </div>

        <div className={styles.panels}>
          {menu.map((section, i) => (
            <div
              key={section.category}
              role="tabpanel"
              id={`panel-${slug(section.category)}`}
              aria-labelledby={`tab-${slug(section.category)}`}
              hidden={i !== active}
              className={styles.panel}
            >
              <div className={styles.panelHead}>
                <h3 className={`display ${styles.panelTitle}`}>{section.category}</h3>
                {section.note && <p className={`serif ${styles.note}`}>{section.note}</p>}
              </div>
              <ol className={styles.items}>
                {section.items.map((item, n) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.num} aria-hidden="true">
                      {String(n + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <Item text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <div className={styles.cta}>
            <p>
              <strong>Prices, portions or today’s specials?</strong> Just ask. We’re happy to help you order for the whole table.
              And we’re BYOB, so bring your own bottle.
            </p>
            <div className="cta-row">
              <a href={links.call} className="btn btn--call">
                <Icon name="phone" />
                Call to order
              </a>
              <a href={links.whatsapp} className="btn btn--ghost" target="_blank" rel="noopener">
                <Icon name="whatsapp" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
