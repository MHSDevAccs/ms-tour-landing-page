import { defineField, defineType } from 'sanity'

export const errorPages = defineType({
  name: 'errorPages',
  title: 'Error Pages',
  type: 'document',
  icon: () => '⚠️',
  fields: [
    defineField({
      name: 'title',
      title: 'Error Pages Settings',
      type: 'string',
      initialValue: 'Error Pages Configuration',
      readOnly: true,
      description: 'Configuration for error pages (404, 500, 403, etc.)'
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'id',
      options: {
        list: [
          { title: 'Indonesian', value: 'id' },
          { title: 'English', value: 'en' }
        ]
      }
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Enable custom error pages'
    }),
    defineField({
      name: 'layout',
      title: 'Layout Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showHeader',
          title: 'Show Header',
          type: 'boolean',
          initialValue: false,
          description: 'Display website header on error pages'
        }),
        defineField({
          name: 'showFooter',
          title: 'Show Footer',
          type: 'boolean',
          initialValue: false,
          description: 'Display website footer on error pages'
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'White', value: 'bg-white' },
              { title: 'Gray 50', value: 'bg-gray-50' },
              { title: 'Gray 100', value: 'bg-gray-100' },
              { title: 'Primary Light', value: 'bg-primary-light' }
            ]
          },
          initialValue: 'bg-white'
        }),
        defineField({
          name: 'centerContent',
          title: 'Center Content',
          type: 'boolean',
          initialValue: true,
          description: 'Center the error content vertically and horizontally'
        })
      ]
    }),
    defineField({
      name: 'error404',
      title: '404 - Page Not Found',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Halaman Tidak Ditemukan'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Maaf, halaman yang Anda cari tidak dapat ditemukan.'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Halaman mungkin telah dipindahkan, dihapus, atau URL yang Anda masukkan salah. Silakan periksa kembali URL atau kembali ke halaman utama.'
        }),
        defineField({
          name: 'image',
          title: 'Error Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            })
          ]
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Kembali ke Beranda'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/'
            })
          ]
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Hubungi Kami'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/contact'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'error500',
      title: '500 - Internal Server Error',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Terjadi Kesalahan Server'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Maaf, terjadi kesalahan pada server kami.'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Tim teknis kami sedang menangani masalah ini. Silakan coba lagi dalam beberapa saat atau hubungi kami jika masalah berlanjut.'
        }),
        defineField({
          name: 'image',
          title: 'Error Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            })
          ]
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Coba Lagi'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/'
            })
          ]
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Hubungi Support'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/contact'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'error403',
      title: '403 - Access Forbidden',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Akses Ditolak'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Anda tidak memiliki izin untuk mengakses halaman ini.'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Halaman yang Anda coba akses memerlukan izin khusus. Silakan login dengan akun yang sesuai atau hubungi administrator.'
        }),
        defineField({
          name: 'image',
          title: 'Error Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            })
          ]
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Kembali ke Beranda'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/'
            })
          ]
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Login'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/login'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'generalError',
      title: 'General Error (Fallback)',
      type: 'object',
      description: 'Used for other error codes not specifically defined above',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Terjadi Kesalahan'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Maaf, terjadi kesalahan yang tidak terduga.'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Silakan coba lagi dalam beberapa saat atau hubungi kami jika masalah berlanjut.'
        }),
        defineField({
          name: 'image',
          title: 'Error Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            })
          ]
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Kembali ke Beranda'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/'
            })
          ]
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Hubungi Kami'
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/contact'
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      isActive: 'isActive'
    },
    prepare({ title, language, isActive }) {
      return {
        title: title || 'Error Pages',
        subtitle: `Language: ${language?.toUpperCase() || 'ID'} • ${isActive ? 'Active' : 'Inactive'}`,
        media: () => '⚠️'
      }
    }
  }
})