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
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
          placeholder: 'https://tiktok.com/@mhstour'
        }
      ]
    })
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