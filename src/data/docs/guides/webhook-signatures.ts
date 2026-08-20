import { DocPage } from '@/types/docs';

export const guideWebhookSignaturesDoc: DocPage = {
  slug: ['guides', 'webhook-signatures'],
  title: 'Verifying Webhook Signatures',
  description: 'Detailed security guide on validating HMAC-SHA256 signatures, preventing replay attacks, and debugging webhook payloads.',
  section: 'Guides & Integration',
  lastUpdated: 'August 2026',
  badge: 'Security',
  toc: [
    { id: 'why-verify-signatures', title: 'Why Signature Verification is Critical', level: 2 },
    { id: 'anatomy-of-signature', title: 'Anatomy of the Signature Header', level: 2 },
    { id: 'implementation-examples', title: 'Implementation Examples', level: 2 },
    { id: 'replay-attack-mitigation', title: 'Replay Attack Mitigation', level: 2 },
    { id: 'debugging-tips', title: 'Debugging Signature Failures', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Verifying webhook signatures protects your backend against malicious actors spoofing verification events to illegitimately obtain student discounts or access privileges.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'why-verify-signatures',
      text: 'Why Signature Verification is Critical',
    },
    {
      type: 'paragraph',
      text: 'Without signature validation, any bad actor who discovers your webhook URL could forge an HTTP POST payload claiming that a student is verified. SyncNexa signs every payload with HMAC-SHA256 using your unique webhook signing secret.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'anatomy-of-signature',
      text: 'Anatomy of the Signature Header',
    },
    {
      type: 'paragraph',
      text: 'The `X-SyncNexa-Signature` header contains two comma-separated key-value pairs:',
    },
    {
      type: 'code',
      language: 'bash',
      filename: 'sample-header.txt',
      code: `X-SyncNexa-Signature: t=1724155200,v1=5d41402abc4b2a76b9719d911017c5922e92c68e3768f5c9ef4780775d7b5394`,
    },
    {
      type: 'list',
      items: [
        '`t`: Unix timestamp in seconds when the webhook was generated.',
        '`v1`: Hexadecimal representation of the HMAC-SHA256 signature calculated over `${t}.${rawBody}` using your endpoint secret.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'implementation-examples',
      text: 'Implementation Examples',
    },
    {
      type: 'code-tabs',
      snippets: [
        {
          language: 'typescript',
          label: 'TypeScript (Node.js)',
          code: `import crypto from 'crypto';

export function isSignatureValid(
  rawBody: Buffer | string,
  sigHeader: string,
  secret: string
): boolean {
  const [tPart, v1Part] = sigHeader.split(',');
  const timestamp = tPart?.split('=')[1];
  const signature = v1Part?.split('=')[1];

  if (!timestamp || !signature) return false;

  const payload = \`\${timestamp}.\${rawBody.toString('utf8')}\`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expected, 'utf8'),
    Buffer.from(signature, 'utf8')
  );
}`,
        },
        {
          language: 'python',
          label: 'Python',
          code: `import hmac
import hashlib

def is_signature_valid(raw_body: bytes, sig_header: str, secret: str) -> bool:
    try:
        parts = dict(p.split('=', 1) for p in sig_header.split(','))
        timestamp = parts['t']
        signature = parts['v1']
        
        signed_payload = f"{timestamp}.".encode('utf-8') + raw_body
        expected = hmac.new(secret.encode('utf-8'), signed_payload, hashlib.sha256).hexdigest()
        
        return hmac.compare_digest(expected, signature)
    except Exception:
        return False`,
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'replay-attack-mitigation',
      text: 'Replay Attack Mitigation',
    },
    {
      type: 'paragraph',
      text: 'Always check that the timestamp `t` is within a reasonable tolerance (e.g. 5 minutes or 300 seconds) of the current server time:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'timestamp-guard.ts',
      code: `const currentTimestamp = Math.floor(Date.now() / 1000);
if (Math.abs(currentTimestamp - Number(timestamp)) > 300) {
  throw new Error('Webhook timestamp outside allowed tolerance window.');
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'debugging-tips',
      text: 'Debugging Signature Failures',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Raw Body vs Parsed JSON',
      text: 'Ensure you calculate the HMAC over the exact RAW unparsed HTTP body string or buffer. If your web framework parses JSON before computing the HMAC (e.g. `body-parser` formatting whitespace or key order), the calculated signature will not match.',
    },
  ],
};
