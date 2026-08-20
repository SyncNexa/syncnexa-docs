import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './CardGrid.module.css';

interface CardItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

interface CardGridProps {
  cards: CardItem[];
}

export function CardGrid({ cards }: CardGridProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className={styles.grid}>
      {cards.map((card, idx) => (
        <Link key={idx} href={card.href} className={styles.card}>
          <div className={styles.cardHeader}>
            <h4 className={styles.title}>{card.title}</h4>
            {card.badge && (
              <span className={styles.badge}>
                <Sparkles size={11} />
                {card.badge}
              </span>
            )}
          </div>
          <p className={styles.description}>{card.description}</p>
          <div className={styles.footer}>
            <span className={styles.learnMore}>Learn more</span>
            <ArrowRight size={14} className={styles.arrowIcon} />
          </div>
        </Link>
      ))}
    </div>
  );
}
