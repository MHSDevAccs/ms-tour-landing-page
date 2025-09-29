import { client, sanityFetch } from '@/sanity/lib/client'
import { Gallery, GalleryCategory } from '@/types/gallery'

// GROQ Queries for Gallery Data - Optimized for Performance

export const galleryQueries = {
  // Get all published galleries with basic info (optimized - limited images)
  allGalleries: `*[_type == "gallery" && isPublished == true] | order(publishDate desc) {
    _id,
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
    "imageCount": count(images),
    "previewImages": images[0..2] {
      _key,
      image {
        asset,
        alt
      },
      caption
    },
    isPublished,
    isFeatured,
    publishDate,
    viewCount
  }`,

  // Get featured galleries only (optimized)
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
    "imageCount": count(images),
    "previewImages": images[0..3] {
      _key,
      image {
        asset,
        alt
      }
    },
    destination,
    isPublished,
    isFeatured,
    publishDate,
    viewCount
  }`,

  // Get galleries by category (optimized)
  galleriesByCategory: (category: string) => `*[_type == "gallery" && isPublished == true && category == "${category}"] | order(publishDate desc) {
    _id,
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
    "imageCount": count(images),
    "previewImages": images[0..2] {
      _key,
      image {
        asset,
        alt
      }
    },
    isPublished,
    isFeatured,
    publishDate,
    viewCount
  }`,

  // Get single gallery by slug with full details
  // Get gallery by slug with pagination support
  galleryBySlug: (slug: string) => `*[_type == "gallery" && slug.current == "${slug}" && isPublished == true][0] {
    _id,
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
    "imageCount": count(images),
    "previewImages": images[0..5] {
      _key,
      image {
        asset,
        hotspot,
        crop,
        alt
      },
      caption
    },
    tourPackage-> {
      _id,
      title,
      slug,
      price,
      duration
    },
    isPublished,
    isFeatured,
    publishDate,
    seoTitle,
    seoDescription,
    viewCount
  }`,

  // Get paginated images for a specific gallery
  galleryImages: (galleryId: string, start: number = 0, limit: number = 20) => `*[_type == "gallery" && _id == "${galleryId}" && isPublished == true][0] {
    "images": images[${start}..${start + limit - 1}] {
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
    }
  }`,

  // Get galleries with pagination
  galleriesPaginated: (start: number = 0, limit: number = 12) => `*[_type == "gallery" && isPublished == true] | order(publishDate desc)[${start}..${start + limit - 1}] {
    _id,
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
    "imageCount": count(images),
    "previewImages": images[0..2] {
      _key,
      image {
        asset,
        alt
      }
    },
    isPublished,
    isFeatured,
    publishDate,
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

// Gallery Service Functions - Optimized with Caching

export const galleryService = {
  // Fetch all galleries (with caching)
  async getAllGalleries(): Promise<Gallery[]> {
    try {
      const galleries = await sanityFetch({
        query: galleryQueries.allGalleries,
        tags: ['gallery'],
        revalidate: 300 // 5 minutes cache
      }) as Gallery[]
      return galleries || []
    } catch (error) {
      console.error('Error fetching galleries:', error)
      return []
    }
  },

  // Fetch galleries with pagination
  async getGalleriesPaginated(page: number = 1, limit: number = 12): Promise<{ galleries: Gallery[], hasMore: boolean, total: number }> {
    try {
      const start = (page - 1) * limit
      const [galleries, stats] = await Promise.all([
        sanityFetch({
          query: galleryQueries.galleriesPaginated(start, limit),
          tags: ['gallery'],
          revalidate: 300
        }) as Promise<Gallery[]>,
        sanityFetch({
          query: `count(*[_type == "gallery" && isPublished == true])`,
          tags: ['gallery'],
          revalidate: 300
        }) as Promise<number>
      ])
      
      return {
        galleries: galleries || [],
        hasMore: start + limit < (stats || 0),
        total: stats || 0
      }
    } catch (error) {
      console.error('Error fetching paginated galleries:', error)
      return { galleries: [], hasMore: false, total: 0 }
    }
  },

  // Fetch featured galleries only (with caching)
  async getFeaturedGalleries(): Promise<Gallery[]> {
    try {
      const galleries = await sanityFetch({
        query: galleryQueries.featuredGalleries,
        tags: ['gallery', 'featured'],
        revalidate: 600 // 10 minutes cache for featured content
      }) as Gallery[]
      return galleries || []
    } catch (error) {
      console.error('Error fetching featured galleries:', error)
      return []
    }
  },

  // Fetch galleries by category (with caching)
  async getGalleriesByCategory(category: string): Promise<Gallery[]> {
    try {
      const galleries = await sanityFetch({
        query: galleryQueries.galleriesByCategory(category),
        tags: ['gallery', `category-${category}`],
        revalidate: 300
      }) as Gallery[]
      return galleries || []
    } catch (error) {
      console.error('Error fetching galleries by category:', error)
      return []
    }
  },

  // Fetch single gallery by slug (with caching)
  async getGalleryBySlug(slug: string): Promise<Gallery | null> {
    try {
      const gallery = await sanityFetch({
        query: galleryQueries.galleryBySlug(slug),
        tags: ['gallery', `gallery-${slug}`],
        revalidate: 300
      }) as Gallery | null
      return gallery || null
    } catch (error) {
      console.error('Error fetching gallery by slug:', error)
      return null
    }
  },

  // Fetch paginated images for a specific gallery
  async getGalleryImages(galleryId: string, page: number = 1, limit: number = 20): Promise<{ images: any[], hasMore: boolean }> {
    try {
      const start = (page - 1) * limit
      const result = await sanityFetch({
        query: galleryQueries.galleryImages(galleryId, start, limit),
        tags: ['gallery', `gallery-images-${galleryId}`],
        revalidate: 600 // Images change less frequently
      }) as { images: any[] } | null
      
      const images = result?.images || []
      return {
        images,
        hasMore: images.length === limit
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error)
      return { images: [], hasMore: false }
    }
  },

  // Fetch all categories (with caching)
  async getAllCategories(): Promise<GalleryCategory[]> {
    try {
      const categories = await sanityFetch({
        query: galleryQueries.allCategories,
        tags: ['gallery-category'],
        revalidate: 3600 // 1 hour cache - categories change infrequently
      }) as GalleryCategory[]
      return categories || []
    } catch (error) {
      console.error('Error fetching gallery categories:', error)
      return []
    }
  },

  // Fetch gallery statistics (with caching)
  async getGalleryStats() {
    try {
      const stats = await sanityFetch({
        query: galleryQueries.galleryStats,
        tags: ['gallery', 'stats'],
        revalidate: 600 // 10 minutes cache for stats
      }) as {
        totalGalleries: number
        totalImages: number
        featuredCount: number
        categoryCounts: Record<string, number>
      }
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

  // Search galleries by keyword (optimized)
  async searchGalleries(keyword: string): Promise<Gallery[]> {
    try {
      const searchQuery = `*[_type == "gallery" && isPublished == true && (
        title match "${keyword}*" ||
        description match "${keyword}*" ||
        destination.name match "${keyword}*" ||
        destination.province match "${keyword}*"
      )] | order(publishDate desc)[0..20] {
        _id,
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
        "imageCount": count(images),
        "previewImages": images[0..2] {
          _key,
          image {
            asset,
            alt
          }
        },
        isPublished,
        isFeatured,
        publishDate,
        viewCount
      }`
      
      const galleries = await sanityFetch({
        query: searchQuery,
        tags: ['gallery', 'search'],
        revalidate: 180 // 3 minutes cache for search results
      }) as Gallery[]
      return galleries || []
    } catch (error) {
      console.error('Error searching galleries:', error)
      return []
    }
  }
}

// Helper function to get recent galleries (last 30 days) - Optimized
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
      "imageCount": count(images),
      destination,
      isPublished,
      isFeatured,
      publishDate,
      viewCount
    }`
    
    const galleries = await sanityFetch({
      query: recentQuery,
      tags: ['gallery', 'recent'],
      revalidate: 300 // 5 minutes cache
    }) as Gallery[]
    return galleries || []
  } catch (error) {
    console.error('Error fetching recent galleries:', error)
    return []
  }
}

// Helper function to get related galleries (same category, different gallery) - Optimized
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
      "imageCount": count(images),
      destination,
      isPublished,
      isFeatured,
      publishDate,
      viewCount
    }`
    
    const galleries = await sanityFetch({
      query: relatedQuery,
      tags: ['gallery', `category-${category}`, 'related'],
      revalidate: 600 // 10 minutes cache for related content
    }) as Gallery[]
    return galleries || []
  } catch (error) {
    console.error('Error fetching related galleries:', error)
    return []
  }
}