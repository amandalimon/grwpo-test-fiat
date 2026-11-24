import Image from 'next/image'
import car from '@/assets/images/car.png'
import type { HeroContent } from '@/content/types'
import { Eyebrow } from './Eyebrow'

type HeroProps = {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <div className="relative z-10 flex flex-col items-center pt-26.5 text-center">
      <p className="text-9 leading-none tracking-caps text-white uppercase">
        {content.overline}
      </p>
      <Eyebrow className="mt-17">{content.eyebrow}</Eyebrow>
      <h1 className="mt-11 -translate-x-7 scale-y-96 font-serif text-44 leading-none font-black tracking-hero text-white italic">
        {content.title}
      </h1>
      <Image
        src={car}
        alt={content.carAlt}
        sizes="(min-width: 1024px) 491px, (min-width: 768px) 388px, 249px"
        quality={90}
        loading="eager"
        fetchPriority="high"
        className="mt-4.5 -mb-48 w-249 -translate-x-1"
      />
    </div>
  )
}
