import { Metadata } from 'next'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { ServicePackage } from '@/components/ServiceCard'
import ServicePackagesSection from '@/components/ServicePackagesSection'
import CTASection from '@/components/CTASection'
import { generateServicePageJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'
import AnimatedSection, { PageTransition } from '@/components/AnimatedSection'

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
        site: '@MStour',
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
  // Fetch popular services, site settings, and contact data from CMS
  let services: ServicePackage[] = []
  let siteSettings = null
  let contactData = null

  try {
    const [servicesData, settingsData, contactInfo] = await Promise.all([
      sanityFetch<ServicePackage[]>({
        query: queries.getPopularServices(10), // Get up to 10 popular services
        tags: ['servicePackage']
      }),
      sanityFetch<any>({
        query: queries.getSiteSettings(),
        tags: ['siteSettings']
      }),
      sanityFetch<any>({
        query: queries.getContactDataBasic(),
        tags: ['contactData']
      })
    ])
    
    services = servicesData
    siteSettings = settingsData
    contactData = contactInfo
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
    <PageTransition>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Services Page Header */}
      <AnimatedSection className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Paket Rekomendasi
          </h1>
          <p className="text-xl text-white">
            Pilihan terbaik paket wisata yang telah dipercaya ribuan pelanggan untuk pengalaman perjalanan tak terlupakan
          </p>
        </div>
      </AnimatedSection>
      
      {/* Service Packages Section - Same styling as main page */}
      <ServicePackagesSection 
        servicePackages={services}
        siteSettings={siteSettings}
        showViewAllButton={false}
      />
      
      {/* Call to Action Section */}
      <CTASection 
        contactData={contactData}
        title="Tertarik dengan Paket Kami?"
        description="Konsultasikan kebutuhan perjalanan Anda dengan tim profesional kami. Dapatkan penawaran terbaik dan pelayanan yang memuaskan."
        buttonText="Konsultasi Sekarang"
      />
    </PageTransition>
  )
}