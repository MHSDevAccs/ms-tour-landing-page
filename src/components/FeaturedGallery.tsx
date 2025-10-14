'use client'


import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Gallery } from '@/types/gallery'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { Eye, MapPin, Calendar, Camera } from 'lucide-react'

interface FeaturedGalleryProps {
  galleries: Gallery[]
  title?: string
  subtitle?: string
  showMore?: boolean
}

export default function FeaturedGallery({ 
  galleries, 
  title = "Galeri Terbaik", 
  subtitle = "Momen-momen indah dari perjalanan wisata bersama kami",
  showMore = true
}: FeaturedGalleryProps) {

  if (!galleries || galleries.length === 0) {
    return null
  }

  // Limit to 6 galleries for main page
  const displayGalleries = galleries.slice(0, 6)

  return (
    <AnimatedSection className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-600 tracking-wide uppercase mb-2">
            GALERI FOTO
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayGalleries.map((gallery, index) => (
            <StaggerItem key={gallery._id}>
              <Link href={`/gallery/${gallery.slug?.current}`}>
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  {/* Featured Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {gallery.featuredImage?.asset && (
                      <Image
                        src={urlFor(gallery.featuredImage.asset).format('webp').quality(90).url()}
                        alt={gallery.featuredImage.alt || gallery.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    
                    {/* Image Count Badge */}
                    {gallery.images && gallery.images.length > 0 && (
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Camera className="w-4 h-4" />
                        <span>{gallery.images.length}</span>
                      </div>
                    )}

                    {/* View Count Badge */}
                    {gallery.viewCount && (
                      <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{gallery.viewCount}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {gallery.title}
                    </h3>

                    {/* Description */}
                    {gallery.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {gallery.description}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      {gallery.destination?.name && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="truncate font-medium">{gallery.destination.name}</span>
                        </div>
                      )}

                    </div>

                    {/* View Gallery Button */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-semibold text-sm group-hover:text-primary-dark transition-colors duration-300">
                          Lihat Galeri
                        </span>
                        <div className="w-8 h-8 bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary rounded-full flex items-center justify-center transition-all duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Show More Button */}
        {showMore && (
          <div className="text-center">
            <Link 
              href="/gallery"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Lihat Semua Galeri
            </Link>
          </div>
        )}
      </div>
    </AnimatedSection>
  )
}

// Helper function to get category label
function getCategoryLabel(category: string): string {
  const categoryMap: Record<string, string> = {
    'destinations': 'Destinasi',
    'cultural': 'Budaya',
    'adventure': 'Petualangan',
    'religious': 'Religi',
    'nature': 'Alam',
    'culinary': 'Kuliner',
    'accommodation': 'Akomodasi',
    'transportation': 'Transportasi',
    'activities': 'Aktivitas',
    'customers': 'Momen Jamaah'
  }
  return categoryMap[category] || category
}