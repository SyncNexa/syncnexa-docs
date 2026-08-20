import { DocPage } from '@/types/docs';
import { introductionDoc } from './overview/introduction';
import { architectureDoc } from './overview/architecture';
import { businessQuickstartDoc } from './business/quickstart';
import { businessApplicationsDoc } from './business/applications';
import { businessApiKeysDoc } from './business/api-keys';
import { businessOAuthAppsDoc } from './business/oauth-apps';
import { businessWebhooksDoc } from './business/webhooks';
import { businessAnalyticsDoc } from './business/analytics';
import { businessTeamSettingsDoc } from './business/team-settings';
import { verificationOverviewDoc } from './verification/overview';
import { verificationQrDoc } from './verification/qr-verification';
import { verificationStatesDoc } from './verification/verification-states';
import { apiAuthDoc } from './api/authentication';
import { apiAppsDoc } from './api/apps-api';
import { apiVerificationDoc } from './api/verification-api';
import { apiConsentDoc } from './api/consent-api';
import { apiWebhooksDoc } from './api/webhooks-api';
import { apiErrorsDoc } from './api/errors';
import { guideWebIntegrationDoc } from './guides/web-integration';
import { guideWebhookSignaturesDoc } from './guides/webhook-signatures';
import { guideSandboxTestingDoc } from './guides/sandbox-testing';

export const allDocs: DocPage[] = [
  introductionDoc,
  architectureDoc,
  businessQuickstartDoc,
  businessApplicationsDoc,
  businessApiKeysDoc,
  businessOAuthAppsDoc,
  businessWebhooksDoc,
  businessAnalyticsDoc,
  businessTeamSettingsDoc,
  verificationOverviewDoc,
  verificationQrDoc,
  verificationStatesDoc,
  apiAuthDoc,
  apiAppsDoc,
  apiVerificationDoc,
  apiConsentDoc,
  apiWebhooksDoc,
  apiErrorsDoc,
  guideWebIntegrationDoc,
  guideWebhookSignaturesDoc,
  guideSandboxTestingDoc,
];

export function getDocBySlug(slugArray: string[]): DocPage | undefined {
  const targetPath = slugArray.join('/');
  return allDocs.find((doc) => doc.slug.join('/') === targetPath);
}

export function getAdjacentDocs(currentSlug: string[]): {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
} {
  const currentIndex = allDocs.findIndex(
    (doc) => doc.slug.join('/') === currentSlug.join('/')
  );
  if (currentIndex === -1) return {};

  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : undefined;
  const nextDoc =
    currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : undefined;

  return {
    prev: prevDoc
      ? { title: prevDoc.title, href: `/${prevDoc.slug.join('/')}` }
      : undefined,
    next: nextDoc
      ? { title: nextDoc.title, href: `/${nextDoc.slug.join('/')}` }
      : undefined,
  };
}
