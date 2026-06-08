import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'labNote',
  title: 'Lab Note',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'experimentStatus',
      title: 'Experiment Status',
      type: 'string',
      options: {
        list: ['Currently Testing', 'Paused', 'Completed', 'Failed', 'Iterating'],
      },
      initialValue: 'Currently Testing',
    }),
    defineField({
      name: 'mood',
      title: 'Atmospheric Mood',
      type: 'string',
      options: {
        list: ['Exploring', 'Debugging', 'Breakthrough', 'Reflection', 'Late Night Build'],
      },
      initialValue: 'Exploring',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'linkedProject',
      title: 'Linked Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Which project is this experiment related to?',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Preview',
      type: 'text',
      description: 'Short summary for the lab notes feed.',
    }),
    defineField({
      name: 'content',
      title: 'Content / Code Snippets',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'code' },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: { list: ['tip', 'warning', 'note', 'info'] }
            },
            { name: 'text', title: 'Text', type: 'text' }
          ]
        }
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Override',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
        { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
      ],
    }),
  ],
});
