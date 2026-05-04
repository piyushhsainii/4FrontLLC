import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = 'https://www.4frontllc.com';
const siteName = '4Front LLC';
const title = '4Front LLC — Roofing Services Built to Last';
const description = 'Reliable roofing for repairs, replacements, new installs, and storm response. Serving homeowners with speed, quality, and long-term protection.';
const imageUrl = `${siteUrl}/4frontmetadata.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    'roofing contractor',
    'roof repair',
    'roof replacement',
    'new roof installation',
    'storm damage roofing',
    'insurance claim roofing',
    '4Front LLC',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,

  // Canonical
  alternates: {
    canonical: siteUrl,
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: `${siteName} — Roofing Services`,
      },
    ],
    locale: 'en_US',
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl],
    creator: '@4frontllc',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans font-light tracking-tighter antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}