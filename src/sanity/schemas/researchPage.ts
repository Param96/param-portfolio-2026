import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'researchPage',
  title: 'Research Page Config',
  type: 'document',
  fields: [
    defineField({
      name: 'roleTitle',
      title: 'Operational Role Title',
      type: 'string',
      description: 'e.g. Lead — Data Analysis & Verification Team',
      initialValue: 'Lead — Data Analysis & Verification Team'
    }),
    defineField({
      name: 'roleDescription',
      title: 'Role Description',
      type: 'text',
      description: 'The main paragraph explaining your role.',
      initialValue: 'Tasked with designing and structuring verification workflows to process vast amounts of unstructured cybersecurity educational data. I lead the Data Analysis & Verification Team, focusing heavily on building automated pipelines to extract, route, and validate intelligence.'
    }),
    defineField({
      name: 'node1',
      title: 'Node 1: Intelligence Systems',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title', initialValue: 'Structured Intelligence Systems' },
        { name: 'subtitle', type: 'string', title: 'Subtitle', initialValue: 'Automated web extraction pipelines and PDF verification workflows converting raw text into scalable datasets.' },
        { name: 'content', type: 'text', title: 'Expanded Content', initialValue: 'When dealing with thousands of unverified cybersecurity courses across multiple global platforms, manual curation fails at scale.\n\nI architected an automated extraction pipeline utilizing headless browsers and PDF parsing to constantly ingest raw educational metadata. The result is a continuously updated, fully structured intelligence database organized by core cybersecurity domains.' },
        { name: 'stat1Value', type: 'string', title: 'Stat 1 Value', initialValue: '14+' },
        { name: 'stat1Label', type: 'string', title: 'Stat 1 Label', initialValue: 'Global Platforms' },
        { name: 'stat2Value', type: 'string', title: 'Stat 2 Value', initialValue: '100k+' },
        { name: 'stat2Label', type: 'string', title: 'Stat 2 Label', initialValue: 'Nodes Validated' },
      ]
    }),
    defineField({
      name: 'node2',
      title: 'Node 2: ML Validation',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title', initialValue: 'AI-Assisted Validation' },
        { name: 'subtitle', type: 'string', title: 'Subtitle', initialValue: 'Engineering XGBoost models and agentic workflows to validate course metadata and assess technical depth.' },
        { name: 'content', type: 'text', title: 'Expanded Content', initialValue: 'Once structured intelligence is ingested, it must be validated for accuracy, relevance, and technical depth before being exposed to the educational platform.\n\nI engineered an XGBoost-based confidence model capable of programmatically assessing course metadata against established cybersecurity baselines, saving hundreds of hours of manual curation.' },
        { name: 'confidenceScore', type: 'string', title: 'Confidence Score Display', initialValue: 'Confidence Score: 98.4%' },
        { name: 'feature1Label', type: 'string', title: 'Feature 1 Label', initialValue: 'XGBoost Framework' },
        { name: 'feature2Label', type: 'string', title: 'Feature 2 Label', initialValue: 'Automated Routing' },
      ]
    })
  ]
});
