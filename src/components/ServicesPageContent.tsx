'use client'

import { useState } from 'react'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { ServicesGrid, ServicePackage } from '@/components/ServiceCard'
import ServiceModal from '@/components/ServiceModal'
import FeaturesSection from '@/components/FeaturesSection'

interface ServicesPageContentProps {
  services: ServicePackage[]
  featuresData: any
}

export default function ServicesPageContent({ 
  services, 
  featuresData
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="text-4xl font-bold mb-4">
                Layanan Kami
              </h1>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.4}>
              <p className="text-xl text-white">
                Bismillah, kami menawarkan berbagai layanan perjalanan yang berkah dan komprehensif yang dirancang untuk memenuhi kebutuhan setiap jamaah dengan penuh amanah dan barokah.
              </p>
            </AnimatedSection>
          </div>
        </div>
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-32 py-16">

          {/* All Services Section */}
          {services.length > 0 && (
            <div className="mb-16">
              <AnimatedSection direction="up" delay={0.1}>
                <div className="text-center mb-8">                  
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
                Siap Memulai Perjalanan Anda?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik untuk perjalanan impian Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/6287770005801"
                  className="border-2 border-primary text-white bg-primary px-8 py-3 rounded-lg font-semibold"
                >
                  Konsultasi Gratis
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </PageTransition>
  )
}