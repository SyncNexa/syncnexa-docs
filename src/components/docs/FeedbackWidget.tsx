'use client';

import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Check, Send } from 'lucide-react';
import { SnButton } from '@syncnexa-library/ui';
import styles from './FeedbackWidget.module.css';

interface FeedbackWidgetProps {
  pagePath: string;
}

export function FeedbackWidget({ pagePath }: FeedbackWidgetProps) {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  useEffect(() => {
    const key = `syncnexa_docs_feedback_${pagePath}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setSubmitted(true);
    }
  }, [pagePath]);

  const handleVote = (type: 'yes' | 'no') => {
    setVoted(type);
    if (type === 'yes') {
      localStorage.setItem(`syncnexa_docs_feedback_${pagePath}`, 'yes');
      setSubmitted(true);
    }
  };

  const handleDetailedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`syncnexa_docs_feedback_${pagePath}`, voted || 'yes');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.thankYou}>
          <Check size={18} className={styles.checkIcon} />
          <span>Thank you for helping us improve the SyncNexa documentation!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.prompt}>
        <span className={styles.promptText}>Was this page helpful?</span>
        <div className={styles.btnGroup}>
          <SnButton
            variant={voted === 'yes' ? 'primary' : 'stroke'}
            size="sm"
            icon={<ThumbsUp size={14} />}
            onClick={() => handleVote('yes')}
            aria-label="Helpful"
          >
            Yes
          </SnButton>
          <SnButton
            variant={voted === 'no' ? 'critical' : 'stroke'}
            size="sm"
            icon={<ThumbsDown size={14} />}
            onClick={() => handleVote('no')}
            aria-label="Not helpful"
          >
            No
          </SnButton>
        </div>
      </div>

      {voted === 'no' && (
        <form onSubmit={handleDetailedSubmit} className={styles.feedbackForm}>
          <p className={styles.formTitle}>How can we make this page better?</p>
          <div className={styles.reasonTags}>
            {['Missing information', 'Code sample error', 'Confusing explanation', 'Other'].map(
              (reason) => (
                <SnButton
                  key={reason}
                  type="button"
                  variant={selectedReason === reason ? 'primary' : 'stroke'}
                  size="sm"
                  onClick={() => setSelectedReason(reason)}
                >
                  {reason}
                </SnButton>
              )
            )}
          </div>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Optional details or suggestions..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <SnButton
            type="submit"
            variant="primary"
            size="sm"
            icon={<Send size={13} />}
          >
            Send Feedback
          </SnButton>
        </form>
      )}
    </div>
  );
}
