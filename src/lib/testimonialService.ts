import { client } from '@/sanity/lib/client'
import { Testimonial } from '@/types/testimonial'

// GROQ Queries for Testimonials

export const testimonialQueries = {
  // Get all active testimonials
  allTestimonials: `*[_type == "testimonial" && isActive == true] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    customerName,
    customerTitle,
    customerPhoto {
      asset,
      hotspot,
      alt
    },
    testimonialText,
    rating,
    tourPackage,
    dateOfTour,
    isActive,
    isFeatured,
    language
  }`,

  // Get featured testimonials only
  featuredTestimonials: `*[_type == "testimonial" && isActive == true && isFeatured == true] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    customerName,
    customerTitle,
    customerPhoto {
      asset,
      hotspot,
      alt
    },
    testimonialText,
    rating,
    tourPackage,
    dateOfTour,
    isActive,
    isFeatured,
    language
  }`,

  // Get testimonials by language
  testimonialsByLanguage: (language: string) => `*[_type == "testimonial" && isActive == true && language == "${language}"] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    customerName,
    customerTitle,
    customerPhoto {
      asset,
      hotspot,
      alt
    },
    testimonialText,
    rating,
    tourPackage,
    dateOfTour,
    isActive,
    isFeatured,
    language
  }`,

  // Get testimonials by tour package
  testimonialsByTourPackage: (packageName: string) => `*[_type == "testimonial" && isActive == true && tourPackage match "*${packageName}*"] | order(_createdAt desc) {
    _id,
    _type,
    customerName,
    customerTitle,
    customerPhoto {
      asset,
      hotspot,
      alt
    },
    testimonialText,
    rating,
    tourPackage,
    dateOfTour,
    language
  }`,

  // Get recent testimonials (last 30 days)
  recentTestimonials: (limit: number = 6) => `*[_type == "testimonial" && isActive == true && _createdAt >= dateTime(now()) - 30*24*60*60] | order(_createdAt desc)[0...${limit}] {
    _id,
    customerName,
    customerTitle,
    customerPhoto {
      asset,
      hotspot,
      alt
    },
    testimonialText,
    rating,
    tourPackage,
    dateOfTour,
    language
  }`,

  // Get testimonials statistics
  testimonialStats: `{
    "totalTestimonials": count(*[_type == "testimonial" && isActive == true]),
    "featuredCount": count(*[_type == "testimonial" && isActive == true && isFeatured == true]),
    "averageRating": math::avg(*[_type == "testimonial" && isActive == true].rating),
    "languageBreakdown": {
      "indonesian": count(*[_type == "testimonial" && isActive == true && language == "id"]),
      "english": count(*[_type == "testimonial" && isActive == true && language == "en"])
    },
    "ratingBreakdown": {
      "fiveStars": count(*[_type == "testimonial" && isActive == true && rating == 5]),
      "fourStars": count(*[_type == "testimonial" && isActive == true && rating == 4]),
      "threeStars": count(*[_type == "testimonial" && isActive == true && rating == 3]),
      "twoStars": count(*[_type == "testimonial" && isActive == true && rating == 2]),
      "oneStar": count(*[_type == "testimonial" && isActive == true && rating == 1])
    }
  }`
}

// Testimonials Service Functions

export const testimonialService = {
  // Fetch all testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      const testimonials = await client.fetch(testimonialQueries.allTestimonials)
      return testimonials || []
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }
  },

  // Fetch featured testimonials only
  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    try {
      const testimonials = await client.fetch(testimonialQueries.featuredTestimonials)
      return testimonials || []
    } catch (error) {
      console.error('Error fetching featured testimonials:', error)
      return []
    }
  },

  // Fetch testimonials by language
  async getTestimonialsByLanguage(language: 'id' | 'en'): Promise<Testimonial[]> {
    try {
      const testimonials = await client.fetch(testimonialQueries.testimonialsByLanguage(language))
      return testimonials || []
    } catch (error) {
      console.error('Error fetching testimonials by language:', error)
      return []
    }
  },

  // Fetch testimonials by tour package
  async getTestimonialsByTourPackage(packageName: string): Promise<Testimonial[]> {
    try {
      const testimonials = await client.fetch(testimonialQueries.testimonialsByTourPackage(packageName))
      return testimonials || []
    } catch (error) {
      console.error('Error fetching testimonials by tour package:', error)
      return []
    }
  },

  // Fetch recent testimonials
  async getRecentTestimonials(limit: number = 6): Promise<Testimonial[]> {
    try {
      const testimonials = await client.fetch(testimonialQueries.recentTestimonials(limit))
      return testimonials || []
    } catch (error) {
      console.error('Error fetching recent testimonials:', error)
      return []
    }
  },

  // Fetch testimonials statistics
  async getTestimonialStats() {
    try {
      const stats = await client.fetch(testimonialQueries.testimonialStats)
      return stats || {
        totalTestimonials: 0,
        featuredCount: 0,
        averageRating: 0,
        languageBreakdown: { indonesian: 0, english: 0 },
        ratingBreakdown: { fiveStars: 0, fourStars: 0, threeStars: 0, twoStars: 0, oneStar: 0 }
      }
    } catch (error) {
      console.error('Error fetching testimonial stats:', error)
      return {
        totalTestimonials: 0,
        featuredCount: 0,
        averageRating: 0,
        languageBreakdown: { indonesian: 0, english: 0 },
        ratingBreakdown: { fiveStars: 0, fourStars: 0, threeStars: 0, twoStars: 0, oneStar: 0 }
      }
    }
  }
}

// Helper function to get testimonials for homepage
export const getHomepageTestimonials = async (limit: number = 6): Promise<Testimonial[]> => {
  try {
    // First try to get featured testimonials
    const featured = await testimonialService.getFeaturedTestimonials()
    
    if (featured.length >= limit) {
      return featured.slice(0, limit)
    }
    
    // If not enough featured, get recent testimonials to fill
    const all = await testimonialService.getAllTestimonials()
    return all.slice(0, limit)
  } catch (error) {
    console.error('Error fetching homepage testimonials:', error)
    return []
  }
}

// Helper function to calculate average rating display
export const calculateRatingDisplay = (testimonials: Testimonial[]) => {
  if (testimonials.length === 0) return { average: 0, total: 0 }
  
  const sum = testimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0)
  const average = sum / testimonials.length
  
  return {
    average: Math.round(average * 10) / 10, // Round to 1 decimal
    total: testimonials.length
  }
}