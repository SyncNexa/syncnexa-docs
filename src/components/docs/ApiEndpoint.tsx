'use client';

import React, { useState } from 'react';
import { HttpMethod } from '@/types/docs';
import { Lock, Copy, Check } from 'lucide-react';
import { SnButton } from '@syncnexa-library/ui';
import styles from './ApiEndpoint.module.css';

interface ApiEndpointProps {
  method: HttpMethod;
  path: string;
  title: string;
  description: string;
  authRequired?: boolean;
  scope?: string;
}

export function ApiEndpoint({
  method,
  path,
  title,
  description,
  authRequired = true,
  scope,
}: ApiEndpointProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(path);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy endpoint:', err);
    }
  };

  const getMethodClass = (m: HttpMethod) => {
    switch (m) {
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
        return 'badge-get';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.endpointBar}>
        <div className={styles.left}>
          <span className={`${styles.methodBadge} ${getMethodClass(method)}`}>
            {method}
          </span>
          <code className={styles.path}>{path}</code>
        </div>
        <div className={styles.right}>
          {authRequired && (
            <span className={styles.authBadge} title="Requires API key authentication">
              <Lock size={12} />
              <span>Bearer Auth</span>
            </span>
          )}
          {scope && <span className={styles.scopeBadge}>{scope}</span>}
          <SnButton
            variant="stroke"
            size="sm"
            onClick={handleCopy}
            title="Copy path"
            icon={copied ? <Check size={13} /> : <Copy size={13} />}
          >
            {copied ? 'Copied' : 'Copy'}
          </SnButton>
        </div>
      </div>
      <div className={styles.details}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
