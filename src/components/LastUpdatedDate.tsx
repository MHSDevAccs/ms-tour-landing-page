'use client'

import { useEffect, useState } from 'react'
import { getCurrentDateIndonesian } from '@/utils/dateUtils'

export default function LastUpdatedDate() {
  const [currentDate, setCurrentDate] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentDate(getCurrentDateIndonesian())
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="mb-8 p-4 bg-primary-lighter rounded-lg">
        <p className="text-sm text-primary-dark">
          <strong>Terakhir diperbarui:</strong> ...
        </p>
      </div>
    )
  }

  return (
    <div className="mb-8 p-4 bg-primary-lighter rounded-lg">
      <p className="text-sm text-primary-dark">
        <strong>Terakhir diperbarui:</strong> {currentDate}
      </p>
    </div>
  )
}