import { cn } from '@/lib/cn'

export const focusRing = 'outline-offset-2 outline-blue focus-visible:outline-2'

export const fieldLabel =
  'block pl-10 text-11 leading-11 tracking-field whitespace-nowrap text-muted uppercase'

export const controlText =
  'text-11 font-black tracking-field text-text uppercase'

export const control = cn(
  'block w-full rounded-none border border-red bg-white px-9 pb-3 placeholder:text-text',
  controlText,
  focusRing,
)
