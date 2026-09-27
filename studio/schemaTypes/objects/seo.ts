import {defineField, defineType} from 'sanity'

// Replaces the Yoast SEO fields that WordPress exposed through WPGraphQL.
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Si se deja vacío se usa el título del documento.',
      validation: (rule) => rule.max(70).warning('Los títulos largos se cortan en Google.'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Mejor por debajo de 160 caracteres.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagen para redes (Open Graph)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Ocultar de buscadores',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
