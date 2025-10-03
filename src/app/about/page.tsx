import { Metadata } from 'next'
import { sanityFetch, queries } from '@/sanity/lib/client'
import AnimatedSection, { PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { generateOrganizationJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd'



// Generate comprehensive metadata for about page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutUs = await sanityFetch<any>({
      query: queries.getAboutUs(),
      tags: ['aboutUs']
    })

    const title = aboutUs?.seoTitle || 'Tentang Kami - Mahabbatussholihin Tour & Travel'
    const description = aboutUs?.seoDescription || 'Mahabbatussholihin Tour & Travel adalah mitra perjalanan terpercaya dengan pengalaman bertahun-tahun. Komitmen kami memberikan pengalaman wisata terbaik dengan pelayanan profesional dan harga kompetitif.'

    return {
      title,
      description,
      keywords: [
        'tentang mahabbatussholihin', 'profil perusahaan travel', 'sejarah travel agency',
        'visi misi travel', 'tim professional travel', 'pengalaman travel', 'kredibilitas agen travel',
        'legalitas travel', 'sertifikat travel', 'award travel agency', 'testimoni pelanggan',
        'komitmen pelayanan', 'nilai perusahaan', 'budaya kerja travel', 'kantor travel'
      ],
      openGraph: {
        title,
        description,
        url: 'https://travel.mahabbatussholihin.com/about',
        siteName: 'Mahabbatussholihin Tour & Travel',
        locale: 'id_ID',
        type: 'website',
        images: [
          {
            url: '/og-about.jpg',
            width: 1200,
            height: 630,
            alt: 'Tentang Kami',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@mhstour',
        title,
        description,
        images: ['/og-about.jpg'],
      },
      alternates: {
        canonical: 'https://travel.mahabbatussholihin.com/about',
      },
    }
  } catch (error) {
    console.error('Failed to fetch metadata:', error)
    return {
      title: 'Tentang Kami - Mahabbatussholihin Tour & Travel',
      description: 'Mahabbatussholihin Tour & Travel adalah mitra perjalanan terpercaya dengan pengalaman bertahun-tahun. Komitmen kami memberikan pengalaman wisata terbaik dengan pelayanan profesional dan harga kompetitif.',
    }
  }
}

export default async function AboutPage() {
  // Fetch about us content
  let aboutUs: any = null

  try {
    aboutUs = await sanityFetch<any>({
      query: queries.getAboutUs(),
      tags: ['aboutUs']
    })
  } catch (error) {
    console.error('Failed to fetch about us:', error)
  }

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.mahabbatussholihin.com'
  const organizationJsonLd = generateOrganizationJsonLd(baseUrl, aboutUs || undefined)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Beranda', url: baseUrl },
    { name: 'Tentang Kami', url: `${baseUrl}/about` }
  ], baseUrl)

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* About Header */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4">
            {aboutUs?.mainTitle || 'Tentang Kami'}
          </h1>
          <p className="text-xl text-white">
            {aboutUs?.subtitle || 'Mengenal lebih dekat perjalanan spiritual bersama Mahabbatussholihin Tour & Travel'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-black mb-4">
            {aboutUs?.contentSection?.ourStory?.title || 'Cerita Kami'}
          </h2>
          <div className="text-gray-700 mb-6">
            {aboutUs?.contentSection?.ourStory?.content ? (
              <div className="prose prose-gray max-w-none">
                {/* For now, we'll render as simple text. Rich text rendering can be added later */}
                <p>
                  {Array.isArray(aboutUs.contentSection.ourStory.content) 
                    ? aboutUs.contentSection.ourStory.content
                        .filter((block: any) => block._type === 'block')
                        .map((block: any) => 
                          block.children?.map((child: any) => child.text).join('') || ''
                        ).join(' ')
                    : 'Mahabbatussholihin Tour & Travel didirikan dengan misi sederhana: menciptakan pengalaman perjalanan berkesan yang menghubungkan orang dengan destinasi menakjubkan di seluruh dunia. Kami percaya bahwa perjalanan memiliki kekuatan untuk mengubah hidup, memperluas perspektif, dan menciptakan kenangan abadi.'
                  }
                </p>
              </div>
            ) : (
              <p>Mahabbatussholihin Tour & Travel didirikan dengan misi sederhana: menciptakan pengalaman perjalanan berkesan yang menghubungkan orang dengan destinasi menakjubkan di seluruh dunia. Kami percaya bahwa perjalanan memiliki kekuatan untuk mengubah hidup, memperluas perspektif, dan menciptakan kenangan abadi.</p>
            )}
          </div>
          
          <h2 className="text-2xl font-semibold text-black mb-4">
            {aboutUs?.contentSection?.ourMission?.title || 'Misi Kami'}
          </h2>
          <div className="text-gray-700 mb-6">
            {aboutUs?.contentSection?.ourMission?.content ? (
              <div className="prose prose-gray max-w-none">
                {/* For now, we'll render as simple text. Rich text rendering can be added later */}
                <p>
                  {Array.isArray(aboutUs.contentSection.ourMission.content) 
                    ? aboutUs.contentSection.ourMission.content
                        .filter((block: any) => block._type === 'block')
                        .map((block: any) => 
                          block.children?.map((child: any) => child.text).join('') || ''
                        ).join(' ')
                    : 'Dengan ridho Alloh SWT, kami berkomitmen nyediain layanan perjalanan yang berkah dan penuh makna yang bisa melampaui ekspektasi jamaah kami sambil menjaga amanah dan tanggung jawab dalam setiap langkah perjalanan.'
                  }
                </p>
              </div>
            ) : (
              <p>Dengan ridho Alloh SWT, kami berkomitmen nyediain layanan perjalanan yang berkah dan penuh makna yang bisa melampaui ekspektasi jamaah kami sambil menjaga amanah dan tanggung jawab dalam setiap langkah perjalanan.</p>
            )}
          </div>
          
          <h2 className="text-2xl font-semibold text-black mb-6">
            {aboutUs?.contentSection?.whyChooseUs?.title || 'Mengapa Memilih Kami'}
          </h2>
          
          <StaggerContainer className="space-y-4">
              {aboutUs?.contentSection?.whyChooseUs?.items && aboutUs.contentSection.whyChooseUs.items.length > 0 ? (
                aboutUs.contentSection.whyChooseUs.items.map((item: any, index: number) => (
                  <StaggerItem key={index}>
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </StaggerItem>
                ))
              ) : (
              <>
                <StaggerItem>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-gray-700 leading-relaxed">
                      Pengetahuan lokal yang ahli dan itinerary yang udah dikurasi dengan penuh barakah
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-gray-700 leading-relaxed">
                      Dukungan jamaah 24/7 sepanjang perjalanan dengan penuh amanah
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-gray-700 leading-relaxed">
                      Harga yang berkah dengan kebijakan transparan tanpa biaya tersembunyi
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-gray-700 leading-relaxed">
                      Praktik perjalanan yang halal dan berkah untuk komunitas lokal
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-gray-700 leading-relaxed">
                      Opsi pemesanan fleksibel dan paket yang bisa disesuaikan sesuai kebutuhan jamaah
                    </p>
                  </div>
                </StaggerItem>
              </>
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* Legalitas Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-black mb-6">
            {aboutUs?.legalitasSection?.title || 'Legalitas Perusahaan'}
          </h2>
          
          <StaggerContainer className="space-y-4">
            <StaggerItem>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold text-gray-800 mb-1">Nama Perusahaan</h3>
                    <p className="text-gray-700">{aboutUs?.legalitasSection?.companyName || 'PT MAHABBATUSSHOLIHIN TOUR DAN TRAVEL'}</p>
                  </div>
                   <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold text-gray-800 mb-1">NIB</h3>
                    <p className="text-gray-700">{aboutUs?.legalitasSection?.nib || '1208250112908'}</p>
                  </div>                 
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold text-gray-800 mb-1">Status Penanaman Modal</h3>
                    <p className="text-gray-700">{aboutUs?.legalitasSection?.investmentStatus || 'PMDN (Penanaman Modal Dalam Negeri)'}</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold text-gray-800 mb-1">Skala Usaha</h3>
                    <p className="text-gray-700">{aboutUs?.legalitasSection?.businessScale || 'Usaha Mikro'}</p>
                  </div>
                </div>
                
                
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold text-gray-800 mb-1">Alamat Kantor</h3>
                    <p className="text-gray-700">
                      {aboutUs?.legalitasSection?.address ? (
                        <span dangerouslySetInnerHTML={{ __html: aboutUs.legalitasSection.address.replace(/\n/g, '<br />') }} />
                      ) : (
                        <>
                          JLN. CIPINANG MUARA RAYA NO. 02<br />
                          Desa/Kelurahan Cipinang Muara<br />
                          Kec. Jatinegara, Kota Adm. Jakarta Timur<br />
                          Provinsi DKI Jakarta<br />
                          Kode Pos: 13420
                        </>
                      )}
                    </p>
                  </div>
                  
                  
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold text-gray-800 mb-1">Kontak</h3>
                    <p className="text-gray-700">
                      No. Telepon: {aboutUs?.legalitasSection?.phone || '081110002477'}<br />
                      Email: {aboutUs?.legalitasSection?.email ? (
                        <span className="break-all">
                          {aboutUs.legalitasSection.email.includes('@') ? (
                            <>
                              {aboutUs.legalitasSection.email.split('@')[0]}<br />
                              @{aboutUs.legalitasSection.email.split('@')[1]}
                            </>
                          ) : (
                            aboutUs.legalitasSection.email
                          )}
                        </span>
                      ) : (
                        <span className="break-all">
                          ptmahabbatussholihin<br />
                          @gmail.com
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Perusahaan kami beroperasi secara legal dan terdaftar resmi sesuai dengan peraturan perundang-undangan yang berlaku di Indonesia.
            </p>
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  )
}