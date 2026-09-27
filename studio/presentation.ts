import {defineDocuments, defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

// Maps documents to the routes of the Next.js app (web/) so the Presentation
// tool can open the right page for the document being edited.
export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {route: '/job/:slug', filter: `_type == "job" && slug.current == $slug`},
    {route: '/companias/:slug', filter: `_type == "company" && slug.current == $slug`},
  ]),
  locations: {
    job: defineLocations({
      select: {title: 'title', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {title: doc?.title || 'Sin título', href: `/job/${doc?.slug}`},
          {title: 'Todos los trabajos', href: '/todos-los-trabajos'},
        ],
      }),
    }),
    company: defineLocations({
      select: {title: 'name', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {title: doc?.title || 'Sin nombre', href: `/companias/${doc?.slug}`},
          {title: 'Inicio', href: '/'},
        ],
      }),
    }),
  },
}
