import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/images/logo-fiat.png'
import { MenuIcon } from '@/components/icons'
import { focusRing } from '@/components/ui/styles'
import type { SiteContent } from '@/content/types'
import { ui } from '@/content/ui'
import { cn } from '@/lib/cn'

type HeaderProps = {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  return (
    <header className="relative z-20 h-50 border-b border-line bg-white">
      <div className="relative mx-auto flex h-full max-w-994 items-center justify-end">
        <Link
          href="/"
          className={cn('absolute -top-12 -left-7 rounded-full', focusRing)}
        >
          <Image
            src={logo}
            alt={content.brandName}
            loading="eager"
            unoptimized
          />
        </Link>
        <nav
          aria-label={ui.mainNavigation}
          className="hidden md:mt-3 md:mr-75 md:ml-99 md:block md:flex-1"
        >
          <ul className="flex justify-between font-nav text-11 font-bold tracking-body text-text uppercase">
            {content.navigation.map(link => (
              <li
                key={link.href}
                className={cn(link.desktopOnly && 'hidden lg:block')}
              >
                <a href={link.href} className={focusRing}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          aria-label={ui.openMenu}
          className={cn(
            'mt-18 mr-30 flex cursor-pointer self-start text-crimson md:mr-23',
            focusRing,
          )}
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}
