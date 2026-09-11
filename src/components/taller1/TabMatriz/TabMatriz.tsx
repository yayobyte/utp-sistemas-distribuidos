import React from 'react';
import { ComparisonTable } from '../../ui/ComparisonTable/ComparisonTable';
import { comparisonCriteriaData } from '../../../data/taller1.data';
import type { TabMatrizProps } from './TabMatriz.d';
import './TabMatriz.styles.css';

export const TabMatriz: React.FC<TabMatrizProps> = () => {
  return (
    <section className="tile-section tile-light taller1-content-section tab-matriz-section">
      <div className="container-wide">
        <ComparisonTable criteria={comparisonCriteriaData} />
      </div>
    </section>
  );
};
