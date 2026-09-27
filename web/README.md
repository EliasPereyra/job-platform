# web

App Next.js 16 (App Router) de WorkStart. Muestra ofertas de empleo y compañías que vienen del CMS (Sanity).

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio: presentación y compañías |
| `/todos-los-trabajos` | Listado paginado (`?page=N`) con búsqueda por puesto y provincia |
| `/job/[slug]` | Detalle de una oferta: tareas, requisitos, beneficios y contacto |
| `/companias/[slug]` | Compañía y sus ofertas |
| `/sobre-nosotros`, `/contacto` | Páginas estáticas |
| `/api/draft-mode/*` | Activar/desactivar el modo borrador (Presentation de Sanity) |

## Organización

Monolito modular: cada módulo agrupa los componentes y la lógica de un dominio, y solo depende de `shared/`, `styles/` y del módulo `cms`.

- `app/`: rutas, layouts y metadata.
- `modules/cms/`: único punto de contacto con el CMS (re-exporta `@workstart/cms-sanity`, imagen, rich text y live).
- `modules/jobs/`: tarjeta, filtro, paginación y badges de ofertas.
- `modules/layout/`: navegación, footer y aviso de modo borrador.
- `modules/pages/`: contenido de páginas estáticas.
- `shared/`: íconos, loader y utilidades usados por varios módulos.
- `styles/`: `tokens.css` (colores y gradientes) y `globals.css` (reset y estilos base).

### Convenciones

- Archivos en kebab-case.
- Estilos con CSS Modules, nombrados igual que su componente: `job-card.tsx` → `job-card.module.css`; en rutas, `page.tsx` → `page.module.css`.

## Desarrollo

```bash
cp .env.example .env.local
pnpm dev     # desde la raíz levanta también el Studio
pnpm test
```
