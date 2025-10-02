import { defineField, defineType } from 'sanity'

export const socialMedia = defineType({
  name: 'socialMedia',
  title: 'Social Media',
  type: 'document',
  icon: () => '📱',
  fields: [
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'Facebook Page URL',
          type: 'url',
          placeholder: 'https://facebook.com/mahabbatussholihin'
        },
        {
          name: 'enabled',
          title: 'Show Facebook Link',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'Instagram Profile URL',
          type: 'url',
          placeholder: 'https://instagram.com/mahabbatussholihin'
        },
        {
          name: 'enabled',
          title: 'Show Instagram Link',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter/X',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'Twitter/X Profile URL',
          type: 'url',
          placeholder: 'https://twitter.com/mahabbatussholihin'
        },
        {
          name: 'enabled',
          title: 'Show Twitter/X Link',
          type: 'boolean',
          initialValue: false
        }
      ]
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'YouTube Channel URL',
          type: 'url',
          placeholder: 'https://youtube.com/@mahabbatussholihin'
        },
        {
          name: 'enabled',
          title: 'Show YouTube Link',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'TikTok Profile URL',
          type: 'url',
          placeholder: 'https://tiktok.com/@mahabbatussholihin'
        },
        {
          name: 'enabled',
          title: 'Show TikTok Link',
          type: 'boolean',
          initialValue: false
        }
      ]
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'object',
      fields: [
        {
          name: 'number',
          title: 'WhatsApp Number',
          type: 'string',
          placeholder: '+62 811 1000 2477',
          description: 'Include country code (e.g., +62 for Indonesia)'
        },
        {
          name: 'message',
          title: 'Default Message',
          type: 'text',
          placeholder: 'Halo, saya tertarik dengan paket tour Anda...',
          description: 'Pre-filled message when users click WhatsApp link'
        },
        {
          name: 'enabled',
          title: 'Show WhatsApp Link',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'telegram',
      title: 'Telegram',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'Telegram Channel/Group URL',
          type: 'url',
          placeholder: 'https://t.me/mahabbatussholihin'
        },
        {
          name: 'enabled',
          title: 'Show Telegram Link',
          type: 'boolean',
          initialValue: false
        }
      ]
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'LinkedIn Company Page URL',
          type: 'url',
          placeholder: 'https://linkedin.com/company/mahabbatussholihin'
        },
        {
          name: 'enabled',
          title: 'Show LinkedIn Link',
          type: 'boolean',
          initialValue: false
        }
      ]
    })
  ],
  preview: {
    select: {
      facebook: 'facebook.enabled',
      instagram: 'instagram.enabled',
      youtube: 'youtube.enabled',
      whatsapp: 'whatsapp.enabled',
    },
    prepare(selection) {
      const { facebook, instagram, youtube, whatsapp } = selection
      const enabledPlatforms = []
      
      if (facebook) enabledPlatforms.push('Facebook')
      if (instagram) enabledPlatforms.push('Instagram')
      if (youtube) enabledPlatforms.push('YouTube')
      if (whatsapp) enabledPlatforms.push('WhatsApp')
      
      return {
        title: 'Social Media Settings',
        subtitle: enabledPlatforms.length > 0 
          ? `Active: ${enabledPlatforms.join(', ')}` 
          : 'No platforms enabled',
      }
    }
  }
})

export default socialMedia