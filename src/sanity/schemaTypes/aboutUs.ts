import { defineField, defineType } from 'sanity'

export const aboutUs = defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutPageTitle',
      title: 'About Page Title (SEO)',
      type: 'string',
      initialValue: 'Tentang Kami - Mahabbatussholihin Tour & Travel',
      description: 'Page title for SEO and browser tab'
    }),
    defineField({
      name: 'aboutPageDescription',
      title: 'About Page Description (SEO)',
      type: 'text',
      initialValue: 'Mahabbatussholihin Tour & Travel adalah mitra perjalanan terpercaya dengan pengalaman bertahun-tahun. Komitmen kami memberikan pengalaman wisata terbaik dengan pelayanan profesional dan harga kompetitif.',
      description: 'Meta description for SEO and social sharing'
    }),
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Tentang Kami',
      description: 'Main heading on about page'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      initialValue: 'Mitra terpercaya Anda untuk pengalaman perjalanan tak terlupakan sejak didirikan.',
      description: 'Subtitle text below main title'
    }),
    defineField({
      name: 'ourStoryTitle',
      title: 'Our Story Title',
      type: 'string',
      initialValue: 'Cerita Kami',
      description: 'Title for our story section'
    }),
    defineField({
      name: 'ourStoryDescription',
      title: 'Our Story Description',
      type: 'text',
      initialValue: 'Mahabbatussholihin Tour & Travel didirikan dengan misi sederhana: menciptakan pengalaman perjalanan berkesan yang menghubungkan orang dengan destinasi menakjubkan di seluruh dunia. Kami percaya bahwa perjalanan memiliki kekuatan untuk mengubah hidup, memperluas perspektif, dan menciptakan kenangan abadi.',
      description: 'Description text for our story section'
    }),
    defineField({
      name: 'ourMissionTitle',
      title: 'Our Mission Title',
      type: 'string',
      initialValue: 'Misi Kami',
      description: 'Title for our mission section'
    }),
    defineField({
      name: 'ourMissionDescription',
      title: 'Our Mission Description',
      type: 'text',
      initialValue: 'Dengan ridho Alloh SWT, kami berkomitmen nyediain layanan perjalanan yang berkah dan penuh makna yang bisa melampaui ekspektasi jamaah kami sambil menjaga amanah dan tanggung jawab dalam setiap langkah perjalanan.',
      description: 'Description text for our mission section'
    }),
    defineField({
      name: 'whyChooseUsTitle',
      title: 'Why Choose Us Title',
      type: 'string',
      initialValue: 'Mengapa Memilih Kami',
      description: 'Title for why choose us section'
    }),
    defineField({
      name: 'whyChooseUsItems',
      title: 'Why Choose Us Items',
      type: 'array',
      of: [
        {
          type: 'string',
          title: 'Reason'
        }
      ],
      initialValue: [
        'Pengetahuan lokal yang ahli dan itinerary yang udah dikurasi dengan penuh barakah',
        'Dukungan jamaah 24/7 sepanjang perjalanan dengan penuh amanah',
        'Harga yang berkah dengan kebijakan transparan tanpa biaya tersembunyi',
        'Praktik perjalanan yang halal dan berkah untuk komunitas lokal',
        'Opsi pemesanan fleksibel dan paket yang bisa disesuaikan sesuai kebutuhan jamaah'
      ],
      description: 'List of reasons why customers should choose us'
    }),
    defineField({
      name: 'companyLegalityTitle',
      title: 'Company Legality Title',
      type: 'string',
      initialValue: 'Legalitas Perusahaan',
      description: 'Title for company legality section'
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'PT. Mahabbatussholihin Wisata Nusantara',
      description: 'Official company name'
    }),
    defineField({
      name: 'nib',
      title: 'NIB (Nomor Induk Berusaha)',
      type: 'string',
      initialValue: '1234567890123456',
      description: 'Business identification number'
    }),
    defineField({
      name: 'investmentStatus',
      title: 'Investment Status',
      type: 'string',
      initialValue: 'PMDN (Penanaman Modal Dalam Negeri)',
      description: 'Investment classification'
    }),
    defineField({
      name: 'businessScale',
      title: 'Business Scale',
      type: 'string',
      initialValue: 'Usaha Menengah',
      description: 'Scale of business operations'
    }),
    defineField({
      name: 'officeAddress',
      title: 'Office Address',
      type: 'text',
      initialValue: 'Jl. Raya Bogor No. 123, Kelurahan Cimanggis, Kecamatan Tapos, Kota Depok, Jawa Barat 16454',
      description: 'Official office address'
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '+62 21 8765 4321',
      description: 'Official contact phone number'
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@mahabbatussholihin.com',
      description: 'Official contact email address'
    })
  ],
  preview: {
    select: {
      title: 'mainTitle',
      subtitle: 'subtitle'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'About Us',
        subtitle: subtitle || 'About page content'
      }
    }
  }
})