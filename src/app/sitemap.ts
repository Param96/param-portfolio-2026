import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { SITEMAP_QUERY } from '@/sanity/lib/queries';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 60;

type SitemapDocument = { type: 'blog' | 'research'; slug: string; _updatedAt?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Never inherit the editor's draft perspective or stega annotations.
  // Fail on CMS errors rather than silently caching an incomplete sitemap.
  const documents = await client.fetch<SitemapDocument[]>(SITEMAP_QUERY, {}, {
    perspective: 'published',
    stega: false,
    useCdn: false,
    next: { revalidate },
  });

  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/research', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { route: '/ai-lab', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const dynamicRoutes = documents
    .filter((document) => /^[a-zA-Z0-9_-]+$/.test(document.slug))
    .map((document) => ({
      url: `${baseUrl}/${document.type}/${document.slug}`,
      ...(document._updatedAt && Number.isFinite(Date.parse(document._updatedAt))
        ? { lastModified: new Date(document._updatedAt).toISOString() }
        : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return Array.from(new Map([...staticRoutes, ...dynamicRoutes].map((entry) => [entry.url, entry])).values());
}
