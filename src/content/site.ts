import type { SiteContent } from './types'

const siteContent: SiteContent = {
  brandName: 'FIAT',
  navigation: [
    { label: 'Modelos', href: '#modelos' },
    { label: 'Prueba de manejo', href: '#prueba-de-manejo' },
    { label: 'Cotizar', href: '#cotizar' },
    { label: 'Promociones', href: '#promociones' },
    { label: 'Distribuidores', href: '#distribuidores', desktopOnly: true },
  ],
}

export async function getSiteContent(): Promise<SiteContent> {
  return siteContent
}
