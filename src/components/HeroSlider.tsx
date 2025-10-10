'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForHero } from '@/sanity/lib/image'

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
  title?: string
  subtitle?: string
  caption?: string
}

interface SliderSettings {
  autoplay?: boolean
  interval?: number
  autoPlay?: boolean // Alternative CMS naming
  autoPlayInterval?: number // Alternative CMS naming
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

// Function to clean corrupted Unicode characters
function cleanText(text: string | undefined | null): string {
  if (!text || typeof text !== 'string') return ''
  
  // Remove Unicode corruption patterns and zero-width characters
  return text
    .replace(/​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌﻿​﻿‌‍​‌‌‍﻿‍‌‍‍‌‌﻿‌​‌﻿‍‌​‍﻿‍‌‍‍‌‌‍﻿﻿​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​‌﻿​﻿​﻿‍‍​‍﻿﻿​‍﻿﻿‌﻿​​‌‍‍‌‌﻿‌﻿‌‍﻿‌‌﻿‍​​﻿‌‍‌‍‌‍‌‍‍​​‍﻿‍‌﻿​﻿‌‍​‌‌‍﻿‍‌‍‍‌‌﻿‌​‌﻿‍‌​‍﻿‍‌﻿​﻿‌﻿‌​‌﻿‌‌‌‍‌​‌‍‍‌‌‍﻿﻿​‍﻿﻿‌‍‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿﻿‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​​‍﻿﻿‌‍﻿‌‌‍﻿﻿‌‍‌​‌‍‌‌​﻿﻿‌‌﻿​​‌﻿​‍‌‍‌‌‌﻿​﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌‍​‌‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌‍‍‌‌‍‌​​﻿﻿‌‌‍‍​‌‍‌‌‌﻿​‍‌‍﻿﻿‌‌​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌﻿‌​‌﻿‍‌‌﻿​​‌‍‌‌​﻿﻿‌‌‍‍​‌‍‌‌‌﻿​‍‌‍﻿﻿‌‌​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌﻿​​‌‍​‌‌﻿‌​‌‍‍​​﻿﻿‌‌﻿​﻿‌‍﻿​‌‍‍‌‌‍‌​‌‍‌‌‌﻿​‍‌​‍‌‌‍﻿‌‌‍​‌‌‍‌﻿‌‍‌‌‌﻿​﻿​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍​﻿‌﻿​﻿‍​​﻿​‍​﻿‍‌​﻿​‌​﻿‍‌‌‍‌‍‌‍​﻿‌‍‌‍​﻿​﻿​﻿‍​‌‍​‌​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​﻿‌‍​‌‌﻿​​‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​‍‌‍‌﻿​​‌‍‌‌‌﻿​‍‌﻿​﻿‌﻿​​‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌﻿‌‍‌‍‌‌​﻿﻿‌‌﻿​​‌﻿‌‌‌‍​‍‌‍﻿​‌‍‍‌‌﻿​﻿‌‍‍​‌‍‌‌‌‍‌​​‍​‍‌﻿﻿‌/g, '')
    .replace(/[​‌‍﻿]/g, '') // Remove any remaining zero-width characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove additional zero-width characters
    .trim()
}

export default function HeroSlider({
  title: globalTitle,
  subtitle: globalSubtitle,
  ctaText,
  ctaLink,
  sliderImages,
  sliderSettings,
  backgroundImage
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  
  // Touch/swipe handling refs
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Clean the text data
  const cleanTitle = cleanText(globalTitle) || 'Mahabbatussholihin Tour & Travel'
  const cleanSubtitle = cleanText(globalSubtitle) || 'Mendampingi Jamaah Haji dan Umroh, InsyaAllah Amanah dalam memberangkatkan para Jamaah ke tanah suci'
  const cleanCtaText = cleanText(ctaText) || 'Info lebih lanjut'
  const cleanCtaLink = cleanText(ctaLink) || 'https://wa.me/6287770005801'

  // Default settings - remove navigation, dots, and pause on hover
  const settings = useMemo(() => {
    // Handle both CMS naming conventions and null values
    const autoplayValue = sliderSettings?.autoplay ?? sliderSettings?.autoPlay ?? true
    const intervalValue = sliderSettings?.interval ?? sliderSettings?.autoPlayInterval ?? 5
    
    return {
      autoplay: autoplayValue,
      interval: intervalValue < 100 ? intervalValue * 1000 : intervalValue, // Convert seconds to milliseconds if needed
      ...sliderSettings,
      // Override these settings regardless of what comes from CMS
      showNavigation: false,
      showDots: false,
      pauseOnHover: false
    }
  }, [sliderSettings])

  // Use slider images if available, otherwise fallback to background image
  const images = sliderImages && sliderImages.length > 0 
    ? sliderImages.map(img => ({
        ...img,
        alt: cleanText(img.alt) || 'Hero image',
        caption: cleanText(img.caption),
        title: cleanText(img.title),
        subtitle: cleanText(img.subtitle)
      }))
    : backgroundImage 
    ? [{ 
        image: backgroundImage, 
        alt: cleanText(backgroundImage.alt) || 'Hero background',
        caption: undefined,
        title: undefined,
        subtitle: undefined
      }] 
    : []

  // Get current slide's text content or fallback to global
  const currentImage = images[currentSlide]
  const displayTitle = currentImage?.title || cleanTitle
  const displaySubtitle = currentImage?.subtitle || cleanSubtitle

  // Auto-play functionality
  useEffect(() => {
    if (!settings.autoplay || !isPlaying || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, settings.interval)

    return () => clearInterval(interval)
  }, [settings.autoplay, settings.interval, isPlaying, images.length])

  // Navigation functions
  const goToNext = useCallback(() => {
    if (images.length > 1) {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }
  }, [images.length])

  const goToPrevious = useCallback(() => {
    if (images.length > 1) {
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
    }
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentSlide(index)
    }
  }, [images.length])

  // Touch/Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && images.length > 1) {
      goToNext()
    }
    if (isRightSwipe && images.length > 1) {
      goToPrevious()
    }
  }

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
  }, [goToNext, goToPrevious])

  // Fallback UI when no images are available
  if (!images || images.length === 0) {
    return (
      <section className="relative h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">{displayTitle}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white">{displaySubtitle}</p>
          <Link
            href={cleanCtaLink}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            target={cleanCtaLink.startsWith('http') ? '_blank' : '_self'}
            rel={cleanCtaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {cleanCtaText}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section 
      className="relative h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((slideImage, index) => (
          <div
            key={`slide-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={urlForHero(slideImage.image).url()}
              alt={slideImage.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Slide Caption */}
            {slideImage.caption && (
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
                <p className="text-sm font-medium">{slideImage.caption}</p>
              </div>
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-32 lg:items-start lg:pt-32 lg:pl-64">
        <div className="max-w-4xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            {displayTitle}
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-2xl mx-auto lg:mx-0 leading-relaxed">
            {displaySubtitle}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              href={cleanCtaLink}
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl "
              target={cleanCtaLink.startsWith('http') ? '_blank' : '_self'}
              rel={cleanCtaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {cleanCtaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Dot Indicators - Desktop Only */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden lg:flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  )
}