# SyncNexa Documentation (`docs.syncnexa.co`)

The official developer documentation and API reference platform for [SyncNexa](https://syncnexa.co), built with Next.js 16 (App Router), TypeScript, and `@syncnexa-library/ui`.

---

## 🚀 Key Features

- **Public Portals Coverage**: Full guides and API references for the **SyncID Business Portal** (`business.syncnexa.co`) and the **Verification Portal** (`portal.syncnexa.co`).
- **Design System**: Built with `@syncnexa-library/ui` (`SnButton`, `SnCodeBlock`) and SyncNexa brand tokens (`#04d69d`, `#ffaa01`, `#05241d`, `#0d1117`).
- **Instant Search (`⌘K` / `Ctrl+K`)**: Client-side fuzzy search with category filtering, snippet preview, and full keyboard navigation.
- **Code Snippets & Multi-Tabs**: Syntax-highlighted code blocks with line numbers, copy buttons, and multi-language tabs (cURL, TypeScript/Node.js, Python).
- **Interactive API Reference**: Method badges (`GET`, `POST`, `DELETE`), parameter tables, authentication tags, and error codes.
- **Light & Dark Themes**: System-aware and persistent theme switcher.
- **Feedback System**: Interactive "Was this page helpful?" widget with reason tagging and client-side persistence.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 📁 Architecture & Structure

```
src/
├── app/                      # Next.js 16 App Router
│   ├── [...slug]/            # Dynamic doc pages router
│   ├── page.tsx              # Docs landing hub
│   ├── layout.tsx            # Global layout & SEO metadata
│   ├── globals.css           # Brand tokens & theme rules
│   ├── sitemap.ts            # Dynamic XML sitemap
│   └── robots.ts             # Search engine crawling rules
│
├── components/
│   ├── docs/                 # CodeBlock, CodeTabs, Callout, ApiEndpoint, ParamTable, FeedbackWidget
│   ├── layout/               # Header, Sidebar, TableOfContents, Footer, DocsLayout
│   └── search/               # SearchModal with instant fuzzy matching
│
├── data/
│   ├── navigation.ts         # Hierarchical navigation definition
│   └── docs/                 # Structured documentation content across all 21 pages
│
├── lib/
│   └── search.ts             # Search indexing and query runner
│
└── types/
    └── docs.ts               # TypeScript schemas for docs, endpoints, and search
```

---

## 📋 Future Roadmap & To-Dos

See [`TODO.md`](./TODO.md) for tracked backlog items, including remote storage / webhook routing for the `/api/feedback` endpoint.
