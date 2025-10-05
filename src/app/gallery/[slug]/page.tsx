import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { galleryService, getRelatedGalleries } from '@/lib/galleryService'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch, queries } from '@/sanity/lib/client'
import AnimatedSection from '@/components/AnimatedSection'
import GalleryGrid from '@/components/GalleryGrid'
import GalleryImageGrid from '@/components/GalleryImageGrid'
import ShareButton from '@/components/ShareButton'

// Enable static generation with revalidation
export const revalidate = 1200 // Revalidate every 20 minutes for individual gallery pages
import { 
  MapPin, 
  Calendar, 
  Camera, 
  Eye, 
  User, 
  Tag,
  ArrowLeft,
  Clock
} from 'lucide-react'

interface Props {
  params: { slug: string }
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
        customers: 'Momen Jamaah'
      }
      return nameMap[category] || 'Galeri'
    }

    return (
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb & Back Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <Link 
                href="/gallery"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Kembali ke Galeri</span>
              </Link>

              {/* Breadcrumb */}
              <nav className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-700 transition-colors">
                  Beranda
                </Link>
                <span>/</span>
                <Link href="/gallery" className="hover:text-gray-700 transition-colors">
                  Galeri
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{gallery.title}</span>
              </nav>
            </div>
          </div>
        </div>

        {/* Gallery Header */}
        <AnimatedSection className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured Image */}
              <div className="lg:col-span-2">
                {gallery.featuredImage && (
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                    <Image
                      src={urlFor(gallery.featuredImage).width(800).height(600).url()}
                      alt={gallery.featuredImage.alt || gallery.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </div>

              {/* Gallery Info */}
              <div className="space-y-6 text-center lg:text-left">

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

                  {gallery.images && gallery.images.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-primary" />
                      <span>{gallery.images.length} foto dalam galeri</span>
                    </div>
                  )}
                </div>

                {/* Related Tour Package */}
                {gallery.tourPackage && 'title' in gallery.tourPackage && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-600" />
                      Paket Tur Terkait: {gallery.tourPackage.title}
                    </h4>
                    {gallery.tourPackage.description && (
                      <p className="text-gray-600">
                        {gallery.tourPackage.description}
                      </p>
                    )}
                    {gallery.tourPackage.price && (
                      <p className="text-lg font-bold text-primary">
                        Rp {gallery.tourPackage.price.toLocaleString('id-ID')}
                      </p>
                    )}
                    <Link
                      href={`/services/${gallery.tourPackage.slug?.current}`}
                      className="bg-accent text-primary-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors duration-200"
                    >
                      Lihat Detail Paket →
                    </Link>
                  </div>
                )}

                {/* Share Actions */}
                <div className="flex gap-3">
                  <ShareButton
                    title={gallery.title}
                    description={gallery.description || `Lihat galeri foto ${gallery.title}`}
                  />
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
              <GalleryImageGrid gallerySlug={gallery.slug.current} />
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

        
      </main>
    )
  } catch (error) {
    console.error('Error loading gallery detail:', error)
    notFound()
  }
}