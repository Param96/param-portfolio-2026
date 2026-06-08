import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['AI/ML', 'Full Stack', 'Cybersecurity', 'Infrastructure', 'Other'],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Active', 'Archived', 'In Development', 'Experimental', 'Evolving'],
      },
      initialValue: 'Active',
    }),
    defineField({
      name: 'atmosphere',
      title: 'Project Atmosphere',
      type: 'string',
      options: {
        list: [
          { title: 'Dark Cinematic', value: 'dark-cinematic' },
          { title: 'Bronze Glow', value: 'bronze-glow' },
          { title: 'Deep Teal', value: 'deep-teal' },
          { title: 'Light Editorial', value: 'light-editorial' },
        ],
      },
      initialValue: 'dark-cinematic',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Highlight this project on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Manual Sort Order',
      type: 'number',
      description: 'Used to sort featured projects (lower numbers appear first).',
      initialValue: 0,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / Cinematic Preview',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'architectureDiagram',
      title: 'Architecture Diagram',
      type: 'image',
      fields: [{ name: 'caption', title: 'Caption', type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Media Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ]
        }
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        { type: 'code' },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed URL',
          fields: [{ name: 'url', title: 'URL', type: 'url' }]
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
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
});
