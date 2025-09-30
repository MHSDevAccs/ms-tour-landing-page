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
  onClick?: (service: ServicePackage) => void
}

export default function ServiceCard({ 
  service, 
  variant = 'default',
  showPrice = true,
  showFeatures = true,
  theme,
  onClick
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
    cardBase: theme?.cards?.service || 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300',
    primaryColor: 'bg-primary text-white',
    primaryText: 'text-primary',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    gradientBg: 'bg-gradient-to-br from-primary to-primary-dark',
    border: 'border-2 border-primary'
  }

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300
        ${isFeatured ? 'transform hover:scale-105 shadow-3xl hover:shadow-4xl' : ''}
        w-full h-[500px] group cursor-pointer
        drop-shadow-lg hover:drop-shadow-2xl
      `}
      onClick={() => onClick?.(service)}
    >
      {/* Image Only */}
      {service.icon?.asset ? (
        <Image
          src={urlForProduct(service.icon).url()}
          alt={service.icon.alt || service.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className={`w-full h-full ${themeConfig.gradientBg} flex items-center justify-center`}>
          <span className="text-white text-6xl font-bold opacity-20">
            {service.title[0]}
          </span>
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-gray-700 text-lg font-semibold tracking-wide drop-shadow-lg">
            Info Lebih Lanjut
          </p>
          <div className="w-16 h-0.5 bg-gray-700 mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100 drop-shadow-lg"></div>
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
    <div className={`grid ${getGridClass()} gap-6 ${className}`}>
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          variant={variant}
          showPrice={showPrice}
          showFeatures={showFeatures}
          theme={theme}
          onClick={onServiceClick}
        />
      ))}
    </div>
  )
}

// Export types
export type { ServicePackage, ServicePrice, ServiceCardProps }