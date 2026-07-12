import { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { defineQuery } from 'next-sanity';

const SITEMAP_QUERY = defineQuery(`{
  "blogs": *[_type == "blog"] { "slug": slug.current, "_updatedAt": _updatedAt },
  "research": *[_type == "research"] { "slug": slug.current, "_updatedAt": _updatedAt }
}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.parampatel.in';

  const { data } = await sanityFetch({ query: SITEMAP_QUERY });
  const { blogs, research } = data as any;

  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/research', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { route: '/ai-lab', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const dynamicRoutes = [
    ...(blogs || []).map((b: any) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b._updatedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(research || []).map((r: any) => ({
      url: `${baseUrl}/research/${r.slug}`,
      lastModified: new Date(r._updatedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
