import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import ModuleRenderer from "@/components/cms/ModuleRenderer";

import Hero from "@/components/Hero";
import CurrentExperiments from "@/components/CurrentExperiments";
import SystemsGrowthArchitecture from "@/components/SystemsGrowthArchitecture";
import ResearchSystems from "@/components/ResearchSystems";
import FounderECell from "@/components/FounderECell";
import LabNotesPreview from "@/components/LabNotesPreview";

export const revalidate = 60;

export default async function Home() {
  const { data } = await sanityFetch({ query: HOMEPAGE_QUERY });
  const page = data as any;

  // If we have CMS modules, render them dynamically
  if (page?.modules && page.modules.length > 0) {
    return (
      <div className="relative">
        <ModuleRenderer modules={page.modules} />
      </div>
    );
  }

  // Fallback to the original hardcoded layout if no CMS data exists
  return (
    <div className="relative">
      {/* SECTION 1: Cinematic Hero Environment */}
      <Hero />
      
      {/* SECTION 2: Current Experiments */}
      <CurrentExperiments />
      
      {/* SECTION 3: Systems Growth Architecture & Certifications */}
      <SystemsGrowthArchitecture />
      
      {/* SECTION 4: Research & Systems */}
      <ResearchSystems />
      
      {/* SECTION 5: Founder & E-Cell */}
      <FounderECell />
      
      {/* SECTION 6: Lab Notes */}
      <LabNotesPreview />
    </div>
  );
}