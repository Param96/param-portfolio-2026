import { defineType, defineField } from "sanity";

export const researchPageType = defineType({
  name: "researchPage",
  title: "Research Page Content",
  type: "document",
  fields: [
    defineField({
      name: "roleTitle",
      title: "Role Title",
      type: "string",
      description: 'E.g., "Lead — Data Analysis & Verification Team"',
    }),
    defineField({
      name: "roleDescription",
      title: "Role Description",
      type: "text",
    }),
    defineField({
      name: "node1",
      title: "Node 1 (Structured Intelligence)",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "string" },
        { name: "content", title: "Detailed Content", type: "text" },
        { name: "stat1Value", title: "Stat 1 Value", type: "string" },
        { name: "stat1Label", title: "Stat 1 Label", type: "string" },
        { name: "stat2Value", title: "Stat 2 Value", type: "string" },
        { name: "stat2Label", title: "Stat 2 Label", type: "string" },
      ],
    }),
    defineField({
      name: "node2",
      title: "Node 2 (AI Validation)",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "string" },
        { name: "content", title: "Detailed Content", type: "text" },
        { name: "confidenceScore", title: "Confidence Score Text", type: "string", description: 'E.g., "99.8% CONFIDENCE SCORE"' },
        { name: "feature1Label", title: "Feature 1 Label", type: "string" },
        { name: "feature2Label", title: "Feature 2 Label", type: "string" },
      ],
    }),
  ],
});
