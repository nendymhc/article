import {defineType, defineField, defineArrayMember} from 'sanity'
export const ARTICLE_TYPE = [
  {title: 'Article', value: 'article'},
  {title: 'Video', value: 'video'},
]

export const postType = defineType({
  name: 'postType',
  title: 'type',
  type: 'string',
  options: {
    list: ARTICLE_TYPE.map(({title, value}) => ({title, value})),
    layout: 'dropdown',
  },
})
export const article = defineType({
  type: 'document',
  name: 'article',
  fields: [
    defineField({type: 'string', name: 'title'}),
    defineField({
      type: 'slug',
      name: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      name: 'articleType',
      type: 'postType',
      initialValue: 'article',
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
      name: 'featured',
      initialValue: false,
    }),
    defineField({
      type: 'file',
      name: 'videoFile',
      options: {accept: 'video/*'},
      hidden: ({document}) => document?.articleType !== 'video',
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) =>
          document?.articleType === 'video' && currentValue === undefined
            ? 'Video required for Video type'
            : true,
        ),
    }),
    defineField({
      type: 'image',
      name: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'visibleFor',
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
  ],
  preview: {
    select: {
      image: 'image',
      title: 'title',
      articleType: 'articleType',
    },
    prepare: ({title, articleType, image}) => {
      const type =
        articleType &&
        ARTICLE_TYPE.flatMap((option) => (option.value === articleType ? [option.title] : []))
      return {
        title: articleType ? `${type} - ${title}` : title,
        media: image
      }
    },
  },
})
