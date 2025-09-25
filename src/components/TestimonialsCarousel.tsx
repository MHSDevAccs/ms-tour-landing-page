'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { Testimonial, TestimonialsCarouselProps } from '@/types/testimonial'
import { ChevronLeft, ChevronRight, Star, Play, Pause, Quote } from 'lucide-react'

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  slidesToShow = 1,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isHovered, setIsHovered] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  // Auto play functionality
  useEffect(() => {
    if (isPlaying && !isHovered && testimonials.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, autoPlayInterval)
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isPlaying, isHovered, testimonials.length, autoPlayInterval])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
        case ' ':
          event.preventDefault()
          toggleAutoPlay()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-accent text-accent'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long'
    })
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">"</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Belum Ada Testimonial
        </h3>
        <p className="text-gray-600">
          Testimonial pelanggan akan segera tersedia.
        </p>
      </div>
    )
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white shadow-lg hover:shadow-xl text-primary hover:text-primary-dark rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white shadow-lg hover:shadow-xl text-primary hover:text-primary-dark rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto Play Control */}
      {testimonials.length > 1 && (
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleAutoPlay}
            className="p-2 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {/* Progress Indicator */}
      {isPlaying && testimonials.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
            key={currentIndex}
          />
        </div>
      )}

      {/* Counter */}
      <div className="absolute top-4 left-4 bg-black/20 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {testimonials.length}
      </div>
    </div>
  )
}

// Individual Testimonial Card Component
interface TestimonialCardProps {
  testimonial: Testimonial
  showTourPackage?: boolean
  compact?: boolean
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  showTourPackage = true,
  compact = false
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-accent text-accent'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${compact ? 'p-6' : 'p-8'}`}>
      {/* Quote Icon */}
      <div className="text-primary-light mb-4">
        <Quote className="w-8 h-8" />
      </div>

      {/* Rating */}
      <div className="mb-4">
        {renderStars(testimonial.rating)}
      </div>

      {/* Testimonial Text */}
      <blockquote className={`text-gray-700 leading-relaxed mb-6 ${compact ? 'text-base' : 'text-lg'}`}>
        "{testimonial.testimonialText}"
      </blockquote>

      {/* Customer Info */}
      <div className="flex items-center gap-4">
        {/* Customer Photo */}
        {testimonial.customerPhoto ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={urlFor(testimonial.customerPhoto).width(100).height(100).url()}
              alt={testimonial.customerPhoto.alt || testimonial.customerName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary-lighter flex items-center justify-center text-primary font-semibold">
            {testimonial.customerName.charAt(0)}
          </div>
        )}

        {/* Customer Details */}
        <div className="flex-1">
          <div className="font-semibold text-gray-900">
            {testimonial.customerName}
          </div>
          {testimonial.customerTitle && (
            <div className="text-sm text-gray-600">
              {testimonial.customerTitle}
            </div>
          )}
          
          {/* Tour Package & Date */}
          <div className="text-xs text-gray-500 mt-1 space-y-1">
            {showTourPackage && testimonial.tourPackage && (
              <div>Paket: {testimonial.tourPackage}</div>
            )}
            {testimonial.dateOfTour && (
              <div>Tanggal: {formatDate(testimonial.dateOfTour)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsCarousel
export { TestimonialCard }