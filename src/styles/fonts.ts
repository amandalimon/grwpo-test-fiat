import { Lato, Playfair_Display } from 'next/font/google'

export const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
})

export const playfairDisplay = Playfair_Display({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
})
