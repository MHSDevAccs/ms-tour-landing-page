'use client'

import { useState } from 'react'
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
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-2">
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
        <StaggerContainer className="grid grid-cols-2  gap-6 mb-12">
          {displayGalleries.map((gallery, index) => (
            <StaggerItem key={gallery._id}>
              <Link href={`/gallery/${gallery.slug?.current}`}>
                <div 
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  style={{ aspectRatio: index === 0 ? '16/9' : '4/3' }}
                  onMouseEnter={() => setHoveredId(gallery._id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Featured Image */}
                  {gallery.featuredImage?.asset && (
                    <Image
                      src={urlFor(gallery.featuredImage.asset).format('webp').quality(90).url()}
                      alt={gallery.featuredImage.alt || gallery.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={index === 0 ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="space-y-2">
                      {/* Category Badge */}
                      <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full">
                        {getCategoryLabel(gallery.category)}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold line-clamp-2">
                        {gallery.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm opacity-90">
                        <div className="flex items-center space-x-4">
                          {gallery.destination?.name && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate">{gallery.destination.name}</span>
                            </div>
                          )}
                          
                          {gallery.images && gallery.images.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Camera className="w-4 h-4" />
                              <span>{gallery.images.length} foto</span>
                            </div>
                          )}
                        </div>

                        {gallery.viewCount && (
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{gallery.viewCount}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {gallery.description && (
                        <p className="text-sm text-gray-200 line-clamp-2 mt-2">
                          {gallery.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Show More Button */}
        {showMore && galleries.length > 6 && (
          <div className="text-center">
            <Link 
              href="/gallery"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Lihat Semua Galeri
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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