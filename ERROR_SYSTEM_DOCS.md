# Error Layout System Documentation

## Overview

The error layout system provides a comprehensive, CMS-integrated solution for handling all types of errors in the Next.js application. It includes customizable error pages, layout options, and content management through Sanity CMS.

## Components

### 1. ErrorLayout Component (`/src/components/ErrorLayout.tsx`)

The main wrapper component that renders error pages with dynamic content from Sanity CMS.

**Props:**
- `errorCode`: `404 | 500 | 403 | 'general'` - The type of error to display
- `title?: string` - Custom title (fallback if CMS data unavailable)
- `subtitle?: string` - Custom subtitle (fallback)
- `description?: string` - Custom description (fallback)
- `showBackButton?: boolean` - Whether to show "Go Back" button (default: true)
- `children?: React.ReactNode` - Additional content to display

**Features:**
- Fetches error content from Sanity CMS
- Responsive design with animations
- Customizable layout (header/footer visibility, background, centering)
- Fallback content when CMS is unavailable
- Development mode error details

### 2. Next.js Error Pages

#### `not-found.tsx` (404 Page)
```tsx
import ErrorLayout from '@/components/ErrorLayout'

export default function NotFound() {
  return <ErrorLayout errorCode={404} />
}
```

#### `error.tsx` (Route-specific Errors)
Handles errors within specific routes with automatic error type detection.

#### `global-error.tsx` (Application-wide Errors)
Handles critical errors that affect the entire application.

#### `loading.tsx` (Loading State)
Provides a consistent loading experience across the application.

## Sanity CMS Integration

### Schema: `errorPages.ts`

The error pages schema includes:

**Layout Settings:**
- `showHeader` - Display website header
- `showFooter` - Display website footer  
- `backgroundColor` - Page background color
- `centerContent` - Center content vertically/horizontally

**Error Types:**
- `error404` - Page Not Found
- `error500` - Internal Server Error
- `error403` - Access Forbidden
- `generalError` - Fallback for other errors

**Each Error Type Includes:**
- `title` - Main heading
- `subtitle` - Secondary heading
- `description` - Detailed explanation
- `image` - Optional error illustration
- `primaryButton` - Main action button (text + link)
- `secondaryButton` - Secondary action button (text + link)

### CMS Structure

The error pages are organized under **Site Settings > Error Pages** in Sanity Studio:

```
Site Settings/
├── Business Information
├── Social Media & Communication  
├── Contact & Site Settings
└── ⚠️ Error Pages
```

## Usage Examples

### Basic Error Page
```tsx
import ErrorLayout from '@/components/ErrorLayout'

export default function CustomErrorPage() {
  return <ErrorLayout errorCode={404} />
}
```

### Error Page with Custom Content
```tsx
import ErrorLayout from '@/components/ErrorLayout'

export default function CustomErrorPage() {
  return (
    <ErrorLayout 
      errorCode="general"
      title="Custom Error"
      subtitle="Something went wrong"
      description="Please try again later"
      showBackButton={false}
    >
      <div className="mt-8">
        <p>Additional custom content here</p>
      </div>
    </ErrorLayout>
  )
}
```

### Error Handling in API Routes
```tsx
import { throwHttpError } from '@/lib/errorUtils'

export async function GET() {
  try {
    // Your API logic here
    const data = await fetchData()
    
    if (!data) {
      throwHttpError(404, 'Data not found')
    }
    
    return Response.json(data)
  } catch (error) {
    throwHttpError(500, 'Failed to fetch data')
  }
}
```

### Custom Error Handling
```tsx
import { getErrorType, formatErrorForLogging } from '@/lib/errorUtils'

function handleError(error: unknown) {
  const errorType = getErrorType(getErrorStatus(error))
  const logData = formatErrorForLogging(error, 'CustomHandler')
  
  console.error('Error occurred:', logData)
  
  // Redirect to appropriate error page
  return <ErrorLayout errorCode={errorType} />
}
```

## Error Utilities (`/src/lib/errorUtils.ts`)

### Functions

- `throwHttpError(status, message)` - Throws HTTP errors with proper status codes
- `getErrorType(errorCode)` - Maps error codes to error types
- `isHttpError(error, status?)` - Checks if error is HTTP error
- `getErrorStatus(error)` - Extracts status code from error
- `formatErrorForLogging(error, context?)` - Formats errors for logging
- `getErrorTitle(errorCode)` - Gets localized error title
- `getErrorDescription(errorCode)` - Gets localized error description

### Custom Error Classes

- `ApiError` - API-related errors with status codes
- `ValidationError` - Form validation errors
- `NotFoundError` - Resource not found errors
- `ForbiddenError` - Access forbidden errors

## Configuration

### Sanity CMS Setup

1. The `errorPages` schema is automatically included in the schema types
2. Error pages are organized under Site Settings in the structure
3. Initial values are provided for all error types in Indonesian
4. Images can be uploaded for visual error illustrations

### Environment Variables

The system respects the following environment variables:
- `NODE_ENV` - Shows detailed error information in development
- `NEXT_PUBLIC_SITE_URL` - Used for canonical URLs and navigation

## Best Practices

### 1. CMS Content Management
- Always provide fallback text in the ErrorLayout component
- Use descriptive, user-friendly error messages
- Include clear action buttons for users
- Test error pages in both development and production

### 2. Error Handling
- Use appropriate HTTP status codes
- Log errors for debugging while keeping user messages friendly
- Provide retry mechanisms where appropriate
- Include contact information for users who need help

### 3. Performance
- Error pages are cached for 1 hour (3600 seconds)
- Images are optimized with Next.js Image component
- Fallback content prevents loading delays

### 4. Accessibility
- Error pages maintain header/footer navigation when enabled
- Clear hierarchy with proper heading structure
- High contrast colors for readability
- Keyboard navigation support

## Monitoring & Analytics

The error system includes:
- Error logging with context and stack traces
- Performance monitoring for error page loads
- Development mode debugging information
- Integration points for external error tracking services

## Future Enhancements

Potential improvements:
- Multi-language support for error messages
- A/B testing for error page designs
- Analytics integration for error tracking
- Custom error page templates
- Auto-retry mechanisms for temporary errors