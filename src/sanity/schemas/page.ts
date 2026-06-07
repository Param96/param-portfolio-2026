export default {
  name: 'page',
  title: 'Page',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'atmosphere',
      title: 'Atmosphere (Color Theme)',
      type: 'string',
      options: {
        list: [
          { title: 'Dark Cinematic (Charcoal)', value: 'dark-cinematic' },
          { title: 'Light Editorial (Cream)', value: 'light-editorial' },
          { title: 'Deep Teal (Research)', value: 'deep-teal' },
          { title: 'Bronze Glow (Projects)', value: 'bronze-glow' },
        ],
      },
    },
    {
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroSystem',
          title: 'Hero System',
          fields: [
            { name: 'headline', type: 'string', title: 'Headline' },
            { name: 'subheadline', type: 'text', title: 'Subheadline' },
            { name: 'cinematicEnvironment', type: 'string', title: '3D Environment Type', options: { list: ['orbital', 'particles', 'geometry', 'none'] } }
          ]
        },
        {
          type: 'object',
          name: 'editorialSection',
          title: 'Editorial Typography Section',
          fields: [
            { name: 'heading', type: 'string', title: 'Section Heading' },
            { name: 'content', type: 'array', of: [{type: 'block'}], title: 'Content' }
          ]
        },
        {
          type: 'object',
          name: 'floatingConcepts',
          title: 'Floating Concepts Matrix',
          fields: [
            { name: 'concepts', type: 'array', of: [{
              type: 'object', fields: [
                { name: 'main', type: 'string', title: 'Main Concept' },
                { name: 'sub', type: 'text', title: 'Sub Text' }
              ]
            }]}
          ]
        }
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
        { name: 'ogImage', type: 'image', title: 'Open Graph Image' },
      ]
    }
  ],
};
