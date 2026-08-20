import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.logoWrapper}>
              <Image
                src="/logo.svg"
                alt="SyncNexa Logo"
                width={24}
                height={24}
                className={styles.logo}
              />
              <span className={styles.brandName}>SyncNexa</span>
            </div>
            <p className={styles.brandTagline}>
              Zero-knowledge student verification and decentralized cryptographic trust infrastructure for businesses and universities.
            </p>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Portals & Apps</h4>
            <ul className={styles.linkList}>
              <li>
                <a
                  href="https://business.syncnexa.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>SyncID Business Portal</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://portal.syncnexa.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>Verification Portal</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://community.syncnexa.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>Community Forum</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://status.syncnexa.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>Platform Status</span>
                  <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Documentation</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/overview/introduction" className={styles.link}>
                  Welcome to SyncNexa
                </Link>
              </li>
              <li>
                <Link href="/business/quickstart" className={styles.link}>
                  Business Quickstart
                </Link>
              </li>
              <li>
                <Link href="/api/authentication" className={styles.link}>
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/business/webhooks" className={styles.link}>
                  Webhooks & Events
                </Link>
              </li>
              <li>
                <Link href="/guides/sandbox-testing" className={styles.link}>
                  Sandbox Testing
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Company & Legal</h4>
            <ul className={styles.linkList}>
              <li>
                <a
                  href="https://syncnexa.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>SyncNexa Home</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://syncnexa.co/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>Privacy Policy</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://syncnexa.co/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>Terms of Service</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://syncnexa.co/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>Security & Compliance</span>
                  <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} SyncNexa Limited. All rights reserved.
          </p>
          <div className={styles.bottomMeta}>
            <span className={styles.statusPill}>
              <span className={styles.statusDot} />
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
