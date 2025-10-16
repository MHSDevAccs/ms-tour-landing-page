import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { urlForHero, urlForProduct } from '@/sanity/lib/image'
import { blogService } from '@/lib/blogService'
import { galleryService } from '@/lib/galleryService'
import ServicePackagesSection from '@/components/ServicePackagesSection'
import FeaturedGallery from '@/components/FeaturedGallery'
import { ServicePackage } from '@/components/ServiceCard'
import TestimonialsSection from '@/components/TestimonialsSection'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import BlogCard from '@/components/BlogCard'
import HeroSlider from '@/components/HeroSlider'
import CTASection from '@/components/CTASection'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { generateOrganizationJsonLd, generateTravelServiceJsonLd, generateWebsiteJsonLd } from '@/lib/jsonLd'

// Portable Text components for styling
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4 last:mb-0">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
  },
}

// Enable static generation with revalidation for home page
export const revalidate = 300 // Revalidate every 5 minutes for fresh home page content

// Generate dynamic metadata with enhanced SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    const title = siteSettings?.siteTitle || 'Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda'
    const description = siteSettings?.siteDescription || 'Jelajahi dunia bersama Mahabbatussholihin Tour & Travel - Mitra terpercaya untuk pengalaman perjalanan yang tak terlupakan. Paket wisata domestik, internasional, dan umroh terbaik dengan pelayanan profesional.'

    return {
      description,
      keywords: [
        // Brand name variations and typos
        'mahabbatussholihin', 'mahabbatushholihin', 'mahabbatusholihin', 'mahabbatussholihin tour',
        'mahabbatussholihin travel', 'mahabbatussholihin tour travel', 'mahabbatussholihin tour & travel',
        'mahabbatussholihin tour dan travel', 'mahabbatusholihin tour', 'mahabbatusholihin travel',
        'MS travel', 'MS tour', 'MS tour travel', 'ms travel indonesia', 'ms tour indonesia',
        'mahabbatussholihin indonesia', 'mahabbatussholihin jakarta', 'mahabbatussholihin umroh',
        
        // Common misspellings and variations
        'mahabatussholihin', 'mahabbatusholihin', 'mahabbatussalihin', 'mahabbatussholihen',
        'mahabbatussholikhin', 'mahabbatussholihin tour', 'mahabbatussholikin',
        'mahabbatussolihin', 'mahabbatussalikhin', 'mahabbatussolichin',
        
        // Service related keywords
        'travel agency indonesia', 'agen travel jakarta', 'tour operator indonesia',
        'paket wisata', 'paket tour', 'paket umroh', 'paket haji', 'umroh murah',
        'travel umroh terpercaya', 'agen umroh resmi', 'tour travel jakarta',
        'wisata domestik', 'wisata internasional', 'liburan keluarga', 'honeymoon package',
        'corporate travel', 'group tour', 'study tour', 'family trip',
        
        // Location and destination keywords
        'destinasi wisata indonesia', 'wisata halal', 'wisata syariah', 'wisata religi',
        'travel murah jakarta', 'tour guide indonesia', 'hotel booking indonesia',
        'tiket pesawat murah', 'paket wisata murah', 'travel agent terpercaya',
        
        // Professional services
        'jasa travel professional', 'pelayanan travel terbaik', 'travel berpengalaman',
        'travel berlisensi', 'travel resmi', 'mitra perjalanan terpercaya'
      ],
      openGraph: {
        title,
        description,
        url: 'https://travel.mahabbatussholihin.com',
        siteName: 'Mahabbatussholihin Tour & Travel',
        locale: 'id_ID',
        type: 'website',
        images: [
          {
            url: '/og-home.jpg',
            width: 1200,
            height: 630,
            alt: 'Mahabbatussholihin Tour & Travel - Destinasi Wisata Terbaik',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@MStour',
        title,
        description,
        images: ['/og-home.jpg'],
      },
      alternates: {
        canonical: 'https://travel.mahabbatussholihin.com',
      },
    }
  } catch (error) {
    console.error('Failed to fetch metadata:', error)
    return {
      title: 'Mahabbatussholihin Tour & Travel - Gerbang Menuju Petualangan Tak Terlupakan',
      description: 'Temukan destinasi menakjubkan bersama Mahabbatussholihin Tour & Travel. Kami menawarkan pengalaman perjalanan yang dipersonalisasi, pemandu ahli, dan petualangan tak terlupakan di seluruh Indonesia dan sekitarnya.',
    }
  }
}

// TypeScript interfaces for CMS data
interface HeroSection {
  _id: string
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  backgroundImage?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  sliderImages?: Array<{
    image: {
      asset: {
        _id: string
        url: string
        metadata?: {
          dimensions: {
            width: number
            height: number
          }
        }
      }
      alt?: string
    }
    alt: string
    title?: string
    subtitle?: string
    caption?: string
  }>
  sliderSettings?: {
    autoplay?: boolean
    interval?: number
    showNavigation?: boolean
    showDots?: boolean
    pauseOnHover?: boolean
  }
  isActive: boolean
  language: string
}

interface SiteSettings {
  _id: string
  logo?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  logoAlt?: string
  siteName: string
  siteTitle: string
  siteDescription: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    whatsapp?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
    youtube?: string
    twitter?: string
    tiktok?: string
  }
  content?: {
    tagline?: string
    ctaText?: string
    contactCtaText?: string
    getInTouchText?: string
  }
  theme?: {
    colors?: {
      primary?: string
      primaryLight?: string
      primaryDark?: string
      secondary?: string
      accent?: string
      textPrimary?: string
      textSecondary?: string
      background?: string
      backgroundAlt?: string
    }
    buttons?: {
      primaryButton?: string
      secondaryButton?: string
      outlineButton?: string
    }
    cards?: {
      defaultCard?: string
      serviceCard?: string
      blogCard?: string
    }
    layout?: {
      container?: string
      section?: string
      headerBg?: string
      footerBg?: string
    }
  }
}



export default async function Home() {
  // Fetch all data in parallel for better performance
  const [heroData, servicePackages, featuredGalleries, siteSettings, aboutUs, testimonials, featuredBlogPosts, contactData] = await Promise.all([
    sanityFetch<HeroSection>({
      query: queries.getHeroSection('id'),
      tags: ['heroSection']
    }).catch(error => {
      console.error('Failed to fetch hero data:', error)
      return null
    }),
    sanityFetch<ServicePackage[]>({
      query: queries.getPopularServices(4),
      tags: ['servicePackage']
    }).catch(error => {
      console.error('Failed to fetch service packages:', error)
      return []
    }),
    galleryService.getFeaturedGalleries().catch(error => {
      console.error('Failed to fetch featured galleries:', error)
      return []
    }),
    sanityFetch<SiteSettings>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    }).catch(error => {
      console.error('Failed to fetch site settings:', error)
      return null
    }),
    sanityFetch<any>({
      query: queries.getAboutUs(),
      tags: ['aboutUs']
    }).catch(error => {
      console.error('Failed to fetch about us data:', error)
      return null
    }),
    sanityFetch<any[]>({
      query: queries.getTestimonials('id', true),
      tags: ['testimonial']
    }).catch(error => {
      console.error('Failed to fetch testimonials:', error)
      return []
    }),
    blogService.getFeaturedPosts('id', 3).catch(error => {
      console.error('Failed to fetch featured blog posts:', error)
      return []
    }),
    sanityFetch<any>({
      query: queries.getContactDataBasic(),
      tags: ['contactData']
    }).catch(error => {
      console.error('Failed to fetch contact data:', error)
      return null
    })
  ])

  // Generate comprehensive structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'
  const organizationJsonLd = generateOrganizationJsonLd(baseUrl, siteSettings || undefined)
  const travelServiceJsonLd = generateTravelServiceJsonLd(baseUrl, siteSettings || undefined)
  const websiteJsonLd = generateWebsiteJsonLd(baseUrl, siteSettings || undefined)

  return (
    <PageTransition className="min-h-screen">
      {/* Comprehensive Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Hero Section - CMS Content */}
      <div className="relative">
        <HeroSlider
          title={heroData?.title || "Mahabbatussholihin Tour & Travel"}
          subtitle={heroData?.subtitle || "Mendampingi Jamaah Haji dan Umrah, InsyaAllah Amanah dalam memberangkatkan para Jamaah ke tanah suci"}
          ctaText={heroData?.ctaText || "Info lebih lanjut"}
          ctaLink={heroData?.ctaLink || "/services"}
          sliderImages={heroData?.sliderImages || []}
          sliderSettings={heroData?.sliderSettings || {
            autoplay: true,
            interval: 5000,
            showNavigation: true,
            showDots: true,
            pauseOnHover: true
          }}
          backgroundImage={heroData?.backgroundImage}
        />
      </div>

      {/* About Section - Company Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {aboutUs?.mainTitle || 'Tentang Kami'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {aboutUs?.subtitle || 'Mengenal lebih dekat perjalanan spiritual bersama Mahabbatussholihin Tour & Travel'}
            </p>
          </div>

          {/* Cerita Kami Section */}
          <AnimatedSection className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-black mb-2">
                {aboutUs?.contentSection?.ourStory?.title || 'Cerita Kami'}
              </h3>
              <div className="w-38 h-1 bg-primary mb-4"></div>
              <div className="text-gray-700 leading-relaxed">
                {aboutUs?.contentSection?.ourStory?.content ? (
                  <PortableText
                    value={aboutUs.contentSection.ourStory.content}
                    components={portableTextComponents}
                  />
                ) : (
                  <p>Mahabbatussholihin Tour & Travel didirikan dengan komitmen untuk memberikan pelayanan terbaik dalam bidang perjalanan spiritual dan wisata. Dengan pengalaman bertahun-tahun, kami telah melayani ribuan jamaah untuk menunaikan ibadah haji dan umrah serta wisata ke berbagai destinasi menarik.</p>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Misi Kami Section */}
          <AnimatedSection className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-black mb-2">
                {aboutUs?.contentSection?.ourMission?.title || 'Misi Kami'}
              </h3>
              <div className="w-32 h-1 bg-primary mb-4"></div>
              <div className="text-gray-700 leading-relaxed">
                {aboutUs?.contentSection?.ourMission?.content ? (
                  <PortableText
                    value={aboutUs.contentSection.ourMission.content}
                    components={portableTextComponents}
                  />
                ) : (
                  <p>Dengan ridho Alloh SWT, kami berkomitmen nyediain layanan perjalanan yang berkah dan penuh makna yang bisa melampaui ekspektasi jamaah kami sambil menjaga amanah dan tanggung jawab dalam setiap langkah perjalanan.</p>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Mengapa Memilih Kami Section */}
          <AnimatedSection>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-black mb-2">
                {aboutUs?.contentSection?.whyChooseUs?.title || 'Mengapa Memilih Kami'}
              </h3>
              <div className="w-74 h-1 bg-primary mb-6"></div>
              
              <StaggerContainer className="space-y-4">
                {aboutUs?.contentSection?.whyChooseUs?.items && aboutUs.contentSection.whyChooseUs.items.length > 0 ? (
                  aboutUs.contentSection.whyChooseUs.items.map((item: any, index: number) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                          <p className="text-gray-700 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))
                ) : (
                  // Default items if not set in CMS
                  <>
                    <StaggerItem>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Pengetahuan lokal yang ahli dan itinerary yang udah dikurasi dengan penuh barakah
                        </p>
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Dukungan jamaah 24/7 sepanjang perjalanan dengan penuh amanah
                        </p>
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Harga yang berkah dengan kebijakan transparan tanpa biaya tersembunyi
                        </p>
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Praktik perjalanan yang halal dan berkah untuk komunitas lokal
                        </p>
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Opsi pemesanan fleksibel dan paket yang bisa disesuaikan sesuai kebutuhan jamaah
                        </p>
                      </div>
                    </StaggerItem>
                  </>
                )}
              </StaggerContainer>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Fasilitas Jamaah Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-600 tracking-wide uppercase mb-2">
              FASILITAS JAMAAH
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Fasilitas Yang Disediakan
            </h2>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Konsumsi */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">Konsumsi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Konsumsi yang terjamin dari memulai perjalanan sampai selesai
                </p>
              </div>
            </StaggerItem>

            {/* Visa haji & umrah */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">Visa haji & umrah</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pengurusan visa haji & umrah untuk keperluan ibadah di tanah suci
                </p>
              </div>
            </StaggerItem>

            {/* Perlengkapan Umrah */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,6H16V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V6H4A1,1 0 0,0 3,7V8A1,1 0 0,0 4,9H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V9H20A1,1 0 0,0 21,8V7A1,1 0 0,0 20,6M10,4H14V6H10V4M17,19H7V9H17V19Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">Perlengkapan Umrah</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Paket umrah dengan perlengkapan kebutuhan ibadah yang lengkap
                </p>
              </div>
            </StaggerItem>

            {/* TL/ Mutawwif */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">TL/Muthowwif</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Umroh ditemani tour leader dan Muthowwif yang tersertifikasi
                </p>
              </div>
            </StaggerItem>

            {/* Hotel Penginapan */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">Hotel Penginapan</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Akomodasi hotel / penginapan terbaik dan ternyaman
                </p>
              </div>
            </StaggerItem>

            {/* Transportasi */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92,6.01C18.72,5.42 18.16,5 17.5,5H15V4A2,2 0 0,0 13,2H11A2,2 0 0,0 9,4V5H6.5C5.84,5 5.28,5.42 5.08,6.01L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6.01M6.5,6.5H17.5L19,11H5L6.5,6.5M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">Transportasi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Transportasi untuk memudahkan perjalanan jamaah
                </p>
              </div>
            </StaggerItem>

            {/* Tim Profesional Saudi */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16,4C16.88,4 17.67,4.84 17.67,5.75C17.67,6.66 16.88,7.5 16,7.5C15.12,7.5 14.33,6.66 14.33,5.75C14.33,4.84 15.12,4 16,4M13,9H19V22H17V16H15V22H13V9M12,14V22H10V18H8V22H6V14H12M8,4C8.88,4 9.67,4.84 9.67,5.75C9.67,6.66 8.88,7.5 8,7.5C7.12,7.5 6.33,6.66 6.33,5.75C6.33,4.84 7.12,4 8,4Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">Tim Profesional Saudi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tim profesional dari Saudi untuk membancarkan kegiatan para jamaah
                </p>
              </div>
            </StaggerItem>

            {/* Tiket Pesawat */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">Tiket Pesawat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tiket pesawat PP untuk keperluan berangkat ke tanah suci
                </p>
              </div>
            </StaggerItem>

            {/* Dokumentasi */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">Dokumentasi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dokumentasi untuk jamaah selama ibadah di tanah suci
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Service Packages Section */}
      <ServicePackagesSection 
        servicePackages={servicePackages}
        siteSettings={siteSettings}
      />

      {/* Featured Gallery Section */}
      {featuredGalleries && featuredGalleries.length > 0 && (
        <FeaturedGallery
          galleries={featuredGalleries}
          title="Galeri Perjalanan Terbaik"
          subtitle="Saksikan momen-momen indah dari perjalanan wisata bersama kami"
          showMore={true}
        />
      )}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Testimoni Jamaah - Barakallohu Fiikum
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Alhamdulillah, dengerin langsung cerita jamaah yang udah merasakan berkah perjalanan bersama kami
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <TestimonialsCarousel 
                testimonials={testimonials}
                autoPlay={true}
                autoPlayInterval={6000}
                showDots={true}
                showArrows={true}
                className="testimonials-carousel"
              />
            </div>
          </div>
        </section>
      )}

      {/* Featured Blog Posts Section */}
      {featuredBlogPosts && featuredBlogPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                  Tips & Artikel Terbaru
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Dapatkan tips perjalanan terbaru, panduan destinasi, dan inspirasi untuk petualangan Anda berikutnya
              </p>
            </div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredBlogPosts.map((post) => (
                <StaggerItem key={post._id}>
                  <BlogCard
                    post={post}
                    variant="featured"
                    showExcerpt={true}
                    showAuthor={true}
                    showDate={true}
                    showReadingTime={true}
                    theme={siteSettings?.theme}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Lihat Semua Artikel
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section - Dynamic WhatsApp Integration */}
      <CTASection 
        contactData={contactData}
        title={siteSettings?.content?.ctaText || 'Siap Memulai Perjalanan Anda?'}
      />


    </PageTransition>
  )
}