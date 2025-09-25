'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationData {
  current: number
  total: number
  hasNext: boolean
  hasPrev: boolean
  totalCount?: number
}

interface BlogPaginationProps {
  pagination: PaginationData
  baseUrl?: string
  currentParams?: Record<string, string | undefined>
  showPageNumbers?: boolean
  maxPageNumbers?: number
  className?: string
}

export default function BlogPagination({
  pagination,
  baseUrl = '/blog',
  currentParams = {},
  showPageNumbers = true,
  maxPageNumbers = 5,
  className = ''
}: BlogPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { current, total, hasNext, hasPrev } = pagination

  // Build URL with parameters
  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    
    // Add current search parameters
    searchParams.forEach((value, key) => {
      if (key !== 'page') {
        params.set(key, value)
      }
    })
    
    // Add current params from props
    Object.entries(currentParams).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value)
      }
    })
    
    // Add page parameter
    if (page > 1) {
      params.set('page', page.toString())
    }
    
    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const halfMax = Math.floor(maxPageNumbers / 2)
    
    if (total <= maxPageNumbers) {
      // Show all pages if total is less than max
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // Calculate start and end
      let start = Math.max(1, current - halfMax)
      let end = Math.min(total, current + halfMax)
      
      // Adjust if we're near the beginning or end
      if (current <= halfMax) {
        end = maxPageNumbers
      } else if (current > total - halfMax) {
        start = total - maxPageNumbers + 1
      }
      
      // Add first page if not included
      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('...')
        }
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add last page if not included
      if (end < total) {
        if (end < total - 1) {
          pages.push('...')
        }
        pages.push(total)
      }
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  if (total <= 1) return null

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Button */}
      {hasPrev ? (
        <Link
          href={buildUrl(current - 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-primary transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </Link>
      ) : (
        <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </div>
      )}

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="hidden sm:flex space-x-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              )
            }

            const pageNum = page as number
            const isCurrentPage = pageNum === current

            return isCurrentPage ? (
              <div
                key={pageNum}
                className="flex items-center px-3 py-2 text-sm font-bold text-white bg-primary border border-primary rounded-md"
              >
                {pageNum}
              </div>
            ) : (
              <Link
                key={pageNum}
                href={buildUrl(pageNum)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-primary hover:border-primary transition-all duration-200"
              >
                {pageNum}
              </Link>
            )
          })}
        </div>
      )}

      {/* Page Info (Mobile) */}
      <div className="sm:hidden flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
        {current} / {total}
      </div>

      {/* Next Button */}
      {hasNext ? (
        <Link
          href={buildUrl(current + 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-primary transition-colors duration-200"
        >
          <span className="hidden sm:inline">Selanjutnya</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      ) : (
        <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
          <span className="hidden sm:inline">Selanjutnya</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      )}
    </div>
  )
}

// Additional pagination info component
export function PaginationInfo({ 
  pagination, 
  itemName = 'item',
  className = '' 
}: { 
  pagination: PaginationData
  itemName?: string
  className?: string 
}) {
  const { current, total, totalCount } = pagination
  
  if (!totalCount) return null
  
  const itemsPerPage = Math.ceil(totalCount / total)
  const startItem = (current - 1) * itemsPerPage + 1
  const endItem = Math.min(current * itemsPerPage, totalCount)
  
  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      Menampilkan {startItem}-{endItem} dari {totalCount} {itemName}
    </div>
  )
}