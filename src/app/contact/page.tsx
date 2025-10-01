import { Metadata } from 'next'
import { sanityFetch, queries } from '@/sanity/lib/client'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { generateContactPageJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch business info for contact information (primary source)
    const businessInfo = await sanityFetch<any>({
      query: queries.getBusinessInfo(),
      tags: ['businessInfo']
    })

    // Fallback to siteSettings if businessInfo doesn't have contact content
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    const title = businessInfo?.content?.contactPageTitle || siteSettings?.contactContent?.pageTitle || 'Hubungi Kami - Mahabbatussholihin Tour & Travel'
    const description = businessInfo?.content?.contactPageDescription || siteSettings?.contactContent?.pageDescription || 'Butuh bantuan atau informasi? Hubungi tim professional Mahabbatussholihin Tour & Travel. Konsultasi gratis untuk semua kebutuhan perjalanan Anda. WhatsApp, telepon, atau email tersedia 24/7.'

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
  // Fetch business info for contact information (primary source)
  let businessInfo: any = null
  let siteSettings: any = null
  let socialSettings: any = null

  try {
    businessInfo = await sanityFetch<any>({
      query: queries.getBusinessInfo(),
      tags: ['businessInfo']
    })
    console.log('Contact Page: Fetched businessInfo:', businessInfo)
  } catch (error) {
    console.error('Failed to fetch business info:', error)
  }

  // Fetch social settings for social media data
  try {
    socialSettings = await sanityFetch<any>({
      query: queries.getSocialSettings(),
      tags: ['socialSettings']
    })
    console.log('Contact Page: Fetched socialSettings:', socialSettings)
  } catch (error) {
    console.error('Failed to fetch social settings:', error)
  }

  // Fallback to siteSettings if needed
  try {
    siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
  }

  // Use businessInfo as primary source, fallback to siteSettings
  const contactData = businessInfo || siteSettings
  
  // Use socialSettings for social media, fallback to siteSettings
  const socialData = socialSettings || siteSettings

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'
  const contactPageJsonLd = generateContactPageJsonLd(baseUrl, contactData || undefined)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Beranda', url: baseUrl },
    { name: 'Kontak', url: `${baseUrl}/contact` }
  ], baseUrl)

  return (
    <PageTransition className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Contact Header */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            {contactData?.content?.contactPageTitle || contactData?.contactContent?.pageTitle || 'Hubungi Kami'}
          </h1>
          <p className="text-xl text-primary-lighter">
            {contactData?.content?.contactPageDescription || contactData?.contactContent?.pageDescription || contactData?.content?.contactCtaText || 'Kami siap membantu Anda merencanakan perjalanan yang berkesan'}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16">
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <StaggerItem>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-black mb-6">
                {contactData?.contactContent?.contactDetailsTitle || 'Informasi Kontak'}
              </h2>
              
              <div className="space-y-6">
                {/* Phone */}
                {contactData?.contactInfo?.phone && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-black">
                        {contactData?.contactContent?.phoneLabel || 'Telepon'}
                      </h3>
                      <a 
                        href={`tel:${contactData.contactInfo.phone}`}
                        className="text-black hover:text-gray-700 transition-colors"
                      >
                        {contactData.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {contactData?.contactInfo?.whatsapp && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-black">
                        {contactData?.contactContent?.whatsappLabel || 'WhatsApp'}
                      </h3>
                      <a 
                        href={`https://wa.me/${contactData.contactInfo.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-700 transition-colors"
                      >
                        {contactData.contactInfo.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {contactData?.contactInfo?.email && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-black">
                        {contactData?.contactContent?.emailLabel || 'Email'}
                      </h3>
                      <a 
                        href={`mailto:${contactData.contactInfo.email}`}
                        className="text-black hover:text-gray-700 transition-colors"
                      >
                        {contactData.contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Address */}
                {contactData?.contactInfo?.address && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-black">
                        {contactData?.contactContent?.addressLabel || 'Alamat'}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {contactData.contactInfo.address}
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
                  {contactData?.contactContent?.businessHoursTitle || 'Jam Operasional'}
                </h2>
                
                <div className="space-y-3">
                  {contactData?.businessHours ? (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          {contactData?.contactContent?.mondayFridayLabel || 'Senin - Jumat'}
                        </span>
                        <span className="font-medium text-black">
                          {contactData.businessHours.mondayFriday || '09:00 - 17:00'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          {contactData?.contactContent?.saturdayLabel || 'Sabtu'}
                        </span>
                        <span className="font-medium text-black">
                          {contactData.businessHours.saturday || '09:00 - 15:00'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">
                          {contactData?.contactContent?.sundayLabel || 'Minggu'}
                        </span>
                        <span className="font-medium text-black">
                          {contactData.businessHours.sunday || contactData?.contactContent?.closedLabel || 'Tutup'}
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
              {contactData?.contactContent?.quickResponseText && (
                <div className="bg-primary-lighter rounded-lg border border-primary-light p-6">
                  <h3 className="text-lg font-semibold text-primary-dark mb-3">
                    {contactData?.contactContent?.quickResponseTitle || 'Respon Cepat'}
                  </h3>
                  <p className="text-primary leading-relaxed">
                    {contactData.contactContent.quickResponseText}
                  </p>
                </div>
              )}

              {/* WhatsApp Quick Contact */}
              {contactData?.contactInfo?.whatsapp && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-3">
                    {contactData?.contactContent?.whatsappQuickTitle || 'Chat WhatsApp'}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {contactData?.contactContent?.whatsappQuickText || 'Hubungi kami melalui WhatsApp untuk respon yang lebih cepat'}
                  </p>
                  <AnimatedSection>
                    <a 
                      href={`https://wa.me/${contactData.contactInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-accent text-primary-dark px-4 py-2 rounded-lg hover:bg-primary-light transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      {contactData?.contactContent?.whatsappButtonText || 'Chat Sekarang'}
                    </a>
                  </AnimatedSection>
                </div>
              )}

              {/* Social Media */}
              {(socialData?.socialMedia?.instagram || socialData?.socialMedia?.facebook || socialData?.socialMedia?.youtube || socialData?.socialMedia?.twitter || socialData?.socialMedia?.tiktok) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    {socialData?.contactContent?.socialMediaTitle || 'Media Sosial'}
                  </h3>
                  <div className="space-y-3">
                    {socialData?.socialMedia?.instagram && (
                      <a 
                        href={socialData.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors duration-200">Instagram</div>
                          <div className="text-sm text-gray-500">Follow kami di Instagram</div>
                        </div>
                      </a>
                    )}
                    
                    {socialData?.socialMedia?.facebook && (
                      <a 
                        href={socialData.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Facebook</div>
                          <div className="text-sm text-gray-500">Like halaman Facebook kami</div>
                        </div>
                      </a>
                    )}
                    
                    {socialData?.socialMedia?.youtube && (
                      <a 
                        href={socialData.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-200">YouTube</div>
                          <div className="text-sm text-gray-500">Subscribe channel YouTube kami</div>
                        </div>
                      </a>
                    )}
                    
                    {socialData?.socialMedia?.twitter && (
                      <a 
                        href={socialData.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-sky-200 hover:bg-sky-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-sky-600 transition-colors duration-200">Twitter</div>
                          <div className="text-sm text-gray-500">Follow kami di Twitter</div>
                        </div>
                      </a>
                    )}
                    
                    {socialData?.socialMedia?.tiktok && (
                      <a 
                        href={socialData.socialMedia.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">TikTok</div>
                          <div className="text-sm text-gray-500">Follow kami di TikTok</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Services Section */}
        {contactData?.contactContent?.servicesText && (
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-black mb-6 text-center">
                {contactData?.contactContent?.servicesTitle || 'Layanan Kami'}
              </h2>
              <div className="prose prose-gray max-w-none text-center">
                <p className="text-gray-600 leading-relaxed">
                  {contactData.contactContent.servicesText}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}