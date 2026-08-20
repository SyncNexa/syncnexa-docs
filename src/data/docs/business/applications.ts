import { DocPage } from '@/types/docs';

export const businessApplicationsDoc: DocPage = {
  slug: ['business', 'applications'],
  title: 'Applications & Environments',
  description: 'Understand how to create, configure, and isolate Sandbox and Live applications within the SyncID Business Portal.',
  section: 'SyncID Business Portal',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'application-model', title: 'The Application Model', level: 2 },
    { id: 'sandbox-vs-live', title: 'Sandbox vs Live Environments', level: 2 },
    { id: 'creating-applications', title: 'Creating an Application', level: 2 },
    { id: 'application-settings', title: 'Application Settings & Metadata', level: 2 },
    { id: 'app-deletion-lifecycle', title: 'Deletion & Confirmation Guards', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Applications serve as the logical container for your integration resources in SyncNexa. Every API key, OAuth client ID, webhook subscription, and analytics telemetry log is scoped to a specific Application.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'application-model',
      text: 'The Application Model',
    },
    {
      type: 'paragraph',
      text: 'An Organization in the Business Portal can own multiple Applications (e.g., *Main E-commerce Store*, *Mobile iOS App*, *In-Store Point of Sale*). Each application holds its own credentials and can be toggled or monitored independently.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'sandbox-vs-live',
      text: 'Sandbox vs Live Environments',
    },
    {
      type: 'table',
      headers: ['Feature', 'Sandbox Environment', 'Live / Production Environment'],
      rows: [
        ['API Key Prefix', '`sk_test_...`', '`sk_live_...`'],
        ['Client ID Prefix', '`client_test_...`', '`client_live_...`'],
        ['Verification Data', 'Simulated test credentials & dummy students', 'Real university zero-knowledge proofs'],
        ['Billing & Quotas', 'Free unlimited test requests', 'Counts toward active plan quotas'],
        ['Webhooks', 'Dispatches simulated mock event payloads', 'Dispatches real student verification events'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Environment Isolation',
      text: 'Sandbox keys cannot access or verify live student records, and Live keys will reject test payloads. This strict separation ensures zero risk of testing leaks in production.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'creating-applications',
      text: 'Creating an Application',
    },
    {
      type: 'paragraph',
      text: 'When creating an application in the portal, you will be guided through a 2-step setup drawer:',
    },
    {
      type: 'list',
      items: [
        '**Step 1: Basic Information**: Define the application name, internal description, and select the environment (**Sandbox** or **Live**).',
        '**Step 2: Webhooks (Optional)**: If you provide a Webhook URL, interactive event checkboxes will appear allowing you to select trigger events (`verification.completed`, `verification.failed`, `consent.approved`, `consent.denied`, `student.revoked`).',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'application-settings',
      text: 'Application Settings & Metadata',
    },
    {
      type: 'paragraph',
      text: 'From the **App Details** view (`/applications/:appId`), you can view and edit:',
    },
    {
      type: 'list',
      items: [
        '**App ID**: The unique UUID identifying your application (e.g., `app_8a7b6c5d4e3f`).',
        '**Associated API Keys**: Active secret keys issued for this application.',
        '**OAuth Client Details**: Client ID, Client Secret, and configured Authorized Redirect URIs.',
        '**Subscribed Webhooks**: Registered endpoints and event filters.',
        '**Real-Time Analytics**: 24-hour verification volume, pass rate percentage, and latency graphs.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'app-deletion-lifecycle',
      text: 'Deletion & Confirmation Guards',
    },
    {
      type: 'paragraph',
      text: 'To protect your live integrations against accidental downtime, deleting an application requires explicit confirmation through a safety modal dialog. Revoking an application immediately invalidates all associated API keys and OAuth client credentials.',
    },
  ],
};
