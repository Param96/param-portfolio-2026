import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: article } = await sanityFetch({ 
    query: BLOG_BY_SLUG_QUERY, 
    params: { slug: resolvedParams.slug } 
  });

  if (!article) {
    notFound();
  }

  const dateStr = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : "Draft";

  return (
    <div className="min-h-screen bg-[#F6F1E3] pt-32 pb-40">
      <article className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-[#84A98C] hover:text-[#52796F] transition-colors font-bold uppercase tracking-widest text-xs mb-16"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Editorial Hub
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#84A98C]">
              {article.category || "Uncategorized"}
            </span>
            <span className="text-[#2F3E46]/30">•</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F3E46]/40">
              {dateStr}
            </span>
            {article.readingTime && (
              <>
                <span className="text-[#2F3E46]/30">•</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F3E46]/40">
                  {article.readingTime} min read
                </span>
              </>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-[#2F3E46] leading-[1.1] mb-6">
            {article.title}
          </h1>
          {article.summary && (
            <p className="text-xl text-[#52796F] font-medium leading-relaxed border-l-2 border-[#84A98C] pl-6">
              {article.summary}
            </p>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-p:text-[#354F52] prose-headings:text-[#2F3E46] prose-headings:font-light prose-headings:tracking-tight prose-a:text-[#84A98C] prose-li:text-[#354F52] max-w-none">
          {article.content ? (
            <PortableText value={article.content} />
          ) : (
            <p className="text-center italic text-[#2F3E46]/40">No content available for this article.</p>
          )}
        </div>
      </article>
    </div>
  );
}
