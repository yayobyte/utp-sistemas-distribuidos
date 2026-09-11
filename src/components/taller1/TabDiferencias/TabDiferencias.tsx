import React from 'react';
import { BentoSplitCard } from '../../ui/BentoSplitCard/BentoSplitCard';
import { keyDifferencesData } from '../../../data/taller1.data';
import type { TabDiferenciasProps } from './TabDiferencias.d';
import './TabDiferencias.styles.css';

export const TabDiferencias: React.FC<TabDiferenciasProps> = () => {
  return (
    <section className="tile-section tile-light taller1-content-section" style={{ paddingTop: '10px' }}>
      <div className="container-wide">
        <div className="apple-diff-grid">
          {keyDifferencesData.map((item) => (
            <BentoSplitCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
