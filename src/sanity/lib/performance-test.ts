// Performance testing utility for Sanity optimizations
import { sanityFetch, queries, healthMonitor } from './client'

interface PerformanceMetrics {
  operation: string
  duration: number
  success: boolean
  timestamp: number
  cacheHit?: boolean
  retryCount?: number
}

class PerformanceTracker {
  private metrics: PerformanceMetrics[] = []
  private testStartTime: number = 0

  startTest() {
    this.testStartTime = Date.now()
    this.metrics = []
    console.log('🚀 Starting Sanity performance test...')
  }

  async measureOperation<T>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<{ result: T; metrics: PerformanceMetrics }> {
    const startTime = Date.now()
    let success = false
    let result: T

    try {
      result = await operation()
      success = true
    } catch (error) {
      console.error(`❌ Operation ${operationName} failed:`, error)
      throw error
    } finally {
      const duration = Date.now() - startTime
      const metrics: PerformanceMetrics = {
        operation: operationName,
        duration,
        success,
        timestamp: startTime,
      }
      
      this.metrics.push(metrics)
      
      const status = success ? '✅' : '❌'
      console.log(`${status} ${operationName}: ${duration}ms`)
    }

    return { result: result!, metrics: this.metrics[this.metrics.length - 1] }
  }

  getReport() {
    const totalDuration = Date.now() - this.testStartTime
    const successfulOps = this.metrics.filter(m => m.success)
    const failedOps = this.metrics.filter(m => !m.success)
    
    const avgDuration = successfulOps.length > 0 
      ? successfulOps.reduce((sum, m) => sum + m.duration, 0) / successfulOps.length 
      : 0

    const slowOps = successfulOps.filter(m => m.duration > 2000)
    const fastOps = successfulOps.filter(m => m.duration < 500)

    return {
      summary: {
        totalOperations: this.metrics.length,
        successfulOperations: successfulOps.length,
        failedOperations: failedOps.length,
        totalTestDuration: totalDuration,
        averageOperationDuration: Math.round(avgDuration),
        successRate: Math.round((successfulOps.length / this.metrics.length) * 100),
      },
      performance: {
        fastOperations: fastOps.length,
        slowOperations: slowOps.length,
        fastestOperation: successfulOps.reduce((min, m) => m.duration < min.duration ? m : min, successfulOps[0]),
        slowestOperation: successfulOps.reduce((max, m) => m.duration > max.duration ? m : max, successfulOps[0]),
      },
      healthStatus: healthMonitor.getHealth(),
      detailedMetrics: this.metrics,
    }
  }

  printReport() {
    const report = this.getReport()
    
    console.log('\n📊 SANITY PERFORMANCE REPORT')
    console.log('=' .repeat(50))
    
    console.log('\n📈 Summary:')
    console.log(`  Total Operations: ${report.summary.totalOperations}`)
    console.log(`  Success Rate: ${report.summary.successRate}%`)
    console.log(`  Average Duration: ${report.summary.averageOperationDuration}ms`)
    console.log(`  Total Test Time: ${report.summary.totalTestDuration}ms`)
    
    console.log('\n⚡ Performance:')
    console.log(`  Fast Operations (<500ms): ${report.performance.fastOperations}`)
    console.log(`  Slow Operations (>2000ms): ${report.performance.slowOperations}`)
    
    if (report.performance.fastestOperation) {
      console.log(`  Fastest: ${report.performance.fastestOperation.operation} (${report.performance.fastestOperation.duration}ms)`)
    }
    
    if (report.performance.slowestOperation) {
      console.log(`  Slowest: ${report.performance.slowestOperation.operation} (${report.performance.slowestOperation.duration}ms)`)
    }
    
    console.log('\n🏥 Health Status:')
    console.log(`  Connection Healthy: ${report.healthStatus.isHealthy ? '✅' : '❌'}`)
    console.log(`  Consecutive Failures: ${report.healthStatus.consecutiveFailures}`)
    console.log(`  Last Success: ${new Date(report.healthStatus.lastSuccessfulRequest).toLocaleTimeString()}`)
    
    if (report.summary.failedOperations > 0) {
      console.log('\n❌ Failed Operations:')
      report.detailedMetrics
        .filter(m => !m.success)
        .forEach(m => console.log(`  - ${m.operation} at ${new Date(m.timestamp).toLocaleTimeString()}`))
    }
    
    console.log('\n' + '='.repeat(50))
  }
}

// Predefined test suites
export const performanceTests = {
  // Basic content fetching test
  async basicContentTest() {
    const tracker = new PerformanceTracker()
    tracker.startTest()

    try {
      // Test site settings (should be cached)
      await tracker.measureOperation('Site Settings', () =>
        sanityFetch({
          query: queries.getSiteSettings(),
          tags: ['siteSettings'],
          revalidate: 3600, // 1 hour cache
        })
      )

      // Test hero section
      await tracker.measureOperation('Hero Section', () =>
        sanityFetch({
          query: queries.getHeroSection(),
          tags: ['heroSection'],
          revalidate: 1800, // 30 minutes cache
        })
      )

      // Test features section
      await tracker.measureOperation('Features Section', () =>
        sanityFetch({
          query: queries.getFeaturesSection(),
          tags: ['featuresSection'],
          revalidate: 1800, // 30 minutes cache
        })
      )

      // Test blog posts
      await tracker.measureOperation('Blog Posts', () =>
        sanityFetch({
          query: queries.getBlogPosts('id', false, 10),
          tags: ['blogPosts'],
          revalidate: 300, // 5 minutes cache
        })
      )

      // Test service packages
      await tracker.measureOperation('Service Packages', () =>
        sanityFetch({
          query: queries.getServicePackages(),
          tags: ['servicePackages'],
          revalidate: 600, // 10 minutes cache
        })
      )

    } catch (error) {
      console.error('Test suite failed:', error)
    }

    tracker.printReport()
    return tracker.getReport()
  },

  // Cache effectiveness test
  async cacheEffectivenessTest() {
    const tracker = new PerformanceTracker()
    tracker.startTest()

    console.log('🔄 Testing cache effectiveness...')

    try {
      // First request (should hit Sanity)
      await tracker.measureOperation('Site Settings (First Request)', () =>
        sanityFetch({
          query: queries.getSiteSettings(),
          tags: ['siteSettings'],
          revalidate: 3600,
        })
      )

      // Second request (should hit cache)
      await tracker.measureOperation('Site Settings (Cached Request)', () =>
        sanityFetch({
          query: queries.getSiteSettings(),
          tags: ['siteSettings'],
          revalidate: 3600,
        })
      )

      // Third request (should still hit cache)
      await tracker.measureOperation('Site Settings (Second Cached Request)', () =>
        sanityFetch({
          query: queries.getSiteSettings(),
          tags: ['siteSettings'],
          revalidate: 3600,
        })
      )

    } catch (error) {
      console.error('Cache test failed:', error)
    }

    tracker.printReport()
    return tracker.getReport()
  },

  // Load test with multiple concurrent requests
  async loadTest(concurrency: number = 5) {
    const tracker = new PerformanceTracker()
    tracker.startTest()

    console.log(`🔥 Running load test with ${concurrency} concurrent requests...`)

    try {
      const promises = Array.from({ length: concurrency }, (_, i) =>
        tracker.measureOperation(`Concurrent Request ${i + 1}`, () =>
          sanityFetch({
            query: queries.getBlogPosts('id', false, 5),
            tags: ['blogPosts'],
            revalidate: 300,
          })
        )
      )

      await Promise.all(promises)

    } catch (error) {
      console.error('Load test failed:', error)
    }

    tracker.printReport()
    return tracker.getReport()
  },

  // Error resilience test
  async errorResilienceTest() {
    const tracker = new PerformanceTracker()
    tracker.startTest()

    console.log('🛡️ Testing error resilience...')

    try {
      // Test with invalid query (should fail gracefully)
      await tracker.measureOperation('Invalid Query Test', () =>
        sanityFetch({
          query: '*[_type == "nonexistentType"]',
          tags: ['test'],
        })
      ).catch(() => {
        // Expected to fail, but should be handled gracefully
      })

      // Test with valid query after error (should recover)
      await tracker.measureOperation('Recovery Test', () =>
        sanityFetch({
          query: queries.getSiteSettings(),
          tags: ['siteSettings'],
        })
      )

    } catch (error) {
      console.error('Error resilience test failed:', error)
    }

    tracker.printReport()
    return tracker.getReport()
  },
}

// Export the tracker for custom tests
export { PerformanceTracker }

// Utility function to run all tests
export async function runAllPerformanceTests() {
  console.log('🧪 Running comprehensive Sanity performance tests...\n')
  
  const results = {
    basicContent: await performanceTests.basicContentTest(),
    cacheEffectiveness: await performanceTests.cacheEffectivenessTest(),
    loadTest: await performanceTests.loadTest(3),
    errorResilience: await performanceTests.errorResilienceTest(),
  }
  
  console.log('\n🎯 OVERALL TEST SUMMARY')
  console.log('=' .repeat(50))
  
  Object.entries(results).forEach(([testName, result]) => {
    console.log(`${testName}: ${result.summary.successRate}% success rate, ${result.summary.averageOperationDuration}ms avg`)
  })
  
  return results
}