// import { NextResponse } from 'next/server'
// import { sanityFetch, queries } from '@/sanity/lib/client'

// export async function GET() {
//   try {
//     const services = await sanityFetch<any[]>({
//       query: queries.getServicePackages(),
//       tags: ['servicePackage']
//     })

//     return NextResponse.json({
//       success: true,
//       count: services?.length || 0,
//       services: services?.map(service => ({
//         _id: service._id,
//         title: service.title,
//         description: service.description,
//         descriptionType: typeof service.description,
//         descriptionLength: service.description?.length || 0,
//         hasDescription: !!service.description
//       })) || []
//     })
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error'
//     })
//   }
// }