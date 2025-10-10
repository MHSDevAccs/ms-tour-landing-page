import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST() {
  try {
    // Clean data for heroSection
    const cleanData = {
      title: "Mahabbatussholihin Tour & Travel",
      subtitle: "Mendampingi Jamaah Haji dan Umroh, InsyaAlloh Amanah dalam memberangkatkan para tamu Allah ke tanah suci",
      ctaText: "Info lebih lanjut",
      ctaLink: "https://wa.me/6287770005801",
      sliderImages: [
        {
          _key: "782919fcf38a",
          alt: "2",
          caption: "Pahala Umroh + Pahala Jariyah dalam satu niat suci.",
          image: {
            _type: "image",
            asset: {
              _ref: "image-c63c5d10816f50efaf8a175a559b99bbbfeac044-4032x1908-jpg",
              _type: "reference"
            }
          },
          subtitle: "Setiap rupiah dari MS Travel menjadi sumber keberkahan — seluruh pendapatan disalurkan untuk pembangunan dan kegiatan Pondok Pesantren Mahabbatussholihin, Desa Tegalega, Cirangkong, Purwakarta.\nSatu perjalanan, dua pahala: Ibadah & Amal Jariyah.",
          title: "Mahabbatussholihin Tour & Travel"
        },
        {
          _key: "73172e50f127",
          alt: "1",
          caption: "Berangkat dengan hati yang tenang, pulang dengan jiwa yang bersih.",
          image: {
            _type: "image",
            asset: {
              _ref: "image-8fa65d8e5a34bba2d72552b59fc27a243162618a-4160x3120-jpg",
              _type: "reference"
            }
          },
          subtitle: "Perjalanan spiritual yang tak hanya membersihkan jiwa, tetapi juga menjadi investasi akhirat melalui amal jariyah untuk pendidikan Islam.",
          title: "Umroh Berkah"
        }
      ]
    };

    // Update the heroSection document
    const result = await client
      .patch('heroSection')
      .set(cleanData)
      .commit();

    return NextResponse.json({ 
      success: true,
      message: 'HeroSection updated with clean data',
      result 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to update heroSection', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST to clean the heroSection data' 
  });
}