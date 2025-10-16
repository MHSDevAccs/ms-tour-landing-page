// Gallery Types for Sanity CMS Integration
export interface GalleryImage {
  _key?: string
  image: {
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
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
    alt?: string
  }
  caption?: string
  dateTaken?: string
  photographer?: string
  tags?: string[]
}

export interface Gallery {
  _id: string
  _type: 'gallery'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  description?: string
  featuredImage?: {
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
  images: GalleryImage[]
  tourPackage?: {
    _ref: string
    _type: 'reference'
  } | {
    _id: string
    title: string
    slug: {
      current: string
    }
    price?: number
    duration?: string
    description?: string
  }
  isPublished: boolean
  isFeatured: boolean
  publishDate: string
  seoTitle?: string
  seoDescription?: string
}

// Component Props
export interface GalleryGridProps {
  galleries: Gallery[]
  showFilters?: boolean
  columns?: number
  loading?: boolean
}

export interface GalleryCardProps {
  gallery: Gallery
  onClick?: (gallery: Gallery) => void
  loading?: boolean
}

// Sanity Image URL Builder Types
export interface SanityImageSource {
  asset: {
    _ref: string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Gallery Statistics
export interface GalleryStats {
  totalGalleries: number
  totalImages: number
  featuredCount: number
}