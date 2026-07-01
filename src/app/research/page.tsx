import { sanityFetch } from "@/sanity/lib/live";
import { RESEARCH_PAGE_QUERY } from "@/sanity/lib/queries";
import ResearchClientUI from "./ResearchClientUI";
import { ResearchHero } from "@/components/hero/meadow/ClientHeroes";

export const revalidate = 60;

export default async function CinematicResearchPage() {
  const { data } = await sanityFetch({ query: RESEARCH_PAGE_QUERY });
  const fallbackContent = {
    roleTitle: 'Lead — Data Analysis & Verification Team',
    roleDescription: 'Tasked with designing and structuring verification workflows to process vast amounts of unstructured cybersecurity educational data. I lead the Data Analysis & Verification Team, focusing heavily on building automated pipelines to extract, route, and validate intelligence.',
    node1: {
      title: 'Structured Intelligence Systems',
      subtitle: 'Automated web extraction pipelines and PDF verification workflows converting raw text into scalable datasets.',
      content: 'When dealing with thousands of unverified cybersecurity courses across multiple global platforms, manual curation fails at scale.\n\nI architected an automated extraction pipeline utilizing headless browsers and PDF parsing to constantly ingest raw educational metadata. The result is a continuously updated, fully structured intelligence database organized by core cybersecurity domains.',
      stat1Value: '14+',
      stat1Label: 'Global Platforms',
      stat2Value: '100k+',
      stat2Label: 'Nodes Validated'
    },
    node2: {
      title: 'AI-Assisted Validation',
      subtitle: 'Engineering XGBoost models and agentic workflows to validate course metadata and assess technical depth.',
      content: 'Once structured intelligence is ingested, it must be validated for accuracy, relevance, and technical depth before being exposed to the educational platform.\n\nI engineered an XGBoost-based confidence model capable of programmatically assessing course metadata against established cybersecurity baselines, saving hundreds of hours of manual curation.',
      confidenceScore: 'Confidence Score: 98.4%',
      feature1Label: 'XGBoost Framework',
      feature2Label: 'Automated Routing'
    }
  };

  const content = data || fallbackContent;
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] overflow-x-hidden selection:bg-[var(--amber)] selection:text-bg-main font-inter transition-colors duration-1000 ease-in-out">
      
      {/* 3D Hero Section */}
      <div className="absolute inset-x-0 top-0 h-[120vh] pointer-events-none z-0">
        <ResearchHero />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24 pb-40">
        {content && <ResearchClientUI content={content} />}
      </div>
    </div>
  );
}
