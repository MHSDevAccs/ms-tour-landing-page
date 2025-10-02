'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlForProduct } from '@/sanity/lib/image'

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

interface ThemeConfig {
  colors?: {
    primary?: string
    primaryLight?: string
    primaryDark?: string
    textPrimary?: string
    textSecondary?: string
  }
  cards?: {
    service?: string
  }
  buttons?: {
    primary?: string
    secondary?: string
  }
}

interface ServiceCardProps {
  service: ServicePackage
  variant?: 'default' | 'compact' | 'featured'
  showPrice?: boolean
  showFeatures?: boolean
  theme?: ThemeConfig
  onServiceClick?: (service: ServicePackage) => void
}

export default function ServiceCard({ 
  service, 
  variant = 'default',
  showPrice = true,
  showFeatures = true,
  theme,
  onServiceClick
}: ServiceCardProps) {
  
  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

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

  // Theme configuration
  const themeConfig = {
    cardBase: theme?.cards?.service || 'bg-white rounded-lg shadow-lg overflow-hidden',
    primaryColor: 'bg-primary text-white',
    primaryText: 'text-primary',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    gradientBg: 'bg-gradient-to-br from-primary to-primary-dark',
    border: 'border-2 border-primary'
  }

  return (
    <div 
      onClick={() => onServiceClick?.(service)}
      className={`
        relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer
        ${isFeatured ? 'shadow-3xl' : ''}
        w-full h-[500px]
        drop-shadow-lg hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]
        touch-manipulation
      `}
    >
      {/* Image Only */}
      {service.icon?.asset ? (
        <Image
          src={urlForProduct(service.icon).url()}
          alt={service.icon.alt || service.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className={`w-full h-full ${themeConfig.gradientBg} flex items-center justify-center`}>
          <span className="text-white text-6xl font-bold opacity-20">
            {service.title[0]}
          </span>
        </div>
      )}

      {/* Service Info Overlay - Always Visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-gray-200 mb-4 line-clamp-2">
            {service.description}
          </p>
          <div className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-lg">
            Detail Paket
          </div>
        </div>
      </div>
    </div>
  )
}

// Services Grid Component
interface ServicesGridProps {
  services: ServicePackage[]
  variant?: 'default' | 'compact' | 'featured'
  showPrice?: boolean
  showFeatures?: boolean
  className?: string
  theme?: ThemeConfig
  onServiceClick?: (service: ServicePackage) => void
}

export function ServicesGrid({ 
  services, 
  variant = 'default',
  showPrice = true,
  showFeatures = true,
  className = '',
  theme,
  onServiceClick
}: ServicesGridProps) {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Tidak ada layanan tersedia saat ini.</p>
      </div>
    )
  }

  const getGridClass = () => {
    if (variant === 'compact') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    if (variant === 'featured') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <div className={`grid ${getGridClass()} gap-6 place-items-center justify-items-center ${className}`}>
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          variant={variant}
          showPrice={showPrice}
          showFeatures={showFeatures}
          theme={theme}
          onServiceClick={onServiceClick}
        />
      ))}
    </div>
  )
}

// Export types
export type { ServicePackage, ServicePrice, ServiceCardProps }