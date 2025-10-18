'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  name?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error caught by ${this.props.name || 'ErrorBoundary'}:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 border border-red-300 rounded bg-red-50">
          <h3 className="text-red-800 font-semibold mb-2">
            Error in {this.props.name || 'component'}
          </h3>
          <p className="text-red-600 text-sm">
            {this.state.error?.message || 'An error occurred'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary