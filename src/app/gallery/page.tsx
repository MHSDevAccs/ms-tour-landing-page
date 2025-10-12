import { Metadata } from 'next'
import { galleryService } from '@/lib/galleryService'
import GalleryGrid from '@/components/GalleryGrid'
import AnimatedSection, { PageTransition } from '@/components/AnimatedSection'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { generateBreadcrumbJsonLd } from '@/lib/jsonLd'

// Force dynamic rendering to avoid build-time authentication issues
// Enable static generation with revalidation
export const revalidate = 600 // Revalidate every 10 minutes for gallery content

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    return {
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
  // Fetch galleries, categories, and stats from Sanity
  const [galleries, categories, stats] = await Promise.all([
    galleryService.getAllGalleries(),
    galleryService.getAllCategories(),
    galleryService.getGalleryStats()
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
      {/* Gallery Header */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Galeri Foto
          </h1>
          <p className="text-xl text-white">
            Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata dan pengalaman tur yang telah kami selenggarakan
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
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
                Galeri Akan Segera Hadir
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Tim kami sedang mempersiapkan koleksi foto-foto menakjubkan dari berbagai destinasi wisata dan pengalaman tur. Nantikan kehadiran galeri kami!
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Jelajahi layanan tur kami dan temukan petualangan yang menanti Anda!
              </p>
              <a
                href="/services"
                className="bg-accent text-primary-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors duration-200"
              >
                Lihat Layanan Tur →
              </a>
            </div>
          )}
        </div>
      </section>

 
      

      {/* Call to Action */}
      <section className="bg-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="scale" delay={0.1}>
            <div className="text-center bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-black mb-4">
                Terinspirasi dengan Galeri Kami?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Wujudkan momen istimewa Anda bersama kami. Dapatkan konsultasi gratis dan penawaran eksklusif untuk menciptakan pengalaman tak terlupakan yang sesuai dengan visi Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/6287770005801"
                  className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Mulai Konsultasi
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
    </PageTransition>
  )
}