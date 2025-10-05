'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForHero } from '@/sanity/lib/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// TypeScript interfaces
interface SliderImage {
  image: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  alt: string
  caption?: string
}

interface SliderSettings {
  autoplay?: boolean
  interval?: number
  showNavigation?: boolean
  showDots?: boolean
  pauseOnHover?: boolean
}

interface HeroSliderProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  sliderImages: SliderImage[]
  sliderSettings?: SliderSettings
  backgroundImage?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
}



export default function HeroSlider({
  title,
  subtitle,
  ctaText,
  ctaLink,
  sliderImages,
  sliderSettings,
  backgroundImage
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(sliderSettings?.autoplay ?? true)
  const [isPaused, setIsPaused] = useState(false)

  // Use slider images if available, otherwise fallback to background image
  const images = sliderImages && sliderImages.length > 0 ? sliderImages : 
    backgroundImage ? [{ 
      image: backgroundImage, 
      alt: backgroundImage.alt || 'Hero Background',
      caption: undefined 
    }] : []

  const settings = {
    autoplay: sliderSettings?.autoplay ?? true,
    interval: (sliderSettings?.interval ?? 5) * 1000, // Convert to milliseconds
    showNavigation: sliderSettings?.showNavigation ?? true,
    showDots: sliderSettings?.showDots ?? true,
    pauseOnHover: sliderSettings?.pauseOnHover ?? true
  }

  // Auto-play functionality
  useEffect(() => {
    if (!settings.autoplay || isPaused || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, settings.interval)

    return () => clearInterval(timer)
  }, [settings.autoplay, settings.interval, isPaused, images.length])

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }, [images.length])

  // Pause/resume on hover
  const handleMouseEnter = useCallback(() => {
    if (settings.pauseOnHover) {
      setIsPaused(true)
    }
  }, [settings.pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (settings.pauseOnHover) {
      setIsPaused(false)
    }
  }, [settings.pauseOnHover])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  if (images.length === 0) {
    // Fallback when no images are available
    return (
      <section 
        className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] max-h-[800px] bg-gradient-to-br from-primary via-primary to-primary-dark text-white overflow-hidden"
        role="banner"
        aria-label="Hero section"
      >
        {/* Fallback background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-32 lg:items-start lg:pt-32 lg:pl-64">
          <div className="max-w-4xl text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              {title}
            </h1>
            <p className="text-md sm:text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-lg mx-auto lg:mx-0">
              {subtitle}
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link
                href={ctaLink}
                className="inline-block bg-white hover:bg-gray-100 text-primary font-semibold px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] max-h-[800px] bg-gradient-to-br from-primary via-primary to-primary-dark text-white overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="banner"
      aria-label="Hero section with image slider"
    >
      {/* Image Slider */}
      <div className="absolute inset-0 z-0">
        {images.map((slideImage, index) => (
          <div
            key={`${slideImage.image.asset._id}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={urlForHero(slideImage.image).url()}
              alt={slideImage.alt || `Hero slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Caption overlay */}
            {slideImage.caption && (
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
                <p className="text-sm font-medium">{slideImage.caption}</p>
              </div>
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-0 flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-32 lg:items-start lg:pt-32 lg:pl-64">
        <div className="max-w-4xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-lg mx-auto lg:mx-0">
            {subtitle}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              href={ctaLink}
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {settings.showNavigation && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {settings.showDots && images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}



      {/* Slide Progress Indicator */}
      {settings.autoplay && images.length > 1 && !isPaused && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-40">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / images.length) * 100}%`
            }}
          />
        </div>
      )}
    </section>
  )
}