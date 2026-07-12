import { Metadata } from "next";
import EvolvingSystemsList from "@/components/EvolvingSystemsList";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import { ProjectsHero } from "@/components/hero/meadow/ClientHeroes";
import GithubRepoGrid from "@/components/GithubRepoGrid";

import { generateCollectionPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects — AI Systems & Scalable Products",
  description:
    "Explore AI systems, scalable infrastructure, and intelligent products built by Param Patel — from agentic AI workflows to full stack applications.",
  alternates: {
    canonical: "https://www.parampatel.in/projects",
  },
  openGraph: {
    title: "Projects — AI Systems & Scalable Products | Param Patel",
    description:
      "Explore AI systems, scalable infrastructure, and intelligent products built by Param Patel.",
    url: "https://www.parampatel.in/projects",
  },
  twitter: {
    title: "Projects — AI Systems & Scalable Products | Param Patel",
    description:
      "AI systems, scalable infrastructure, and intelligent products by Param Patel.",
  },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const { data } = await sanityFetch({ query: ALL_PROJECTS_QUERY });
  const projects = data as any;

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] overflow-x-hidden selection:bg-[var(--amber)] selection:text-bg-main font-inter transition-colors duration-1000 ease-in-out">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateCollectionPageJsonLd({
              name: "Projects — Param Patel",
              description: "AI systems, scalable infrastructure, and intelligent products.",
              url: "/projects",
            })
          ),
        }}
      />
      {/* 3D Immersive Hero */}
      <ProjectsHero />

      {/* Dynamic Cinematic Projects from Sanity */}
      <EvolvingSystemsList projects={projects} />

      {/* Live Open Source Repositories from GitHub */}
      <GithubRepoGrid />
    </div>
  );
}
