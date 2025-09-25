import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Helper function for fetching data with error handling
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: any
  tags?: string[]
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        tags,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}

// Common GROQ queries for the website
export const queries = {
  // Hero Section - More flexible query
  getHeroSection: (language: string = 'id') => `
    *[_type == "heroSection"][0] {
      _id,
      title,
      subtitle,
      ctaText,
      ctaLink,
      backgroundImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      isActive,
      language
    }
  `,

  // Features Section - More flexible query  
  getFeaturesSection: (language: string = 'id') => `
    *[_type == "featuresSection"] | order(_createdAt desc) [0] {
      _id,
      sectionTitle,
      sectionSubtitle,
      features[] {
        title,
        description,
        icon {
          asset-> {
            _id,
            url
          },
          alt
        },
        link
      },
      isActive,
      language
    }
  `,

  // Testimonials
  getTestimonials: (language: string = 'id', featured: boolean = false) => `
    *[_type == "testimonial" && language == "${language}" && isActive == true ${featured ? '&& isFeatured == true' : ''}] | order(dateOfTour desc) {
      _id,
      customerName,
      customerTitle,
      customerPhoto {
        asset-> {
          _id,
          url
        },
        alt
      },
      testimonialText,
      rating,
      tourPackage,
      dateOfTour,
      isFeatured,
      language
    }
  `,

  // Blog Posts
  getBlogPosts: (language: string = 'id', featured: boolean = false, limit: number = 10) => `
    *[_type == "blogPost" && language == "${language}" && isPublished == true ${featured ? '&& isFeatured == true' : ''}] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      author,
      publishedAt,
      categories,
      tags,
      isFeatured,
      language
    }
  `,

  // Single Blog Post
  getBlogPost: (slug: string, language: string = 'id') => `
    *[_type == "blogPost" && slug.current == "${slug}" && language == "${language}" && isPublished == true][0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      content,
      author,
      publishedAt,
      categories,
      tags,
      seoTitle,
      seoDescription,
      language
    }
  `,

  // Site Settings
  getSiteSettings: () => `
    *[_type == "siteSettings"][0] {
      _id,
      logo {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      logoAlt,
      siteName,
      siteTitle,
      siteDescription,
      contactInfo {
        phone,
        email,
        address,
        whatsapp
      },
      businessHours {
        mondayFriday,
        saturday,
        sunday,
        timezone
      },
      socialMedia {
        instagram,
        facebook,
        youtube,
        twitter
      },
      content {
        tagline,
        ctaText,
        contactCtaText,
        getInTouchText,
        bookNowText
      },
      navigation {
        homeText,
        aboutText,
        servicesText,
        galleryText,
        blogText,
        contactText
      },
      pageContent {
        homePageTitle,
        homePageDescription,
        aboutPageTitle,
        aboutPageDescription,
        servicesPageTitle,
        servicesPageDescription,
        galleryPageTitle,
        galleryPageDescription,
        blogPageTitle,
        blogPageDescription,
        contactPageTitle,
        contactPageDescription
      },
      blogContent {
        blogSectionTitle,
        blogSectionSubtitle,
        readMoreText,
        noBlogPostsTitle,
        noBlogPostsDescription,
        featuredBadgeText,
        publishedText,
        byText,
        categoriesText,
        tagsText,
        shareText,
        relatedPostsTitle
      },
      servicesContent {
        popularServicesTitle,
        popularServicesSubtitle,
        allServicesTitle,
        allServicesSubtitle,
        noServicesTitle,
        noServicesDescription,
        ctaTitle,
        ctaDescription,
        ctaButtonText,
        ctaSecondaryButtonText,
        viewAllText,
        learnMoreText
      },
      contactContent {
        getInTouchTitle,
        whatsappText,
        emailText,
        addressText,
        businessHoursText,
        mondayFridayText,
        saturdayText,
        sundayText,
        timezoneText,
        quickResponseTitle,
        quickResponseDescription,
        averageResponseText,
        chatWhatsappText,
        chatWhatsappDescription,
        chatButtonText
      },
      aboutContent {
        mainTitle,
        subtitle,
        ourStoryTitle,
        ourStoryDescription,
        ourMissionTitle,
        ourMissionDescription,
        whyChooseUsTitle,
        whyChooseUsItems
      },
      formContent {
        ctaMessage,
        successMessage,
        errorMessage
      },
      formFields {
        nameLabel,
        namePlaceholder,
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
        submittingText
      },
      formOptions {
        tourPackagesText,
        customToursText,
        generalInquiryText,
        budgetUnder5M,
        budget5to10M,
        budget10to20M,
        budget20to50M,
        budgetOver50M
      },
      validationMessages {
        nameMinLength,
        emailInvalid,
        phoneInvalid,
        groupSizeRange,
        subjectMinLength,
        messageMinLength
      },
      copyrightText,
      emailTemplates {
        thankYouMessage,
        responseMessage,
        teamSignature
      },
      theme {
        colors {
          primary,
          primaryLight,
          primaryDark,
          secondary,
          accent,
          textPrimary,
          textSecondary,
          background,
          backgroundAlt
        },
        buttons {
          primaryButton,
          secondaryButton,
          outlineButton
        },
        cards {
          defaultCard,
          serviceCard,
          blogCard
        },
        layout {
          container,
          section,
          headerBg,
          footerBg
        }
      }
    }
  `,

  // Service Packages
  getServicePackages: (category?: string) => `
    *[_type == "servicePackage" ${category ? `&& category == "${category}"` : ''}] | order(order asc, _createdAt desc) {
      _id,
      title,
      slug,
      description,
      icon {
        asset-> {
          _id,
          url
        },
        alt
      },
      features,
      price {
        amount,
        currency,
        unit
      },
      category,
      isPopular,
      link,
      order
    }
  `,

  // Popular Service Packages
  getPopularServices: (limit: number = 4) => `
    *[_type == "servicePackage" && isPopular == true] | order(order asc, _createdAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      description,
      icon {
        asset-> {
          _id,
          url
        },
        alt
      },
      features,
      price {
        amount,
        currency,
        unit
      },
      category,
      isPopular,
      link,
      order
    }
  `
}
