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
    defineField({
      type: 'string',
      name: 'title',
      title: 'Article Title*',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'content',
      title: 'Article Content',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      type: 'reference',
      name: 'selectCategory',
      title: 'Article Category*',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Featured?',
      type: 'boolean',
      name: 'featured',
      initialValue: false,
    }),
    defineField({
      name: 'articleType',
      type: 'postType',
      initialValue: 'article',
      title: 'Article Type*',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'file',
      name: 'videoFile',
      title: 'Article Video* (*.mp4, *.mov, *.avi, etc)',
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
      name: 'videoCover',
      title: 'Article Video Cover* (size : 375x225 or aspect ratio 5:3)',
      options: {hotspot: true},
      hidden: ({document}) => document?.articleType !== 'video',
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) =>
          document?.articleType === 'video' && currentValue === undefined
            ? 'Video cover required for Video type'
            : true,
        ),
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Article Image* (size : 375x225 or aspect ratio 5:3)',
      options: {hotspot: true},
      hidden: ({document}) => document?.articleType === 'video',
      validation: (Rule) =>
        Rule.custom((currentValue, {document}) =>
          document?.articleType === 'article' && currentValue === undefined
            ? 'Image required for Article type'
            : true,
        ),
    }),
    defineField({
      type: 'array',
      name: 'visibleFor',
      title: 'Visible for',
      of: [defineArrayMember({type: 'reference', to: [{type: 'customer'}]})],
      initialValue: [{_ref: 'ae6fa764-4876-4a68-9241-2fbf040e4fc8'}],
    }),
    defineField({
      title: 'Article Start Date*',
      type: 'datetime',
      name: 'startDate',
      initialValue: new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Article End Date',
      type: 'datetime',
      name: 'endDate',
    }),
    defineField({
      title: 'Article View Count',
      type: 'number',
      name: 'pageView',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      options: {source: 'title', maxLength: 96},
      hidden: ({currentUser}) => {
        return !currentUser?.roles.find(({name}) => name === 'administrator')
      },
    }),
  ],
  preview: {
    select: {
      image: 'image',
      title: 'title',
      articleType: 'articleType',
      videoCover: 'videoCover',
    },
    prepare: ({title, articleType, image, videoCover}) => {
      const type =
        articleType &&
        ARTICLE_TYPE.flatMap((option) => (option.value === articleType ? [option.title] : []))
      return {
        title: articleType ? `${type} - ${title}` : title,
        media: type == 'Article' ? image : videoCover,
      }
    },
  },
})
