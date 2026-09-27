// Shared option lists. The web app reads these values back from the content,
// so keep them in sync with web/modules/shared/utils/provinces.ts.
export const PROVINCES = [
  'CABA',
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
]

export const MODALITIES = [
  {title: 'Presencial', value: 'presencial'},
  {title: 'Remoto', value: 'remoto'},
  {title: 'Híbrido', value: 'hibrido'},
]

export const WORKING_DAYS = [
  {title: 'Jornada completa', value: 'full-time'},
  {title: 'Media jornada', value: 'part-time'},
  {title: 'Por turnos', value: 'shifts'},
  {title: 'Fines de semana', value: 'weekends'},
  {title: 'Eventual', value: 'temporary'},
]
