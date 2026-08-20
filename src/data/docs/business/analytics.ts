import { DocPage } from '@/types/docs';

export const businessAnalyticsDoc: DocPage = {
  slug: ['business', 'analytics'],
  title: 'Usage & Analytics',
  description: 'Monitor real-time verification metrics, success rates, latency distributions, and quota usage in the SyncID Business Portal.',
  section: 'SyncID Business Portal',
  lastUpdated: 'August 2026',
  badge: 'v1.0',
  toc: [
    { id: 'telemetry-metrics', title: 'Core Telemetry Metrics', level: 2 },
    { id: 'verification-charts', title: 'Interactive Trend Charts', level: 2 },
    { id: 'quota-tracking', title: 'Plan Quotas & Usage Limits', level: 2 },
    { id: 'audit-logs', title: 'Detailed Event Logs', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      text: 'The **Analytics** dashboard in the Business Portal provides deep visibility into your student verification pipeline, real-time volume trends, error breakdowns, and monthly quota utilization.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'telemetry-metrics',
      text: 'Core Telemetry Metrics',
    },
    {
      type: 'paragraph',
      text: 'Four primary metric cards are displayed at the top of your Analytics dashboard:',
    },
    {
      type: 'table',
      headers: ['Metric', 'Description', 'Target Benchmark'],
      rows: [
        ['Total Verifications', 'Cumulative verification sessions created across all active apps', 'Monitors overall scale and adoption'],
        ['Success Pass Rate', 'Percentage of initiated verification sessions successfully confirmed', '> 94% under normal operation'],
        ['Average Response Latency', 'Median time required to evaluate zero-knowledge proof', '< 180 ms'],
        ['Active Integrations', 'Number of configured Applications and OAuth clients active in the last 30 days', 'Monitors fleet health'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'verification-charts',
      text: 'Interactive Trend Charts',
    },
    {
      type: 'paragraph',
      text: 'The dashboard features interactive visualizations for analyzing traffic patterns over time:',
    },
    {
      type: 'list',
      items: [
        '**Verification Volume & Velocity**: Area chart plotting hourly and daily verification volume with filterable date ranges (Last 24 Hours, 7 Days, 30 Days, 90 Days).',
        '**Status Breakdown**: Bar chart illustrating completed, expired, rejected, and rate-limited attempts.',
        '**University Distribution**: Top issuing universities whose students are redeeming offers through your platform.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      id: 'quota-tracking',
      text: 'Plan Quotas & Usage Limits',
    },
    {
      type: 'paragraph',
      text: 'The **Plan Quota Tracker** monitors your current monthly tier consumption. If your volume reaches 80% or 100% of your plan limit, warning notifications are dispatched to your team\'s billing contacts.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Sandbox Quota Exemption',
      text: 'All requests initiated using Sandbox API keys (`sk_test_...`) or in Sandbox mode are 100% free and do not count against your monthly billing quotas.',
    },
    {
      type: 'heading',
      level: 2,
      id: 'audit-logs',
      text: 'Detailed Event Logs',
    },
    {
      type: 'paragraph',
      text: 'The event log table provides an auditable history of individual verification requests, HTTP status codes, timestamp, client IP hash, and request latency.',
    },
  ],
};
