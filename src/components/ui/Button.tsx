import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { focusRing } from './styles'

export function Button({
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={cn(
        'h-45 cursor-pointer border border-red bg-white pl-6 text-12 font-black tracking-caps text-ink uppercase transition-colors hover:bg-red hover:text-white',
        focusRing,
        className,
      )}
      {...props}
    />
  )
}
