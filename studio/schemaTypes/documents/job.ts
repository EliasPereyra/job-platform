import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {MODALITIES, PROVINCES, WORKING_DAYS} from '../shared/options'

const stringList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    group: 'details',
    of: [defineArrayMember({type: 'string'})],
  })

export const job = defineType({
  name: 'job',
  title: 'Empleo',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Contenido', default: true},
    {name: 'details', title: 'Detalles'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Puesto',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Compañía',
      type: 'reference',
      group: 'content',
      to: [{type: 'company'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'available',
      title: 'Búsqueda abierta',
      type: 'boolean',
      group: 'content',
      initialValue: true,
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'reference', to: [{type: 'jobCategory'}]})],
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'province',
      title: 'Provincia',
      type: 'string',
      group: 'details',
      options: {list: PROVINCES},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Ciudad o barrio',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'modality',
      title: 'Modalidad',
      type: 'string',
      group: 'details',
      options: {list: MODALITIES, layout: 'radio', direction: 'horizontal'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'workingDay',
      title: 'Jornada',
      type: 'string',
      group: 'details',
      options: {list: WORKING_DAYS},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'salary',
      title: 'Salario',
      type: 'string',
      group: 'details',
      description: 'Texto libre, p. ej. "$900.000 brutos mensuales" o "A convenir".',
    }),
    stringList('tasks', 'Tareas a realizar'),
    stringList('mandatoryRequirements', 'Requisitos excluyentes'),
    stringList('optionalRequirements', 'Requisitos no excluyentes'),
    stringList('benefits', 'Beneficios'),
    defineField({
      name: 'contactEmail',
      title: 'Email de contacto',
      type: 'string',
      group: 'details',
      description: 'Opcional. Si se deja vacío se usa el email de la compañía.',
      validation: (rule) => rule.email(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  orderings: [
    {
      title: 'Más recientes',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', company: 'company.name', province: 'province', media: 'company.logo'},
    prepare: ({title, company, province, media}) => ({
      title,
      subtitle: [company, province].filter(Boolean).join(' · '),
      media,
    }),
  },
})
