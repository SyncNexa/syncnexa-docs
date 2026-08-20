import React from 'react';
import { Info, Lightbulb, AlertTriangle, AlertCircle, ShieldAlert } from 'lucide-react';
import styles from './Callout.module.css';

interface CalloutProps {
  variant?: 'note' | 'tip' | 'important' | 'warning' | 'security';
  title?: string;
  text: string;
}

export function Callout({ variant = 'note', title, text }: CalloutProps) {
  const getIcon = () => {
    switch (variant) {
      case 'tip':
        return <Lightbulb size={18} className={styles.icon} />;
      case 'important':
        return <AlertCircle size={18} className={styles.icon} />;
      case 'warning':
        return <AlertTriangle size={18} className={styles.icon} />;
      case 'security':
        return <ShieldAlert size={18} className={styles.icon} />;
      case 'note':
      default:
        return <Info size={18} className={styles.icon} />;
    }
  };

  const defaultTitle = () => {
    switch (variant) {
      case 'tip':
        return 'Tip';
      case 'important':
        return 'Important';
      case 'warning':
        return 'Warning';
      case 'security':
        return 'Security Notice';
      case 'note':
      default:
        return 'Note';
    }
  };

  return (
    <div className={`${styles.callout} ${styles[variant]}`}>
      <div className={styles.header}>
        {getIcon()}
        <span className={styles.title}>{title || defaultTitle()}</span>
      </div>
      <div className={styles.body}>{text}</div>
    </div>
  );
}
