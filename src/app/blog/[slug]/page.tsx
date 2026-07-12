import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_BY_SLUG_QUERY, ALL_BLOGS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlogProgressBar from "@/components/BlogProgressBar";
import ReadershipTracker from "@/components/analytics/ReadershipTracker";
import BlogArticleActions from "@/components/blog/BlogArticleActions";
import { getPostHogClient } from "@/lib/posthog-server";
import { Metadata } from "next";
import { generateBlogPostingJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { data } = await sanityFetch({
    query: BLOG_BY_SLUG_QUERY,
    params: { slug: resolvedParams.slug }
  });
  const article = data as any;

  if (!article) return { title: 'Not Found' };

  return {
    title: article.title,
    description: article.summary || `Read ${article.title}`,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${article.title} | Param Patel`,
      description: article.summary || `Read ${article.title}`,
      url: `/blog/${resolvedParams.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["Param Patel"],
      // fallback to layout's og-image if article doesn't have one
    },
    twitter: {
      title: `${article.title} | Param Patel`,
      description: article.summary || `Read ${article.title}`,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data } = await sanityFetch({
    query: BLOG_BY_SLUG_QUERY,
    params: { slug: resolvedParams.slug }
  });
  const article = data as any;

  if (!article) {
    notFound();
  }

  // Track article view server-side for a reliable count
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: "anonymous",
    event: "article_viewed",
    properties: {
      article_id: article._id,
      article_title: article.title,
      article_type: "blog",
      article_slug: resolvedParams.slug,
      article_category: article.category,
    },
  });

  // Fetch some recent articles for "Related" section
  const { data: allData } = await sanityFetch({ query: ALL_BLOGS_QUERY });
  const relatedArticles = (allData as any[]).filter(a => a._id !== article._id).slice(0, 2);

  const dateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : "Draft";

  const blogJsonLd = generateBlogPostingJsonLd({
    title: article.title,
    summary: article.summary,
    publishedAt: article.publishedAt,
    updatedAt: article._updatedAt,
    slug: resolvedParams.slug,
    // Add coverImageUrl if present in Sanity schema
    // coverImageUrl: article.coverImage?.asset?.url,
  });

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: article.title, href: `/blog/${resolvedParams.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-[#F6F1E3] pt-32 pb-40 selection:bg-[#D4A373] selection:text-[#111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogJsonLd, breadcrumbsJsonLd]) }}
      />
      <BlogProgressBar />
      <ReadershipTracker articleId={article._id} articleType="blog" />

      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A373]/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* LEFT SIDEBAR (Sticky Metadata / Actions) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-40 flex flex-col gap-8">
            <Breadcrumbs 
              items={[
                { name: "Home", href: "/" },
                { name: "Editorial Hub", href: "/blog" },
                { name: "Article", href: `/blog/${resolvedParams.slug}` }
              ]}
            />

            <div className="pt-8 border-t border-[#2F3E46]/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F3E46]/40 block mb-4">Metadata</span>
              <ul className="space-y-4">
                <li>
                  <span className="block text-[10px] text-[#2F3E46]/50 uppercase">Published</span>
                  <span className="text-sm text-[#2F3E46] font-medium">{dateStr}</span>
                </li>
                <li>
                  <span className="block text-[10px] text-[#2F3E46]/50 uppercase">Category</span>
                  <span className="text-sm text-[#2F3E46] font-medium">{article.category || "Uncategorized"}</span>
                </li>
                {article.readingTime && (
                  <li>
                    <span className="block text-[10px] text-[#2F3E46]/50 uppercase">Reading Time</span>
                    <span className="text-sm text-[#2F3E46] font-medium">{article.readingTime} min</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="pt-8 border-t border-[#2F3E46]/10">
              <BlogArticleActions articleId={article._id} articleTitle={article.title} />
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <article className="lg:col-span-9 max-w-3xl">

          {/* Mobile Back Button / Breadcrumb */}
          <div className="lg:hidden mb-12">
            <Breadcrumbs 
              items={[
                { name: "Home", href: "/" },
                { name: "Editorial", href: "/blog" },
                { name: "Article", href: `/blog/${resolvedParams.slug}` }
              ]}
            />
          </div>

          {/* Header */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter text-[#2F3E46] leading-[1.05] mb-8">
              {article.title}
            </h1>
            {article.summary && (
              <p className="text-xl md:text-2xl text-[#52796F] font-medium leading-relaxed border-l-2 border-[#84A98C] pl-6 md:pl-8">
                {article.summary}
              </p>
            )}

            {/* Mobile Metadata */}
            <div className="lg:hidden flex flex-wrap gap-4 mt-8 pt-8 border-t border-[#2F3E46]/10 text-[10px] font-bold uppercase tracking-widest text-[#2F3E46]/50">
              <span>{dateStr}</span>
              <span>•</span>
              <span>{article.category || "Uncategorized"}</span>
              {article.readingTime && (
                <>
                  <span>•</span>
                  <span>{article.readingTime} min</span>
                </>
              )}
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg md:prose-xl prose-p:text-[#354F52] prose-headings:text-[#2F3E46] prose-headings:font-light prose-headings:tracking-tight prose-a:text-[#84A98C] prose-li:text-[#354F52] max-w-none">
            {article.content ? (
              <PortableText value={article.content} />
            ) : (
              <p className="text-center italic text-[#2F3E46]/40 py-20 border border-[#2F3E46]/10">No content available for this article.</p>
            )}
          </div>

          {/* Related Articles Footer */}
          {relatedArticles.length > 0 && (
            <footer className="mt-32 pt-16 border-t border-[#2F3E46]/10">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#84A98C] mb-8 block">
                Continue Reading
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map(rel => (
                  <Link
                    key={rel._id}
                    href={`/blog/${rel.slug}`}
                    className="group block p-8 bg-[#FEFAE0] border border-[#2F3E46]/5 hover:shadow-xl transition-all duration-500"
                  >
                    <span className="text-[10px] uppercase text-[#2F3E46]/40 block mb-3">{rel.category || "Article"}</span>
                    <h3 className="text-2xl font-medium text-[#2F3E46] mb-4 group-hover:text-[#52796F] transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#84A98C]">
                      Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </footer>
          )}

        </article>
      </div>
    </div>
  );
}
