import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'], // Disallow Sanity Studio route if any
    },
    sitemap: 'https://parampatel.in/sitemap.xml',
  };
}
