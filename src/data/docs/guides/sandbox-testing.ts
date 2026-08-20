import { DocPage } from '@/types/docs';

export const guideSandboxTestingDoc: DocPage = {
  slug: ['guides', 'sandbox-testing'],
  title: 'Testing in Sandbox Mode',
  description: 'How to use simulated test credentials, trigger test webhook events, and test error scenarios in the Sandbox environment.',
  section: 'Guides & Integration',
  lastUpdated: 'August 2026',
  badge: 'Guide',
  toc: [
    { id: 'sandbox-overview', title: 'The Sandbox Environment', level: 2 },
    { id: 'test-credentials', title: 'Simulated Student Personas', level: 2 },
    { id: 'triggering-test-webhooks', title: 'Simulating Webhook Events', level: 2 },
    { id: 'moving-to-live', title: 'Checklist Before Going Live', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'The SyncNexa Sandbox environment is an exact duplicate of production that operates on mock cryptographic data, allowing you to test every edge case without affecting real student records or incurring billing charges.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'sandbox-overview',
      text: 'The Sandbox Environment',
    },
    {
      type: 'paragraph',
      text: 'All requests made with API keys prefixed with `sk_test_` operate in the Sandbox environment automatically.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'test-credentials',
      text: 'Simulated Student Personas',
    },
    {
      type: 'table',
      headers: ['Test SyncTag / Input', 'Simulated Persona', 'Outcome / Response'],
      rows: [
        ['`TEST_PASS_ACTIVE`', 'Active Full-Time Student at University of Cambridge', '`completed` (Pass) with valid 2026/2027 enrollment proof'],
        ['`TEST_FAIL_EXPIRED`', 'Former Student with Expired Enrollment', '`failed` with `ERR_EXPIRED_CREDENTIAL`'],
        ['`TEST_FAIL_REVOKED`', 'Revoked Student Credential', '`failed` with `ERR_REVOKED_CREDENTIAL`'],
        ['`TEST_TIMEOUT`', 'Unresponsive Session', 'Waits 30s and transitions to `expired`'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'triggering-test-webhooks',
      text: 'Simulating Webhook Events',
    },
    {
      type: 'paragraph',
      text: 'You can test webhook delivery directly from the Business Portal dashboard or by using the test endpoint in your automated CI/CD test pipelines.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'moving-to-live',
      text: 'Checklist Before Going Live',
    },
    {
      type: 'list',
      items: [
        'Replace all `sk_test_` keys with production `sk_live_` keys in your production environment variables.',
        'Register your production HTTPS webhook URL in the Live environment tab.',
        'Verify that your webhook receiver enforces HMAC-SHA256 signature verification.',
        'Confirm your organization profile details and billing contact information in the Business Portal.',
      ],
    },
  ],
};
