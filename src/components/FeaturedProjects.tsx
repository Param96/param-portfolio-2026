"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Brain,
  Shield,
  Code2,
  Trophy,
} from "lucide-react";
import { projects, Project } from "@/data/projects";
import AnimatedSection from "@/components/AnimatedSection";
import GlowCard from "@/components/GlowCard";
import SectionHeader from "@/components/SectionHeader";

function getGlowColor(project: Project): "blue" | "emerald" | "violet" | "amber" {
  if (project.id === "eraksha") return "amber";
  if (project.category.toLowerCase().includes("ai") || project.category.toLowerCase().includes("machine learning")) return "blue";
  if (project.category.toLowerCase().includes("web")) return "emerald";
  return "violet";
}

function getCategoryIcon(project: Project) {
  if (project.id === "eraksha") return <Shield className="w-3.5 h-3.5" />;
  if (project.category.toLowerCase().includes("ai") || project.category.toLowerCase().includes("machine learning")) return <Brain className="w-3.5 h-3.5" />;
  if (project.category.toLowerCase().includes("web")) return <Code2 className="w-3.5 h-3.5" />;
  return <Layers className="w-3.5 h-3.5" />;
}

function StatusBadge({ project }: { project: Project }) {
  if (project.id === "eraksha") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
        <Trophy className="w-3 h-3" />
        {project.statusLabel}
      </span>
    );
  }

  if (project.status === "in-development") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
        </span>
        {project.statusLabel}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      {project.statusLabel}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isFirst = index === 0;
  const glowColor = getGlowColor(project);
  const visibleFeatures = expanded ? project.features : project.features.slice(0, 3);
  const hasMore = project.features.length > 3;

  return (
    <AnimatedSection
      delay={index * 150}
      className={isFirst ? "lg:col-span-2" : ""}
    >
      <GlowCard glowColor={glowColor} className="h-full">
        {/* Top row: Category + Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full glass text-slate-300">
            {getCategoryIcon(project)}
            {project.category}
          </span>
          <StatusBadge project={project} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Core Features */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
            Core Features
          </h4>
          <ul className="space-y-2">
            {visibleFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-slate-400"
              >
                <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 mt-3 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
              {expanded
                ? "Show less"
                : `Show ${project.features.length - 3} more`}
            </button>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          {/* TODO: Wire up githubUrl when available */}
          <a
            href={project.githubUrl || "#"}
            onClick={(e) => !project.githubUrl && e.preventDefault()}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-300"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
          {/* TODO: Wire up liveUrl when available */}
          <a
            href={project.liveUrl || "#"}
            onClick={(e) => !project.liveUrl && e.preventDefault()}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-300"
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Work" title="Featured Projects">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            View All Projects →
          </Link>
        </SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
