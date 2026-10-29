import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { clases, getClase, temaTone } from '../data/clases';
import type { Block } from '../data/clases/types';
import { ClaseDiagram } from '../components/clases/ClaseDiagram/ClaseDiagram';
import './ClasePage.styles.css';

/** Renders **bold** and `code` markers inside a string. */
export const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
      return <React.Fragment key={i}>{part}</React.Fragment>;
    })}
  </>
);

const BlockView: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.type) {
    case 'p':
      return <p className="clase-p"><RichText text={block.text} /></p>;
    case 'list':
      return (
        <ul className="clase-list">
          {block.items.map((item) => <li key={item}><RichText text={item} /></li>)}
        </ul>
      );
    case 'callout':
      return <p className="clase-callout"><RichText text={block.text} /></p>;
    case 'cards':
      return (
        <div className="clase-cards">
          {block.items.map((card) => (
            <div key={card.title} className="clase-card">
              <h4>{card.title}</h4>
              <p><RichText text={card.text} /></p>
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <div className="clase-table-wrap">
          <table className="clase-table">
            <thead>
              <tr>{block.headers.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => <td key={c}><RichText text={cell} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'diagram':
      return <ClaseDiagram id={block.id} caption={block.caption} />;
  }
};

const Repaso: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="clase-repaso">
      {items.map((item, i) => (
        <button
          key={item.q}
          type="button"
          className={`clase-flash ${open[i] ? 'is-open' : ''}`}
          aria-expanded={!!open[i]}
          onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
        >
          <span className="clase-flash-q">{item.q}</span>
          <span className="clase-flash-a">{open[i] ? item.a : 'Toca para ver la respuesta'}</span>
        </button>
      ))}
    </div>
  );
};

export const ClasePage: React.FC = () => {
  const { numero } = useParams();
  const clase = getClase(Number(numero));
  if (!clase) return <Navigate to="/clases" replace />;

  const prev = clases.find((c) => c.number === clase.number - 1);
  const next = clases.find((c) => c.number === clase.number + 1);
  const tone = temaTone[clase.tema];

  return (
    <article className={`clase-page container-tight ${tone}`}>
      <Link to="/clases" className="clase-back">
        <ArrowLeft size={14} /> Todas las clases
      </Link>

      <header className="clase-header">
        <p className="clase-kicker">
          Clase {String(clase.number).padStart(2, '0')} · {clase.date} · Tema: {clase.tema}
        </p>
        <h1 className="type-display-lg">{clase.title}</h1>
        <p className="clase-idea">{clase.idea}</p>
        <ul className="clase-terms" aria-label="Términos clave">
          {clase.keyTerms.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </header>

      {clase.sections.map((section) => (
        <section key={section.heading} className="clase-section">
          <h2>{section.heading}</h2>
          {section.blocks.map((block, i) => <BlockView key={i} block={block} />)}
        </section>
      ))}

      <section className="clase-section">
        <h2>Repaso rápido</h2>
        <Repaso items={clase.repaso} />
      </section>

      <nav className="clase-pager" aria-label="Navegación entre clases">
        {prev ? (
          <Link to={`/clases/${prev.number}`} className="clase-pager-link">
            <ArrowLeft size={16} />
            <span><small>Clase {prev.number}</small>{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/clases/${next.number}`} className="clase-pager-link is-next">
            <span><small>Clase {next.number}</small>{next.title}</span>
            <ArrowRight size={16} />
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
};
