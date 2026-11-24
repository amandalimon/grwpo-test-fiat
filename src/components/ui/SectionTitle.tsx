import { cn } from '@/lib/cn'

type SectionTitleProps = {
  id: string
  title: string
  subtitle: string
  className?: string
}

export function SectionTitle({
  id,
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <header className={cn('text-center', className)}>
      <h2
        id={id}
        className="flex items-center justify-center gap-20 font-serif text-34 leading-none font-black tracking-title text-red italic md:rules-98 md:text-44 lg:rules-170 lg:text-48"
      >
        {title}
      </h2>
      <p className="mt-11 pl-4.5 text-9 leading-none tracking-caps text-ink uppercase">
        {subtitle}
      </p>
    </header>
  )
}
