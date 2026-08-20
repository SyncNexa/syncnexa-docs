'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { TableOfContents } from './TableOfContents';
import { Footer } from './Footer';
import { TocItem } from '@/types/docs';
import styles from './DocsLayout.module.css';

interface DocsLayoutProps {
  children: React.ReactNode;
  toc?: TocItem[];
  showSidebar?: boolean;
}

export function DocsLayout({ children, toc = [], showSidebar = true }: DocsLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={styles.root}>
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      <div className={styles.body}>
        {showSidebar && (
          <>
            <div className={styles.desktopSidebar}>
              <Sidebar />
            </div>

            {isMobileMenuOpen && (
              <div
                className={styles.mobileDrawerOverlay}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div
                  className={styles.mobileDrawer}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>
            )}
          </>
        )}

        <main className={`${styles.main} ${!showSidebar ? styles.fullWidth : ''}`}>
          <div className={styles.contentContainer}>{children}</div>
        </main>

        {toc && toc.length > 0 && <TableOfContents toc={toc} />}
      </div>

      <Footer />
    </div>
  );
}
