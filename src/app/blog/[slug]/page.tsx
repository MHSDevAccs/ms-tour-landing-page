import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { blogService, blogUtils } from '@/lib/blogService'
import { BlogPost } from '@/types/blog'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import BlogCard from '@/components/BlogCard'
import SocialSharing from '@/components/SocialSharing'
import ReadingProgress from '@/components/ReadingProgress'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { generateBlogPostJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { Calendar, User, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react'

// Enable static generation with revalidation
export const revalidate = 600 // Revalidate every 10 minutes for individual blog posts



// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const post = await blogService.getPostBySlug(params.slug)
    
    if (!post) {
      return {
        title: 'Artikel Tidak Ditemukan - Mahabbatussholihin Tour & Travel',
        description: 'Artikel yang Anda cari tidak ditemukan atau sudah tidak tersedia.',
      }
    }

    const title = post.seoTitle || post.title
    const description = post.seoDescription || post.excerpt || blogUtils.generateExcerpt(post.content)
    const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined

    return {
      description,
      keywords: post.tags?.join(', '),
      authors: [{ name: post.author }],
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author],
        tags: post.tags,
        images: imageUrl ? [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.alt || post.title,
        }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog - Mahabbatussholihin Tour & Travel',
      description: 'Blog tentang tips perjalanan dan destinasi wisata.',
    }
  }
}

// Portable Text components
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-6 sm:my-8">
        <Image
          src={urlFor(value).width(800).height(600).url()}
          alt={value.alt || 'Blog image'}
          width={800}
          height={600}
          className="rounded-lg shadow-lg w-full h-auto"
          placeholder={value.asset?.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={value.asset?.metadata?.lqip}
        />
        {value.caption && (
          <p className="text-xs sm:text-sm text-gray-600 text-center mt-2 px-2">{value.caption}</p>
        )}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary-dark underline break-words"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 mt-6 sm:mt-8 leading-tight">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-5 sm:mt-6 leading-tight">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 mt-4 sm:mt-5 leading-tight">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary bg-gray-50 p-3 sm:p-4 my-4 sm:my-6 italic text-gray-700 text-sm sm:text-base">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base pl-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base pl-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-2 sm:ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-2 sm:ml-4">{children}</li>,
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  try {
    // Fetch post and site settings concurrently
    const [post, siteSettings] = await Promise.all([
      blogService.getPostBySlug(params.slug),
      sanityFetch<any>({
        query: queries.getSiteSettings(),
        tags: ['siteSettings']
      }).catch(() => null)
    ])
    
    if (!post) {
      notFound()
    }

    // Get related posts
    const relatedPosts = await blogService.getRelatedPosts(
      post._id,
      post.categories || [],
      post.tags || [],
      'id',
      3
    )

    const readingTime = blogUtils.calculateReadingTime(post.content)
    const publishedDate = blogUtils.formatDate(post.publishedAt)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'

    // Generate structured data
    const jsonLd = generateBlogPostJsonLd(post, baseUrl)
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: `/blog/${post.slug.current}` }
    ], baseUrl)

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
        
        {/* Reading Progress */}
        <ReadingProgress />
        
        <article className="min-h-screen bg-white">
          {/* Back to Blog */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Kembali ke Blog</span>
              </Link>
            </div>
          </div>

          {/* Article Header */}
          <AnimatedSection className="bg-white py-8 sm:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">


              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-gray-600 mb-6 sm:mb-8">
                <div className="flex items-center text-sm sm:text-base">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center text-sm sm:text-base">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span>{publishedDate}</span>
                </div>
              </div>


            </div>
          </AnimatedSection>

          {/* Featured Image */}
          {post.featuredImage && (
            <AnimatedSection className="mb-8 sm:mb-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={urlFor(post.featuredImage).width(1200).height(675).url()}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                    placeholder={post.featuredImage.asset?.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={post.featuredImage.asset?.metadata?.lqip}
                  />
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Article Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
            <div className="prose prose-sm sm:prose-lg max-w-none">
              <PortableText
                value={post.content}
                components={portableTextComponents}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center px-2.5 sm:px-3 py-1 text-xs sm:text-sm bg-accent text-primary-dark rounded-full hover:bg-primary-light transition-colors duration-200 font-medium"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Social Sharing */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <div className="flex items-center justify-center sm:justify-start">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600 flex-shrink-0" />
                  <span className="text-gray-600 font-medium text-sm sm:text-base">Bagikan artikel ini:</span>
                </div>
                <div className="flex justify-center sm:justify-end">
                  <SocialSharing
                    url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug.current}`}
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <AnimatedSection className="bg-gray-50 py-12 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Artikel Terkait
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Artikel lain yang mungkin menarik untuk Anda
                  </p>
                </div>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <StaggerItem key={relatedPost._id}>
                      <BlogCard
                        post={relatedPost}
                        variant="default"
                        showExcerpt={true}
                        showAuthor={true}
                        showDate={true}
                        showReadingTime={true}
                        theme={siteSettings?.theme}
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <div className="text-center mt-8 sm:mt-12">
                  <Link
                    href="/blog"
                    className="inline-block border-2 border-primary text-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    Lihat Semua Artikel
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          )}
        </article>
      </PageTransition>
    )

  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}