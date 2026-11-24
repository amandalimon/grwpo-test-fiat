import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { FieldLabel } from './FieldLabel'
import { control } from './styles'

type TextFieldProps = ComponentProps<'input'> & {
  id: string
  label: string
}

export function TextField({ id, label, className, ...props }: TextFieldProps) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={id}
        className={cn(control, 'mt-6 h-40')}
        {...props}
      />
    </div>
  )
}
