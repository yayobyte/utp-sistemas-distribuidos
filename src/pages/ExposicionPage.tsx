import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, ExternalLink, GraduationCap, LayoutGrid, Maximize, MessageSquareText, X } from 'lucide-react';
import { MicroservicesStage } from '../components/exposicion/MicroservicesStage';
import { SlideContentView } from '../components/exposicion/SlideContentView';
import { exposicionInfo, slides } from '../data/exposicion.data';
import './ExposicionPage.styles.css';

const hostLabel = (url: string) => new URL(url).hostname.replace(/^www\./, '');

const clampIndex = (n: number) => Math.min(Math.max(n, 0), slides.length - 1);

const useWideLayout = () => {
  const query = '(min-width: 901px)';
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setWide(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return wide;
};

export const ExposicionPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const index = clampIndex((Number(params.get('slide')) || 1) - 1);
  const slide = slides[index];
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const touchX = useRef<number | null>(null);
  const wide = useWideLayout();

  const goTo = useCallback(
    (n: number) => setParams({ slide: String(clampIndex(n) + 1) }, { replace: true }),
    [setParams]
  );

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };

  useEffect(() => {
    document.title = `${slide.title} · ${exposicionInfo.title}`;
  }, [slide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          goTo(index + 1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goTo(index - 1);
          break;
        case 'Home':
          goTo(0);
          break;
        case 'End':
          goTo(slides.length - 1);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'n':
        case 'N':
          setShowNotes((v) => !v);
          break;
        case 'o':
        case 'O':
          setShowOverview((v) => !v);
          break;
        case 'Escape':
          setShowOverview(false);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, goTo]);

  const isTitle = slide.content.kind === 'title';
  const sectionNumber = [...new Set(slides.map((s) => s.section))].indexOf(slide.section);

  return (
    <div
      className="deck-root"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 60) goTo(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="deck-stage">
        <MicroservicesStage
          scene={slide.scene}
          panelRatio={wide && !isTitle ? 0.46 : 0}
          lift={wide && isTitle ? 0.55 : 0}
        />
      </div>

      <header className="deck-topbar">
        <Link to="/" className="deck-exit"><X size={14} /> Salir</Link>
        <span className="deck-brand">{exposicionInfo.group} · {exposicionInfo.title}</span>
        <div className="deck-tools">
          <button type="button" onClick={() => setShowOverview(true)} aria-label="Ver todas las diapositivas (O)" title="Diapositivas (O)">
            <LayoutGrid size={16} />
          </button>
          <button type="button" onClick={() => setShowNotes((v) => !v)} aria-pressed={showNotes} aria-label="Notas del orador (N)" title="Notas (N)">
            <MessageSquareText size={16} />
          </button>
          <button type="button" onClick={toggleFullscreen} aria-label="Pantalla completa (F)" title="Pantalla completa (F)">
            <Maximize size={16} />
          </button>
        </div>
      </header>

      <main key={slide.id} className={`deck-panel ${isTitle ? 'is-title' : ''}`}>
        <p className="deck-eyebrow">
          {sectionNumber > 0 && <span>{String(sectionNumber).padStart(2, '0')}</span>}
          {slide.section}
        </p>
        <h1 className="deck-title">{slide.title}</h1>
        {isTitle && <p className="deck-course">{exposicionInfo.course}</p>}
        <SlideContentView content={slide.content} />
      </main>

      {showNotes && (
        <aside className="deck-notes" aria-label="Notas del orador">
          <strong>Notas del orador</strong>
          <p>{slide.notes}</p>
          {slide.more && (
            <div className="deck-more">
              <span className="deck-more-title">Ampliar · en el curso</span>
              <ul>
                {slide.more.guia && (
                  <li>
                    <a href={`/exposicion/guia#${slide.more.guia.anchor}`} target="_blank" rel="noopener noreferrer">
                      <BookOpen size={14} aria-hidden="true" />
                      <span>
                        Guía: {slide.more.guia.label}
                        <small>Guía de la exposición</small>
                      </span>
                    </a>
                  </li>
                )}
                {slide.more.curso?.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} target="_blank" rel="noopener noreferrer">
                      <GraduationCap size={14} aria-hidden="true" />
                      <span>
                        {c.label.split(' · ').slice(1).join(' · ')}
                        <small>{c.label.split(' · ')[0]}</small>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              {slide.more.docs && slide.more.docs.length > 0 && (
                <span className="deck-more-title is-sub">Documentación oficial</span>
              )}
              <ul>
                {slide.more.docs?.map((d) => (
                  <li key={d.href}>
                    <a href={d.href} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} aria-hidden="true" />
                      <span>
                        {d.label}
                        <small>{hostLabel(d.href)}</small>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      )}

      <footer className="deck-footer">
        <span className="deck-speaker">{slide.section}</span>
        <div className="deck-nav">
          <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Anterior">
            <ChevronLeft size={18} />
          </button>
          <span className="deck-counter">{index + 1} / {slides.length}</span>
          <button type="button" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1} aria-label="Siguiente">
            <ChevronRight size={18} />
          </button>
        </div>
        <span className="deck-hint">← → navegar · F pantalla completa · N notas · O índice</span>
        <div className="deck-progress" style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
      </footer>

      {showOverview && (
        <div className="deck-overview" role="dialog" aria-label="Todas las diapositivas" onClick={() => setShowOverview(false)}>
          <div className="deck-overview-grid" onClick={(e) => e.stopPropagation()}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`deck-overview-item ${i === index ? 'is-current' : ''}`}
                onClick={() => {
                  goTo(i);
                  setShowOverview(false);
                }}
              >
                <span>{i + 1}</span>
                <strong>{s.title}</strong>
                <small>{s.section}</small>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
