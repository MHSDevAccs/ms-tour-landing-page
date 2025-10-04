import { defineField, defineType } from 'sanity'

export const contactData = defineType({
  name: 'contactData',
  title: 'Contact Data',
  type: 'document',
  fields: [
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
        }  
      ]
    }),
  ],
  preview: {
    select: {
      title: 'contactContent.pageTitle',
    },
  },
})