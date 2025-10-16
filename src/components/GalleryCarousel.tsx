'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryImage } from '@/types/gallery'
import { ChevronLeft, ChevronRight, Camera, Calendar, User, Tag } from 'lucide-react'
import Lightbox from './Lightbox'
import { galleryService } from '@/lib/galleryService'
import { formatDateIndonesian } from '@/utils/dateUtils'

interface GalleryCarouselProps {
  gallerySlug: string
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ gallerySlug }) => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [galleryTitle, setGalleryTitle] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Load gallery data
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        setLoading(true)
        const gallery = await galleryService.getGalleryBySlug(gallerySlug)
        if (gallery) {
          setGalleryTitle(gallery.title)
          setImages(gallery.images || [])
        }
      } catch (error) {
        console.error('Error loading gallery data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadGalleryData()
  }, [gallerySlug])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (images.length <= 1) return

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          event.preventDefault()
          goToNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [images.length])

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Lightbox functions
  const openLightbox = (imageIndex: number) => {
    setLightboxIndex(imageIndex)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setLightboxIndex(0)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return formatDateIndonesian(dateString)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
        </div>

        {/* Main carousel skeleton */}
        <div className="relative">
          <div className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
          <div className="absolute inset-y-0 left-4 flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Thumbnails skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-20 h-12 bg-gray-200 rounded animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Belum ada foto dalam galeri ini</p>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Foto dalam Galeri
        </h3>
        <p className="text-sm text-gray-600">
          {currentIndex + 1} dari {images.length} foto
        </p>
      </div>

      {/* Main Carousel */}
      <div className="relative group">
        {/* Main Image Container */}
        <div className="gallery-image-container rounded-lg bg-gray-100 cursor-pointer" onClick={() => openLightbox(currentIndex)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              {currentImage?.image?.asset ? (
                <Image
                  src={urlFor(currentImage.image).width(1920).height(1080).fit('crop').crop('center').url()}
                  alt={currentImage.image.alt || currentImage.caption || `${galleryTitle} - Foto ${currentIndex + 1}`}
                  fill
                  className="gallery-image-forced-16-9 hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
              )}

              {/* Image Info Overlay */}
              {(currentImage.caption || currentImage.dateTaken || currentImage.photographer) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  {currentImage.caption && (
                    <p className="text-lg font-medium mb-2 line-clamp-2">
                      {currentImage.caption}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    {currentImage.dateTaken && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(currentImage.dateTaken)}
                      </span>
                    )}
                    {currentImage.photographer && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {currentImage.photographer}
                      </span>
                    )}
                  </div>
                  {currentImage.tags && currentImage.tags.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm">
                        {currentImage.tags.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Pergi ke foto ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Navigasi Foto</h4>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {images.map((galleryImage, index) => (
              <button
                key={galleryImage._key || index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                  index === currentIndex 
                    ? 'ring-2 ring-primary ring-offset-2 opacity-100' 
                    : 'opacity-60 hover:opacity-80'
                }`}
              >
                {galleryImage.image?.asset ? (
                  <Image
                    src={urlFor(galleryImage.image).width(120).height(80).fit('crop').crop('center').url()}
                    alt={galleryImage.image.alt || `Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Navigation Hint */}
      {images.length > 1 && (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Gunakan tombol panah ← → atau klik thumbnail untuk navigasi
          </p>
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

export default GalleryCarousel