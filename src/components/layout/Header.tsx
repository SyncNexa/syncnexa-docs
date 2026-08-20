'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Sun, Moon, ExternalLink, Menu, X, MessageSquare } from 'lucide-react';
import { SnButton } from '@syncnexa-library/ui';
import { SearchModal } from '../search/SearchModal';
import styles from './Header.module.css';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export function Header({ onToggleMobileMenu, isMobileMenuOpen }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('syncnexa-docs-theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('syncnexa-docs-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            {onToggleMobileMenu && (
              <SnButton
                variant="stroke"
                size="sm"
                className={styles.mobileMenuBtn}
                onClick={onToggleMobileMenu}
                aria-label="Toggle navigation"
                icon={isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              />
            )}

            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/logo.svg"
                  alt="SyncNexa"
                  width={28}
                  height={28}
                  className={styles.logoImage}
                  priority
                />
                <span className={styles.brandName}>SyncNexa</span>
              </div>
              <span className={styles.docsTag}>Docs</span>
            </Link>

            <div className={styles.versionBadge} title="Currently viewing version 1.0 (Latest)">
              <span className={styles.versionDot} />
              <span>v1.0 (Latest)</span>
            </div>
          </div>

          <div className={styles.center}>
            <button
              type="button"
              className={styles.searchButton}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={15} className={styles.searchIcon} />
              <span className={styles.searchText}>Search documentation...</span>
              <kbd className={styles.searchKbd}>
                <span className={styles.cmdKey}>⌘</span>K
              </kbd>
            </button>
          </div>

          <div className={styles.right}>
            <nav className={styles.navLinks}>
              <a
                href="https://business.syncnexa.co"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                <span>Business Portal</span>
                <ExternalLink size={12} />
              </a>

              <a
                href="https://portal.syncnexa.co"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                <span>Verification Portal</span>
                <ExternalLink size={12} />
              </a>

              <a
                href="https://community.syncnexa.co"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                <MessageSquare size={13} />
                <span>Community</span>
              </a>
            </nav>

            <SnButton
              variant="stroke"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              icon={theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            />
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
