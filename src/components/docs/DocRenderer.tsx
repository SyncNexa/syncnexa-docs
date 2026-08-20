import React from 'react';
import { ContentBlock } from '@/types/docs';
import { CodeBlock } from './CodeBlock';
import { CodeTabs } from './CodeTabs';
import { Callout } from './Callout';
import { ApiEndpoint } from './ApiEndpoint';
import { ParamTable } from './ParamTable';
import { CardGrid } from './CardGrid';
import { Hash } from 'lucide-react';
import styles from './DocRenderer.module.css';

interface DocRendererProps {
  blocks: ContentBlock[];
}

function formatInlineMarkdown(text: string): React.ReactNode[] {
  // Simple parser for **bold**, `code`, and [link](url)
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(<code key={match.index} className={styles.inlineCode}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith('[') && token.includes('](')) {
      const label = token.substring(1, token.indexOf(']('));
      const url = token.substring(token.indexOf('](') + 2, token.length - 1);
      parts.push(
        <a key={match.index} href={url} className={styles.inlineLink}>
          {label}
        </a>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export function DocRenderer({ blocks }: DocRendererProps) {
  return (
    <div className={styles.prose}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={idx} className={styles.paragraph}>
                {formatInlineMarkdown(block.text)}
              </p>
            );

          case 'heading':
            if (block.level === 2) {
              return (
                <h2 key={idx} id={block.id} className={styles.h2}>
                  <a href={`#${block.id}`} className={styles.headingAnchor}>
                    <Hash size={18} className={styles.hashIcon} />
                    <span>{block.text}</span>
                  </a>
                </h2>
              );
            }
            return (
              <h3 key={idx} id={block.id} className={styles.h3}>
                <a href={`#${block.id}`} className={styles.headingAnchor}>
                  <Hash size={16} className={styles.hashIcon} />
                  <span>{block.text}</span>
                </a>
              </h3>
            );

          case 'callout':
            return (
              <Callout
                key={idx}
                variant={block.variant}
                title={block.title}
                text={block.text}
              />
            );

          case 'code':
            return (
              <CodeBlock
                key={idx}
                code={block.code}
                language={block.language}
                filename={block.filename}
              />
            );

          case 'code-tabs':
            return <CodeTabs key={idx} snippets={block.snippets} />;

          case 'api-endpoint':
            return (
              <ApiEndpoint
                key={idx}
                method={block.method}
                path={block.path}
                title={block.title}
                description={block.description}
                authRequired={block.authRequired}
                scope={block.scope}
              />
            );

          case 'param-table':
            return (
              <ParamTable
                key={idx}
                title={block.title}
                parameters={block.parameters}
              />
            );

          case 'card-grid':
            return <CardGrid key={idx} cards={block.cards} />;

          case 'list':
            if (block.ordered) {
              return (
                <ol key={idx} className={styles.orderedList}>
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx} className={styles.listItem}>
                      {formatInlineMarkdown(item)}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul key={idx} className={styles.unorderedList}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className={styles.listItem}>
                    {formatInlineMarkdown(item)}
                  </li>
                ))}
              </ul>
            );

          case 'table':
            return (
              <div key={idx} className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {block.headers.map((h, hIdx) => (
                        <th key={hIdx}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>{formatInlineMarkdown(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'steps':
            return (
              <div key={idx} className={styles.stepsContainer}>
                {block.steps.map((step, sIdx) => (
                  <div key={sIdx} className={styles.stepItem}>
                    <div className={styles.stepNumber}>{sIdx + 1}</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepText}>
                        {formatInlineMarkdown(step.content)}
                      </p>
                      {step.codeSnippet && (
                        <CodeBlock
                          code={step.codeSnippet.code}
                          language={step.codeSnippet.language}
                          filename={step.codeSnippet.filename}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
