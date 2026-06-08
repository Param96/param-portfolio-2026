import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
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
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroSection',
          title: 'Hero Section',
          fields: [
            { name: 'headline', type: 'string', title: 'Headline' },
            { name: 'subheadline', type: 'text', title: 'Subheadline' },
            { name: 'cinematicEnvironment', type: 'string', title: '3D Environment', options: { list: ['orbital', 'particles', 'geometry', 'unstable', 'none'] } },
            { name: 'ctaText', type: 'string', title: 'CTA Text' },
            { name: 'ctaHref', type: 'string', title: 'CTA Link' },
            { name: 'atmosphere', type: 'string', title: 'Atmosphere Override', options: { list: ['dark-cinematic', 'bronze-glow', 'deep-teal', 'light-editorial', 'default'] } }
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'editorialBlock',
          title: 'Editorial Block',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'content', type: 'array', of: [{type: 'block'}], title: 'Content' },
            { name: 'layout', type: 'string', title: 'Layout Variant', options: { list: ['full-width', 'two-column', 'offset-left'] } }
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'projectsGrid',
          title: 'Projects Grid',
          fields: [
            { name: 'filter', type: 'string', title: 'Filter', options: { list: ['all', 'featured', 'active', 'archived'] } },
            { name: 'layout', type: 'string', title: 'Layout', options: { list: ['grid', 'alternating'] } },
            { name: 'limit', type: 'number', title: 'Max Items To Show' }
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'blogFeed',
          title: 'Blog Feed',
          fields: [
            { name: 'filter', type: 'string', title: 'Filter', options: { list: ['all', 'featured', 'engineering', 'design', 'systems', 'thoughts'] } },
            { name: 'layout', type: 'string', title: 'Layout', options: { list: ['list', 'grid', 'featured-hero'] } },
            { name: 'limit', type: 'number', title: 'Max Items To Show' }
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'labNotesFeed',
          title: 'Lab Notes Feed',
          fields: [
            { name: 'filter', type: 'string', title: 'Filter', options: { list: ['all', 'currently-testing', 'completed', 'failed'] } },
            { name: 'limit', type: 'number', title: 'Max Items To Show' }
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'researchShowcase',
          title: 'Research Showcase',
          fields: [
            { name: 'researchProject', type: 'reference', to: [{type: 'research'}], title: 'Select Research Project' },
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'experienceTimeline',
          title: 'Experience Timeline',
          fields: [
            { name: 'entries', type: 'array', title: 'Entries', of: [
              { type: 'object', fields: [
                { name: 'role', type: 'string', title: 'Role' },
                { name: 'company', type: 'string', title: 'Company' },
                { name: 'dates', type: 'string', title: 'Dates (e.g. 2024 - Present)' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'skills', type: 'array', of: [{type: 'string'}], title: 'Skills' },
                { name: 'highlights', type: 'array', of: [{type: 'string'}], title: 'Highlights' },
              ]}
            ]}
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'skillsMatrix',
          title: 'Skills Matrix',
          fields: [
            { name: 'categories', type: 'array', title: 'Categories', of: [
              { type: 'object', fields: [
                { name: 'title', type: 'string', title: 'Category Title' },
                { name: 'skills', type: 'array', of: [{type: 'string'}], title: 'Skills' },
              ]}
            ]}
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'certificationsGrid',
          title: 'Certifications Grid',
          fields: [
            { name: 'certifications', type: 'array', title: 'Certifications', of: [
              { type: 'object', fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'issuer', type: 'string', title: 'Issuer' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'skills', type: 'array', of: [{type: 'string'}], title: 'Skills Covered' },
                { name: 'verificationUrl', type: 'url', title: 'Verification Link' },
                { name: 'accent', type: 'string', title: 'Accent Color', options: { list: ['blue', 'violet', 'emerald', 'amber'] } },
              ]}
            ]}
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'leadershipSection',
          title: 'Leadership Section',
          fields: [
            { name: 'role', type: 'string', title: 'Role' },
            { name: 'organization', type: 'string', title: 'Organization' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'achievements', type: 'array', of: [{type: 'string'}], title: 'Achievements' },
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'contactCTA',
          title: 'Contact CTA',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'subtext', type: 'text', title: 'Subtext' },
            { name: 'ctaText', type: 'string', title: 'Button Text' },
            { name: 'ctaHref', type: 'string', title: 'Button Link' },
            { name: 'atmosphere', type: 'string', title: 'Atmosphere Variant', options: { list: ['dark-cinematic', 'light-editorial'] } }
          ]
        }),
        defineArrayMember({
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'cinematicQuote',
          title: 'Cinematic Quote',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote Text' },
            { name: 'attribution', type: 'string', title: 'Attribution' },
            { name: 'atmosphere', type: 'string', title: 'Atmosphere Variant', options: { list: ['dark', 'light'] } }
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'mediaGallery',
          title: 'Media Gallery',
          fields: [
            { name: 'items', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', title: 'Caption', type: 'string' }] }] },
            { name: 'layout', type: 'string', title: 'Layout', options: { list: ['masonry', 'carousel', 'grid'] } }
          ]
        }),
        defineArrayMember({
          type: 'object',
          name: 'spacer',
          title: 'Spacer (Whitespace)',
          fields: [
            { name: 'size', type: 'string', title: 'Size', options: { list: ['small', 'medium', 'large', 'cinematic'] } }
          ]
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
        { name: 'ogImage', type: 'image', title: 'Open Graph Image' },
      ]
    })
  ],
});
