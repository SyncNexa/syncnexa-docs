import { DocPage } from '@/types/docs';

export const apiConsentDoc: DocPage = {
  slug: ['api', 'consent-api'],
  title: 'Consent API',
  description: 'Manage and inspect explicit, revocable student consent records and permission scopes.',
  section: 'API Reference',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'consent-overview', title: 'The Consent Lifecycle', level: 2 },
    { id: 'check-consent', title: 'Check Consent Status', level: 2 },
    { id: 'revoke-consent', title: 'Handle Revocations', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'SyncNexa treats student privacy and data sovereignty as fundamental rights. The Consent API provides an auditable, cryptographic record of permissions granted by students to your application.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'consent-overview',
      text: 'The Consent Lifecycle',
    },
    {
      type: 'paragraph',
      text: 'Every time a student verifies their status with an application, a digital consent record is created with an explicit expiration date and defined scope. Students can view and revoke active consents at any time directly from their SyncID mobile app.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'check-consent',
      text: 'Check Consent Status',
    },
    {
      type: 'api-endpoint',
      method: 'GET',
      path: '/consent/v1/records/:consentId',
      title: 'Get Consent Record',
      description: 'Retrieves the current status, granted scopes, and expiration timestamp of a student consent grant.',
      authRequired: true,
    },
    {
      type: 'code',
      language: 'json',
      filename: 'consent-record.json',
      code: `{
  "success": true,
  "data": {
    "consentId": "cns_8f7e6d5c4b3a",
    "appId": "app_8a7b6c5d4e3f",
    "status": "active",
    "scopes": ["student_status", "university_domain"],
    "grantedAt": "2026-08-20T11:00:00.000Z",
    "expiresAt": "2027-06-30T23:59:59.000Z"
  }
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'revoke-consent',
      text: 'Handle Revocations',
    },
    {
      type: 'paragraph',
      text: 'When a student revokes consent, SyncNexa automatically dispatches a `consent.denied` or `student.revoked` webhook to all subscribed applications, allowing your backend to promptly terminate student discounts or access privileges.',
    },
  ],
};
