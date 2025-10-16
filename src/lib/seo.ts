// src/lib/seo.ts
// SEO utilities for meta tags, Open Graph, and Twitter Cards

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: string[];
}

export interface BusinessSEO {
  businessName: string;
  businessType: 'TravelAgency' | 'Organization';
  description: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };
  socialProfiles?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

// Default business information
export const defaultBusinessSEO: BusinessSEO = {
  businessName: 'Mahabbatussholihin Tour & Travel',
  businessType: 'TravelAgency',
  description: 'Agen perjalanan terpercaya yang menyediakan paket wisata domestik, internasional, dan layanan umroh dengan pengalaman lebih dari 10 tahun',
  phone: '+62-xxx-xxxx-xxxx',
  email: 'info@mahabbatussholihin.com',
  address: {
    country: 'Indonesia',
    city: 'Indonesia'
  },
  socialProfiles: {
    facebook: 'https://facebook.com/MStour',
    instagram: 'https://instagram.com/MStour',
    twitter: 'https://twitter.com/MStour',
    youtube: 'https://youtube.com/MStour'
  }
};

// Generate comprehensive meta tags
export function generateMetaTags(seoData: SEOData, businessInfo: BusinessSEO = defaultBusinessSEO) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://travel.mahabbatussholihin.com';
  const fullUrl = seoData.url ? `${baseUrl}${seoData.url}` : baseUrl;
  const imageUrl = seoData.image ? 
    (seoData.image.startsWith('http') ? seoData.image : `${baseUrl}${seoData.image}`) 
    : `${baseUrl}/og-image.jpg`;

  return {
    // Basic Meta Tags
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords?.join(', '),
    
    // Open Graph Tags
    openGraph: {
      type: seoData.type || 'website',
      title: seoData.title,
      description: seoData.description,
      url: fullUrl,
      siteName: businessInfo.businessName,
      locale: seoData.locale || 'id_ID',
      alternateLocale: seoData.alternateLocales || ['en_US'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seoData.title,
          type: 'image/jpeg'
        }
      ],
      ...(seoData.type === 'article' && {
        article: {
          publishedTime: seoData.publishedTime,
          modifiedTime: seoData.modifiedTime,
          author: seoData.author,
          section: seoData.section,
          tags: seoData.tags
        }
      })
    },

    // Twitter Card Tags
    twitter: {
      card: 'summary_large_image',
      site: businessInfo.socialProfiles?.twitter ? 
        `@${businessInfo.socialProfiles.twitter.split('/').pop()}` : '@MStour',
      creator: seoData.author ? `@${seoData.author}` : '@MStour',
      title: seoData.title,
      description: seoData.description,
      images: [imageUrl]
    },

    // Additional Meta Tags
    other: {
      'theme-color': '#39ace7',
      'msapplication-TileColor': '#39ace7',
      'msapplication-TileImage': `${baseUrl}/ms-icon-144x144.png`,
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': businessInfo.businessName,
      
      // Business specific
      'business:contact_data:street_address': businessInfo.address?.street,
      'business:contact_data:locality': businessInfo.address?.city,
      'business:contact_data:region': businessInfo.address?.region,
      'business:contact_data:postal_code': businessInfo.address?.postalCode,
      'business:contact_data:country_name': businessInfo.address?.country,
      'business:contact_data:email': businessInfo.email,
      'business:contact_data:phone_number': businessInfo.phone,
      
      // Travel specific
      'geo.region': 'ID',
      'geo.placename': 'Indonesia',
      'ICBM': '-6.2088, 106.8456',
      
      // Content classification
      'content-language': seoData.locale || 'id',
      'language': seoData.locale || 'id',
      'distribution': 'Global',
      'rating': 'General',
      'revisit-after': '7 days',
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }
  };
}

// Predefined SEO data for different pages
export const pageSEOData = {
  home: {
    title: 'Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda',
    description: 'Jelajahi dunia bersama Mahabbatussholihin Tour & Travel - Mitra terpercaya untuk pengalaman perjalanan yang tak terlupakan. Paket wisata domestik, internasional, dan umroh terbaik.',
    keywords: ['tour', 'travel', 'vacation', 'holiday', 'tourism', 'Indonesia', 'travel agency', 'tour packages', 'umroh', 'wisata domestik', 'wisata internasional'],
    type: 'website' as const,
    url: '/'
  },
  
  about: {
    title: 'Tentang Kami - Mahabbatussholihin Tour & Travel',
    description: 'Kenali lebih dekat Mahabbatussholihin Tour & Travel, agen perjalanan terpercaya dengan pengalaman lebih dari 10 tahun dalam memberikan layanan wisata terbaik.',
    keywords: ['tentang kami', 'profil perusahaan', 'sejarah', 'visi misi', 'travel agent', 'tour operator'],
    type: 'website' as const,
    url: '/about'
  },

  services: {
    title: 'Layanan Kami - Paket Wisata & Travel Terlengkap',
    description: 'Temukan berbagai paket wisata domestik, internasional, dan layanan umroh dengan fasilitas terbaik. Konsultasi gratis dengan tim ahli kami.',
    keywords: ['layanan travel', 'paket wisata', 'tour domestik', 'tour internasional', 'paket umroh', 'travel services'],
    type: 'website' as const,
    url: '/services'
  },

  gallery: {
    title: 'Galeri Foto - Dokumentasi Perjalanan Wisata',
    description: 'Lihat dokumentasi foto-foto perjalanan wisata dari berbagai destinasi menarik yang telah kami layani. Inspirasi untuk perjalanan Anda selanjutnya.',
    keywords: ['galeri foto', 'dokumentasi wisata', 'foto perjalanan', 'destinasi wisata', 'travel photography'],
    type: 'website' as const,
    url: '/gallery'
  },

  blog: {
    title: 'Blog Travel - Tips & Panduan Wisata Terlengkap',
    description: 'Baca artikel, tips, dan panduan wisata terlengkap dari para ahli travel. Informasi destinasi, budaya, kuliner, dan pengalaman perjalanan.',
    keywords: ['blog travel', 'tips wisata', 'panduan perjalanan', 'destinasi wisata', 'travel tips', 'travel guide'],
    type: 'website' as const,
    url: '/blog'
  },

  contact: {
    title: 'Hubungi Kami - Konsultasi & Pemesanan Travel',
    description: 'Hubungi tim profesional Mahabbatussholihin Tour & Travel untuk konsultasi gratis dan pemesanan paket wisata. Siap melayani 24/7.',
    keywords: ['hubungi kami', 'kontak', 'konsultasi travel', 'pemesanan tour', 'customer service'],
    type: 'website' as const,
    url: '/contact'
  }
};

// Generate FAQ structured data for common travel questions
export const travelFAQs = [
  {
    question: 'Apa saja layanan yang disediakan Mahabbatussholihin Tour & Travel?',
    answer: 'Kami menyediakan layanan lengkap meliputi paket wisata domestik, wisata internasional, paket umroh, reservasi hotel, tiket pesawat, dan konsultasi perjalanan.'
  },
  {
    question: 'Bagaimana cara memesan paket wisata?',
    answer: 'Anda dapat memesan melalui website kami, menghubungi customer service di WhatsApp, atau datang langsung ke kantor kami. Tim kami siap membantu 24/7.'
  },
  {
    question: 'Apakah ada garansi untuk paket wisata yang dipesan?',
    answer: 'Ya, semua paket wisata kami dilengkapi dengan garansi kepuasan dan asuransi perjalanan untuk memastikan kenyamanan dan keamanan Anda.'
  },
  {
    question: 'Berapa lama proses pemesanan paket wisata?',
    answer: 'Proses pemesanan biasanya memakan waktu 1-3 hari kerja tergantung destinasi dan ketersediaan. Untuk paket umroh, proses bisa memakan waktu lebih lama.'
  },
  {
    question: 'Apakah bisa melakukan pembayaran secara cicilan?',
    answer: 'Ya, kami menyediakan fasilitas pembayaran cicilan untuk paket wisata tertentu. Hubungi customer service kami untuk informasi lebih detail.'
  },
  {
    question: 'Apa yang harus dipersiapkan sebelum perjalanan?',
    answer: 'Tim kami akan memberikan panduan lengkap termasuk dokumen yang diperlukan, tips packing, informasi cuaca, dan persiapan lainnya sesuai destinasi.'
  }
];

// Generate breadcrumb items for different pages
export function generateBreadcrumbs(pathname: string): Array<{name: string, url: string}> {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{name: 'Beranda', url: '/'}];
  
  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    
    // Map paths to readable names
    const pathNames: Record<string, string> = {
      'about': 'Tentang Kami',
      'services': 'Layanan',
      'gallery': 'Galeri',
      'blog': 'Blog',
      'contact': 'Hubungi Kami'
    };
    
    const name = pathNames[path] || path.charAt(0).toUpperCase() + path.slice(1);
    breadcrumbs.push({name, url: currentPath});
  });
  
  return breadcrumbs;
}

// Schema.org markup for local business
export function generateLocalBusinessSchema(businessInfo: BusinessSEO = defaultBusinessSEO) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://travel.mahabbatussholihin.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${baseUrl}#localbusiness`,
    name: businessInfo.businessName,
    description: businessInfo.description,
    url: baseUrl,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address?.street,
      addressLocality: businessInfo.address?.city,
      addressRegion: businessInfo.address?.region,
      postalCode: businessInfo.address?.postalCode,
      addressCountry: businessInfo.address?.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2088,
      longitude: 106.8456
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:00'
    },
    sameAs: Object.values(businessInfo.socialProfiles || {}).filter(Boolean),
    priceRange: 'Rp 1.000.000 - Rp 50.000.000',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150'
    }
  };
}