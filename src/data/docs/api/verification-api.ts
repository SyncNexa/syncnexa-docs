import { DocPage } from '@/types/docs';

export const apiVerificationDoc: DocPage = {
  slug: ['api', 'verification-api'],
  title: 'Verification API',
  description: 'Programmatically create verification sessions, evaluate zero-knowledge proofs, and query session outcomes.',
  section: 'API Reference',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'create-session', title: 'Create Verification Session', level: 2 },
    { id: 'get-session', title: 'Get Session Status', level: 2 },
    { id: 'verify-proof', title: 'Verify Proof Payload', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'The Verification API allows your backend or kiosk system to initiate verification sessions, generate dynamic challenge nonces, and evaluate student cryptographic proofs.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'create-session',
      text: 'Create Verification Session',
    },
    {
      type: 'api-endpoint',
      method: 'POST',
      path: '/verification/v1/sessions',
      title: 'Create Verification Session',
      description: 'Generates a new verification session with a unique challenge nonce and QR code payload.',
      authRequired: true,
    },
    {
      type: 'param-table',
      parameters: [
        {
          name: 'appId',
          type: 'string',
          required: true,
          description: 'The Application UUID creating the session.',
          example: 'app_8a7b6c5d4e3f',
        },
        {
          name: 'purpose',
          type: 'string',
          required: true,
          description: 'Human-readable explanation presented to the student.',
          example: 'Verify student status for 20% laptop discount',
        },
        {
          name: 'requiredClaims',
          type: 'string[]',
          required: true,
          description: 'List of required verification attributes.',
          example: '["is_active_student", "university_domain"]',
        },
        {
          name: 'expiresInSeconds',
          type: 'number',
          required: false,
          defaultValue: '300',
          description: 'Session validity window in seconds (max 900).',
          example: '300',
        },
      ],
    },
    {
      type: 'code-tabs',
      snippets: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X POST "https://api.business.syncnexa.co/verification/v1/sessions" \\
  -H "Authorization: Bearer sk_live_YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "appId": "app_8a7b6c5d4e3f",
    "purpose": "Verify student status for 20% discount",
    "requiredClaims": ["is_active_student", "university_domain"]
  }'`,
        },
        {
          language: 'typescript',
          label: 'TypeScript',
          code: `const session = await api.post('/verification/v1/sessions', {
  appId: 'app_8a7b6c5d4e3f',
  purpose: 'Verify student status for 20% discount',
  requiredClaims: ['is_active_student', 'university_domain'],
});`,
        },
      ],
    },
    {
      type: 'code',
      language: 'json',
      filename: 'create-session-response.json',
      code: `{
  "success": true,
  "data": {
    "sessionId": "sess_9f8e7d6c5b4a",
    "status": "pending",
    "challengeNonce": "nonce_3f8a9b0c1d2e",
    "qrPayload": "syncid://verify?session=sess_9f8e7d6c5b4a&nonce=nonce_3f8a9b0c1d2e",
    "verificationUrl": "https://portal.syncnexa.co/verify/sess_9f8e7d6c5b4a",
    "expiresAt": "2026-08-20T12:20:00.000Z"
  }
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'get-session',
      text: 'Get Session Status',
    },
    {
      type: 'api-endpoint',
      method: 'GET',
      path: '/verification/v1/sessions/:sessionId',
      title: 'Poll Verification Session',
      description: 'Checks the current state of a verification session and retrieves the proof result once completed.',
      authRequired: true,
    },
    {
      type: 'heading',
      level: 2,
      id: 'verify-proof',
      text: 'Verify Proof Payload',
    },
    {
      type: 'api-endpoint',
      method: 'POST',
      path: '/verification/v1/verify',
      title: 'Direct Proof Verification',
      description: 'Validates a raw zero-knowledge proof or signed student credential payload directly.',
      authRequired: true,
    },
  ],
};
