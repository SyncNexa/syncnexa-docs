import { DocPage } from '@/types/docs';

export const businessQuickstartDoc: DocPage = {
  slug: ['business', 'quickstart'],
  title: 'Business Portal Quickstart',
  description: 'Get up and running with the SyncID Business Portal in under 5 minutes. Create your organization, register an application, and issue your first API key.',
  section: 'SyncID Business Portal',
  lastUpdated: 'August 2026',
  badge: 'Quickstart',
  toc: [
    { id: 'step-1-create-account', title: '1. Create Your Business Account', level: 2 },
    { id: 'step-2-create-application', title: '2. Register Your Application', level: 2 },
    { id: 'step-3-generate-api-key', title: '3. Generate an API Key', level: 2 },
    { id: 'step-4-first-api-call', title: '4. Make Your First API Request', level: 2 },
    { id: 'next-steps', title: 'Next Steps', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'The SyncID Business Portal at **business.syncnexa.co** is your command center for managing student verification integrations, API credentials, OAuth client applications, real-time webhooks, team members, and usage telemetry.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'step-1-create-account',
      text: '1. Create Your Business Account',
    },
    {
      type: 'paragraph',
      text: 'Navigate to **business.syncnexa.co/register** and sign up with your company email. Once verified, you will be prompted to enter your Organization Legal Name and primary business website.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Sandbox by Default',
      text: 'All new accounts start in **Sandbox Mode**, giving you unlimited free test verifications and simulated student credentials without any credit card required.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'step-2-create-application',
      text: '2. Register Your Application',
    },
    {
      type: 'paragraph',
      text: 'An **Application** in SyncNexa represents a distinct website, mobile app, or store integration. To create one:',
    },
    {
      type: 'list',
      items: [
        'Open the **Applications** tab in the sidebar.',
        'Click the **Create Application** button in the top-right corner.',
        '**Step 1 (Basic Details)**: Enter your Application Name (e.g., *Student Discount Store*) and select the Environment (**Sandbox** or **Live**).',
        '**Step 2 (Webhooks - Optional)**: Enter your server endpoint URL (e.g., `https://api.yourdomain.com/webhooks/syncnexa`) and select the events you wish to receive (`verification.completed`, `consent.approved`, etc.).',
        'Click **Create Application** to finalize.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'step-3-generate-api-key',
      text: '3. Generate an API Key',
    },
    {
      type: 'paragraph',
      text: 'Once your application is created, generate a secret API key to authenticate your server-side requests:',
    },
    {
      type: 'list',
      items: [
        'Navigate to **API & OAuth** $\\rightarrow$ **API Keys** tab.',
        'Click **Create Key**.',
        'Select the target Application and Environment (**Sandbox** generates `sk_test_...`, **Live** generates `sk_live_...`).',
        'Copy the secret key immediately. For security reasons, the full secret key is only shown once in the creation modal.',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Keep Secret Keys Confidential',
      text: 'Never expose `sk_test_` or `sk_live_` secret keys in client-side code, public GitHub repositories, or browser bundles. Always execute API requests from your backend server.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'step-4-first-api-call',
      text: '4. Make Your First API Request',
    },
    {
      type: 'paragraph',
      text: 'Test your new API key by fetching your application metadata from the SyncNexa API Gateway:',
    },
    {
      type: 'code-tabs',
      snippets: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X GET "https://api.business.syncnexa.co/org/v1/apps" \\
  -H "Authorization: Bearer sk_test_YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json"`,
        },
        {
          language: 'typescript',
          label: 'Node.js / TypeScript',
          code: `import axios from 'axios';

const response = await axios.get('https://api.business.syncnexa.co/org/v1/apps', {
  headers: {
    Authorization: \`Bearer \${process.env.SYNCNEXA_API_KEY}\`,
    'Content-Type': 'application/json',
  },
});

console.log('Registered Apps:', response.data.data);`,
        },
        {
          language: 'python',
          label: 'Python',
          code: `import os
import requests

headers = {
    "Authorization": f"Bearer {os.environ.get('SYNCNEXA_API_KEY')}",
    "Content-Type": "application/json"
}

response = requests.get("https://api.business.syncnexa.co/org/v1/apps", headers=headers)
print("Registered Apps:", response.json())`,
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'next-steps',
      text: 'Next Steps',
    },
    {
      type: 'card-grid',
      cards: [
        {
          title: 'Managing Applications',
          description: 'Learn about environments, application credentials, and lifecycle states.',
          href: '/business/applications',
        },
        {
          title: 'Webhooks & Events',
          description: 'Configure real-time event streaming for student verifications and consents.',
          href: '/business/webhooks',
        },
        {
          title: 'OAuth 2.0 Integration',
          description: 'Implement "Verify with SyncID" button on your checkout or sign-up flow.',
          href: '/business/oauth-apps',
        },
      ],
    },
  ],
};
