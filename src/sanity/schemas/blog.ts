import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog Article',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Engineering', 'Design', 'Systems', 'Thoughts'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'atmosphere',
      title: 'Article Atmosphere',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial Cream', value: 'editorial-cream' },
          { title: 'Editorial Dark', value: 'editorial-dark' },
          { title: 'Cinematic Bronze', value: 'cinematic-bronze' },
          { title: 'Deep Teal', value: 'deep-teal' },
          { title: 'Minimal White', value: 'minimal-white' },
        ],
      },
      initialValue: 'editorial-cream',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Highlight this article in the hero section of the blog feed.',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Listing Cards)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image (Article Header)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Excerpt',
      type: 'text',
      description: 'Used for listing cards and SEO meta description if not overridden.',
    }),
    defineField({
      name: 'readingTime',
      title: 'Estimated Reading Time (mins)',
      type: 'number',
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Show Table of Contents',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'content',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alt Text', type: 'string' }
          ]
        },
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
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed URL',
          fields: [
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blog' }] }],
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
      author: 'author.name',
      media: 'coverImage',
    },
  },
});
