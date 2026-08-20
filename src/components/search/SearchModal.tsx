'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { SnButton } from '@syncnexa-library/ui';
import { buildSearchIndex, searchDocs, SearchIndexItem } from '@/lib/search';
import { SearchResult } from '@/types/docs';
import styles from './SearchModal.module.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [index, setIndex] = useState<SearchIndexItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIndex(buildSearchIndex());
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    const matches = searchDocs(query, index);
    setResults(matches);
    setSelectedIndex(0);
  }, [query, index]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        router.push(results[selectedIndex].href);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search documentation, APIs, and guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <SnButton
              variant="stroke"
              size="sm"
              icon={<X size={14} />}
              onClick={() => setQuery('')}
              aria-label="Clear search"
            />
          )}
          <SnButton
            variant="stroke"
            size="sm"
            onClick={onClose}
          >
            ESC
          </SnButton>
        </div>

        <div className={styles.content}>
          {results.length > 0 ? (
            <div className={styles.resultList} role="listbox">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  role="option"
                  aria-selected={selectedIndex === idx}
                  className={`${styles.resultItem} ${
                    selectedIndex === idx ? styles.itemSelected : ''
                  }`}
                  onClick={() => {
                    router.push(result.href);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className={styles.itemHeader}>
                    <div className={styles.itemTitleGroup}>
                      <FileText size={15} className={styles.docIcon} />
                      <span className={styles.itemTitle}>{result.title}</span>
                    </div>
                    <span className={styles.itemSection}>{result.section}</span>
                  </div>
                  <p className={styles.itemDesc}>{result.description}</p>
                  {result.matchSnippet && (
                    <p className={styles.itemSnippet}>{result.matchSnippet}</p>
                  )}
                </div>
              ))}
            </div>
          ) : query ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>No results found for &ldquo;{query}&rdquo;</p>
              <p className={styles.emptySub}>
                Try searching for <code>API keys</code>, <code>webhooks</code>, <code>OAuth</code>, or <code>QR verification</code>.
              </p>
            </div>
          ) : (
            <div className={styles.suggestions}>
              <p className={styles.suggestionsHeader}>Quick Links</p>
              <div className={styles.suggestionGrid}>
                {[
                  { label: 'Business Portal Quickstart', href: '/business/quickstart' },
                  { label: 'API Keys & Secrets', href: '/business/api-keys' },
                  { label: 'OAuth 2.0 Client Flow', href: '/business/oauth-apps' },
                  { label: 'Webhooks & HMAC Signatures', href: '/business/webhooks' },
                  { label: 'Verification API Reference', href: '/api/verification-api' },
                  { label: 'Testing in Sandbox Mode', href: '/guides/sandbox-testing' },
                ].map((s, sIdx) => (
                  <SnButton
                    key={sIdx}
                    variant="stroke"
                    size="md"
                    className={styles.suggestionBtn}
                    rightIcon={<ArrowRight size={13} />}
                    onClick={() => {
                      router.push(s.href);
                      onClose();
                    }}
                  >
                    {s.label}
                  </SnButton>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerShortcuts}>
            <span className={styles.shortcut}>
              <kbd>↑</kbd> <kbd>↓</kbd> to navigate
            </span>
            <span className={styles.shortcut}>
              <kbd><CornerDownLeft size={11} /></kbd> to select
            </span>
            <span className={styles.shortcut}>
              <kbd>esc</kbd> to close
            </span>
          </div>
          <span className={styles.footerBrand}>SyncNexa Docs v1.0</span>
        </div>
      </div>
    </div>
  );
}
