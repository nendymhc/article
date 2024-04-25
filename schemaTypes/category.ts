import {defineType, defineField} from 'sanity'

export const category = defineType({
  type: 'document',
  name: 'category',
  fields: [
    defineField({type: 'string', name: 'title'}),
    defineField({
      type: 'slug',
      name: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({type: 'boolean', name: 'isFilter', title: 'Is Filter', initialValue: false}),
    defineField({type: 'number', name: 'sort', title: 'Order', initialValue: 0}),
  ],
})
