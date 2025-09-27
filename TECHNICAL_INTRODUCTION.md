# Technical Introduction - Mahabbatussholihin Tour & Travel Website

## Project Overview
Modern Next.js web application for a travel agency specializing in religious tourism (Hajj/Umrah) and general travel services. Built with TypeScript, Tailwind CSS, and Sanity CMS for comprehensive content management.

## Technology Stack

### Core Framework
- **Next.js 14.2.4+** with App Router architecture
- **TypeScript 5.5.2** for type safety and development experience
- **React 18.3.1** for UI components and state management

### Styling & UI
- **Tailwind CSS 4** for utility-first styling
- **Framer Motion 12.23.13** for animations and transitions
- **Headless UI 2.2.8** for accessible UI components
- **Heroicons 2.2.0** and **Lucide React 0.544.0** for icons

### Content Management
- **Sanity CMS 4.10.0** for headless content management
- **Next-Sanity 11.1.3** for Next.js integration
- **Sanity Vision 4.10.0** for GROQ query testing

### Forms & Validation
- **React Hook Form 7.63.0** for form management
- **Zod 4.1.9** for schema validation
- **Hookform Resolvers 5.2.2** for validation integration

### Development Tools
- **ESLint 8.57.0** with Next.js and Prettier configurations
- **Prettier 3.6.2** with Tailwind CSS plugin
- **Husky 9.1.7** and **Lint-staged 16.1.6** for Git hooks

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   └── contact/       # Contact form submission
│   ├── blog/              # Blog pages with dynamic routing
│   │   └── [slug]/        # Individual blog posts
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery pages
│   │   └── [slug]/        # Individual gallery items
│   ├── services/          # Services page
│   ├── studio/            # Sanity Studio integration
│   │   └── [[...tool]]/   # Dynamic Sanity Studio routes
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and CSS variables
├── components/            # Reusable React components
│   ├── AnimatedSection.tsx      # Animation wrapper components
│   ├── BlogCard.tsx            # Blog post display
│   ├── BlogCategoryFilter.tsx  # Blog filtering
│   ├── BlogPagination.tsx      # Blog pagination
│   ├── BlogSearch.tsx          # Blog search functionality
│   ├── ContactForm.tsx         # Contact form with validation
│   ├── FeaturesSection.tsx     # Features display
│   ├── Footer.tsx              # Site footer (recently modified)
│   ├── GalleryGrid.tsx         # Gallery display
│   ├── Header.tsx              # Navigation and branding
│   ├── Lightbox.tsx            # Image lightbox
│   ├── ReadingProgress.tsx     # Blog reading progress
│   ├── ServiceCard.tsx         # Service display cards
│   ├── ShareButton.tsx         # Social sharing
│   ├── SocialSharing.tsx       # Social media integration
│   ├── TestimonialsCarousel.tsx # Testimonials slider
│   ├── TestimonialsSection.tsx  # Testimonials display
│   └── WhatsAppFloat.tsx       # Floating WhatsApp button
├── layouts/
│   └── MainLayout.tsx     # Main layout wrapper
├── lib/                   # Utility libraries and services
│   ├── blogService.ts     # Blog data fetching
│   ├── cms-styles.ts      # CMS styling utilities
│   ├── galleryService.ts  # Gallery data fetching
│   ├── jsonLd.ts          # SEO structured data
│   └── testimonialService.ts # Testimonials data
├── sanity/                # Sanity CMS configuration
│   ├── env.ts             # Environment variables
│   ├── lib/               # Sanity utilities
│   │   ├── client.ts      # Sanity client and queries
│   │   ├── image.ts       # Image URL generation
│   │   ├── imageGuidelines.ts # Image optimization
│   │   └── live.ts        # Live preview
│   ├── schemaTypes/       # Content schemas
│   │   ├── blogPost.ts    # Blog post schema
│   │   ├── businessInfo.ts # Business information
│   │   ├── contactSubmission.ts # Contact form submissions
│   │   ├── contentSettings.ts # Content configuration
│   │   ├── featuresSection.ts # Features schema
│   │   ├── gallery.ts     # Gallery schema
│   │   ├── galleryCategory.ts # Gallery categories
│   │   ├── heroSection.ts # Hero section schema
│   │   ├── servicePackage.ts # Service packages
│   │   ├── siteSettings.ts # Site configuration
│   │   ├── socialSettings.ts # Social media settings
│   │   ├── testimonial.ts # Testimonials schema
│   │   ├── themeSettings.ts # Theme configuration
│   │   └── index.ts       # Schema exports
│   └── structure.ts       # Sanity Studio structure
├── types/                 # TypeScript definitions
│   ├── blog.ts           # Blog type definitions
│   ├── gallery.ts        # Gallery type definitions
│   └── testimonial.ts    # Testimonial type definitions
└── utils/                # Helper functions
```

## Key Features & Components

### Content Management System
- **Sanity Studio** integrated at `/studio` route
- **GROQ queries** for efficient data fetching
- **Live preview** capabilities for content editing
- **Multi-language support** (Indonesian primary)
- **Image optimization** through Sanity CDN

### Page Architecture
- **Homepage**: Hero section, features, testimonials, blog preview
- **About**: Company information and mission
- **Services**: Tour packages and service offerings
- **Gallery**: Image galleries with categories and lightbox
- **Blog**: Articles with search, filtering, and pagination
- **Contact**: Contact form with validation and WhatsApp integration

### UI/UX Features
- **Responsive design** with mobile-first approach
- **Smooth animations** using Framer Motion
- **Accessible components** with Headless UI
- **SEO optimization** with structured data
- **Performance optimization** with Next.js features

## Environment Configuration

### Required Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="piwmx6fh"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="[API_TOKEN]"
```

### Development Setup
1. `npm install` - Install all dependencies
2. `npm run dev` - Start development server (port 3000)
3. `npm run build` - Build for production
4. `npm run start` - Start production server
5. `npm run lint` - Run ESLint checks

## Design System & Styling

### Color Palette
```css
--primary: #39ace7        /* Main brand blue */
--primary-light: #9bd4e4  /* Light blue variant */
--primary-lighter: #cadeef /* Lightest blue */
--primary-dark: #0784b5   /* Dark blue variant */
--secondary: #ffffff      /* White */
--accent: #9bd4e4        /* Accent color */
```

### Component Styling Patterns
- **Buttons**: `bg-accent text-primary-dark hover:bg-primary-light`
- **Cards**: Consistent padding and border radius
- **Responsive**: Mobile-first with Tailwind breakpoints
- **Typography**: Poppins font family with weight variations

## Data Flow & Architecture

### Content Fetching
1. **Sanity Client** configured with project credentials
2. **GROQ Queries** defined in `client.ts` for different content types
3. **Error Handling** with try-catch blocks and fallbacks
4. **Caching Strategy** using Next.js revalidation

### Form Handling
1. **React Hook Form** for form state management
2. **Zod Schemas** for validation rules
3. **API Routes** for form submission processing
4. **Email Integration** with Nodemailer

### State Management
- **React State** for component-level state
- **URL State** for search and filtering
- **CMS State** managed through Sanity

## Performance Optimizations

### Next.js Features
- **App Router** for improved performance
- **Image Optimization** with next/image
- **Dynamic Imports** for code splitting
- **Static Generation** where applicable

### Sanity Optimizations
- **CDN Integration** for image delivery
- **Query Optimization** with specific field selection
- **Caching Strategy** with revalidation tags

## Development Workflow

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Git Hooks** with Husky for pre-commit checks

### Build Process
- **Next.js Build** with optimization
- **Tailwind CSS** compilation
- **TypeScript** compilation
- **Asset Optimization**

## Current Status (Latest Updates)

### Recent Modifications
- **Button Styling**: Standardized with accent colors across all pages
- **Mobile Responsiveness**: Optimized button sizes for mobile devices
- **Footer Simplification**: Removed "Layanan Kami" section, updated to 3-column layout
- **UI Simplification**: Converted complex div sections to plain text on gallery pages
- **Development Server**: Running on port 3000 (configured in package.json)

### Modified Files
- `src/app/page.tsx` - Hero section button optimization
- `src/app/gallery/page.tsx` - Tip section simplification
- `src/app/gallery/[slug]/page.tsx` - Related tour package simplification
- `src/components/Footer.tsx` - Services section removal and layout update

## API Integration

### Contact Form API
- **Route**: `/api/contact`
- **Method**: POST
- **Validation**: Zod schema validation
- **Email**: Nodemailer integration
- **Storage**: Sanity CMS for submissions

### Sanity API
- **Client**: Configured for production dataset
- **Queries**: Comprehensive GROQ queries for all content types
- **Images**: URL generation with optimization parameters

## Security Considerations

### Environment Variables
- **API Tokens** stored securely in environment variables
- **Client-side Variables** prefixed with `NEXT_PUBLIC_`
- **Production Secrets** managed separately

### Form Security
- **Input Validation** with Zod schemas
- **CSRF Protection** through Next.js
- **Rate Limiting** considerations for contact forms

## Deployment Considerations

### Build Requirements
- **Node.js** version compatibility
- **Environment Variables** configuration
- **Sanity Project** access and permissions
- **Image Optimization** CDN setup

### Performance Monitoring
- **Core Web Vitals** optimization
- **Bundle Size** monitoring
- **API Response Times** tracking

## Maintenance Guidelines

### Content Updates
- **Sanity Studio** for non-technical content editing
- **Schema Updates** require developer intervention
- **Image Guidelines** for optimal performance

### Code Maintenance
- **Dependency Updates** with testing
- **Security Patches** regular application
- **Performance Monitoring** and optimization

## Notes for AI Agents

### Development Approach
- **TypeScript First**: Always use TypeScript for new development
- **Component Patterns**: Follow existing component structure and naming
- **Styling Consistency**: Use established Tailwind classes and color variables
- **Mobile Responsiveness**: Test on both mobile and desktop viewports

### Content Management
- **Sanity Integration**: Understand schema relationships and query patterns
- **Image Handling**: Use Sanity CDN for all images with proper optimization
- **Multi-language**: Consider Indonesian as primary language for content

### Testing Strategy
- **Manual Testing**: Check both mobile and desktop layouts
- **Form Testing**: Validate all form submissions and error states
- **Performance**: Monitor build times and bundle sizes
- **Accessibility**: Ensure components meet accessibility standards

### Common Patterns
- **Data Fetching**: Use `sanityFetch` wrapper with error handling
- **Styling**: Follow established button and card patterns
- **Animation**: Use Framer Motion for consistent animations
- **SEO**: Include proper metadata and structured data