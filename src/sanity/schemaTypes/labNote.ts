import { defineType, defineField } from "sanity";

export const labNoteType = defineType({
  name: "labNote",
  title: "Lab Note (Raw / Unfinished)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Note Title",
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
      name: "date",
      title: "Date Logged",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "content",
      title: "Raw Thoughts / Automation Concepts",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
