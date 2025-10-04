'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { sanityFetch } from '@/sanity/lib/client'
import { getStyleClasses, getButtonClasses, getCardClasses, combineClasses } from '@/lib/cms-styles'

interface ThemeConfig {
  colors?: {
    primary?: string
    primaryLight?: string
    primaryDark?: string
    secondary?: string
    accent?: string
    textPrimary?: string
    textSecondary?: string
    background?: string
    backgroundAlt?: string
  }
  buttons?: {
    primaryButton?: string
    secondaryButton?: string
    outlineButton?: string
  }
  forms?: {
    input?: string
    inputFocus?: string
    label?: string
  }
}

interface ContactFormProps {
  className?: string
  theme?: ThemeConfig
}

interface SiteSettings {
  content?: {
    getInTouchText?: string
  }
  contactContent?: {
    formTitle?: string
    formDescription?: string
    successMessage?: string
    errorPrefix?: string
    fullNameLabel?: string
    fullNamePlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    phoneLabel?: string
    phonePlaceholder?: string
    tourInterestLabel?: string
    travelDateLabel?: string
    groupSizeLabel?: string
    groupSizePlaceholder?: string
    budgetLabel?: string
    subjectLabel?: string
    subjectPlaceholder?: string
    messageLabel?: string
    messagePlaceholder?: string
    submitButtonText?: string
    submittingText?: string
    tourOptions?: Array<{
      value: string
      label: string
    }>
    budgetOptions?: Array<{
      value: string
      label: string
    }>
  }
}

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Nama harus minimal 2 karakter')
    .max(50, 'Nama harus kurang dari 50 karakter')
    .regex(/^[a-zA-Z\s]+$/, 'Nama hanya boleh berisi huruf dan spasi'),
  email: z.string()
    .email('Silakan masukkan alamat email yang valid')
    .min(5, 'Email harus minimal 5 karakter')
    .max(100, 'Email harus kurang dari 100 karakter'),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(val), {
      message: 'Silakan masukkan nomor telepon yang valid'
    }),
  subject: z.string()
    .min(5, 'Subjek harus minimal 5 karakter')
    .max(100, 'Subjek harus kurang dari 100 karakter'),
  message: z.string()
    .min(20, 'Pesan harus minimal 20 karakter')
    .max(1000, 'Pesan harus kurang dari 1000 karakter'),
  tourInterest: z.string().optional(),
  travelDate: z.string().optional(),
  groupSize: z.string()
    .optional()
    .refine((val) => !val || (parseInt(val) >= 1 && parseInt(val) <= 50), {
      message: 'Ukuran grup harus antara 1 dan 50'
    }),
  budget: z.string().optional()
})

type FormData = z.infer<typeof contactFormSchema>

export default function ContactForm({ className = '', theme }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [formStyles, setFormStyles] = useState({
    container: 'bg-white rounded-lg shadow-lg p-8',
    title: 'text-2xl font-bold text-black mb-2',
    subtitle: 'text-gray-600',
    primaryButton: 'bg-accent text-primary-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors duration-200'
  })

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const settings = await sanityFetch<SiteSettings>({
          query: `
            *[_type == "siteSettings"][0] {
              content {
                getInTouchText
              },
              contactContent {
                formTitle,
                formDescription,
                successMessage,
                errorPrefix,
                fullNameLabel,
                fullNamePlaceholder,
                emailLabel,
                emailPlaceholder,
                phoneLabel,
                phonePlaceholder,
                tourInterestLabel,
                travelDateLabel,
                groupSizeLabel,
                groupSizePlaceholder,
                budgetLabel,
                subjectLabel,
                subjectPlaceholder,
                messageLabel,
                messagePlaceholder,
                submitButtonText,
                submittingText,
                tourOptions[] {
                  value,
                  label
                },
                budgetOptions[] {
                  value,
                  label
                }
              }
            }
          `
        })
        setSiteSettings(settings)
      } catch (error) {
        console.error('Failed to fetch site settings:', error)
      }
    }
    fetchSiteSettings()
  }, [])

  useEffect(() => {
    const loadFormStyles = async () => {
      try {
        const [container, title, subtitle, primaryButton] = await Promise.all([
          getCardClasses('default'),
          getStyleClasses('components', 'sectionTitle'),
          getStyleClasses('components', 'sectionSubtitle'),
          getButtonClasses('primary')
        ])

        setFormStyles({
          container: container || 'bg-white rounded-lg shadow-lg p-8',
          title: title || 'text-2xl font-bold text-black mb-2',
          subtitle: subtitle || 'text-gray-600',
          primaryButton: primaryButton || 'bg-accent text-primary-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors duration-200'
        })
      } catch (error) {
        console.error('Error loading form styles:', error)
      }
    }

    loadFormStyles()
  }, [])
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      tourInterest: '',
      travelDate: '',
      groupSize: '',
      budget: ''
    }
  })

  // Watch form values for character counts
  const messageLength = watch('message')?.length || 0
  const subjectLength = watch('subject')?.length || 0

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Gagal mengirim formulir')
      }

      setSubmitStatus('success')
      reset()
      
      // Scroll to top of form to show success message
      document.getElementById('contact-form')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim formulir')
    }
  }

  const tourOptions = siteSettings?.contactContent?.tourOptions || [
    { value: '', label: 'Pilih jenis wisata...' },
    { value: 'packages', label: 'Paket Wisata' },
    { value: 'custom', label: 'Wisata Kustom' },
    { value: 'group', label: 'Wisata Grup' },
    { value: 'private', label: 'Wisata Pribadi' },
    { value: 'adventure', label: 'Wisata Petualangan' },
    { value: 'cultural', label: 'Wisata Budaya' },
    { value: 'general', label: 'Pertanyaan Umum' }
  ]

  const budgetOptions = siteSettings?.contactContent?.budgetOptions || [
    { value: '', label: 'Pilih rentang anggaran...' },
    { value: 'under-5m', label: 'Di bawah 5 Juta IDR' },
    { value: '5-10m', label: '5-10 Juta IDR' },
    { value: '10-20m', label: '10-20 Juta IDR' },
    { value: '20-50m', label: '20-50 Juta IDR' },
    { value: 'over-50m', label: 'Di atas 50 Juta IDR' }
  ]

  return (
    <div id="contact-form">
      <AnimatedSection className={combineClasses(formStyles.container, className)}>
      <div className="mb-6">
        <h2 className={combineClasses(formStyles.title, theme?.colors?.textPrimary)}>{siteSettings?.contactContent?.formTitle || siteSettings?.content?.getInTouchText || 'Hubungi Kami'}</h2>
        <p className={combineClasses(formStyles.subtitle, theme?.colors?.textSecondary)}>{siteSettings?.contactContent?.formDescription || 'Siap merencanakan petualangan Anda? Isi formulir di bawah ini dan kami akan segera menghubungi Anda!'}</p>
      </div>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {siteSettings?.contactContent?.successMessage || 'Barakallohu fiikum atas pesan Anda! Insyaalloh kami akan menghubungi Anda dalam 24 jam.'}
          </div>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {siteSettings?.contactContent?.errorPrefix || 'Kesalahan'}: {errorMessage}
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {siteSettings?.contactContent?.fullNameLabel || 'Full Name'} *
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={siteSettings?.contactContent?.fullNamePlaceholder || 'Your full name'}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {siteSettings?.contactContent?.emailLabel || 'Email Address'} *
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={siteSettings?.contactContent?.emailPlaceholder || 'your.email@example.com'}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {siteSettings?.contactContent?.phoneLabel || 'Phone Number'}
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={siteSettings?.contactContent?.phonePlaceholder || '+6287770005801'}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="tourInterest" className="block text-sm font-medium text-gray-700 mb-2">
              {siteSettings?.contactContent?.tourInterestLabel || 'Tour Interest'}
            </label>
            <select
              id="tourInterest"
              {...register('tourInterest')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.tourInterest ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {tourOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.tourInterest && (
              <p className="mt-1 text-sm text-red-600">{errors.tourInterest.message}</p>
            )}
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-2">
              {siteSettings?.contactContent?.travelDateLabel || 'Preferred Travel Date'}
            </label>
            <input
              type="date"
              id="travelDate"
              {...register('travelDate')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.travelDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.travelDate && (
              <p className="mt-1 text-sm text-red-600">{errors.travelDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">
              {siteSettings?.contactContent?.groupSizeLabel || 'Group Size'}
            </label>
            <input
              type="number"
              id="groupSize"
              min="1"
              max="50"
              {...register('groupSize')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.groupSize ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={siteSettings?.contactContent?.groupSizePlaceholder || 'Jumlah jamaah'}
            />
            {errors.groupSize && (
              <p className="mt-1 text-sm text-red-600">{errors.groupSize.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              {siteSettings?.contactContent?.budgetLabel || 'Budget Range'}
            </label>
            <select
              id="budget"
              {...register('budget')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.budget ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {budgetOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
            )}
          </div>
        </div>

        {/* Subject and Message */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              {siteSettings?.contactContent?.subjectLabel || 'Subject'} *
            </label>
            <span className="text-xs text-gray-500">
              {subjectLength}/100
            </span>
          </div>
          <input
            type="text"
            id="subject"
            {...register('subject')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={siteSettings?.contactContent?.subjectPlaceholder || 'What can we help you with?'}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              {siteSettings?.contactContent?.messageLabel || 'Message'} *
            </label>
            <span className="text-xs text-gray-500">
              {messageLength}/1000
            </span>
          </div>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={siteSettings?.contactContent?.messagePlaceholder || 'Tell us more about your travel plans, preferences, or any questions you have...'}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={combineClasses(
              formStyles.primaryButton,
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : '',
              theme?.buttons?.primaryButton
            )}
          >
            {isSubmitting ? (siteSettings?.contactContent?.submittingText || 'Sending...') : (siteSettings?.contactContent?.submitButtonText || 'Send Message')}
          </motion.button>
        </div>
      </form>
    </AnimatedSection>
    </div>
  )
}