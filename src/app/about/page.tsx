import { Metadata } from 'next'
import { sanityFetch, queries } from '@/sanity/lib/client'

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    return {
      title: siteSettings?.pageContent?.aboutPageTitle || 'Tentang Kami',
      description: siteSettings?.pageContent?.aboutPageDescription || 'Pelajari lebih lanjut tentang Mahabbatussholihin Tour & Travel dan komitmen kami dalam menyediakan pengalaman perjalanan yang luar biasa.',
    }
  } catch (error) {
    console.error('Failed to fetch metadata:', error)
    return {
      title: 'Tentang Kami',
      description: 'Pelajari lebih lanjut tentang Mahabbatussholihin Tour & Travel dan komitmen kami dalam menyediakan pengalaman perjalanan yang luar biasa.',
    }
  }
}

export default async function AboutPage() {
  // Fetch site settings for about content
  let siteSettings: any = null

  try {
    siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
  }

  return (
    <div className="min-h-screen bg-secondary-light py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            {siteSettings?.aboutContent?.mainTitle || 'Tentang Mahabbatussholihin Tour & Travel'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {siteSettings?.aboutContent?.subtitle || 'Mitra terpercaya Anda untuk pengalaman perjalanan tak terlupakan sejak didirikan.'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-black mb-4">
            {siteSettings?.aboutContent?.ourStoryTitle || 'Cerita Kami'}
          </h2>
          <p className="text-gray-700 mb-6">
            {siteSettings?.aboutContent?.ourStoryDescription || 'Mahabbatussholihin Tour & Travel didirikan dengan misi sederhana: menciptakan pengalaman perjalanan berkesan yang menghubungkan orang dengan destinasi menakjubkan di seluruh dunia. Kami percaya bahwa perjalanan memiliki kekuatan untuk mengubah hidup, memperluas perspektif, dan menciptakan kenangan abadi.'}
          </p>
          
          <h2 className="text-2xl font-semibold text-black mb-4">
            {siteSettings?.aboutContent?.ourMissionTitle || 'Misi Kami'}
          </h2>
          <p className="text-gray-700 mb-6">
            {siteSettings?.aboutContent?.ourMissionDescription || 'Dengan ridho Allah SWT, kami berkomitmen nyediain layanan perjalanan yang berkah dan penuh makna yang bisa melampaui ekspektasi jamaah kami sambil menjaga amanah dan tanggung jawab dalam setiap langkah perjalanan.'}
          </p>
          
          <h2 className="text-2xl font-semibold text-black mb-4">
            {siteSettings?.aboutContent?.whyChooseUsTitle || 'Mengapa Memilih Kami'}
          </h2>
          {siteSettings?.aboutContent?.whyChooseUsItems && siteSettings.aboutContent.whyChooseUsItems.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {siteSettings.aboutContent.whyChooseUsItems.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Pengetahuan lokal yang ahli dan itinerary yang udah dikurasi dengan penuh barakah</li>
              <li>Dukungan jamaah 24/7 sepanjang perjalanan dengan penuh amanah</li>
              <li>Harga yang berkah dengan kebijakan transparan tanpa biaya tersembunyi</li>
              <li>Praktik perjalanan yang halal dan berkah untuk komunitas lokal</li>
              <li>Opsi pemesanan fleksibel dan paket yang bisa disesuaikan sesuai kebutuhan jamaah</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}