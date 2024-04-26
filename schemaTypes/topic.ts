import {defineType, defineField, defineArrayMember} from 'sanity'

export const topic = defineType({
  type: 'document',
  name: 'topic',
  fields: [
    defineField({type: 'string', name: 'title'}),
    defineField({type: 'boolean', name: 'showInHome', title: 'Show in Home page'}),
    defineField({
      type: 'array',
      name: 'articles',
      title: 'Articles',
      of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})],
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
})
