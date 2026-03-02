import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useState } from 'react'

interface ImageSliderProps {
  images: string[]
  alt: string
}

const ImageSlider = ({ images, alt }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  if (images.length === 0) return null

  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[0]} alt={alt} className="w-full h-auto rounded-lg" loading="lazy" />
      </div>
    )
  }

  return (
    <div>
      {/* Image + arrows wrapper */}
      <div className="relative overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[currentIndex]}
          alt={`${alt} — ${currentIndex + 1} of ${images.length}`}
          className="w-full h-auto transition-opacity rounded-lg duration-300"
          loading="lazy"
        />

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute flex items-center justify-center w-10 h-10 text-white transition-colors -translate-y-1/2 rounded-full left-3 top-1/2 bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute flex items-center justify-center w-10 h-10 text-white transition-colors -translate-y-1/2 rounded-full right-3 top-1/2 bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators — outside the image */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all focus:outline-none ${
              index === currentIndex
                ? 'w-6 bg-primary-500 dark:bg-primary-400'
                : 'w-2.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
