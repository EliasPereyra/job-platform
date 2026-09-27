import {defineArrayMember, defineType} from 'sanity'

// Rich text for job and company descriptions (the WordPress `content` field).
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenido',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Subtítulo', value: 'h3'},
        {title: 'Cita', value: 'blockquote'},
      ],
      lists: [
        {title: 'Viñetas', value: 'bullet'},
        {title: 'Numerada', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Negrita', value: 'strong'},
          {title: 'Cursiva', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Enlace',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule.uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
              },
            ],
          },
        ],
      },
    }),
  ],
})
