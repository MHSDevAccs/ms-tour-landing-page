import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogService } from '@/lib/blogService'
import { BlogPost } from '@/types/blog'
import BlogCard from '@/components/BlogCard'
import BlogPagination from '@/components/BlogPagination'
import BlogSearch from '@/components/BlogSearch'
import BlogCategoryFilter from '@/components/BlogCategoryFilter'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { generateBlogListJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { Suspense } from 'react'
import { Calendar } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

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
  searchParams: { category?: string; tag?: string; search?: string; page?: string }
}) {
  const { category, tag, search, page = '1' } = searchParams
  const currentPage = parseInt(page) || 1

  try {
    // Fetch site settings for CMS content
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    }).catch(() => null)

    // Fetch blog data
    let blogDataResult
    let categories: string[] = []
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
    } else if (category) {
      blogDataResult = await blogService.getPostsByCategory(category, 'id', currentPage)
    } else if (tag) {
      blogDataResult = await blogService.getPostsByTag(tag, 'id', currentPage)
    } else {
      blogDataResult = await blogService.getAllPosts('id', currentPage)
      featuredPosts = await blogService.getFeaturedPosts('id', 3)
    }

    categories = await blogService.getCategories('id')

    // Use CMS content for page titles and subtitles with fallbacks
    let pageTitle = siteSettings?.blogContent?.pageTitle || 'Blog'
    let pageSubtitle = siteSettings?.blogContent?.pageSubtitle || 'Temukan tips perjalanan, destinasi wisata, dan inspirasi untuk petualangan Anda'

    if (search) {
      pageTitle = siteSettings?.blogContent?.searchResultTitle?.replace('{search}', search) || `Hasil Pencarian: "${search}"`
      pageSubtitle = siteSettings?.blogContent?.searchResultSubtitle?.replace('{count}', blogDataResult.posts.length.toString()) || `Ditemukan ${blogDataResult.posts.length} artikel untuk pencarian Anda`
    } else if (category) {
      const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
      pageTitle = siteSettings?.blogContent?.categoryPageTitle?.replace('{category}', categoryName) || `Kategori: ${categoryName}`
      pageSubtitle = siteSettings?.blogContent?.categoryPageSubtitle?.replace('{category}', categoryName.toLowerCase()) || `Artikel dan tips seputar ${categoryName.toLowerCase()}`
    } else if (tag) {
      pageTitle = siteSettings?.blogContent?.tagPageTitle?.replace('{tag}', tag) || `Tag: ${tag}`
      pageSubtitle = siteSettings?.blogContent?.tagPageSubtitle?.replace('{tag}', tag) || `Artikel dengan tag "${tag}"`
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
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-4">
                  {pageTitle}
                </h1>
                <p className="text-xl text-primary-lighter">
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
                  {(search || category || tag) && (
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <h1 className="text-4xl font-bold mb-4 text-white">
                {pageTitle}
              </h1>
              <p className="text-xl text-white/90">
                {pageSubtitle}
              </p>
            </div>
          </section>

          {/* Search and Filters Section */}
          <div className="bg-white border-b border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />}>
                  <BlogSearch
                    initialValue={search}
                    placeholder="Cari artikel..."
                    className="flex-1"
                  />
                </Suspense>
                
                <Suspense fallback={<div className="w-48 h-10 bg-gray-200 rounded-md animate-pulse" />}>
                  <BlogCategoryFilter
                    categories={categories}
                    selectedCategory={category}
                    className="w-full sm:w-auto"
                  />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-black">
                    Artikel Unggulan
                  </h2>
                </div>
                
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredPosts.map((post) => (
                    <StaggerItem key={post._id}>
                      <BlogCard
                        post={post}
                        variant="featured"
                        showExcerpt={true}
                        showAuthor={true}
                        showDate={true}
                        showReadingTime={true}
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>
          )}

          {/* Blog Posts Grid */}
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Results Info */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>
                    {blogDataResult.pagination?.totalCount ? 
                      `Menampilkan ${blogDataResult.posts.length} dari ${blogDataResult.pagination.totalCount} artikel` :
                      `${blogDataResult.posts.length} artikel`
                    }
                  </span>
                </div>
                
                {(category || tag || search) && (
                  <Link
                    href="/blog"
                    className="text-primary hover:text-primary-dark transition-colors duration-200 text-sm font-medium"
                  >
                    ← Kembali ke semua artikel
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
                      showCategories={true}
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
                  currentParams={{ category, tag, search }}
                  previousText="Sebelumnya"
                  nextText="Selanjutnya"
                />
              )}
            </div>
          </div>

          {/* Newsletter CTA */}
          <section className="bg-primary py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Dapatkan Tips Perjalanan Terbaru
              </h2>
              <p className="text-primary-lighter mb-8 text-lg">
                Bergabunglah dengan newsletter kami dan dapatkan artikel terbaru, tips perjalanan, dan penawaran eksklusif.
              </p>
              <AnimatedSection>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-primary bg-white font-semibold rounded-lg"
                >
                  Info Lebih Lanjut
                </Link>
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