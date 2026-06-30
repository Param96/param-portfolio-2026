import BlogList from "@/components/BlogList";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_BLOGS_QUERY } from "@/sanity/lib/queries";
import { BlogHero } from "@/components/hero/meadow/ClientHeroes";

export const revalidate = 60; // revalidate every minute

export default async function BlogPage() {
  const { data } = await sanityFetch({ query: ALL_BLOGS_QUERY });
  const articles = data as any[];

  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
  const remainingArticles = articles.filter(a => a._id !== featuredArticle?._id);

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] transition-colors duration-1000 ease-in-out">
      {/* 3D Immersive Hero with Featured Article */}
      <BlogHero featuredArticle={featuredArticle} />

      {/* Dynamic Editorial Typography List from Sanity with Filters */}
      <BlogList articles={remainingArticles} />
    </div>
  );
}
