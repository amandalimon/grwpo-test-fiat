import { Lato } from 'next/font/google'
import localFont from 'next/font/local'

export const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
})

export const playfairDisplay = localFont({
  src: [
    {
      path: './fonts/PlayfairDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/PlayfairDisplay-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  variable: '--font-playfair-display',
})
