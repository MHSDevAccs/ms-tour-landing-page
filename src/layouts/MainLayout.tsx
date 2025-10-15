'use client'

import { ReactNode, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import NavigationLoader from '../components/NavigationLoader'
import { sanityFetch, queries } from '@/sanity/lib/client'

interface MainLayoutProps {
  children: ReactNode
}

interface ContactData {
  contactWhatsapp?: string
  whatsappTemplate?: string
  theme?: {
    colors?: {
      background?: string
      backgroundAlt?: string
    }
  }
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [contactData, setContactData] = useState<ContactData | null>(null)

  useEffect(() => {
    // Fetch contact data including WhatsApp number from CMS
    async function fetchContactData() {
      try {
        const data = await sanityFetch<ContactData>({
          query: queries.getContactDataBasic(),
          tags: ['contactData'],
          revalidate: 3600 // Cache for 1 hour since contact data rarely changes
        })
        
        setContactData(data)
        
        if (data?.contactWhatsapp) {
          setWhatsappNumber(data.contactWhatsapp)
        }
      } catch (error) {
        console.error('Failed to fetch contact data:', error)
      }
    }

    fetchContactData()
  }, [])

  // Apply dynamic background color if available
  const backgroundStyle = contactData?.theme?.colors?.background 
    ? { backgroundColor: contactData.theme.colors.background }
    : {}

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={backgroundStyle}
    >
      <NavigationLoader />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppFloat 
        phoneNumber={whatsappNumber || '+6287770005801'}
        message={contactData?.whatsappTemplate || "Halo! Saya tertarik dengan layanan tour Anda. Bisa bantu saya dengan informasi lebih lanjut?"}
      />
    </div>
  )
}

export default MainLayout