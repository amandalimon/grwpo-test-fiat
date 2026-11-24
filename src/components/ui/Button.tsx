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
        'h-45 cursor-pointer border border-red bg-white pb-2 pl-4 text-11 font-black tracking-button text-ink uppercase transition-colors hover:bg-red hover:text-white',
        focusRing,
        className,
      )}
      {...props}
    />
  )
}
