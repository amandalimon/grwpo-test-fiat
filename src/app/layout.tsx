import type { Metadata } from 'next'
import { lato, playfairDisplay } from '@/styles/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cotizador FIAT',
  description:
    'Cotiza tu FIAT: elige modelo, versión y forma de pago, y un distribuidor te contactará.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es-MX"
      className={`${lato.variable} ${playfairDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
