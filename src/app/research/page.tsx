"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Network, Database, BrainCircuit, Layers, Workflow, CheckCircle, LayoutGrid, ChevronDown, ChevronUp } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { RESEARCH_PAGE_QUERY } from "@/sanity/lib/queries";
import dynamic from "next/dynamic";

const ResearchHero = dynamic(() => import("@/components/hero/meadow/ResearchHero"), { ssr: false });
import ResearchClientUI from "./ResearchClientUI";

export const revalidate = 60;

export default async function CinematicResearchPage() {
  const { data } = await sanityFetch({ query: RESEARCH_PAGE_QUERY });
  const content = data as any;


  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] overflow-x-hidden selection:bg-[var(--amber)] selection:text-bg-main font-inter transition-colors duration-1000 ease-in-out">
      
      {/* 3D Hero Section */}
      <ResearchHero />

      {/* Rest of the page content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24 pb-40">
        {content ? <ResearchClientUI content={content} /> : (
          <div className="text-center py-20 text-[var(--text-dim)]">Research configuration missing in Sanity.</div>
        )}
      </div>
    </div>
  );
}
