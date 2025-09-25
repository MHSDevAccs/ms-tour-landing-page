import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mhstour.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/studio/',
        '/api/',
        '/_next/',
        '/admin/',
        '/.well-known/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}