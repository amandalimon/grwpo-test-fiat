'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { FieldError, useFieldError } from './FieldError'
import { controlText, fieldLabel, focusRing } from './styles'

type Segment = {
  value: string
  label: string
  icon?: ReactNode
}

type SegmentedControlProps = {
  name: string
  legend: string
  segments: readonly Segment[]
  defaultValue: string
  className?: string
}

export function SegmentedControl({
  name,
  legend,
  segments,
  defaultValue,
  className,
}: SegmentedControlProps) {
  const hasIcons = segments.some(segment => segment.icon)
  const layout = hasIcons
    ? 'h-50 flex-col gap-3 md:h-40 md:flex-row md:gap-29 lg:gap-31'
    : 'h-40'

  const { error, errorId, errorProps } = useFieldError(name)

  return (
    <fieldset
      className={cn('relative', className)}
      aria-describedby={errorProps['aria-describedby']}
    >
      <legend className={cn(fieldLabel, 'float-left w-full')}>{legend}</legend>
      <div className="clear-both grid auto-cols-fr grid-flow-col pt-7">
        {segments.map(({ value, label, icon }) => (
          <label
            key={value}
            className={cn(
              'relative -ml-1 flex cursor-pointer items-center justify-center border border-red bg-white first:ml-0 has-checked:z-10 has-checked:bg-red has-checked:text-white has-focus-visible:z-20 has-focus-visible:outline-2',
              focusRing,
              layout,
              icon ? 'pb-1' : 'pt-0.5',
              'md:pt-0 md:pb-1.5',
              controlText,
            )}
          >
            <input
              type="radio"
              name={name}
              value={value}
              defaultChecked={value === defaultValue}
              className="sr-only"
            />
            {icon && <span className="flex h-11 items-center">{icon}</span>}
            {label}
          </label>
        ))}
      </div>
      <FieldError id={errorId}>{error}</FieldError>
    </fieldset>
  )
}
