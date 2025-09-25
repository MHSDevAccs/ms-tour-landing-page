import Image from 'next/image'
import Link from 'next/link'
import { urlForProduct } from '@/sanity/lib/image'
import AnimatedSection, { StaggerContainer, StaggerItem, HoverCard } from './AnimatedSection'

// TypeScript interfaces for Features
interface Feature {
  title: string
  description: string
  icon?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  link?: string
}

interface FeaturesSectionData {
  _id: string
  sectionTitle: string
  sectionSubtitle?: string
  features: Feature[]
}

interface FeaturesSectionProps {
  data: FeaturesSectionData | null
  variant?: 'default' | 'compact' | 'showcase'
  maxFeatures?: number
  className?: string
}

export default function FeaturesSection({ 
  data, 
  variant = 'default', 
  maxFeatures = 3,
  className = '' 
}: FeaturesSectionProps) {
  // Return null if no data
  if (!data || !data.features || data.features.length === 0) {
    return null
  }

  // Get the features to display (limit by maxFeatures)
  const featuresToShow = data.features.slice(0, maxFeatures)

  // Determine grid columns based on variant and number of features
  const getGridClass = () => {
    if (variant === 'compact') return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    if (variant === 'showcase') return 'grid-cols-1 lg:grid-cols-2'
    
    // Default variant - responsive based on number of features
    if (featuresToShow.length === 1) return 'grid-cols-1 max-w-md mx-auto'
    if (featuresToShow.length === 2) return 'grid-cols-1 md:grid-cols-2'
    return 'grid-cols-1 md:grid-cols-3'
  }

  // Get background color based on variant
  const getBgClass = () => {
    if (variant === 'showcase') return 'bg-white'
    if (variant === 'compact') return 'bg-gray-50'
    return 'bg-secondary-light'
  }

  return (
    <AnimatedSection className={`py-16 ${getBgClass()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection direction="fade" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {data.sectionTitle}
          </h2>
          {data.sectionSubtitle && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.sectionSubtitle}
            </p>
          )}
        </AnimatedSection>
        
        {/* Features Grid with Stagger Animation */}
        <StaggerContainer className={`grid ${getGridClass()} gap-8`} staggerDelay={0.15}>
          {featuresToShow.map((feature, index) => (
            <StaggerItem key={`${data._id}-feature-${index}`}>
              <FeatureCard 
                feature={feature} 
                variant={variant}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}

// Individual Feature Card Component
interface FeatureCardProps {
  feature: Feature
  variant: 'default' | 'compact' | 'showcase'
}

function FeatureCard({ feature, variant }: FeatureCardProps) {
  const isCompact = variant === 'compact'
  const isShowcase = variant === 'showcase'

  return (
    <HoverCard className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${isShowcase ? 'flex items-center' : ''}`}>
      {/* Feature Image */}
      <div className={`relative ${
        isCompact 
          ? 'w-full h-32' 
          : isShowcase 
          ? 'w-48 h-48 flex-shrink-0' 
          : 'w-full h-48'
      }`}>
        {feature.icon?.asset ? (
          <Image
            src={urlForProduct(feature.icon).url()}
            alt={feature.icon.alt || feature.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {feature.title[0]}
            </span>
          </div>
        )}
      </div>
      
      {/* Feature Content */}
      <div className={`p-6 ${isShowcase ? 'flex-1' : ''}`}>
        <h3 className={`font-semibold text-black mb-2 ${
          isCompact ? 'text-lg' : isShowcase ? 'text-2xl' : 'text-xl'
        }`}>
          {feature.title}
        </h3>
        <p className={`text-gray-600 mb-4 ${
          isCompact ? 'text-sm' : 'text-base'
        }`}>
          {feature.description}
        </p>
        {feature.link && (
          <Link 
            href={feature.link}
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Learn More →
          </Link>
        )}
      </div>
    </HoverCard>
  )
}

// Export types for use in other components
export type { Feature, FeaturesSectionData, FeaturesSectionProps }