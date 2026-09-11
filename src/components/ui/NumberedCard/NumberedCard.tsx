import React from 'react';
import { Cpu, Zap, Sparkles } from 'lucide-react';
import type { NumberedCardProps } from './NumberedCard.d';
import './NumberedCard.styles.css';

const iconMap = {
  cpu: Cpu,
  zap: Zap,
  sparkles: Sparkles,
};

export const NumberedCard: React.FC<NumberedCardProps> = ({ item }) => {
  const IconComponent = iconMap[item.iconName] || Sparkles;

  return (
    <div className="apple-numbered-card">
      <div className="numbered-digit">{item.number}</div>
      <div className="numbered-content">
        <div className="numbered-tag">
          <IconComponent size={14} />
          <span>{item.tag}</span>
        </div>
        <h3 className="numbered-title">{item.title}</h3>
        <p className="numbered-body">{item.body}</p>
      </div>
    </div>
  );
};
