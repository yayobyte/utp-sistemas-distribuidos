import React, { useState } from 'react';
import { RichText } from '../../pages/ClasePage';
import { members } from '../../data/exposicion.data';
import type { SlideContent } from '../../data/exposicion.data.d';

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="deck-bullets">
    {items.map((item, i) => (
      <li key={i} style={{ animationDelay: `${120 + i * 90}ms` }}>
        <RichText text={item} />
      </li>
    ))}
  </ul>
);

const Quiz: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <ol className="deck-quiz">
      {items.map((item, i) => (
        <li key={i}>
          <button
            type="button"
            className={`deck-quiz-item ${open[i] ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
            aria-expanded={Boolean(open[i])}
          >
            <span className="deck-quiz-q">{item.q}</span>
            <span className="deck-quiz-a">{open[i] ? item.a : 'Clic para ver la respuesta'}</span>
          </button>
        </li>
      ))}
    </ol>
  );
};

export const SlideContentView: React.FC<{ content: SlideContent }> = ({ content }) => {
  switch (content.kind) {
    case 'title':
      return <p className="deck-subtitle">{content.subtitle}</p>;
    case 'team':
      return (
        <ul className="deck-team">
          {members.map((m, i) => (
            <li key={i} className={m.pending ? 'is-pending' : ''} style={{ animationDelay: `${i * 90}ms` }}>
              <span className="deck-team-avatar">{m.pending ? '?' : m.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
              <span>{m.name}</span>
            </li>
          ))}
        </ul>
      );
    case 'bullets':
      return <Bullets items={content.items} />;
    case 'cards':
      return (
        <div className="deck-cards">
          {content.items.map((card, i) => (
            <div key={i} className="deck-card" style={{ animationDelay: `${100 + i * 80}ms` }}>
              {card.tag && <span className="deck-card-tag">{card.tag}</span>}
              <strong>{card.title}</strong>
              <span><RichText text={card.text} /></span>
            </div>
          ))}
        </div>
      );
    case 'compare':
      return (
        <div className="deck-compare">
          {[content.left, content.right].map((side, i) => (
            <div key={i} className={`deck-compare-col ${i ? 'is-right' : ''}`}>
              <h3>{side.title}</h3>
              <Bullets items={side.items} />
            </div>
          ))}
        </div>
      );
    case 'code':
      return (
        <>
          <pre className="deck-code" data-lang={content.lang}><code>{content.code}</code></pre>
          {content.items && <Bullets items={content.items} />}
        </>
      );
    case 'quiz':
      return <Quiz items={content.items} />;
  }
};
