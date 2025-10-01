'use client'

import { useState } from 'react'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { ServicesGrid, ServicePackage } from '@/components/ServiceCard'
import FeaturesSection from '@/components/FeaturesSection'
import ServiceModal from '@/components/ServiceModal'

interface ServicesPageContentProps {
  services: ServicePackage[]
  featuresData: any
  siteSettings: any
}

export default function ServicesPageContent({ 
  services, 
  featuresData, 
  siteSettings 
}: ServicesPageContentProps) {
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleServiceClick = (service: ServicePackage) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Services Header */}
        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="text-4xl font-bold mb-4">
                {siteSettings?.servicesContent?.mainTitle || 'Layanan Kami'}
              </h1>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.4}>
              <p className="text-xl text-primary-lighter">
                {siteSettings?.servicesContent?.subtitle || 'Bismillah, kami nawarin berbagai layanan perjalanan yang berkah dan komprehensif yang dirancang buat memenuhi kebutuhan setiap jamaah dengan penuh amanah dan barakah.'}
              </p>
            </AnimatedSection>
          </div>
        </div>
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Popular Services Section */}
          {services.filter(s => s.isPopular).length > 0 && (
            <div className="mb-16">
              <AnimatedSection direction="up" delay={0.1}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-black mb-4">
                    {siteSettings?.servicesContent?.popularServicesTitle || 'Layanan Populer'}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {siteSettings?.servicesContent?.popularServicesSubtitle || 'Pengalaman perjalanan yang paling banyak diminta'}
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.3}>
                <ServicesGrid 
                  services={services.filter(s => s.isPopular)} 
                  variant="featured"
                  className="mb-8"
                  onServiceClick={handleServiceClick}
                />
              </AnimatedSection>
            </div>
          )}

          {/* All Services Section */}
          {services.length > 0 && (
            <div className="mb-16">
              <AnimatedSection direction="up" delay={0.1}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-black mb-4">
                    {siteSettings?.servicesContent?.allServicesTitle || 'Semua Layanan'}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {siteSettings?.servicesContent?.allServicesSubtitle || 'Pilihan lengkap untuk setiap kebutuhan perjalanan'}
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.3}>
                <ServicesGrid 
                  services={services} 
                  variant="featured" 
                  onServiceClick={handleServiceClick}
                />
              </AnimatedSection>
            </div>
          )}

          {/* Additional Features Section */}
          <AnimatedSection direction="up" delay={0.2}>
            <FeaturesSection 
              data={featuresData} 
              variant="compact" 
              maxFeatures={4}
              className="mb-16" 
            />
          </AnimatedSection>
          
          {/* Call to Action Section */}
          <AnimatedSection direction="scale" delay={0.1}>
            <div className="text-center bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-black mb-4">
                {siteSettings?.servicesContent?.ctaTitle || 'Siap Memulai Perjalanan Anda?'}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {siteSettings?.servicesContent?.ctaDescription || 'Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik untuk perjalanan impian Anda.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/6281110002477"
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  {siteSettings?.servicesContent?.ctaSecondaryButtonText || 'Konsultasi Gratis'}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Service Modal */}
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </PageTransition>
  )
}