'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface BlogSearchProps {
  onSearch?: (query: string) => void
  placeholder?: string
  initialValue?: string
  className?: string
}

export default function BlogSearch({
  onSearch,
  placeholder = 'Cari artikel...',
  initialValue = '',
  className = ''
}: BlogSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (onSearch) {
      onSearch(query.trim())
    } else {
      // Default navigation behavior
      const params = new URLSearchParams(searchParams)
      
      if (query.trim()) {
        params.set('search', query.trim())
        params.delete('page') // Reset page when searching
        params.delete('category') // Clear category filter when searching
        params.delete('tag') // Clear tag filter when searching
      } else {
        params.delete('search')
      }
      
      const queryString = params.toString()
      const newUrl = queryString ? `/blog?${queryString}` : '/blog'
      
      router.push(newUrl)
    }
  }

  const handleClear = () => {
    setQuery('')
    
    if (onSearch) {
      onSearch('')
    } else {
      // Navigate to clear search
      const params = new URLSearchParams(searchParams)
      params.delete('search')
      
      const queryString = params.toString()
      const newUrl = queryString ? `/blog?${queryString}` : '/blog'
      
      router.push(newUrl)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false)
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className={`
        relative flex items-center transition-all duration-200
        ${isFocused 
          ? 'ring-2 ring-primary ring-opacity-50 shadow-lg' 
          : 'ring-1 ring-gray-300 shadow-sm hover:ring-gray-400'
        }
        bg-white rounded-lg overflow-hidden
      `}>
        {/* Search Icon */}
        <div className="flex items-center pl-4 pr-2">
          <Search className={`
            w-5 h-5 transition-colors duration-200
            ${isFocused ? 'text-primary' : 'text-gray-400'}
          `} />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 py-3 pr-4 text-gray-900 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
          autoComplete="off"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center w-8 h-8 mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Hapus pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className={`
            px-4 py-3 font-medium text-white transition-colors duration-200
            ${query.trim() 
              ? 'bg-primary hover:bg-primary-dark' 
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
          disabled={!query.trim()}
        >
          <span className="hidden sm:inline">Cari</span>
          <Search className="w-4 h-4 sm:hidden" />
        </button>
      </div>

      {/* Search Suggestions (if needed) */}
      {isFocused && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          <div className="p-4 text-sm text-gray-500 text-center">
            Tekan Enter untuk mencari "{query}"
          </div>
        </div>
      )}
    </form>
  )
}

// Quick search component for header/navbar
export function QuickSearch({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-3 py-2 text-gray-600 hover:text-primary transition-colors duration-200"
        >
          <Search className="w-5 h-5 mr-2" />
          <span className="hidden md:inline">Cari artikel...</span>
        </button>
      ) : (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black bg-opacity-50">
          <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl">
            <div className="p-4">
              <BlogSearch
                placeholder="Cari artikel, tips, destinasi..."
                onSearch={(query) => {
                  setIsOpen(false)
                  if (query) {
                    window.location.href = `/blog?search=${encodeURIComponent(query)}`
                  }
                }}
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}