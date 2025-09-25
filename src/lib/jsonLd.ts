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
    email: siteSettings?.contactInfo?.email || 'info@mhstour.com',
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