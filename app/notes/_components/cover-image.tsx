interface CoverImageProps {
  src: string
  alt: string
}

export default function CoverImage({ src, alt }: CoverImageProps) {
  return (
    <div className="border border-border overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-56 sm:h-72 lg:h-80 object-cover grayscale contrast-75"
      />
    </div>
  )
}
