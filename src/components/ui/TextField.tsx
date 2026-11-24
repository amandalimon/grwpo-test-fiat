'use client'

import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { FieldError, useFieldError } from './FieldError'
import { FieldLabel } from './FieldLabel'
import { control } from './styles'

type TextFieldProps = ComponentProps<'input'> & {
  id: string
  label: string
}

export function TextField({ id, label, className, ...props }: TextFieldProps) {
  const { error, errorId, errorProps } = useFieldError(id)

  return (
    <div className={cn('relative', className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={id}
        {...errorProps}
        className={cn(control, 'mt-7 h-40')}
        {...props}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
