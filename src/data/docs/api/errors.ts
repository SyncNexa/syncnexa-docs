import { DocPage } from '@/types/docs';

export const apiErrorsDoc: DocPage = {
  slug: ['api', 'errors'],
  title: 'Errors & Status Codes',
  description: 'Complete reference of HTTP status codes, error payload schemas, and troubleshooting guidelines for the SyncNexa API.',
  section: 'API Reference',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'error-response-format', title: 'Error Response Format', level: 2 },
    { id: 'http-status-codes', title: 'HTTP Status Codes', level: 2 },
    { id: 'common-error-codes', title: 'SyncNexa Error Codes', level: 2 },
    { id: 'handling-rate-limits', title: 'Handling Rate Limits & Retries', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'SyncNexa uses standard HTTP status codes to indicate the success or failure of API requests. Error responses return a JSON object with structured diagnostic information.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'error-response-format',
      text: 'Error Response Format',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'error-response.json',
      code: `{
  "error": {
    "code": "INVALID_REQUEST_PARAMETERS",
    "message": "The field 'requiredClaims' must be a non-empty array of valid strings.",
    "param": "requiredClaims",
    "docUrl": "https://docs.syncnexa.co/api/verification-api#create-session"
  }
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'http-status-codes',
      text: 'HTTP Status Codes',
    },
    {
      type: 'table',
      headers: ['Status Code', 'Meaning', 'Description'],
      rows: [
        ['`200 OK`', 'Success', 'The request completed successfully.'],
        ['`201 Created`', 'Resource Created', 'A new application, API key, or verification session was created.'],
        ['`400 Bad Request`', 'Invalid Request', 'Missing required parameters or malformed JSON payload.'],
        ['`401 Unauthorized`', 'Authentication Failed', 'Missing, invalid, or revoked API key.'],
        ['`403 Forbidden`', 'Permission Denied', 'API key lacks permission for the requested environment or resource.'],
        ['`404 Not Found`', 'Resource Missing', 'The requested application, key, session, or webhook was not found.'],
        ['`409 Conflict`', 'Resource Conflict', 'An application or redirect URI with this name/value already exists.'],
        ['`422 Unprocessable Entity`', 'Validation Error', 'Schema validation failed for one or more fields.'],
        ['`429 Too Many Requests`', 'Rate Limit Exceeded', 'Too many requests sent within the active rate limit window.'],
        ['`500 Internal Error`', 'Server Error', 'An unexpected error occurred on SyncNexa servers.'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'common-error-codes',
      text: 'SyncNexa Error Codes',
    },
    {
      type: 'table',
      headers: ['Error Code', 'HTTP Status', 'Description'],
      rows: [
        ['`UNAUTHORIZED`', '401', 'API key is missing or invalid in the Authorization header.'],
        ['`KEY_REVOKED`', '401', 'The provided API key has been explicitly revoked.'],
        ['`ENVIRONMENT_MISMATCH`', '403', 'Sandbox keys cannot be used to verify live production sessions.'],
        ['`APP_NOT_FOUND`', '404', 'Application UUID does not exist or does not belong to your organization.'],
        ['`SESSION_EXPIRED`', '410', 'Verification session has elapsed its time-to-live window.'],
        ['`PROOF_INVALID`', '422', 'Zero-knowledge proof failed cryptographic verification against issuer public key.'],
        ['`RATE_LIMIT_EXCEEDED`', '429', 'Too many requests; back off and retry.'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'handling-rate-limits',
      text: 'Handling Rate Limits & Retries',
    },
    {
      type: 'paragraph',
      text: 'When handling HTTP 429 or HTTP 5xx responses, implement exponential backoff with randomized jitter to prevent thundering herd problems:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'backoff.ts',
      code: `async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.status !== 429 && response.status < 500) {
        return response;
      }
    } catch (err) {
      if (attempt === maxRetries - 1) throw err;
    }
    const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}`,
    },
  ],
};
