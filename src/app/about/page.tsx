import { Metadata } from 'next'
import { sanityFetch, queries } from '@/sanity/lib/client'

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    return {
      title: siteSettings?.pageContent?.aboutPageTitle || 'About Us',
      description: siteSettings?.pageContent?.aboutPageDescription || 'Learn more about Mahabbatussholihin Tour & Travel and our commitment to providing exceptional travel experiences.',
    }
  } catch (error) {
    console.error('Failed to fetch metadata:', error)
    return {
      title: 'About Us',
      description: 'Learn more about Mahabbatussholihin Tour & Travel and our commitment to providing exceptional travel experiences.',
    }
  }
}

export default async function AboutPage() {
  // Fetch site settings for about content
  let siteSettings: any = null

  try {
    siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
  }

  return (
    <div className="min-h-screen bg-secondary-light py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            {siteSettings?.aboutContent?.mainTitle || 'About Mahabbatussholihin Tour & Travel'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {siteSettings?.aboutContent?.subtitle || 'Your trusted partner for unforgettable travel experiences since our founding.'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-black mb-4">
            {siteSettings?.aboutContent?.ourStoryTitle || 'Our Story'}
          </h2>
          <p className="text-gray-700 mb-6">
            {siteSettings?.aboutContent?.ourStoryDescription || 'Mahabbatussholihin Tour & Travel was founded with a simple mission: to create memorable travel experiences that connect people with amazing destinations around the world. We believe that travel has the power to transform lives, broaden perspectives, and create lasting memories.'}
          </p>
          
          <h2 className="text-2xl font-semibold text-black mb-4">
            {siteSettings?.aboutContent?.ourMissionTitle || 'Our Mission'}
          </h2>
          <p className="text-gray-700 mb-6">
            {siteSettings?.aboutContent?.ourMissionDescription || 'To provide exceptional, personalized travel services that exceed our customers\' expectations while promoting sustainable and responsible tourism practices.'}
          </p>
          
          <h2 className="text-2xl font-semibold text-black mb-4">
            {siteSettings?.aboutContent?.whyChooseUsTitle || 'Why Choose Us'}
          </h2>
          {siteSettings?.aboutContent?.whyChooseUsItems && siteSettings.aboutContent.whyChooseUsItems.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {siteSettings.aboutContent.whyChooseUsItems.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Expert local knowledge and carefully curated itineraries</li>
              <li>24/7 customer support throughout your journey</li>
              <li>Competitive pricing with transparent, no-hidden-fees policy</li>
              <li>Sustainable tourism practices that benefit local communities</li>
              <li>Flexible booking options and customizable tour packages</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}