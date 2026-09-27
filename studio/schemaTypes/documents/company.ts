import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

export const company = defineType({
  name: 'company',
  title: 'Compañía',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'content', title: 'Contenido', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) => rule.required().warning('El texto alternativo mejora la accesibilidad.'),
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email de contacto',
      type: 'string',
      group: 'content',
      description: 'Adonde los candidatos envían su CV.',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'website',
      title: 'Sitio web',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {select: {title: 'name', subtitle: 'contactEmail', media: 'logo'}},
})
