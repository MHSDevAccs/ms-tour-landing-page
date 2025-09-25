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
import { Search, Filter, Calendar, User, Tag } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Generate metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string; search?: string; page?: string }
}): Promise<Metadata> {
  const { category, tag, search, page } = searchParams
  
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    let title = siteSettings?.blogContent?.pageTitle || 'Blog - Mahabbatussholihin Tour & Travel'
    let description = siteSettings?.blogContent?.pageDescription || 'Temukan tips perjalanan, destinasi wisata, dan panduan lengkap untuk petualangan Anda bersama Mahabbatussholihin Tour & Travel.'

    if (category) {
      title = `${category} - ${siteSettings?.blogContent?.categoryTitleSuffix || 'Blog MHS Tour'}`
      description = siteSettings?.blogContent?.categoryDescription?.replace('{category}', category) || `Artikel dan tips tentang ${category} dari Mahabbatussholihin Tour & Travel.`
    } else if (tag) {
      title = `${tag} - ${siteSettings?.blogContent?.tagTitleSuffix || 'Blog MHS Tour'}`
      description = siteSettings?.blogContent?.tagDescription?.replace('{tag}', tag) || `Artikel dengan tag ${tag} dari Mahabbatussholihin Tour & Travel.`
    } else if (search) {
      title = `${siteSettings?.blogContent?.searchTitlePrefix || 'Pencarian'}: ${search} - ${siteSettings?.blogContent?.searchTitleSuffix || 'Blog MHS Tour'}`
      description = siteSettings?.blogContent?.searchDescription?.replace('{search}', search) || `Hasil pencarian untuk "${search}" di blog Mahabbatussholihin Tour & Travel.`
    } else if (page && parseInt(page) > 1) {
      title = `${siteSettings?.blogContent?.pageTitle || 'Blog'} - ${siteSettings?.blogContent?.pageNumberPrefix || 'Halaman'} ${page} - ${siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel'}`
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      },
      twitter: {
        title,
        description,
      },
    }
  } catch (error) {
    let title = 'Blog - Mahabbatussholihin Tour & Travel'
    let description = 'Temukan tips perjalanan, destinasi wisata, dan panduan lengkap untuk petualangan Anda bersama Mahabbatussholihin Tour & Travel.'

    if (category) {
      title = `${category} - Blog MHS Tour`
      description = `Artikel dan tips tentang ${category} dari Mahabbatussholihin Tour & Travel.`
    } else if (tag) {
      title = `${tag} - Blog MHS Tour`
      description = `Artikel dengan tag ${tag} dari Mahabbatussholihin Tour & Travel.`
    } else if (search) {
      title = `Pencarian: ${search} - Blog MHS Tour`
      description = `Hasil pencarian untuk "${search}" di blog Mahabbatussholihin Tour & Travel.`
    } else if (page && parseInt(page) > 1) {
      title = `Blog - Halaman ${page} - Mahabbatussholihin Tour & Travel`
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      },
      twitter: {
        title,
        description,
      },
    }
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string; search?: string; page?: string }
}) {
  const { category, tag, search, page = '1' } = searchParams
  const currentPage = parseInt(page) || 1

  try {
    // Fetch site settings and blog data concurrently
    const [siteSettings, blogDataResult, categories, featuredPostsResult] = await Promise.all([
      sanityFetch<any>({
        query: queries.getSiteSettings(),
        tags: ['siteSettings']
      }).catch(() => null),
      (async () => {
        if (search) {
          const posts = await blogService.searchPosts(search, 'id', 12)
          return {
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
          return await blogService.getPostsByCategory(category, 'id', currentPage)
        } else if (tag) {
          return await blogService.getPostsByTag(tag, 'id', currentPage)
        } else {
          return await blogService.getAllPosts('id', currentPage)
        }
      })(),
      blogService.getCategories('id'),
      category || tag || search ? Promise.resolve([]) : blogService.getFeaturedPosts('id', 3)
    ])

    const blogData = blogDataResult
    const featuredPosts = featuredPostsResult

    // Set dynamic page titles and subtitles
    let pageTitle = siteSettings?.blogContent?.pageTitle || 'Blog'
    let pageSubtitle = siteSettings?.blogContent?.pageSubtitle || 'Temukan tips perjalanan, destinasi wisata, dan inspirasi untuk petualangan Anda'

    if (search) {
      pageTitle = siteSettings?.blogContent?.searchResultTitle?.replace('{search}', search) || `Hasil Pencarian: "${search}"`
      pageSubtitle = siteSettings?.blogContent?.searchResultSubtitle?.replace('{count}', blogData.posts.length.toString()) || `Ditemukan ${blogData.posts.length} artikel untuk pencarian Anda`
    } else if (category) {
      const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
      pageTitle = siteSettings?.blogContent?.categoryPageTitle?.replace('{category}', categoryName) || `Kategori: ${categoryName}`
      pageSubtitle = siteSettings?.blogContent?.categoryPageSubtitle?.replace('{category}', categoryName.toLowerCase()) || `Artikel dan tips seputar ${categoryName.toLowerCase()}`
    } else if (tag) {
      pageTitle = siteSettings?.blogContent?.tagPageTitle?.replace('{tag}', tag) || `Tag: ${tag}`
      pageSubtitle = siteSettings?.blogContent?.tagPageSubtitle?.replace('{tag}', tag) || `Artikel dengan tag "${tag}"`
    }

    // Generate structured data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mhstour.com'
    const jsonLd = generateBlogListJsonLd(blogData.posts, baseUrl)
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' }
    ], baseUrl)

    if (!blogData.posts || blogData.posts.length === 0) {
      return (
        <PageTransition>
          <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {siteSettings?.blogContent?.emptyStateTitle || 'Tidak Ada Artikel'}
                </h1>
                <p className="text-gray-600 mb-8">
                  {search 
                    ? siteSettings?.blogContent?.emptySearchMessage?.replace('{search}', search) || `Tidak ditemukan artikel dengan kata kunci "${search}"`
                    : siteSettings?.blogContent?.emptyStateMessage || 'Belum ada artikel yang dipublikasikan.'
                  }
                </p>
                {(search || category || tag) && (
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
                  >
                    {siteSettings?.blogContent?.viewAllArticlesButton || 'Lihat Semua Artikel'}
                  </Link>
                )}
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
          {/* Blog Header */}
          <AnimatedSection className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {pageTitle}
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                  {pageSubtitle}
                </p>
                
                {/* Search and Filters */}
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
          </AnimatedSection>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <AnimatedSection className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {siteSettings?.blogContent?.featuredPostsTitle || 'Artikel Unggulan'}
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
                        theme={siteSettings?.theme}
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedSection>
          )}

          {/* Blog Posts Grid */}
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Results Info */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>
                    {blogData.pagination?.totalCount ? 
                      siteSettings?.blogContent?.showingResultsText?.replace('{showing}', blogData.posts.length.toString()).replace('{total}', blogData.pagination.totalCount.toString()) || `Menampilkan ${blogData.posts.length} dari ${blogData.pagination.totalCount} artikel` :
                      siteSettings?.blogContent?.articlesCountText?.replace('{count}', blogData.posts.length.toString()) || `${blogData.posts.length} artikel`
                    }
                  </span>
                </div>
                
                {(category || tag || search) && (
                  <Link
                    href="/blog"
                    className="text-primary hover:text-primary-dark transition-colors duration-200 text-sm font-medium"
                  >
                    {siteSettings?.blogContent?.backToAllArticlesText || '← Kembali ke semua artikel'}
                  </Link>
                )}
              </div>

              {/* Blog Grid */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogData.posts.map((post) => (
                  <StaggerItem key={post._id}>
                    <BlogCard
                      post={post}
                      variant="default"
                      showExcerpt={true}
                      showAuthor={true}
                      showDate={true}
                      showCategories={true}
                      showReadingTime={true}
                      theme={siteSettings?.theme}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Pagination */}
              {blogData.pagination && blogData.pagination.total > 1 && (
                <BlogPagination
                  pagination={blogData.pagination}
                  baseUrl="/blog"
                  currentParams={{ category, tag, search }}
                />
              )}
            </div>
          </div>

          {/* Newsletter CTA */}
          <AnimatedSection className="bg-primary py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {siteSettings?.blogContent?.newsletterTitle || 'Dapatkan Tips Perjalanan Terbaru'}
              </h2>
              <p className="text-primary-lighter mb-8 text-lg">
                {siteSettings?.blogContent?.newsletterDescription || 'Bergabunglah dengan newsletter kami dan dapatkan artikel terbaru, tips perjalanan, dan penawaran eksklusif.'}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-all duration-300"
              >
                {siteSettings?.blogContent?.newsletterButtonText || 'Berlangganan Newsletter'}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </PageTransition>
    )

  } catch (error) {
    console.error('Error loading blog page:', error)
    notFound()
  }
}