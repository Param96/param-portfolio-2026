import { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { defineQuery } from 'next-sanity';

const SITEMAP_QUERY = defineQuery(`{
  "blogs": *[_type == "blog"] { "slug": slug.current, "_updatedAt": _updatedAt },
  "projects": *[_type == "project"] { "slug": slug.current, "_updatedAt": _updatedAt },
  "research": *[_type == "research"] { "slug": slug.current, "_updatedAt": _updatedAt },
  "notes": *[_type == "labNote"] { "slug": slug.current, "_updatedAt": _updatedAt }
}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://parampatel.in';

  const { data } = await sanityFetch({ query: SITEMAP_QUERY });
  const { blogs, projects, research, notes } = data as any;

  const staticRoutes = [
    '',
    '/projects',
    '/research',
    '/blog',
    '/ai-lab',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const dynamicRoutes = [
    ...(blogs || []).map((b: any) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b._updatedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(projects || []).map((p: any) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(p._updatedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(research || []).map((r: any) => ({
      url: `${baseUrl}/research/${r.slug}`,
      lastModified: new Date(r._updatedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(notes || []).map((n: any) => ({
      url: `${baseUrl}/notes/${n.slug}`,
      lastModified: new Date(n._updatedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
