import { defineType, defineField } from 'sanity'

export const contentSettings = defineType({
  name: 'contentSettings',
  title: 'Content Management',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'navigation',
      title: 'Navigation Content',
      type: 'object',
      fields: [
        defineField({
          name: 'homeText',
          title: 'Home Menu Text',
          type: 'string',
          initialValue: 'Beranda'
        }),
        defineField({
          name: 'servicesText',
          title: 'Services Menu Text',
          type: 'string',
          initialValue: 'Layanan'
        }),
        defineField({
          name: 'galleryText',
          title: 'Gallery Menu Text',
          type: 'string',
          initialValue: 'Galeri'
        }),
        defineField({
          name: 'blogText',
          title: 'Blog Menu Text',
          type: 'string',
          initialValue: 'Blog'
        }),
        defineField({
          name: 'aboutText',
          title: 'About Menu Text',
          type: 'string',
          initialValue: 'Tentang'
        }),
        defineField({
          name: 'contactText',
          title: 'Contact Menu Text',
          type: 'string',
          initialValue: 'Kontak'
        })
      ]
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'object',
      fields: [
        defineField({
          name: 'blogPageTitle',
          title: 'Blog Page Title',
          type: 'string',
          initialValue: 'Blog & Artikel'
        }),
        defineField({
          name: 'galleryPageTitle',
          title: 'Gallery Page Title',
          type: 'string',
          initialValue: 'Galeri Foto'
        }),
        defineField({
          name: 'tourPackagesTitle',
          title: 'Tour Packages Title',
          type: 'string',
          initialValue: 'Paket Wisata'
        }),
        defineField({
          name: 'customTourTitle',
          title: 'Custom Tour Title',
          type: 'string',
          initialValue: 'Tur Kustom'
        }),
        defineField({
          name: 'destinationsTitle',
          title: 'Destinations Title',
          type: 'string',
          initialValue: 'Destinasi'
        })
      ]
    }),
    defineField({
      name: 'formContent',
      title: 'Form Content',
      type: 'object',
      fields: [
        defineField({
          name: 'contactFormTitle',
          title: 'Contact Form Title',
          type: 'string',
          initialValue: 'Hubungi Kami'
        }),
        defineField({
          name: 'bookingFormTitle',
          title: 'Booking Form Title',
          type: 'string',
          initialValue: 'Pesan Sekarang'
        }),
        defineField({
          name: 'inquiryFormTitle',
          title: 'Inquiry Form Title',
          type: 'string',
          initialValue: 'Kirim Pertanyaan'
        }),
        defineField({
          name: 'successMessage',
          title: 'Form Success Message',
          type: 'text',
          initialValue: 'Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.'
        }),
        defineField({
          name: 'errorMessage',
          title: 'Form Error Message',
          type: 'text',
          initialValue: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.'
        })
      ]
    }),
    defineField({
      name: 'formFields',
      title: 'Form Field Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'nameLabel',
          title: 'Name Field Label',
          type: 'string',
          initialValue: 'Nama Lengkap'
        }),
        defineField({
          name: 'namePlaceholder',
          title: 'Name Field Placeholder',
          type: 'string',
          initialValue: 'Masukkan nama lengkap Anda'
        }),
        defineField({
          name: 'emailLabel',
          title: 'Email Field Label',
          type: 'string',
          initialValue: 'Email'
        }),
        defineField({
          name: 'emailPlaceholder',
          title: 'Email Field Placeholder',
          type: 'string',
          initialValue: 'contoh@email.com'
        }),
        defineField({
          name: 'phoneLabel',
          title: 'Phone Field Label',
          type: 'string',
          initialValue: 'Nomor Telepon'
        }),
        defineField({
          name: 'phonePlaceholder',
          title: 'Phone Field Placeholder',
          type: 'string',
          initialValue: '+62 812 3456 7890'
        }),
        defineField({
          name: 'groupSizeLabel',
          title: 'Group Size Field Label',
          type: 'string',
          initialValue: 'Jumlah Peserta'
        }),
        defineField({
          name: 'budgetLabel',
          title: 'Budget Field Label',
          type: 'string',
          initialValue: 'Budget Range'
        }),
        defineField({
          name: 'subjectLabel',
          title: 'Subject Field Label',
          type: 'string',
          initialValue: 'Subjek'
        }),
        defineField({
          name: 'subjectPlaceholder',
          title: 'Subject Field Placeholder',
          type: 'string',
          initialValue: 'Pilih topik pertanyaan'
        }),
        defineField({
          name: 'messageLabel',
          title: 'Message Field Label',
          type: 'string',
          initialValue: 'Pesan'
        }),
        defineField({
          name: 'messagePlaceholder',
          title: 'Message Field Placeholder',
          type: 'string',
          initialValue: 'Tulis pesan atau pertanyaan Anda di sini...'
        })
      ]
    }),
    defineField({
      name: 'formOptions',
      title: 'Form Options',
      type: 'object',
      fields: [
        defineField({
          name: 'tourPackageOptions',
          title: 'Tour Package Options',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Paket Wisata Reguler', 'Paket Wisata Premium', 'Paket Wisata VIP']
        }),
        defineField({
          name: 'customTourOptions',
          title: 'Custom Tour Options',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Tur Pribadi', 'Tur Keluarga', 'Tur Grup']
        }),
        defineField({
          name: 'inquiryOptions',
          title: 'General Inquiry Options',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Informasi Umum', 'Pertanyaan Harga', 'Jadwal Keberangkatan', 'Lainnya']
        }),
        defineField({
          name: 'budgetRanges',
          title: 'Budget Range Options',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['< Rp 1.000.000', 'Rp 1.000.000 - Rp 3.000.000', 'Rp 3.000.000 - Rp 5.000.000', '> Rp 5.000.000']
        })
      ]
    }),
    defineField({
      name: 'validationMessages',
      title: 'Validation Messages',
      type: 'object',
      fields: [
        defineField({
          name: 'nameRequired',
          title: 'Name Required Message',
          type: 'string',
          initialValue: 'Nama lengkap wajib diisi'
        }),
        defineField({
          name: 'emailRequired',
          title: 'Email Required Message',
          type: 'string',
          initialValue: 'Email wajib diisi'
        }),
        defineField({
          name: 'emailInvalid',
          title: 'Email Invalid Message',
          type: 'string',
          initialValue: 'Format email tidak valid'
        }),
        defineField({
          name: 'phoneRequired',
          title: 'Phone Required Message',
          type: 'string',
          initialValue: 'Nomor telepon wajib diisi'
        }),
        defineField({
          name: 'phoneInvalid',
          title: 'Phone Invalid Message',
          type: 'string',
          initialValue: 'Format nomor telepon tidak valid'
        }),
        defineField({
          name: 'groupSizeRequired',
          title: 'Group Size Required Message',
          type: 'string',
          initialValue: 'Jumlah peserta wajib diisi'
        }),
        defineField({
          name: 'subjectRequired',
          title: 'Subject Required Message',
          type: 'string',
          initialValue: 'Subjek wajib dipilih'
        }),
        defineField({
          name: 'messageRequired',
          title: 'Message Required Message',
          type: 'string',
          initialValue: 'Pesan wajib diisi'
        }),
        defineField({
          name: 'messageMinLength',
          title: 'Message Min Length Message',
          type: 'string',
          initialValue: 'Pesan minimal 10 karakter'
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Content Management Settings'
      }
    }
  }
})