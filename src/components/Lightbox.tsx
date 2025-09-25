'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { GalleryImage } from '@/types/gallery'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Share2,
  Info,
  Play,
  Pause
} from 'lucide-react'

interface LightboxProps {
  images: GalleryImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  galleryTitle?: string
  showThumbnails?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  galleryTitle,
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showInfo, setShowInfo] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [isLoading, setIsLoading] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  const currentImage = images[currentIndex]

  // Auto play functionality
  useEffect(() => {
    if (isAutoPlaying && images.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, autoPlayInterval)
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, images.length, autoPlayInterval])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
        case ' ':
          event.preventDefault()
          toggleAutoPlay()
          break
        case 'i':
        case 'I':
          setShowInfo(prev => !prev)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  // Reset states when opening/closing
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setIsZoomed(false)
      setZoomLevel(1)
      setShowInfo(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setIsAutoPlaying(false)
    }
  }, [isOpen, initialIndex])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
    setZoomLevel(1)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
    setZoomLevel(1)
  }, [images.length])

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsZoomed(false)
    setZoomLevel(1)
  }, [])

  const toggleZoom = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false)
      setZoomLevel(1)
    } else {
      setIsZoomed(true)
      setZoomLevel(2)
    }
  }, [isZoomed])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev)
  }, [])

  const handleDownload = useCallback(async () => {
    if (!currentImage) return

    try {
      const imageUrl = urlFor(currentImage.image).width(1920).url()
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `gallery-image-${currentIndex + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }, [currentImage, currentIndex])

  const handleShare = useCallback(async () => {
    if (!currentImage) return

    const imageUrl = urlFor(currentImage.image).width(1200).url()
    const shareData = {
      title: galleryTitle || 'Galeri Foto',
      text: currentImage.caption || `Foto ${currentIndex + 1} dari ${images.length}`,
      url: imageUrl
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback to copy URL
        await navigator.clipboard.writeText(imageUrl)
        alert('Link foto telah disalin ke clipboard!')
      }
    } catch (error) {
      console.error('Share failed:', error)
    }
  }, [currentImage, galleryTitle, currentIndex, images.length])

  if (!isOpen || !currentImage) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">{galleryTitle}</h3>
              <span className="text-sm opacity-75">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Info Toggle */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Toggle Info (I)"
              >
                <Info className="w-5 h-5" />
              </button>
              
              {/* Auto Play Toggle */}
              {images.length > 1 && (
                <button
                  onClick={toggleAutoPlay}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Toggle Slideshow (Space)"
                >
                  {isAutoPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              )}
              
              {/* Zoom Toggle */}
              <button
                onClick={toggleZoom}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Toggle Zoom"
              >
                {isZoomed ? (
                  <ZoomOut className="w-5 h-5" />
                ) : (
                  <ZoomIn className="w-5 h-5" />
                )}
              </button>
              
              {/* Share */}
              <button
                onClick={handleShare}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              {/* Download */}
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              
              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              title="Previous (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              title="Next (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Main Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full h-full flex items-center justify-center p-4 pt-20 pb-32"
        >
          <div
            className={`relative max-w-full max-h-full transition-transform duration-300 ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={toggleZoom}
          >
            <Image
              src={urlFor(currentImage.image).width(1920).height(1080).url()}
              alt={currentImage.image.alt || currentImage.caption || `Gallery image ${currentIndex + 1}`}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
              onLoad={() => setIsLoading(false)}
              onLoadStart={() => setIsLoading(true)}
              priority
            />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Image Info Panel */}
        <AnimatePresence>
          {showInfo && currentImage && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-black/90 text-white p-6 overflow-y-auto"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Informasi Foto</h4>
                </div>
                
                {currentImage.caption && (
                  <div>
                    <label className="text-sm text-gray-300">Caption</label>
                    <p className="text-white">{currentImage.caption}</p>
                  </div>
                )}
                
                {currentImage.dateTaken && (
                  <div>
                    <label className="text-sm text-gray-300">Tanggal Diambil</label>
                    <p className="text-white">
                      {new Date(currentImage.dateTaken).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
                
                {currentImage.photographer && (
                  <div>
                    <label className="text-sm text-gray-300">Fotografer</label>
                    <p className="text-white">{currentImage.photographer}</p>
                  </div>
                )}
                
                {currentImage.tags && currentImage.tags.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-300">Tags</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentImage.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-primary text-white px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-sm text-gray-300">Posisi</label>
                  <p className="text-white">{currentIndex + 1} dari {images.length} foto</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex justify-center space-x-2 overflow-x-auto max-w-full">
              {images.map((image, index) => (
                <button
                  key={image._key || index}
                  onClick={() => goToIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-white scale-110'
                      : 'border-transparent hover:border-white/50'
                  }`}
                >
                  <Image
                    src={urlFor(image.image).width(80).height(60).url()}
                    alt={image.image.alt || `Thumbnail ${index + 1}`}
                    width={80}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-4 left-4 text-white text-xs opacity-75">
          <div>← → Navigate • Space: Slideshow • I: Info • Esc: Close</div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Lightbox