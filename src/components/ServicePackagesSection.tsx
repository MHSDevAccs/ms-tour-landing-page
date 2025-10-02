'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ServicesGrid, ServicePackage } from '@/components/ServiceCard'
import ServiceModal from '@/components/ServiceModal'

interface ServicePackagesSectionProps {
  servicePackages: ServicePackage[]
  siteSettings?: any
}

export default function ServicePackagesSection({ 
  servicePackages, 
  siteSettings 
}: ServicePackagesSectionProps) {
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

  if (!servicePackages.length) return null

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-600 tracking-wide uppercase mb-2">
              PAKET LAYANAN
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Paket Rekomendasi
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <ServicesGrid 
                services={servicePackages}
                variant="featured"
                showPrice={true}
                showFeatures={true}
                className="mb-8"
                onServiceClick={handleServiceClick}
                theme={siteSettings?.theme ? {
                  colors: siteSettings.theme.colors,
                  cards: siteSettings.theme.cards ? { service: siteSettings.theme.cards.serviceCard } : undefined,
                  buttons: siteSettings.theme.buttons ? { 
                    primary: siteSettings.theme.buttons.primaryButton,
                    secondary: siteSettings.theme.buttons.secondaryButton 
                  } : undefined
                } : undefined}
              />
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/services"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Lihat Semua Paket 
            </Link>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}