import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const jobCategory = defineType({
  name: 'jobCategory',
  title: 'Categoría',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'name'}},
})
