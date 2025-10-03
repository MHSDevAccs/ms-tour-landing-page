import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/png, image/svg+xml, image/webp',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Logo description for accessibility'
        }
      ],
      description: 'COMPANY LOGO: 400x200px (2:1) | Max Size: 20MB | Format: PNG/SVG/WebP'
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'Alternative text for the logo (for accessibility)',
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Company/Brand name',
      initialValue: 'Mahabbatussholihin Tour & Travel',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title (SEO)',
      type: 'string',
      description: 'Page title for SEO and browser tab',
      initialValue: 'Mahabbatussholihin Tour & Travel - Gerbang Menuju Petualangan Tak Terlupakan',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description (SEO)',
      type: 'text',
      description: 'Meta description for SEO and social sharing',
      initialValue: 'Temukan destinasi menakjubkan bersama Mahabbatussholihin Tour & Travel. Kami menawarkan pengalaman perjalanan yang dipersonalisasi, pemandu ahli, dan petualangan tak terlupakan di seluruh Indonesia dan sekitarnya.',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Physical Address',
          type: 'text',
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp Number',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        {
          name: 'mondayFriday',
          title: 'Monday - Friday',
          type: 'string',
          initialValue: '09:00 - 18:00'
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          initialValue: '09:00 - 16:00'
        },
        {
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          initialValue: 'Tutup'
        },
        {
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          initialValue: 'WIB (GMT+7)'
        }
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Site Content',
      type: 'object',
      fields: [
        {
          name: 'tagline',
          title: 'Company Tagline',
          type: 'string',
          initialValue: 'Mitra Terpercaya untuk Perjalanan Spiritual Terbaik',
          description: 'Main tagline displayed in footer and emails'
        },
        {
          name: 'ctaText',
          title: 'Call to Action Text',
          type: 'string',
          initialValue: 'Bismillah, Siap Memulai Perjalanan Berkah Anda?',
          description: 'Main CTA text on homepage'
        },
        {
          name: 'contactCtaText',
          title: 'Contact CTA Text',
          type: 'string',
          initialValue: 'Bismillah, siap memulai perjalanan berkah berikutnya? Hubungi tim kami yang amanah',
          description: 'CTA text on contact page'
        },
        {
          name: 'getInTouchText',
          title: 'Get in Touch Text',
          type: 'string',
          initialValue: 'Hubungi Kami',
          description: 'Contact form heading'
        },
        {
          name: 'bookNowText',
          title: 'Book Now Button Text',
          type: 'string',
          initialValue: 'Pesan Sekarang',
          description: 'Text for book now buttons'
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 Mahabbatussholihin Tour & Travel. Semua hak dilindungi.',
          description: 'Copyright notice in footer'
        }
      ]
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        {
          name: 'homeText',
          title: 'Home Menu Text',
          type: 'string',
          initialValue: 'Beranda'
        },
        {
          name: 'aboutText',
          title: 'About Menu Text',
          type: 'string',
          initialValue: 'Tentang'
        },
        {
          name: 'servicesText',
          title: 'Services Menu Text',
          type: 'string',
          initialValue: 'Layanan'
        },
        {
          name: 'galleryText',
          title: 'Gallery Menu Text',
          type: 'string',
          initialValue: 'Galeri'
        },
        {
          name: 'blogText',
          title: 'Blog Menu Text',
          type: 'string',
          initialValue: 'Blog'
        },
        {
          name: 'contactText',
          title: 'Contact Menu Text',
          type: 'string',
          initialValue: 'Kontak'
        },
        {
          name: 'tourPackagesText',
          title: 'Tour Packages Text',
          type: 'string'
        },
        {
          name: 'privacyPolicyText',
          title: 'Privacy Policy Text',
          type: 'string',
          initialValue: 'Kebijakan Privasi'
        }
      ]
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'object',
      fields: [
        {
          name: 'blogSectionTitle',
          title: 'Blog Section Title',
          type: 'string',
          initialValue: 'Tips & Artikel Terbaru'
        },
        {
          name: 'blogSectionSubtitle',
          title: 'Blog Section Subtitle',
          type: 'string',
          initialValue: 'Dapatkan tips perjalanan terbaru'
        },
        {
          name: 'viewAllArticlesText',
          title: 'View All Articles Text',
          type: 'string',
          initialValue: 'Lihat Semua Artikel'
        },
        {
          name: 'getStartedNowText',
          title: 'Get Started Now Text',
          type: 'string',
          initialValue: 'Mulai Sekarang'
        },
        {
          name: 'galleryTitle',
          title: 'Gallery Page Title',
          type: 'string',
          initialValue: 'Galeri Foto'
        },
        {
          name: 'galleryDescription',
          title: 'Gallery Page Description',
          type: 'text',
          initialValue: 'Jelajahi koleksi foto-foto menakjubkan dari perjalanan wisata bersama Mahabbatussholihin Tour & Travel'
        },
        {
          name: 'galleryComingSoonTitle',
          title: 'Gallery Coming Soon Title',
          type: 'string',
          initialValue: 'Galeri Akan Segera Hadir'
        },
        {
          name: 'galleryComingSoonMessage',
          title: 'Gallery Coming Soon Message',
          type: 'text',
          initialValue: 'Tim kami sedang mempersiapkan koleksi foto-foto menakjubkan dari berbagai destinasi wisata. Pantau terus halaman ini untuk update terbaru!'
        },
        {
          name: 'galleryMeanwhileText',
          title: 'Gallery Meanwhile Text',
          type: 'string',
          initialValue: '💡 Sementara itu...'
        },
        {
          name: 'exploreToursText',
          title: 'Explore Tours Text',
          type: 'string',
          initialValue: 'Jelajahi layanan tur kami'
        },
        {
          name: 'viewTourServicesText',
          title: 'View Tour Services Text',
          type: 'string',
          initialValue: 'Lihat Layanan Tur →'
        },
        {
          name: 'featuredGalleriesTitle',
          title: 'Featured Galleries Title',
          type: 'string',
          initialValue: '⭐ Galeri Unggulan'
        },
        {
          name: 'featuredGalleriesSubtitle',
          title: 'Featured Galleries Subtitle',
          type: 'string',
          initialValue: 'Koleksi foto terpilih dari destinasi favorit'
        },
        {
          name: 'createMomentsTitle',
          title: 'Create Moments Title',
          type: 'string',
          initialValue: 'Siap Menciptakan Momen Berkah Bersama Kami?'
        },
        {
          name: 'createMomentsSubtitle',
          title: 'Create Moments Subtitle',
          type: 'text',
          initialValue: 'Alhamdulillah, gabung yuk sama ribuan jamaah yang udah merasakan berkah perjalanan tak terlupakan bareng Mahabbatussholihin Tour & Travel'
        },
        {
          name: 'freeConsultationText',
          title: 'Free Consultation Text',
          type: 'string',
          initialValue: 'Konsultasi Gratis'
        },
        {
          name: 'viewTourPackagesText',
          title: 'View Tour Packages Text',
          type: 'string'
        },
        {
          name: 'viewAllPackagesText',
          title: 'View All Packages Text',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'blogContent',
      title: 'Blog Content',
      type: 'object',
      fields: [
        {
          name: 'searchResultsText',
          title: 'Search Results Text',
          type: 'string',
          initialValue: 'Hasil Pencarian: '
        },
        {
          name: 'categoryText',
          title: 'Category Text',
          type: 'string',
          initialValue: 'Kategori: '
        },
        {
          name: 'tagText',
          title: 'Tag Text',
          type: 'string',
          initialValue: 'Tag: '
        },
        {
          name: 'noArticlesTitle',
          title: 'No Articles Title',
          type: 'string',
          initialValue: 'Tidak Ada Artikel'
        },
        {
          name: 'noArticlesSearchMessage',
          title: 'No Articles Search Message',
          type: 'string',
          initialValue: 'Tidak ditemukan artikel dengan kata kunci'
        },
        {
          name: 'noArticlesPublishedMessage',
          title: 'No Articles Published Message',
          type: 'string',
          initialValue: 'Belum ada artikel yang dipublikasikan.'
        },
        {
          name: 'featuredPostsTitle',
          title: 'Featured Posts Title',
          type: 'string',
          initialValue: 'Artikel Unggulan'
        },
        {
          name: 'showingArticlesText',
          title: 'Showing Articles Text',
          type: 'string',
          initialValue: 'Menampilkan'
        },
        {
          name: 'ofText',
          title: 'Of Text',
          type: 'string',
          initialValue: 'dari'
        },
        {
          name: 'articlesText',
          title: 'Articles Text',
          type: 'string',
          initialValue: 'artikel'
        },
        {
          name: 'backToAllArticlesText',
          title: 'Back to All Articles Text',
          type: 'string',
          initialValue: '← Kembali ke semua artikel'
        },
        {
          name: 'newsletterTitle',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Dapatkan Tips Perjalanan Terbaru'
        },
        {
          name: 'newsletterSubtitle',
          title: 'Newsletter Subtitle',
          type: 'text',
          initialValue: 'Bergabunglah dengan newsletter kami dan dapatkan tips perjalanan, penawaran khusus, dan update destinasi terbaru langsung di inbox Anda.'
        },
        {
          name: 'subscribeNewsletterText',
          title: 'Subscribe Newsletter Text',
          type: 'string',
          initialValue: 'Berlangganan Newsletter'
        },
        {
          name: 'searchPlaceholderText',
          title: 'Search Placeholder Text',
          type: 'string',
          initialValue: 'Cari artikel...'
        },
        {
          name: 'previousPageText',
          title: 'Previous Page Text',
          type: 'string',
          initialValue: 'Sebelumnya'
        },
        {
          name: 'nextPageText',
          title: 'Next Page Text',
          type: 'string',
          initialValue: 'Selanjutnya'
        }
      ]
    }),
    defineField({
      name: 'servicesContent',
      title: 'Services Content',
      type: 'object',
      fields: [
        {
          name: 'servicesTitle',
          title: 'Services Page Title',
          type: 'string',
          initialValue: 'Our Services'
        },
        {
          name: 'servicesDescription',
          title: 'Services Page Description',
          type: 'text',
          initialValue: 'We offer a comprehensive range of travel services designed to make your journey unforgettable. From custom tour packages to group adventures, we have something for every traveler.'
        },
        {
          name: 'popularServicesTitle',
          title: 'Popular Services Title',
          type: 'string',
          initialValue: 'Popular Services'
        },
        {
          name: 'popularServicesSubtitle',
          title: 'Popular Services Subtitle',
          type: 'string',
          initialValue: 'Our most requested travel experiences'
        },
        {
          name: 'allServicesTitle',
          title: 'All Services Title',
          type: 'string',
          initialValue: 'All Services'
        },
        {
          name: 'allServicesSubtitle',
          title: 'All Services Subtitle',
          type: 'string',
          initialValue: 'Complete range of travel solutions'
        },
        {
          name: 'servicesComingSoonTitle',
          title: 'Services Coming Soon Title',
          type: 'string',
          initialValue: 'Services Coming Soon'
        },
        {
          name: 'servicesComingSoonMessage',
          title: 'Services Coming Soon Message',
          type: 'text',
          initialValue: 'We\'re preparing our service offerings for you. Check back soon for exciting travel packages and experiences!'
        },
        {
          name: 'planAdventureTitle',
          title: 'Plan Adventure Title',
          type: 'string',
          initialValue: 'Ready to Plan Your Adventure?'
        },
        {
          name: 'planAdventureMessage',
          title: 'Plan Adventure Message',
          type: 'text',
          initialValue: 'Our travel experts are here to help you create the perfect itinerary. Contact us today to start planning your next unforgettable journey.'
        },
        {
          name: 'contactUsText',
          title: 'Contact Us Text',
          type: 'string',
          initialValue: 'Contact Us'
        },
        {
          name: 'aboutUsText',
          title: 'About Us Text',
          type: 'string',
          initialValue: 'About Us'
        }
      ]
    }),
    defineField({
      name: 'contactContent',
      title: 'Contact Content',
      type: 'object',
      fields: [
        {
          name: 'contactTitle',
          title: 'Contact Page Title',
          type: 'string',
          initialValue: 'Contact Us'
        },
        {
          name: 'contactDescription',
          title: 'Contact Page Description',
          type: 'text',
          initialValue: 'Get in touch with our travel experts. We\'re here to help you plan your perfect journey.'
        },
        {
          name: 'whatsappText',
          title: 'WhatsApp Text',
          type: 'string',
          initialValue: 'WhatsApp'
        },
        {
          name: 'emailText',
          title: 'Email Text',
          type: 'string',
          initialValue: 'Email'
        },
        {
          name: 'addressText',
          title: 'Address Text',
          type: 'string',
          initialValue: 'Address'
        },
        {
          name: 'businessHoursText',
          title: 'Business Hours Text',
          type: 'string',
          initialValue: 'Business Hours'
        },
        {
          name: 'mondayFridayText',
          title: 'Monday Friday Text',
          type: 'string',
          initialValue: 'Monday - Friday'
        },
        {
          name: 'saturdayText',
          title: 'Saturday Text',
          type: 'string',
          initialValue: 'Saturday'
        },
        {
          name: 'sundayText',
          title: 'Sunday Text',
          type: 'string',
          initialValue: 'Sunday'
        },
        {
          name: 'timezoneText',
          title: 'Timezone Text',
          type: 'string',
          initialValue: 'Timezone'
        },
        {
          name: 'quickResponseTitle',
          title: 'Quick Response Title',
          type: 'string',
          initialValue: 'Quick Response Guarantee'
        },
        {
          name: 'quickResponseMessage',
          title: 'Quick Response Message',
          type: 'text',
          initialValue: 'We respond to all inquiries within 24 hours. Our dedicated team is committed to providing you with prompt and helpful assistance.'
        },
        {
          name: 'averageResponseText',
          title: 'Average Response Text',
          type: 'string',
          initialValue: 'Average response: 2-4 hours'
        },
        {
          name: 'chatWhatsappText',
          title: 'Chat WhatsApp Text',
          type: 'string',
          initialValue: 'Chat via WhatsApp'
        },
        {
          name: 'needHelpMessage',
          title: 'Need Help Message',
          type: 'text',
          initialValue: 'Butuh bantuan segera? Chat langsung dengan tim customer service kami melalui WhatsApp untuk respon yang lebih cepat.'
        },
        {
          name: 'startChatText',
          title: 'Start Chat Text',
          type: 'string',
          initialValue: 'Mulai Chat Sekarang'
        }
      ]
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Content',
      type: 'object',
      fields: [
        {
          name: 'aboutTitle',
          title: 'About Page Title',
          type: 'string',
          initialValue: 'About Mahabbatussholihin Tour & Travel'
        },
        {
          name: 'aboutSubtitle',
          title: 'About Page Subtitle',
          type: 'text',
          initialValue: 'Your trusted partner for unforgettable travel experiences across Indonesia and beyond'
        },
        {
          name: 'ourStoryTitle',
          title: 'Our Story Title',
          type: 'string',
          initialValue: 'Our Story'
        },
        {
          name: 'ourStoryText',
          title: 'Our Story Text',
          type: 'text',
          initialValue: 'Founded with a passion for travel and a commitment to excellence, Mahabbatussholihin Tour & Travel has been creating memorable journeys for travelers from around the world. Our story began with a simple belief: that travel should be transformative, accessible, and deeply meaningful.'
        },
        {
          name: 'ourMissionTitle',
          title: 'Our Mission Title',
          type: 'string',
          initialValue: 'Our Mission'
        },
        {
          name: 'ourMissionText',
          title: 'Our Mission Text',
          type: 'text',
          initialValue: 'To provide exceptional travel experiences that connect people with diverse cultures, breathtaking destinations, and unforgettable memories while ensuring the highest standards of service, safety, and sustainability.'
        },
        {
          name: 'whyChooseUsTitle',
          title: 'Why Choose Us Title',
          type: 'string',
          initialValue: 'Why Choose Us'
        }
      ]
    }),
    defineField({
      name: 'formContent',
      title: 'Form Content',
      type: 'object',
      fields: [
        {
          name: 'formTitle',
          title: 'Contact Form Title',
          type: 'string',
          initialValue: 'Ready to plan your adventure? Fill out the form below and we\'ll get back to you within 24 hours.'
        },
        {
          name: 'successMessage',
          title: 'Form Success Message',
          type: 'text',
          initialValue: 'Thank you for your message! We\'ll get back to you within 24 hours.'
        },
        {
          name: 'errorMessage',
          title: 'Form Error Message',
          type: 'string',
          initialValue: 'An error occurred while submitting the form. Please try again.'
        },
        {
          name: 'sendingText',
          title: 'Sending Text',
          type: 'string',
          initialValue: 'Sending...'
        },
        {
          name: 'sendMessageText',
          title: 'Send Message Text',
          type: 'string',
          initialValue: 'Kirim Pesan'
        }
      ]
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'object',
      fields: [
        {
          name: 'nameLabel',
          title: 'Name Label',
          type: 'string',
          initialValue: 'Nama lengkap Anda'
        },
        {
          name: 'emailLabel',
          title: 'Email Label',
          type: 'string',
          initialValue: 'Alamat Email *'
        },
        {
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'email.anda@contoh.com'
        },
        {
          name: 'phoneLabel',
          title: 'Phone Label',
          type: 'string',
          initialValue: 'Nomor Telepon'
        },
        {
          name: 'phonePlaceholder',
          title: 'Phone Placeholder',
          type: 'string',
          initialValue: '+62 811 1000 2477'
        },
        {
          name: 'tourInterestLabel',
          title: 'Tour Interest Label',
          type: 'string',
          initialValue: 'Minat Tour'
        },
        {
          name: 'travelDateLabel',
          title: 'Travel Date Label',
          type: 'string',
          initialValue: 'Tanggal Perjalanan Pilihan'
        },
        {
          name: 'groupSizeLabel',
          title: 'Group Size Label',
          type: 'string',
          initialValue: 'Ukuran Grup'
        },
        {
          name: 'groupSizePlaceholder',
          title: 'Group Size Placeholder',
          type: 'string',
          initialValue: 'Jumlah wisatawan'
        },
        {
          name: 'budgetLabel',
          title: 'Budget Label',
          type: 'string',
          initialValue: 'Rentang Anggaran'
        },
        {
          name: 'subjectLabel',
          title: 'Subject Label',
          type: 'string',
          initialValue: 'Subjek *'
        },
        {
          name: 'subjectPlaceholder',
          title: 'Subject Placeholder',
          type: 'string',
          initialValue: 'Bismillah, apa yang bisa kami bantu?'
        },
        {
          name: 'messageLabel',
          title: 'Message Label',
          type: 'string',
          initialValue: 'Pesan *'
        },
        {
          name: 'messagePlaceholder',
          title: 'Message Placeholder',
          type: 'string',
          initialValue: 'Bismillah, ceritakan lebih lanjut tentang rencana perjalanan berkah Anda...'
        }
      ]
    }),
    defineField({
      name: 'formOptions',
      title: 'Form Options',
      type: 'object',
      fields: [
        {
          name: 'tourPackagesOption',
          title: 'Tour Packages Option',
          type: 'string'
        },
        {
          name: 'customToursOption',
          title: 'Custom Tours Option',
          type: 'string',
          initialValue: 'Tour Kustom'
        },
        {
          name: 'generalInquiryOption',
          title: 'General Inquiry Option',
          type: 'string',
          initialValue: 'Pertanyaan Umum'
        },
        {
          name: 'budgetUnder5M',
          title: 'Budget Under 5M',
          type: 'string',
          initialValue: 'Under 5 Million IDR'
        },
        {
          name: 'budget5to10M',
          title: 'Budget 5-10M',
          type: 'string',
          initialValue: '5-10 Million IDR'
        },
        {
          name: 'budget10to20M',
          title: 'Budget 10-20M',
          type: 'string',
          initialValue: '10-20 Million IDR'
        },
        {
          name: 'budget20to50M',
          title: 'Budget 20-50M',
          type: 'string',
          initialValue: '20-50 Million IDR'
        },
        {
          name: 'budgetOver50M',
          title: 'Budget Over 50M',
          type: 'string',
          initialValue: 'Over 50 Million IDR'
        }
      ]
    }),
    defineField({
      name: 'validationMessages',
      title: 'Validation Messages',
      type: 'object',
      fields: [
        {
          name: 'nameMinLength',
          title: 'Name Min Length Error',
          type: 'string',
          initialValue: 'Nama harus minimal 2 karakter'
        },
        {
          name: 'nameMaxLength',
          title: 'Name Max Length Error',
          type: 'string',
          initialValue: 'Nama harus kurang dari 50 karakter'
        },
        {
          name: 'emailInvalid',
          title: 'Email Invalid Error',
          type: 'string',
          initialValue: 'Silakan masukkan alamat email yang valid'
        },
        {
          name: 'phoneInvalid',
          title: 'Phone Invalid Error',
          type: 'string',
          initialValue: 'Silakan masukkan nomor telepon yang valid'
        },
        {
          name: 'groupSizeRange',
          title: 'Group Size Range Error',
          type: 'string',
          initialValue: 'Ukuran grup harus antara 1 dan 50'
        },
        {
          name: 'subjectMinLength',
          title: 'Subject Min Length Error',
          type: 'string',
          initialValue: 'Subjek harus minimal 5 karakter'
        },
        {
          name: 'subjectMaxLength',
          title: 'Subject Max Length Error',
          type: 'string',
          initialValue: 'Subjek harus kurang dari 100 karakter'
        },
        {
          name: 'messageMinLength',
          title: 'Message Min Length Error',
          type: 'string',
          initialValue: 'Pesan harus minimal 10 karakter'
        },
        {
          name: 'messageMaxLength',
          title: 'Message Max Length Error',
          type: 'string',
          initialValue: 'Pesan harus kurang dari 1000 karakter'
        }
      ]
    }),
    defineField({
      name: 'emailTemplates',
      title: 'Email Templates',
      type: 'object',
      fields: [
        {
          name: 'thankYouMessage',
          title: 'Thank You Message',
          type: 'text',
          initialValue: 'Barakallohu fiikum atas kepercayaan Anda kepada Mahabbatussholihin Tour & Travel.',
          description: 'Thank you message in customer email'
        },
        {
          name: 'responseMessage',
          title: 'Response Message',
          type: 'text',
          initialValue: 'Insyaalloh kami akan segera merespons pertanyaan Anda dalam waktu 24 jam.',
          description: 'Response time message in customer email'
        },
        {
          name: 'teamSignature',
          title: 'Team Signature',
          type: 'string',
          initialValue: 'Wassalamu\'alaikum warahmatullahi wabarakatuh\nTeam Mahabbatussholihin Tour & Travel',
          description: 'Team signature in emails'
        }
      ]
    }),
    defineField({
      name: 'theme',
      title: 'Theme Configuration',
      type: 'object',
      fields: [
        {
          name: 'colors',
          title: 'Color Scheme',
          type: 'object',
          fields: [
            {
              name: 'primary',
              title: 'Primary Color',
              type: 'string',
              initialValue: '#39ace7',
              description: 'Main brand color (hex code)'
            },
            {
              name: 'primaryLight',
              title: 'Primary Light Color',
              type: 'string',
              initialValue: '#9bd4e4',
              description: 'Light variant of primary color'
            },
            {
              name: 'primaryDark',
              title: 'Primary Dark Color',
              type: 'string',
              initialValue: '#0784b5',
              description: 'Dark variant of primary color'
            },
            {
              name: 'secondary',
              title: 'Secondary Color',
              type: 'string',
              initialValue: '#ffffff',
              description: 'Secondary brand color'
            },
            {
              name: 'accent',
              title: 'Accent Color',
              type: 'string',
              initialValue: '#9bd4e4',
              description: 'Accent color for highlights'
            },
            {
              name: 'textPrimary',
              title: 'Primary Text Color',
              type: 'string',
              initialValue: '#1f2937',
              description: 'Main text color'
            },
            {
              name: 'textSecondary',
              title: 'Secondary Text Color',
              type: 'string',
              initialValue: '#6b7280',
              description: 'Secondary text color'
            },
            {
              name: 'background',
              title: 'Background Color',
              type: 'string',
              initialValue: '#ffffff',
              description: 'Main background color'
            },
            {
              name: 'backgroundAlt',
              title: 'Alternative Background Color',
              type: 'string',
              initialValue: '#f9fafb',
              description: 'Alternative background color'
            }
          ]
        },
        {
          name: 'buttons',
          title: 'Button Styles',
          type: 'object',
          fields: [
            {
              name: 'primaryButton',
              title: 'Primary Button Classes',
              type: 'string',
              initialValue: 'bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300',
              description: 'CSS classes for primary buttons'
            },
            {
              name: 'secondaryButton',
              title: 'Secondary Button Classes',
              type: 'string',
              initialValue: 'bg-white hover:bg-gray-50 text-primary border-2 border-primary font-semibold py-3 px-6 rounded-lg transition-colors duration-300',
              description: 'CSS classes for secondary buttons'
            },
            {
              name: 'outlineButton',
              title: 'Outline Button Classes',
              type: 'string',
              initialValue: 'border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300',
              description: 'CSS classes for outline buttons'
            }
          ]
        },
        {
          name: 'cards',
          title: 'Card Styles',
          type: 'object',
          fields: [
            {
              name: 'defaultCard',
              title: 'Default Card Classes',
              type: 'string',
              initialValue: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
              description: 'CSS classes for default cards'
            },
            {
              name: 'serviceCard',
              title: 'Service Card Classes',
              type: 'string',
              initialValue: 'bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6',
              description: 'CSS classes for service cards'
            },
            {
              name: 'blogCard',
              title: 'Blog Card Classes',
              type: 'string',
              initialValue: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden',
              description: 'CSS classes for blog cards'
            },
            {
              name: 'testimonialCard',
              title: 'Testimonial Card Classes',
              type: 'string',
              initialValue: 'bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full',
              description: 'CSS classes for testimonial cards'
            }
          ]
        },
        {
          name: 'layout',
          title: 'Layout Styles',
          type: 'object',
          fields: [
            {
              name: 'container',
              title: 'Container Classes',
              type: 'string',
              initialValue: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
              description: 'CSS classes for main container'
            },
            {
              name: 'section',
              title: 'Section Classes',
              type: 'string',
              initialValue: 'py-16 lg:py-24',
              description: 'CSS classes for sections'
            },
            {
              name: 'headerBg',
              title: 'Header Background Classes',
              type: 'string',
              initialValue: 'bg-white shadow-md',
              description: 'CSS classes for header background'
            },
            {
              name: 'footerBg',
              title: 'Footer Background Classes',
              type: 'string',
              initialValue: 'bg-gray-900 text-white',
              description: 'CSS classes for footer background'
            }
          ]
        },
        {
          name: 'components',
          title: 'Component Styles',
          type: 'object',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Section Title Classes',
              type: 'string',
              initialValue: 'text-3xl md:text-4xl font-bold text-black mb-4',
              description: 'CSS classes for section titles'
            },
            {
              name: 'sectionSubtitle',
              title: 'Section Subtitle Classes',
              type: 'string',
              initialValue: 'text-lg text-gray-600 max-w-3xl mx-auto',
              description: 'CSS classes for section subtitles'
            },
            {
              name: 'sectionHeader',
              title: 'Section Header Classes',
              type: 'string',
              initialValue: 'text-center mb-12',
              description: 'CSS classes for section headers'
            },
            {
              name: 'gridDefault',
              title: 'Default Grid Classes',
              type: 'string',
              initialValue: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
              description: 'CSS classes for default grid layout'
            },
            {
              name: 'gridCompact',
              title: 'Compact Grid Classes',
              type: 'string',
              initialValue: 'grid-cols-1 sm:grid-cols-2',
              description: 'CSS classes for compact grid layout'
            },
            {
              name: 'testimonialSection',
              title: 'Testimonial Section Classes',
              type: 'string',
              initialValue: 'py-16 bg-gray-50',
              description: 'CSS classes for testimonial section background'
            },
            {
              name: 'starRating',
              title: 'Star Rating Classes',
              type: 'string',
              initialValue: 'text-lg',
              description: 'CSS classes for star rating'
            },
            {
              name: 'starActive',
              title: 'Active Star Classes',
              type: 'string',
              initialValue: 'text-accent',
              description: 'CSS classes for active stars'
            },
            {
              name: 'starInactive',
              title: 'Inactive Star Classes',
              type: 'string',
              initialValue: 'text-gray-300',
              description: 'CSS classes for inactive stars'
            }
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
  },
})