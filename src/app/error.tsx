'use client'

import { useEffect } from 'react'
import ErrorLayout from '@/components/ErrorLayout'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error)
  }, [error])

  // Determine error type based on error message or properties
  const getErrorCode = (): 404 | 500 | 403 | 'general' => {
    if (error.message.includes('404') || error.message.includes('not found')) {
      return 404
    }
    if (error.message.includes('403') || error.message.includes('forbidden')) {
      return 403
    }
    if (error.message.includes('500') || error.message.includes('internal server')) {
      return 500
    }
    return 'general'
  }

  return (
    <ErrorLayout
      errorCode={getErrorCode()}
    >
      {/* Additional error details for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left max-w-2xl mx-auto">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">Development Error Details:</h3>
          <pre className="text-xs text-yellow-700 overflow-auto">
            {error.message}
            {error.stack && (
              <>
                <br />
                <br />
                Stack trace:
                <br />
                {error.stack}
              </>
            )}
          </pre>
          {error.digest && (
            <p className="text-xs text-yellow-600 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      )}
      
      {/* Retry Button */}
      <div className="mt-6">
        <button
          onClick={reset}
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
        >
          Coba Lagi
        </button>
      </div>
    </ErrorLayout>
  )
}