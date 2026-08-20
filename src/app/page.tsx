'use client';

import React from 'react';
import Link from 'next/link';
import { DocsLayout } from '@/components/layout/DocsLayout';
import { SnButton } from '@syncnexa-library/ui';
import {
  Building2,
  ShieldCheck,
  Code2,
  Compass,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Webhook,
  Layers,
  HelpCircle,
} from 'lucide-react';
import styles from './page.module.css';

export default function DocsHomePage() {
  return (
    <DocsLayout showSidebar={true}>
      <div className={styles.homeContainer}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <Sparkles size={13} className={styles.sparkleIcon} />
            <span>Developer Documentation v1.0</span>
          </div>
          <h1 className={styles.heroTitle}>
            Build with <span className={styles.highlight}>SyncNexa</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Zero-knowledge student verification and decentralized trust infrastructure.
            Explore guides, API references, and integration workflows for the SyncID Business Portal and Verification Portal.
          </p>

          <div className={styles.heroActions}>
            <Link href="/business/quickstart" style={{ textDecoration: 'none' }}>
              <SnButton
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={15} />}
              >
                Start with Business Quickstart
              </SnButton>
            </Link>
            <Link href="/api/authentication" style={{ textDecoration: 'none' }}>
              <SnButton
                variant="stroke"
                size="lg"
                icon={<Code2 size={16} />}
              >
                Explore API Reference
              </SnButton>
            </Link>
          </div>
        </section>

        {/* Primary Pillar Cards */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Public Documentation Portals</h2>
          <div className={styles.pillarGrid}>
            <Link href="/business/quickstart" className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.iconBusiness}`}>
                <Building2 size={24} />
              </div>
              <h3 className={styles.pillarTitle}>SyncID Business Portal</h3>
              <p className={styles.pillarDescription}>
                Manage applications, issue Sandbox and Live API keys, configure OAuth 2.0 / OIDC clients, subscribe to webhooks, and monitor real-time telemetry.
              </p>
              <div className={styles.pillarFooter}>
                <span>Explore Business Portal</span>
                <ArrowRight size={14} />
              </div>
            </Link>

            <Link href="/verification/overview" className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.iconVerification}`}>
                <ShieldCheck size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Verification Portal</h3>
              <p className={styles.pillarDescription}>
                Real-time in-person and web verification. Scan dynamic QR codes, evaluate zero-knowledge proofs, and handle point-of-sale workflows.
              </p>
              <div className={styles.pillarFooter}>
                <span>Explore Verification Portal</span>
                <ArrowRight size={14} />
              </div>
            </Link>

            <Link href="/api/authentication" className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.iconApi}`}>
                <Code2 size={24} />
              </div>
              <h3 className={styles.pillarTitle}>REST API Reference</h3>
              <p className={styles.pillarDescription}>
                Complete endpoint reference for Applications, Verification sessions, Student Consent records, and HMAC-signed webhook delivery.
              </p>
              <div className={styles.pillarFooter}>
                <span>Browse API Endpoints</span>
                <ArrowRight size={14} />
              </div>
            </Link>

            <Link href="/guides/web-integration" className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.iconGuides}`}>
                <Compass size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Guides & Tutorials</h3>
              <p className={styles.pillarDescription}>
                Step-by-step implementation guides for e-commerce checkouts, webhook signature verification, and automated sandbox testing.
              </p>
              <div className={styles.pillarFooter}>
                <span>Read Integration Guides</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </section>

        {/* Feature Grid */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Core Platform Capabilities</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <Zap size={18} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Sub-200ms Verification</h4>
                <p className={styles.featureText}>
                  Instant zero-knowledge proof validation without manual document upload or multi-day wait times.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <Lock size={18} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Zero PII Exposure</h4>
                <p className={styles.featureText}>
                  Verify enrollment status with mathematical certainty without storing student IDs or transcripts.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <Webhook size={18} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Real-Time Webhooks</h4>
                <p className={styles.featureText}>
                  Instant HMAC-SHA256 signed event dispatch with automatic exponential backoff retries.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <Layers size={18} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Sandbox & Live Isolation</h4>
                <p className={styles.featureText}>
                  Develop freely with sk_test_ keys and simulate test personas before flipping to production sk_live_ keys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Support Banner */}
        <section className={styles.communityBanner}>
          <div className={styles.communityContent}>
            <HelpCircle size={28} className={styles.communityIcon} />
            <div>
              <h3 className={styles.communityTitle}>Need Help or Have Questions?</h3>
              <p className={styles.communityText}>
                Connect with the SyncNexa engineering team and developer community on our forum.
              </p>
            </div>
          </div>
          <a
            href="https://community.syncnexa.co"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <SnButton
              variant="stroke"
              size="md"
              rightIcon={<ArrowRight size={14} />}
            >
              Visit Community Forum
            </SnButton>
          </a>
        </section>
      </div>
    </DocsLayout>
  );
}
