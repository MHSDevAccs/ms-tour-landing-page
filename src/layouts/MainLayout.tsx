'use client'

import { ReactNode, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { sanityFetch, queries } from '@/sanity/lib/client'

interface MainLayoutProps {
  children: ReactNode
}

interface SiteSettings {
  contactInfo?: {
    whatsapp?: string
  }
  theme?: {
    colors?: {
      background?: string
      backgroundAlt?: string
    }
  }
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    // Fetch site settings including theme and WhatsApp number from CMS
    async function fetchSiteSettings() {
      try {
        const settings = await sanityFetch<SiteSettings>({
          query: queries.getSiteSettings(),
          tags: ['siteSettings']
        })
        
        setSiteSettings(settings)
        
        if (settings?.contactInfo?.whatsapp) {
          setWhatsappNumber(settings.contactInfo.whatsapp)
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error)
      }
    }

    fetchSiteSettings()
  }, [])

  // Apply dynamic background color if available
  const backgroundStyle = siteSettings?.theme?.colors?.background 
    ? { backgroundColor: siteSettings.theme.colors.background }
    : {}

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={backgroundStyle}
    >
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppFloat 
        phoneNumber={whatsappNumber || '+6281234567890'}
        message="Halo! Saya tertarik dengan layanan tour Anda. Bisa bantu saya dengan informasi lebih lanjut?"
        theme={siteSettings?.theme}
      />
    </div>
  )
}

export default MainLayout