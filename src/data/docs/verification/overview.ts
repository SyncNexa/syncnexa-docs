import { DocPage } from '@/types/docs';

export const verificationOverviewDoc: DocPage = {
  slug: ['verification', 'overview'],
  title: 'Verification Overview',
  description: 'Learn how the SyncNexa Verification Portal enables in-person, point-of-sale, and web-based verification of student credentials.',
  section: 'Verification Portal',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'what-is-verification-portal', title: 'What is the Verification Portal?', level: 2 },
    { id: 'verification-modalities', title: 'Supported Verification Modalities', level: 2 },
    { id: 'zero-knowledge-in-action', title: 'Zero-Knowledge Proof in Action', level: 2 },
    { id: 'pos-integration', title: 'Point-of-Sale & Store Workflows', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'The SyncNexa Verification Portal at **portal.syncnexa.co** is a lightweight, responsive public web interface and API endpoint designed for verifying student credentials in real-time. It is used by retail staff, event organizers, campus facilities, and transit operators.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'what-is-verification-portal',
      text: 'What is the Verification Portal?',
    },
    {
      type: 'paragraph',
      text: 'The portal acts as the verifier client in the SyncNexa trust triad. When a student presents their dynamic QR code or enters a verification code, the Verification Portal challenges the student\'s device, validates the cryptographic proof against the university trust registry, and returns an unambiguous pass/fail status.',
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Zero App Installation for Cashiers',
      text: 'The Verification Portal runs entirely in standard modern web browsers (Chrome, Safari, Edge, Firefox) on tablets, smartphones, and POS terminals with no native app installation required.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'verification-modalities',
      text: 'Supported Verification Modalities',
    },
    {
      type: 'table',
      headers: ['Modality', 'Use Case', 'Interaction', 'Latency'],
      rows: [
        ['**Dynamic QR Code**', 'Retail checkouts, physical events, transit gates', 'Cashier scans student\'s rotating SyncID QR code with device camera', '< 150 ms'],
        ['**One-Time SyncTag**', 'Phone orders, desk check-ins, manual entry', 'Cashier inputs 6-character alphanumeric code displayed in student app', '< 200 ms'],
        ['**Direct Deep Link**', 'Online checkout flows, web applications', 'Student clicks verification link on merchant checkout page', '< 300 ms'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'zero-knowledge-in-action',
      text: 'Zero-Knowledge Proof in Action',
    },
    {
      type: 'paragraph',
      text: 'When a verification is evaluated, the portal screen displays only the necessary verification claims without exposing confidential student details:',
    },
    {
      type: 'list',
      items: [
        '**Verification Status**: Distinct Green "VERIFIED ACTIVE STUDENT" banner or Red "INVALID / EXPIRED" alert.',
        '**Institution Name**: The student\'s verified university (e.g. *University of Oxford*).',
        '**Validity Expiration**: Credential expiration timestamp.',
        '**Zero PII**: No student ID number, date of birth, home address, or GPA is ever transmitted or rendered.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'pos-integration',
      text: 'Point-of-Sale & Store Workflows',
    },
    {
      type: 'paragraph',
      text: 'Stores can run the Verification Portal in **Kiosk Mode** on an iPad or Android tablet at the register, or integrate barcode/2D scanners directly into their Point of Sale (POS) software using the Verification REST API.',
    },
  ],
};
