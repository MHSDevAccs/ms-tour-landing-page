'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryImage } from '@/types/gallery'
import { ChevronLeft, ChevronRight, Camera, Calendar, User, Tag } from 'lucide-react'
import Lightbox from './Lightbox'
import { galleryService } from '@/lib/galleryService'
import { formatDateIndonesian } from '@/utils/dateUtils'

interface GalleryImageGridProps {
  gallerySlug: string
  imagesPerPage?: number
}

const GalleryImageGrid: React.FC<GalleryImageGridProps> = ({
  gallerySlug,
  imagesPerPage = 12
}) => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [totalImages, setTotalImages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [galleryTitle, setGalleryTitle] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Pagination calculations
  const totalPages = Math.ceil(totalImages / imagesPerPage)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const gallery = await galleryService.getGalleryBySlug(gallerySlug)
        if (gallery) {
          setGalleryTitle(gallery.title)
          // Use all images directly from the gallery object
          const allImages = gallery.images || []
          setTotalImages(allImages.length)
          
          // For first page, slice the images
          const startIndex = (currentPage - 1) * imagesPerPage
          const endIndex = startIndex + imagesPerPage
          setImages(allImages.slice(startIndex, endIndex))
        }
      } catch (error) {
        console.error('Error loading gallery data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadInitialData()
  }, [gallerySlug, imagesPerPage])

  // Load more images when page changes
  const loadPage = async (page: number) => {
    if (page === currentPage) return

    setIsLoading(true)
    try {
      // Get the full gallery again and slice for the requested page
      const gallery = await galleryService.getGalleryBySlug(gallerySlug)
      if (gallery) {
        const allImages = gallery.images || []
        const startIndex = (page - 1) * imagesPerPage
        const endIndex = startIndex + imagesPerPage
        setImages(allImages.slice(startIndex, endIndex))
        setCurrentPage(page)
      }
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Pagination info
  const paginationInfo = useMemo(() => {
    const startIndex = (currentPage - 1) * imagesPerPage + 1
    const endIndex = Math.min(currentPage * imagesPerPage, totalImages)
    return { startIndex, endIndex }
  }, [currentPage, imagesPerPage, totalImages])

  // Lightbox functions
  const openLightbox = (imageIndex: number) => {
    setLightboxIndex(imageIndex)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setLightboxIndex(0)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20
      }
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return formatDateIndonesian(dateString)
  }

  if (loading && images.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with pagination info */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Foto dalam Galeri
        </h3>
        <p className="text-sm text-gray-600">
          {paginationInfo.startIndex}-{paginationInfo.endIndex} dari {totalImages} foto
        </p>
      </div>

      {/* Image Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {images.map((galleryImage, index) => (
            <motion.div
              key={galleryImage._key || index}
              variants={imageVariants}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="gallery-image-container rounded-lg bg-gray-100 hover:shadow-lg transition-all duration-300">
                {galleryImage.image?.asset ? (
                  <Image
                    src={urlFor(galleryImage.image).width(640).height(360).fit('crop').crop('center').url()}
                    alt={galleryImage.image.alt || galleryImage.caption || `${galleryTitle} - Foto ${index + 1}`}
                    fill
                    className="gallery-image-forced-16-9 transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {/* Hover overlay with image info */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end">
                  <div className="p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {galleryImage.caption && (
                      <p className="text-sm font-medium mb-1 line-clamp-2">
                        {galleryImage.caption}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs">
                      {galleryImage.dateTaken && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(galleryImage.dateTaken)}
                        </span>
                      )}
                      {galleryImage.photographer && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {galleryImage.photographer}
                        </span>
                      )}
                    </div>
                    {galleryImage.tags && galleryImage.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Tag className="w-3 h-3" />
                        <span className="text-xs">
                          {galleryImage.tags.slice(0, 2).join(', ')}
                          {galleryImage.tags.length > 2 && '...'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Load More / Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          {/* Previous Page */}
          <button
            onClick={() => loadPage(currentPage - 1)}
            disabled={!hasPrevPage || isLoading}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${hasPrevPage && !isLoading
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>

          {/* Page Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Halaman</span>
            <span className="font-semibold text-primary">{currentPage}</span>
            <span>dari</span>
            <span className="font-semibold">{totalPages}</span>
          </div>

          {/* Next Page */}
          <button
            onClick={() => loadPage(currentPage + 1)}
            disabled={!hasNextPage || isLoading}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${hasNextPage && !isLoading
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-medium">Memuat foto...</span>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        galleryTitle={galleryTitle}
        showThumbnails={true}
        autoPlay={false}
      />
    </div>
  )
}

export default GalleryImageGrid