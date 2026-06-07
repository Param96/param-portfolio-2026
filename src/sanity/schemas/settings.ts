export default {
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    },
    {
      name: 'globalSeo',
      title: 'Global SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Default Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Default Meta Description' },
        { name: 'ogImage', type: 'image', title: 'Default Open Graph Image' },
      ]
    },
    {
      name: 'animationIntensity',
      title: 'Animation Intensity',
      type: 'string',
      options: {
        list: ['Minimal', 'Cinematic', 'Immersive']
      }
    }
  ],
};
