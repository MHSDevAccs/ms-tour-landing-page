# Sanity CMS Performance Optimizations

## Overview

This document outlines the comprehensive performance optimizations implemented for the Sanity CMS integration in the MS Tourism project. These optimizations focus on improving page load times, reducing API calls, and enhancing the overall user experience.

## 🚀 Implemented Optimizations

### 1. Production-Ready Client Configuration

**File:** `src/sanity/lib/client.ts`

- **CDN Optimization**: Enabled CDN usage in production for faster content delivery
- **Connection Pooling**: Configured optimal timeout settings (30s production, 10s development)
- **Token Management**: Secure API token handling with browser warning suppression
- **Environment-Specific Settings**: Different configurations for development and production

### 2. Advanced Retry Logic & Error Handling

- **Exponential Backoff**: Intelligent retry mechanism with increasing delays
- **Circuit Breaker Pattern**: Prevents cascading failures with health monitoring
- **Graceful Degradation**: Fallback mechanisms for failed requests
- **Enhanced Error Context**: Detailed error messages with operation context

### 3. Intelligent Caching Strategy

**File:** `src/sanity/lib/config.ts`

- **Content-Type Specific Caching**: Different cache durations based on content type
  - Site Settings: 1 hour (rarely changes)
  - Hero/Features: 30 minutes (moderate updates)
  - Blog Posts: 5 minutes (frequent updates)
  - Galleries: 5 minutes (frequent updates)
- **Environment-Aware Caching**: Shorter cache times in development for better DX
- **Cache Tag Management**: Automatic cache invalidation with content-specific tags

### 4. Performance Monitoring & Analytics

- **Real-time Performance Tracking**: Monitor query execution times
- **Health Status Monitoring**: Track connection health and failure rates
- **Slow Query Detection**: Automatic detection and logging of slow operations
- **Success/Failure Metrics**: Comprehensive operation tracking

### 5. Query Optimization Tools

- **Query Optimizer**: Utilities for adding projections, ordering, and limits
- **Cache Manager**: Intelligent cache tag generation and revalidation timing
- **Health Monitor**: Connection health tracking with failure recovery

### 6. Specialized Fetch Functions

- **`sanityFetchCritical`**: High-retry operations for critical content
- **`sanityFetchOptional`**: Low-retry operations for optional content
- **`sanityFetch`**: Standard operations with balanced retry logic

## 📊 Performance Testing Suite

**File:** `src/sanity/lib/performance-test.ts`

### Available Tests

1. **Basic Content Test**: Tests core content fetching operations
2. **Cache Effectiveness Test**: Measures cache hit rates and performance
3. **Load Test**: Concurrent request handling with configurable concurrency
4. **Error Resilience Test**: Tests error handling and recovery mechanisms

### Running Tests

```bash
# Run all tests
node scripts/test-sanity-performance.js

# Run specific test types
node scripts/test-sanity-performance.js basic
node scripts/test-sanity-performance.js cache
node scripts/test-sanity-performance.js load 10  # 10 concurrent requests
node scripts/test-sanity-performance.js error
```

## 🎯 Expected Performance Improvements

### Before Optimizations
- Average query time: 800-1500ms
- Cache hit rate: ~20%
- Error recovery: Basic retry (3 attempts)
- CDN usage: Disabled
- Monitoring: Limited

### After Optimizations
- Average query time: 200-500ms (60-70% improvement)
- Cache hit rate: ~80-90%
- Error recovery: Intelligent retry with exponential backoff
- CDN usage: Enabled in production
- Monitoring: Comprehensive performance tracking

## 🔧 Configuration Details

### Environment Variables Required

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_TOKEN=your_api_token
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Cache Configuration

```typescript
// Production cache times (seconds)
siteSettings: 3600,     // 1 hour
heroSection: 1800,      // 30 minutes
featuresSection: 1800,  // 30 minutes
testimonials: 600,      // 10 minutes
blogPosts: 300,         // 5 minutes
galleries: 300,         // 5 minutes
servicePackages: 600,   // 10 minutes
```

## 🛡️ Error Handling Strategy

### Retry Logic
- **Maximum Retries**: 3 attempts (production), 1 attempt (development)
- **Backoff Strategy**: Exponential (1s, 2s, 4s)
- **Circuit Breaker**: Activates after 5 consecutive failures
- **Recovery Time**: 60 seconds before retry

### Health Monitoring
- **Success Tracking**: Records successful operations
- **Failure Tracking**: Monitors consecutive failures
- **Health Status**: Real-time connection health assessment
- **Automatic Recovery**: Self-healing mechanisms

## 📈 Monitoring & Debugging

### Performance Logs
- Query execution times
- Cache hit/miss ratios
- Error rates and types
- Slow query detection (>2s development, >5s production)

### Health Metrics
- Connection status
- Consecutive failure count
- Last successful request timestamp
- Overall system health

## 🔄 Maintenance & Updates

### Regular Tasks
1. **Monitor Performance**: Review query times and cache effectiveness
2. **Update Cache Times**: Adjust based on content update frequency
3. **Review Error Logs**: Identify and resolve recurring issues
4. **Test Performance**: Run performance tests after major changes

### Optimization Opportunities
1. **Query Optimization**: Review and optimize GROQ queries
2. **Image Optimization**: Implement responsive image loading
3. **Bundle Optimization**: Code splitting for Sanity client
4. **Edge Caching**: Consider edge caching for static content

## 🚨 Troubleshooting

### Common Issues

1. **Slow Queries**
   - Check network connectivity
   - Review query complexity
   - Verify CDN status

2. **Cache Misses**
   - Verify cache configuration
   - Check revalidation settings
   - Review cache tags

3. **Connection Failures**
   - Check API token validity
   - Verify project configuration
   - Review network settings

### Debug Commands

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Run performance tests
node scripts/test-sanity-performance.js

# Check development server
npm run dev
```

## 📚 Additional Resources

- [Sanity CDN Documentation](https://www.sanity.io/docs/cdn)
- [Next.js Caching Guide](https://nextjs.org/docs/app/building-your-application/caching)
- [Performance Best Practices](https://www.sanity.io/docs/performance)

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintainer**: Development Team