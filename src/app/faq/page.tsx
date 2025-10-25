import { sanityFetch, queries } from '@/sanity/lib/client'
import AnimatedSection, { PageTransition } from '@/components/AnimatedSection'
import { generateFAQJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'
import { generateResponsiveWhatsAppURL } from '@/lib/whatsappUtils'

// Enable static generation with revalidation
export const revalidate = 600 // Revalidate every 10 minutes

export default async function FAQPage() {
  // Fetch full contact data (same as Footer)
  let contactData: any = null

  try {
    contactData = await sanityFetch<any>({
      query: queries.getContactData(), // includes contactWhatsapp & whatsappTemplate
      tags: ['contactData'],
    })
  } catch (error) {
    console.error('Failed to fetch contact data:', error)
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'

  const faqs = [
    {
      question: 'Apa itu Mahabbatussholihin Tour & Travel?',
      answer:
        'Kami adalah agen perjalanan yang menyediakan paket wisata domestik, internasional, serta layanan umroh dengan pendampingan profesional.',
    },
    {
      question: 'Bagaimana cara melakukan pemesanan paket wisata?',
      answer:
        'Anda dapat menghubungi kami melalui formulir kontak di halaman Contact atau via WhatsApp/telepon untuk konsultasi dan pemesanan.',
    },
    {
      question: 'Apakah saya bisa menyesuaikan paket wisata sesuai kebutuhan?',
      answer:
        'Tentu. Tim kami dapat membantu menyesuaikan rencana perjalanan, durasi, dan fasilitas sesuai preferensi Anda.',
    },
    {
      question: 'Metode pembayaran apa saja yang tersedia?',
      answer:
        'Kami menerima transfer bank, pembayaran melalui gerai resmi, dan metode lain yang diinformasikan saat proses pemesanan.',
    },
    {
      question: 'Apakah ada kebijakan pembatalan?',
      answer:
        'Kebijakan pembatalan bervariasi tergantung jenis layanan dan penyedia (maskapai/hotel). Informasi detail akan dijelaskan saat pemesanan.',
    },
    {
      question: 'Bagaimana dengan dokumen perjalanan (paspor/visa)?',
      answer:
        'Untuk perjalanan internasional, Anda perlu memastikan paspor masih berlaku dan visa jika diperlukan. Kami dapat membantu proses informasi persyaratan.',
    },
    {
      question: 'Apakah tersedia layanan perjalanan untuk rombongan?',
      answer:
        'Ya, kami melayani perjalanan perorangan maupun rombongan dengan opsi paket khusus untuk grup dan institusi.',
    },
    {
      question: 'Bagaimana cara mendapatkan penawaran terbaru?',
      answer:
        'Ikuti sosial media kami dan kunjungi blog untuk informasi promo, tips perjalanan, dan panduan destinasi terbaru.',
    },
    {
      question: 'Siapa yang dapat saya hubungi jika ada kendala?',
      answer:
        'Silakan hubungi tim layanan pelanggan melalui email, telepon, atau WhatsApp pada jam operasional yang tertera.',
    },
  ]

  const faqJsonLd = generateFAQJsonLd(faqs)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    [
      { name: 'Beranda', url: '/' },
      { name: 'FAQ', url: '/faq' },
    ],
    baseUrl
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* FAQ Header - mirrored styling from Privacy Policy */}
        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
            <h1 className="text-4xl font-bold mb-4">FAQ</h1>
            <p className="text-xl text-white">
              Pertanyaan yang sering diajukan tentang layanan kami
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white border border-gray-200 rounded-lg shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-50">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-gray-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-700 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>

          {/* Kontak — Pill Ribbon */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center sm:text-left">Masih punya pertanyaan?</h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-center sm:text-left">
              Hubungi tim kami untuk bantuan lebih lanjut.
            </p>

            {/* One soft-gradient card with pill rows */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in">
              <div className="space-y-4">
                {/* Email Pill */}
                {contactData?.contactInfo?.email && (
                  <a
                    href={`mailto:${contactData.contactInfo.email}`}
                    className="group flex items-center justify-between bg-white rounded-full px-6 py-4 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">Email</span>
                </div>
                    <span className="text-gray-700 group-hover:text-primary transition-colors">{contactData.contactInfo.email}</span>
                  </a>
                )}

                {/* WhatsApp Pill */}
                {contactData?.contactWhatsapp && (
                  <a
                    href={generateResponsiveWhatsAppURL(
                      contactData.contactWhatsapp,
                      contactData.whatsappTemplate || 'Halo! Saya tertarik dengan layanan tour Anda. Bisa bantu saya dengan informasi lebih lanjut?'
                    )}
                    className="group flex items-center justify-between bg-white rounded-full px-6 py-4 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9v2h2V9H9z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">WhatsApp</span>
                </div>
                    <span className="text-gray-700 group-hover:text-primary transition-colors">{contactData.contactWhatsapp}</span>
                  </a>
                )}

                {/* Address Pill */}
                {contactData?.contactInfo?.address && (
                  <div className="group flex items-center bg-white rounded-full px-6 py-4 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">Alamat</span>
                </div>
                    <span className="ml-auto text-gray-700 group-hover:text-primary transition-colors max-w-xs">{contactData.contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}