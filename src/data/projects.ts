export type ProjectStatus = "in-development" | "live" | "research";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  techStack: string[];
  status: ProjectStatus;
  statusLabel: string;
  // Add GitHub/live links when available
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "ai-verification-agent",
    title: "AI-Verification-Agent",
    category: "Machine Learning + Agentic AI",
    description:
      "An intelligent AI-powered educational verification system capable of processing datasets such as Excel, CSV, and PDF files. The platform automatically scrapes educational pages concurrently and validates information using trained machine learning models and intelligent automation pipelines.",
    features: [
      "Concurrent web scraping",
      "Automated educational verification",
      "ML-powered validation system",
      "PDF/CSV/Excel processing",
      "AI-assisted verification workflows",
      "Scalable validation architecture",
    ],
    techStack: [
      "Python",
      "Machine Learning",
      "Web Scraping",
      "Automation Pipelines",
      "Agentic AI Systems",
    ],
    status: "in-development",
    statusLabel: "Currently In Development",
    featured: true,
  },
  {
    id: "jarvis",
    title: "Jarvis",
    category: "Agentic AI Assistant",
    description:
      "A personal AI assistant system focused on intelligent automation, conversational workflows, productivity enhancement, and modular AI task execution.",
    features: [
      "Conversational AI workflows",
      "Intelligent task execution",
      "Modular AI architecture",
      "AI automation pipelines",
      "Assistant-style interactions",
      "Extensible agent framework",
    ],
    techStack: [
      "Python",
      "LLM Workflows",
      "Agentic AI",
      "Automation Systems",
    ],
    status: "in-development",
    statusLabel: "Currently In Development",
    featured: true,
  },
  {
    id: "eraksha",
    title: "eRaksha — Deepfake Detection System",
    category: "AI + Cybersecurity + Deepfake Detection",
    description:
      "A deepfake detection system developed for the eRaksha Hackathon conducted by IIT Delhi. The project focused on identifying manipulated or AI-generated media using intelligent detection techniques and machine learning-driven analysis.",
    features: [
      "Deepfake detection workflows",
      "AI-assisted media analysis",
      "Manipulated content identification",
      "Intelligent verification techniques",
      "Security-focused AI implementation",
    ],
    techStack: [
      "Python",
      "Machine Learning",
      "AI Detection Systems",
      "Data Analysis",
    ],
    status: "live",
    statusLabel: "Top 10 Finalist — IIT Delhi",
    featured: true,
  },
  {
    id: "rethink-mindful-flow",
    title: "rethink-mindful-flow",
    category: "AI + Workflow Systems",
    description:
      "An intelligent workflow and productivity-oriented platform focused on structured thinking, mindful execution, and AI-enhanced process organization.",
    features: [
      "AI-enhanced workflow management",
      "Structured thinking framework",
      "Process organization tools",
      "Productivity optimization",
    ],
    techStack: [
      "TypeScript",
      "AI Workflow Systems",
      "Modern Frontend Architecture",
    ],
    status: "live",
    statusLabel: "Live",
    featured: false,
  },
  {
    id: "drilexoil",
    title: "drilexoil.com",
    category: "Web Development",
    description:
      "A professional business website built for an industrial/oil-related business, showcasing full-stack development capabilities, responsive UI design, and production-grade deployment practices.",
    features: [
      "Responsive design system",
      "Production-grade deployment",
      "Professional business UI",
      "Performance optimized",
    ],
    techStack: ["HTML", "Frontend Development", "Responsive Design"],
    status: "live",
    statusLabel: "Live",
    featured: false,
  },
  {
    id: "pactify",
    title: "Pactify",
    category: "AI for Startups / LegalTech",
    description:
      "An AI-powered platform designed to help startup founders generate and manage legal documentation workflows more efficiently using intelligent automation systems.",
    features: [
      "AI-powered legal workflows",
      "Startup-focused tooling",
      "Intelligent document generation",
      "Automation-first architecture",
    ],
    techStack: ["TypeScript", "AI Systems", "Automation Workflows"],
    status: "live",
    statusLabel: "Live",
    featured: false,
  },
];
