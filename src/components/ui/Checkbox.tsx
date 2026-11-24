'use client'

import type { ComponentProps, ReactNode } from 'react'
import { CheckIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { FieldError, useFieldError } from './FieldError'

type CheckboxProps = Omit<
  ComponentProps<'input'>,
  'type' | 'name' | 'children'
> & {
  name: string
  children: ReactNode
}

export function Checkbox({
  name,
  children,
  className,
  ...props
}: CheckboxProps) {
  const { error, errorId, errorProps } = useFieldError(name)

  return (
    <label
      className={cn(
        'relative flex cursor-pointer items-center gap-13 text-13 leading-24 tracking-body text-ink md:text-14',
        className,
      )}
    >
      <input
        type="checkbox"
        name={name}
        className="peer sr-only"
        {...errorProps}
        {...props}
      />
      <span className="grid size-24 shrink-0 place-items-center border border-gray bg-white text-gray peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue peer-checked:[&>svg]:visible">
        <CheckIcon className="invisible" />
      </span>
      <span>{children}</span>
      <FieldError id={errorId} className="pl-37">
        {error}
      </FieldError>
    </label>
  )
}
