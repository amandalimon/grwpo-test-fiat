import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
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
  return (
    <div className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        name={id}
        className={cn(
          control,
          'mt-6 h-75 resize-none py-5 pl-8 placeholder:font-normal md:h-170',
        )}
        {...props}
      />
    </div>
  )
}
