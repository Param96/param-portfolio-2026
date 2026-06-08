import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'globalSeo',
      title: 'Global SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Default Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Default Meta Description' },
        { name: 'ogImage', type: 'image', title: 'Default Open Graph Image' },
      ]
    }),
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link (href)', type: 'string' },
            { name: 'isExternal', title: 'Is External Link?', type: 'boolean' }
          ]
        }
      ]
    }),
    defineField({
      name: 'footer',
      title: 'Footer Config',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'subtext', title: 'Subtext', type: 'text' }
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform Name', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'iconName', title: 'Lucide Icon Name', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'cursorStyle',
      title: 'Custom Cursor Style',
      type: 'string',
      options: {
        list: ['cinematic', 'minimal', 'hidden']
      },
      initialValue: 'cinematic'
    }),
    defineField({
      name: 'globalAtmosphere',
      title: 'Global Atmosphere',
      type: 'object',
      fields: [
        { name: 'animationIntensity', title: 'Animation Intensity', type: 'string', options: { list: ['Minimal', 'Cinematic', 'Immersive'] } },
        { name: 'grainOpacity', title: 'Noise/Grain Opacity (0 to 1)', type: 'number' }
      ]
    }),
    defineField({
      name: 'analyticsId',
      title: 'Analytics ID',
      type: 'string',
    })
  ],
});
