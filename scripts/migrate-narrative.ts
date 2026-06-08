import { createClient } from 'next-sanity';
import { loadEnvConfig } from '@next/env';
import path from 'path';

// Load env vars using Next.js built-in loader
loadEnvConfig(process.cwd());

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const updates = [
  {
    matchTitle: 'AI Verify Agent',
    newTitle: 'AI Verify Agent',
    newStatus: 'Active Infrastructure',
    newDescription: 'An AI-assisted verification workflow system designed to validate educational and course-related information from PDFs, datasets, web sources, and structured metadata. Built as part of a government-recognized cybersecurity educational initiative focused on organizing and validating cybersecurity learning resources across global platforms. Core Areas: XGBoost-based validation workflows, automation pipelines, intelligent verification systems, and scalable data validation.'
  },
  {
    matchTitle: 'Jarvis',
    newTitle: 'Jarvis',
    newStatus: 'Experimental Engine',
    newDescription: 'An evolving agentic AI assistant system inspired by autonomous orchestration workflows and intelligent automation environments. Focused on AI copilots, intelligent workflows, automation systems, modular AI infrastructure, orchestration layers, and experimental interaction systems.'
  },
  {
    matchTitle: 'rethink-mindful-flow',
    newTitle: 'rethink mindful flow',
    newStatus: 'Experimental',
    newDescription: 'An experimental productivity and workflow platform exploring focused environments, interaction systems, and startup-oriented UX experiences. Focused on mindful workflows, interaction systems, focused productivity environments, experimental interfaces, and product experimentation.'
  },
  {
    matchTitle: 'Pactify',
    newTitle: 'Pactify',
    newStatus: 'Active',
    newDescription: 'A startup-oriented workflow platform exploring AI-assisted founder tooling, automation systems, and operational productivity infrastructure. Focused on AI-assisted founder tooling, startup workflow systems, operational automation, safe generation systems, and productivity infrastructure.'
  },
  {
    matchTitle: 'eRaksha',
    newTitle: 'eRaksha Deepfake Detection System',
    newStatus: 'Archived',
    newDescription: 'A collaborative AI-assisted deepfake detection system developed during the IIT Delhi eRaksha Hackathon (Top 10 Finalist) focused on detecting manipulated images, videos, and audio. Focused on media authenticity analysis, AI-assisted verification, applied AI security systems, and deepfake detection workflows.'
  },
  {
    matchTitle: 'drilexoil',
    newTitle: 'Drilex Oil',
    newStatus: 'Active',
    newDescription: 'A production-ready business website demonstrating frontend engineering, deployment workflows, client delivery capability, and production infrastructure understanding. This project communicates real-world execution capability.'
  }
];

async function migrate() {
  console.log("Fetching projects...");
  const query = `*[_type == "project"]`;
  const projects = await client.fetch(query);

  console.log(`Found ${projects.length} projects. Checking for updates...`);

  for (const project of projects) {
    // Find matching update rule
    const rule = updates.find(u => project.title.toLowerCase().includes(u.matchTitle.toLowerCase()));
    
    if (rule) {
      console.log(`Updating: ${project.title} -> ${rule.newTitle}`);
      
      try {
        await client
          .patch(project._id)
          .set({
            title: rule.newTitle,
            description: rule.newDescription,
            status: rule.newStatus
          })
          .commit();
        console.log(`   Success!`);
      } catch (err) {
        console.error(`   Failed to update ${project._id}:`, err);
      }
    } else {
      console.log(`No matching rule for: ${project.title}`);
    }
  }

  console.log("Migration complete!");
}

migrate();
