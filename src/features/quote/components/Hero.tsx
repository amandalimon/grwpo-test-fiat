import Image from 'next/image'
import car from '@/assets/images/car.png'
import type { HeroContent } from '../types'
import { Eyebrow } from './Eyebrow'

type HeroProps = {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <div className="relative z-10 flex flex-col items-center pt-26.5 text-center md:pt-32.5">
      <p className="text-9 leading-none tracking-caps text-white uppercase">
        {content.overline}
      </p>
      <Eyebrow className="mt-17 md:mt-20">{content.eyebrow}</Eyebrow>
      <h1 className="mt-13 -translate-x-6.5 scale-y-96 font-serif text-hero-sm leading-none font-black tracking-hero text-white italic md:mt-11 md:-translate-x-14 md:text-hero-md lg:mt-11 lg:-translate-x-14 lg:text-hero-lg">
        {content.title}
      </h1>
      <Image
        src={car}
        alt={content.carAlt}
        sizes="(min-width: 1024px) 491px, (min-width: 768px) 388px, 249px"
        quality={90}
        loading="eager"
        fetchPriority="high"
        className="mt-2.5 -mb-48 w-249 -translate-x-1 md:-mt-9.5 md:-mb-38.5 md:w-387 md:translate-x-0 lg:-mt-22.5 lg:-mb-121 lg:w-489 lg:-translate-x-16"
      />
    </div>
  )
}
