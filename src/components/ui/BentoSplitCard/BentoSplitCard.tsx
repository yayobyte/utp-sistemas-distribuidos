import React from 'react';
import { Cpu, Zap, Server, HardDrive } from 'lucide-react';
import type { BentoSplitCardProps } from './BentoSplitCard.d';
import './BentoSplitCard.styles.css';

const iconMap = {
  cpu: Cpu,
  zap: Zap,
  server: Server,
  'hard-drive': HardDrive,
};

export const BentoSplitCard: React.FC<BentoSplitCardProps> = ({ item }) => {
  const IconComponent = iconMap[item.iconName] || Cpu;

  return (
    <div className="bento-split-card">
      <div className="bento-split-header">
        <div className="bento-split-icon">
          <IconComponent size={28} strokeWidth={1.4} color="#1d1d1f" />
        </div>
        <span className="bento-split-pill">Criterio {item.criterionNumber}</span>
      </div>

      <h3 className="bento-split-title">{item.title}</h3>

      <div className="bento-split-container">
        <div className="bento-split-side">
          <span className="bento-badge cluster">{item.cluster.badge}</span>
          <strong className="bento-headline">{item.cluster.headline}</strong>
          <p className="bento-desc">{item.cluster.description}</p>
        </div>

        <div className="bento-split-divider" />

        <div className="bento-split-side">
          <span className="bento-badge grid">{item.grid.badge}</span>
          <strong className="bento-headline">{item.grid.headline}</strong>
          <p className="bento-desc">{item.grid.description}</p>
        </div>
      </div>
    </div>
  );
};
