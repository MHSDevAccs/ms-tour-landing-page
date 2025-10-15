import { Metadata } from 'next'
import ErrorLayout from '@/components/ErrorLayout'

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan - Mahabbatussholihin Tour & Travel',
  description: 'Halaman yang Anda cari tidak dapat ditemukan. Kembali ke halaman utama atau jelajahi layanan wisata kami.',
  robots: 'noindex, nofollow',
}

export default function NotFound() {
  return (
    <ErrorLayout
      errorCode={404}
    />
  )
}