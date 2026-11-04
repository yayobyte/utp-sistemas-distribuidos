import React from 'react';
import { NumberedCard } from '../../ui/NumberedCard/NumberedCard';
import { conclusionsData } from '../../../data/taller1.data';
import type { TabConclusionesProps } from './TabConclusiones.d';
import './TabConclusiones.styles.css';

export const TabConclusiones: React.FC<TabConclusionesProps> = () => {
  return (
    <section className="tile-section tile-parchment taller1-content-section" style={{ paddingTop: '10px' }}>
      <div className="container-wide">
        {/* 3 Apple Editorial Conclusion Cards */}
        <div className="apple-conclusions-list">
          {conclusionsData.map((item) => (
            <NumberedCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
