import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { urlForHero, urlForProduct } from '@/sanity/lib/image'
import { blogService } from '@/lib/blogService'
import FeaturesSection from '@/components/FeaturesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogCard from '@/components/BlogCard'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { generateOrganizationJsonLd } from '@/lib/jsonLd'

// Force dynamic rendering and disable caching for development
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    return {
      title: siteSettings?.siteTitle || 'Mahabbatussholihin Tour & Travel - Your Gateway to Unforgettable Adventures',
      description: siteSettings?.siteDescription || 'Discover amazing destinations with Mahabbatussholihin Tour & Travel. We offer personalized travel experiences, expert guides, and unforgettable adventures across Indonesia and beyond.',
    }
  } catch (error) {
    console.error('Failed to fetch metadata:', error)
    return {
      title: 'Mahabbatussholihin Tour & Travel - Your Gateway to Unforgettable Adventures',
      description: 'Discover amazing destinations with Mahabbatussholihin Tour & Travel. We offer personalized travel experiences, expert guides, and unforgettable adventures across Indonesia and beyond.',
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
  isActive: boolean
  language: string
}

interface Feature {
  title: string
  description: string
  icon?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  link?: string
}

interface FeaturesSection {
  _id: string
  sectionTitle: string
  sectionSubtitle?: string
  features: Feature[]
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
  // Fetch CMS data with error handling
  let heroData: HeroSection | null = null
  let featuresData: FeaturesSection | null = null
  let siteSettings: SiteSettings | null = null
  let testimonials: any[] = []
  let featuredBlogPosts: any[] = []

  try {
    heroData = await sanityFetch<HeroSection>({
      query: queries.getHeroSection('id'),
      tags: ['heroSection']
    })
  } catch (error) {
    console.error('Failed to fetch hero data:', error)
  }

  try {
    featuresData = await sanityFetch<FeaturesSection>({
      query: queries.getFeaturesSection('id'),
      tags: ['featuresSection']
    })
  } catch (error) {
    console.error('Failed to fetch features data:', error)
  }

  try {
    siteSettings = await sanityFetch<SiteSettings>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
  }

  try {
    testimonials = await sanityFetch<any[]>({
      query: queries.getTestimonials('id', true), // Get featured testimonials
      tags: ['testimonial']
    })
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
  }

  try {
    featuredBlogPosts = await blogService.getFeaturedPosts('id', 3)
  } catch (error) {
    console.error('Failed to fetch featured blog posts:', error)
  }

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mhstour.com'
  const organizationJsonLd = generateOrganizationJsonLd(baseUrl)

  return (
    <PageTransition className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Hero Section - Fully Dynamic */}
      {heroData ? (
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-20 lg:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            {heroData.backgroundImage?.asset ? (
              <Image
                src={urlForHero(heroData.backgroundImage).url()}
                alt={heroData.backgroundImage.alt || 'Hero Background'}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-secondary" />
            )}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {heroData.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-lighter">
                {heroData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={heroData.ctaLink}
                  className="bg-primary-light text-primary-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent transition-colors duration-200 shadow-lg"
                >
                  {heroData.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="py-20 bg-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-800">No Hero Data Found</h2>
          <p className="text-gray-600">Please add hero content in Sanity Studio</p>
        </div>
      )}

      {/* Features Section - Reusable Component */}
      <FeaturesSection data={featuresData} variant="default" maxFeatures={3} />

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <TestimonialsSection 
          testimonials={testimonials}
          maxTestimonials={3}
          variant="default"
        />
      )}

      {/* Featured Blog Posts Section */}
      {featuredBlogPosts && featuredBlogPosts.length > 0 && (
        <AnimatedSection className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
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
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
              >
                Lihat Semua Artikel
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Call to Action Section - Uses Site Settings */}
      <AnimatedSection direction="up" className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {siteSettings?.content?.ctaText || 'Ready to Start Your Journey?'}
          </h2>
          <p className="text-xl mb-8 text-primary-lighter">
            Contact {siteSettings?.siteName || 'us'} today to plan your perfect adventure.
          </p>
          <Link
            href="/contact"
            className="bg-primary-light text-primary-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent transition-colors duration-200 shadow-lg inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </AnimatedSection>
    </PageTransition>
  )
}