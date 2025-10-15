'use client'

import { useEffect } from 'react'
import ErrorLayout from '@/components/ErrorLayout'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <ErrorLayout
          errorCode={500}
        >
          {/* Additional error details for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left max-w-2xl mx-auto">
              <h3 className="text-sm font-semibold text-red-800 mb-2">Development Error Details:</h3>
              <pre className="text-xs text-red-700 overflow-auto">
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
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
          
          {/* Retry Button */}
          <div className="mt-6">
            <button
              onClick={reset}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Coba Lagi
            </button>
          </div>
        </ErrorLayout>
      </body>
    </html>
  )
}