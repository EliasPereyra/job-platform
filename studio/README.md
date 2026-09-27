# studio

Sanity Studio de WorkStart (proyecto `swb3duug`, dataset `production`).

- `schemaTypes/`: `job`, `company`, `jobCategory`, `siteSettings` (singleton) y los objetos `seo` y `blockContent`.
- `structure.ts`: menú del Studio (el singleton de configuración aparece fijo).
- `presentation.ts`: mapea documentos a rutas de la web para la herramienta Presentation.
- `seed/`: datos de prueba (`pnpm seed`).

```bash
pnpm dev       # http://localhost:3333
pnpm typegen   # regenera los tipos en packages/cms-sanity
pnpm seed      # carga datos de prueba (usa tu sesión de `sanity login`)
```
