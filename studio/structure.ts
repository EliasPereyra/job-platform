import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons/Cog'

export const SINGLETON_TYPES = new Set(['siteSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.documentTypeListItem('job').title('Empleos'),
      S.documentTypeListItem('company').title('Compañías'),
      S.documentTypeListItem('jobCategory').title('Categorías'),
      S.divider(),
      S.listItem()
        .title('Configuración del sitio')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
