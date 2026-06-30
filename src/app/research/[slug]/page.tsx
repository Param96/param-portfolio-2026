import { sanityFetch } from "@/sanity/lib/live";
import { RESEARCH_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ArrowLeft, Cpu, Workflow, ShieldCheck, Database } from "lucide-react";
import ReadershipTracker from "@/components/analytics/ReadershipTracker";
import { getPostHogClient } from "@/lib/posthog-server";

export const revalidate = 60;

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: rawData } = await sanityFetch({ 
    query: RESEARCH_BY_SLUG_QUERY, 
    params: { slug: resolvedParams.slug } 
  });
  const research = rawData as any;

  if (!research) {
    notFound();
  }

  // Track research view server-side for a reliable count
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: "anonymous",
    event: "article_viewed",
    properties: {
      article_id: research._id,
      article_title: research.title,
      article_type: "research",
      article_slug: resolvedParams.slug,
    },
  });

  return (
    <div className="relative min-h-screen bg-[#E9EDC9] text-[#2F3E46] pt-32 pb-40 overflow-hidden selection:bg-[#D4A373] selection:text-[#FEFAE0]">
      <ReadershipTracker articleId={research._id} articleType="research" />
      {/* Global Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FAEDCD] opacity-40 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#84A98C] opacity-10 rounded-[100%] blur-[200px]" />
      </div>

      <article className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back Button */}
        <Link 
          href="/research" 
          className="inline-flex items-center gap-2 text-[#84A98C] hover:text-[#52796F] transition-colors font-bold uppercase tracking-widest text-xs mb-16"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Research Index
        </Link>

        {/* Header */}
        <header className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4A373] bg-[#FEFAE0] px-4 py-2 border border-[#FAEDCD] shadow-sm">
              {research.status || "In Progress"}
            </span>
            <div className="flex gap-2 flex-wrap">
              {research.domains?.map((domain: string, i: number) => (
                <span key={i} className="text-[10px] uppercase tracking-widest text-[#52796F] font-inter border-b border-[#52796F]/20 pb-1">
                  {domain}
                </span>
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#2F3E46] leading-[1.05] mb-8 font-serif">
            {research.title}
          </h1>

          <p className="text-xl text-[#354F52] leading-relaxed max-w-2xl">
            {research.description}
          </p>
        </header>

        {/* Meta / Role Block */}
        <div className="bg-[#FEFAE0] border border-[#354F52]/5 p-8 md:p-12 mb-20 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A373]/10 blur-2xl" />
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#84A98C] mb-6 flex items-center gap-2 font-inter">
            <Database className="w-4 h-4" /> Project Metadata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#2F3E46]/50 mb-2">Role</p>
              <p className="text-[#354F52] font-medium">{research.role || "Lead Researcher"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#2F3E46]/50 mb-2">Institution / Partner</p>
              <p className="text-[#354F52] font-medium">{research.institution || "Independent"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-widest text-[#2F3E46]/50 mb-2">Key Contributions</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {research.contributions?.map((c: string, i: number) => (
                  <span key={i} className="bg-[#84A98C]/10 text-[#52796F] px-3 py-1 text-sm rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-p:text-[#354F52] prose-headings:text-[#2F3E46] prose-headings:font-serif prose-a:text-[#84A98C] prose-li:text-[#354F52] max-w-none">
          {research.content ? (
            <PortableText value={research.content} />
          ) : (
            <div className="text-center py-20 text-[#52796F]/50 italic">
              Detailed technical writeup is being finalized.
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
