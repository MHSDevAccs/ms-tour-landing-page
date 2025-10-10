import { NextResponse } from 'next/server'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { writeFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const heroData = await sanityFetch<any>({
      query: queries.getHeroSection('id'),
      tags: ['heroSection']
    });

    const debugData = { 
      heroData,
      hasSliderImages: !!heroData?.sliderImages,
      sliderImagesCount: heroData?.sliderImages?.length || 0,
      sliderImages: heroData?.sliderImages || []
    };

    // Write to file for debugging
    const debugFilePath = join(process.cwd(), 'hero-debug.json');
    writeFileSync(debugFilePath, JSON.stringify(debugData, null, 2));

    return NextResponse.json({ 
      message: 'Hero debug data written to hero-debug.json',
      summary: {
        hasSliderImages: !!heroData?.sliderImages,
        sliderImagesCount: heroData?.sliderImages?.length || 0,
        hasTitle: !!heroData?.title,
        hasSubtitle: !!heroData?.subtitle,
        hasCtaText: !!heroData?.ctaText,
        hasCtaLink: !!heroData?.ctaLink
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch hero data', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}