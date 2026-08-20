import { DocPage } from '@/types/docs';

export const businessOAuthAppsDoc: DocPage = {
  slug: ['business', 'oauth-apps'],
  title: 'OAuth 2.0 / OIDC Apps',
  description: 'Integrate the "Verify with SyncID" flow into your web or mobile app using standard OAuth 2.0 and OpenID Connect protocols.',
  section: 'SyncID Business Portal',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'oauth-overview', title: 'OAuth 2.0 Flow Overview', level: 2 },
    { id: 'creating-oauth-client', title: 'Registering an OAuth Client', level: 2 },
    { id: 'authorization-code-flow', title: 'Authorization Code Flow', level: 2 },
    { id: 'token-exchange', title: 'Exchanging the Code for a Token', level: 2 },
    { id: 'user-claims-endpoint', title: 'Fetching Verified Student Claims', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'SyncID OAuth 2.0 / OpenID Connect (OIDC) allows businesses to provide a seamless "Verify with SyncID" button on their web storefronts, SaaS checkouts, or mobile applications. When clicked, students approve the verification request in their SyncID mobile app or web portal.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'oauth-overview',
      text: 'OAuth 2.0 Flow Overview',
    },
    {
      type: 'steps',
      steps: [
        {
          title: '1. User Clicks "Verify with SyncID"',
          content: 'Your frontend redirects the user to the SyncID Authorization Endpoint with your `client_id`, `redirect_uri`, `scope`, and a randomized `state` nonce.',
        },
        {
          title: '2. Student Approves Verification',
          content: 'The student reviews the requested claims (e.g. active student status, university name) and approves the zero-knowledge proof generation.',
        },
        {
          title: '3. Authorization Code Callback',
          content: 'SyncID redirects the student back to your `redirect_uri` with an authorization `code` and your original `state`.',
        },
        {
          title: '4. Server-Side Token Exchange',
          content: 'Your backend exchanges the `code` + `client_secret` for a signed ID token and verification proof object.',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'creating-oauth-client',
      text: 'Registering an OAuth Client',
    },
    {
      type: 'paragraph',
      text: 'In the Business Portal at **business.syncnexa.co**:',
    },
    {
      type: 'list',
      items: [
        'Navigate to **API & OAuth** $\\rightarrow$ **OAuth Clients** tab.',
        'Click **Create OAuth Client**.',
        'Fill in the client name (e.g., *Student Store Web App*), choose the Environment (**Sandbox** or **Live**), and specify one or more **Authorized Redirect URIs** (e.g., `https://yourdomain.com/auth/syncid/callback`).',
        'Click **Create Client** to generate your `client_id` and `client_secret`.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'authorization-code-flow',
      text: 'Authorization Code Flow',
    },
    {
      type: 'paragraph',
      text: 'Redirect the user to the authorization URL from your frontend:',
    },
    {
      type: 'code',
      language: 'html',
      filename: 'verify-button.html',
      code: `https://business.syncnexa.co/oauth/authorize?
  client_id=client_live_4b8f2a9e1c3d
  &redirect_uri=https%3A%2F%2Fyourdomain.com%2Fauth%2Fsyncid%2Fcallback
  &response_type=code
  &scope=openid+profile+student_status+university
  &state=xyzState123RandomNonce`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'token-exchange',
      text: 'Exchanging the Code for a Token',
    },
    {
      type: 'paragraph',
      text: 'When your callback endpoint receives the authorization code, exchange it for access & ID tokens:',
    },
    {
      type: 'code-tabs',
      snippets: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X POST "https://api.business.syncnexa.co/oauth/token" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=authorization_code" \\
  -d "code=auth_code_9a8b7c6d5e4f3a2b" \\
  -d "redirect_uri=https://yourdomain.com/auth/syncid/callback" \\
  -d "client_id=client_live_4b8f2a9e1c3d" \\
  -d "client_secret=sec_live_YOUR_CLIENT_SECRET"`,
        },
        {
          language: 'typescript',
          label: 'TypeScript',
          code: `import axios from 'axios';

const exchangeAuthCode = async (code: string) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SYNCNEXA_REDIRECT_URI!,
    client_id: process.env.SYNCNEXA_CLIENT_ID!,
    client_secret: process.env.SYNCNEXA_CLIENT_SECRET!,
  });

  const { data } = await axios.post(
    'https://api.business.syncnexa.co/oauth/token',
    params.toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return data; // { access_token, id_token, expires_in, token_type: 'Bearer' }
};`,
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'user-claims-endpoint',
      text: 'Fetching Verified Student Claims',
    },
    {
      type: 'paragraph',
      text: 'Use the `access_token` to retrieve the student verification claims:',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'sample-userinfo-response.json',
      code: `{
  "sub": "usr_9c8b7a6f5e4d3c2b",
  "is_active_student": true,
  "university_name": "University of Cambridge",
  "university_domain": "cam.ac.uk",
  "verification_timestamp": "2026-08-20T11:45:00Z",
  "proof_valid_until": "2027-06-30T23:59:59Z",
  "proof_hash": "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
}`,
    },
  ],
};
