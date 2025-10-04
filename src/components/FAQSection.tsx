// 'use client'

// import React, { useState } from 'react'
// import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
// import { generateFAQJsonLd } from '@/lib/jsonLd'

// interface FAQItem {
//   question: string
//   answer: string
//   category?: string
// }

// interface FAQSectionProps {
//   faqs?: FAQItem[]
//   title?: string
//   subtitle?: string
//   showStructuredData?: boolean
// }

// const defaultFAQs: FAQItem[] = [
//   {
//     question: "Bagaimana cara booking paket tour di Mahabbatussholihin Tour & Travel?",
//     answer: "Anda dapat booking melalui WhatsApp, telepon, atau mengunjungi kantor kami. Tim customer service akan membantu memilih paket yang sesuai dengan kebutuhan dan budget Anda. Proses booking mudah dengan sistem pembayaran yang fleksibel.",
//     category: "booking"
//   },
//   {
//     question: "Apakah tersedia paket tour untuk keluarga dengan anak-anak?",
//     answer: "Ya, kami menyediakan paket family-friendly dengan fasilitas dan itinerary yang cocok untuk anak-anak. Termasuk pemilihan hotel dengan fasilitas ramah keluarga, transportasi yang nyaman, dan aktivitas yang sesuai untuk segala usia.",
//     category: "family"
//   },
//   {
//     question: "Bagaimana jika terjadi pembatalan trip mendadak?",
//     answer: "Kami memiliki kebijakan pembatalan yang fleksibel. Tergantung waktu pembatalan, biaya yang sudah dibayar dapat di-refund atau dijadwalkan ulang. Tim kami akan membantu menangani situasi force majeure dengan solusi terbaik.",
//     category: "cancellation"
//   },
//   {
//     question: "Apakah guide lokal disediakan di setiap destinasi?",
//     answer: "Ya, kami bekerja sama dengan guide lokal berpengalaman di setiap destinasi. Guide kami berlisensi, menguasai bahasa Indonesia dengan baik, dan memiliki pengetahuan mendalam tentang sejarah, budaya, dan tempat menarik di lokasi wisata.",
//     category: "guide"
//   },
//   {
//     question: "Bagaimana sistem pembayaran untuk paket tour?",
//     answer: "Kami menyediakan sistem pembayaran yang fleksibel: DP minimum 30%, pelunasan bisa dicicil, transfer bank, kartu kredit, atau cash. Untuk paket premium, tersedia juga opsi pembayaran 0% dengan syarat dan ketentuan berlaku.",
//     category: "payment"
//   },
//   {
//     question: "Apakah asuransi perjalanan sudah termasuk dalam paket?",
//     answer: "Untuk paket tertentu, asuransi perjalanan sudah termasuk. Namun kami juga menyediakan opsi upgrade asuransi comprehensive yang mencakup medical, baggage, trip cancellation, dan emergency evacuation dengan coverage lebih luas.",
//     category: "insurance"
//   }
// ]

// export default function FAQSection({ 
//   faqs = defaultFAQs, 
//   title = "Frequently Asked Questions",
//   subtitle = "Pertanyaan yang sering diajukan tentang layanan kami",
//   showStructuredData = true 
// }: FAQSectionProps) {
//   const [openItems, setOpenItems] = useState<number[]>([])

//   const toggleItem = (index: number) => {
//     setOpenItems(prev => 
//       prev.includes(index) 
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     )
//   }

//   const faqJsonLd = showStructuredData ? generateFAQJsonLd(faqs) : null

//   return (
//     <section className="py-16 bg-white">
//       {/* Structured Data */}
//       {faqJsonLd && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
//         />
//       )}
      
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             {title}
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             {subtitle}
//           </p>
//         </div>

//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div 
//               key={index}
//               className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <button
//                 onClick={() => toggleItem(index)}
//                 className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
//                 aria-expanded={openItems.includes(index)}
//               >
//                 <span className="font-semibold text-gray-900 pr-4">
//                   {faq.question}
//                 </span>
//                 {openItems.includes(index) ? (
//                   <ChevronUpIcon className="h-5 w-5 text-primary flex-shrink-0" />
//                 ) : (
//                   <ChevronDownIcon className="h-5 w-5 text-primary flex-shrink-0" />
//                 )}
//               </button>
              
//               {openItems.includes(index) && (
//                 <div className="px-6 py-4 bg-white border-t border-gray-200">
//                   <p className="text-gray-700 leading-relaxed">
//                     {faq.answer}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="mt-12 text-center">
//           <p className="text-gray-600 mb-4">
//             Masih ada pertanyaan lain?
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="https://wa.me/6287770005801"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
//             >
//               WhatsApp Kami
//             </a>
//             <a
//               href="/contact"
//               className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-white hover:bg-primary hover:text-white transition-colors duration-200"
//             >
//               Hubungi Tim Support
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // Export FAQ data for reuse
// export { defaultFAQs }
// export type { FAQItem }