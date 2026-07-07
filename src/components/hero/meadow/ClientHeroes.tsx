"use client";

import dynamic from "next/dynamic";

export const AILabHero = dynamic(() => import("./AILabHero"), { ssr: false });
export const ProjectsHero = dynamic(() => import("./ProjectsHero"), { ssr: false });
export const BlogHero = dynamic(() => import("./BlogHero"), { ssr: false });
export const ResearchHero = dynamic(() => import("./ResearchHero"), { ssr: false });
export const ContactHero = dynamic(() => import("./ContactHero"), { ssr: false });
