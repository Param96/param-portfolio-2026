import { defineType, defineField } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project (Experimental Systems)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description (Atmospheric)",
      type: "text",
    }),
    defineField({
      name: "architecture",
      title: "Architecture Exploration / System Thinking",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active Experiment", value: "active" },
          { title: "Evolving Infrastructure", value: "evolving" },
          { title: "Archived Concept", value: "archived" },
        ],
      },
      initialValue: "active",
    }),
  ],
});
