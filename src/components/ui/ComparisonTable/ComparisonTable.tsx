import React from 'react';
import type { ComparisonTableProps } from './ComparisonTable.d';
import './ComparisonTable.styles.css';

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  criteria,
  columnAHeader = 'Clúster (Cluster Computing)',
  columnBHeader = 'Grid (Grid Computing)',
  firstColumnHeader = 'Criterio de Hardware / Arquitectura',
}) => {
  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-matrix-table">
        <thead>
          <tr style={{ backgroundColor: 'var(--color-surface-pearl)', borderBottom: '1px solid var(--color-hairline)' }}>
            <th className="comparison-th" style={{ color: 'var(--color-ink)', width: '22%' }}>
              {firstColumnHeader}
            </th>
            <th
              className="comparison-th comparison-border-r"
              style={{ color: 'var(--color-primary)', width: '39%' }}
            >
              {columnAHeader}
            </th>
            <th className="comparison-th" style={{ color: 'var(--color-success)', width: '39%' }}>
              {columnBHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((item, index) => {
            const isEven = index % 2 !== 0;
            const isLast = index === criteria.length - 1;

            return (
              <tr
                key={item.id}
                className={`${isEven ? 'comparison-row-even' : 'comparison-row-odd'} ${!isLast ? 'comparison-border-b' : ''}`}
              >
                <td className="comparison-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                  {item.criterion}
                </td>
                <td className="comparison-td comparison-border-r" style={{ color: 'var(--color-ink-muted-80)' }}>
                  {item.cluster.highlight && (
                    <strong style={{ color: 'var(--color-ink)' }}>{item.cluster.highlight} </strong>
                  )}
                  {item.cluster.description}
                </td>
                <td className="comparison-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                  {item.grid.highlight && (
                    <strong style={{ color: 'var(--color-ink)' }}>{item.grid.highlight} </strong>
                  )}
                  {item.grid.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
