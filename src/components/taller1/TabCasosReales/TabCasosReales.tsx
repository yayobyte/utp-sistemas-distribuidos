import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AppleContinuityMockup } from '../../ui/AppleContinuityMockup/AppleContinuityMockup';
import { AppleEditorialCard } from '../../ui/AppleEditorialCard/AppleEditorialCard';
import {
  caseStudiesData,
  appleEditorialValuesData,
} from '../../../data/taller1.data';
import type { TabCasosRealesProps } from './TabCasosReales.d';
import './TabCasosReales.styles.css';

export const TabCasosReales: React.FC<TabCasosRealesProps> = ({ onExploreClick }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('frontier');
  const currentCase = caseStudiesData.find((c) => c.id === selectedCaseId) || caseStudiesData[0];

  return (
    <section className="tile-section tile-parchment taller1-content-section">
      <div className="container-wide">
        {/* Apple Continuity-Style Interactive Showcase (Image 1) */}
        <div className="apple-showcase-container">
          {/* Left Column: Interactive Feature Accordion */}
          <div className="apple-accordion-column">
            {caseStudiesData.map((study) => {
              const isOpen = selectedCaseId === study.id;
              return (
                <div
                  key={study.id}
                  onClick={() => setSelectedCaseId(study.id)}
                  className={`apple-accordion-row ${isOpen ? 'is-open' : 'is-closed'}`}
                >
                  <div className="apple-accordion-header">
                    <h3 className="apple-accordion-title">{study.title}</h3>
                    <div className="apple-accordion-chevron">
                      <ChevronDown
                        size={22}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          color: isOpen ? '#1d1d1f' : '#86868b',
                        }}
                      />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="apple-accordion-content">
                      <p className="apple-accordion-desc">{study.description}</p>
                      <div className="apple-accordion-tags">
                        <span className="apple-pill-tag">
                          {study.category === 'cluster' ? 'Clúster Homogéneo' : 'Malla Grid Geodistribuida'}
                        </span>
                        <span className="apple-pill-tag">
                          {study.impactMetric} · {study.impactLabel}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Apple Device Continuity Showcase */}
          <AppleContinuityMockup currentCase={currentCase} />
        </div>
      </div>
    </section>
  );
};
