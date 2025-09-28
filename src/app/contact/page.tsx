import { Metadata } from 'next'
import { sanityFetch, queries } from '@/sanity/lib/client'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { generateContactPageJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    const title = siteSettings?.contactContent?.pageTitle || 'Hubungi Kami - Mahabbatussholihin Tour & Travel'
    const description = siteSettings?.contactContent?.pageDescription || 'Butuh bantuan atau informasi? Hubungi tim professional Mahabbatussholihin Tour & Travel. Konsultasi gratis untuk semua kebutuhan perjalanan Anda. WhatsApp, telepon, atau email tersedia 24/7.'

    return {
      title,
      description,
      keywords: [
        'hubungi mahabbatussholihin', 'kontak travel agent', 'konsultasi travel', 'booking tour',
        'informasi paket wisata', 'customer service', 'travel consultation', 'whatsapp travel',
        'telepon travel agency', 'email travel', 'alamat kantor travel', 'jam operasional',
        'konsultasi gratis', 'tanya jawab travel', 'bantuan booking', 'layanan pelanggan'
      ],
      openGraph: {
        title,
        description,
        url: 'https://travel.mahabbatussholihin.com/contact',
        siteName: 'Mahabbatussholihin Tour & Travel',
        locale: 'id_ID',
        type: 'website',
        images: [
          {
            url: '/og-contact.jpg',
            width: 1200,
            height: 630,
            alt: 'Hubungi Mahabbatussholihin Tour & Travel',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@mhstour',
        title,
        description,
        images: ['/og-contact.jpg'],
      },
      alternates: {
        canonical: 'https://travel.mahabbatussholihin.com/contact',
      },
    }
  } catch (error) {
    return {
      title: 'Hubungi Kami - Mahabbatussholihin Tour & Travel',
      description: 'Butuh bantuan atau informasi? Hubungi tim professional Mahabbatussholihin Tour & Travel. Konsultasi gratis untuk semua kebutuhan perjalanan Anda. WhatsApp, telepon, atau email tersedia 24/7.',
    }
  }
}

export default async function ContactPage() {
  // Fetch site settings for contact information
  let siteSettings: any = null

  try {
    siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
  }

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'
  const contactPageJsonLd = generateContactPageJsonLd(baseUrl, siteSettings || undefined)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Beranda', url: baseUrl },
    { name: 'Kontak', url: `${baseUrl}/contact` }
  ], baseUrl)

  return (
    <PageTransition className="min-h-screen bg-secondary-light">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <AnimatedSection direction="fade" className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">
              {siteSettings?.contactContent?.pageTitle || 'Hubungi Kami'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {siteSettings?.contactContent?.pageDescription || siteSettings?.content?.contactCtaText || 'Kami siap membantu Anda merencanakan perjalanan yang berkesan'}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16">
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <StaggerItem>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-black mb-6">
                {siteSettings?.contactContent?.contactDetailsTitle || 'Informasi Kontak'}
              </h2>
              
              <div className="space-y-6">
                {/* Phone */}
                {siteSettings?.contactInfo?.phone && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-black">
                        {siteSettings?.contactContent?.phoneLabel || 'Telepon'}
                      </h3>
                      <a 
                        href={`tel:${siteSettings.contactInfo.phone}`}
                        className="text-black hover:text-gray-700 transition-colors"
                      >
                        {siteSettings.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {siteSettings?.contactInfo?.whatsapp && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-black">
                        {siteSettings?.contactContent?.whatsappLabel || 'WhatsApp'}
                      </h3>
                      <a 
                        href={`https://wa.me/${siteSettings.contactInfo.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-700 transition-colors"
                      >
                        {siteSettings.contactInfo.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {siteSettings?.contactInfo?.email && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-black">
                        {siteSettings?.contactContent?.emailLabel || 'Email'}
                      </h3>
                      <a 
                        href={`mailto:${siteSettings.contactInfo.email}`}
                        className="text-black hover:text-gray-700 transition-colors"
                      >
                        {siteSettings.contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Address */}
                {siteSettings?.contactInfo?.address && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-black">
                        {siteSettings?.contactContent?.addressLabel || 'Alamat'}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {siteSettings.contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </StaggerItem>

          {/* Business Hours & Additional Info */}
          <StaggerItem>
            <div className="space-y-8">
              
              {/* Business Hours */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-semibold text-black mb-6">
                  {siteSettings?.contactContent?.businessHoursTitle || 'Jam Operasional'}
                </h2>
                
                <div className="space-y-3">
                  {siteSettings?.businessHours ? (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          {siteSettings?.contactContent?.mondayFridayLabel || 'Senin - Jumat'}
                        </span>
                        <span className="font-medium text-black">
                          {siteSettings.businessHours.mondayFriday || '09:00 - 17:00'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          {siteSettings?.contactContent?.saturdayLabel || 'Sabtu'}
                        </span>
                        <span className="font-medium text-black">
                          {siteSettings.businessHours.saturday || '09:00 - 15:00'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">
                          {siteSettings?.contactContent?.sundayLabel || 'Minggu'}
                        </span>
                        <span className="font-medium text-black">
                          {siteSettings.businessHours.sunday || siteSettings?.contactContent?.closedLabel || 'Tutup'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Senin - Jumat</span>
                        <span className="font-medium text-black">09:00 - 17:00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Sabtu</span>
                        <span className="font-medium text-black">09:00 - 15:00</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Minggu</span>
                        <span className="font-medium text-black">Tutup</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Response */}
              {siteSettings?.contactContent?.quickResponseText && (
                <div className="bg-primary-lighter rounded-lg border border-primary-light p-6">
                  <h3 className="text-lg font-semibold text-primary-dark mb-3">
                    {siteSettings?.contactContent?.quickResponseTitle || 'Respon Cepat'}
                  </h3>
                  <p className="text-primary leading-relaxed">
                    {siteSettings.contactContent.quickResponseText}
                  </p>
                </div>
              )}

              {/* WhatsApp Quick Contact */}
              {siteSettings?.contactInfo?.whatsapp && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-3">
                    {siteSettings?.contactContent?.whatsappQuickTitle || 'Chat WhatsApp'}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {siteSettings?.contactContent?.whatsappQuickText || 'Hubungi kami melalui WhatsApp untuk respon yang lebih cepat'}
                  </p>
                  <a 
                    href={`https://wa.me/${siteSettings.contactInfo.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-accent text-primary-dark px-4 py-2 rounded-lg hover:bg-primary-light transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    {siteSettings?.contactContent?.whatsappButtonText || 'Chat Sekarang'}
                  </a>
                </div>
              )}
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Services Section */}
        {siteSettings?.contactContent?.servicesText && (
          <AnimatedSection direction="up" delay={0.6} className="mt-16">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-black mb-6 text-center">
                {siteSettings?.contactContent?.servicesTitle || 'Layanan Kami'}
              </h2>
              <div className="prose prose-gray max-w-none text-center">
                <p className="text-gray-600 leading-relaxed">
                  {siteSettings.contactContent.servicesText}
                </p>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </PageTransition>
  )
}