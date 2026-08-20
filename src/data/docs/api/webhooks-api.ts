import { DocPage } from '@/types/docs';

export const apiWebhooksDoc: DocPage = {
  slug: ['api', 'webhooks-api'],
  title: 'Webhooks & HMAC Signatures',
  description: 'Technical reference for webhook event schemas, cryptographic signature validation, delivery retries, and endpoint management.',
  section: 'API Reference',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'webhook-headers', title: 'Webhook Delivery Headers', level: 2 },
    { id: 'event-schemas', title: 'Event Schemas & Payloads', level: 2 },
    { id: 'verifying-signatures', title: 'Verifying HMAC-SHA256 Signatures', level: 2 },
    { id: 'manage-subscriptions-api', title: 'Managing Subscriptions via API', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'SyncNexa webhooks deliver secure, event-driven HTTP POST notifications directly to your application backend.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'webhook-headers',
      text: 'Webhook Delivery Headers',
    },
    {
      type: 'table',
      headers: ['Header', 'Format', 'Description'],
      rows: [
        ['`X-SyncNexa-Signature`', '`t=1724155200,v1=9a8b...`', 'Timestamp and HMAC-SHA256 signature for payload verification'],
        ['`X-SyncNexa-Event`', '`verification.completed`', 'The specific event identifier for routing'],
        ['`X-SyncNexa-Delivery`', '`del_9f8e7d6c5b4a`', 'Unique delivery attempt UUID for idempotency tracking'],
        ['`Content-Type`', '`application/json`', 'JSON payload encoding'],
        ['`User-Agent`', '`SyncNexa-Webhooks/1.0`', 'Standard webhook user agent string'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'event-schemas',
      text: 'Event Schemas & Payloads',
    },
    {
      type: 'paragraph',
      text: 'Sample `verification.completed` event payload:',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'verification.completed.json',
      code: `{
  "id": "evt_0a1b2c3d4e5f",
  "event": "verification.completed",
  "createdAt": "2026-08-20T12:30:00.000Z",
  "appId": "app_8a7b6c5d4e3f",
  "environment": "live",
  "data": {
    "sessionId": "sess_9f8e7d6c5b4a",
    "verified": true,
    "university": {
      "name": "University College London",
      "domain": "ucl.ac.uk",
      "country": "GB"
    },
    "claims": {
      "is_active_student": true,
      "academic_level": "Undergraduate",
      "valid_until": "2027-06-30T23:59:59Z"
    }
  }
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'verifying-signatures',
      text: 'Verifying HMAC-SHA256 Signatures',
    },
    {
      type: 'paragraph',
      text: 'Verify the raw request body with your secret key to prevent replay attacks and man-in-the-middle tampering:',
    },
    {
      type: 'code-tabs',
      snippets: [
        {
          language: 'typescript',
          label: 'TypeScript / Node.js',
          code: `import crypto from 'crypto';

export function verifySyncNexaWebhook(
  rawBody: string | Buffer,
  signatureHeader: string,
  secret: string,
  toleranceSeconds: number = 300
): boolean {
  const parts = signatureHeader.split(',');
  const timestamp = parts.find((p) => p.startsWith('t='))?.split('=')[1];
  const signature = parts.find((p) => p.startsWith('v1='))?.split('=')[1];

  if (!timestamp || !signature) return false;

  // Check timestamp freshness to prevent replay attacks
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > toleranceSeconds) {
    return false;
  }

  const payload = \`\${timestamp}.\${rawBody.toString()}\`;
  const computed = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(computed),
    Buffer.from(signature)
  );
}`,
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'manage-subscriptions-api',
      text: 'Managing Subscriptions via API',
    },
    {
      type: 'api-endpoint',
      method: 'POST',
      path: '/org/v1/webhooks',
      title: 'Create Webhook Subscription',
      description: 'Registers a new webhook URL and subscribes to specified event triggers.',
      authRequired: true,
    },
  ],
};
