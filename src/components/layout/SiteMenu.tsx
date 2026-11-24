'use client'

import type { MouseEvent } from 'react'
import { focusRing } from '@/components/ui/styles'
import type { NavigationLink } from '@/content/types'
import { cn } from '@/lib/cn'

type SiteMenuProps = {
  id: string
  label: string
  links: readonly NavigationLink[]
}

export function SiteMenu({ id, label, links }: SiteMenuProps) {
  function closeOnNavigate(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof Element && event.target.closest('a')) {
      event.currentTarget.hidePopover()
    }
  }

  return (
    <nav
      id={id}
      popover="auto"
      aria-label={label}
      onClick={closeOnNavigate}
      className="absolute inset-x-0 top-50 bottom-auto m-0 h-auto w-auto border-b border-line bg-white px-15 md:right-[max(0rem,calc((100%-62.125rem)/2))] md:left-auto md:w-260 md:border md:border-t-0 md:px-24"
    >
      <ul>
        {links.map(link => (
          <li key={link.href} className="border-b border-line last:border-b-0">
            <a
              href={link.href}
              className={cn(
                'flex h-48 items-center font-nav text-11 font-bold tracking-nav text-text uppercase transition-colors hover:text-red',
                focusRing,
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
