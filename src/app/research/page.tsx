import { sanityFetch } from "@/sanity/lib/live";
import { ALL_RESEARCH_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { ArrowRight, Database, Workflow, ShieldCheck, Cpu } from "lucide-react";
import * as FramerMotion from "framer-motion";
import { ResearchLink } from "@/components/research/ResearchLink";

export const revalidate = 60;

export default async function CinematicResearchPage() {
  const { data } = await sanityFetch({ query: ALL_RESEARCH_QUERY });
  const researchProjects = data as any[];

  return (
    <div className="relative bg-[#E9EDC9] text-[#2F3E46] overflow-hidden selection:bg-[#D4A373] selection:text-[#FEFAE0]">
      
      {/* ========================================= */}
      {/* GLOBAL ATMOSPHERE                         */}
      {/* ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FAEDCD] opacity-40 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[#CCD5AE] opacity-30 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#84A98C] opacity-10 rounded-[100%] blur-[200px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* ========================================= */}
      {/* 1. HERO SECTION                           */}
      {/* ========================================= */}
      <section className="relative min-h-screen flex items-center pt-20 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 z-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#52796F] mb-8 block font-jetbrains">
              Academic &amp; Applied Systems
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#2F3E46] leading-[1.05] mb-8">
              Research &amp; <br />
              <span className="font-bold italic text-[#84A98C]">Verification</span> <br />
              Infrastructure.
            </h1>
            
            <p className="text-lg text-[#354F52] max-w-xl leading-relaxed mb-12">
              Working on cybersecurity educational verification systems focused on organizing and validating cybersecurity learning resources across global platforms using intelligent automation and ML-assisted workflows.
            </p>
            
            <div className="flex gap-8">
              <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F3E46] border-b border-[#2F3E46]/30 pb-1 hover:border-[#2F3E46] transition-colors flex items-center gap-2">
                Explore Research <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[600px] w-full flex justify-center items-center pointer-events-none">
            {/* Abstract Cinematic WebGL/CSS Representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full border border-[#84A98C]/20 border-dashed animate-[spin_150s_linear_infinite]" />
              <div className="absolute w-[350px] h-[350px] rounded-full border border-[#D4A373]/30 animate-[spin_100s_linear_infinite_reverse]" />
              <div className="absolute w-[200px] h-[200px] bg-[#FEFAE0]/40 rounded-full blur-2xl animate-pulse" />
              {/* Floating glass planes */}
              <div className="absolute w-[300px] h-[400px] bg-gradient-to-br from-[#FEFAE0]/40 to-transparent backdrop-blur-md border border-[#FEFAE0]/50 shadow-2xl transform rotate-x-60 -rotate-z-20" />
              <div className="absolute w-[300px] h-[400px] border border-[#84A98C]/30 transform translate-y-10 translate-x-10 rotate-x-60 -rotate-z-20" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 2. DYNAMIC RESEARCH INITIATIVES SECTION   */}
      {/* ========================================= */}
      <section className="relative py-20 z-10 flex flex-col gap-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          {(!researchProjects || researchProjects.length === 0) ? (
            <div className="text-center py-20 text-[#52796F] text-lg font-medium">
              No research projects published yet. Check back soon.
            </div>
          ) : (
            researchProjects.map((project, idx) => (
              <div key={project._id} className="relative bg-[#FEFAE0] p-12 md:p-20 shadow-[0_30px_80px_-20px_rgba(47,62,70,0.08)] border border-[#354F52]/5 overflow-hidden mb-20 group transition-all duration-700 hover:shadow-2xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FAEDCD]/50 blur-3xl -z-10 group-hover:bg-[#D4A373]/20 transition-colors duration-1000" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#CCD5AE]/30 blur-3xl -z-10 group-hover:bg-[#84A98C]/20 transition-colors duration-1000" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4A373] block font-jetbrains">
                    {project.status || "In Progress"}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {project.domains?.map((domain: string, i: number) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest text-[#84A98C] bg-[#84A98C]/10 px-3 py-1 rounded-full font-jetbrains">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-10 font-serif text-[#2F3E46] max-w-4xl leading-tight">
                  <ResearchLink
                    href={`/research/${project.slug}`}
                    research_id={project._id}
                    research_title={project.title}
                    research_slug={project.slug}
                    className="hover:text-[#52796F] transition-colors"
                  >
                    {project.title}
                  </ResearchLink>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="prose prose-p:text-[#354F52] prose-p:leading-relaxed prose-lg">
                    <p>{project.description || "No description provided."}</p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="mb-8">
                      <p className="text-sm font-bold uppercase tracking-widest text-[#84A98C] mb-6 font-jetbrains">
                        System & Architecture
                      </p>
                      <div className="flex items-center gap-4 text-[#354F52]">
                        <span className="text-[#D4A373]"><Workflow className="w-5 h-5" /></span>
                        View Detailed Architecture
                      </div>
                    </div>
                    <div>
                      <ResearchLink
                        href={`/research/${project.slug}`}
                        research_id={project._id}
                        research_title={project.title}
                        research_slug={project.slug}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2F3E46] border-b border-[#2F3E46]/30 pb-2 hover:border-[#2F3E46] transition-colors"
                      >
                        Read Full Research <ArrowRight className="w-4 h-4" />
                      </ResearchLink>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
