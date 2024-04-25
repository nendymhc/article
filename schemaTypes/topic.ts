import { defineType, defineField, defineArrayMember } from 'sanity'

export const topic = defineType({
    type: "document",
    name: "topic",
    fields: [
        defineField({ type: "string", name: "title" }),
        defineField({
            type: "slug",
            name: "slug",
            options: { source: "title", maxLength: 96 },
        }),
        defineField({ type: "boolean", name: "showInHome", title: "Show in Home page" }),
        defineField({
            type: "array",
            name: "articles",
            title: "Articles",
            of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })],
        }),
        defineField({
            type: "array",
            name: "videos",
            title: "Videos",
            of: [defineArrayMember({ type: "reference", to: [{ type: "video" }] })],
        }),
    ],
});
