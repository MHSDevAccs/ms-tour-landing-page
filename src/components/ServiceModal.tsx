'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { urlForProduct } from '@/sanity/lib/image'
import { X, Check, Star, MapPin, Clock, Users } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection'

// Portable Text components for styling
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-7 mb-6 text-base font-normal tracking-wide whitespace-pre-line">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-xl font-bold text-gray-900 mb-4 mt-8 leading-tight">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg font-bold text-gray-900 mb-3 mt-6 leading-tight">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-base font-semibold text-gray-900 mb-3 mt-5 leading-tight">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary bg-primary/10 pl-4 py-3 italic text-gray-700 my-6 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-2 mb-6 text-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="space-y-2 mb-6 text-gray-700 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3 text-base leading-7">
        <span className="text-primary mt-1 text-sm font-bold">•</span>
        <span className="flex-1 text-gray-700">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-base leading-7 text-gray-700 ml-2">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-700">{children}</em>
    ),
    underline: ({ children }: any) => (
      <span className="underline text-gray-700">{children}</span>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : ''}
        className="text-primary hover:text-primary-light underline font-medium transition-colors"
      >
        {children}
      </a>
    ),
  },
}

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
  description: any[] | string // Support both PortableText array and legacy string
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
          className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-gray-500 bg-opacity-30 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full max-h-[95vh] overflow-hidden"
          >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute top-2 right-2 z-10 p-1.5 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 ease-in-out"
        >
          <X className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
        </motion.button>

        {/* Modal Content */}
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <AnimatedSection direction="left" delay={0.2} className="relative h-64 w-full overflow-hidden bg-gray-100 rounded-t-xl flex-shrink-0">
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
            
            
           </AnimatedSection>

          {/* Content */}
          <div className="p-4 overflow-y-auto flex-1 min-h-0">
            <StaggerContainer>
              {/* Header */}
              <StaggerItem>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h2>
                  <div className="text-gray-700 leading-7">
                    {service.description ? (
                      typeof service.description === 'string' ? (
                        <p className="text-gray-700 leading-7 text-base font-normal tracking-wide whitespace-pre-line">
                          {service.description}
                        </p>
                      ) : service.description.length > 0 ? (
                        <PortableText
                          value={service.description}
                          components={portableTextComponents}
                        />
                      ) : (
                        <p className="text-gray-700 leading-7 text-base font-normal tracking-wide">
                          No description available.
                        </p>
                      )
                    ) : (
                      <p className="text-gray-700 leading-7 text-base font-normal tracking-wide">
                        No description available.
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>

              {/* Price */}
              {service.price && (
                <StaggerItem>
                  <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="flex flex-col justify-between">
                      <span className="text-sm text-gray-600">Harga Mulai Dari:</span>
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              )}

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <StaggerItem>
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
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
                <div className="mb-4 grid grid-cols-1 gap-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs">Destinasi Terpilih</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs">Fleksibel</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-xs">Grup & Pribadi</span>
                  </motion.div>
                </div>
              </StaggerItem>

              {/* Action Buttons */}
              <StaggerItem>
                <div className="flex flex-col gap-2">
                  <motion.a 
                    href="https://wa.me/6281110002477"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 border-2 border-primary bg-primary text-white py-2.5 px-4 rounded-lg text-sm font-semibold text-center inline-block"
                  >
                    Konsultasi Gratis
                  </motion.a>
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