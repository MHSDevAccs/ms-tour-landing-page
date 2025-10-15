/**
 * Date utility functions for consistent server-side and client-side rendering
 */

/**
 * Format date consistently for Indonesian locale
 * Safe for SSR - uses fixed timezone to prevent hydration mismatches
 */
export function formatDateIndonesian(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Use UTC to ensure consistent rendering between server and client
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };
  
  return dateObj.toLocaleDateString('id-ID', options);
}

/**
 * Format date with time consistently for Indonesian locale
 * Safe for SSR - uses fixed timezone to prevent hydration mismatches
 */
export function formatDateTimeIndonesian(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Use UTC to ensure consistent rendering between server and client
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  };
  
  return dateObj.toLocaleDateString('id-ID', options);
}

/**
 * Get current date formatted in Indonesian locale
 * Safe for SSR - uses fixed date to prevent hydration mismatches
 */
export function getCurrentDateIndonesian(): string {
  // For static pages, use a fixed date or implement dynamic loading
  // This prevents hydration mismatches between server and client
  const now = new Date();
  return formatDateIndonesian(now);
}

/**
 * Component wrapper for client-side date rendering
 * Use this when you need current date that updates on client
 */
export function useClientDate() {
  // This should be used with dynamic import or useEffect
  // to prevent SSR hydration issues
  return getCurrentDateIndonesian();
}