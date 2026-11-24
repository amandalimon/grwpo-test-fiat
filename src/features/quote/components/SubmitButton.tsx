'use client'

import { use } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { QuoteFormPendingContext } from './QuoteFormShell'

type SubmitButtonProps = {
  label: string
  pendingLabel: string
  className?: string
}

export function SubmitButton({
  label,
  pendingLabel,
  className,
}: SubmitButtonProps) {
  const pending = use(QuoteFormPendingContext)

  return (
    <Button
      type="submit"
      aria-disabled={pending || undefined}
      className={cn(
        'aria-disabled:cursor-wait aria-disabled:bg-red aria-disabled:text-white',
        className,
      )}
    >
      {pending ? pendingLabel : label}
    </Button>
  )
}
