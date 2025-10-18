import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import { getCurrentConfig, isMonitoringEnabled, getSlowQueryThreshold } from './config'

// Get environment-specific configuration
const config = getCurrentConfig()

// Production-optimized Sanity client configuration
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use environment-specific CDN setting
  useCdn: config.useCdn,
  perspective: 'published', // Only fetch published documents
  // Add authentication token for write operations (if needed)
  token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  // Optimize for production
  ignoreBrowserTokenWarning: true,
  // Environment-specific timeout settings
  timeout: config.timeout,
  // Enable stega only in development
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || `https://${projectId}.sanity.studio`,
  },
})

// Performance monitoring helper
const logPerformance = (operation: string, startTime: number, success: boolean) => {
  if (!isMonitoringEnabled()) return
  
  const duration = Date.now() - startTime
  const slowThreshold = getSlowQueryThreshold()
  
  // Log slow queries in any environment
  if (duration > slowThreshold) {
    console.warn(`[Sanity ${operation}] Slow query detected: ${duration}ms (threshold: ${slowThreshold}ms)`)
  }
  
  // In production, you might want to send this to your analytics service
  if (process.env.NODE_ENV === 'production' && !success) {
    console.error(`[Sanity ${operation}] Failed after ${duration}ms`)
  }
}

// Enhanced helper function for fetching data with error handling, retry logic, and performance monitoring
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate,
  retries = config.retries,
}: {
  query: string
  params?: any
  tags?: string[]
  revalidate?: number | false
  retries?: number
}): Promise<T> {
  // Auto-apply cache time based on content type if not specified
  if (revalidate === undefined && tags && tags.length > 0) {
    const contentType = tags[0]
    revalidate = cacheManager.getRevalidationTime(contentType)
  }
  const startTime = Date.now()
  const operation = `fetch${tags ? ` [${tags.join(', ')}]` : ''}`
  
  let lastError: Error | null = null
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const fetchOptions: any = {
        next: {
          tags,
        },
      }
      
      // Add revalidate option if provided
      if (revalidate !== undefined) {
        fetchOptions.next.revalidate = revalidate
      }
      
      // Add cache control for production - avoid conflicts with revalidate
      if (process.env.NODE_ENV === 'production') {
        if (revalidate === false) {
          // Only set no-store when explicitly disabling cache
          fetchOptions.cache = 'no-store'
        } else if (revalidate === undefined) {
          // Only set force-cache when revalidate is not specified at all
          fetchOptions.cache = 'force-cache'
        }
        // When revalidate is a number, don't set any cache option to avoid conflicts
        // Next.js will handle caching based on the revalidate value
      }
      
      const result = await client.fetch<T>(query, params, fetchOptions)
       
       // Record successful operation
       healthMonitor.recordSuccess()
       logPerformance(operation, startTime, true)
       
       return result
    } catch (error) {
      lastError = error as Error
      
      // Don't retry on certain types of errors
      if (error instanceof Error) {
        // Don't retry on syntax errors or authentication errors
        if (error.message.includes('GROQ syntax error') || 
            error.message.includes('Unauthorized') ||
            error.message.includes('Forbidden')) {
          break
        }
      }
      
      // If this is the last attempt, don't wait
      if (attempt === retries) {
        break
      }
      
      // Exponential backoff: wait 2^attempt * 100ms
      const delay = Math.pow(2, attempt) * 100
      await new Promise(resolve => setTimeout(resolve, delay))
      
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Sanity ${operation}] Retry ${attempt + 1}/${retries} after ${delay}ms`)
      }
    }
  }
  
  // Record failed operation
   healthMonitor.recordFailure()
   logPerformance(operation, startTime, false)
   
   // Enhance error message with context
  const enhancedError = new Error(
    `Sanity fetch failed after ${retries + 1} attempts: ${lastError?.message || 'Unknown error'}`
  )
  enhancedError.cause = lastError
  
  console.error('Sanity fetch error:', {
    query: query.substring(0, 200) + (query.length > 200 ? '...' : ''),
    params,
    tags,
    attempts: retries + 1,
    error: lastError?.message,
  })
  
  throw enhancedError
}

// Cache management utilities
export const cacheManager = {
  // Generate cache tags based on content type and identifiers
  generateTags: (contentType: string, identifiers?: string[]): string[] => {
    const baseTags = [contentType, `${contentType}s`]
    if (identifiers) {
      baseTags.push(...identifiers.map(id => `${contentType}:${id}`))
    }
    return baseTags
  },
  
  // Get appropriate revalidation time based on content type
  getRevalidationTime: (contentType: string, priority: 'high' | 'medium' | 'low' = 'medium'): number => {
    const baseTimes = {
      high: 60, // 1 minute
      medium: 300, // 5 minutes  
      low: 900, // 15 minutes
    }
    
    const contentMultipliers: Record<string, number> = {
      'siteSettings': 6, // 6x longer (site settings change rarely)
      'heroSection': 3, // 3x longer
      'featuresSection': 3,
      'testimonial': 2, // 2x longer
      'blogPost': 1, // Base time
      'gallery': 1,
      'servicePackage': 2,
    }
    
    const multiplier = contentMultipliers[contentType] || 1
    return baseTimes[priority] * multiplier
  }
}

// Connection health monitoring
let connectionHealth = {
  lastSuccessfulRequest: Date.now(),
  consecutiveFailures: 0,
  isHealthy: true,
}

export const healthMonitor = {
  recordSuccess: () => {
    connectionHealth.lastSuccessfulRequest = Date.now()
    connectionHealth.consecutiveFailures = 0
    connectionHealth.isHealthy = true
  },
  
  recordFailure: () => {
    connectionHealth.consecutiveFailures++
    connectionHealth.isHealthy = connectionHealth.consecutiveFailures < 5
  },
  
  getHealth: () => ({ ...connectionHealth }),
  
  isHealthy: () => connectionHealth.isHealthy,
}

// Common GROQ queries for the website
export const queries = {
  // Hero Section - More flexible query
  getHeroSection: (language: string = 'id') => `
    *[_type == "heroSection"] | order(_updatedAt desc) [0] {
      _id,
      title,
      subtitle,
      ctaText,
      ctaLink,
      backgroundImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      sliderImages[] {
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          },
          alt
        },
        alt,
        title,
        subtitle,
        caption
      },
      sliderSettings {
        autoPlay,
        autoPlayInterval,
      },
      isActive,
    }
  `,

  // Testimonials
  getTestimonials: (language: string = 'id', featured: boolean = false) => `
    *[_type == "testimonial" && language == "${language}" && isActive == true ${featured ? '&& isFeatured == true' : ''}] | order(dateOfTour desc) {
      _id,
      customerName,
      customerTitle,
      customerPhoto {
        asset-> {
          _id,
          url
        },
        alt
      },
      testimonialText,
      rating,
      tourPackage,
      dateOfTour,
      isFeatured,
      language
    }
  `,

  // Site Settings
  getSiteSettings: () => `
    *[_type == "siteSettings"][0] {
      _id,
      logo {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      logoAlt,
      siteName,
      siteTitle,
      siteDescription,
      contactInfo {
        phone,
        email,
        address,
        whatsapp
      },
      businessHours {
        mondayFriday,
        saturday,
        sunday,
        timezone
      },
      socialMedia {
        instagram,
        facebook,
        youtube,
        twitter,
        tiktok
      },
      content {
        tagline,
        ctaText,
        contactCtaText,
        getInTouchText,
        bookNowText
      },
      navigation {
        homeText,
        aboutText,
        servicesText,
        galleryText,
        blogText,
        contactText
      },
      pageContent {
        homePageTitle,
        homePageDescription,
        aboutPageTitle,
        aboutPageDescription,
        servicesPageTitle,
        servicesPageDescription,
        galleryPageTitle,
        galleryPageDescription,
        blogPageTitle,
        blogPageDescription,
        contactPageTitle,
        contactPageDescription
      },
      blogContent {
        blogSectionTitle,
        blogSectionSubtitle,
        readMoreText,
        noBlogPostsTitle,
        noBlogPostsDescription,
        featuredBadgeText,
        publishedText,
        byText,
        tagsText,
        shareText,
        relatedPostsTitle
      },
      servicesContent {
        popularServicesTitle,
        popularServicesSubtitle,
        allServicesTitle,
        allServicesSubtitle,
        noServicesTitle,
        noServicesDescription,
        ctaTitle,
        ctaDescription,
        ctaButtonText,
        ctaSecondaryButtonText,
        viewAllText,
        learnMoreText
      },
      contactContent {
        getInTouchTitle,
        whatsappText,
        emailText,
        addressText,
        businessHoursText,
        mondayFridayText,
        saturdayText,
        sundayText,
        timezoneText,
        quickResponseTitle,
        quickResponseDescription,
        averageResponseText,
        chatWhatsappText,
        chatWhatsappDescription,
        chatButtonText
      },
      aboutContent {
        mainTitle,
        subtitle,
        ourStoryTitle,
        ourStoryDescription,
        ourMissionTitle,
        ourMissionDescription,
        whyChooseUsTitle,
        whyChooseUsItems
      },
      formContent {
        ctaMessage,
        successMessage,
        errorMessage
      },
      formFields {
        nameLabel,
        namePlaceholder,
        emailLabel,
        emailPlaceholder,
        phoneLabel,
        phonePlaceholder,
        tourInterestLabel,
        travelDateLabel,
        groupSizeLabel,
        groupSizePlaceholder,
        budgetLabel,
        subjectLabel,
        subjectPlaceholder,
        messageLabel,
        messagePlaceholder,
        submitButtonText,
        submittingText
      },
      formOptions {
        tourPackagesText,
        customToursText,
        generalInquiryText,
        budgetUnder5M,
        budget5to10M,
        budget10to20M,
        budget20to50M,
        budgetOver50M
      },
      validationMessages {
        nameMinLength,
        emailInvalid,
        phoneInvalid,
        groupSizeRange,
        subjectMinLength,
        messageMinLength
      },
      copyrightText,
      emailTemplates {
        thankYouMessage,
        responseMessage,
        teamSignature
      },
      theme {
        colors {
          primary,
          primaryLight,
          primaryDark,
          secondary,
          accent,
          textPrimary,
          textSecondary,
          background,
          backgroundAlt
        },
        buttons {
          primaryButton,
          secondaryButton,
          outlineButton
        },
        cards {
          defaultCard,
          serviceCard,
          blogCard
        },
        layout {
          container,
          section,
          headerBg,
          footerBg
        }
      }
    }
  `,

  // Service Packages
  getServicePackages: (category?: string) => `
    *[_type == "servicePackage" ${category ? `&& category == "${category}"` : ''}] | order(order asc, _createdAt desc) {
      _id,
      title,
      slug,
      description,
      icon {
        asset-> {
          _id,
          url
        },
        alt
      },
      features,
      price {
        amount,
        currency,
        unit
      },
      isPopular,
      link,
      order
    }
  `,

  // Popular Service Packages
  getPopularServices: (limit: number = 4) => `
    *[_type == "servicePackage" && isPopular == true] | order(order asc, _createdAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      description,
      icon {
        asset-> {
          _id,
          url
        },
        alt
      },
      features,
      price {
        amount,
        currency,
        unit
      },
      isPopular,
      link,
      order
    }
  `,

  // Business Information
  getBusinessInfo: () => `
    *[_type == "businessInfo"][0] {
      _id,
      logo {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      logoAlt,
      siteName,
      siteTitle,
      siteDescription,
      contactInfo {
        phone,
        email,
        address,
        whatsapp
      },
      businessHours {
        mondayFriday,
        saturday,
        sunday,
        timezone
      },
      content {
        tagline,
        copyrightText
      }
    }
  `,

  getSocialSettings: () => `
    *[_type == "socialSettings"][0] {
      _id,
      socialMedia {
        instagram,
        facebook,
        youtube,
        twitter,
        tiktok
      }
    }
  `,

  // Optimized version for components that only need basic social media links
  getSocialSettingsBasic: () => `
    *[_type == "socialSettings"][0] {
      _id,
      socialMedia {
        instagram,
        facebook,
        youtube,
        twitter,
        tiktok
      }
    }
  `,

  getContactData: () => `
    *[_type == "contactData"][0] {
      _id,
      contactInfo {
        phone,
        address,
        email
      },
      contactWhatsapp,
      whatsappTemplate,
      businessHours {
        mondayFriday,
        timezone
      },
      contactContent {
        pageTitle,
        pageDescription,
        contactDetailsTitle,
        phoneLabel,
        emailLabel,
        addressLabel,
        whatsappLabel,
        businessHoursTitle
      }
    }
  `,

  // Optimized version for layout components that only need basic contact info
  getContactDataBasic: () => `
    *[_type == "contactData"][0] {
      _id,
      contactInfo {
        phone,
        email
      },
      contactWhatsapp,
      whatsappTemplate,
      businessHours {
        mondayFriday
      }
    }
  `,

  getAboutUs: () => `
    *[_type == "aboutUs" && isActive == true][0] {
      _id,
      seoTitle,
      seoDescription,
      mainTitle,
      subtitle,
      contentSection {
        ourStory {
          title,
          content
        },
        ourMission {
          title,
          content
        },
        whyChooseUs {
          title,
          items[] {
            title,
            description,
            icon
          }
        }
      },
      legalitasSection {
        title,
        companyName,
        nib,
        address,
        phone,
        email,
        website
      },
      isActive,
      lastUpdated
    }
  `,

  // Error Pages Configuration
  getErrorPages: (language: string = 'id') => `
    *[_type == "errorPages" && language == "${language}" && isActive == true][0] {
      _id,
      layout {
        showHeader,
        showFooter,
        backgroundColor,
        centerContent
      },
      error404 {
        title,
        subtitle,
        description,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          },
          alt
        },
        primaryButton {
          text,
          link
        },
        secondaryButton {
          text,
          link
        }
      },
      error500 {
        title,
        subtitle,
        description,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          },
          alt
        },
        primaryButton {
          text,
          link
        },
        secondaryButton {
          text,
          link
        }
      },
      error403 {
        title,
        subtitle,
        description,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          },
          alt
        },
        primaryButton {
          text,
          link
        },
        secondaryButton {
          text,
          link
        }
      },
      generalError {
        title,
        subtitle,
        description,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          },
          alt
        },
        primaryButton {
          text,
          link
        },
        secondaryButton {
          text,
          link
        }
      },
      language,
      isActive
    }
  `
}
