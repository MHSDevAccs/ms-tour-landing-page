// Production-optimized Sanity configuration
export const sanityConfig = {
  // Environment-specific settings
  production: {
    useCdn: true,
    timeout: 30000,
    retries: 3,
    cache: {
      // Default cache times for different content types (in seconds)
      siteSettings: 3600, // 1 hour
      heroSection: 1800, // 30 minutes
      featuresSection: 1800, // 30 minutes
      testimonials: 600, // 10 minutes
      blogPosts: 300, // 5 minutes
      galleries: 300, // 5 minutes
      servicePackages: 600, // 10 minutes
    },
    performance: {
      enableMonitoring: true,
      slowQueryThreshold: 5000, // 5 seconds
      logLevel: 'warn',
    },
  },
  
  development: {
    useCdn: false,
    timeout: 10000,
    retries: 1,
    cache: {
      // Shorter cache times for development
      siteSettings: 60, // 1 minute
      heroSection: 30, // 30 seconds
      featuresSection: 30, // 30 seconds
      testimonials: 30, // 30 seconds
      blogPosts: 30, // 30 seconds
      galleries: 30, // 30 seconds
      servicePackages: 30, // 30 seconds
    },
    performance: {
      enableMonitoring: true,
      slowQueryThreshold: 2000, // 2 seconds
      logLevel: 'debug',
    },
  },
  
  // Query optimization settings
  queryLimits: {
    maxBlogPosts: 50,
    maxGalleries: 100,
    maxTestimonials: 20,
    maxServicePackages: 50,
    defaultPageSize: 20,
  },
  
  // Image optimization settings
  imageOptimization: {
    defaultWidth: 800,
    defaultHeight: 600,
    quality: 85,
    formats: ['webp', 'jpg'],
    thumbnailSizes: [150, 300, 600, 1200],
  },
  
  // Error handling settings
  errorHandling: {
    maxConsecutiveFailures: 5,
    circuitBreakerTimeout: 60000, // 1 minute
    fallbackEnabled: true,
  },
}

// Get current environment configuration
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  return env === 'production' ? sanityConfig.production : sanityConfig.development
}

// Get cache time for specific content type
export const getCacheTime = (contentType: string): number => {
  const config = getCurrentConfig()
  return config.cache[contentType as keyof typeof config.cache] || config.cache.blogPosts
}

// Check if performance monitoring is enabled
export const isMonitoringEnabled = (): boolean => {
  return getCurrentConfig().performance.enableMonitoring
}

// Get slow query threshold
export const getSlowQueryThreshold = (): number => {
  return getCurrentConfig().performance.slowQueryThreshold
}

// Get log level
export const getLogLevel = (): string => {
  return getCurrentConfig().performance.logLevel
}