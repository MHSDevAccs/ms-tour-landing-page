/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

'use client'

import { Suspense, lazy } from 'react'

// Force client-side rendering and disable SSR completely
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

// Lazy load the Studio to reduce initial bundle size
const LazyStudio = lazy(async () => {
  const { NextStudio } = await import('next-sanity/studio')
  const config = await import('../../../../sanity.config')
  
  return {
    default: () => <NextStudio config={config.default} />
  }
})

function StudioLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">
        <div className="text-lg text-gray-600">Memuat Sanity Studio...</div>
        <div className="mt-4 text-sm text-gray-500">Mohon tunggu sebentar</div>
      </div>
    </div>
  )
}

export default function StudioPage() {
  return (
    <Suspense fallback={<StudioLoading />}>
      <LazyStudio />
    </Suspense>
  )
}
