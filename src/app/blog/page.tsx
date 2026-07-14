import { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_BLOGS_QUERY } from "@/sanity/lib/queries";
import { BlogHero } from "@/components/hero/meadow/ClientHeroes";

import { generateCollectionPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — AI, Engineering & Startup Insights",
  description:
    "Articles by Param Patel on artificial intelligence, machine learning, full stack engineering, agentic AI systems, and startup building.",
  alternates: {
    canonical: "https://www.parampatel.in/blog",
  },
  openGraph: {
    title: "Blog — AI, Engineering & Startup Insights | Param Patel",
    description:
      "Articles by Param Patel on artificial intelligence, machine learning, full stack engineering, agentic AI systems, and startup building.",
    url: "https://www.parampatel.in/blog",
  },
  twitter: {
    title: "Blog — AI, Engineering & Startup Insights | Param Patel",
    description:
      "Articles on AI, machine learning, engineering, and startups by Param Patel.",
  },
};

export const revalidate = 60; // revalidate every minute

export default async function BlogPage() {
  const { data } = await sanityFetch({ query: ALL_BLOGS_QUERY });
  const articles = data as any[];

  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
  const remainingArticles = articles.length > 1 
    ? articles.filter(a => a._id !== featuredArticle?._id)
    : articles;

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] transition-colors duration-1000 ease-in-out">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateCollectionPageJsonLd({
              name: "Blog — Param Patel",
              description: "Articles on artificial intelligence, machine learning, full stack engineering, and startup building.",
              url: "/blog",
            })
          ),
        }}
      />
      {/* 3D Immersive Hero with Featured Article */}
      <BlogHero featuredArticle={featuredArticle} />

      {/* Dynamic Editorial Typography List from Sanity with Filters */}
      <BlogList articles={remainingArticles} />
    </div>
  );
}
