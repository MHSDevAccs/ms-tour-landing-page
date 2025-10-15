import { notFound } from 'next/navigation'

// HTTP Error Codes and their meanings
export const HTTP_ERROR_CODES = {
  400: 'Bad Request',
  401: 'Unauthorized', 
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
} as const

export type ErrorCode = keyof typeof HTTP_ERROR_CODES

// Helper function to throw appropriate errors
export function throwHttpError(status: number, message?: string): never {
  if (status === 404) {
    notFound()
  }
  
  const errorMessage = message || HTTP_ERROR_CODES[status as ErrorCode] || 'Unknown Error'
  const error = new Error(errorMessage)
  ;(error as any).status = status
  throw error
}

// Helper function to get appropriate error type
export function getErrorType(errorCode: number | string): 404 | 500 | 403 | 'general' {
  switch (errorCode) {
    case 404:
      return 404
    case 403:
      return 403
    case 500:
      return 500
    default:
      return 'general'
  }
}

// Helper function to check if an error is a specific HTTP error
export function isHttpError(error: unknown, status?: number): boolean {
  if (!error || typeof error !== 'object') return false
  
  const hasStatus = 'status' in error
  if (!hasStatus) return false
  
  if (status !== undefined) {
    return (error as any).status === status
  }
  
  return typeof (error as any).status === 'number'
}

// Helper function to get error status from error object
export function getErrorStatus(error: unknown): number {
  if (isHttpError(error)) {
    return (error as any).status
  }
  return 500 // Default to server error
}

// Helper function to format error for logging
export function formatErrorForLogging(error: unknown, context?: string) {
  const timestamp = new Date().toISOString()
  const errorStatus = getErrorStatus(error)
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  
  return {
    timestamp,
    status: errorStatus,
    message: errorMessage,
    context: context || 'Unknown',
    stack: error instanceof Error ? error.stack : undefined
  }
}

// Custom error classes
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public context?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`)
    this.name = 'NotFoundError'
  }
}

export class ForbiddenError extends Error {
  constructor(action: string = 'Action') {
    super(`${action} forbidden`)
    this.name = 'ForbiddenError'
  }
}

// Error message helpers
export function getErrorTitle(errorCode: number | string): string {
  switch (errorCode) {
    case 404:
      return 'Halaman Tidak Ditemukan'
    case 403:
      return 'Akses Ditolak'
    case 500:
      return 'Terjadi Kesalahan Server'
    default:
      return 'Terjadi Kesalahan'
  }
}

export function getErrorDescription(errorCode: number | string): string {
  switch (errorCode) {
    case 404:
      return 'Halaman yang Anda cari tidak dapat ditemukan. Mungkin telah dipindahkan atau dihapus.'
    case 403:
      return 'Anda tidak memiliki izin untuk mengakses halaman ini.'
    case 500:
      return 'Terjadi kesalahan pada server kami. Tim teknis sedang menangani masalah ini.'
    default:
      return 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi dalam beberapa saat.'
  }
}