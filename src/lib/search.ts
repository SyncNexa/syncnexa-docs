import { allDocs } from '@/data/docs';
import { SearchResult } from '@/types/docs';

export interface SearchIndexItem {
  title: string;
  description: string;
  section: string;
  href: string;
  keywords: string;
  content: string;
}

export function buildSearchIndex(): SearchIndexItem[] {
  return allDocs.map((doc) => {
    let fullText = `${doc.title} ${doc.description} ${doc.section} `;

    for (const block of doc.content) {
      if (block.type === 'paragraph') {
        fullText += `${block.text} `;
      } else if (block.type === 'heading') {
        fullText += `${block.text} `;
      } else if (block.type === 'callout') {
        fullText += `${block.title || ''} ${block.text} `;
      } else if (block.type === 'api-endpoint') {
        fullText += `${block.method} ${block.path} ${block.title} ${block.description} `;
      } else if (block.type === 'param-table') {
        fullText += block.parameters.map((p) => `${p.name} ${p.description}`).join(' ');
      }
    }

    return {
      title: doc.title,
      description: doc.description,
      section: doc.section,
      href: `/${doc.slug.join('/')}`,
      keywords: doc.slug.join(' '),
      content: fullText.toLowerCase(),
    };
  });
}

export function searchDocs(query: string, index: SearchIndexItem[]): SearchResult[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const terms = cleanQuery.split(/\s+/).filter(Boolean);
  const results: { item: SearchIndexItem; score: number; snippet?: string }[] = [];

  for (const item of index) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const hrefLower = item.href.toLowerCase();

    // Exact title match
    if (titleLower === cleanQuery) score += 100;
    else if (titleLower.includes(cleanQuery)) score += 50;

    // Term matching
    for (const term of terms) {
      if (titleLower.includes(term)) score += 20;
      if (descLower.includes(term)) score += 10;
      if (hrefLower.includes(term)) score += 15;
      if (item.keywords.includes(term)) score += 10;
      if (item.content.includes(term)) score += 5;
    }

    if (score > 0) {
      // Find snippet around matched term
      let snippet: string | undefined;
      const matchIndex = item.content.indexOf(terms[0]);
      if (matchIndex !== -1) {
        const start = Math.max(0, matchIndex - 40);
        const end = Math.min(item.content.length, matchIndex + 80);
        snippet = (start > 0 ? '...' : '') + item.content.slice(start, end).trim() + '...';
      }

      results.push({ item, score, snippet });
    }
  }

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 8).map(({ item, snippet }) => ({
    title: item.title,
    description: item.description,
    section: item.section,
    href: item.href,
    matchSnippet: snippet,
  }));
}
