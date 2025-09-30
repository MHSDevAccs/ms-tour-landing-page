import { NextResponse } from 'next/server'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { urlForProduct } from '@/sanity/lib/image'

export async function GET() {
  try {
    const services = await sanityFetch<any[]>({
      query: queries.getServicePackages(),
      tags: ['servicePackage']
    })

    const firstService = services?.[0]
    if (!firstService?.icon?.asset) {
      return NextResponse.json({
        success: false,
        error: 'No service with image found'
      })
    }

    const imageUrl = urlForProduct(firstService.icon).url()
    const imageUrlWithDimensions = urlForProduct(firstService.icon).width(800).height(600).url()

    return NextResponse.json({
      success: true,
      originalImageData: firstService.icon,
      generatedUrl: imageUrl,
      generatedUrlWithDimensions: imageUrlWithDimensions,
      serviceTitle: firstService.title
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}