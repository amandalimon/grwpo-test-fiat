import { cn } from '@/lib/cn'

type EyebrowProps = {
  children: string
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center justify-center gap-23 font-serif text-12 leading-none font-bold tracking-label text-ink uppercase md:rules-64 md:text-13 lg:rules-55 lg:gap-12 lg:text-14',
        className,
      )}
    >
      {children}
    </p>
  )
}
