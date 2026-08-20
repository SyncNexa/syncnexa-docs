'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/data/navigation';
import { BookOpen, Building2, ShieldCheck, Code2, Compass, ExternalLink } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const getSectionIcon = (iconName?: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen size={16} className={styles.sectionIcon} />;
      case 'Building2':
        return <Building2 size={16} className={styles.sectionIcon} />;
      case 'ShieldCheck':
        return <ShieldCheck size={16} className={styles.sectionIcon} />;
      case 'Code2':
        return <Code2 size={16} className={styles.sectionIcon} />;
      case 'Compass':
        return <Compass size={16} className={styles.sectionIcon} />;
      default:
        return null;
    }
  };

  const getMethodBadgeClass = (method?: string) => {
    switch (method) {
      case 'GET':
        return 'badge-get';
      case 'POST':
        return 'badge-post';
      case 'PUT':
      case 'PATCH':
        return 'badge-put';
      case 'DELETE':
        return 'badge-delete';
      default:
        return '';
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.scrollArea}>
        <div className={styles.navGroupList}>
          {navigationData.map((section, sIdx) => (
            <div key={sIdx} className={styles.section}>
              <div className={styles.sectionHeader}>
                {getSectionIcon(section.icon)}
                <span className={styles.sectionTitle}>{section.title}</span>
              </div>
              <ul className={styles.itemList}>
                {section.items.map((item, iIdx) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={iIdx} className={styles.item}>
                      <Link
                        href={item.href}
                        className={`${styles.itemLink} ${isActive ? styles.active : ''}`}
                        onClick={onNavigate}
                      >
                        <span className={styles.itemTitle}>{item.title}</span>
                        {item.method && (
                          <span
                            className={`${styles.methodBadge} ${getMethodBadgeClass(
                              item.method
                            )}`}
                          >
                            {item.method}
                          </span>
                        )}
                        {item.badge && (
                          <span className={styles.badge}>{item.badge}</span>
                        )}
                        {item.isExternal && <ExternalLink size={12} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
