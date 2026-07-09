import HeroCarousel, { Slide } from '../../components/hero-carousel'
import { LibraryVisualSlide } from '@/lib/markdown'

interface TechnicalHeroVisualProps {
  slides?: LibraryVisualSlide[]
}

export default function TechnicalHeroVisual({ slides = [] }: TechnicalHeroVisualProps) {
  const heroSlides: Slide[] = slides.map((slide) => ({
    label: slide.label,
    content: (
      <div
        className="w-full h-full flex items-center justify-center [&_img]:max-w-full [&_img]:max-h-full [&_img]:object-contain [&_svg]:w-full [&_svg]:h-full"
        dangerouslySetInnerHTML={{ __html: slide.html }}
      />
    )
  }))

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
