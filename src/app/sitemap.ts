import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://parampatel.com";

  // Fetch all dynamic slugs
  const data = await client.fetch(groq`{
    "blogs": *[_type == "blog" && defined(slug.current)][].slug.current,
    "projects": *[_type == "project" && defined(slug.current)][].slug.current,
    "research": *[_type == "research" && defined(slug.current)][].slug.current,
    "labNotes": *[_type == "labNote" && defined(slug.current)][].slug.current,
    "pages": *[_type == "page" && defined(slug.current)][].slug.current
  }`);

  const blogs = (data.blogs || []).map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projects = (data.projects || []).map((slug: string) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const research = (data.research || []).map((slug: string) => ({
    url: `${baseUrl}/research/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const labNotes = (data.labNotes || []).map((slug: string) => ({
    url: `${baseUrl}/lab-notes/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const pages = (data.pages || []).map((slug: string) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const routes = [
    "",
    "/about",
    "/blog",
    "/projects",
    "/research",
    "/lab-notes",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.9,
  }));

  return [...routes, ...blogs, ...projects, ...research, ...labNotes, ...pages];
}
