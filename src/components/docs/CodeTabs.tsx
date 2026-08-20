'use client';

import React, { useState } from 'react';
import { CodeSnippet } from '@/types/docs';
import { CodeBlock } from './CodeBlock';
import styles from './CodeTabs.module.css';

interface CodeTabsProps {
  snippets: CodeSnippet[];
}

export function CodeTabs({ snippets }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!snippets || snippets.length === 0) return null;

  const current = snippets[activeTab] || snippets[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabList} role="tablist">
        {snippets.map((snippet, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={activeTab === idx}
            className={`${styles.tab} ${activeTab === idx ? styles.active : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {snippet.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        <CodeBlock
          code={current.code}
          language={current.language}
          filename={current.filename}
        />
      </div>
    </div>
  );
}
