import { cacheLife } from 'next/cache'
import { fetchDocument } from '@/lib/sanity'
import type { NavigationLink, SiteContent } from './types'

type SiteDocument = {
  brandName: string
  navigation: NavigationLink[]
}

export const siteContent: SiteContent = {
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
  'use cache'
  cacheLife('minutes')

  const document = await fetchDocument<SiteDocument>('site')
  if (!document) return siteContent

  return {
    brandName: document.brandName,
    navigation: document.navigation.map(({ label, href, desktopOnly }) => ({
      label,
      href,
      desktopOnly,
    })),
  }
}
