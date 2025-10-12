import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogService } from '@/lib/blogService'
import { BlogPost } from '@/types/blog'
import BlogCard from '@/components/BlogCard'
import BlogPagination from '@/components/BlogPagination'
import BlogSearch from '@/components/BlogSearch'

import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { generateBlogListJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { Suspense } from 'react'
import { Calendar } from 'lucide-react'

// Enable static generation with revalidation
export const revalidate = 300 // Revalidate every 5 minutes for fresh blog content

// Simple metadata for now
export const metadata: Metadata = {
  title: 'Blog - Mahabbatussholihin Tour & Travel',
  description: 'Temukan tips perjalanan, destinasi wisata, dan panduan lengkap untuk petualangan Anda bersama Mahabbatussholihin Tour & Travel.',
  keywords: [
    'blog travel', 'tips perjalanan', 'destinasi wisata', 'panduan travel',
    'artikel wisata', 'pengalaman travel', 'informasi destinasi', 'review tempat wisata'
  ],
  openGraph: {
    title: 'Blog - Mahabbatussholihin Tour & Travel',
    description: 'Temukan tips perjalanan, destinasi wisata, dan panduan lengkap untuk petualangan Anda bersama Mahabbatussholihin Tour & Travel.',
    url: 'https://travel.mahabbatussholihin.com/blog',
    siteName: 'Mahabbatussholihin Tour & Travel',
    locale: 'id_ID',
    type: 'website',
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { tag?: string; search?: string; page?: string }
}) {
  const { tag, search, page = '1' } = searchParams
  const currentPage = parseInt(page) || 1

  try {
    // Fetch blog data
    let blogDataResult
    let featuredPosts: BlogPost[] = []

    if (search) {
      const posts = await blogService.searchPosts(search, 'id', 12)
      blogDataResult = {
        posts,
        pagination: {
          current: 1,
          total: 1,
          hasNext: false,
          hasPrev: false,
          totalCount: posts.length
        }
      }
    } else if (tag) {
      blogDataResult = await blogService.getPostsByTag(tag, 'id', currentPage)
    } else {
      blogDataResult = await blogService.getAllPosts('id', currentPage)
      featuredPosts = await blogService.getFeaturedPosts('id', 3)
    }

    // Use hardcoded values for page titles and subtitles
    let pageTitle = 'Blog'
    let pageSubtitle = 'Temukan tips perjalanan, destinasi wisata, dan inspirasi untuk petualangan Anda'

    if (search) {
      pageTitle = `Hasil Pencarian: "${search}"`
      pageSubtitle = `Ditemukan ${blogDataResult.posts.length} artikel untuk pencarian Anda`
    } else if (tag) {
      pageTitle = `Tag: ${tag}`
      pageSubtitle = `Artikel dengan tag "${tag}"`
    }

    // Generate structured data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'
    const jsonLd = generateBlogListJsonLd(blogDataResult.posts, baseUrl)
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: 'Beranda', url: '/' },
      { name: 'Blog', url: '/blog' }
    ], baseUrl)

    if (!blogDataResult.posts || blogDataResult.posts.length === 0) {
      return (
        <PageTransition>
          <div className="min-h-screen bg-gray-50">
            {/* Blog Header */}
            <div className="bg-primary text-white py-16">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                <h1 className="text-4xl font-bold mb-4">
                  {pageTitle}
                </h1>
                <p className="text-xl text-white">
                  {pageSubtitle}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-black mb-4">
                    Tidak Ada Artikel
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {search 
                      ? `Tidak ditemukan artikel dengan kata kunci "${search}"`
                      : 'Belum ada artikel yang dipublikasikan.'
                    }
                  </p>
                  {(search ||  tag) && (
                    <Link
                      href="/blog"
                      className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </PageTransition>
      )
    }

    return (
      <PageTransition>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        
        <div className="min-h-screen bg-gray-50">
          {/* Blog Header - HARDCODED */}
          <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
              <h1 className="text-4xl font-bold mb-4 text-white">
                {pageTitle}
              </h1>
              <p className="text-xl text-white">
                {pageSubtitle}
              </p>
            </div>
          </section>

          {/* Search Section */}
          <div className="bg-white border-b border-gray-200 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center max-w-2xl mx-auto">
                <Suspense fallback={<div className="w-full h-12 bg-gray-200 rounded-md animate-pulse" />}>
                  <BlogSearch
                    initialValue={search}
                    placeholder="Cari artikel..."
                    className="w-full"
                  />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                </div>
              </div>
            </section>
          )}

          {/* Blog Posts Grid */}
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Results Info */}
              <div className="flex items-center justify-between mb-8">
                
                {(tag || search) && (
                  <Link
                    href="/blog"
                    className="text-primary hover:text-primary-dark transition-colors duration-200 text-sm font-medium"
                  >
                    Kembali ke semua artikel
                  </Link>
                )}
              </div>

              {/* Blog Grid */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogDataResult.posts.map((post) => (
                  <StaggerItem key={post._id}>
                    <BlogCard
                      post={post}
                      variant="default"
                      showExcerpt={true}
                      showAuthor={true}
                      showDate={true}
                      showReadingTime={true}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Pagination */}
              {blogDataResult.pagination && blogDataResult.pagination.total > 1 && (
                <BlogPagination
                  pagination={blogDataResult.pagination}
                  baseUrl="/blog"
                  currentParams={{ tag, search }}
                  previousText="Sebelumnya"
                  nextText="Selanjutnya"
                />
              )}
            </div>
          </div>

          {/* CTA */}
          <section className="bg-white py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedSection direction="scale" delay={0.1}>
                <div className="text-center bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-black mb-4">
                    Butuh Bantuan Merencanakan Perjalanan?
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Tim ahli kami siap membantu mewujudkan rencana perjalanan Anda. Dapatkan konsultasi personal dan rekomendasi destinasi yang sesuai dengan preferensi dan budget Anda.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Konsultasi Gratis
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </div>
      </PageTransition>
    )

  } catch (error) {
    console.error('Error loading blog page:', error)
    notFound()
  }
}