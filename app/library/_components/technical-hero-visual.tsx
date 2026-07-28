'use client'

import HeroCarousel, { Slide } from '../../components/hero-carousel'
import { LibraryHeroSlide } from '@/lib/data'
import MermaidChart from '../../projects/_components/mermaid-chart'

interface TechnicalHeroVisualProps {
  slides?: LibraryHeroSlide[]
}

export default function TechnicalHeroVisual({ slides = [] }: TechnicalHeroVisualProps) {
  const heroSlides: Slide[] = slides.map((slide, index) => {
    if (slide.type === 'image') {
      return {
        label: slide.caption || `IMG_${String(index + 1).padStart(2, '0')}`,
        thumbnail: slide.thumbnail ?? slide.src,
        content: (
          <img
            src={slide.src}
            alt={slide.alt || slide.caption || ''}
            className="w-full h-full object-contain"
          />
        )
      }
    }

    return {
      label: slide.caption || `DIAG_${String(index + 1).padStart(2, '0')}`,
      thumbnail: slide.thumbnail,
      content: (
        <div className="w-full h-full overflow-auto p-2">
          <MermaidChart chart={slide.definition} />
        </div>
      )
    }
  })

  if (heroSlides.length === 0) {
    return (
      <div className="w-full aspect-[4/3] border border-border bg-bg flex items-center justify-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
          NO VISUAL DATA
        </span>
      </div>
    )
  }

  return <HeroCarousel slides={heroSlides} />
}
