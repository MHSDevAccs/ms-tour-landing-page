// Testimonials Types for Sanity CMS Integration
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  _createdAt: string
  _updatedAt: string
  customerName: string
  customerTitle?: string
  customerPhoto?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    alt?: string
  }
  testimonialText: string
  rating: number
  tourPackage?: string
  dateOfTour?: string
  isActive: boolean
  isFeatured: boolean
  language: 'id' | 'en'
}

// Component Props
export interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  slidesToShow?: number
  className?: string
}

export interface TestimonialCardProps {
  testimonial: Testimonial
  showTourPackage?: boolean
  compact?: boolean
}

export interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  showMoreButton?: boolean
  maxCount?: number
}