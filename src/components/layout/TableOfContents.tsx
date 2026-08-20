'use client';

import React, { useState, useEffect } from 'react';
import { TocItem } from '@/types/docs';
import { Link2, Check, MessageSquare } from 'lucide-react';
import { SnButton } from '@syncnexa-library/ui';
import styles from './TableOfContents.module.css';

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleCopyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (!toc || toc.length === 0) return null;

  return (
    <nav className={styles.tocWrapper} aria-label="Table of contents">
      <div className={styles.header}>
        <span className={styles.headerTitle}>On this page</span>
      </div>

      <ul className={styles.list}>
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`${styles.item} ${item.level === 3 ? styles.subItem : ''}`}
            >
              <a
                href={`#${item.id}`}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>

      <div className={styles.actions}>
        <SnButton
          variant="stroke"
          size="sm"
          onClick={handleCopyPageLink}
          icon={copiedLink ? <Check size={14} /> : <Link2 size={14} />}
        >
          {copiedLink ? 'Link Copied!' : 'Copy page link'}
        </SnButton>

        <a
          href="https://community.syncnexa.co"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <SnButton
            variant="secondary"
            size="sm"
            icon={<MessageSquare size={14} />}
          >
            Ask in Community
          </SnButton>
        </a>
      </div>
    </nav>
  );
}
