import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tags } = body

    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Tags array is required' },
        { status: 400 }
      )
    }

    // Revalidate each tag
    for (const tag of tags) {
      revalidateTag(tag)
    }

    return NextResponse.json({ 
      revalidated: true, 
      tags,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}