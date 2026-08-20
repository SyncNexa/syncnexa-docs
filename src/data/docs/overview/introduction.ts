import { DocPage } from '@/types/docs';

export const introductionDoc: DocPage = {
  slug: ['overview', 'introduction'],
  title: 'Welcome to SyncNexa',
  description: 'Learn how SyncNexa provides zero-knowledge student verification and decentralized trust infrastructure for businesses, universities, and students.',
  section: 'Overview',
  lastUpdated: 'August 2026',
  badge: 'v1.0 Latest',
  toc: [
    { id: 'what-is-syncnexa', title: 'What is SyncNexa?', level: 2 },
    { id: 'the-problem', title: 'The Problem with Legacy Verification', level: 2 },
    { id: 'how-syncnexa-works', title: 'How SyncNexa Works', level: 2 },
    { id: 'key-features', title: 'Key Features', level: 2 },
    { id: 'public-services', title: 'Public Services & Portals', level: 2 },
    { id: 'next-steps', title: 'Next Steps', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'SyncNexa is a cryptographic identity and trust infrastructure platform designed to bridge universities, students, and businesses. Using zero-knowledge proofs (ZKP) and decentralized verifiable credentials, SyncNexa enables instant student status verification without exposing sensitive student records or relying on brittle document uploads.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'what-is-syncnexa',
      text: 'What is SyncNexa?',
    },
    {
      type: 'paragraph',
      text: 'SyncNexa eliminates manual student ID checking, fraudulent discount claims, and privacy-invasive document scraping. Businesses can verify that a customer is an actively enrolled university student in milliseconds with cryptographic certainty, while students maintain 100% control over their personal data.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Zero-Knowledge Verification',
      text: 'When a student proves their enrollment status to a business, the business receives a mathematically verifiable proof of active enrollment — without ever seeing the student\'s national ID, grades, home address, or full university record.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'the-problem',
      text: 'The Problem with Legacy Verification',
    },
    {
      type: 'table',
      headers: ['Aspect', 'Legacy Verification Methods', 'SyncNexa Cryptographic Trust'],
      rows: [
        ['Speed', 'Manual review taking 24–72 hours', 'Instant cryptographic verification in < 200ms'],
        ['Privacy', 'Requires uploading student IDs and transcripts', 'Zero-knowledge proof: reveals only enrollment validity'],
        ['Fraud Prevention', 'Easily forged with edited photos or fake emails', 'Digitally signed by verified universities'],
        ['Developer Experience', 'Fragmented scrapers and manual queues', 'REST APIs, OAuth 2.0 / OIDC, and real-time Webhooks'],
        ['Data Compliance', 'High risk of GDPR / FERPA exposure', 'Privacy-by-design, zero PII storage on business servers'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'how-syncnexa-works',
      text: 'How SyncNexa Works',
    },
    {
      type: 'steps',
      steps: [
        {
          title: '1. University Issues Verifiable Credential',
          content: 'The student\'s university or educational institution registers their active enrollment status through the SyncID School network.',
        },
        {
          title: '2. Student Holds Proof in SyncID App',
          content: 'The student holds their cryptographic credential securely on their own device, with full custody and biometric access.',
        },
        {
          title: '3. Business Requests Verification',
          content: 'The business initiates a verification session via the SyncID Business Portal, OAuth 2.0 flow, or direct API integration.',
        },
        {
          title: '4. Instant Zero-Knowledge Confirmation',
          content: 'The verification engine validates the proof against the decentralized trust registry and fires a real-time webhook or OAuth callback to the business.',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'key-features',
      text: 'Key Features',
    },
    {
      type: 'card-grid',
      cards: [
        {
          title: 'Sandbox & Live Environments',
          description: 'Test your integration thoroughly using sk_test_ keys before deploying to production with sk_live_ keys.',
          href: '/business/applications',
          badge: 'Developer',
        },
        {
          title: 'OAuth 2.0 & OIDC Apps',
          description: 'Allow students to "Verify with SyncID" directly within your login or checkout workflow.',
          href: '/business/oauth-apps',
          badge: 'Auth',
        },
        {
          title: 'Real-Time Webhooks',
          description: 'Receive instantaneous HMAC-signed notifications for verification.completed, consent.approved, and more.',
          href: '/business/webhooks',
          badge: 'Events',
        },
        {
          title: 'Verification Portal',
          description: 'In-person and QR code verification for physical stores, campuses, venues, and transit.',
          href: '/verification/overview',
          badge: 'In-Person',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'public-services',
      text: 'Public Services & Portals',
    },
    {
      type: 'list',
      items: [
        '**SyncID Business Portal** (business.syncnexa.co): The central dashboard for businesses to manage apps, API keys, OAuth clients, webhooks, analytics, and billing.',
        '**Verification Portal** (portal.syncnexa.co): The public portal used by staff, cashiers, and automated kiosks to verify student credentials via QR codes or verification tokens.',
        '**SyncNexa API Gateway** (api.business.syncnexa.co / api.syncnexa.co): High-throughput REST API for server-side verification and credential checking.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'next-steps',
      text: 'Next Steps',
    },
    {
      type: 'paragraph',
      text: 'Ready to get started? Explore the following guides to set up your integration:',
    },
    {
      type: 'card-grid',
      cards: [
        {
          title: 'Business Portal Quickstart',
          description: 'Create your organization account and issue your first test API key in under 5 minutes.',
          href: '/business/quickstart',
        },
        {
          title: 'API Authentication',
          description: 'Learn how to format API requests with Bearer tokens and environment prefixes.',
          href: '/api/authentication',
        },
        {
          title: 'Verification Portal Guide',
          description: 'Set up QR code scanning and explore in-person verification workflows.',
          href: '/verification/overview',
        },
      ],
    },
  ],
};
