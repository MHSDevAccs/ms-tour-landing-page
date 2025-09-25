import { client } from '@/sanity/lib/client'
import { Gallery, GalleryCategory } from '@/types/gallery'

// GROQ Queries for Gallery Data

export const galleryQueries = {
  // Get all published galleries with basic info
  allGalleries: `*[_type == "gallery" && isPublished == true] | order(publishDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    category,
    destination,
    featuredImage {
      asset,
      hotspot,
      alt
    },
    images[] {
      _key,
      image {
        asset,
        hotspot,
        crop,
        alt
      },
      caption,
      dateTaken,
      photographer,
      tags
    },
    tourPackage,
    isPublished,
    isFeatured,
    publishDate,
    seoTitle,
    seoDescription,
    viewCount
  }`,

  // Get featured galleries only
  featuredGalleries: `*[_type == "gallery" && isPublished == true && isFeatured == true] | order(publishDate desc) {
    _id,
    title,
    slug,
    description,
    category,
    featuredImage {
      asset,
      hotspot,
      alt
    },
    images[] {
      _key,
      image {
        asset,
        hotspot,
        crop,
        alt
      },
      caption
    },
    destination,
    publishDate,
    viewCount
  }`,

  // Get galleries by category
  galleriesByCategory: (category: string) => `*[_type == "gallery" && isPublished == true && category == "${category}"] | order(publishDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    category,
    destination,
    featuredImage {
      asset,
      hotspot,
      alt
    },
    images[] {
      _key,
      image {
        asset,
        hotspot,
        crop,
        alt
      },
      caption,
      dateTaken,
      photographer,
      tags
    },
    tourPackage,
    isPublished,
    isFeatured,
    publishDate,
    seoTitle,
    seoDescription,
    viewCount
  }`,

  // Get single gallery by slug with full details
  galleryBySlug: (slug: string) => `*[_type == "gallery" && slug.current == "${slug}" && isPublished == true][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    category,
    destination,
    featuredImage {
      asset,
      hotspot,
      alt
    },
    images[] {
      _key,
      image {
        asset,
        hotspot,
        crop,
        alt
      },
      caption,
      dateTaken,
      photographer,
      tags
    },
    tourPackage-> {
      _id,
      title,
      slug,
      price,
      duration,
      description
    },
    isPublished,
    isFeatured,
    publishDate,
    seoTitle,
    seoDescription,
    viewCount
  }`,

  // Get all gallery categories
  allCategories: `*[_type == "galleryCategory" && isActive == true] | order(sortOrder asc) {
    _id,
    _type,
    title,
    slug,
    description,
    icon,
    coverImage {
      asset,
      alt
    },
    sortOrder,
    isActive
  }`,

  // Get gallery statistics
  galleryStats: `{
    "totalGalleries": count(*[_type == "gallery" && isPublished == true]),
    "totalImages": count(*[_type == "gallery" && isPublished == true].images[]),
    "featuredCount": count(*[_type == "gallery" && isPublished == true && isFeatured == true]),
    "categoryCounts": {
      "destinations": count(*[_type == "gallery" && isPublished == true && category == "destinations"]),
      "cultural": count(*[_type == "gallery" && isPublished == true && category == "cultural"]),
      "adventure": count(*[_type == "gallery" && isPublished == true && category == "adventure"]),
      "religious": count(*[_type == "gallery" && isPublished == true && category == "religious"]),
      "nature": count(*[_type == "gallery" && isPublished == true && category == "nature"]),
      "culinary": count(*[_type == "gallery" && isPublished == true && category == "culinary"]),
      "accommodation": count(*[_type == "gallery" && isPublished == true && category == "accommodation"]),
      "transportation": count(*[_type == "gallery" && isPublished == true && category == "transportation"]),
      "activities": count(*[_type == "gallery" && isPublished == true && category == "activities"]),
      "customers": count(*[_type == "gallery" && isPublished == true && category == "customers"])
    }
  }`
}

// Gallery Service Functions

export const galleryService = {
  // Fetch all galleries
  async getAllGalleries(): Promise<Gallery[]> {
    try {
      const galleries = await client.fetch(galleryQueries.allGalleries)
      return galleries || []
    } catch (error) {
      console.error('Error fetching galleries:', error)
      return []
    }
  },

  // Fetch featured galleries only
  async getFeaturedGalleries(): Promise<Gallery[]> {
    try {
      const galleries = await client.fetch(galleryQueries.featuredGalleries)
      return galleries || []
    } catch (error) {
      console.error('Error fetching featured galleries:', error)
      return []
    }
  },

  // Fetch galleries by category
  async getGalleriesByCategory(category: string): Promise<Gallery[]> {
    try {
      const galleries = await client.fetch(galleryQueries.galleriesByCategory(category))
      return galleries || []
    } catch (error) {
      console.error('Error fetching galleries by category:', error)
      return []
    }
  },

  // Fetch single gallery by slug
  async getGalleryBySlug(slug: string): Promise<Gallery | null> {
    try {
      const gallery = await client.fetch(galleryQueries.galleryBySlug(slug))
      return gallery || null
    } catch (error) {
      console.error('Error fetching gallery by slug:', error)
      return null
    }
  },

  // Fetch all categories
  async getAllCategories(): Promise<GalleryCategory[]> {
    try {
      const categories = await client.fetch(galleryQueries.allCategories)
      return categories || []
    } catch (error) {
      console.error('Error fetching gallery categories:', error)
      return []
    }
  },

  // Fetch gallery statistics
  async getGalleryStats() {
    try {
      const stats = await client.fetch(galleryQueries.galleryStats)
      return stats || {
        totalGalleries: 0,
        totalImages: 0,
        featuredCount: 0,
        categoryCounts: {}
      }
    } catch (error) {
      console.error('Error fetching gallery stats:', error)
      return {
        totalGalleries: 0,
        totalImages: 0,
        featuredCount: 0,
        categoryCounts: {}
      }
    }
  },

  // Increment view count for a gallery
  async incrementViewCount(galleryId: string): Promise<void> {
    try {
      await client
        .patch(galleryId)
        .inc({ viewCount: 1 })
        .commit()
    } catch (error) {
      // Handle permission errors gracefully - view count is not critical functionality
      if (error instanceof Error && error.message.includes('Insufficient permissions')) {
        console.warn('View count increment skipped: Insufficient Sanity permissions for update operations')
        return
      }
      console.error('Error incrementing view count:', error)
    }
  },

  // Search galleries by keyword
  async searchGalleries(keyword: string): Promise<Gallery[]> {
    try {
      const searchQuery = `*[_type == "gallery" && isPublished == true && (
        title match "${keyword}*" ||
        description match "${keyword}*" ||
        destination.name match "${keyword}*" ||
        destination.province match "${keyword}*" ||
        images[].tags[] match "${keyword}*"
      )] | order(publishDate desc) {
        _id,
        _type,
        title,
        slug,
        description,
        category,
        destination,
        featuredImage {
          asset,
          hotspot,
          alt
        },
        images[0..5] {
          _key,
          image {
            asset,
            hotspot,
            alt
          },
          caption
        },
        publishDate,
        viewCount
      }`
      
      const galleries = await client.fetch(searchQuery)
      return galleries || []
    } catch (error) {
      console.error('Error searching galleries:', error)
      return []
    }
  }
}

// Helper function to get recent galleries (last 30 days)
export const getRecentGalleries = async (limit: number = 6): Promise<Gallery[]> => {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentQuery = `*[_type == "gallery" && isPublished == true && publishDate >= "${thirtyDaysAgo.toISOString()}"] | order(publishDate desc)[0...${limit}] {
      _id,
      title,
      slug,
      description,
      category,
      featuredImage {
        asset,
        hotspot,
        alt
      },
      destination,
      publishDate,
      viewCount
    }`
    
    const galleries = await client.fetch(recentQuery)
    return galleries || []
  } catch (error) {
    console.error('Error fetching recent galleries:', error)
    return []
  }
}

// Helper function to get related galleries (same category, different gallery)
export const getRelatedGalleries = async (currentGalleryId: string, category: string, limit: number = 4): Promise<Gallery[]> => {
  try {
    const relatedQuery = `*[_type == "gallery" && isPublished == true && category == "${category}" && _id != "${currentGalleryId}"] | order(publishDate desc)[0...${limit}] {
      _id,
      title,
      slug,
      description,
      category,
      featuredImage {
        asset,
        hotspot,
        alt
      },
      destination,
      publishDate,
      viewCount
    }`
    
    const galleries = await client.fetch(relatedQuery)
    return galleries || []
  } catch (error) {
    console.error('Error fetching related galleries:', error)
    return []
  }
}