# @workstart/cms-wordpress (pausado)

Capa de datos de WordPress (WPGraphQL + ACF + Yoast) que usaba la web antes de migrar a Sanity.
**No está conectada a `web/`**: se conserva como referencia y para poder retomarla.

| Carpeta | Contenido |
| --- | --- |
| `src/queries/` | Queries GraphQL (empleos, compañías, SEO, páginas, posts) |
| `src/utils/` | `fetchGraphQL`, menú principal, mapeo de SEO de Yoast a `Metadata` |
| `src/apollo/` | `ApolloWrapper` (`@apollo/client-integration-nextjs`) para componentes cliente |
| `src/routes/` | Handlers de preview, exit-preview, revalidate, sitemap, robots y el proxy de redirecciones |
| `src/mocks/` | Handlers de MSW con la forma de respuesta de WPGraphQL |
| `src/app-reference/` | Páginas y templates de Next tal como estaban con WordPress. Importan componentes con el alias viejo `@/components/...`, así que hay que adaptarlos si se reactiva WordPress |

## Reactivar

1. Configurar WordPress según [`docs/wordpress.md`](../../docs/wordpress.md).
2. Definir `NEXT_PUBLIC_WORDPRESS_API_URL` y ejecutar `pnpm --filter @workstart/cms-wordpress codegen` (genera `src/gql/`).
3. Montar los handlers de `src/routes/` en `web/app` y reemplazar `web/modules/cms` para que apunte a este paquete.
