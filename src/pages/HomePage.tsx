import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Lock, Map as MapIcon, Presentation, Wrench } from 'lucide-react';
import {
  getTallerPath,
  isTallerAvailable,
  statusLabels,
  talleresRegistry,
} from '../data/talleres.registry';
import { courseInfo } from '../data/curso.data';
import { clases } from '../data/clases';
import type { TallerEntry } from '../data/talleres.registry.d';
import './HomePage.styles.css';

const GUIA_TOPICS = 6;

const completedTalleres = talleresRegistry.filter((t) => t.status === 'completado').length;

const hubCards = [
  {
    to: '/clases',
    icon: GraduationCap,
    title: 'Clases',
    text: 'Resumen de cada clase con diagramas, términos clave y preguntas de repaso.',
    meta: `${clases.length} clases`,
  },
  {
    to: '/guia',
    icon: MapIcon,
    title: 'Guía de estudio',
    text: 'Los conceptos del curso comparados lado a lado para preparar los parciales.',
    meta: `${GUIA_TOPICS} temas`,
  },
  {
    to: '#talleres',
    icon: Wrench,
    title: 'Talleres',
    text: 'Las investigaciones entregadas y la exposición del Grupo C.',
    meta: `${completedTalleres} completados`,
  },
];

const TallerRowContent: React.FC<{ taller: TallerEntry }> = ({ taller }) => (
  <>
    <span className="home-taller-number">
      {taller.kind === 'exposicion' ? <Presentation size={16} /> : taller.number}
    </span>
    <span className="home-taller-body">
      <span className="home-taller-eyebrow">
        {taller.topic} · {taller.corte}
      </span>
      <span className="home-taller-title">{taller.title}</span>
      <span className="home-taller-summary">{taller.summary}</span>
    </span>
    <span className="home-taller-aside">
      <span className={`home-taller-status status-${taller.status}`}>{statusLabels[taller.status]}</span>
    </span>
    {isTallerAvailable(taller) ? (
      <ArrowRight size={18} className="home-taller-arrow" />
    ) : (
      <Lock size={16} className="home-taller-arrow" />
    )}
  </>
);

export const HomePage: React.FC = () => {
  return (
    <div className="home-page container-tight">
      <header className="home-intro">
        <p className="home-eyebrow">
          {courseInfo.code} · {courseInfo.institution}
        </p>
        <h1 className="type-display-lg">{courseInfo.name}</h1>
      </header>

      <nav className="home-hub" aria-label="Secciones">
        {hubCards.map(({ to, icon: Icon, title, text, meta }) => {
          const body = (
            <>
              <span className="home-hub-icon"><Icon size={20} /></span>
              <span className="home-hub-title">{title}</span>
              <span className="home-hub-text">{text}</span>
              <span className="home-hub-meta">
                {meta} <ArrowRight size={14} />
              </span>
            </>
          );
          return to.startsWith('#') ? (
            <a key={title} href={to} className="home-hub-card">{body}</a>
          ) : (
            <Link key={title} to={to} className="home-hub-card">{body}</Link>
          );
        })}
      </nav>

      <section id="talleres" className="home-section" aria-labelledby="home-talleres-title">
        <h2 id="home-talleres-title" className="home-section-title">Talleres</h2>
        <ul className="home-taller-list">
          {talleresRegistry.map((taller) => (
            <li key={taller.id}>
              {isTallerAvailable(taller) ? (
                <Link to={getTallerPath(taller)} className="home-taller-row">
                  <TallerRowContent taller={taller} />
                </Link>
              ) : (
                <div className="home-taller-row is-disabled" aria-disabled="true">
                  <TallerRowContent taller={taller} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
