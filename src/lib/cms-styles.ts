import { client } from '@/sanity/lib/client'

// SiteSettings interface
interface SiteSettings {
  _id: string
  logo?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  logoAlt?: string
  siteName: string
  siteTitle: string
  siteDescription: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    whatsapp?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
    youtube?: string
    twitter?: string
  }
  content?: {
    tagline?: string
    ctaText?: string
    contactCtaText?: string
    getInTouchText?: string
  }
  theme?: {
    colors?: {
      primary?: string
      primaryLight?: string
      primaryDark?: string
      secondary?: string
      accent?: string
      textPrimary?: string
      textSecondary?: string
      background?: string
      backgroundAlt?: string
    }
    buttons?: {
      primary?: string
      secondary?: string
      outline?: string
    }
    cards?: {
      defaultCard?: string
      serviceCard?: string
      blogCard?: string
      testimonialCard?: string
    }
    layout?: {
      container?: string
      section?: string
      headerBg?: string
      footerBg?: string
    }
    components?: {
      sectionTitle?: string
      sectionSubtitle?: string
      sectionHeader?: string
      gridDefault?: string
      gridCompact?: string
      testimonialSection?: string
      starRating?: string
      starActive?: string
      starInactive?: string
    }
  }
}

// Cache for site settings to avoid repeated API calls
let cachedSettings: SiteSettings | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Fetch site settings from CMS with caching
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const now = Date.now()
  
  // Return cached settings if still valid
  if (cachedSettings && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedSettings
  }

  try {
    const settings = await client.fetch<SiteSettings>(`
      *[_type == "siteSettings"][0] {
        ...,
        theme {
          ...,
          colors {
            primary,
            secondary,
            accent,
            text,
            background
          },
          buttons {
            primary,
            secondary,
            outline
          },
          cards {
            defaultCard,
            serviceCard,
            blogCard,
            testimonialCard
          },
          layout {
            container,
            section,
            headerBg,
            footerBg
          },
          components {
            sectionTitle,
            sectionSubtitle,
            sectionHeader,
            gridDefault,
            gridCompact,
            testimonialSection,
            starRating,
            starActive,
            starInactive
          }
        }
      }
    `)

    if (settings) {
      cachedSettings = settings
      cacheTimestamp = now
      return settings
    }
  } catch (error) {
    console.error('Error fetching site settings:', error)
  }

  // Return default settings if fetch fails
  return getDefaultSettings()
}

/**
 * Get default settings as fallback
 */
function getDefaultSettings(): SiteSettings {
  return {
    _id: 'default-settings',
    siteName: 'Mahabbatussholihin Tour & Travel',
    siteTitle: 'Mahabbatussholihin Tour & Travel - Gerbang Menuju Petualangan Tak Terlupakan',
    siteDescription: 'Jelajahi keindahan Indonesia dengan paket wisata terpercaya dari Mahabbatussholihin Tour & Travel. Pengalaman tak terlupakan menanti Anda!',
    theme: {
      colors: {
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        accent: 'text-yellow-500',
        textPrimary: 'text-gray-900',
        background: 'bg-white'
      },
      buttons: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200',
        outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200'
      },
      cards: {
        defaultCard: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
        serviceCard: 'bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6',
        blogCard: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden',
        testimonialCard: 'bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full'
      },
      layout: {
        container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        section: 'py-16 lg:py-24',
        headerBg: 'bg-white shadow-md',
        footerBg: 'bg-gray-900 text-white'
      },
      components: {
        sectionTitle: 'text-3xl md:text-4xl font-bold text-black mb-4',
        sectionSubtitle: 'text-lg text-gray-600 max-w-3xl mx-auto',
        sectionHeader: 'text-center mb-12',
        gridDefault: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        gridCompact: 'grid-cols-1 sm:grid-cols-2',
        testimonialSection: 'py-16 bg-gray-50',
        starRating: 'text-lg',
        starActive: 'text-accent',
        starInactive: 'text-gray-300'
      }
    }
  }
}

/**
 * Get specific style classes from CMS
 */
export async function getStyleClasses(category: string, key: string): Promise<string> {
  try {
    const settings = await getSiteSettings()
    const theme = settings.theme
    
    if (!theme) return ''
    
    // Navigate to the specific style category and key
    const categoryStyles = (theme as any)[category]
    if (!categoryStyles) return ''
    
    return categoryStyles[key] || ''
  } catch (error) {
    console.error(`Error getting style classes for ${category}.${key}:`, error)
    return ''
  }
}

/**
 * Combine multiple CSS classes safely
 */
export function combineClasses(...classes: (string | undefined | null)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim()
}

/**
 * Get grid classes based on variant
 */
export async function getGridClasses(variant: 'default' | 'compact' = 'default'): Promise<string> {
  const gridKey = variant === 'compact' ? 'gridCompact' : 'gridDefault'
  return await getStyleClasses('components', gridKey)
}

/**
 * Get button classes based on variant
 */
export async function getButtonClasses(variant: 'primary' | 'secondary' | 'outline' = 'primary'): Promise<string> {
  return await getStyleClasses('buttons', variant)
}

/**
 * Get card classes based on type
 */
export async function getCardClasses(type: 'default' | 'service' | 'blog' | 'testimonial' = 'default'): Promise<string> {
  const cardKey = type === 'default' ? 'defaultCard' : `${type}Card`
  return await getStyleClasses('cards', cardKey)
}

/**
 * Hook for React components to use CMS styles
 */
export function useCMSStyles() {
  return {
    getStyleClasses,
    getGridClasses,
    getButtonClasses,
    getCardClasses,
    combineClasses
  }
}