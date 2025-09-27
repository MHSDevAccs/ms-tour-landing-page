import { BlogPost } from '@/types/blog'

interface SiteSettings {
  siteName?: string
  contactInfo?: {
    email?: string
    phone?: string
  }
}

export function generateBlogPostJsonLd(post: BlogPost, baseUrl: string, siteSettings?: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? [
      `${post.featuredImage.asset.url}?w=1200&h=630&fit=crop&crop=center`
    ] : [],
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug.current}`
    },
    keywords: post.tags?.join(', '),
    articleSection: post.categories?.map(cat => cat.replace('-', ' ')).join(', '),
    url: `${baseUrl}/blog/${post.slug.current}`,
    inLanguage: post.language === 'id' ? 'id-ID' : 'en-US'
  }
}

export function generateBlogListJsonLd(posts: BlogPost[], baseUrl: string, siteSettings?: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Blog - ${siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel'}`,
    description: `Tips perjalanan, panduan destinasi, dan artikel wisata dari ${siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel'}`,
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug.current}`,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author
      }
    }))
  }
}

export function generateOrganizationJsonLd(baseUrl: string, siteSettings?: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel',
    alternateName: 'MHS Tour',
    description: 'Penyedia layanan wisata dan travel terpercaya di Indonesia dengan pengalaman lebih dari 10 tahun',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    telephone: siteSettings?.contactInfo?.phone || '+62-xxx-xxxx-xxxx',
    email: siteSettings?.contactInfo?.email || 'info@mahabbatussholihin.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressLocality: 'Indonesia'
    },
    sameAs: [
      'https://facebook.com/mhstour',
      'https://instagram.com/mhstour',
      'https://twitter.com/mhstour'
    ],
    serviceArea: {
      '@type': 'Country',
      name: 'Indonesia'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Paket Wisata Domestik',
            description: 'Paket wisata ke berbagai destinasi menarik di Indonesia'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Wisata Religi',
            description: 'Paket wisata religi dan umroh'
          }
        }
      ]
    }
  }
}

export function generateBreadcrumbJsonLd(items: Array<{name: string, url: string}>, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  }
}

// Enhanced structured data for travel business
export function generateTravelServiceJsonLd(baseUrl: string, siteSettings?: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${baseUrl}#organization`,
    name: siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel',
    alternateName: ['MHS Tour', 'Mahabbatussholihin Travel'],
    description: 'Agen perjalanan terpercaya yang menyediakan paket wisata domestik, internasional, dan layanan umroh dengan pengalaman lebih dari 10 tahun',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 300,
      height: 300
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630
    },
    telephone: siteSettings?.contactInfo?.phone || '+62-xxx-xxxx-xxxx',
    email: siteSettings?.contactInfo?.email || 'info@mahabbatussholihin.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressLocality: 'Indonesia',
      addressRegion: 'Indonesia'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2088,
      longitude: 106.8456
    },
    sameAs: [
      'https://facebook.com/mhstour',
      'https://instagram.com/mhstour',
      'https://twitter.com/mhstour',
      'https://youtube.com/mhstour'
    ],
    serviceArea: [
      {
        '@type': 'Country',
        name: 'Indonesia'
      },
      {
        '@type': 'Country', 
        name: 'Saudi Arabia'
      }
    ],
    areaServed: 'Indonesia',
    knowsAbout: [
      'Travel Planning',
      'Tour Packages',
      'Religious Tourism',
      'Umroh Services',
      'Domestic Tourism',
      'International Travel',
      'Hotel Booking',
      'Flight Booking'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services Catalog',
      description: 'Katalog lengkap layanan perjalanan dan wisata',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Paket Wisata Domestik',
          description: 'Paket wisata ke berbagai destinasi menarik di Indonesia',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Wisata Domestik Indonesia',
            touristType: 'Leisure',
            geo: {
              '@type': 'Country',
              name: 'Indonesia'
            }
          }
        },
        {
          '@type': 'Offer',
          name: 'Paket Umroh',
          description: 'Paket ibadah umroh dengan fasilitas lengkap dan pembimbing berpengalaman',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Umroh Package',
            touristType: 'Religious',
            geo: {
              '@type': 'Country',
              name: 'Saudi Arabia'
            }
          }
        },
        {
          '@type': 'Offer',
          name: 'Paket Wisata Internasional',
          description: 'Paket wisata ke destinasi internasional pilihan',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'International Tour',
            touristType: 'Leisure'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1'
    },
    priceRange: 'Rp 1.000.000 - Rp 50.000.000'
  }
}

export function generateWebsiteJsonLd(baseUrl: string, siteSettings?: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    name: siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel',
    alternateName: 'MHS Tour Website',
    description: 'Situs resmi Mahabbatussholihin Tour & Travel - Partner terpercaya untuk perjalanan wisata dan umroh Anda',
    url: baseUrl,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`
    },
    about: {
      '@type': 'TravelAgency',
      '@id': `${baseUrl}#organization`
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/blog?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    ],
    mainEntity: {
      '@type': 'TravelAgency',
      '@id': `${baseUrl}#organization`
    }
  }
}

export function generateContactPageJsonLd(baseUrl: string, siteSettings?: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Hubungi Kami - Mahabbatussholihin Tour & Travel',
    description: 'Hubungi tim profesional kami untuk konsultasi dan pemesanan paket wisata',
    url: `${baseUrl}/contact`,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteSettings?.contactInfo?.phone || '+62-xxx-xxxx-xxxx',
        email: siteSettings?.contactInfo?.email || 'info@mahabbatussholihin.com',
        contactType: 'Customer Service',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '17:00'
        }
      }
    }
  }
}

export function generateServicePageJsonLd(baseUrl: string, siteSettings?: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Layanan Travel & Tour - Mahabbatussholihin',
    description: 'Layanan perjalanan wisata lengkap meliputi paket domestik, internasional, dan umroh',
    url: `${baseUrl}/services`,
    provider: {
      '@type': 'TravelAgency',
      '@id': `${baseUrl}#organization`
    },
    serviceType: 'Travel Agency Services',
    areaServed: 'Indonesia',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services',
      itemListElement: [
        {
          '@type': 'Service',
          name: 'Paket Wisata Domestik',
          description: 'Explore keindahan Indonesia dengan paket wisata domestik pilihan',
          serviceType: 'Domestic Tourism'
        },
        {
          '@type': 'Service', 
          name: 'Paket Umroh',
          description: 'Layanan umroh dengan bimbingan spiritual dan fasilitas nyaman',
          serviceType: 'Religious Tourism'
        },
        {
          '@type': 'Service',
          name: 'Paket Wisata Internasional', 
          description: 'Jelajahi dunia dengan paket wisata internasional terpilih',
          serviceType: 'International Tourism'
        }
      ]
    }
  }
}

export function generateFAQJsonLd(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}