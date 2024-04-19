import { defineType, defineField, defineArrayMember } from 'sanity'

export const course = defineType({
  type: "document",
  name: "course",
  fields: [
    defineField({ type: "string", name: "title" }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ type: "text", name: "description" }),
    defineField({
      type: "array",
      name: "content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          fields: [{ type: "string", name: "caption" }],
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({ type: "number", name: "price" }),
    defineField({ type: "number", name: "duration" }),
    defineField({
      type: "string",
      name: "level",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
      },
    }),
    defineField({
      type: "array",
      name: "tags",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      type: "reference",
      name: "category",
      to: [{ type: "category" }],
    }),
    defineField({
      type: "array",
      name: "lessons",
      of: [defineArrayMember({ type: "reference", to: [{ type: "lesson" }] })],
    }),
  ],
});

