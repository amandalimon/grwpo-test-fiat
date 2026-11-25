'use client'

import type { MouseEvent, Ref, SyntheticEvent } from 'react'
import { Button } from '@/components/ui/Button'
import type { QuoteConfirmation } from '../confirmation'

const actionValue = 'action'

type ConfirmationDialogProps = {
  ref: Ref<HTMLDialogElement>
  confirmation: QuoteConfirmation | null
  subtitle: string
  action: string
  onAction: () => void
}

export function ConfirmationDialog({
  ref,
  confirmation,
  subtitle,
  action,
  onAction,
}: ConfirmationDialogProps) {
  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) event.currentTarget.close()
  }

  function handleClose(event: SyntheticEvent<HTMLDialogElement>) {
    if (event.currentTarget.returnValue === actionValue) onAction()
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-details"
      onClick={closeOnBackdrop}
      onClose={handleClose}
      className="m-auto w-[calc(100%-1.875rem)] max-w-600 bg-white text-center text-ink transition-opacity duration-200 backdrop:bg-ink/60 starting:open:opacity-0"
    >
      {confirmation && (
        <div className="px-15 pt-45 pb-40 md:px-50 md:pt-55 md:pb-50">
          <h2
            id="confirmation-title"
            className="flex rules-24 items-center justify-center gap-14 font-serif text-34 leading-none font-black tracking-title text-balance wrap-anywhere text-red italic md:rules-40 md:gap-20 md:text-44"
          >
            {confirmation.title}
          </h2>
          <p className="mt-11 pl-4.5 text-9 leading-none tracking-caps uppercase">
            {subtitle}
          </p>
          <div
            id="confirmation-details"
            className="mt-30 text-13 leading-24 tracking-body md:text-14"
          >
            <ul>
              {confirmation.details.map(detail => (
                <li key={detail} className="first:font-bold">
                  {detail}
                </li>
              ))}
            </ul>
            <p className="mt-16 text-muted">{confirmation.contact}</p>
          </div>
          <form method="dialog">
            <Button
              type="submit"
              value={actionValue}
              className="mt-32 pr-14 pl-21 whitespace-nowrap md:pr-18 md:pl-25"
            >
              {action}
            </Button>
          </form>
        </div>
      )}
    </dialog>
  )
}
