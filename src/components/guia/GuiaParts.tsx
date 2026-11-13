import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RichText } from '../../pages/ClasePage';

export const guias = [
  { to: '/guia/arquitecturas', label: 'Arquitecturas', meta: 'Clases 1–13' },
  { to: '/guia/comunicacion', label: 'Comunicación', meta: 'Clases 15–17' },
  { to: '/guia/archivos', label: 'Archivos y nombres', meta: 'Clases 18–19' },
];

export const exposicionLinks = [
  { to: '/exposicion/microservicios', label: 'Presentación', meta: 'Microservicios · Grupo C' },
  { to: '/exposicion/guia', label: 'Guía de la exposición', meta: 'Entender para exponer' },
];

export const GuiaTabs: React.FC = () => (
  <nav className="guia-tabs" aria-label="Guías de estudio">
    {guias.map((g) => (
      <NavLink key={g.to} to={g.to} className={({ isActive }) => `guia-tab ${isActive ? 'is-active' : ''}`}>
        <strong>{g.label}</strong>
        <span>{g.meta}</span>
      </NavLink>
    ))}
  </nav>
);

export const SectionHead: React.FC<{ eyebrow: string; title: string; children: React.ReactNode }> = ({ eyebrow, title, children }) => (
  <div className="guia-head">
    <span className="guia-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    <p>{children}</p>
  </div>
);

export const VsCard: React.FC<{ title: string; items: React.ReactNode[] }> = ({ title, items }) => (
  <div className="guia-card">
    <h3>{title}</h3>
    <ul>
      {items.map((item, i) => (
        <li key={i}>{typeof item === 'string' ? <RichText text={item} /> : item}</li>
      ))}
    </ul>
  </div>
);

export interface FamilyTile {
  id: string;
  anchor: string;
  number: number;
  name: string;
  question: string;
  terms: string;
}

export const FamilyMap: React.FC<{ families: FamilyTile[]; label: string }> = ({ families, label }) => (
  <nav className="guia-map" aria-label={label}>
    {families.map((f) => (
      <a key={f.id} href={`#${f.anchor}`} className={`guia-tile fam-${f.id}`}>
        <span className="guia-eyebrow">{f.number} · {f.name}</span>
        <span className="guia-tile-q">{f.question}</span>
        <span className="guia-tile-terms">{f.terms}</span>
      </a>
    ))}
  </nav>
);

/** Simple table from rows of rich-text strings. */
export const GuiaTable: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
  <div className="guia-table-wrap">
    <table className="guia-table">
      <thead>
        <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j}><RichText text={cell} /></td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

export interface ChoiceItem {
  scenario: string;
  answer: string;
  why: string;
}

/** Scenario quiz: pick the option that matches, get the reason, move on. */
export const ChoiceQuiz: React.FC<{ title: string; options: string[]; items: ChoiceItem[] }> = ({ title, options, items }) => {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, 'ok' | 'no'>>({});
  const [feedback, setFeedback] = useState('');
  const { scenario, answer, why } = items[index];

  const choose = (option: string) => {
    const correct = option === answer;
    setPicked((p) => ({ ...p, [option]: correct ? 'ok' : 'no' }));
    setFeedback(correct ? `Correcto. ${why}` : `No es ${option}. Intenta otra vez.`);
  };

  const next = () => {
    setIndex((i) => (i + 1) % items.length);
    setPicked({});
    setFeedback('');
  };

  return (
    <div className="guia-quiz">
      <h3>{title}</h3>
      <p className="guia-quiz-scenario">{scenario}</p>
      <div className="guia-quiz-options">
        {options.map((option) => (
          <button key={option} type="button" className={picked[option] ? `is-${picked[option]}` : ''} onClick={() => choose(option)}>
            {option}
          </button>
        ))}
      </div>
      <p className="guia-quiz-feedback" aria-live="polite">{feedback}</p>
      <div className="guia-quiz-footer">
        <span>{index + 1} / {items.length}</span>
        <button type="button" onClick={next}>Siguiente escenario</button>
      </div>
    </div>
  );
};

export interface SeqStep {
  label: string;
  say: string;
}

/** Step buttons that reveal an SVG sequence one message at a time. */
export const useSteps = (count: number, initial = count) => {
  const [step, setStep] = useState(initial);
  const on = (n: number) => `guia-msg ${n <= step ? 'is-on' : ''}`;
  return { step, setStep, on, count };
};

export const StepButtons: React.FC<{ steps: SeqStep[]; step: number; setStep: (n: number) => void; label: string }> = ({ steps, step, setStep, label }) => (
  <>
    <div className="guia-steps" role="group" aria-label={label}>
      {steps.map((s, i) => (
        <button key={s.label} type="button" aria-pressed={step === i + 1} onClick={() => setStep(i + 1)}>
          {i + 1} · {s.label}
        </button>
      ))}
    </div>
    <p className="guia-seq-say"><RichText text={steps[step - 1].say} /></p>
  </>
);

/** Expandable question/answer cards. */
export const QaList: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => (
  <div className="guia-qa">
    {items.map((item) => (
      <details key={item.q}>
        <summary>{item.q}</summary>
        <p><RichText text={item.a} /></p>
      </details>
    ))}
  </div>
);
