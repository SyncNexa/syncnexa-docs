import { DocPage } from '@/types/docs';

export const businessApiKeysDoc: DocPage = {
  slug: ['business', 'api-keys'],
  title: 'API Keys & Secrets',
  description: 'Learn how to generate, manage, rotate, and revoke secret API keys in the SyncID Business Portal.',
  section: 'SyncID Business Portal',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'key-formats', title: 'Key Formats & Prefixes', level: 2 },
    { id: 'generating-keys', title: 'Generating API Keys', level: 2 },
    { id: 'authenticating-requests', title: 'Authenticating API Requests', level: 2 },
    { id: 'key-rotation-revocation', title: 'Key Rotation & Revocation', level: 2 },
    { id: 'security-best-practices', title: 'Security Best Practices', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'SyncNexa uses cryptographically generated secret API keys to authenticate and authorize server-to-server requests to the SyncNexa API Gateway.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'key-formats',
      text: 'Key Formats & Prefixes',
    },
    {
      type: 'paragraph',
      text: 'API keys use standard prefix notation to allow instant identification of key type and target environment:',
    },
    {
      type: 'table',
      headers: ['Prefix', 'Environment', 'Example Masked Hint', 'Scope'],
      rows: [
        ['`sk_test_`', 'Sandbox / Testing', '`sk_test_****1a2b`', 'Development & sandbox verification requests'],
        ['`sk_live_`', 'Production / Live', '`sk_live_****9c8d`', 'Live verification & real student credential checks'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'generating-keys',
      text: 'Generating API Keys',
    },
    {
      type: 'paragraph',
      text: 'In the Business Portal at **business.syncnexa.co**:',
    },
    {
      type: 'list',
      items: [
        'Navigate to **API & OAuth** $\\rightarrow$ **API Keys**.',
        'Click **Create Key**.',
        'Enter a recognizable name (e.g., *Shopify Backend Server*), choose the parent Application, and select the Environment.',
        'Click **Generate Key**. The creation modal displays the raw unmasked secret key (e.g., `sk_test_YOUR_SECRET_KEY`).',
      ],
    },
    {
      type: 'callout',
      variant: 'important',
      title: 'One-Time Secret Display',
      text: 'For security, SyncNexa stores only the cryptographic hash of your secret key in the database. The full key is shown only once in the modal. If you lose a key, you must generate a new one and revoke the previous one.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'authenticating-requests',
      text: 'Authenticating API Requests',
    },
    {
      type: 'paragraph',
      text: 'Include your API key as a Bearer token in the `Authorization` header of every HTTP request:',
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
    "purpose": "Student Discount Eligibility Verification",
    "requiredClaims": ["is_active_student", "university_domain"]
  }'`,
        },
        {
          language: 'typescript',
          label: 'TypeScript',
          code: `import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.business.syncnexa.co',
  headers: {
    Authorization: \`Bearer \${process.env.SYNCNEXA_SECRET_KEY}\`,
    'Content-Type': 'application/json',
  },
});

const createSession = async () => {
  const { data } = await api.post('/verification/v1/sessions', {
    appId: process.env.SYNCNEXA_APP_ID,
    purpose: 'Student Discount Eligibility Verification',
    requiredClaims: ['is_active_student', 'university_domain'],
  });
  return data;
};`,
        },
        {
          language: 'python',
          label: 'Python',
          code: `import os
import requests

def create_verification_session():
    url = "https://api.business.syncnexa.co/verification/v1/sessions"
    headers = {
        "Authorization": f"Bearer {os.environ.get('SYNCNEXA_SECRET_KEY')}",
        "Content-Type": "application/json"
    }
    payload = {
        "appId": os.environ.get("SYNCNEXA_APP_ID"),
        "purpose": "Student Discount Eligibility Verification",
        "requiredClaims": ["is_active_student", "university_domain"]
    }
    response = requests.post(url, headers=headers, json=payload)
    return response.json()`,
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'key-rotation-revocation',
      text: 'Key Rotation & Revocation',
    },
    {
      type: 'paragraph',
      text: 'If a key is compromised or needs periodic rotation:',
    },
    {
      type: 'list',
      items: [
        'Create a new API key in the portal and deploy it to your server configuration.',
        'Verify that your application is communicating successfully using the new key.',
        'Locate the old key in the **API Keys** table, click the action menu $(\\cdots)$, and select **Revoke Key**.',
        'Confirm the revocation in the modal dialog. The old key will immediately be blacklisted across all gateway endpoints.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'security-best-practices',
      text: 'Security Best Practices',
    },
    {
      type: 'list',
      items: [
        'Store keys in secure environment variables or a secret manager (e.g., AWS Secrets Manager, Vault, GCP Secret Manager).',
        'Never commit API keys into version control (`.git`, `git commit`).',
        'Use separate Sandbox keys for staging and automated CI/CD test suites.',
        'Monitor the **Last Used** timestamp in the API Keys dashboard to identify inactive or orphaned keys.',
      ],
    },
  ],
};
