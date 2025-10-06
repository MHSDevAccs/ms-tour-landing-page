'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { cleanSocialMediaUrls } from '@/lib/urlUtils'
import { Mail, Phone, MapPin } from 'lucide-react'

interface SiteSettings {
  _id: string
  logo?: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  logoAlt?: string
  siteName?: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    whatsapp?: string
  }
  content?: {
    tagline?: string
    ctaText?: string
    contactCtaText?: string
    getInTouchText?: string
  }
  navigation?: {
    homeText?: string
    aboutText?: string
    servicesText?: string
    galleryText?: string
    blogText?: string
    contactText?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
    youtube?: string
    twitter?: string
    tiktok?: string
  }
  copyrightText?: string
  theme?: {
    colors?: {
      primary?: string
      primaryLight?: string
      textPrimary?: string
      textSecondary?: string
    }
    layout?: {
      container?: string
      footerBg?: string
    }
  }
}

interface BusinessInfo {
  _id: string
  logo?: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  logoAlt?: string
  siteName?: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    whatsapp?: string
  }
  businessHours?: {
    mondayFriday?: string
    saturday?: string
    sunday?: string
    timezone?: string
  }
  content?: {
    tagline?: string
    copyrightText?: string
  }
}

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null)
  const [socialSettings, setSocialSettings] = useState<any>(null)
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site settings for navigation and theme
        const settings = await sanityFetch<SiteSettings>({
          query: queries.getSiteSettings(),
          tags: ['siteSettings'],
          revalidate: 0,
        })

        console.log('Footer: Fetched siteSettings:', settings)
        setSiteSettings(settings)

        // Fetch social settings for social media data
        try {
          const social = await sanityFetch<any>({
            query: queries.getSocialSettingsBasic(),
            tags: ['socialSettings'],
            revalidate: 3600, // Cache for 1 hour since social settings rarely change
          })
          
          // Clean social media URLs before setting
          const cleanedSocial = social ? {
            ...social,
            socialMedia: cleanSocialMediaUrls(social.socialMedia || {})
          } : null
          
          setSocialSettings(cleanedSocial)
        } catch (socialError) {
          // Failed to fetch socialSettings, will use siteSettings as fallback
        }

        // Fetch business info for contact information (primary source)
        try {
          const business = await sanityFetch<BusinessInfo>({
            query: queries.getBusinessInfo(),
            tags: ['businessInfo'],
            revalidate: 0,
          })
          
          if (business) {
            setBusinessInfo(business)
          } else {
            // Fallback to siteSettings contact info if businessInfo doesn't exist
            if (settings) {
              const businessData = {
                _id: settings._id,
                siteName: settings.siteName,
                contactInfo: settings.contactInfo,
                businessHours: undefined // siteSettings doesn't have businessHours
              }
              
              setBusinessInfo(businessData)
            }
          }
        } catch (businessError) {
          // Failed to fetch businessInfo, using siteSettings as fallback
          // Fallback to siteSettings contact info
          if (settings) {
            const businessData = {
              _id: settings._id,
              siteName: settings.siteName,
              contactInfo: settings.contactInfo,
              businessHours: undefined
            }
            
            setBusinessInfo(businessData)
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Theme configuration with proper fallbacks
  const themeConfig = {
    footerBg: siteSettings?.theme?.layout?.footerBg || "bg-gray-900 text-white",
    container: siteSettings?.theme?.layout?.container || "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16",
    primaryLight: siteSettings?.theme?.colors?.primaryLight || "text-primary-light",
    textPrimary: siteSettings?.theme?.colors?.textPrimary || "text-white",
    textSecondary: siteSettings?.theme?.colors?.textSecondary || "text-gray-300",
  }

  const navigation = {
    
    services: services.map(service => ({
      name: service.title,
      href: service.link || `/services/${service.slug?.current || service.category}`
    })),
    legal: [
      { name: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
      { name: 'Syarat Layanan', href: '/terms' },
      { name: 'Kebijakan Pembatalan', href: '/cancellation' },
    ],
    social: [
      ...(socialSettings?.socialMedia?.facebook ? [{
        name: 'Facebook',
        href: socialSettings?.socialMedia?.facebook,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        ),
      }] : []),
      ...(socialSettings?.socialMedia?.instagram ? [{
        name: 'Instagram',
        href: socialSettings?.socialMedia?.instagram,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        ),
      }] : []),
      ...(businessInfo?.contactInfo?.whatsapp ? [{
        name: 'WhatsApp',
        href: `https://wa.me/${businessInfo.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        ),
      }] : []),
      ...(socialSettings?.socialMedia?.youtube ? [{
        name: 'YouTube',
        href: socialSettings?.socialMedia?.youtube,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        ),
      }] : []),
      ...(socialSettings?.socialMedia?.twitter ? [{
        name: 'Twitter',
        href: socialSettings?.socialMedia?.twitter,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        ),
      }] : []),
      ...(socialSettings?.socialMedia?.tiktok ? [{
        name: 'TikTok',
        href: socialSettings?.socialMedia?.tiktok,
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        ),
      }] : []),
    ],
  }

  return (
    <footer className={themeConfig.footerBg}>
      <div className={themeConfig.container}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <Image
                src="/main-logo.png"
                alt="Mahabbatussholihin Tour & Travel"
                width={400}
                height={400}
                className="h-24 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
              {siteSettings?.content?.tagline || 'Mitra terpercaya Anda untuk pengalaman perjalanan yang tak terlupakan. Kami menciptakan kenangan yang bertahan seumur hidup dengan paket wisata yang dirancang ahli.'}
            </p>
          </div>

          {/* Informasi */}
          <div className="mt-8 sm:mt-0">
            <h3 className="text-lg font-semibold mb-6 text-white">Informasi</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/kebijakan-privasi"
                  className="text-gray-300 hover:text-primary-light transition-colors duration-200 text-sm sm:text-base block py-1"
                >
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-lg font-semibold mb-6 text-white">Sosial Media</h3>
            <div className="space-y-4">
              {(socialSettings?.socialMedia?.instagram || siteSettings?.socialMedia?.instagram) && (
                <a
                  href={socialSettings?.socialMedia?.instagram || siteSettings?.socialMedia?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-primary-light transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Instagram</span>
                </a>
              )}
              {(socialSettings?.socialMedia?.facebook || siteSettings?.socialMedia?.facebook) && (
                <a
                  href={socialSettings?.socialMedia?.facebook || siteSettings?.socialMedia?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-primary-light transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Facebook</span>
                </a>
              )}
              {(socialSettings?.socialMedia?.youtube || siteSettings?.socialMedia?.youtube) && (
                <a
                  href={socialSettings?.socialMedia?.youtube || siteSettings?.socialMedia?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-primary-light transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">YouTube</span>
                </a>
              )}
              {(socialSettings?.socialMedia?.twitter || siteSettings?.socialMedia?.twitter) && (
                <a
                  href={socialSettings?.socialMedia?.twitter || siteSettings?.socialMedia?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-primary-light transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Twitter</span>
                </a>
              )}
              {(socialSettings?.socialMedia?.tiktok || siteSettings?.socialMedia?.tiktok) && (
                <a
                  href={socialSettings?.socialMedia?.tiktok || siteSettings?.socialMedia?.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-primary-light transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">TikTok</span>
                </a>
              )}
              {businessInfo?.contactInfo?.whatsapp && (
                <a
                  href={`https://wa.me/${businessInfo.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-primary-light transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 lg:mt-0 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">Informasi Kontak</h3>
            <div className="space-y-4">
              {businessInfo?.contactInfo?.address && (
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-light mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-300 text-sm whitespace-pre-line">
                    {businessInfo.contactInfo.address}
                  </p>
                </div>
              )}
              {businessInfo?.contactInfo?.whatsapp && businessInfo.contactInfo.whatsapp.trim() && (
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-primary-light mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href={`https://wa.me/${businessInfo.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} 
                    className="text-gray-300 hover:text-primary-light transition-colors text-sm"
                  >
                    {businessInfo.contactInfo.whatsapp}
                  </a>
                </div>
              )}
              {businessInfo?.contactInfo?.phone && businessInfo.contactInfo.phone.trim() && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary-light mr-3 flex-shrink-0" />
                  <a 
                    href={`tel:${businessInfo.contactInfo.phone}`} 
                    className="text-gray-300 hover:text-primary-light transition-colors text-sm"
                  >
                    {businessInfo.contactInfo.phone}
                  </a>
                </div>
              )}
              {businessInfo?.contactInfo?.email && businessInfo.contactInfo.email.trim() && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-light mr-3 flex-shrink-0" />
                  <a 
                    href={`mailto:${businessInfo.contactInfo.email}`}
                    className="text-gray-300 hover:text-primary-light transition-colors text-sm"
                  >
                    {businessInfo.contactInfo.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              {siteSettings?.copyrightText || `© ${currentYear} Mahabbatussholihin Tour & Travel. Semua hak dilindungi.`}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-primary-light text-sm transition-colors duration-200 py-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer