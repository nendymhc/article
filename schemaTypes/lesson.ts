import { defineType, defineField, defineArrayMember } from 'sanity'

export const lesson = defineType({
  type: "document",
  name: "lesson",
  fields: [
    defineField({ type: "string", name: "title" }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "title", options: { source: "title", maxLength: 96 } },
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
    defineField({
      type: "file",
      name: "video",
      options: { accept: "video/*" },
    }),
  ],
});

