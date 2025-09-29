import { Metadata } from 'next'
import Link from 'next/link'
import { PageTransition } from '@/components/AnimatedSection'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | Mahabbatussholihin Tour & Travel',
  description: 'Kebijakan privasi Mahabbatussholihin Tour & Travel mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pelanggan.',
  keywords: ['kebijakan privasi', 'perlindungan data', 'privasi pelanggan', 'mahabbatussholihin', 'tour travel'],
  openGraph: {
    title: 'Kebijakan Privasi | Mahabbatussholihin Tour & Travel',
    description: 'Kebijakan privasi Mahabbatussholihin Tour & Travel mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pelanggan.',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
      {/* Privacy Policy Header - HARDCODED */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4">Kebijakan Privasi</h1>
          <p className="text-xl text-primary-lighter">
            Komitmen kami dalam melindungi privasi dan data pribadi Anda
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Last Updated */}
          <div className="mb-8 p-4 bg-primary-lighter rounded-lg">
            <p className="text-sm text-primary-dark">
              <strong>Terakhir diperbarui:</strong> {new Date().toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pendahuluan</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mahabbatussholihin Tour & Travel ("kami", "perusahaan", atau "MS Travel") berkomitmen untuk melindungi 
              privasi dan keamanan informasi pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, 
              menggunakan, menyimpan, dan melindungi informasi pribadi Anda ketika Anda menggunakan layanan kami.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Dengan menggunakan layanan kami, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini. 
              Jika Anda tidak setuju dengan kebijakan ini, mohon untuk tidak menggunakan layanan kami.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Informasi yang Kami Kumpulkan</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">1. Informasi Pribadi</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami dapat mengumpulkan informasi pribadi berikut:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Nama lengkap</li>
              <li>Alamat email</li>
              <li>Nomor telepon</li>
              <li>Alamat rumah</li>
              <li>Tanggal lahir</li>
              <li>Informasi identitas (KTP, Paspor)</li>
              <li>Preferensi perjalanan</li>
              <li>Informasi pembayaran</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2. Informasi Teknis</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami juga mengumpulkan informasi teknis secara otomatis:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Alamat IP</li>
              <li>Jenis browser dan perangkat</li>
              <li>Sistem operasi</li>
              <li>Halaman yang dikunjungi</li>
              <li>Waktu dan durasi kunjungan</li>
              <li>Data cookies dan teknologi pelacakan serupa</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Bagaimana Kami Menggunakan Informasi</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami menggunakan informasi yang dikumpulkan untuk:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Menyediakan dan mengelola layanan perjalanan</li>
              <li>Memproses pemesanan dan pembayaran</li>
              <li>Berkomunikasi dengan Anda mengenai layanan kami</li>
              <li>Memberikan dukungan pelanggan</li>
              <li>Mengirimkan informasi promosi dan penawaran khusus</li>
              <li>Meningkatkan kualitas layanan kami</li>
              <li>Mematuhi kewajiban hukum</li>
              <li>Mencegah penipuan dan aktivitas ilegal</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Berbagi Informasi</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga. 
              Namun, kami dapat membagikan informasi dalam situasi berikut:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Dengan penyedia layanan perjalanan (maskapai, hotel, operator tur)</li>
              <li>Dengan penyedia layanan pembayaran</li>
              <li>Dengan otoritas pemerintah jika diwajibkan oleh hukum</li>
              <li>Dengan persetujuan eksplisit dari Anda</li>
              <li>Untuk melindungi hak, properti, atau keamanan kami</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Keamanan Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Enkripsi data selama transmisi dan penyimpanan</li>
              <li>Akses terbatas hanya untuk karyawan yang berwenang</li>
              <li>Sistem keamanan berlapis untuk mencegah akses tidak sah</li>
              <li>Pemantauan keamanan secara berkala</li>
              <li>Backup data secara teratur</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Penyimpanan Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami menyimpan informasi pribadi Anda selama diperlukan untuk:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Menyediakan layanan yang Anda minta</li>
              <li>Mematuhi kewajiban hukum</li>
              <li>Menyelesaikan sengketa</li>
              <li>Menegakkan perjanjian kami</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Setelah periode penyimpanan berakhir, kami akan menghapus atau menganonimkan informasi pribadi Anda 
              dengan cara yang aman.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hak-Hak Anda</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Anda memiliki hak-hak berikut terkait informasi pribadi Anda:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Hak untuk mengakses informasi pribadi yang kami miliki</li>
              <li>Hak untuk memperbarui atau mengoreksi informasi yang tidak akurat</li>
              <li>Hak untuk menghapus informasi pribadi dalam kondisi tertentu</li>
              <li>Hak untuk membatasi pemrosesan informasi Anda</li>
              <li>Hak untuk memindahkan data ke penyedia layanan lain</li>
              <li>Hak untuk menolak pemrosesan untuk tujuan pemasaran</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang tersedia di bawah.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies dan Teknologi Pelacakan</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Website kami menggunakan cookies dan teknologi serupa untuk:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Mengingat preferensi dan pengaturan Anda</li>
              <li>Menganalisis penggunaan website</li>
              <li>Menyediakan konten yang dipersonalisasi</li>
              <li>Meningkatkan keamanan website</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Anda dapat mengatur browser Anda untuk menolak cookies, namun hal ini dapat mempengaruhi 
              fungsionalitas website kami.
            </p>
          </section>

          {/* Third Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tautan Pihak Ketiga</h2>
            <p className="text-gray-700 leading-relaxed">
              Website kami mungkin berisi tautan ke website pihak ketiga. Kami tidak bertanggung jawab atas 
              praktik privasi atau konten website tersebut. Kami menyarankan Anda untuk membaca kebijakan 
              privasi setiap website yang Anda kunjungi.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privasi Anak-Anak</h2>
            <p className="text-gray-700 leading-relaxed">
              Layanan kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Kami tidak secara sengaja 
              mengumpulkan informasi pribadi dari anak-anak di bawah usia 13 tahun. Jika Anda adalah orang tua 
              atau wali dan mengetahui bahwa anak Anda telah memberikan informasi pribadi kepada kami, 
              silakan hubungi kami.
            </p>
          </section>

          {/* Policy Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Perubahan Kebijakan</h2>
            <p className="text-gray-700 leading-relaxed">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diposting di 
              halaman ini dengan tanggal "Terakhir diperbarui" yang baru. Kami menyarankan Anda untuk 
              meninjau kebijakan ini secara berkala untuk mengetahui perubahan terbaru.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hubungi Kami</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak-hak Anda, 
              silakan hubungi kami melalui:
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4 text-center sm:text-left">Mahabbatussholihin Tour & Travel</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <strong className="text-gray-800 mb-1 sm:mb-0 sm:mr-2 min-w-[80px]">Email:</strong>
                  <a href="mailto:info@travel.mahabbatussholihin.com" 
                     className="text-primary hover:text-primary-dark break-all sm:break-normal transition-colors">
                    info@travel.mahabbatussholihin.com
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <strong className="text-gray-800 mb-1 sm:mb-0 sm:mr-2 min-w-[80px]">Telepon:</strong>
                  <a href="tel:+6281110002477" 
                     className="text-primary hover:text-primary-dark transition-colors">
                    +62 811 1000 2477
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <strong className="text-gray-800 mb-1 sm:mb-0 sm:mr-2 min-w-[80px]">WhatsApp:</strong>
                  <a href="https://wa.me/6281110002477" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-primary hover:text-primary-dark transition-colors">
                    +62 811 1000 2477
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <strong className="text-gray-800 mb-1 sm:mb-0 sm:mr-2 min-w-[80px]">Alamat:</strong>
                  <span>Bukit Duri, Jak-Sel</span>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center pt-6 sm:pt-8 border-t border-gray-200">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <WhatsAppFloat 
        phoneNumber="+6281110002477"
        message="Halo! Saya ingin bertanya tentang kebijakan privasi dan layanan tour Anda."
      />
    </div>
    </PageTransition>
  )
}