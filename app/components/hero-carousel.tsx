'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel'

export type Slide = {
  label: string
  thumbnail?: string
  content: React.ReactNode
}

interface HeroCarouselProps {
  slides: Slide[]
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = React.useState(0)

  const visibleSlides = slides.slice(0, 5)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  if (visibleSlides.length === 0) return null

  return (
    <div className="border border-border bg-bg-primary p-4">
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: visibleSlides.length > 1 }}
        className="w-full"
      >
        <div className="relative aspect-[4/3] border border-border bg-bg mb-4 overflow-hidden">
          <CarouselContent className="ml-0 h-full">
            {visibleSlides.map((slide) => (
              <CarouselItem key={slide.label} className="pl-0 h-full">
                {slide.content}
              </CarouselItem>
            ))}
          </CarouselContent>

          {visibleSlides.length > 1 && (
            <>
              <CarouselPrevious className="left-2 h-8 w-8 rounded-none border-border bg-bg text-text hover:bg-bg hover:text-accent" />
              <CarouselNext className="right-2 h-8 w-8 rounded-none border-border bg-bg text-text hover:bg-bg hover:text-accent" />
            </>
          )}
        </div>
      </Carousel>

      <div className="grid grid-cols-5 gap-2">
        {visibleSlides.map((slide, index) => (
          <button
            key={slide.label}
            onClick={() => scrollTo(index)}
            className={`aspect-square border transition-colors duration-150 hover:border-text ${
              index === activeIndex
                ? 'border-accent'
                : 'border-border opacity-60 hover:opacity-100'
            }`}
          >
            <div className="w-full h-full bg-bg flex items-center justify-center p-1 overflow-hidden">
              {slide.thumbnail ? (
                <img
                  src={slide.thumbnail}
                  alt={slide.label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[8px] font-mono uppercase tracking-wider text-text-secondary text-center leading-tight">
                  {slide.label}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
