export default {
  name: 'labNote',
  title: 'Lab Note',
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
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Experimental', 'Work in Progress', 'Snapshot', 'Archived']
      }
    },
    {
      name: 'content',
      title: 'Content / Code Snippets',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        {
          type: 'code',
          name: 'codeSnippet',
          title: 'Code Snippet',
        }
      ],
    },
  ],
};
