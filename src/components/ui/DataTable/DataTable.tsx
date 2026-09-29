import React from 'react';
import type { DataTableProps } from './DataTable.d';
import './DataTable.styles.css';

export const DataTable: React.FC<DataTableProps> = ({ columns, rows, caption }) => {
  return (
    <div className="data-table-wrapper" tabIndex={0} role="region" aria-label={caption ?? 'Tabla'}>
      <table className="data-table">
        {caption && <caption className="data-table-caption">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={index}>{cell}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
