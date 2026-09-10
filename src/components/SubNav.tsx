import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './SubNav.styles.css';

interface SubNavProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: { label: string; path?: string }[];
  actions?: React.ReactNode;
}

export const SubNav: React.FC<SubNavProps> = ({
  title,
  subtitle,
  badge,
  breadcrumbs,
  actions,
}) => {
  return (
    <div className="sub-nav-wrapper frosted-bar">
      <div className="sub-nav-container">
        {/* Left Info / Breadcrumbs */}
        <div className="sub-nav-left">
          {breadcrumbs && (
            <div className="sub-nav-breadcrumbs">
              {breadcrumbs.map((bc, idx) => (
                <React.Fragment key={idx}>
                  {bc.path ? (
                    <Link to={bc.path} className="sub-nav-breadcrumb-link">
                      {bc.label}
                    </Link>
                  ) : (
                    <span className="sub-nav-breadcrumb-current">{bc.label}</span>
                  )}
                  {idx < breadcrumbs.length - 1 && <ChevronRight size={12} />}
                </React.Fragment>
              ))}
            </div>
          )}

          {!breadcrumbs && (
            <div className="sub-nav-title-group">
              <h2 className="sub-nav-title">{title}</h2>
              {badge && <span className="sub-nav-badge">{badge}</span>}
              {subtitle && <span className="sub-nav-subtitle">{subtitle}</span>}
            </div>
          )}
        </div>

        {/* Right Actions */}
        {actions && <div className="sub-nav-actions">{actions}</div>}
      </div>
    </div>
  );
};
