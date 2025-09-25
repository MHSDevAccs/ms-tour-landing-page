'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { sanityFetch } from '@/sanity/lib/client'

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
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  tourInterest: z.string().optional(),
  travelDate: z.string().optional(),
  groupSize: z.string()
    .optional()
    .refine((val) => !val || (parseInt(val) >= 1 && parseInt(val) <= 50), {
      message: 'Group size must be between 1 and 50'
    }),
  budget: z.string().optional()
})

type FormData = z.infer<typeof contactFormSchema>

export default function ContactForm({ className = '', theme }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

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
        throw new Error(errorData.message || 'Failed to submit form')
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
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while submitting the form')
    }
  }

  const tourOptions = siteSettings?.contactContent?.tourOptions || [
    { value: '', label: 'Select tour type...' },
    { value: 'packages', label: 'Tour Packages' },
    { value: 'custom', label: 'Custom Tours' },
    { value: 'group', label: 'Group Tours' },
    { value: 'private', label: 'Private Tours' },
    { value: 'adventure', label: 'Adventure Tours' },
    { value: 'cultural', label: 'Cultural Tours' },
    { value: 'general', label: 'General Inquiry' }
  ]

  const budgetOptions = siteSettings?.contactContent?.budgetOptions || [
    { value: '', label: 'Select budget range...' },
    { value: 'under-5m', label: 'Under 5 Million IDR' },
    { value: '5-10m', label: '5-10 Million IDR' },
    { value: '10-20m', label: '10-20 Million IDR' },
    { value: '20-50m', label: '20-50 Million IDR' },
    { value: 'over-50m', label: 'Over 50 Million IDR' }
  ]

  return (
    <div id="contact-form">
      <AnimatedSection className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold ${theme?.colors?.textPrimary || 'text-black'} mb-2`}>{siteSettings?.contactContent?.formTitle || siteSettings?.content?.getInTouchText || 'Get in Touch'}</h2>
        <p className={theme?.colors?.textSecondary || 'text-gray-600'}>{siteSettings?.contactContent?.formDescription || 'Ready to plan your adventure? Fill out the form below and we\'ll get back to you soon!'}</p>
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
            {siteSettings?.contactContent?.successMessage || 'Thank you for your message! We\'ll get back to you within 24 hours.'}
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
            {siteSettings?.contactContent?.errorPrefix || 'Error'}: {errorMessage}
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
              placeholder={siteSettings?.contactContent?.phonePlaceholder || '+62 811 1000 2477'}
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
              placeholder={siteSettings?.contactContent?.groupSizePlaceholder || 'Number of travelers'}
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
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : theme?.buttons?.primaryButton || 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {isSubmitting ? (siteSettings?.contactContent?.submittingText || 'Sending...') : (siteSettings?.contactContent?.submitButtonText || 'Send Message')}
          </motion.button>
        </div>
      </form>
    </AnimatedSection>
    </div>
  )
}