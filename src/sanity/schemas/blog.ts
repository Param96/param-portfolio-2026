export default {
  name: 'blog',
  title: 'Blog Article',
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Engineering', 'Design', 'Systems', 'Thoughts']
      }
    },
    {
      name: 'summary',
      title: 'AI Summary / Excerpt',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'readingTime',
      title: 'Estimated Reading Time (mins)',
      type: 'number',
    }
  ],
};
