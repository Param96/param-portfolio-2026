import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'research',
  title: 'Research',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['In Progress', 'Under Review', 'Experimental', 'Published'],
      },
      initialValue: 'In Progress',
    }),
    defineField({
      name: 'domains',
      title: 'Research Domains',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'contributions',
      title: 'Key Contributions',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'systemVisualization',
      title: 'System Visualization',
      type: 'string',
      options: {
        list: ['orbital', 'pathways', 'nodes', 'minimal'],
      },
      initialValue: 'pathways',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date / Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'institution',
      title: 'Institution / Organization',
      type: 'string',
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', title: 'Caption', type: 'string' }] },
        { type: 'code' }
      ],
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
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
