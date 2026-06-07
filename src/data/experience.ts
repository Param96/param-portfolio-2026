export interface Experience {
  id: string;
  role: string;
  company: string;
  companyShort: string;
  description: string;
  skills: string[];
  highlights: string[];
  accentColor: string;
}

export const experiences: Experience[] = [
  {
    id: "yiic-scaler",
    role: "Intern",
    company: "YIIC 2.0 — Powered by Scaler School of Technology",
    companyShort: "Scaler",
    description:
      "Completed an internship under YIIC 2.0 powered by Scaler School of Technology, gaining exposure to startup ecosystems, software development workflows, AI productivity tools, and practical technology-driven problem solving.",
    skills: [
      "Node.js Development",
      "AI Productivity Tools",
      "Startup Workflows",
      "Technical Collaboration",
      "Marketing Fundamentals",
      "Product-Oriented Thinking",
      "Software Development Practices",
    ],
    highlights: [
      "Startup ecosystem exposure",
      "Technical adaptability",
      "Interdisciplinary learning",
      "Engineering + business understanding",
    ],
    accentColor: "from-emerald-500 to-teal-500",
  },
];

export interface ResearchProject {
  id: string;
  title: string;
  role: string;
  roleBadge: string;
  category: string;
  description: string;
  objectives: string[];
  domains: string[];
  responsibilities: string[];
  techAreas: string[];
  status: string;
  accentColor: string;
}

export const researchProjects: ResearchProject[] = [
  {
    id: "cybersecurity-research",
    title: "Cybersecurity Educational Intelligence System",
    role: "Leading the Data Analysis Team",
    roleBadge: "Research Lead — Data Analysis Team",
    category: "Cybersecurity + Data Analysis + Educational Intelligence Systems",
    description:
      "Currently leading the data analysis team for a cybersecurity-focused research project aimed at analyzing, organizing, and verifying cybersecurity course data across multiple domains. The research focuses on building an intelligent system capable of helping learners discover and access both free and paid cybersecurity courses across various cybersecurity fields.",
    objectives: [
      "Analyze cybersecurity educational datasets",
      "Verify and validate course information",
      "Organize cybersecurity learning resources",
      "Improve accessibility of cybersecurity education",
      "Build intelligent verification workflows",
      "Create a structured cybersecurity learning ecosystem",
    ],
    domains: [
      "Network Security",
      "Ethical Hacking",
      "Cloud Security",
      "Web Security",
      "Malware Analysis",
      "Cryptography",
      "Digital Forensics",
      "Cyber Threat Intelligence",
      "Application Security",
      "SOC & SIEM",
      "Penetration Testing",
    ],
    responsibilities: [
      "Leading the data analysis team",
      "Managing educational data workflows",
      "Designing verification processes",
      "Organizing cybersecurity course datasets",
      "Contributing to intelligent automation systems",
      "Research coordination and analysis",
    ],
    techAreas: [
      "Data Analysis",
      "Machine Learning",
      "Intelligent Verification Systems",
      "Automation Pipelines",
      "AI-Assisted Research",
      "Educational Intelligence Systems",
    ],
    status: "Active Research",
    accentColor: "from-red-500 to-orange-500",
  },
];
