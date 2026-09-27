import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

// Singleton (see structure.ts). Replaces the WordPress primary menu and the
// "logo" media item the navigation used to look up.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del sitio',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Si no hay logo, la web muestra el nombre del sitio.',
      fields: [defineField({name: 'alt', title: 'Texto alternativo', type: 'string'})],
    }),
    defineField({
      name: 'navigation',
      title: 'Menú principal',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'navItem',
          title: 'Ítem',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Texto',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Ruta',
              type: 'string',
              description: 'Ruta interna (p. ej. /todos-los-trabajos) o URL completa.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        }),
      ],
    }),
  ],
})
