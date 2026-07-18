import type { MetadataRoute } from "next";

/**
 * Web App Manifest — provides PWA metadata, "Add to Home Screen" support,
 * and additional signals for search engines.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Param Patel — AI/ML Engineer, Full Stack Engineer & Builder",
    short_name: "Param Patel",
    description:
      "Portfolio of Param Patel — AI/ML Engineer, Full Stack Engineer, and Builder creating agentic AI systems, intelligent products, and scalable software from India.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E3",
    theme_color: "#2F3E46",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
