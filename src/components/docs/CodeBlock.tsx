'use client';

import React from 'react';
import { SnCodeBlock } from '@syncnexa-library/ui';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  maxHeight?: string | number;
  copyable?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'bash',
  filename,
  showLineNumbers = true,
  maxHeight,
  copyable = true,
  className = '',
}: CodeBlockProps) {
  return (
    <div style={{ margin: '1.25rem 0' }}>
      <SnCodeBlock
        code={code}
        language={language}
        filename={filename}
        showLineNumbers={showLineNumbers}
        maxHeight={maxHeight}
        copyable={copyable}
        className={className}
      />
    </div>
  );
}

export { SnCodeBlock };
