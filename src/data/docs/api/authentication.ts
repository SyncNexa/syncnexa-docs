import { DocPage } from '@/types/docs';

export const apiAuthDoc: DocPage = {
  slug: ['api', 'authentication'],
  title: 'Authentication & Headers',
  description: 'Learn how to authenticate requests to the SyncNexa API Gateway using Bearer API keys, client credentials, and required HTTP headers.',
  section: 'API Reference',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'base-urls', title: 'Base URLs & Environments', level: 2 },
    { id: 'bearer-authentication', title: 'Bearer Token Authentication', level: 2 },
    { id: 'required-headers', title: 'Standard HTTP Headers', level: 2 },
    { id: 'rate-limiting', title: 'Rate Limiting & Throttling', level: 2 },
    { id: 'authentication-errors', title: 'Authentication Errors', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'All requests to the SyncNexa API must be made over HTTPS. Authentication is handled via Bearer API keys passed in the standard `Authorization` request header.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'base-urls',
      text: 'Base URLs & Environments',
    },
    {
      type: 'table',
      headers: ['Service', 'Production Base URL', 'Purpose'],
      rows: [
        ['**Business API Gateway**', '`https://api.business.syncnexa.co`', 'Applications, API keys, OAuth clients, webhooks, analytics'],
        ['**Verification Service**', '`https://api.business.syncnexa.co/verification/v1`', 'Creating and querying verification sessions'],
        ['**Consent Service**', '`https://api.business.syncnexa.co/consent/v1`', 'Student consent tracking and permission records'],
        ['**Static Assets CDN**', '`https://assets.syncnexa.co`', 'Official logos, email hero images, brand badges'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'bearer-authentication',
      text: 'Bearer Token Authentication',
    },
    {
      type: 'paragraph',
      text: 'Provide your secret key (`sk_test_...` or `sk_live_...`) in the `Authorization` header:',
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'authorization-header.txt',
      code: `Authorization: Bearer sk_live_YOUR_SECRET_KEY`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'required-headers',
      text: 'Standard HTTP Headers',
    },
    {
      type: 'param-table',
      parameters: [
        {
          name: 'Authorization',
          type: 'string',
          required: true,
          description: 'Bearer token with your secret API key (sk_test_... or sk_live_...).',
          example: 'Bearer sk_live_123...',
        },
        {
          name: 'Content-Type',
          type: 'string',
          required: true,
          description: 'MIME type of the request payload. Must be application/json for JSON payloads.',
          example: 'application/json',
        },
        {
          name: 'X-SyncNexa-Version',
          type: 'string',
          required: false,
          defaultValue: '2026-08-01',
          description: 'Optional API version pin. Defaults to the account\'s default API version.',
          example: '2026-08-01',
        },
        {
          name: 'Idempotency-Key',
          type: 'string',
          required: false,
          description: 'Unique UUID to prevent duplicate operations on network retries.',
          example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'rate-limiting',
      text: 'Rate Limiting & Throttling',
    },
    {
      type: 'paragraph',
      text: 'API requests are rate-limited per application to prevent abuse and protect platform stability. Rate limit status is communicated in every response header:',
    },
    {
      type: 'list',
      items: [
        '`X-RateLimit-Limit`: Maximum requests permitted within the current window.',
        '`X-RateLimit-Remaining`: Number of requests remaining in the current window.',
        '`X-RateLimit-Reset`: Unix timestamp when the rate limit quota resets.',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'HTTP 429 Too Many Requests',
      text: 'If your application exceeds its rate limit, the API returns HTTP 429. Implement exponential backoff with jitter when retrying failed requests.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'authentication-errors',
      text: 'Authentication Errors',
    },
    {
      type: 'code',
      language: 'json',
      filename: '401-unauthorized.json',
      code: `{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or revoked API key provided in Authorization header.",
    "docUrl": "https://docs.syncnexa.co/api/authentication"
  }
}`,
    },
  ],
};
