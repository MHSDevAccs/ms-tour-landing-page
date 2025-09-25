import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { galleryService, getRelatedGalleries } from '@/lib/galleryService'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch, queries } from '@/sanity/lib/client'
import AnimatedSection from '@/components/AnimatedSection'
import GalleryGrid from '@/components/GalleryGrid'
import { 
  MapPin, 
  Calendar, 
  Camera, 
  Eye, 
  User, 
  Tag,
  Share2,
  Download,
  ArrowLeft,
  Clock
} from 'lucide-react'

interface Props {
  params: { slug: string }
}

// Generate static paths for all published galleries
export async function generateStaticParams() {
  try {
    const galleries = await galleryService.getAllGalleries()
    return galleries.map((gallery) => ({
      slug: gallery.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const gallery = await galleryService.getGalleryBySlug(params.slug)
    
    if (!gallery) {
      return {
        title: 'Gallery Not Found - MHS Tour & Travel',
        description: 'The requested gallery could not be found.'
      }
    }

    const ogImage = gallery.featuredImage 
      ? urlFor(gallery.featuredImage).width(1200).height(630).url()
      : null

    return {
      title: gallery.seoTitle || `${gallery.title} - Galeri MHS Tour & Travel`,
      description: gallery.seoDescription || gallery.description || `Lihat koleksi foto ${gallery.title} dari MHS Tour & Travel`,
      keywords: `${gallery.title}, galeri foto, ${gallery.category}, destinasi wisata, MHS Tour`,
      openGraph: {
        title: gallery.title,
        description: gallery.description || `Koleksi foto ${gallery.title}`,
        type: 'article',
        siteName: 'MHS Tour & Travel',
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: gallery.title }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: gallery.title,
        description: gallery.description || `Koleksi foto ${gallery.title}`,
        images: ogImage ? [ogImage] : [],
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Gallery - MHS Tour & Travel',
      description: 'Explore our photo gallery'
    }
  }
}

export default async function GalleryDetailPage({ params }: Props) {
  try {
    // Fetch gallery data and site settings
    const [gallery, siteSettings] = await Promise.all([
      galleryService.getGalleryBySlug(params.slug),
      sanityFetch<any>({
        query: queries.getSiteSettings(),
        tags: ['siteSettings']
      })
    ])
    
    if (!gallery) {
      notFound()
    }

    // Increment view count asynchronously (non-blocking)
    galleryService.incrementViewCount(gallery._id).catch(() => {
      // Silently handle any view count errors to not affect page rendering
    })

    // Fetch related galleries
    const relatedGalleries = await getRelatedGalleries(gallery._id, gallery.category, 4)

    const getCategoryIcon = (category: string) => {
      const iconMap: Record<string, string> = {
        destinations: 'destinations',
        cultural: 'cultural',
        adventure: 'adventure',
        religious: 'religious',
        nature: 'nature',
        culinary: 'culinary',
        accommodation: 'accommodation',
        transportation: 'transportation',
        activities: 'activities',
        customers: 'customers'
      }
      return iconMap[category] || 'gallery'
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const getCategoryName = (category: string) => {
      const nameMap: Record<string, string> = {
        destinations: 'Destinasi Wisata',
        cultural: 'Tur Budaya',
        adventure: 'Petualangan',
        religious: 'Tur Religi',
        nature: 'Alam & Pemandangan',
        culinary: 'Kuliner',
        accommodation: 'Akomodasi',
        transportation: 'Transportasi',
        activities: 'Aktivitas',
        customers: 'Momen Pelanggan'
      }
      return nameMap[category] || 'Galeri'
    }

    return (
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb & Back Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <Link href="/gallery" className="hover:text-primary">Gallery</Link>
                <span>/</span>
                <span className="text-gray-900">{gallery.title}</span>
              </nav>
              
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Galeri
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery Header */}
        <AnimatedSection className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured Image */}
              <div className="lg:col-span-2">
                {gallery.featuredImage ? (
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                    <Image
                      src={urlFor(gallery.featuredImage).width(800).height(600).url()}
                      alt={gallery.featuredImage.alt || gallery.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Image Count Overlay */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-full flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      <span className="font-medium">{gallery.images?.length || 0} Foto</span>
                    </div>

                    {/* Featured Badge */}
                    {gallery.isFeatured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-white text-sm font-medium px-3 py-1 rounded-full">
                          Unggulan
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Gallery Info */}
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary-lighter px-3 py-1 rounded-full">
                    {getCategoryIcon(gallery.category)}
                    {getCategoryName(gallery.category)}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {gallery.title}
                </h1>
                  {gallery.description && (
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {gallery.description}
                    </p>
                  )}
                </div>

                {/* Metadata */}
                <div className="space-y-3 text-sm text-gray-600">
                  {gallery.destination?.name && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>
                        {gallery.destination.name}
                        {gallery.destination.province && `, ${gallery.destination.province}`}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Dipublikasikan {formatDate(gallery.publishDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <span>{gallery.viewCount} kali dilihat</span>
                  </div>

                  {gallery.images && gallery.images.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-primary" />
                      <span>{gallery.images.length} foto dalam galeri</span>
                    </div>
                  )}
                </div>

                {/* Related Tour Package */}
                {gallery.tourPackage && 'title' in gallery.tourPackage && (
                  <div className="bg-primary-lighter border border-accent rounded-lg p-4">
                    <div className="flex items-center gap-2 text-primary font-medium mb-2">
                      <Tag className="w-4 h-4" />
                      Paket Tur Terkait
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">
                        {gallery.tourPackage.title}
                      </h4>
                      {gallery.tourPackage.description && (
                        <p className="text-sm text-gray-600">
                          {gallery.tourPackage.description}
                        </p>
                      )}
                      {gallery.tourPackage.price && (
                        <div className="text-lg font-bold text-primary">
                          Rp {gallery.tourPackage.price.toLocaleString('id-ID')}
                        </div>
                      )}
                      <Link
                        href={`/services/${gallery.tourPackage.slug?.current}`}
                        className="inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                      >
                        Lihat Detail Paket →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Share Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      try {
                        await navigator.share({
                          title: gallery.title,
                          text: gallery.description || `Lihat galeri foto ${gallery.title}`,
                          url: window.location.href
                        })
                      } catch (error) {
                        await navigator.clipboard.writeText(window.location.href)
                        alert('Link telah disalin ke clipboard!')
                      }
                    }}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Bagikan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Gallery Images */}
        {gallery.images && gallery.images.length > 0 && (
          <AnimatedSection className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  📸 Koleksi Foto
                </h2>
                <p className="text-gray-600">
                  Jelajahi {gallery.images.length} foto dalam galeri ini
                </p>
              </div>

              {/* Single Gallery with Lightbox */}
              <GalleryGrid
                galleries={[gallery]}
                showFilters={false}
                columns={4}
              />
            </div>
          </AnimatedSection>
        )}

        {/* Related Galleries */}
        {relatedGalleries.length > 0 && (
          <AnimatedSection className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  🔗 Galeri Terkait
                </h2>
                <p className="text-xl text-gray-600">
                  Jelajahi galeri lainnya dalam kategori {getCategoryName(gallery.category)}
                </p>
              </div>
              
              <GalleryGrid
                galleries={relatedGalleries}
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
              {siteSettings?.pageContent?.galleryDetailCtaTitle || 'Tertarik dengan Destinasi Ini?'}
            </h2>
            <p className="text-xl text-primary-lighter mb-8">
              {siteSettings?.pageContent?.galleryDetailCtaDescription?.replace('{destination}', gallery.destination?.name || 'destinasi menakjubkan ini') || `Hubungi kami untuk merencanakan perjalanan wisata impian Anda ke ${gallery.destination?.name || 'destinasi menakjubkan ini'}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors"
              >
                 {siteSettings?.pageContent?.galleryDetailCtaContactButton || 'Konsultasi Gratis'}
              </Link>
              <Link
                href="/services"
                className="bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary transition-colors border border-accent"
              >
                 {siteSettings?.pageContent?.galleryDetailCtaServicesButton || 'Lihat Semua Paket'}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>
    )
  } catch (error) {
    console.error('Error loading gallery detail:', error)
    notFound()
  }
}