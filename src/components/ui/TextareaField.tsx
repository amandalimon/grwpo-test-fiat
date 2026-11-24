'use client'

import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { FieldError, useFieldError } from './FieldError'
import { FieldLabel } from './FieldLabel'
import { control } from './styles'

type TextareaFieldProps = ComponentProps<'textarea'> & {
  id: string
  label: string
}

export function TextareaField({
  id,
  label,
  className,
  ...props
}: TextareaFieldProps) {
  const { error, errorId, errorProps } = useFieldError(id)

  return (
    <div className={cn('relative', className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        name={id}
        {...errorProps}
        className={cn(
          control,
          'mt-7 h-75 resize-none py-5 pl-8 placeholder:font-normal md:h-170',
        )}
        {...props}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
