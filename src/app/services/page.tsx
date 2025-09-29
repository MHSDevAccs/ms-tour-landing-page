import { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { PageTransition } from '@/components/AnimatedSection'
import { ServicesGrid, ServicePackage } from '@/components/ServiceCard'
import FeaturesSection from '@/components/FeaturesSection'
import { generateServicePageJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Generate comprehensive metadata for services page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    const title = siteSettings?.servicesContent?.pageTitle || 'Layanan Travel & Tour Terlengkap - Mahabbatussholihin Tour'
    const description = siteSettings?.servicesContent?.pageDescription || 'Dapatkan layanan travel terpercaya dengan paket wisata domestik, internasional, umroh, dan corporate travel. Harga terbaik, pelayanan profesional, pengalaman tak terlupakan.'

    return {
      title,
      description,
      keywords: [
        'layanan travel', 'paket wisata', 'tour domestik', 'tour internasional',
        'paket umroh', 'corporate travel', 'group tour', 'honeymoon package',
        'family trip', 'adventure tour', 'cultural tour', 'beach holiday',
        'mountain trekking', 'city tour', 'custom itinerary', 'travel consultation'
      ],
      openGraph: {
        title,
        description,
        url: 'https://travel.mahabbatussholihin.com/services',
        siteName: 'Mahabbatussholihin Tour & Travel',
        locale: 'id_ID',
        type: 'website',
        images: [
          {
            url: '/og-services.jpg',
            width: 1200,
            height: 630,
            alt: 'Layanan Travel & Tour Mahabbatussholihin',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@mhstour',
        title,
        description,
        images: ['/og-services.jpg'],
      },
      alternates: {
        canonical: 'https://travel.mahabbatussholihin.com/services',
      },
    }
  } catch (error) {
    return {
      title: 'Layanan Travel & Tour Terlengkap - Mahabbatussholihin Tour',
      description: 'Dapatkan layanan travel terpercaya dengan paket wisata domestik, internasional, umroh, dan corporate travel. Harga terbaik, pelayanan profesional, pengalaman tak terlupakan.',
    }
  }
}

export default async function ServicesPage() {
  // Fetch services from CMS
  let services: ServicePackage[] = []
  let featuresData = null
  let siteSettings = null

  try {
    services = await sanityFetch<ServicePackage[]>({
      query: queries.getServicePackages(),
      tags: ['servicePackage']
    })

    // Also get features for additional content
    featuresData = await sanityFetch<any>({
      query: queries.getFeaturesSection(),
      tags: ['featuresSection']
    })

    // Get site settings for dynamic content
    siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })
  } catch (error) {
    console.error('Error fetching services:', error)
  }

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'
  const servicePageJsonLd = generateServicePageJsonLd(baseUrl, siteSettings || undefined)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Beranda', url: baseUrl },
    { name: 'Layanan', url: `${baseUrl}/services` }
  ], baseUrl)

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Services Header - HARDCODED */}
        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            {siteSettings?.servicesContent?.mainTitle || 'Layanan Kami'}
          </h1>
          <p className="text-xl text-primary-lighter">
            {siteSettings?.servicesContent?.subtitle || 'Bismillah, kami nawarin berbagai layanan perjalanan yang berkah dan komprehensif yang dirancang buat memenuhi kebutuhan setiap jamaah dengan penuh amanah dan barakah.'}
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Popular Services Section */}
        {services.filter(s => s.isPopular).length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">
                {siteSettings?.servicesContent?.popularServicesTitle || 'Layanan Populer'}
              </h2>
              <p className="text-lg text-gray-600">
                {siteSettings?.servicesContent?.popularServicesSubtitle || 'Pengalaman perjalanan yang paling banyak diminta'}
              </p>
            </div>
            <ServicesGrid 
              services={services.filter(s => s.isPopular)} 
              variant="featured"
              className="mb-8"
            />
          </div>
        )}

        {/* All Services Section */}
        {services.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">
                {siteSettings?.servicesContent?.allServicesTitle }
              </h2>
              <p className="text-lg text-gray-600">
                {siteSettings?.servicesContent?.allServicesSubtitle}
              </p>
            </div>
            <ServicesGrid services={services} variant="default" />
          </div>
        )}

        {/* Additional Features Section */}
        <FeaturesSection 
          data={featuresData} 
          variant="compact" 
          maxFeatures={4}
          className="mb-16" 
        />
        
        {/* Call to Action Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            {siteSettings?.servicesContent?.ctaTitle || 'Siap Merencanakan Petualangan Anda?'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {siteSettings?.servicesContent?.ctaDescription || 'Para ahli perjalanan kami siap membantu Anda membuat itinerary yang sempurna. Hubungi kami hari ini untuk mulai merencanakan liburan impian Anda.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-accent text-primary-dark px-8 py-4 rounded-lg font-semibold text-lg 
                       hover:bg-primary-light transition-colors duration-200 shadow-lg"
            >
              {siteSettings?.servicesContent?.contactButtonText || 'Hubungi Kami'}
            </Link>
            <Link
              href="/about"
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold text-lg 
                       hover:bg-accent hover:text-primary-dark transition-colors duration-200 shadow-lg"
            >
              {siteSettings?.servicesContent?.aboutButtonText || 'Tentang Kami'}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}