import Hero from "@/components/Hero";
import CurrentExperiments from "@/components/CurrentExperiments";
import SystemsGrowthArchitecture from "@/components/SystemsGrowthArchitecture";
import ResearchSystems from "@/components/ResearchSystems";
import FounderECell from "@/components/FounderECell";
import LabNotesPreview from "@/components/LabNotesPreview";

export default function Home() {
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
      
      {/* SECTION 4: Founder & E-Cell */}
      <FounderECell />
      
      {/* SECTION 5: Lab Notes */}
      <LabNotesPreview />

      {/* SECTION 6: Final Scene CTA is handled by the Footer in layout.tsx */}
      
    </div>
  );
}