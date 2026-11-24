import { cn } from '@/lib/cn'

export const focusRing = 'outline-offset-2 outline-blue focus-visible:outline-2'

export const fieldLabel =
  'block pl-10 text-12 leading-none tracking-label whitespace-nowrap text-muted uppercase'

export const controlText =
  'text-12 font-black tracking-label text-text uppercase'

export const control = cn(
  'block w-full rounded-none border border-red bg-white px-9 placeholder:text-text',
  controlText,
  focusRing,
)
