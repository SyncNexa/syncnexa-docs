import React from 'react';
import { ApiParam } from '@/types/docs';
import styles from './ParamTable.module.css';

interface ParamTableProps {
  title?: string;
  parameters: ApiParam[];
}

export function ParamTable({ title, parameters }: ParamTableProps) {
  if (!parameters || parameters.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      {title && <h4 className={styles.tableTitle}>{title}</h4>}
      <div className={styles.tableResponsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param, idx) => (
              <tr key={idx}>
                <td className={styles.nameCell}>
                  <code className={styles.paramName}>{param.name}</code>
                </td>
                <td className={styles.typeCell}>
                  <span className={styles.typeBadge}>{param.type}</span>
                </td>
                <td className={styles.requiredCell}>
                  {param.required ? (
                    <span className={styles.requiredBadge}>Required</span>
                  ) : (
                    <span className={styles.optionalBadge}>Optional</span>
                  )}
                </td>
                <td className={styles.descCell}>
                  <p className={styles.descText}>{param.description}</p>
                  {param.defaultValue && (
                    <p className={styles.metaRow}>
                      <span className={styles.metaLabel}>Default:</span>{' '}
                      <code className={styles.metaVal}>{param.defaultValue}</code>
                    </p>
                  )}
                  {param.example && (
                    <p className={styles.metaRow}>
                      <span className={styles.metaLabel}>Example:</span>{' '}
                      <code className={styles.metaVal}>{param.example}</code>
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
