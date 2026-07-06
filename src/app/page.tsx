import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import ModuleRenderer from "@/components/cms/ModuleRenderer";

import TheClearingHero from "@/components/hero/TheClearingHero";
import FounderIntro from "@/components/FounderIntro";
import CurrentExperiments from "@/components/CurrentExperiments";
import SystemsGrowthArchitecture from "@/components/SystemsGrowthArchitecture";
import ResearchSystems from "@/components/ResearchSystems";
import FounderECell from "@/components/FounderECell";
import LabNotesPreview from "@/components/LabNotesPreview";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export const revalidate = 60;

export default async function Home() {
  const { data } = await sanityFetch({ query: HOMEPAGE_QUERY });
  const page = data as any;

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Param Patel",
    "url": "https://parampatel.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://parampatel.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // If we have CMS modules, render them dynamically
  if (page?.modules && page.modules.length > 0) {
    return (
      <div className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ModuleRenderer modules={page.modules} />
      </div>
    );
  }

  // Fallback to the original hardcoded layout if no CMS data exists
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* HERO SECTION */}
      <TheClearingHero />
      
      {/* SECTION 2: Founder Intro */}
      <FounderIntro />
      
      {/* SECTION 3: Current Experiments */}
      <CurrentExperiments />

      {/* SECTION 4: Systems Growth Architecture & Certifications */}
      <SystemsGrowthArchitecture />
      
      {/* SECTION 6: Research & Systems */}
      <ResearchSystems />
      
      {/* SECTION 7: Founder & E-Cell */}
      <FounderECell />
      
      {/* SECTION 8: Lab Notes */}
      <LabNotesPreview />
    </div>
  );
}