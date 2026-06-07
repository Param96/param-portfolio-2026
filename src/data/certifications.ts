export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerShort: string;
  description: string;
  coveredSkills: string[];
  // TODO: Add certificate image path when available
  // certificateImage?: string;
  // TODO: Add verification URL when available
  // verificationUrl?: string;
  accentColor: string;
}

export const certifications: Certification[] = [
  {
    id: "ibm-fullstack",
    title: "Full Stack Software Developer Professional Certificate",
    issuer: "IBM",
    issuerShort: "IBM",
    description:
      "Comprehensive professional certification covering modern full-stack development, cloud-native architecture, containerization, and production deployment workflows.",
    coveredSkills: [
      "React",
      "Node.js",
      "Express",
      "Django",
      "Flask",
      "Docker",
      "Kubernetes",
      "Cloud Native Development",
      "CI/CD",
      "Microservices",
      "SQL & Databases",
      "SaaS Deployment",
      "Git & GitHub",
    ],
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "ml-specialization",
    title: "Machine Learning Specialization",
    issuer: "Andrew Ng — Stanford / DeepLearning.AI",
    issuerShort: "Stanford",
    description:
      "In-depth specialization covering core machine learning algorithms, neural networks, model optimization, and production ML best practices.",
    coveredSkills: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Regression",
      "Classification",
      "Neural Networks",
      "ML Best Practices",
      "Decision Trees",
      "Clustering",
      "Recommender Systems",
      "Model Optimization",
      "TensorFlow Fundamentals",
    ],
    accentColor: "from-violet-500 to-purple-500",
  },
];
