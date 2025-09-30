import { NextResponse } from 'next/server'
import { sanityFetch, queries } from '@/sanity/lib/client'

export async function GET() {
  try {
    const services = await sanityFetch<any[]>({
      query: queries.getServicePackages(),
      tags: ['servicePackage']
    })

    return NextResponse.json({
      success: true,
      count: services?.length || 0,
      services: services || [],
      debug: {
        hasServices: !!services && services.length > 0,
        firstService: services?.[0] || null,
        imageData: services?.[0]?.icon || null
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      services: []
    })
  }
}