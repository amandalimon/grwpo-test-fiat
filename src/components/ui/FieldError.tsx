'use client'

import { createContext, use } from 'react'
import { cn } from '@/lib/cn'

export type FieldErrors = Partial<Record<string, string>>

export const FieldErrorsContext = createContext<FieldErrors>({})

export function useFieldError(name: string) {
  const error = use(FieldErrorsContext)[name]
  const errorId = `${name}-error`
  return {
    error,
    errorId,
    errorProps: {
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId : undefined,
    },
  }
}

type FieldErrorProps = {
  id: string
  className?: string
  children?: string
}

export function FieldError({ id, className, children }: FieldErrorProps) {
  if (!children) return null
  return (
    <p
      id={id}
      className={cn(
        'absolute top-full left-0 mt-4 pl-10 text-11 leading-14 tracking-body text-crimson',
        className,
      )}
    >
      {children}
    </p>
  )
}
