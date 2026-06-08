import { sanityFetch } from "@/sanity/lib/live";
import { LAB_NOTE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ArrowLeft, FlaskConical, GitCommit, Settings, TerminalSquare } from "lucide-react";

export const revalidate = 60;

export default async function LabNoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: rawData } = await sanityFetch({ 
    query: LAB_NOTE_BY_SLUG_QUERY, 
    params: { slug: resolvedParams.slug } 
  });
  const note = rawData as any;

  if (!note) {
    notFound();
  }

  const dateStr = note.publishedAt 
    ? new Date(note.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : "Draft";

  return (
    <div className="relative min-h-screen bg-[#FAEDCD] text-[#2F3E46] pt-32 pb-40 selection:bg-[#D4A373] selection:text-[#FEFAE0]">
      {/* Background visual */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E9EDC9]/50 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#CCD5AE]/30 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <article className="max-w-3xl mx-auto px-6 relative z-10">
        
        <Link 
          href="/lab-notes" 
          className="inline-flex items-center gap-2 text-[#84A98C] hover:text-[#52796F] transition-colors font-bold uppercase tracking-widest text-xs mb-16"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lab Feed
        </Link>

        {/* Header */}
        <header className="mb-16 border-b border-[#354F52]/10 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#84A98C] flex items-center gap-2">
              <FlaskConical className="w-4 h-4" /> Raw Snapshot
            </span>
            <span className="text-[#354F52]/30">•</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#354F52]/60">
              {dateStr}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#2F3E46] leading-[1.1] mb-6">
            {note.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-6">
            {note.tags?.map((tag: string, i: number) => (
              <span key={i} className="text-[10px] uppercase font-bold text-[#84A98C] bg-[#84A98C]/10 px-2 py-1 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Technical Data Context (Simulated UI) */}
        <div className="bg-[#FEFAE0] border border-[#354F52]/10 rounded-md p-6 mb-16 shadow-inner font-jetbrains text-xs text-[#52796F]">
          <div className="flex items-center justify-between mb-4 border-b border-[#354F52]/5 pb-2">
            <div className="flex items-center gap-2 text-[#354F52]">
              <TerminalSquare className="w-4 h-4" /> Context Parameters
            </div>
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4" /> Rev {note._id?.slice(-6)}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="opacity-50 block mb-1">State</span>
              <span className="font-bold text-[#D4A373]">UNFINISHED</span>
            </div>
            <div>
              <span className="opacity-50 block mb-1">Type</span>
              <span className="font-bold text-[#2F3E46]">ENGINEERING_LOG</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-p:text-[#354F52] prose-headings:text-[#2F3E46] prose-a:text-[#84A98C] prose-li:text-[#354F52] max-w-none">
          {note.content ? (
            <PortableText value={note.content} />
          ) : (
            <p className="text-center italic text-[#354F52]/50">No raw logs available.</p>
          )}
        </div>
      </article>
    </div>
  );
}
