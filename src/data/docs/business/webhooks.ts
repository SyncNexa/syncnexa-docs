import { DocPage } from '@/types/docs';

export const businessWebhooksDoc: DocPage = {
  slug: ['business', 'webhooks'],
  title: 'Webhooks & Events',
  description: 'Subscribe to real-time events, configure webhook endpoints, and handle verification and consent notifications securely with HMAC verification.',
  section: 'SyncID Business Portal',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'why-webhooks', title: 'Why Webhooks?', level: 2 },
    { id: 'event-types', title: 'Supported Event Types', level: 2 },
    { id: 'registering-endpoints', title: 'Registering a Webhook Endpoint', level: 2 },
    { id: 'payload-format', title: 'Payload Structure', level: 2 },
    { id: 'signature-verification', title: 'Signature Verification (HMAC-SHA256)', level: 2 },
    { id: 'retry-delivery-policy', title: 'Delivery & Retry Policy', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Webhooks allow your application to receive asynchronous, real-time push notifications whenever an important event occurs in SyncNexa, such as a student completing verification, granting or revoking consent, or an application status update.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'why-webhooks',
      text: 'Why Webhooks?',
    },
    {
      type: 'paragraph',
      text: 'Instead of polling the SyncNexa API repeatedly to check if a student has completed their verification session, webhooks notify your server the instant the cryptographic zero-knowledge proof is confirmed.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'event-types',
      text: 'Supported Event Types',
    },
    {
      type: 'table',
      headers: ['Event Name', 'Description', 'Trigger Condition'],
      rows: [
        ['`verification.completed`', 'Verification successfully confirmed', 'Student approved verification and zk-proof validated'],
        ['`verification.failed`', 'Verification rejected or timed out', 'Proof validation failed or session expired without approval'],
        ['`consent.approved`', 'Student approved data sharing', 'Student granted application permission to access claims'],
        ['`consent.denied`', 'Student declined data sharing', 'Student explicitly rejected application permission request'],
        ['`student.revoked`', 'Student credential revoked', 'Issuing university marked the student as graduated or withdrawn'],
        ['`app.updated`', 'Application configuration updated', 'App metadata, redirect URIs, or credentials changed'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'registering-endpoints',
      text: 'Registering a Webhook Endpoint',
    },
    {
      type: 'paragraph',
      text: 'You can configure webhooks either during **Application Creation (Step 2)** or via the **Webhooks** dashboard in the Business Portal:',
    },
    {
      type: 'list',
      items: [
        'Navigate to **Webhooks** in the Business Portal sidebar.',
        'Click **Add Endpoint**.',
        'Enter your HTTPS server endpoint URL (e.g., `https://api.yourdomain.com/webhooks/syncnexa`).',
        'Select the events you want to subscribe to using the interactive event checkboxes.',
        'Save the endpoint. A unique **Signing Secret** (`whsec_...`) will be generated for your endpoint.',
      ],
    },
    {
      type: 'callout',
      variant: 'security',
      title: 'HTTPS Endpoint Required',
      text: 'All production webhook URLs must use valid HTTPS with a trusted TLS certificate. Self-signed certificates are only permitted in local development proxies.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'payload-format',
      text: 'Payload Structure',
    },
    {
      type: 'paragraph',
      text: 'Every webhook notification is delivered as a `POST` request with a JSON payload:',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'sample-webhook-payload.json',
      code: `{
  "id": "evt_1a2b3c4d5e6f7g8h",
  "event": "verification.completed",
  "createdAt": "2026-08-20T12:00:00.000Z",
  "appId": "app_8a7b6c5d4e3f",
  "environment": "live",
  "data": {
    "sessionId": "sess_9f8e7d6c5b4a",
    "status": "completed",
    "verified": true,
    "university": {
      "name": "Imperial College London",
      "domain": "imperial.ac.uk",
      "country": "GB"
    },
    "proof": {
      "type": "Groth16",
      "proofHash": "0x4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b",
      "expiresAt": "2027-06-30T23:59:59Z"
    }
  }
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'signature-verification',
      text: 'Signature Verification (HMAC-SHA256)',
    },
    {
      type: 'paragraph',
      text: 'SyncNexa signs every webhook delivery using your endpoint\'s signing secret (`whsec_...`). The signature is included in the `X-SyncNexa-Signature` HTTP header in the format `t=timestamp,v1=signature_hex`:',
    },
    {
      type: 'code-tabs',
      snippets: [
        {
          language: 'typescript',
          label: 'Node.js / Express',
          code: `import crypto from 'crypto';
import express from 'express';

const app = express();

app.post(
  '/webhooks/syncnexa',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const signatureHeader = req.headers['x-syncnexa-signature'] as string;
    const signingSecret = process.env.SYNCNEXA_WEBHOOK_SECRET!; // whsec_...

    if (!signatureHeader) {
      return res.status(400).send('Missing signature header');
    }

    // 1. Extract timestamp and signature
    const parts = signatureHeader.split(',');
    const timestamp = parts.find((p) => p.startsWith('t='))?.split('=')[1];
    const expectedSig = parts.find((p) => p.startsWith('v1='))?.split('=')[1];

    // 2. Compute expected HMAC
    const signedPayload = \`\${timestamp}.\${req.body.toString('utf8')}\`;
    const computedSig = crypto
      .createHmac('sha256', signingSecret)
      .update(signedPayload)
      .digest('hex');

    // 3. Constant-time comparison
    const isValid = crypto.timingSafeEqual(
      Buffer.from(computedSig),
      Buffer.from(expectedSig || '')
    );

    if (!isValid) {
      return res.status(401).send('Invalid webhook signature');
    }

    const payload = JSON.parse(req.body.toString('utf8'));
    console.log('Verified Webhook Event:', payload.event);

    // Return 200 OK immediately
    res.status(200).json({ received: true });
  }
);`,
        },
        {
          language: 'python',
          label: 'Python / Flask',
          code: `import hmac
import hashlib
import time
from flask import Flask, request, jsonify

app = Flask(__name__)
SIGNING_SECRET = "whsec_your_webhook_secret_here"

@app.route('/webhooks/syncnexa', methods=['POST'])
def handle_webhook():
    sig_header = request.headers.get('X-SyncNexa-Signature', '')
    if not sig_header:
        return "Missing signature", 400

    parts = dict(x.split('=') for x in sig_header.split(','))
    timestamp = parts.get('t')
    signature = parts.get('v1')

    # Compute expected signature
    signed_payload = f"{timestamp}.{request.get_data(as_text=True)}"
    computed_sig = hmac.new(
        SIGNING_SECRET.encode('utf-8'),
        signed_payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(computed_sig, signature):
        return "Invalid signature", 401

    payload = request.json
    print(f"Verified Event: {payload['event']}")
    return jsonify({"received": True}), 200`,
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'retry-delivery-policy',
      text: 'Delivery & Retry Policy',
    },
    {
      type: 'paragraph',
      text: 'SyncNexa expects your server to respond with an HTTP `2xx` status code within **5 seconds**. If your server returns an error code or times out, the webhook dispatcher will automatically retry delivery using exponential backoff:',
    },
    {
      type: 'list',
      items: [
        '**Immediate Attempt**: At time 0',
        '**Retry 1**: 30 seconds later',
        '**Retry 2**: 5 minutes later',
        '**Retry 3**: 30 minutes later',
        '**Retry 4**: 2 hours later',
        '**Final Retry**: 24 hours later',
      ],
    },
  ],
};
