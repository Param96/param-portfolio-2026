import { createClient } from 'next-sanity';
import { loadEnvConfig } from '@next/env';

// Load env vars using Next.js built-in loader
loadEnvConfig(process.cwd());

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const defaultProjects = [
  {
    _type: 'project',
    title: 'AI Verify Agent',
    slug: { _type: 'slug', current: 'ai-verify-agent' },
    category: 'AI/ML',
    status: 'Active Infrastructure',
    description: 'An AI-assisted verification workflow system designed to validate educational and course-related information from PDFs, datasets, web sources, and structured metadata. Built as part of a government-recognized cybersecurity educational initiative focused on organizing and validating cybersecurity learning resources across global platforms. Core Areas: XGBoost-based validation workflows, automation pipelines, intelligent verification systems, and scalable data validation.',
    featured: true,
    techStack: ['Python', 'XGBoost', 'Automation Pipelines', 'Agentic AI Systems'],
  },
  {
    _type: 'project',
    title: 'Jarvis',
    slug: { _type: 'slug', current: 'jarvis' },
    category: 'AI/ML',
    status: 'Experimental Engine',
    description: 'An evolving agentic AI assistant system inspired by autonomous orchestration workflows and intelligent automation environments. Focused on AI copilots, intelligent workflows, automation systems, modular AI infrastructure, orchestration layers, and experimental interaction systems.',
    featured: true,
    techStack: ['Python', 'LLM Workflows', 'Agentic AI', 'Automation Systems'],
  },
  {
    _type: 'project',
    title: 'rethink mindful flow',
    slug: { _type: 'slug', current: 'rethink-mindful-flow' },
    category: 'Full Stack',
    status: 'Experimental',
    description: 'An experimental productivity and workflow platform exploring focused environments, interaction systems, and startup-oriented UX experiences. Focused on mindful workflows, interaction systems, focused productivity environments, experimental interfaces, and product experimentation.',
    featured: false,
    techStack: ['TypeScript', 'AI Workflow Systems', 'Modern Frontend Architecture'],
  },
  {
    _type: 'project',
    title: 'Pactify',
    slug: { _type: 'slug', current: 'pactify' },
    category: 'Full Stack',
    status: 'Active',
    description: 'A startup-oriented workflow platform exploring AI-assisted founder tooling, automation systems, and operational productivity infrastructure. Focused on AI-assisted founder tooling, startup workflow systems, operational automation, safe generation systems, and productivity infrastructure.',
    featured: false,
    techStack: ['TypeScript', 'AI Systems', 'Automation Workflows'],
  },
  {
    _type: 'project',
    title: 'eRaksha Deepfake Detection System',
    slug: { _type: 'slug', current: 'eraksha' },
    category: 'Cybersecurity',
    status: 'Archived',
    description: 'A collaborative AI-assisted deepfake detection system developed during the IIT Delhi eRaksha Hackathon (Top 10 Finalist) focused on detecting manipulated images, videos, and audio. Focused on media authenticity analysis, AI-assisted verification, applied AI security systems, and deepfake detection workflows.',
    featured: true,
    techStack: ['Python', 'Machine Learning', 'AI Detection Systems'],
  },
  {
    _type: 'project',
    title: 'Drilex Oil',
    slug: { _type: 'slug', current: 'drilex-oil' },
    category: 'Full Stack',
    status: 'Active',
    description: 'A production-ready business website demonstrating frontend engineering, deployment workflows, client delivery capability, and production infrastructure understanding. This project communicates real-world execution capability.',
    featured: false,
    techStack: ['HTML', 'Frontend Development', 'Responsive Design'],
  }
];

async function seed() {
  console.log("Checking for existing projects...");
  const existing = await client.fetch(`count(*[_type == "project"])`);
  
  if (existing > 0) {
    console.log(`Found ${existing} projects in the database. Deleting them to replace with the new narrative...`);
    const allProjects = await client.fetch(`*[_type == "project"]._id`);
    for (const id of allProjects) {
      await client.delete(id);
    }
  }

  console.log("Seeding projects with new founder-grade narrative...");
  
  for (const project of defaultProjects) {
    console.log(`Creating: ${project.title}`);
    try {
      await client.create(project);
      console.log(`   Success!`);
    } catch (err) {
      console.error(`   Failed to create ${project.title}:`, err);
    }
  }

  console.log("Seeding complete! You can now view them on the site and in your CMS at /admin/studio.");
}

seed();
