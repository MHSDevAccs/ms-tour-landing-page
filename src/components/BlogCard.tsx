'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost, BlogCardProps } from '@/types/blog'
import { urlFor } from '@/sanity/lib/image'
import { blogUtils } from '@/lib/blogService'
import { Calendar, User, Clock, Tag, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface ThemeConfig {
  colors?: {
    primary?: string;
    primaryLight?: string;
    primaryDark?: string;
    secondary?: string;
    accent?: string;
    textPrimary?: string;
    textSecondary?: string;
    background?: string;
    backgroundAlt?: string;
  };
  buttons?: {
    primaryButton?: string;
    secondaryButton?: string;
    outlineButton?: string;
  };
  cards?: {
    defaultCard?: string;
    serviceCard?: string;
    blogCard?: string;
  };
}

interface ExtendedBlogCardProps extends BlogCardProps {
  theme?: ThemeConfig
}

export default function BlogCard({
  post,
  variant = 'default',
  showExcerpt = true,
  showAuthor = true,
  showDate = true,
  showCategories = false,
  showTags = false,
  showReadingTime = false,
  className = '',
  theme
}: ExtendedBlogCardProps) {
  const readingTime = showReadingTime && post.content ? 
    blogUtils.calculateReadingTime(post.content) : 0

  const cardVariants = {
    default: 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full',
    featured: 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 h-full border border-primary/10',
    compact: 'bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-row',
    horizontal: 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row'
  }

  const getImageSize = () => {
    switch (variant) {
      case 'compact':
        return { width: 120, height: 80 }
      case 'horizontal':
        return { width: 300, height: 200 }
      default:
        return { width: 400, height: 250 }
    }
  }

  const imageSize = getImageSize()

  return (
    <motion.article 
      className={`${cardVariants[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${post.slug.current}`} className="block h-full">
        <div className={`h-full ${variant === 'compact' || variant === 'horizontal' ? 'flex' : 'flex flex-col'}`}>
          {/* Featured Image */}
          {post.featuredImage && (
            <div className={`
              relative overflow-hidden
              ${variant === 'compact' ? 'w-30 flex-shrink-0' : 
                variant === 'horizontal' ? 'w-full sm:w-80 flex-shrink-0' : 
                'aspect-[16/10] w-full'}
            `}>
              <Image
                src={urlFor(post.featuredImage).width(imageSize.width).height(imageSize.height).url()}
                alt={post.featuredImage.alt || post.title}
                fill
                className={`object-cover transition-transform duration-300 hover:scale-105 ${
                  variant === 'featured' ? 'group-hover:scale-110' : ''
                }`}
                placeholder={post.featuredImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                blurDataURL={post.featuredImage.asset.metadata?.lqip}
              />
              
              {/* Featured Badge */}
              {variant === 'featured' && post.isFeatured && (
                <div className="absolute top-4 left-4">
                  <span className={`${theme?.colors?.primary || 'bg-primary'} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    Unggulan
                  </span>
                </div>
              )}
              
              {/* Categories Overlay */}
              {showCategories && post.categories.length > 0 && variant !== 'compact' && (
                <div className="absolute bottom-4 left-4">
                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {blogUtils.getCategoryDisplayName(category)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className={`
            flex-1 p-4 flex flex-col justify-between
            ${variant === 'compact' ? 'py-3' : 
              variant === 'horizontal' ? 'p-6' : 'p-6'}
          `}>
            <div className="flex-1">
              {/* Categories (for non-overlay display) */}
              {showCategories && post.categories.length > 0 && variant === 'compact' && (
                <div className="mb-2">
                  <span className={`${theme?.colors?.primary || 'text-primary'} text-xs font-semibold`}>
                    {blogUtils.getCategoryDisplayName(post.categories[0])}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3 className={`
                font-bold ${theme?.colors?.textPrimary || 'text-gray-900'} mb-2 line-clamp-2 hover:${theme?.colors?.primary || 'text-primary'} transition-colors duration-200
                ${variant === 'compact' ? 'text-sm' : 
                  variant === 'featured' ? 'text-xl' : 'text-lg'}
              `}>
                {post.title}
              </h3>

              {/* Excerpt */}
              {showExcerpt && post.excerpt && variant !== 'compact' && (
                <p className={`
                  ${theme?.colors?.textSecondary || 'text-gray-600'} mb-4 line-clamp-3
                  ${variant === 'featured' ? 'text-base' : 'text-sm'}
                `}>
                  {post.excerpt}
                </p>
              )}

              {/* Tags */}
              {showTags && post.tags.length > 0 && variant !== 'compact' && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
              <div className="flex items-center space-x-4">
                {/* Author */}
                {showAuthor && (
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                )}

                {/* Date */}
                {showDate && (
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{blogUtils.formatDate(post.publishedAt)}</span>
                  </div>
                )}

                {/* Reading Time */}
                {showReadingTime && readingTime > 0 && (
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{readingTime} min</span>
                  </div>
                )}
              </div>

              {/* Read More Arrow */}
              {variant !== 'compact' && (
                <div className={`flex items-center ${theme?.colors?.primary || 'text-primary'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                  <span className="text-xs font-medium mr-1">Baca</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}