'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Gallery, GalleryGridProps } from '@/types/gallery'
import { Calendar, Camera } from 'lucide-react'
import Lightbox from './Lightbox'
import { formatDateIndonesian } from '@/utils/dateUtils'

const GalleryGrid: React.FC<GalleryGridProps> = ({
  galleries,
  columns = 3,
  loading = false
}) => {
  const [hoveredGallery, setHoveredGallery] = useState<string | null>(null)
  const [lightboxGallery, setLightboxGallery] = useState<Gallery | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Filter only published galleries
  const publishedGalleries = galleries.filter(gallery => gallery.isPublished)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  }

  // Lightbox functions
  const openLightbox = (gallery: Gallery, imageIndex: number = 0) => {
    setLightboxGallery(gallery)
    setLightboxIndex(imageIndex)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setLightboxGallery(null)
    setLightboxIndex(0)
  }

  const formatDate = (dateString: string) => {
    return formatDateIndonesian(dateString);
  };

  if (loading) {
    return (
      <div className="space-y-8">        
        {/* Gallery grid skeleton */}
        <div className={`grid gap-6 ${
          columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
          columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {publishedGalleries.length > 0 
            ? `Menampilkan ${publishedGalleries.length} galeri`
            : 'Tidak ada galeri ditemukan'
          }
        </p>
      </div>

      {/* Gallery Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid gap-6 ${
          columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
          columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {publishedGalleries.map((gallery) => (
          <GalleryCard
            key={gallery._id}
            gallery={gallery}
            isHovered={hoveredGallery === gallery._id}
            onHover={setHoveredGallery}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {publishedGalleries.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Belum Ada Galeri
          </h3>
          <p className="text-gray-600">
            Galeri akan segera tersedia.
          </p>
        </motion.div>
      )}

      {/* Lightbox */}
      {lightboxGallery && (
        <Lightbox
          images={lightboxGallery.images || []}
          initialIndex={lightboxIndex}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}

// Gallery Card Component
interface GalleryCardProps {
  gallery: Gallery
  isHovered: boolean
  onHover: (id: string | null) => void
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  gallery,
  isHovered,
  onHover
}) => {
  const formatDate = (dateString: string) => {
    return formatDateIndonesian(dateString)
  }

  return (
    <Link href={`/gallery/${gallery.slug.current}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        whileHover={{ y: -5 }}
        onMouseEnter={() => onHover(gallery._id)}
        onMouseLeave={() => onHover(null)}
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
      >

      {/* Gallery Image */}
      <div className="gallery-image-container">
        {gallery.featuredImage ? (
          <Image
            src={urlFor(gallery.featuredImage).width(400).height(225).fit('crop').crop('center').url()}
            alt={gallery.featuredImage.alt || gallery.title}
            fill
            className="gallery-image-forced-16-9 transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Image Count Overlay */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <span>{gallery.images?.length || 0} foto</span>
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
        >
          <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium">
            Lihat Galeri
          </span>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {gallery.title}
        </h3>

        {/* Description */}
        {gallery.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {gallery.description}
          </p>
        )}

        {/* Date */}
        <div className="flex items-center justify-end text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(gallery.publishDate)}
          </span>
        </div>
      </div>
      </motion.div>
    </Link>
  )
}

export default GalleryGrid