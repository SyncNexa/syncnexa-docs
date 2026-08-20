import { DocPage } from '@/types/docs';

export const verificationStatesDoc: DocPage = {
  slug: ['verification', 'verification-states'],
  title: 'Verification States & Proofs',
  description: 'Reference of all verification session states, error codes, proof validation responses, and lifecycle transitions.',
  section: 'Verification Portal',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'session-lifecycle', title: 'Verification Session Lifecycle', level: 2 },
    { id: 'session-states', title: 'Session States Reference', level: 2 },
    { id: 'proof-payload-structure', title: 'Proof Payload Structure', level: 2 },
    { id: 'error-reasons', title: 'Common Failure Reasons', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Every verification attempt in SyncNexa progresses through a strictly defined state machine to ensure auditability, replay protection, and deterministic outcomes.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'session-lifecycle',
      text: 'Verification Session Lifecycle',
    },
    {
      type: 'paragraph',
      text: 'A verification session begins in the `pending` state when created by a business or portal scanner, transitions to `evaluating` when the student submits their proof, and concludes in either `completed`, `failed`, or `expired`:',
    },
    {
      type: 'heading',
      level: 2,
      id: 'session-states',
      text: 'Session States Reference',
    },
    {
      type: 'table',
      headers: ['Status Code', 'Terminal?', 'Description', 'Action Required'],
      rows: [
        ['`pending`', 'No', 'Session created and waiting for student interaction', 'Present QR code or prompt student to approve'],
        ['`evaluating`', 'No', 'Proof received; cryptographic verification in progress', 'Wait for validation outcome (< 200ms)'],
        ['`completed`', 'Yes', 'Proof successfully validated; student status confirmed', 'Apply student discount / grant access'],
        ['`failed`', 'Yes', 'Proof invalid, forged, or credential revoked', 'Prompt user to retry or deny privilege'],
        ['`expired`', 'Yes', 'Session TTL exceeded without receiving proof', 'Create a new verification session'],
        ['`cancelled`', 'Yes', 'Session explicitly cancelled by student or requester', 'Aborted by user'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'proof-payload-structure',
      text: 'Proof Payload Structure',
    },
    {
      type: 'paragraph',
      text: 'When a verification session reaches the `completed` state, the verification response payload contains the proof verification metadata:',
    },
    {
      type: 'code',
      language: 'json',
      filename: 'verification-result.json',
      code: `{
  "sessionId": "sess_0a1b2c3d4e5f",
  "status": "completed",
  "verified": true,
  "verifiedAt": "2026-08-20T12:15:30.124Z",
  "issuer": {
    "id": "did:syncnexa:uni:oxford",
    "name": "University of Oxford",
    "domain": "ox.ac.uk",
    "trustScore": 1.0
  },
  "claims": {
    "is_enrolled": true,
    "enrollment_type": "Full-Time",
    "academic_year": "2025/2026",
    "valid_until": "2027-06-30T23:59:59Z"
  },
  "cryptography": {
    "proofType": "Groth16",
    "circuit": "student_enrollment_v1",
    "signatureValid": true,
    "nonce": "nonce_7f8a9b0c1d2e3f4a"
  }
}`,
    },
    {
      type: 'heading',
      level: 2,
      id: 'error-reasons',
      text: 'Common Failure Reasons',
    },
    {
      type: 'table',
      headers: ['Failure Code', 'User-Facing Reason', 'Recommended Resolution'],
      rows: [
        ['`ERR_EXPIRED_CREDENTIAL`', 'Student enrollment has expired', 'Student must request credential renewal from their university'],
        ['`ERR_REVOKED_CREDENTIAL`', 'Credential has been revoked by the issuer', 'Student status is no longer in good standing'],
        ['`ERR_INVALID_SIGNATURE`', 'Cryptographic signature mismatch', 'Check if student device clock is out of sync'],
        ['`ERR_NONCE_REPLAY`', 'Challenge nonce already used', 'Session expired or screenshot replayed; scan fresh QR code'],
        ['`ERR_SESSION_TIMEOUT`', '5-minute session window elapsed', 'Generate a new verification session'],
      ],
    },
  ],
};
