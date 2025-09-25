import { MetadataRoute } from 'next'
import { blogService } from '@/lib/blogService'
import { galleryService } from '@/lib/galleryService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mhstour.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  let blogPages: any[] = []
  let galleryPages: any[] = []

  try {
    // Get all blog posts
    const blogData = await blogService.getAllPosts('id', 1, 100)
    blogPages = blogData.posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: post.isFeatured ? 0.9 : 0.7,
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  try {
    // Get all galleries
    const galleries = await galleryService.getAllGalleries()
    galleryPages = galleries.map((gallery) => ({
      url: `${baseUrl}/gallery/${gallery.slug.current}`,
      lastModified: new Date(gallery._updatedAt || gallery._createdAt),
      changeFrequency: 'monthly' as const,
      priority: gallery.isFeatured ? 0.8 : 0.6,
    }))
  } catch (error) {
    console.error('Error fetching galleries for sitemap:', error)
  }

  return [...staticPages, ...blogPages, ...galleryPages]
}