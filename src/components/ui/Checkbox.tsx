import type { ComponentProps, ReactNode } from 'react'
import { CheckIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'children'> & {
  children: ReactNode
}

export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-13 text-13 leading-24 tracking-body text-ink',
        className,
      )}
    >
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="grid size-24 shrink-0 place-items-center border border-gray bg-white text-gray peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue peer-checked:[&>svg]:visible">
        <CheckIcon className="invisible" />
      </span>
      <span>{children}</span>
    </label>
  )
}
