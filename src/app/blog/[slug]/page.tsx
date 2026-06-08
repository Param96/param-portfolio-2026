import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_BY_SLUG_QUERY, ALL_BLOGS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Share2, Bookmark } from "lucide-react";
import BlogProgressBar from "@/components/BlogProgressBar";

export const revalidate = 60;

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

  // Fetch some recent articles for "Related" section
  const { data: allData } = await sanityFetch({ query: ALL_BLOGS_QUERY });
  const relatedArticles = (allData as any[]).filter(a => a._id !== article._id).slice(0, 2);

  const dateStr = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : "Draft";

  return (
    <div className="min-h-screen bg-[#F6F1E3] pt-32 pb-40 selection:bg-[#D4A373] selection:text-[#111]">
      <BlogProgressBar />

      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A373]/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT SIDEBAR (Sticky Metadata / Actions) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-40 flex flex-col gap-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[#84A98C] hover:text-[#52796F] transition-colors font-bold uppercase tracking-widest text-[10px]"
            >
              <ArrowLeft className="w-3 h-3" />
              Editorial Hub
            </Link>
            
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

            <div className="pt-8 border-t border-[#2F3E46]/10 flex gap-4">
              <button className="w-10 h-10 rounded-full border border-[#2F3E46]/20 flex items-center justify-center text-[#2F3E46]/50 hover:bg-[#2F3E46]/5 hover:text-[#2F3E46] transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#2F3E46]/20 flex items-center justify-center text-[#2F3E46]/50 hover:bg-[#2F3E46]/5 hover:text-[#2F3E46] transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <article className="lg:col-span-9 max-w-3xl">
          
          {/* Mobile Back Button */}
          <Link 
            href="/blog" 
            className="lg:hidden inline-flex items-center gap-2 text-[#84A98C] hover:text-[#52796F] transition-colors font-bold uppercase tracking-widest text-[10px] mb-12"
          >
            <ArrowLeft className="w-3 h-3" />
            Editorial Hub
          </Link>

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
