'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Filter, X } from 'lucide-react'
import { blogUtils } from '@/lib/blogService'

interface BlogCategoryFilterProps {
  categories: string[]
  selectedCategory?: string
  onCategoryChange?: (category: string | null) => void
  className?: string
}

export default function BlogCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ''
}: BlogCategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const handleCategorySelect = (category: string | null) => {
    setIsOpen(false)
    
    if (onCategoryChange) {
      onCategoryChange(category)
    } else {
      // Default navigation behavior
      const params = new URLSearchParams(searchParams)
      
      if (category) {
        params.set('category', category)
        params.delete('page') // Reset page when filtering
        params.delete('search') // Clear search when filtering
      } else {
        params.delete('category')
      }
      
      const queryString = params.toString()
      const newUrl = queryString ? `/blog?${queryString}` : '/blog'
      
      router.push(newUrl)
    }
  }

  const selectedCategoryName = selectedCategory ? 
    blogUtils.getCategoryDisplayName(selectedCategory) : 
    'Semua Kategori'

  return (
    <div className={`relative ${className}`}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200
          ${selectedCategory ? 'border-primary text-primary' : 'text-gray-700'}
        `}
      >
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          <span className="truncate max-w-32">{selectedCategoryName}</span>
        </div>
        <ChevronDown className={`
          w-4 h-4 ml-2 transition-transform duration-200
          ${isOpen ? 'transform rotate-180' : ''}
        `} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 z-20 w-64 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-2">
              {/* All Categories Option */}
              <button
                onClick={() => handleCategorySelect(null)}
                className={`
                  w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200
                  ${!selectedCategory ? 'bg-primary text-white font-medium' : 'text-gray-700'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span>Semua Kategori</span>
                  {!selectedCategory && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </button>

              {/* Divider */}
              {categories.length > 0 && (
                <div className="border-t border-gray-100 my-2" />
              )}

              {/* Category Options */}
              {categories.map((category) => {
                const isSelected = category === selectedCategory
                const displayName = blogUtils.getCategoryDisplayName(category)
                
                return (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`
                      w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200
                      ${isSelected ? 'bg-primary text-white font-medium' : 'text-gray-700'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{displayName}</span>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Category pills component for horizontal layout
export function CategoryPills({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ''
}: BlogCategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategorySelect = (category: string | null) => {
    if (onCategoryChange) {
      onCategoryChange(category)
    } else {
      const params = new URLSearchParams(searchParams)
      
      if (category) {
        params.set('category', category)
        params.delete('page')
        params.delete('search')
      } else {
        params.delete('category')
      }
      
      const queryString = params.toString()
      const newUrl = queryString ? `/blog?${queryString}` : '/blog'
      
      router.push(newUrl)
    }
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* All Categories */}
      <button
        onClick={() => handleCategorySelect(null)}
        className={`
          px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
          ${!selectedCategory 
            ? 'bg-primary text-white shadow-md' 
            : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
          }
        `}
      >
        Semua
      </button>

      {/* Category Pills */}
      {categories.map((category) => {
        const isSelected = category === selectedCategory
        const displayName = blogUtils.getCategoryDisplayName(category)
        
        return (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`
              px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
              ${isSelected 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
              }
            `}
          >
            {displayName}
          </button>
        )
      })}
      
      {/* Clear Filter */}
      {selectedCategory && (
        <button
          onClick={() => handleCategorySelect(null)}
          className="flex items-center px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <X className="w-3 h-3 mr-1" />
          Hapus Filter
        </button>
      )}
    </div>
  )
}