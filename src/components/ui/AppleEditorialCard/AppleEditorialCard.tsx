import React from 'react';
import { Globe, Cpu, Shield } from 'lucide-react';
import type { AppleEditorialCardProps } from './AppleEditorialCard.d';
import './AppleEditorialCard.styles.css';

const iconMap = {
  globe: Globe,
  cpu: Cpu,
  shield: Shield,
};

export const AppleEditorialCard: React.FC<AppleEditorialCardProps> = ({ item }) => {
  const IconComponent = iconMap[item.iconName] || Globe;

  return (
    <div className="apple-clean-card">
      <div>
        <div className="apple-clean-icon">
          <IconComponent size={36} strokeWidth={1.3} color="#1d1d1f" />
        </div>
        <h4 className="apple-clean-title">{item.title}</h4>
        <p className="apple-clean-desc">{item.description}</p>
      </div>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="apple-clean-link"
      >
        <span>{item.linkText}</span>
        <span className="link-arrow">›</span>
      </a>
    </div>
  );
};
