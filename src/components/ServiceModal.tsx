'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlForProduct } from '@/sanity/lib/image'
import { X, Check, Star, MapPin, Clock, Users } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection'

// Types
interface ServicePrice {
  amount: number
  currency: string
  unit: string
}

interface ServicePackage {
  _id: string
  title: string
  slug: { current: string }
  description: string
  icon?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  features: string[]
  price?: ServicePrice
  category: string
  isPopular: boolean
  link?: string
  order?: number
}

interface ServiceModalProps {
  service: ServicePackage | null
  isOpen: boolean
  onClose: () => void
}

export default function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Format price function
  const formatPrice = (price: ServicePrice) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: price.currency || 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    
    return `${formatter.format(price.amount)}/${price.unit || 'bulan'}`
  }

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isVisible || !service) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gray-500 bg-opacity-30 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-5xl w-full max-h-[95vh] sm:max-h-[85vh] overflow-hidden"
          >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 ease-in-out"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
        </motion.button>

        {/* Modal Content */}
        <div className="flex flex-col lg:flex-row overflow-y-auto max-h-[95vh] sm:max-h-[85vh]">
          {/* Image Section */}
          <AnimatedSection direction="left" delay={0.2} className="relative h-64 sm:h-80 lg:h-[600px] lg:w-1/2 overflow-hidden bg-gray-100 rounded-lg lg:rounded-l-lg lg:rounded-r-none">
            {service.icon?.asset ? (
              <Image
                src={urlForProduct(service.icon).url()}
                alt={service.icon.alt || service.title}
                fill
                className="object-cover object-center transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
                priority

              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white text-6xl font-bold opacity-20">
                  {service.title[0]}</span>
              </div>
            )}
            
            {/* Popular Badge */}
            {service.isPopular && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: -12 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
              >
                <Star className="w-4 h-4 inline mr-1" />
                Popular
              </motion.div>
            )}
           </AnimatedSection>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8 lg:w-1/2">
            <StaggerContainer>
              {/* Header */}
              <StaggerItem>
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary bg-opacity-10 text-primary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {service.category}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>

              {/* Price */}
              {service.price && (
                <StaggerItem>
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Harga Mulai Dari:</span>
                      <span className="text-lg sm:text-2xl font-bold text-primary">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              )}

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <StaggerItem>
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                      Yang Termasuk:
                    </h3>
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              )}

              {/* Additional Info */}
              <StaggerItem>
                <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm">Destinasi Terpilih</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm">Fleksibel</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm">Grup & Pribadi</span>
                  </motion.div>
                </div>
              </StaggerItem>

              {/* Action Buttons */}
              <StaggerItem>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 bg-primary text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-primary-dark hover:shadow-lg transform transition-all duration-300 ease-in-out"
                  >
                    Pesan Sekarang
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 border-2 border-primary text-primary py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-primary hover:text-white hover:shadow-lg transform transition-all duration-300 ease-in-out"
                  >
                    Konsultasi Gratis
                  </motion.button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}