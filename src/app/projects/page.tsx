import ProjectsHero3D from "@/components/ProjectsHero3D";
import EvolvingSystemsList from "@/components/EvolvingSystemsList";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ProjectsPage() {
  const { data } = await sanityFetch({ query: ALL_PROJECTS_QUERY });
  const projects = data as any;

  return (
    <div className="relative min-h-screen bg-[#E9EDC9] text-[#2F3E46] overflow-hidden selection:bg-[#D4A373] selection:text-[#FEFAE0] font-sans">
      {/* 3D Immersive Hero */}
      <ProjectsHero3D />

      {/* Dynamic Cinematic Projects from Sanity */}
      <EvolvingSystemsList projects={projects} />
    </div>
  );
}
