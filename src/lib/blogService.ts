import { client, sanityFetch } from '@/sanity/lib/client'

// GROQ queries for blog posts
export const blogQueries = {
  // Get all published blog posts with pagination
  getAllBlogPosts: (language: string = 'id', limit: number = 12, offset: number = 0) => `
    *[_type == "blogPost" && isPublished == true && language == "${language}"] 
    | order(publishedAt desc) 
    [${offset}...${offset + limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      author,
      publishedAt,
      categories,
      tags,
      isFeatured,
      language
    }
  `,

  // Get total count of published blog posts
  getBlogPostsCount: (language: string = 'id') => `
    count(*[_type == "blogPost" && isPublished == true && language == "${language}"])
  `,

  // Get single blog post by slug
  getBlogPostBySlug: (slug: string, language: string = 'id') => `
    *[_type == "blogPost" && slug.current == "${slug}" && isPublished == true && language == "${language}"][0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      content,
      author,
      publishedAt,
      categories,
      tags,
      seoTitle,
      seoDescription,
      isFeatured,
      language
    }
  `,

  // Get featured blog posts
  getFeaturedBlogPosts: (language: string = 'id', limit: number = 3) => `
    *[_type == "blogPost" && isPublished == true && isFeatured == true && language == "${language}"] 
    | order(publishedAt desc) 
    [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      author,
      publishedAt,
      categories,
      tags,
      language
    }
  `,

  // Get blog posts by category
  getBlogPostsByCategory: (category: string, language: string = 'id', limit: number = 12, offset: number = 0) => `
    *[_type == "blogPost" && isPublished == true && "${category}" in categories && language == "${language}"] 
    | order(publishedAt desc) 
    [${offset}...${offset + limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      author,
      publishedAt,
      categories,
      tags,
      language
    }
  `,

  // Get blog posts by tag
  getBlogPostsByTag: (tag: string, language: string = 'id', limit: number = 12, offset: number = 0) => `
    *[_type == "blogPost" && isPublished == true && "${tag}" in tags && language == "${language}"] 
    | order(publishedAt desc) 
    [${offset}...${offset + limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      author,
      publishedAt,
      categories,
      tags,
      language
    }
  `,

  // Get related blog posts (by categories/tags)
  getRelatedBlogPosts: (currentPostId: string, categories: string[], tags: string[], language: string = 'id', limit: number = 3) => `
    *[_type == "blogPost" && isPublished == true && _id != "${currentPostId}" && language == "${language}" 
      && (${categories.map(cat => `"${cat}" in categories`).join(' || ')} || ${tags.map(tag => `"${tag}" in tags`).join(' || ')})] 
    | order(publishedAt desc) 
    [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      author,
      publishedAt,
      categories,
      tags,
      language
    }
  `,

  // Get all unique categories
  getCategories: (language: string = 'id') => `
    array::unique(*[_type == "blogPost" && isPublished == true && language == "${language}"].categories[])
  `,

  // Get all unique tags
  getTags: (language: string = 'id') => `
    array::unique(*[_type == "blogPost" && isPublished == true && language == "${language}"].tags[])
  `,

  // Search blog posts
  searchBlogPosts: (searchTerm: string, language: string = 'id', limit: number = 12) => `
    *[_type == "blogPost" && isPublished == true && language == "${language}" 
      && (title match "*${searchTerm}*" || excerpt match "*${searchTerm}*" || pt::text(content) match "*${searchTerm}*")] 
    | order(publishedAt desc) 
    [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      author,
      publishedAt,
      categories,
      tags,
      language
    }
  `
}

// Blog service functions
export const blogService = {
  // Get all blog posts with pagination
  async getAllPosts(language: string = 'id', page: number = 1, limit: number = 12) {
    const offset = (page - 1) * limit
    
    try {
      const [posts, totalCount] = await Promise.all([
        sanityFetch<any[]>({
          query: blogQueries.getAllBlogPosts(language, limit, offset),
          tags: ['blogPost']
        }),
        sanityFetch<number>({
          query: blogQueries.getBlogPostsCount(language),
          tags: ['blogPost']
        })
      ])

      return {
        posts,
        pagination: {
          current: page,
          total: Math.ceil(totalCount / limit),
          hasNext: page * limit < totalCount,
          hasPrev: page > 1,
          totalCount
        }
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }
  },

  // Get single blog post by slug
  async getPostBySlug(slug: string, language: string = 'id') {
    try {
      return await sanityFetch<any>({
        query: blogQueries.getBlogPostBySlug(slug, language),
        tags: ['blogPost', `post-${slug}`]
      })
    } catch (error) {
      console.error('Error fetching blog post by slug:', error)
      throw error
    }
  },

  // Get featured blog posts
  async getFeaturedPosts(language: string = 'id', limit: number = 3) {
    try {
      return await sanityFetch<any[]>({
        query: blogQueries.getFeaturedBlogPosts(language, limit),
        tags: ['blogPost']
      })
    } catch (error) {
      console.error('Error fetching featured blog posts:', error)
      throw error
    }
  },

  // Get blog posts by category
  async getPostsByCategory(category: string, language: string = 'id', page: number = 1, limit: number = 12) {
    const offset = (page - 1) * limit
    
    try {
      const posts = await sanityFetch<any[]>({
        query: blogQueries.getBlogPostsByCategory(category, language, limit, offset),
        tags: ['blogPost']
      })

      return {
        posts,
        category,
        pagination: {
          current: page,
          total: Math.ceil(posts.length / limit) || 1,
          hasNext: posts.length === limit,
          hasPrev: page > 1,
          totalCount: posts.length
        }
      }
    } catch (error) {
      console.error('Error fetching blog posts by category:', error)
      throw error
    }
  },

  // Get blog posts by tag
  async getPostsByTag(tag: string, language: string = 'id', page: number = 1, limit: number = 12) {
    const offset = (page - 1) * limit
    
    try {
      const posts = await sanityFetch<any[]>({
        query: blogQueries.getBlogPostsByTag(tag, language, limit, offset),
        tags: ['blogPost']
      })

      return {
        posts,
        tag,
        pagination: {
          current: page,
          total: Math.ceil(posts.length / limit) || 1,
          hasNext: posts.length === limit,
          hasPrev: page > 1,
          totalCount: posts.length
        }
      }
    } catch (error) {
      console.error('Error fetching blog posts by tag:', error)
      throw error
    }
  },

  // Get related blog posts
  async getRelatedPosts(currentPostId: string, categories: string[] = [], tags: string[] = [], language: string = 'id', limit: number = 3) {
    if (categories.length === 0 && tags.length === 0) {
      return []
    }

    try {
      return await sanityFetch<any[]>({
        query: blogQueries.getRelatedBlogPosts(currentPostId, categories, tags, language, limit),
        tags: ['blogPost']
      })
    } catch (error) {
      console.error('Error fetching related blog posts:', error)
      return []
    }
  },

  // Get all categories
  async getCategories(language: string = 'id') {
    try {
      return await sanityFetch<string[]>({
        query: blogQueries.getCategories(language),
        tags: ['blogPost']
      })
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  },

  // Get all tags
  async getTags(language: string = 'id') {
    try {
      return await sanityFetch<string[]>({
        query: blogQueries.getTags(language),
        tags: ['blogPost']
      })
    } catch (error) {
      console.error('Error fetching tags:', error)
      return []
    }
  },

  // Search blog posts
  async searchPosts(searchTerm: string, language: string = 'id', limit: number = 12) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return []
    }

    try {
      return await sanityFetch<any[]>({
        query: blogQueries.searchBlogPosts(searchTerm.trim(), language, limit),
        tags: ['blogPost']
      })
    } catch (error) {
      console.error('Error searching blog posts:', error)
      return []
    }
  }
}

// Utility functions
export const blogUtils = {
  // Calculate reading time
  calculateReadingTime(content: any[]): number {
    if (!content) return 0
    
    const plainText = content
      .filter(block => block._type === 'block')
      .map(block => block.children?.map((child: any) => child.text).join(''))
      .join(' ')
    
    const wordsPerMinute = 200
    const wordCount = plainText.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  },

  // Format date
  formatDate(dateString: string, locale: string = 'id-ID'): string {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },

  // Generate excerpt from content
  generateExcerpt(content: any[], maxLength: number = 160): string {
    if (!content) return ''
    
    const plainText = content
      .filter(block => block._type === 'block')
      .map(block => block.children?.map((child: any) => child.text).join(''))
      .join(' ')
    
    if (plainText.length <= maxLength) return plainText
    return plainText.substring(0, maxLength).trim() + '...'
  },

  // Category display names
  getCategoryDisplayName(category: string): string {
    const categoryNames: Record<string, string> = {
      'travel-tips': 'Tips Perjalanan',
      'destinations': 'Destinasi',
      'islamic-tourism': 'Wisata Islami',
      'culture': 'Budaya',
      'food-cuisine': 'Kuliner',
      'adventure': 'Petualangan',
      'family-travel': 'Wisata Keluarga',
      'budget-travel': 'Wisata Hemat'
    }
    return categoryNames[category] || category
  }
}

export default blogService