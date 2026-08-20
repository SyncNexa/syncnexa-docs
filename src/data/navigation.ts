import { NavSection } from '@/types/docs';

export const navigationData: NavSection[] = [
  {
    title: 'Overview',
    icon: 'BookOpen',
    items: [
      { title: 'Welcome to SyncNexa', href: '/overview/introduction' },
      { title: 'Architecture & Trust Model', href: '/overview/architecture' },
    ],
  },
  {
    title: 'SyncID Business Portal',
    icon: 'Building2',
    items: [
      { title: 'Portal Quickstart', href: '/business/quickstart' },
      { title: 'Applications & Environments', href: '/business/applications' },
      { title: 'API Keys & Secrets', href: '/business/api-keys' },
      { title: 'OAuth 2.0 / OIDC Apps', href: '/business/oauth-apps' },
      { title: 'Webhooks & Events', href: '/business/webhooks' },
      { title: 'Usage & Analytics', href: '/business/analytics' },
      { title: 'Team & Organization Settings', href: '/business/team-settings' },
    ],
  },
  {
    title: 'Verification Portal',
    icon: 'ShieldCheck',
    items: [
      { title: 'Verification Overview', href: '/verification/overview' },
      { title: 'QR Code & In-Person Verification', href: '/verification/qr-verification' },
      { title: 'Verification States & Proofs', href: '/verification/verification-states' },
    ],
  },
  {
    title: 'API Reference',
    icon: 'Code2',
    items: [
      { title: 'Authentication & Headers', href: '/api/authentication' },
      { title: 'Applications API', href: '/api/apps-api', method: 'POST' },
      { title: 'Verification API', href: '/api/verification-api', method: 'POST' },
      { title: 'Consent API', href: '/api/consent-api', method: 'GET' },
      { title: 'Webhooks & HMAC Signatures', href: '/api/webhooks-api' },
      { title: 'Errors & Status Codes', href: '/api/errors' },
    ],
  },
  {
    title: 'Guides & Integration',
    icon: 'Compass',
    items: [
      { title: 'Integrating Student Verification', href: '/guides/web-integration' },
      { title: 'Verifying Webhook Signatures', href: '/guides/webhook-signatures' },
      { title: 'Testing in Sandbox Mode', href: '/guides/sandbox-testing' },
    ],
  },
];
