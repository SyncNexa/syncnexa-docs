import { DocPage } from '@/types/docs';

export const guideWebIntegrationDoc: DocPage = {
  slug: ['guides', 'web-integration'],
  title: 'Integrating Student Verification',
  description: 'End-to-end tutorial on integrating student discount verification into an e-commerce checkout or SaaS registration flow.',
  section: 'Guides & Integration',
  lastUpdated: 'August 2026',
  badge: 'Guide',
  toc: [
    { id: 'integration-architecture', title: 'Integration Architecture', level: 2 },
    { id: 'step-1-create-session', title: '1. Backend Creates Verification Session', level: 2 },
    { id: 'step-2-render-checkout', title: '2. Frontend Renders "Verify with SyncID"', level: 2 },
    { id: 'step-3-listen-webhooks', title: '3. Backend Receives Webhook Event', level: 2 },
    { id: 'step-4-apply-discount', title: '4. Unlock Student Benefit', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'This guide demonstrates how to integrate SyncNexa student verification into a modern web application (e.g. Next.js, Express, Rails, Django) to provide instant student discounts or educational tiers.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'integration-architecture',
      text: 'Integration Architecture',
    },
    {
      type: 'paragraph',
      text: 'The standard web verification pattern combines a backend-initiated verification session with client-side redirection or modal popups and real-time webhook confirmation.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'step-1-create-session',
      text: '1. Backend Creates Verification Session',
    },
    {
      type: 'paragraph',
      text: 'When the customer clicks "Verify Student Discount", your server calls the SyncNexa Verification API with your secret key:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'server/routes/checkout.ts',
      code: `import axios from 'axios';

app.post('/api/create-student-verification', async (req, res) => {
  const { customerId, cartId } = req.body;

  const response = await axios.post(
    'https://api.business.syncnexa.co/verification/v1/sessions',
    {
      appId: process.env.SYNCNEXA_APP_ID,
      purpose: 'Student 20% Discount Verification',
      requiredClaims: ['is_active_student', 'university_domain'],
      metadata: { customerId, cartId },
    },
    {
      headers: {
        Authorization: \`Bearer \${process.env.SYNCNEXA_SECRET_KEY}\`,
        'Content-Type': 'application/json',
      },
    }
  );

  res.json({
    verificationUrl: response.data.data.verificationUrl,
    sessionId: response.data.data.sessionId,
  });
});`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'step-2-render-checkout',
      text: '2. Frontend Renders "Verify with SyncID"',
    },
    {
      type: 'paragraph',
      text: 'On your checkout page, render the button and redirect the student or open the verification modal:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'components/StudentDiscountButton.tsx',
      code: `import React, { useState } from 'react';

export function StudentDiscountButton({ cartId }: { cartId: string }) {
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    const res = await fetch('/api/create-student-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId }),
    });
    const { verificationUrl } = await res.json();
    window.location.href = verificationUrl;
  };

  return (
    <button
      onClick={handleVerify}
      disabled={loading}
      className="btn-syncnexa"
    >
      {loading ? 'Opening SyncID...' : '🎓 Verify with SyncID for 20% Off'}
    </button>
  );
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'step-3-listen-webhooks',
      text: '3. Backend Receives Webhook Event',
    },
    {
      type: 'paragraph',
      text: 'When the student verifies on their mobile app or browser, your webhook handler receives the `verification.completed` event:',
    },
    {
      type: 'code',
      language: 'typescript',
      filename: 'server/webhooks/syncnexa.ts',
      code: `app.post('/webhooks/syncnexa', async (req, res) => {
  const event = req.body;

  if (event.event === 'verification.completed' && event.data.verified) {
    const { customerId, cartId } = event.data.metadata;
    await applyDiscountToCart(cartId, 0.20);
    await markCustomerAsVerifiedStudent(customerId, event.data.university.name);
  }

  res.status(200).json({ received: true });
});`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'step-4-apply-discount',
      text: '4. Unlock Student Benefit',
    },
    {
      type: 'paragraph',
      text: 'Once the discount is applied, the checkout summary automatically updates and the student completes their order with the applied discount.',
    },
  ],
};
