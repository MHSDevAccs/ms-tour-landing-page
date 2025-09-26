import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "../layouts/MainLayout";
import { headers } from "next/headers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda",
    template: "%s | Mahabbatussholihin Tour & Travel"
  },
  description: "Jelajahi dunia bersama Mahabbatussholihin Tour & Travel - Mitra terpercaya Anda untuk pengalaman perjalanan yang tak terlupakan. Temukan destinasi menakjubkan dengan paket wisata yang dirancang ahli.",
  keywords: ["tour", "travel", "vacation", "holiday", "tourism", "Indonesia", "travel agency", "tour packages"],
  authors: [{ name: "Mahabbatussholihin Tour & Travel" }],
  creator: "Mahabbatussholihin Tour & Travel",
  publisher: "Mahabbatussholihin Tour & Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mhstour.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda",
    description: "Jelajahi dunia bersama Mahabbatussholihin Tour & Travel - Mitra terpercaya Anda untuk pengalaman perjalanan yang tak terlupakan.",
    url: 'https://mhstour.com',
    siteName: 'Mahabbatussholihin Tour & Travel',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mahabbatussholihin Tour & Travel - Mitra Perjalanan Terpercaya Anda",
    description: "Jelajahi dunia bersama Mahabbatussholihin Tour & Travel - Mitra terpercaya Anda untuk pengalaman perjalanan yang tak terlupakan.",
    creator: '@mhstour',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const isStudioRoute = pathname.startsWith('/studio');

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        {isStudioRoute ? children : <MainLayout>{children}</MainLayout>}
      </body>
    </html>
  );
}
