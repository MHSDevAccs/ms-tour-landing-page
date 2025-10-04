import { defineField, defineType } from 'sanity'

export const contactData = defineType({
  name: 'contactData',
  title: 'Contact Data',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Halaman',
      type: 'string',
      initialValue: 'Informasi Kontak'
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Nomor Telepon',
          type: 'string',
          placeholder: 'Masukkan Nomor Telepon'
        },
        {
          name: 'address',
          title: 'Alamat',
          type: 'text',
          placeholder: 'Masukkan Alamat'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          placeholder: 'Masukkan Email'
        }
      ]
    }),
    
    defineField({
      name: 'contactWhatsapp',
      title: 'WhatsApp Contact',
      type: 'string',
      placeholder: 'e.g., +62 811-1000-2477'
    }),
    
    defineField({
      name: 'businessHours',
      title: 'Pengatur Jam',
      type: 'object',
      fields: [
        {
          name: 'mondayFriday',
          title: 'Jam Operasional',
          type: 'string',
          placeholder: 'Masukkan Jam Operasional'
        },
        // {
        //   name: 'saturday',    
        //   title: 'Saturday',
        //   type: 'string',
        //   initialValue: '9:00 AM - 4:00 PM'
        // },
        // {
        //   name: 'sunday',
        //   title: 'Sunday',
        //   type: 'string',
        //   initialValue: 'Closed'
        // },
        {
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          initialValue: 'WIB (GMT+7)'
        }
      ]
    }),
    
    defineField({
      name: 'contactContent',
      title: 'Contact Page Content',
      type: 'object',
      fields: [
        {
          name: 'pageTitle',
          title: 'Contact Page Title',
          type: 'string',
          initialValue: 'Hubungi Kami',
          description: 'Main title for contact page'
        },
        {
          name: 'pageDescription',
          title: 'Contact Page Description',
          type: 'text',
          initialValue: 'Kami siap membantu Anda merencanakan perjalanan yang berkesan',
          description: 'Description text for contact page'
        },
        {
          name: 'contactDetailsTitle',
          title: 'Contact Details Section Title',
          type: 'string',
          initialValue: 'Informasi Kontak',
          description: 'Title for contact details section'
        },
        {
          name: 'phoneLabel',
          title: 'Phone Label',
          type: 'string',
          initialValue: 'Telepon',
          description: 'Label for phone number'
        },
        {
          name: 'emailLabel',
          title: 'Email Label',
          type: 'string',
          initialValue: 'Email',
          description: 'Label for email address'
        },
        {
          name: 'addressLabel',
          title: 'Address Label',
          type: 'string',
          initialValue: 'Alamat',
          description: 'Label for physical address'
        },
        {
          name: 'whatsappLabel',
          title: 'WhatsApp Label',
          type: 'string',
          initialValue: 'WhatsApp',
          description: 'Label for WhatsApp number'
        },
        {
          name: 'businessHoursTitle',
          title: 'Business Hours Title',
          type: 'string',
          initialValue: 'Jam Operasional',
          description: 'Title for business hours section'
        },
        {
          name: 'quickResponseTitle',
          title: 'Quick Response Title',
          type: 'string',
          initialValue: 'Respon Cepat',
          description: 'Title for quick response section'
        },
        {
          name: 'quickResponseText',
          title: 'Quick Response Text',
          type: 'text',
          initialValue: 'Tim kami siap memberikan respon cepat untuk semua pertanyaan Anda',
          description: 'Text for quick response section'
        },
        {
          name: 'whatsappQuickTitle',
          title: 'WhatsApp Quick Contact Title',
          type: 'string',
          initialValue: 'Chat WhatsApp',
          description: 'Title for WhatsApp quick contact section'
        },
        {
          name: 'whatsappQuickText',
          title: 'WhatsApp Quick Contact Text',
          type: 'text',
          initialValue: 'Hubungi kami melalui WhatsApp untuk respon yang lebih cepat',
          description: 'Text for WhatsApp quick contact section'
        },
        {
          name: 'whatsappButtonText',
          title: 'WhatsApp Button Text',
          type: 'string',
          initialValue: 'Chat Sekarang',
          description: 'Text for WhatsApp button'
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'title',
    },
  }
})