import { Metadata } from 'next'
import { galleryService } from '@/lib/galleryService'
import GalleryGrid from '@/components/GalleryGrid'
import AnimatedSection, { PageTransition } from '@/components/AnimatedSection'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { generateBreadcrumbJsonLd } from '@/lib/jsonLd'

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    return {
      title: siteSettings?.pageContent?.galleryTitle || 'Galeri Foto - MHS Tour & Travel',
      description: siteSettings?.pageContent?.galleryDescription || 'Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata, tur budaya, petualangan, dan pengalaman bersama MHS Tour & Travel.',
      keywords: siteSettings?.pageContent?.galleryKeywords || 'galeri foto, destinasi wisata, tur budaya, petualangan, Indonesia, MHS Tour',
      openGraph: {
        title: siteSettings?.pageContent?.galleryTitle || 'Galeri Foto - Mahabbatussholihin Tour & Travel',
        description: siteSettings?.pageContent?.galleryDescription || 'Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata dan pengalaman tur.',
        url: 'https://travel.mahabbatussholihin.com/gallery',
        siteName: 'Mahabbatussholihin Tour & Travel',
        locale: 'id_ID',
        type: 'website',
        images: [
          {
            url: '/og-gallery.jpg',
            width: 1200,
            height: 630,
            alt: 'Galeri Foto Mahabbatussholihin Tour & Travel',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@mhstour',
        title: siteSettings?.pageContent?.galleryTitle || 'Galeri Foto - Mahabbatussholihin Tour & Travel',
        description: siteSettings?.pageContent?.galleryDescription || 'Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata dan pengalaman tur.',
        images: ['/og-gallery.jpg'],
      },
      alternates: {
        canonical: 'https://travel.mahabbatussholihin.com/gallery',
      },
    }
  } catch (error) {
    return {
      title: 'Galeri Foto - MHS Tour & Travel',
      description: 'Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata, tur budaya, petualangan, dan pengalaman bersama MHS Tour & Travel.',
      keywords: 'galeri foto, destinasi wisata, tur budaya, petualangan, Indonesia, MHS Tour',
      openGraph: {
        title: 'Galeri Foto - MHS Tour & Travel',
        description: 'Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata dan pengalaman tur.',
        type: 'website',
        siteName: 'MHS Tour & Travel'
      }
    }
  }
}

export default async function GalleryPage() {
  // Fetch galleries, categories, stats, and site settings from Sanity
  const [galleries, categories, stats, siteSettings] = await Promise.all([
    galleryService.getAllGalleries(),
    galleryService.getAllCategories(),
    galleryService.getGalleryStats(),
    sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })
  ])

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Beranda', url: baseUrl },
    { name: 'Galeri', url: `${baseUrl}/gallery` }
  ], baseUrl)

  return (
    <PageTransition>
      <main className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Gallery Header - HARDCODED */}
        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            {siteSettings?.pageContent?.galleryMainTitle || 'Galeri Foto'}
          </h1>
          <p className="text-xl text-primary-lighter">
            {siteSettings?.pageContent?.gallerySubtitle || 'Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata, tur budaya, petualangan, dan momen berharga bersama MS Tour & Travel'}
          </p>
        </div>
      </div>

      {/* Gallery Content */}
      <AnimatedSection className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {galleries.length > 0 ? (
            <GalleryGrid
              galleries={galleries}
              categories={categories}
              showFilters={true}
              columns={3}
            />
          ) : (
            // Empty state
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-black mb-4">
                {siteSettings?.pageContent?.galleryEmptyTitle || 'Galeri Akan Segera Hadir'}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {siteSettings?.pageContent?.galleryEmptyDescription || 'Tim kami sedang mempersiapkan koleksi foto-foto menakjubkan dari berbagai destinasi wisata dan pengalaman tur. Nantikan kehadiran galeri kami!'}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                {siteSettings?.pageContent?.galleryEmptyTipDescription || 'Jelajahi layanan tur kami dan temukan petualangan yang menanti Anda!'}
              </p>
              <a
                href="/services"
                className="bg-accent text-primary-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors duration-200"
              >
                {siteSettings?.pageContent?.galleryEmptyButtonText || 'Lihat Layanan Tur →'}
              </a>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Featured Galleries Section (if we have featured galleries) */}
      {galleries.some(g => g.isFeatured) && (
        <AnimatedSection className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {siteSettings?.pageContent?.galleryFeaturedTitle || ' Galeri Unggulan'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {siteSettings?.pageContent?.galleryFeaturedDescription || 'Koleksi foto terpilih yang menampilkan keindahan dan pengalaman terbaik dari perjalanan wisata bersama kami'}
              </p>
            </div>
            
            <GalleryGrid
              galleries={galleries.filter(g => g.isFeatured)}
              showFilters={false}
              columns={4}
            />
          </div>
        </AnimatedSection>
      )}

      {/* Call to Action */}
      <AnimatedSection className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {siteSettings?.pageContent?.galleryCtaTitle || 'Siap Menciptakan Momen Indah Bersama Kami?'}
          </h2>
          <p className="text-xl text-primary-lighter mb-8">
            {siteSettings?.pageContent?.galleryCtaDescription || 'Alhamdulillah, gabung yuk sama ribuan jamaah yang udah merasakan berkah perjalanan bersama kami. InsyaAlloh pengalaman yang penuh barakah menanti!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors"
            >
              {siteSettings?.pageContent?.galleryCtaContactButton || 'Konsultasi Gratis'}
            </a>
            <a
              href="/services"
              className="bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary transition-colors border border-accent"
            >
              {siteSettings?.pageContent?.galleryCtaServicesButton || 'Lihat Paket Tour'}
            </a>
          </div>
        </div>
      </AnimatedSection>
    </main>
    </PageTransition>
  )
}