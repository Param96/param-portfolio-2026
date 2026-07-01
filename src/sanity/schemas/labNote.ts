import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'labNote',
  title: 'Lab Note (Sticky)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional short title for the note.',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      description: 'The content of the sticky note. Keep it short!',
      validation: (Rule) => Rule.required().max(280).warning('Sticky notes should be short form (~280 characters max).'),
    }),
    defineField({
      name: 'color',
      title: 'Note Color',
      type: 'string',
      options: {
        list: [
          { title: 'Parchment (Cream)', value: 'parchment' },
          { title: 'Moss (Green)', value: 'moss' },
          { title: 'Clay (Orange)', value: 'clay' },
          { title: 'Dusk (Lavender)', value: 'dusk' },
        ],
      },
      initialValue: 'parchment',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pinStyle',
      title: 'Pinning Style',
      type: 'string',
      options: {
        list: [
          { title: 'Pin (dot)', value: 'pin' },
          { title: 'Tape (strip)', value: 'tape' },
          { title: 'Thread (string)', value: 'thread' },
        ],
      },
      initialValue: 'pin',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag (Badge)',
      type: 'string',
      options: {
        list: [
          { title: 'Experiment', value: 'experiment' },
          { title: 'Idea', value: 'idea' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Reading', value: 'reading' },
        ],
      },
      description: 'Optional corner label for the note.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
      color: 'color',
      date: 'publishedAt',
    },
    prepare({ title, body, color, date }) {
      return {
        title: title || (body ? `${body.substring(0, 30)}...` : 'Untitled Note'),
        subtitle: `${color} | ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
});
