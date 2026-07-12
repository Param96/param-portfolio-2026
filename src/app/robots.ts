import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/sign-in/', '/sign-up/', '/studio/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/sign-in/', '/sign-up/', '/studio/'],
      },
    ],
    sitemap: 'https://www.parampatel.in/sitemap.xml',
  };
}
