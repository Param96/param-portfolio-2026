import { Metadata } from "next";
import EvolvingSystemsList from "@/components/EvolvingSystemsList";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import { ProjectsHero } from "@/components/hero/meadow/ClientHeroes";
import GithubRepoGrid from "@/components/GithubRepoGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of AI systems, scalable infrastructure, and intelligent products I've built.",
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: "Projects | Param Patel",
    description: "A collection of AI systems, scalable infrastructure, and intelligent products I've built.",
    url: "/projects",
  },
  twitter: {
    title: "Projects | Param Patel",
    description: "A collection of AI systems, scalable infrastructure, and intelligent products I've built.",
  }
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const { data } = await sanityFetch({ query: ALL_PROJECTS_QUERY });
  const projects = data as any;

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] overflow-x-hidden selection:bg-[var(--amber)] selection:text-bg-main font-inter transition-colors duration-1000 ease-in-out">
      {/* 3D Immersive Hero */}
      <ProjectsHero />

      {/* Dynamic Cinematic Projects from Sanity */}
      <EvolvingSystemsList projects={projects} />

      {/* Live Open Source Repositories from GitHub */}
      <GithubRepoGrid />
    </div>
  );
}
