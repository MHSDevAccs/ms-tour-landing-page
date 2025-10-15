'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { Testimonial, TestimonialsCarouselProps } from '@/types/testimonial'
import { ChevronLeft, ChevronRight, Star, Play, Pause, Quote } from 'lucide-react'
import { formatDateIndonesian } from '@/utils/dateUtils'

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
  const [isDragging, setIsDragging] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout>()
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Auto play functionality
  useEffect(() => {
    if (isPlaying && !isHovered && !isDragging && testimonials.length > 1) {
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
  }, [isPlaying, isHovered, isDragging, testimonials.length, autoPlayInterval])

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

  // Swipe detection
  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    
    const threshold = 50
    const { offset, velocity } = info
    
    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 500) {
      if (offset.x > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    }
  }, [goToNext, goToPrevious])

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
    return formatDateIndonesian(dateString)
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">"</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Belum Ada Testimoni Jamaah
        </h3>
        <p className="text-gray-600">
          Insyaalloh testimoni jamaah akan segera hadir. Sabar ya, barakallohu fiikum.
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
      <div 
        ref={constraintsRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.95 }}
          >
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      {showDots && testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-200 touch-manipulation p-2 ${
                index === currentIndex
                  ? 'bg-primary scale-60'
                  : 'bg-gray-300 hover:bg-gray-400 scale-40'
              }`}
              aria-label={`Ke testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
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
    return formatDateIndonesian(dateString)
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto ${compact ? 'p-6' : 'p-6 md:p-8'}`}>
      {/* Rating */}
      <div className="mb-6">
        {renderStars(testimonial.rating)}
      </div>

      {/* Testimonial Text */}
      <blockquote className={`text-gray-700 leading-relaxed mb-6 ${compact ? 'text-base' : 'text-base md:text-lg'}`}>
        "{testimonial.testimonialText}"
      </blockquote>

      {/* Customer Info */}
      <div className="flex items-center gap-4">
        {/* Customer Photo */}
        {testimonial.customerPhoto ? (
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={urlFor(testimonial.customerPhoto).width(100).height(100).url()}
              alt={testimonial.customerPhoto.alt || testimonial.customerName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg md:text-xl flex-shrink-0">
            {testimonial.customerName.charAt(0)}
          </div>
        )}

        {/* Customer Details */}
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-base md:text-lg">
            {testimonial.customerName}
          </div>
          {testimonial.customerTitle && (
            <div className="text-sm md:text-base text-gray-600">
              {testimonial.customerTitle}
            </div>
          )}
          
          {/* Tour Package & Date */}
          <div className="text-xs md:text-sm text-gray-500 mt-2 space-y-1">
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