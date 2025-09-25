// Blog Post Types
export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
        lqip?: string
      }
    }
    alt?: string
  }
  content?: any[] // Portable text content
  author: string
  publishedAt: string
  categories: string[]
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  isFeatured: boolean
  language: string
}

// Blog listing with pagination
export interface BlogListResponse {
  posts: BlogPost[]
  pagination: {
    current: number
    total: number
    hasNext: boolean
    hasPrev: boolean
    totalCount: number
  }
}

// Blog category/tag response
export interface BlogFilterResponse {
  posts: BlogPost[]
  category?: string
  tag?: string
  pagination: {
    current: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Blog card props
export interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact' | 'horizontal'
  showExcerpt?: boolean
  showAuthor?: boolean
  showDate?: boolean
  showCategories?: boolean
  showTags?: boolean
  showReadingTime?: boolean
  className?: string
}

// Blog listing props
export interface BlogListingProps {
  posts: BlogPost[]
  pagination?: BlogListResponse['pagination']
  title?: string
  subtitle?: string
  showFilter?: boolean
  showSearch?: boolean
  className?: string
  variant?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4
}

// Blog post page props
export interface BlogPostProps {
  post: BlogPost
  relatedPosts?: BlogPost[]
  showRelatedPosts?: boolean
  showSocialSharing?: boolean
  showAuthorBio?: boolean
  className?: string
}

// Blog filters
export interface BlogFilters {
  category?: string
  tag?: string
  search?: string
  page?: number
  limit?: number
}

// Blog search props
export interface BlogSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
  className?: string
}

// Blog pagination props
export interface BlogPaginationProps {
  pagination: BlogListResponse['pagination']
  onPageChange: (page: number) => void
  showPageNumbers?: boolean
  maxPageNumbers?: number
  className?: string
}

// Blog categories/tags filter props
export interface BlogCategoryFilterProps {
  categories: string[]
  selectedCategory?: string
  onCategoryChange: (category: string | null) => void
  className?: string
}

export interface BlogTagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  maxTags?: number
  className?: string
}

// Social sharing props
export interface SocialSharingProps {
  url: string
  title: string
  description?: string
  className?: string
}

// Reading progress props
export interface ReadingProgressProps {
  className?: string
}

// Blog hero/featured section props
export interface BlogHeroProps {
  featuredPosts: BlogPost[]
  title?: string
  subtitle?: string
  className?: string
}

// Blog sidebar props
export interface BlogSidebarProps {
  recentPosts?: BlogPost[]
  categories?: string[]
  tags?: string[]
  selectedCategory?: string
  selectedTags?: string[]
  onCategoryChange?: (category: string | null) => void
  onTagToggle?: (tag: string) => void
  className?: string
}

// Blog layout props
export interface BlogLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  showSidebar?: boolean
  className?: string
}

// Category display mapping
export type CategoryKey = 
  | 'travel-tips'
  | 'destinations' 
  | 'islamic-tourism'
  | 'culture'
  | 'food-cuisine'
  | 'adventure'
  | 'family-travel'
  | 'budget-travel'

export interface CategoryInfo {
  key: CategoryKey
  name: string
  description?: string
  icon?: string
  color?: string
}

// Blog metadata for SEO
export interface BlogMetadata {
  title: string
  description: string
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  image?: string
  url?: string
}

// Blog statistics
export interface BlogStats {
  totalPosts: number
  totalCategories: number
  totalTags: number
  mostPopularCategory?: string
  recentPostsCount: number
}

export default BlogPost