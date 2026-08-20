import { DocPage } from '@/types/docs';

export const businessTeamSettingsDoc: DocPage = {
  slug: ['business', 'team-settings'],
  title: 'Team & Organization Settings',
  description: 'Manage team member roles, organization profile details, billing contacts, and security access controls in the SyncID Business Portal.',
  section: 'SyncID Business Portal',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'team-roles', title: 'Team Roles & Permissions', level: 2 },
    { id: 'inviting-members', title: 'Inviting Team Members', level: 2 },
    { id: 'organization-profile', title: 'Organization Profile & Branding', level: 2 },
    { id: 'billing-contacts', title: 'Billing Contacts & Invoices', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Collaborate securely with engineers, product managers, and finance operators by inviting team members with role-based access control (RBAC) in the Business Portal.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'team-roles',
      text: 'Team Roles & Permissions',
    },
    {
      type: 'table',
      headers: ['Role', 'Permissions', 'Ideal For'],
      rows: [
        ['**Owner / Admin**', 'Full administrative access: manage apps, generate/revoke API keys, invite members, modify billing and organization profile', 'Engineering leads, CTOs, Organization founders'],
        ['**Developer**', 'View and create applications, generate Sandbox and Live API keys, configure webhooks, view analytics and API logs', 'Software engineers, Integration specialists'],
        ['**Analyst / Viewer**', 'Read-only access to Analytics, verification volume charts, and audit logs; cannot view secrets or create apps', 'Product managers, Growth teams, Data analysts'],
        ['**Billing Contact**', 'Receives monthly invoices, quota alert emails, and manages payment methods', 'Finance managers, Accounting departments'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'inviting-members',
      text: 'Inviting Team Members',
    },
    {
      type: 'list',
      items: [
        'Navigate to **Team** in the Business Portal sidebar.',
        'Click **Invite Member** in the top right.',
        'Enter their business email address and assign an initial Role (**Admin**, **Developer**, or **Viewer**).',
        'An email invitation with a secure one-time activation link is dispatched immediately.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'organization-profile',
      text: 'Organization Profile & Branding',
    },
    {
      type: 'paragraph',
      text: 'Under **Organization Profile** (`/settings/profile`), configure your company details displayed to students during OAuth verification consent prompts:',
    },
    {
      type: 'list',
      items: [
        '**Legal Entity Name**: The legal name of your company.',
        '**Display Brand Name**: The user-facing brand name shown to students.',
        '**Primary Contact Email**: Official communication address for integration and compliance notifications.',
        '**Website URL**: Official company website.',
        '**Brand Logo**: SVG or high-resolution PNG displayed on verification consent screens.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'billing-contacts',
      text: 'Billing Contacts & Invoices',
    },
    {
      type: 'paragraph',
      text: 'By default, the primary account Administrator is assigned as the default billing contact. You can add dedicated accounts payable contacts in the **Billing** tab to receive monthly invoices and payment receipts without giving them developer access.',
    },
  ],
};
