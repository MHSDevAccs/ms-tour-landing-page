import Image from 'next/image'
import Link from 'next/link'
import { urlForProduct } from '@/sanity/lib/image'

// TypeScript interfaces for Service Package
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
}

export default function ServiceCard({ 
  service, 
  variant = 'default',
  showPrice = true,
  showFeatures = true,
  theme
}: ServiceCardProps) {
  
  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  // Format price display
  const formatPrice = (price: ServicePrice) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    
    const amount = formatter.format(price.amount)
    return `${amount}/${price.unit === 'person' ? 'orang' : price.unit}`
  }

  // Theme configuration with fallbacks
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
    <div className={`
      ${themeConfig.cardBase}
      ${isFeatured ? `${themeConfig.border} transform hover:scale-105` : ''}
      ${isCompact ? 'h-full' : ''}
    `}>
      {/* Popular Badge */}
      {service.isPopular && (
        <div className="relative">
          <div className={`absolute top-4 right-4 z-10 ${themeConfig.primaryColor} px-3 py-1 rounded-full text-sm font-semibold`}>
            Populer
          </div>
        </div>
      )}

      {/* Service Image/Icon */}
      <div className={`relative ${
        isCompact ? 'h-32' : isFeatured ? 'h-56' : 'h-48'
      }`}>
        {service.icon?.asset ? (
          <Image
            src={urlForProduct(service.icon).url()}
            alt={service.icon.alt || service.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className={`w-full h-full ${themeConfig.gradientBg} flex items-center justify-center`}>
            <span className="text-white text-3xl font-bold">
              {service.title[0]}
            </span>
          </div>
        )}
      </div>
      
      {/* Service Content */}
      <div className={`p-6 ${isCompact ? 'p-4' : ''}`}>
        {/* Title and Description */}
        <h3 className={`font-semibold ${themeConfig.textPrimary} mb-2 ${
          isFeatured ? 'text-2xl' : isCompact ? 'text-lg' : 'text-xl'
        }`}>
          {service.title}
        </h3>
        
        <p className={`${themeConfig.textSecondary} mb-4 ${
          isCompact ? 'text-sm line-clamp-2' : 'text-base'
        }`}>
          {service.description}
        </p>

        {/* Price */}
        {showPrice && service.price && (
          <div className="mb-4">
            <span className={`font-bold ${themeConfig.primaryText} ${
              isFeatured ? 'text-2xl' : 'text-lg'
            }`}>
              {formatPrice(service.price)}
            </span>
          </div>
        )}

        {/* Features */}
        {showFeatures && service.features && service.features.length > 0 && (
          <div className="mb-4">
            <ul className={`space-y-1 ${isCompact ? 'text-sm' : 'text-sm'}`}>
              {service.features.slice(0, isCompact ? 2 : 4).map((feature, index) => (
                <li key={index} className={`flex items-center ${themeConfig.textSecondary}`}>
                  <span className={`${themeConfig.primaryText} mr-2`}>✓</span>
                  {feature}
                </li>
              ))}
              {isCompact && service.features.length > 2 && (
                <li className="text-gray-400 text-xs">
                  +{service.features.length - 2} fitur lainnya
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <Link 
          href={service.link || `/services/${service.slug?.current || service._id}`}
          className={`
            inline-block w-full text-center px-6 py-3 rounded-lg font-semibold 
            transition-colors duration-200 shadow-md hover:shadow-lg
            ${isFeatured 
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-primary-light text-primary-dark hover:bg-primary hover:text-white'
            }
          `}
        >
          Pelajari Lebih Lanjut
        </Link>
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
}

export function ServicesGrid({ 
  services, 
  variant = 'default',
  showPrice = true,
  showFeatures = true,
  className = '',
  theme
}: ServicesGridProps) {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Tidak ada layanan tersedia saat ini.</p>
      </div>
    )
  }

  const getGridClass = () => {
    if (variant === 'compact') return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    if (variant === 'featured') return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
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
        />
      ))}
    </div>
  )
}

// Export types
export type { ServicePackage, ServicePrice, ServiceCardProps }