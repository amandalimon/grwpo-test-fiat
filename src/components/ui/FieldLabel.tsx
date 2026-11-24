import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { fieldLabel } from './styles'

export function FieldLabel({ className, ...props }: ComponentProps<'label'>) {
  return <label className={cn(fieldLabel, className)} {...props} />
}
