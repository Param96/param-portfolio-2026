export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'atmosphere',
      title: 'Project Atmosphere',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Cover Image / Cinematic Preview',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    },
    {
      name: 'architectureDiagram',
      title: 'Architecture Diagram',
      type: 'image',
    },
    {
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
