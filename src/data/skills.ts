import { Brain, Globe, Cloud, Code2, Database } from "lucide-react";

export interface SkillCategory {
  id: string;
  title: string;
  icon: typeof Brain;
  skills: string[];
  accentColor: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    icon: Brain,
    accentColor: "from-blue-500 to-violet-500",
    skills: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Regression Models",
      "Classification Models",
      "Neural Networks",
      "Deep Learning Fundamentals",
      "Model Evaluation",
      "Feature Engineering",
      "Data Preprocessing",
      "Prompt Engineering",
      "LLM Workflows",
      "Agentic AI Systems",
      "Multi-Agent Architectures",
      "AI Automation Pipelines",
      "Recommender Systems",
      "Decision Trees",
      "Clustering",
      "TensorFlow Fundamentals",
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    icon: Globe,
    accentColor: "from-emerald-500 to-cyan-500",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Flask",
      "Django",
      "REST APIs",
      "Authentication Systems",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Cloud",
    icon: Cloud,
    accentColor: "from-orange-500 to-amber-500",
    skills: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Cloud Native Development",
      "Microservices",
      "Linux",
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: Code2,
    accentColor: "from-pink-500 to-rose-500",
    skills: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    accentColor: "from-indigo-500 to-purple-500",
    skills: ["PostgreSQL", "MongoDB", "Vector Databases"],
  },
];
