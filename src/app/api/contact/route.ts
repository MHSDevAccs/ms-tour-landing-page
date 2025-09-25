import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { client } from '@/sanity/lib/client'

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

// Rate limiting function
function rateLimit(ip: string, limit: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now }

  // Reset count if window has passed
  if (now - userLimit.lastReset > windowMs) {
    userLimit.count = 0
    userLimit.lastReset = now
  }

  // Check if limit exceeded
  if (userLimit.count >= limit) {
    return false
  }

  // Increment count
  userLimit.count++
  rateLimitMap.set(ip, userLimit)
  return true
}

// Enhanced validation schema matching frontend
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

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Too many requests',
          message: 'Please wait before submitting another form. Limit: 5 requests per 15 minutes.'
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          message: 'Please check your form data',
          details: validationResult.error.issues
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Get client IP and user agent
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Prepare the document for Sanity
    const contactDoc = {
      _type: 'contactSubmission',
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || '',
      subject: validatedData.subject,
      message: validatedData.message,
      tourInterest: validatedData.tourInterest || '',
      travelDate: validatedData.travelDate || null,
      groupSize: validatedData.groupSize ? parseInt(validatedData.groupSize) : null,
      budget: validatedData.budget || '',
      status: 'new',
      submittedAt: new Date().toISOString(),
      ipAddress: ip,
      userAgent: userAgent
    }

    // Create the document in Sanity
    const result = await client.create(contactDoc)

    // Send email notification
    await sendEmailNotification(contactDoc)

    return NextResponse.json(
      { 
        success: true, 
        message: `Terima kasih ${validatedData.name}! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.`,
        id: result._id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    // Return different error messages based on error type
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error',
          message: 'Please check your form data',
          details: error.issues
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'We are experiencing technical difficulties. Please try again later or contact us directly.'
      },
      { status: 500 }
    )
  }
}

// Handle GET requests (method not allowed)
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

// Email notification function
async function sendEmailNotification(contactDoc: any) {
  try {
    // Skip email sending if environment variables are not configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('SMTP not configured. Contact form data saved to CMS only.')
      console.log('New contact form submission:', {
        name: contactDoc.name,
        email: contactDoc.email,
        subject: contactDoc.subject
      })
      return
    }

    // Fetch site settings for email content
    const siteSettings = await client.fetch(`
      *[_type == "siteSettings"][0] {
        siteName,
        contactInfo {
          email,
          whatsapp
        },
        content {
          tagline
        },
        emailTemplates {
          thankYouMessage,
          responseMessage,
          teamSignature
        }
      }
    `)

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email to business owner
    const siteName = siteSettings?.siteName || 'Mahabbatussholihin Tour & Travel'
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          <p style="color: #f0f8ff; margin: 10px 0 0 0;">${siteName}</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td><td style="padding: 8px 0;">${contactDoc.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${contactDoc.email}" style="color: var(--primary);">${contactDoc.email}</a></td></tr>
              ${contactDoc.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${contactDoc.phone}" style="color: var(--primary);">${contactDoc.phone}</a></td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Subject:</td><td style="padding: 8px 0;">${contactDoc.subject}</td></tr>
            </table>
          </div>

          ${contactDoc.tourInterest || contactDoc.travelDate || contactDoc.groupSize || contactDoc.budget ? `
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Trip Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${contactDoc.tourInterest ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Tour Interest:</td><td style="padding: 8px 0;">${contactDoc.tourInterest}</td></tr>` : ''}
          ${contactDoc.travelDate ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Travel Date:</td><td style="padding: 8px 0;">${contactDoc.travelDate}</td></tr>` : ''}
          ${contactDoc.groupSize ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Group Size:</td><td style="padding: 8px 0;">${contactDoc.groupSize} travelers</td></tr>` : ''}
          ${contactDoc.budget ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Budget:</td><td style="padding: 8px 0;">${contactDoc.budget}</td></tr>` : ''}
        </table>
        
            </table>
          </div>
          ` : ''}

          ${contactDoc.message ? `
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid var(--primary);">
              <p style="margin: 0; white-space: pre-wrap;">${contactDoc.message}</p>
            </div>
          </div>
          ` : ''}
        </div>
      
      <div style="padding: 20px; text-align: center; background: #333; color: #ccc;">
          <p style="margin: 0; font-size: 14px;">Submitted at: ${new Date(contactDoc.submittedAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</p>
        </div>
      </div>
    `

    // Send email to business
    await transporter.sendMail({
      from: `"${siteName} Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form: ${contactDoc.subject}`,
      html: businessEmailHtml,
    })

    // Auto-reply to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Terima Kasih!</h1>
          <p style="color: #f0f8ff; margin: 10px 0 0 0;">Thank You for Contacting Us</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <div style="background: white; padding: 25px; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Halo ${contactDoc.name},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              ${siteSettings?.emailTemplates?.thankYouMessage || `Terima kasih telah menghubungi ${siteName}.`} 
              Kami telah menerima pesan Anda dengan subject "<em>${contactDoc.subject}</em>".
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              ${siteSettings?.emailTemplates?.responseMessage || 'Kami akan segera merespons pertanyaan Anda dalam waktu 24 jam.'}
            </p>
            
            <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary); margin: 20px 0;">
              <p style="margin: 0; color: #555;">
                <strong>Untuk pertanyaan urgent:</strong><br>
                ${siteSettings?.contactInfo?.whatsapp ? `📱 WhatsApp: <a href="https://wa.me/${siteSettings.contactInfo.whatsapp.replace(/[^0-9]/g, '')}" style="color: var(--primary);">${siteSettings.contactInfo.whatsapp}</a><br>` : ''}
                ${siteSettings?.contactInfo?.email ? `📧 Email: <a href="mailto:${siteSettings.contactInfo.email}" style="color: var(--primary);">${siteSettings.contactInfo.email}</a>` : ''}
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 0;">
              Salam hangat,<br>
              <strong>${siteSettings?.emailTemplates?.teamSignature || `Team ${siteName}`}</strong><br>
              <em>${siteSettings?.content?.tagline || 'Mitra Terpercaya untuk Perjalanan Spiritual Terbaik'}</em>
            </p>
          </div>
        </div>
        
        <div style="padding: 20px; text-align: center; background: #333; color: #ccc;">
          <p style="margin: 0; font-size: 14px;">© 2025 ${siteName}</p>
        </div>
      </div>
    `

    // Send auto-reply to customer
    await transporter.sendMail({
      from: `"${siteName}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: contactDoc.email,
      subject: `Terima kasih atas pesan Anda - ${contactDoc.subject}`,
      html: customerEmailHtml,
    })

    console.log('Email notifications sent successfully')

  } catch (error) {
    console.error('Failed to send email notification:', error)
    // Don't throw error - form submission should still succeed
  }
}