"use client";

import dynamic from "next/dynamic";

// Render headings, descriptions, and featured links in the initial HTML.
// React Three Fiber still initializes its Canvas in the browser.
export const AILabHero = dynamic(() => import("./AILabHero"));
export const ProjectsHero = dynamic(() => import("./ProjectsHero"));
export const BlogHero = dynamic(() => import("./BlogHero"));
export const ResearchHero = dynamic(() => import("./ResearchHero"));
export const ContactHero = dynamic(() => import("./ContactHero"));
