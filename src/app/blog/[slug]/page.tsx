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

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Generate static params for published posts
export async function generateStaticParams() {
  try {
    const posts = await blogService.getAllPosts('id', 1, 50)
    return posts.posts.map((post) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

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
      title: `${title} - Blog MHS Tour`,
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
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(600).url()}
          alt={value.alt || 'Blog image'}
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
          placeholder={value.asset?.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={value.asset?.metadata?.lqip}
        />
        {value.caption && (
          <p className="text-sm text-gray-600 text-center mt-2">{value.caption}</p>
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
        className="text-primary hover:text-primary-dark underline"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-gray-900 mb-3 mt-5">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary bg-gray-50 p-4 my-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mhstour.com'

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
                className="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Blog
              </Link>
            </div>
          </div>

          {/* Article Header */}
          <AnimatedSection className="bg-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category: string) => (
                      <Link
                        key={category}
                        href={`/blog?category=${category}`}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-200"
                      >
                        {blogUtils.getCategoryDisplayName(category)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{publishedDate}</span>
                </div>
                
                {readingTime > 0 && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{readingTime} menit baca</span>
                  </div>
                )}
              </div>

              {/* Social Sharing */}
              <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
                <div className="flex items-center">
                  <Share2 className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-600 font-medium">Bagikan artikel ini:</span>
                </div>
                <SocialSharing
                  url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug.current}`}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Featured Image */}
          {post.featuredImage && (
            <AnimatedSection className="mb-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={post.content}
                components={portableTextComponents}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <Tag className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="font-semibold text-gray-900">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <AnimatedSection className="bg-gray-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Artikel Terkait
                  </h2>
                  <p className="text-gray-600">
                    Artikel lain yang mungkin menarik untuk Anda
                  </p>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                <div className="text-center mt-12">
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
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