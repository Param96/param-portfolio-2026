import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Match both the exact route and descendants, without blocking assets.
      disallow: [
        '/admin$', '/admin/', '/api$', '/api/', '/sign-in$', '/sign-in/',
        '/sign-up$', '/sign-up/', '/studio$', '/studio/', '/cms$', '/cms/',
        '/dashboard$', '/dashboard/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
