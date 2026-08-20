# SyncNexa Docs — Roadmap & Future To-Dos

This document tracks upcoming features, enhancements, and integrations planned for the SyncNexa documentation platform (`docs.syncnexa.co`).

---

## 📋 Backlog & Future Tasks

### 1. Feedback Telemetry & Remote Storage
- [ ] **Create `/api/feedback` Serverless Endpoint**:
  - Receive `{ pagePath, vote: 'yes' | 'no', reason, comment, timestamp }` from `FeedbackWidget.tsx`.
  - Store feedback in PostgreSQL / Redis database with timestamp and page metadata.
  - Option to route negative feedback or user suggestions directly to a dedicated Slack/Discord `#docs-feedback` webhook.
  - Track positive/negative satisfaction scores per documentation section.

### 2. Interactive API Request Playground
- [ ] Add an interactive "Try it out" HTTP tester inside API reference pages allowing developers to input their `sk_test_` key and execute sandbox requests directly from the docs.

### 3. Public SDKs & Libraries Release
- [ ] Add the SDKs & Libraries documentation section once the JavaScript/TypeScript, React, Flutter, and Python SDKs are published for public consumption.

### 4. Search Analytics
- [ ] Collect search query analytics (popular searches, queries with 0 results) to identify missing topics or ambiguous terminology.

### 5. Multi-Language / Internationalization (i18n)
- [ ] Support localization for international university and business partners if needed.
