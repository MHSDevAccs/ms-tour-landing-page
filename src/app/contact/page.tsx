import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { sanityFetch, queries } from '@/sanity/lib/client'
import AnimatedSection, { PageTransition } from '@/components/AnimatedSection'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface SiteSettings {
  siteName?: string
  content?: {
    contactCtaText?: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    return {
      title: siteSettings?.contactContent?.pageTitle || 'Contact Us',
      description: siteSettings?.contactContent?.pageDescription || siteSettings?.content?.contactCtaText || 'Get in touch with Mahabbatussholihin Tour & Travel for inquiries, bookings, or any questions about our travel services.',
    }
  } catch (error) {
    return {
      title: 'Contact Us',
      description: 'Get in touch with Mahabbatussholihin Tour & Travel for inquiries, bookings, or any questions about our travel services.',
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

  return (
    <PageTransition className="min-h-screen bg-secondary-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <AnimatedSection direction="fade" className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            {siteSettings?.contactContent?.pageTitle || 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {siteSettings?.contactContent?.pageSubtitle || siteSettings?.content?.contactCtaText || 'Ready to start your next adventure? Get in touch with our travel experts and let us help you plan the perfect trip.'}
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm theme={siteSettings?.theme} />
          </div>
          
          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <AnimatedSection 
              direction="right" 
              delay={0.2}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-black mb-4">
                {siteSettings?.contactContent?.contactInfoTitle || 'Get in Touch'}
              </h3>
              
              {siteSettings?.contactInfo && (
                <div className="space-y-4">
                  {siteSettings.contactInfo.phone && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-medium text-black">Phone</p>
                        <a 
                          href={`tel:${siteSettings.contactInfo.phone}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          {siteSettings.contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {siteSettings.contactInfo.whatsapp && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
                      </svg>
                      <div>
                        <p className="font-medium text-black">WhatsApp</p>
                        <a 
                          href={`https://wa.me/${siteSettings.contactInfo.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          {siteSettings.contactInfo.whatsapp}
                        </a>
                      </div>
                    </div>
                  )}

                  {siteSettings.contactInfo.email && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-black">Email</p>
                        <a 
                          href={`mailto:${siteSettings.contactInfo.email}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          {siteSettings.contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {siteSettings.contactInfo.address && (
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-black">Address</p>
                        <p className="text-gray-600">{siteSettings.contactInfo.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AnimatedSection>

            {/* Business Hours */}
            <AnimatedSection 
              direction="right" 
              delay={0.3}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-black mb-4">
                {siteSettings?.contactContent?.businessHoursTitle || 'Business Hours'}
              </h3>
              <div className="space-y-2">
                {siteSettings?.businessHours ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {siteSettings?.contactContent?.mondayFridayLabel || 'Monday - Friday'}
                      </span>
                      <span className="font-medium text-black">
                        {siteSettings.businessHours.mondayFriday || '9:00 AM - 6:00 PM'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {siteSettings?.contactContent?.saturdayLabel || 'Saturday'}
                      </span>
                      <span className="font-medium text-black">
                        {siteSettings.businessHours.saturday || '9:00 AM - 4:00 PM'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {siteSettings?.contactContent?.sundayLabel || 'Sunday'}
                      </span>
                      <span className="font-medium text-black">
                        {siteSettings.businessHours.sunday || siteSettings?.contactContent?.closedLabel || 'Closed'}
                      </span>
                    </div>
                    {siteSettings.businessHours.timezone && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="text-sm text-gray-500">
                          {siteSettings?.contactContent?.timezoneLabel || 'Timezone'}: {siteSettings.businessHours.timezone}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {siteSettings?.contactContent?.mondayFridayLabel || 'Monday - Friday'}
                      </span>
                      <span className="font-medium text-black">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {siteSettings?.contactContent?.saturdayLabel || 'Saturday'}
                      </span>
                      <span className="font-medium text-black">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {siteSettings?.contactContent?.sundayLabel || 'Sunday'}
                      </span>
                      <span className="font-medium text-black">
                        {siteSettings?.contactContent?.closedLabel || 'Closed'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </AnimatedSection>

            {/* Quick Response */}
            <AnimatedSection 
              direction="right" 
              delay={0.4}
              className="bg-primary rounded-lg shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-4">
                {siteSettings?.contactContent?.quickResponseTitle || 'Quick Response Guarantee'}
              </h3>
              <p className="text-primary-lighter mb-4">
                {siteSettings?.contactContent?.quickResponseDescription || 'We respond to all inquiries within 24 hours. For urgent requests, call us directly or send a WhatsApp message.'}
              </p>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">
                  {siteSettings?.contactContent?.averageResponseText || 'Average response: 2-4 hours'}
                </span>
              </div>
            </AnimatedSection>

            {/* WhatsApp Quick Contact */}
            {siteSettings?.contactInfo?.whatsapp && (
              <AnimatedSection 
                direction="right" 
                delay={0.5}
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
                  </svg>
                  {siteSettings?.contactContent?.whatsappTitle || 'Chat via WhatsApp'}
                </h3>
                <p className="mb-4 text-green-100">
                  {siteSettings?.contactContent?.whatsappDescription || 'Butuh bantuan segera? Chat langsung dengan tim kami untuk konsultasi gratis!'}
                </p>
                <a
                  href={`https://wa.me/${siteSettings.contactInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(siteSettings?.contactContent?.whatsappMessage || 'Halo! Saya tertarik dengan layanan tour Anda. Bisa bantu saya dengan informasi lebih lanjut?')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.30"/>
                  </svg>
                  {siteSettings?.contactContent?.whatsappButtonText || 'Mulai Chat Sekarang'}
                </a>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}