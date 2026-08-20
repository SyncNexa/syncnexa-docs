export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface ApiParam {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description: string;
  example?: string;
}

export interface ApiResponseField {
  name: string;
  type: string;
  description: string;
  example?: string;
}

export interface CodeSnippet {
  language: 'bash' | 'curl' | 'javascript' | 'typescript' | 'python' | 'json' | 'html';
  label: string;
  code: string;
  filename?: string;
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; id: string; text: string }
  | { type: 'callout'; variant: 'note' | 'tip' | 'important' | 'warning' | 'security'; title?: string; text: string }
  | { type: 'code'; language: string; code: string; filename?: string }
  | { type: 'code-tabs'; snippets: CodeSnippet[] }
  | { type: 'api-endpoint'; method: HttpMethod; path: string; title: string; description: string; authRequired?: boolean; scope?: string }
  | { type: 'param-table'; title?: string; parameters: ApiParam[] }
  | { type: 'response-table'; title?: string; fields: ApiResponseField[] }
  | { type: 'card-grid'; cards: { title: string; description: string; href: string; icon?: string; badge?: string }[] }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'steps'; steps: { title: string; content: string; codeSnippet?: CodeSnippet }[] };

export interface DocPage {
  slug: string[];
  title: string;
  description: string;
  section: string;
  lastUpdated?: string;
  badge?: string;
  toc: TocItem[];
  content: ContentBlock[];
}

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  method?: HttpMethod;
  isExternal?: boolean;
}

export interface NavSection {
  title: string;
  icon?: string;
  items: NavItem[];
}

export interface SearchResult {
  title: string;
  description: string;
  section: string;
  href: string;
  matchSnippet?: string;
}
