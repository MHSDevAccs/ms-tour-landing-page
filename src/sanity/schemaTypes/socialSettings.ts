import { defineField, defineType } from 'sanity'

export const socialSettings = defineType({
  name: 'socialSettings',
  title: 'Social Media & Communication',
  type: 'document',
  fields: [
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          placeholder: 'https://instagram.com/mhstour'
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          placeholder: 'https://facebook.com/mhstour'
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          placeholder: 'https://youtube.com/@mhstour'
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          placeholder: 'https://twitter.com/mhstour'
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
          initialValue: 'Terima kasih telah menghubungi Mahabbatussholihin Tour & Travel.',
          description: 'Thank you message in customer email'
        },
        {
          name: 'responseMessage',
          title: 'Response Message',
          type: 'text',
          initialValue: 'Kami akan segera merespons pertanyaan Anda dalam waktu 24 jam.',
          description: 'Response time message in customer email'
        },
        {
          name: 'teamSignature',
          title: 'Team Signature',
          type: 'string',
          initialValue: 'Team Mahabbatussholihin Tour & Travel',
          description: 'Team signature in emails'
        }
      ]
    }),
    defineField({
      name: 'contactContent',
      title: 'Contact Page Content',
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
  ],
  preview: {
    select: {
      instagram: 'socialMedia.instagram',
      facebook: 'socialMedia.facebook',
    },
    prepare(selection) {
      const { instagram, facebook } = selection
      const hasLinks = instagram || facebook
      return {
        title: 'Social Media & Communication',
        subtitle: hasLinks ? 'Social links configured' : 'Configure social media links'
      }
    }
  },
})