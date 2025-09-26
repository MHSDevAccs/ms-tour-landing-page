'use client'

import Image from 'next/image'
import { urlForIcon } from '@/sanity/lib/image'
import AnimatedSection, { StaggerContainer, StaggerItem, HoverCard } from './AnimatedSection'
import { getStyleClasses, getGridClasses, getCardClasses, combineClasses } from '@/lib/cms-styles'
import { useEffect, useState } from 'react'

// TypeScript interfaces for Testimonial
interface Testimonial {
  _id: string
  customerName: string
  customerTitle?: string
  customerPhoto?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  testimonialText: string
  rating: number
  tourPackage?: string
  dateOfTour?: string
  isFeatured: boolean
  language: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  variant?: 'default' | 'compact' | 'carousel'
  maxTestimonials?: number
  showRating?: boolean
  className?: string
}

export default function TestimonialsSection({ 
  testimonials,
  title = "Testimoni Jamaah - Barakallahu Fiikum",
  subtitle = "Alhamdulillah, dengerin langsung cerita jamaah yang udah merasakan berkah perjalanan bersama kami",
  variant = 'default',
  maxTestimonials = 6,
  showRating = true,
  className = ''
}: TestimonialsSectionProps) {
  
  const [styles, setStyles] = useState({
    sectionBg: 'py-16 bg-gray-50',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    sectionHeader: 'text-center mb-12',
    sectionTitle: 'text-3xl md:text-4xl font-bold text-black mb-4',
    sectionSubtitle: 'text-lg text-gray-600 max-w-3xl mx-auto',
    gridClasses: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  })

  useEffect(() => {
    const loadStyles = async () => {
      try {
        const [
          sectionBg,
          container,
          sectionHeader,
          sectionTitle,
          sectionSubtitle,
          gridClasses
        ] = await Promise.all([
          getStyleClasses('components', 'testimonialSection'),
          getStyleClasses('layout', 'container'),
          getStyleClasses('components', 'sectionHeader'),
          getStyleClasses('components', 'sectionTitle'),
          getStyleClasses('components', 'sectionSubtitle'),
          getGridClasses(variant === 'compact' ? 'compact' : 'default')
        ])

        setStyles({
          sectionBg: sectionBg || 'py-16 bg-gray-50',
          container: container || 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          sectionHeader: sectionHeader || 'text-center mb-12',
          sectionTitle: sectionTitle || 'text-3xl md:text-4xl font-bold text-black mb-4',
          sectionSubtitle: sectionSubtitle || 'text-lg text-gray-600 max-w-3xl mx-auto',
          gridClasses: gridClasses || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        })
      } catch (error) {
        console.error('Error loading testimonial styles:', error)
      }
    }

    loadStyles()
  }, [variant])
  
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const testimonialsToShow = testimonials.slice(0, maxTestimonials)

  return (
    <AnimatedSection className={combineClasses(styles.sectionBg, className)}>
      <div className={styles.container}>
        {/* Section Header */}
        <AnimatedSection direction="fade" className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {title}
          </h2>
          <p className={styles.sectionSubtitle}>
            {subtitle}
          </p>
        </AnimatedSection>
        
        {/* Testimonials Grid */}
        <StaggerContainer className={`grid ${styles.gridClasses} gap-8`} staggerDelay={0.1}>
          {testimonialsToShow.map((testimonial) => (
            <StaggerItem key={testimonial._id}>
              <TestimonialCard 
                testimonial={testimonial}
                showRating={showRating}
                variant={variant}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}

// Individual Testimonial Card Component
interface TestimonialCardProps {
  testimonial: Testimonial
  showRating: boolean
  variant: 'default' | 'compact' | 'carousel'
}

function TestimonialCard({ testimonial, showRating, variant }: TestimonialCardProps) {
  const isCompact = variant === 'compact'
  
  const [cardStyles, setCardStyles] = useState({
    card: 'bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full',
    starRating: 'text-lg',
    starActive: 'text-accent',
    starInactive: 'text-gray-300'
  })

  useEffect(() => {
    const loadCardStyles = async () => {
      try {
        const [card, starRating, starActive, starInactive] = await Promise.all([
          getCardClasses('testimonial'),
          getStyleClasses('components', 'starRating'),
          getStyleClasses('components', 'starActive'),
          getStyleClasses('components', 'starInactive')
        ])

        setCardStyles({
          card: card || 'bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full',
          starRating: starRating || 'text-lg',
          starActive: starActive || 'text-accent',
          starInactive: starInactive || 'text-gray-300'
        })
      } catch (error) {
        console.error('Error loading card styles:', error)
      }
    }

    loadCardStyles()
  }, [])

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={combineClasses(
          cardStyles.starRating,
          i < rating ? cardStyles.starActive : cardStyles.starInactive
        )}
      >
        ★
      </span>
    ))
  }

  return (
    <HoverCard className={cardStyles.card}>
      <div className="flex flex-col h-full">
        {/* Rating */}
        {showRating && (
          <div className="flex items-center mb-4">
            <div className="flex">{renderStars(testimonial.rating)}</div>
            <span className="ml-2 text-sm text-gray-600">
              ({testimonial.rating}/5)
            </span>
          </div>
        )}

        {/* Testimonial Text */}
        <blockquote className={`text-gray-700 mb-6 flex-grow ${
          isCompact ? 'text-sm' : 'text-base'
        }`}>
          <span className="text-primary text-2xl leading-none">"</span>
          {testimonial.testimonialText}
          <span className="text-primary text-2xl leading-none">"</span>
        </blockquote>

        {/* Customer Info */}
        <div className="flex items-center mt-auto">
          {/* Customer Photo */}
          <div className="relative w-12 h-12 mr-4 flex-shrink-0">
            {testimonial.customerPhoto?.asset ? (
              <Image
                src={urlForIcon(testimonial.customerPhoto).url()}
                alt={testimonial.customerPhoto.alt || testimonial.customerName}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {testimonial.customerName[0]}
                </span>
              </div>
            )}
          </div>

          {/* Customer Details */}
          <div className="flex-grow">
            <div className="font-semibold text-black">
              {testimonial.customerName}
            </div>
            {testimonial.customerTitle && (
              <div className="text-sm text-gray-600">
                {testimonial.customerTitle}
              </div>
            )}
            {testimonial.tourPackage && (
              <div className="text-xs text-primary mt-1">
                {testimonial.tourPackage}
              </div>
            )}
          </div>
        </div>

        {/* Tour Date */}
        {testimonial.dateOfTour && (
          <div className="text-xs text-gray-500 mt-2 text-right">
            {new Date(testimonial.dateOfTour).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        )}
      </div>
    </HoverCard>
  )
}

// Compact Testimonials for Other Pages
interface CompactTestimonialsProps {
  testimonials: Testimonial[]
  maxItems?: number
  className?: string
}

export function CompactTestimonials({ 
  testimonials, 
  maxItems = 3,
  className = ''
}: CompactTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const featuredTestimonials = testimonials
    .filter(t => t.isFeatured)
    .slice(0, maxItems)

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-xl font-bold text-black mb-4 text-center">
        Review Jamaah
      </h3>
      
      <div className="space-y-4">
        {featuredTestimonials.map((testimonial) => (
          <div key={testimonial._id} className="border-b last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-center mb-2">
              <div className="flex text-accent">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="ml-2 text-sm font-semibold text-black">
                {testimonial.customerName}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              "{testimonial.testimonialText}"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Export types
export type { Testimonial, TestimonialsSectionProps }