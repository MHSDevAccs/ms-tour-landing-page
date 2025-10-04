// import { defineField, defineType } from 'sanity'

// export const siteSettings = defineType({
//   name: 'siteSettings',
//   title: 'Site Settings',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'logo',
//       title: 'Logo',
//       type: 'image',
//       options: {
//         hotspot: true,
//         accept: 'image/png, image/svg+xml, image/webp',
//       },
//       fields: [
//         {
//           name: 'alt',
//           type: 'string',
//           title: 'Alternative Text',
//           description: 'Logo description for accessibility'
//         }
//       ],
//       description: 'COMPANY LOGO: 400x200px (2:1) | Max Size: 20MB | Format: PNG/SVG/WebP'
//     }),
//     defineField({
//       name: 'logoAlt',
//       title: 'Logo Alt Text',
//       type: 'string',
//       description: 'Alternative text for the logo (for accessibility)',
//     }),
//     defineField({
//       name: 'siteName',
//       title: 'Site Name',
//       type: 'string',
//       description: 'Company/Brand name',
//       initialValue: 'Mahabbatussholihin Tour & Travel',
//     }),
//     defineField({
//       name: 'siteTitle',
//       title: 'Site Title (SEO)',
//       type: 'string',
//       description: 'Page title for SEO and browser tab',
//       initialValue: 'Mahabbatussholihin Tour & Travel - Gerbang Menuju Petualangan Tak Terlupakan',
//     }),
//     defineField({
//       name: 'siteDescription',
//       title: 'Site Description (SEO)',
//       type: 'text',
//       description: 'Meta description for SEO and social sharing',
//       initialValue: 'Temukan destinasi menakjubkan bersama Mahabbatussholihin Tour & Travel. Kami menawarkan pengalaman perjalanan yang dipersonalisasi, pemandu ahli, dan petualangan tak terlupakan di seluruh Indonesia dan sekitarnya.',
//     }),
//     defineField({
//       name: 'contactInfo',
//       title: 'Contact Information',
//       type: 'object',
//       fields: [
//         {
//           name: 'phone',
//           title: 'Phone Number',
//           type: 'string',
//         },
//         {
//           name: 'email',
//           title: 'Email Address',
//           type: 'string',
//         },
//         {
//           name: 'address',
//           title: 'Physical Address',
//           type: 'text',
//         },
//         {
//           name: 'whatsapp',
//           title: 'WhatsApp Number',
//           type: 'string',
//         }
//       ]
//     }),
//     defineField({
//       name: 'businessHours',
//       title: 'Business Hours',
//       type: 'object',
//       fields: [
//         {
//           name: 'mondayFriday',
//           title: 'Monday - Friday',
//           type: 'string',
//           initialValue: '09:00 - 18:00'
//         },
//         {
//           name: 'saturday',
//           title: 'Saturday',
//           type: 'string',
//           initialValue: '09:00 - 16:00'
//         },
//         {
//           name: 'sunday',
//           title: 'Sunday',
//           type: 'string',
//           initialValue: 'Tutup'
//         },
//         {
//           name: 'timezone',
//           title: 'Timezone',
//           type: 'string',
//           initialValue: 'WIB (GMT+7)'
//         }
//       ]
//     }),
//     defineField({
//       name: 'contactContent',
//       title: 'Contact Page Content',
//       type: 'object',
//       fields: [
//         {
//           name: 'pageTitle',
//           title: 'Contact Page Title',
//           type: 'string',
//           initialValue: 'Hubungi Kami',
//           description: 'Main title for contact page'
//         },
//         {
//           name: 'pageDescription',
//           title: 'Contact Page Description',
//           type: 'text',
//           initialValue: 'Kami siap membantu Anda merencanakan perjalanan yang berkesan',
//           description: 'Description text for contact page'
//         },
//         {
//           name: 'contactDetailsTitle',
//           title: 'Contact Details Section Title',
//           type: 'string',
//           initialValue: 'Informasi Kontak',
//           description: 'Title for contact details section'
//         },
//         {
//           name: 'phoneLabel',
//           title: 'Phone Label',
//           type: 'string',
//           initialValue: 'Telepon',
//           description: 'Label for phone number'
//         },
//         {
//           name: 'emailLabel',
//           title: 'Email Label',
//           type: 'string',
//           initialValue: 'Email',
//           description: 'Label for email address'
//         },
//         {
//           name: 'addressLabel',
//           title: 'Address Label',
//           type: 'string',
//           initialValue: 'Alamat',
//           description: 'Label for physical address'
//         },
//         {
//           name: 'whatsappLabel',
//           title: 'WhatsApp Label',
//           type: 'string',
//           initialValue: 'WhatsApp',
//           description: 'Label for WhatsApp number'
//         },
//         {
//           name: 'businessHoursTitle',
//           title: 'Business Hours Title',
//           type: 'string',
//           initialValue: 'Jam Operasional',
//           description: 'Title for business hours section'
//         },
//         {
//           name: 'quickResponseTitle',
//           title: 'Quick Response Title',
//           type: 'string',
//           initialValue: 'Respon Cepat',
//           description: 'Title for quick response section'
//         },
//         {
//           name: 'quickResponseText',
//           title: 'Quick Response Text',
//           type: 'text',
//           initialValue: 'Tim kami siap memberikan respon cepat untuk semua pertanyaan Anda',
//           description: 'Text for quick response section'
//         },
//         {
//           name: 'whatsappQuickTitle',
//           title: 'WhatsApp Quick Contact Title',
//           type: 'string',
//           initialValue: 'Chat WhatsApp',
//           description: 'Title for WhatsApp quick contact section'
//         },
//         {
//           name: 'whatsappQuickText',
//           title: 'WhatsApp Quick Contact Text',
//           type: 'text',
//           initialValue: 'Hubungi kami melalui WhatsApp untuk respon yang lebih cepat',
//           description: 'Text for WhatsApp quick contact section'
//         }
//       ]
//     }),
//     defineField({
//       name: 'socialMedia',
//       title: 'Social Media Links',
//       type: 'object',
//       fields: [
//         {
//           name: 'instagram',
//           title: 'Instagram URL',
//           type: 'url',
//         },
//         {
//           name: 'facebook',
//           title: 'Facebook URL',
//           type: 'url',
//         },
//         {
//           name: 'youtube',
//           title: 'YouTube URL',
//           type: 'url',
//         },
//         {
//           name: 'twitter',
//           title: 'Twitter URL',
//           type: 'url',
//         },
//         {
//           name: 'tiktok',
//           title: 'TikTok URL',
//           type: 'url',
//         }
//       ]
//     }),
//   ],
//   preview: {
//     select: {
//       title: 'siteName',
//       media: 'logo',
//     },
//   },
// })