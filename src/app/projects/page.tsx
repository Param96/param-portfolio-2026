import ProjectsHero3D from "@/components/ProjectsHero3D";
import ProjectList from "@/components/ProjectList";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({ query: ALL_PROJECTS_QUERY });

  return (
    <div className="relative min-h-screen bg-[#FEFAE0]">
      {/* 3D Immersive Hero */}
      <ProjectsHero3D />

      {/* Dynamic Projects from Sanity */}
      <ProjectList projects={projects} />
    </div>
  );
}
