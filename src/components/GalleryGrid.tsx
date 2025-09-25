'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Gallery, GalleryCategory, GalleryGridProps } from '@/types/gallery'
import { MapPin, Calendar, Camera, Eye } from 'lucide-react'
import Lightbox from './Lightbox'

const GalleryGrid: React.FC<GalleryGridProps> = ({
  galleries,
  categories = [],
  showFilters = true,
  columns = 3,
  loading = false
}) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [hoveredGallery, setHoveredGallery] = useState<string | null>(null)
  const [lightboxGallery, setLightboxGallery] = useState<Gallery | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Filter galleries based on selected category
  const filteredGalleries = useMemo(() => {
    if (selectedCategory === 'all') {
      return galleries.filter(gallery => gallery.isPublished)
    }
    return galleries.filter(
      gallery => gallery.isPublished && gallery.category === selectedCategory
    )
  }, [galleries, selectedCategory])

  // Category options with counts
  const categoryOptions = useMemo(() => {
    const allOption = {
      value: 'all',
      label: 'All Galleries',
      count: galleries.filter(g => g.isPublished).length,
      icon: '🖼️'
    }

    const categoryOptionsWithCounts = categories
      .filter(cat => cat.isActive)
      .map(category => ({
        value: category.slug.current,
        label: category.title,
        count: galleries.filter(
          g => g.isPublished && g.category === category.slug.current
        ).length,
        icon: category.icon
      }))
      .filter(option => option.count > 0)

    return [allOption, ...categoryOptionsWithCounts]
  }, [galleries, categories])

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

  const handleGalleryClick = (gallery: Gallery) => {
    // Navigate to gallery detail page
    router.push(`/gallery/${gallery.slug.current}`)
  }

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
    });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Filter skeleton */}
        {showFilters && (
          <div className="flex flex-wrap gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-gray-200 rounded-full animate-pulse"
                style={{ width: `${Math.random() * 60 + 80}px` }}
              />
            ))}
          </div>
        )}
        
        {/* Gallery grid skeleton */}
        <div className={`grid gap-6 ${
          columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
          columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
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
      {/* Category Filters */}
      {showFilters && categoryOptions.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3"
        >
          {categoryOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedCategory(option.value)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 hover:scale-105
                ${selectedCategory === option.value
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${selectedCategory === option.value
                  ? 'bg-primary-dark text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {option.count}
              </span>
            </button>
          ))}
        </motion.div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredGalleries.length > 0 
            ? `Menampilkan ${filteredGalleries.length} galeri`
            : 'Tidak ada galeri ditemukan'
          }
        </p>
      </div>

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
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
          {filteredGalleries.map((gallery) => (
            <GalleryCard
              key={gallery._id}
              gallery={gallery}
              onClick={handleGalleryClick}
              isHovered={hoveredGallery === gallery._id}
              onHover={setHoveredGallery}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredGalleries.length === 0 && !loading && (
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
            Galeri untuk kategori ini akan segera tersedia.
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
          galleryTitle={lightboxGallery.title}
          showThumbnails={true}
          autoPlay={false}
        />
      )}
    </div>
  )
}

// Gallery Card Component
interface GalleryCardProps {
  gallery: Gallery
  onClick?: (gallery: Gallery) => void
  isHovered: boolean
  onHover: (id: string | null) => void
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  gallery,
  onClick,
  isHovered,
  onHover
}) => {
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      destinations: '🏛️',
      cultural: '🎭',
      adventure: '🏔️',
      religious: '🕌',
      nature: '🌿',
      culinary: '🍜',
      accommodation: '🏨',
      transportation: '🚐',
      activities: '🎯',
      customers: '👥'
    }
    return iconMap[category] || '🖼️'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => onHover(gallery._id)}
      onMouseLeave={() => onHover(null)}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onClick?.(gallery)}
    >
      {/* Featured Badge */}
      {gallery.isFeatured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
            ⭐ Unggulan
          </span>
        </div>
      )}

      {/* Gallery Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {gallery.featuredImage ? (
          <Image
            src={urlFor(gallery.featuredImage).width(400).height(300).url()}
            alt={gallery.featuredImage.alt || gallery.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
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
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary-lighter px-2 py-1 rounded-full">
            {getCategoryIcon(gallery.category)}
            <span className="capitalize">{gallery.category.replace('_', ' ')}</span>
          </span>
          {gallery.viewCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Eye className="w-3 h-3" />
              {gallery.viewCount}
            </span>
          )}
        </div>

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

        {/* Location & Date */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          {gallery.destination?.name && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {gallery.destination.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(gallery.publishDate)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default GalleryGrid