import type { SiteContent } from './types'

const siteContent: SiteContent = {
  brandName: 'FIAT',
  navigation: [
    { label: 'Modelos', href: 'https://www.fiat.com.mx/' },
    {
      label: 'Prueba de manejo',
      href: 'https://www.fiat.com.mx/prueba-de-manejo.html',
    },
    { label: 'Cotizar', href: '#cotizar' },
    {
      label: 'Promociones',
      href: 'https://www.fiat.com.mx/promociones.html',
    },
    {
      label: 'Distribuidores',
      href: 'https://www.fiat.com.mx/distribuidores.html',
      desktopOnly: true,
    },
  ],
}

export async function getSiteContent(): Promise<SiteContent> {
  return siteContent
}
