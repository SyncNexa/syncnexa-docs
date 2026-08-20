import { DocPage } from '@/types/docs';

export const architectureDoc: DocPage = {
  slug: ['overview', 'architecture'],
  title: 'Architecture & Trust Model',
  description: 'Understand the cryptographic trust model, zero-knowledge verification mechanics, and microservice infrastructure powering SyncNexa.',
  section: 'Overview',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'trust-triad', title: 'The Decentralized Trust Triad', level: 2 },
    { id: 'zero-knowledge-model', title: 'Zero-Knowledge Verification', level: 2 },
    { id: 'microservice-topology', title: 'System Topology', level: 2 },
    { id: 'security-guarantees', title: 'Cryptographic Security Guarantees', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'SyncNexa is built on a tripartite trust architecture connecting Issuers (Universities), Holders (Students), and Verifiers (Businesses / Relying Parties). Cryptographic signatures and zero-knowledge circuit validation ensure that no single party holds unnecessary information.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'trust-triad',
      text: 'The Decentralized Trust Triad',
    },
    {
      type: 'table',
      headers: ['Role', 'Entity', 'Cryptographic Action', 'Access Level'],
      rows: [
        ['Issuer', 'Accredited University / College', 'Signs student enrollment claim with institutional private key', 'Issues credential to student device'],
        ['Holder', 'Enrolled Student', 'Generates Zero-Knowledge proof of active enrollment', 'Full sovereign custody of credentials'],
        ['Verifier', 'Business / Organization / Portal', 'Verifies mathematical proof against university public keys', 'Receives valid/invalid status; zero PII'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'zero-knowledge-model',
      text: 'Zero-Knowledge Verification',
    },
    {
      type: 'paragraph',
      text: 'Traditional verification forces students to hand over copies of their government ID or student card. SyncNexa replaces this with a mathematical proof: the verifier poses a challenge ($C$), and the student\'s device computes a zk-SNARK proof ($\pi$) demonstrating that:',
    },
    {
      type: 'list',
      items: [
        'The credential was signed by an authorized university in the SyncNexa trust registry.',
        'The current timestamp falls between `valid_from` and `valid_until`.',
        'The credential has not been revoked by the issuing institution.',
        'The student possesses the corresponding private device key without revealing it.',
      ],
    },
    {
      type: 'callout',
      variant: 'security',
      title: 'No Centralized Honeypot',
      text: 'Because zero-knowledge proofs are evaluated deterministically, SyncNexa servers do not store or mirror student identity records. This makes the architecture inherently immune to large-scale identity data breaches.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'microservice-topology',
      text: 'System Topology',
    },
    {
      type: 'paragraph',
      text: 'The SyncNexa platform is engineered with a high-throughput, low-latency microservice architecture:',
    },
    {
      type: 'list',
      items: [
        '**API Gateway**: Dot-notation routing (`api.business.syncnexa.co`, `api.syncnexa.co`), SSL termination, rate-limiting, and authentication proxying.',
        '**Org Service (`syncid-org`)**: Manages business applications, environments, API keys, OAuth clients, and billing accounts.',
        '**Verification Service (`syncid-verification`)**: Evaluates zero-knowledge proofs, cryptographic signatures, and generates verification tokens.',
        '**Consent Service (`syncid-consent`)**: Manages granular, revocable permissions between students and requesting applications.',
        '**Notification & Webhooks Engine (`syncid-notification`)**: Dispatches real-time HMAC-signed webhooks to business endpoints with automatic exponential backoff retries.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'security-guarantees',
      text: 'Cryptographic Security Guarantees',
    },
    {
      type: 'card-grid',
      cards: [
        {
          title: 'Elliptic-Curve Signatures',
          description: 'All issued credentials utilize Ed25519 / Secp256k1 digital signatures for unforgeable institutional authenticity.',
          href: '/api/authentication',
        },
        {
          title: 'Replay Attack Protection',
          description: 'Verification sessions utilize cryptographically randomized one-time nonces with a 5-minute time-to-live (TTL).',
          href: '/verification/verification-states',
        },
        {
          title: 'HMAC-SHA256 Webhooks',
          description: 'Every webhook delivery includes an X-SyncNexa-Signature header allowing your server to verify payload integrity.',
          href: '/guides/webhook-signatures',
        },
      ],
    },
  ],
};
