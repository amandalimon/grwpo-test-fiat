import type { Option, QuoteFormContent } from './types'

const toOptions = (labels: string[]): Option[] =>
  labels.map(label => ({
    value: label
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    label,
  }))

const quoteFormContent: QuoteFormContent = {
  hero: {
    overline: 'Cotizador',
    eyebrow: 'Citadino, aventurero, deportivo',
    title: 'Elige el tuyo',
    carAlt: 'FIAT 500L Trekking rojo',
  },
  vehicle: {
    legend: 'Elige tu FIAT',
    placeholder: 'Selecciona',
    model: {
      label: 'Modelo',
      options: toOptions([
        '500',
        '500L',
        '500L Trekking',
        '500X',
        '124 Spider',
      ]),
    },
    version: {
      label: 'Versión',
      options: toOptions(['Pop', 'Easy', 'Lounge', 'Trekking', 'Sport']),
    },
    state: {
      label: 'Estado',
      options: toOptions([
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Ciudad de México',
        'Coahuila',
        'Colima',
        'Durango',
        'Estado de México',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Michoacán',
        'Morelos',
        'Nayarit',
        'Nuevo León',
        'Oaxaca',
        'Puebla',
        'Querétaro',
        'Quintana Roo',
        'San Luis Potosí',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz',
        'Yucatán',
        'Zacatecas',
      ]),
    },
    dealer: {
      label: 'Distribuidor',
      options: toOptions([
        'FIAT Saltillo',
        'FIAT Monterrey Valle',
        'FIAT Guadalajara',
        'FIAT Ciudad de México Polanco',
        'FIAT Puebla',
      ]),
    },
  },
  personalData: {
    title: 'Datos personales',
    subtitle: 'Escribe tus datos personales',
    firstName: { label: 'Nombre (s)', placeholder: 'Ej. Juan' },
    lastName: { label: 'Apellido paterno', placeholder: 'Ej. López' },
    secondLastName: { label: 'Apellido materno', placeholder: 'Ej. Tovar' },
    email: { label: 'Email', placeholder: 'tu@email.com' },
    phone: { label: 'Teléfono', placeholder: '01 . 844 . 439 . 06' },
    contactMethod: {
      legend: 'Deseo ser contactado por',
      defaultValue: 'phone',
      options: [
        { value: 'phone', label: 'Teléfono', icon: 'phone' },
        { value: 'email', label: 'Email', icon: 'email' },
        { value: 'both', label: 'Ambos' },
      ],
    },
  },
  payment: {
    title: 'Forma de pago',
    subtitle: 'Personaliza tu cotización',
    method: {
      legend: 'Elige tu tipo de pago',
      defaultValue: 'credit',
      options: [
        { value: 'cash', label: 'Contado' },
        { value: 'credit', label: 'Crédito' },
      ],
    },
    downPayment: { label: 'Cantidad de enganche', placeholder: '80, 000.00' },
    term: {
      label: 'Plazo',
      defaultValue: '72',
      options: [12, 24, 36, 48, 60, 72].map(months => ({
        value: String(months),
        label: `${months} meses`,
      })),
    },
  },
  comments: {
    title: 'Comentarios',
    subtitle: 'Nos importan tus comentarios',
    message: { label: '¿Dudas? ¿Comentarios?', placeholder: 'Escríbenos' },
  },
  consents: {
    privacy: {
      before: 'He leído y acepto el ',
      link: 'aviso de privacidad',
      href: '#aviso-de-privacidad',
    },
    promotions: 'No deseo recibir promociones',
    submit: 'Enviar',
  },
}

export async function getQuoteFormContent(): Promise<QuoteFormContent> {
  return quoteFormContent
}
