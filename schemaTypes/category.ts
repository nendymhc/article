import {defineType, defineField} from 'sanity'

export const category = defineType({
  type: 'document',
  name: 'category',
  fields: [
    defineField({type: 'string', name: 'title', title: 'Category Name (to be shown in the app)'}),
    defineField({type: 'boolean', name: 'isFilter', title: 'Is Filter', initialValue: false}),
    defineField({
      type: 'number',
      name: 'sort',
      title: 'Display Order',
      initialValue: 1,
      hidden: ({document}) => document?.isFilter !== true,
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
