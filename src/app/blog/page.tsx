import BlogHero3D from "@/components/BlogHero3D";
import BlogList from "@/components/BlogList";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_BLOGS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60; // revalidate every minute

export default async function BlogPage() {
  const { data: articles } = await sanityFetch({ query: ALL_BLOGS_QUERY });

  return (
    <div className="relative min-h-screen bg-[#F6F1E3]">
      {/* 3D Immersive Hero */}
      <BlogHero3D />

      {/* Dynamic Editorial Typography List from Sanity */}
      <BlogList articles={articles} />
    </div>
  );
}
