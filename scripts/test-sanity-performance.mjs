#!/usr/bin/env node

/**
 * Sanity Performance Test Runner
 * 
 * This script runs performance tests on the Sanity client configuration
 * to measure the impact of optimizations.
 * 
 * Usage:
 *   node scripts/test-sanity-performance.js [test-type]
 * 
 * Test types:
 *   - basic: Basic content fetching test
 *   - cache: Cache effectiveness test
 *   - load: Load test with concurrent requests
 *   - error: Error resilience test
 *   - all: Run all tests (default)
 */

import { performanceTests, runAllPerformanceTests } from '../src/sanity/lib/performance-test.js'

async function main() {
  const testType = process.argv[2] || 'all'
  
  console.log('🔧 Sanity Performance Test Runner')
  console.log(`📅 ${new Date().toLocaleString()}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🧪 Test Type: ${testType}\n`)

  try {
    switch (testType.toLowerCase()) {
      case 'basic':
        await performanceTests.basicContentTest()
        break
        
      case 'cache':
        await performanceTests.cacheEffectivenessTest()
        break
        
      case 'load':
        const concurrency = parseInt(process.argv[3]) || 5
        await performanceTests.loadTest(concurrency)
        break
        
      case 'error':
        await performanceTests.errorResilienceTest()
        break
        
      case 'all':
      default:
        await runAllPerformanceTests()
        break
    }
    
    console.log('\n✅ Performance tests completed successfully!')
    
  } catch (error) {
    console.error('\n❌ Performance tests failed:', error.message)
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

// Run the tests
main()