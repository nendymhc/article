import {defineType, defineField, defineArrayMember} from 'sanity'

export const video = defineType({
  type: 'document',
  name: 'video',
  fields: [
    defineField({type: 'string', name: 'title'}),
    defineField({
      type: 'slug',
      name: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      type: 'array',
      name: 'content',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          fields: [{type: 'string', name: 'caption'}],
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      type: 'reference',
      name: 'selectCategory',
      title: 'Select Category',
      to: [{type: 'category'}],
    }),
    defineField({
      title: 'Is Featured',
      type: 'boolean',
      name: 'Featured',
      initialValue: false,
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Cover Image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'file',
      name: 'videoFile',
      options: {accept: 'video/*'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'fisibleFor',
      title: 'Visible for',
      of: [defineArrayMember({type: 'reference', to: [{type: 'customer'}]})],
    }),
    defineField({
      title: 'Start Date',
      type: 'datetime',
      name: 'startDate',
      initialValue: new Date().toISOString(),
    }),
    defineField({
      title: 'End Date',
      type: 'datetime',
      name: 'endDate',
    }),
    defineField({
      title: 'Page View',
      type: 'number',
      name: 'pageView',
      initialValue: 0,
    }),

    // defineField({
    //   type: 'url',
    //   name: 'video',
    //   options: {accept: 'video/*'},
    // }),
  ],
})
