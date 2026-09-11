import React from 'react';
import { ExternalLink } from 'lucide-react';
import { NumberedCard } from '../../ui/NumberedCard/NumberedCard';
import { conclusionsData } from '../../../data/taller1.data';
import type { TabConclusionesProps } from './TabConclusiones.d';
import './TabConclusiones.styles.css';

export const TabConclusiones: React.FC<TabConclusionesProps> = ({
  classroomUrl = 'https://classroom.google.com/c/ODcyMDQwNDA5MjIw/a/ODcyMDQwNDA5MjMy/details',
}) => {
  return (
    <section className="tile-section tile-parchment taller1-content-section" style={{ paddingTop: '10px' }}>
      <div className="container-wide">
        {/* 3 Apple Editorial Conclusion Cards */}
        <div className="apple-conclusions-list">
          {conclusionsData.map((item) => (
            <NumberedCard key={item.number} item={item} />
          ))}
        </div>

        {/* Apple Frosted Summary Banner */}
        <div className="apple-summary-banner">
          <div className="apple-summary-text">
            <strong>¿Listo para entregar el Taller 1?</strong>
            <p>
              Todos los requerimientos teóricos, arquitecturales y comparativos han sido sintetizados con base en la bibliografía oficial del curso.
            </p>
          </div>
          <a
            href={classroomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '13px', padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            <span>Entregar en Classroom</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
