import { Metadata } from 'next'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { ServicePackage } from '@/components/ServiceCard'
import ServicesPageContent from '@/components/ServicesPageContent'
import { generateServicePageJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'

// Force dynamic rendering
// Enable static generation with revalidation
export const revalidate = 600 // Revalidate every 10 minutes for services content

// Generate comprehensive metadata for services page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

  
    const description = siteSettings?.servicesContent?.pageDescription || 'Dapatkan layanan travel terpercaya dengan paket wisata domestik, internasional, umroh, dan corporate travel. Harga terbaik, pelayanan profesional, pengalaman tak terlupakan.'

    return {

      description,
      keywords: [
        'layanan travel', 'paket wisata', 'tour domestik', 'tour internasional',
        'paket umroh', 'corporate travel', 'group tour', 'honeymoon package',
        'family trip', 'adventure tour', 'cultural tour', 'beach holiday',
        'mountain trekking', 'city tour', 'custom itinerary', 'travel consultation'
      ],
      openGraph: {
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
  } catch (error) {
    console.error('Error fetching services:', error)
  }

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'
  const servicePageJsonLd = generateServicePageJsonLd(baseUrl)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Beranda', url: baseUrl },
    { name: 'Layanan', url: `${baseUrl}/services` }
  ], baseUrl)

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Services Page Content with Modal */}
      <ServicesPageContent 
        services={services}
        featuresData={featuresData}
      />
    </>
  )
}