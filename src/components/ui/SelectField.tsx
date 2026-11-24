import type { ComponentProps } from 'react'
import { ChevronDownIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { FieldLabel } from './FieldLabel'
import { control } from './styles'

type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps = Omit<ComponentProps<'select'>, 'children'> & {
  id: string
  label: string
  options: readonly SelectOption[]
  placeholder?: string
}

export function SelectField({
  id,
  label,
  options,
  placeholder,
  defaultValue = placeholder ? '' : undefined,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative mt-7">
        <select
          id={id}
          name={id}
          defaultValue={defaultValue}
          className={cn(control, 'h-40 cursor-pointer pr-32')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-11 -translate-y-1/2 text-text" />
      </div>
    </div>
  )
}
