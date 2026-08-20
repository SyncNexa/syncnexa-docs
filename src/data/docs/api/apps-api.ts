import { DocPage } from '@/types/docs';

export const apiAppsDoc: DocPage = {
  slug: ['api', 'apps-api'],
  title: 'Applications & Credentials API',
  description: 'API endpoints for programmatically creating applications, generating API keys, registering webhooks, and retrieving organization metadata.',
  section: 'API Reference',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'list-apps', title: 'List Applications', level: 2 },
    { id: 'create-app', title: 'Create Application', level: 2 },
    { id: 'get-app', title: 'Get Application Details', level: 2 },
    { id: 'create-key', title: 'Generate API Key', level: 2 },
    { id: 'revoke-key', title: 'Revoke API Key', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'The Applications API enables automated provisioning of client apps, environments, secret keys, and webhook endpoints.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'list-apps',
      text: 'List Applications',
    },
    {
      type: 'api-endpoint',
      method: 'GET',
      path: '/org/v1/apps',
      title: 'List Organization Applications',
      description: 'Returns a paginated list of all active applications under the authenticated organization.',
      authRequired: true,
    },
    {
      type: 'code-tabs',
      snippets: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X GET "https://api.business.syncnexa.co/org/v1/apps" \\
  -H "Authorization: Bearer sk_live_YOUR_SECRET_KEY"`,
        },
        {
          language: 'typescript',
          label: 'TypeScript',
          code: `const response = await axios.get('https://api.business.syncnexa.co/org/v1/apps', {
  headers: { Authorization: \`Bearer \${API_KEY}\` }
});`,
        },
      ],
    },
    {
      type: 'code',
      language: 'json',
      filename: 'response-200.json',
      code: `{
  "success": true,
  "data": [
    {
      "id": "app_8a7b6c5d4e3f",
      "name": "Student Discount Store",
      "environment": "live",
      "status": "active",
      "createdAt": "2026-08-10T14:32:00.000Z",
      "webhookCount": 1,
      "keyCount": 2
    }
  ]
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'create-app',
      text: 'Create Application',
    },
    {
      type: 'api-endpoint',
      method: 'POST',
      path: '/org/v1/apps',
      title: 'Create New Application',
      description: 'Creates a new application container and optionally registers a webhook endpoint and event subscriptions in a single atomic transaction.',
      authRequired: true,
    },
    {
      type: 'param-table',
      parameters: [
        {
          name: 'name',
          type: 'string',
          required: true,
          description: 'Human-readable name of the application.',
          example: 'Acme Campus Store',
        },
        {
          name: 'environment',
          type: 'string',
          required: false,
          defaultValue: 'sandbox',
          description: 'Target environment: "sandbox" or "live".',
          example: 'sandbox',
        },
        {
          name: 'description',
          type: 'string',
          required: false,
          description: 'Optional internal description or notes.',
          example: 'Point of sale terminal at Main Campus',
        },
        {
          name: 'webhookUrl',
          type: 'string',
          required: false,
          description: 'Optional HTTPS webhook URL to register with the application.',
          example: 'https://api.acmestore.com/webhooks/syncnexa',
        },
        {
          name: 'webhookEvents',
          type: 'string[]',
          required: false,
          description: 'Array of event names to subscribe to when webhookUrl is provided.',
          example: '["verification.completed", "verification.failed"]',
        },
      ],
    },
    {
      type: 'code',
      language: 'json',
      filename: 'create-app-request.json',
      code: `{
  "name": "Acme Campus Store",
  "environment": "sandbox",
  "webhookUrl": "https://api.acmestore.com/webhooks/syncnexa",
  "webhookEvents": ["verification.completed", "consent.approved"]
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'get-app',
      text: 'Get Application Details',
    },
    {
      type: 'api-endpoint',
      method: 'GET',
      path: '/org/v1/apps/:appId',
      title: 'Retrieve Application Metadata',
      description: 'Fetches detailed configuration, credential counts, and metrics for a single application.',
      authRequired: true,
    },
    {
      type: 'heading',
      level: 2,
      id: 'create-key',
      text: 'Generate API Key',
    },
    {
      type: 'api-endpoint',
      method: 'POST',
      path: '/org/v1/keys',
      title: 'Generate API Key',
      description: 'Generates a new sk_test_ or sk_live_ secret key for the specified application. Returns the unmasked rawSecret once.',
      authRequired: true,
    },
    {
      type: 'param-table',
      parameters: [
        {
          name: 'appId',
          type: 'string',
          required: true,
          description: 'The target Application UUID.',
          example: 'app_8a7b6c5d4e3f',
        },
        {
          name: 'name',
          type: 'string',
          required: true,
          description: 'Label describing what system or server uses this key.',
          example: 'Production Backend API',
        },
        {
          name: 'environment',
          type: 'string',
          required: true,
          description: '"sandbox" generates sk_test_... or "live" generates sk_live_...',
          example: 'live',
        },
      ],
    },
    {
      type: 'code',
      language: 'json',
      filename: 'create-key-response.json',
      code: `{
  "success": true,
  "data": {
    "id": "key_9b8a7c6d5e4f",
    "appId": "app_8a7b6c5d4e3f",
    "name": "Production Backend API",
    "environment": "live",
    "keyHint": "sk_live_****3b4c",
    "rawSecret": "sk_live_YOUR_SECRET_KEY",
    "createdAt": "2026-08-20T12:20:00.000Z"
  }
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'revoke-key',
      text: 'Revoke API Key',
    },
    {
      type: 'api-endpoint',
      method: 'DELETE',
      path: '/org/v1/keys/:keyId',
      title: 'Revoke API Key',
      description: 'Permanently deletes and blacklists an API key. Any future requests using this key will immediately fail with HTTP 401.',
      authRequired: true,
    },
  ],
};
