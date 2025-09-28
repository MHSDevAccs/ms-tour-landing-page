import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "../layouts/MainLayout";



const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda",
    template: "%s | Mahabbatussholihin Tour & Travel"
  },
  description: "Jelajahi dunia bersama Mahabbatussholihin Tour & Travel - Mitra terpercaya untuk pengalaman perjalanan yang tak terlupakan. Paket wisata domestik, internasional, dan umroh terbaik dengan pelayanan profesional.",
  keywords: [
    "tour", "travel", "vacation", "holiday", "tourism", "Indonesia", 
    "travel agency", "tour packages", "paket wisata", "wisata domestik", 
    "wisata internasional", "umroh", "agen travel", "liburan", "destinasi wisata",
    "travel agent", "tour operator", "paket tour", "wisata religi", "mahabbatussholihin"
  ],
  authors: [{ name: "Mahabbatussholihin Tour & Travel" }],
  creator: "Mahabbatussholihin Tour & Travel",
  publisher: "Mahabbatussholihin Tour & Travel",
  category: "Travel & Tourism",
  classification: "Travel Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://travel.mahabbatussholihin.com'),
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/id',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda",
    description: "Jelajahi dunia bersama Mahabbatussholihin Tour & Travel - Mitra terpercaya untuk pengalaman perjalanan yang tak terlupakan. Paket wisata domestik, internasional, dan umroh terbaik.",
    url: 'https://travel.mahabbatussholihin.com',
    siteName: 'Mahabbatussholihin Tour & Travel',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mahabbatussholihin Tour & Travel - Agen Perjalanan Terpercaya',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 600,
        height: 600,
        alt: 'Mahabbatussholihin Tour & Travel Logo',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mhstour',
    creator: '@mhstour',
    title: "Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda",
    description: "Jelajahi dunia bersama Mahabbatussholihin Tour & Travel - Mitra terpercaya untuk pengalaman perjalanan yang tak terlupakan. Paket wisata domestik, internasional, dan umroh terbaik.",
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#39ace7',
      },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'theme-color': '#39ace7',
    'msapplication-TileColor': '#39ace7',
    'msapplication-TileImage': '/android-chrome-192x192.png',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'MHS Tour',
    'application-name': 'Mahabbatussholihin Tour',
    'msapplication-tooltip': 'Mahabbatussholihin Tour & Travel',
    'geo.region': 'ID',
    'geo.placename': 'Indonesia',
    'ICBM': '-6.2088, 106.8456',
    'revisit-after': '7 days',
    'distribution': 'Global',
    'rating': 'General',
    'content-language': 'id',
    'language': 'id',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'TravelAgency',
                  '@id': 'https://travel.mahabbatussholihin.com#organization',
                  name: 'Mahabbatussholihin Tour & Travel',
                  alternateName: ['MHS Tour', 'Mahabbatussholihin Travel'],
                  description: 'Agen perjalanan terpercaya yang menyediakan paket wisata domestik, internasional, dan layanan umroh dengan pengalaman lebih dari 10 tahun',
                  url: 'https://travel.mahabbatussholihin.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://travel.mahabbatussholihin.com/logo.png'
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+62-xxx-xxxx-xxxx',
                    contactType: 'Customer Service',
                    areaServed: 'ID',
                    availableLanguage: ['Indonesian', 'English']
                  },
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'ID',
                    addressLocality: 'Indonesia'
                  },
                  sameAs: [
                    'https://facebook.com/mhstour',
                    'https://instagram.com/mhstour',
                    'https://twitter.com/mhstour',
                    'https://youtube.com/mhstour'
                  ]
                },
                {
                  '@type': 'WebSite', 
                  '@id': 'https://travel.mahabbatussholihin.com#website',
                  url: 'https://travel.mahabbatussholihin.com',
                  name: 'Mahabbatussholihin Tour & Travel',
                  description: 'Situs resmi Mahabbatussholihin Tour & Travel - Partner terpercaya untuk perjalanan wisata dan umroh Anda',
                  publisher: {
                    '@id': 'https://travel.mahabbatussholihin.com#organization'
                  },
                  potentialAction: [
                    {
                      '@type': 'SearchAction',
                      target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://travel.mahabbatussholihin.com/blog?search={search_term_string}'
                      },
                      'query-input': 'required name=search_term_string'
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
