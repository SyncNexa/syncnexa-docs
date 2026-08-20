import { MetadataRoute } from 'next';
import { allDocs } from '@/data/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://docs.syncnexa.co';

  const docEntries: MetadataRoute.Sitemap = allDocs.map((doc) => ({
    url: `${baseUrl}/${doc.slug.join('/')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...docEntries,
  ];
}
