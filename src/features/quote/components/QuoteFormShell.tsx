'use client'

import {
  createContext,
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type SubmitEvent,
  type SyntheticEvent,
} from 'react'
import {
  FieldErrorsContext,
  type FieldErrors,
} from '@/components/ui/FieldError'
import { fillTemplate } from '@/lib/fill-template'
import { submitQuote, type QuoteFormState } from '../actions'
import {
  createQuoteSchema,
  parseQuote,
  toQuoteErrors,
  type QuoteErrors,
  type QuoteSchemaContent,
} from '../schema'
import type { SubmissionContent } from '../types'
import { ConfirmationDialog } from './ConfirmationDialog'

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

type QuoteFormShellProps = {
  id: string
  label: string
  messages: SubmissionContent
  schemaContent: QuoteSchemaContent
  className?: string
  children: ReactNode
}

const initialState: QuoteFormState = { status: 'idle' }

const noErrors: QuoteErrors = { fields: {} }

const pluralRules = new Intl.PluralRules('es-MX')

export const QuoteFormPendingContext = createContext(false)

function isField(element: unknown): element is Field {
  return (
    (element instanceof HTMLInputElement && element.type !== 'hidden') ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  )
}

function focusFirstError(form: HTMLFormElement, errors: FieldErrors) {
  Array.from(form.elements)
    .filter(isField)
    .find(field => errors[field.name])
    ?.focus()
}

export function QuoteFormShell({
  id,
  label,
  messages,
  schemaContent,
  className,
  children,
}: QuoteFormShellProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const schema = useMemo(
    () => createQuoteSchema(schemaContent),
    [schemaContent],
  )
  const [state, formAction, pending] = useActionState(submitQuote, initialState)
  const [errors, setErrors] = useState<QuoteErrors>(noErrors)
  const [attempted, setAttempted] = useState(false)
  const [handledState, setHandledState] = useState(state)

  if (state !== handledState) {
    setHandledState(state)
    setErrors(state.status === 'error' ? state.errors : noErrors)
    if (state.status === 'success') setAttempted(false)
  }

  useEffect(() => {
    const form = formRef.current
    if (!form) return
    if (state.status === 'success') {
      form.reset()
      if (dialogRef.current) {
        dialogRef.current.returnValue = ''
        dialogRef.current.showModal()
      }
    }
    if (state.status === 'error') focusFirstError(form, state.errors.fields)
  }, [state])

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    const form = event.currentTarget
    const formData = new FormData(form)
    const result = parseQuote(schema, formData)

    setAttempted(true)

    if (!result.success) {
      const nextErrors = toQuoteErrors(result.error)
      setErrors(nextErrors)
      focusFirstError(form, nextErrors.fields)
      return
    }

    setErrors(noErrors)

    startTransition(() => formAction(formData))
  }

  function revalidate(event: SyntheticEvent<HTMLFormElement>, force: boolean) {
    const { target } = event
    if (!isField(target) || (!force && !fieldErrors[target.name])) return

    const result = parseQuote(schema, new FormData(event.currentTarget))
    const next = result.success ? noErrors : toQuoteErrors(result.error)
    const nextFields: FieldErrors = next.fields

    setErrors(previous => ({
      form: next.form,
      fields: { ...previous.fields, [target.name]: nextFields[target.name] },
    }))
  }

  function startNewQuote() {
    const firstField = Array.from(formRef.current?.elements ?? []).find(isField)
    firstField?.focus()
  }

  const fieldErrors: FieldErrors = errors.fields
  const errorCount = Object.values(fieldErrors).filter(Boolean).length
  const errorSummary = errorCount
    ? fillTemplate(
        messages.errorSummary[
          pluralRules.select(errorCount) === 'one' ? 'one' : 'other'
        ],
        { count: errorCount },
      )
    : ''

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        noValidate
        onSubmit={handleSubmit}
        onChange={event => revalidate(event, false)}
        onBlur={event => attempted && revalidate(event, true)}
        id={id}
        aria-label={label}
        aria-busy={pending}
        className={className}
      >
        <QuoteFormPendingContext value={pending}>
          <FieldErrorsContext value={fieldErrors}>
            {children}
          </FieldErrorsContext>
        </QuoteFormPendingContext>
        {errors.form ? (
          <p
            role="alert"
            className="mt-24 text-center text-13 leading-24 tracking-body text-crimson md:text-right md:text-14"
          >
            {errors.form}
          </p>
        ) : (
          <p role="status" className="sr-only">
            {errorSummary}
          </p>
        )}
      </form>
      <ConfirmationDialog
        ref={dialogRef}
        confirmation={state.status === 'success' ? state.confirmation : null}
        subtitle={messages.confirmation.subtitle}
        action={messages.confirmation.newQuote}
        onAction={startNewQuote}
      />
    </>
  )
}
