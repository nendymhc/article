import {defineType, defineField, defineArrayMember} from 'sanity'

export const customerGroup = defineType({
  type: 'document',
  name: 'customer',
  fields: [
    defineField({type: 'string', name: 'name', validation: (Rule) => Rule.required()}),
    defineField({
      type: 'array',
      name: 'applications',
      of: [defineArrayMember({type: 'reference', to: [{type: 'application'}]})],
    }),
    defineField({
      type: 'slug',
      name: 'code',
      options: {source: 'name', maxLength: 96},
    }),
  ],
})

export const application = defineType({
  type: 'document',
  name: 'application',
  fields: [
    defineField({type: 'string', name: 'name', title: 'Name'}),
    defineField({type: 'string', name: 'code'}),
  ],
})
