import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDocBySlug, allDocs, getAdjacentDocs } from '@/data/docs';
import { DocsLayout } from '@/components/layout/DocsLayout';
import { DocRenderer } from '@/components/docs/DocRenderer';
import { FeedbackWidget } from '@/components/docs/FeedbackWidget';
import { ChevronRight, ArrowLeft, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import styles from './DocPage.module.css';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: 'Page Not Found | SyncNexa Docs',
    };
  }

  return {
    title: `${doc.title} — SyncNexa Docs`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} — SyncNexa Docs`,
      description: doc.description,
      type: 'article',
      url: `https://docs.syncnexa.co/${slug.join('/')}`,
      siteName: 'SyncNexa Documentation',
    },
    twitter: {
      card: 'summary',
      title: `${doc.title} — SyncNexa Docs`,
      description: doc.description,
    },
  };
}

export default async function DynamicDocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const { prev, next } = getAdjacentDocs(slug);
  const currentPath = slug.join('/');

  return (
    <DocsLayout toc={doc.toc}>
      <article className={styles.article}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
          <Link href="/" className={styles.breadcrumbLink}>
            Docs
          </Link>
          <ChevronRight size={13} className={styles.breadcrumbSeparator} />
          <span className={styles.breadcrumbSection}>{doc.section}</span>
          <ChevronRight size={13} className={styles.breadcrumbSeparator} />
          <span className={styles.breadcrumbCurrent}>{doc.title}</span>
        </nav>

        {/* Page Header */}
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{doc.title}</h1>
            {doc.badge && (
              <span className={styles.badge}>
                <Sparkles size={12} />
                {doc.badge}
              </span>
            )}
          </div>
          <p className={styles.description}>{doc.description}</p>
          {doc.lastUpdated && (
            <div className={styles.meta}>
              <Calendar size={13} />
              <span>Last updated: {doc.lastUpdated}</span>
            </div>
          )}
        </header>

        {/* Document Content */}
        <div className={styles.content}>
          <DocRenderer blocks={doc.content} />
        </div>

        {/* Next / Previous Pagination */}
        {(prev || next) && (
          <nav className={styles.pagination} aria-label="Pagination">
            {prev ? (
              <Link href={prev.href} className={`${styles.paginationLink} ${styles.prevLink}`}>
                <div className={styles.paginationLabel}>
                  <ArrowLeft size={13} />
                  <span>Previous</span>
                </div>
                <span className={styles.paginationTitle}>{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link href={next.href} className={`${styles.paginationLink} ${styles.nextLink}`}>
                <div className={styles.paginationLabel}>
                  <span>Next</span>
                  <ArrowRight size={13} />
                </div>
                <span className={styles.paginationTitle}>{next.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}

        {/* Feedback Widget */}
        <FeedbackWidget pagePath={currentPath} />
      </article>
    </DocsLayout>
  );
}
