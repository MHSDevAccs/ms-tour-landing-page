/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { Suspense } from 'react'

// Force client-side rendering and disable SSR completely
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

function StudioLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Loading Sanity Studio...</div>
    </div>
  )
}

export default function StudioPage() {
  return (
    <Suspense fallback={<StudioLoading />}>
      <NextStudio config={config} />
    </Suspense>
  )
}
