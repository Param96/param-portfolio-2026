import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: 's7eiv5mh',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function generateSitemap() {
  const baseUrl = "https://parampatel.in";

  const data = await client.fetch(`{
    "blogs": *[_type == "blog" && defined(slug.current)][].slug.current,
    "projects": *[_type == "project" && defined(slug.current)][].slug.current,
    "research": *[_type == "research" && defined(slug.current)][].slug.current,
    "notes": *[_type == "labNote" && defined(slug.current)][].slug.current,
    "pages": *[_type == "page" && defined(slug.current)][].slug.current
  }`);

  const blogs = (data.blogs || []).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    changefreq: 'weekly',
    priority: 0.8,
  }));

  const projects = (data.projects || []).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    changefreq: 'monthly',
    priority: 0.9,
  }));

  const research = (data.research || []).map((slug) => ({
    url: `${baseUrl}/research/${slug}`,
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const notes = (data.notes || []).map((slug) => ({
    url: `${baseUrl}/notes/${slug}`,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const pages = (data.pages || []).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const staticRoutes = [
    "",
    "/about",
    "/ai-lab",
    "/blog",
    "/projects",
    "/research",
    "/notes",
    "/resume",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changefreq: 'daily',
    priority: route === "" ? 1.0 : 0.9,
  }));

  const allUrls = [...staticRoutes, ...blogs, ...projects, ...research, ...notes, ...pages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
  console.log('Successfully generated public/sitemap.xml');
}

generateSitemap().catch(console.error);
