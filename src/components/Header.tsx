'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

// Define the ContactData interface based on the actual Sanity schema
interface ContactData {
  contactInfo: {
    phone: string
    email: string
    address: string
  }
  contactWhatsapp: string
  whatsappTemplate: string
  businessHours: {
    mondayFriday: string
    timezone: string
  }
  contactContent: {
    pageTitle: string
    pageDescription: string
    contactDetailsTitle: string
    phoneLabel: string
    emailLabel: string
    addressLabel: string
    whatsappLabel: string
    businessHoursTitle: string
  }
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contact data
        const contact = await sanityFetch<ContactData>({
          query: queries.getContactDataBasic(),
          tags: ['contactData'],
          revalidate: 3600 // Cache for 1 hour since contact data rarely changes
        })
        setContactData(contact)         
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [])

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/about' },
    { name: 'Layanan', href: '/services' },
    { name: 'Galeri', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Kontak', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Header Bar with Logo and Contact Info - Hidden on Mobile & Medium */}
      <div className="hidden xl:block bg-white h-28 text-gray-800">
        <div className="container mx-auto md:px-40 lg:px-40 xl:px-54 2xl:px-84 -my-2">
          <div className="flex items-center">
            {/* Logo in Middle-Left */}
            <div className="flex flex-col">
              <Link href="/" className="flex items-center">
                <Image
                  src="/main-logo.png"  
                  alt="Mahabbatussholihin Tour & Travel"
                  width={240}
                  height={60}
                  className="h-36 w-auto"
                  priority
                />
              </Link>
            </div>
            
            {/* Contact Information from Middle to Right */}
            <div className="flex-1 flex items-center justify-end space-x-8">
              {/* Email */}
              {contactData?.contactInfo?.email && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-sm">Hubungi Kami</span>
                    <span className="font-medium">{contactData.contactInfo.email}</span>
                  </div>
                </div>
              )}
              
              {/* Phone */}
              {contactData?.contactInfo?.phone && (   
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-sm">Hubungi Kami</span>
                    <span className="font-medium text-lg">{contactData.contactInfo.phone}</span>
                  </div>
                </div>
              )}
              
              {/* Operating Hours */}
              {contactData?.businessHours?.mondayFriday && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-sm">Jam Operasional</span>
                    <span className="font-medium">{contactData?.businessHours?.mondayFriday}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="sticky top-0 bg-white z-[100] shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-20 xl:h-12">
            {/* Desktop Navigation - Centered */}
            <div className="hidden xl:flex">
              <nav className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-gray-700 hover:text-primary font-medium transition-colors text-base py-2 border-b-2 border-transparent hover:border-primary ${
                      isActive(item.href) ? 'text-primary border-primary' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile & Medium & Large Layout - Logo centered, menu button on right */}
            <div className="xl:hidden flex items-center justify-between h-20 w-full py-2">
            {/* Empty space for balance */}
            <div className="w-10"></div>
            
            {/* Logo - centered and bigger */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/main-logo.png"
                  alt="Mahabbatussholihin Tour & Travel"
                  width={280}
                  height={84}
                  className="h-22 w-auto transition-transform hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Medium & Large menu */}
      <div className={`xl:hidden fixed top-20 left-0 right-0 z-[200] transition-all duration-300 ease-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100 transform scale-y-100' 
          : 'max-h-0 opacity-0 transform scale-y-0'
      } origin-top overflow-hidden`}>
        <div className="px-4 py-4 space-y-2 bg-white border-t border-gray-200 text-center shadow-lg">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg mx-auto max-w-xs ${
                isMenuOpen 
                  ? 'opacity-100 transform translate-x-0' 
                  : 'opacity-0 transform translate-x-[-10px]'
              } ${
                isActive(item.href)
                  ? 'text-primary bg-primary-lighter'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          

        </div>
      </div>
    </>
  )
}

export default Header