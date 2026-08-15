import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { Header } from '@/components/header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = 'https://fourfrontllc.com';
const siteName = 'Four Front LLC';
const title = 'Four Front LLC — Roofing Services Built to Last';
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
    'Four Front LLC'
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

  // Google Search Console verification — replace with your real code once
  // you set up Search Console (Settings > Ownership verification > HTML tag)
  // verification: {
  //   google: 'your-verification-code-here',
  // },
};

// Structured data (JSON-LD) so Google understands this as a local roofing
// business, what it offers, and its review rating. Update the placeholder
// fields marked TODO with your real values.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  '@id': `${siteUrl}/#organization`,
  name: siteName,
  image: imageUrl,
  url: siteUrl,
  telephone: '+1-813-294-5498',
  email: 'operations@fourfrontllc.com',
  priceRange: '$$',
  description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cincinnati', // TODO: confirm your primary city
    addressRegion: 'OH',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 39.1031, // TODO: set to your real service-area center
      longitude: -84.5120,
    },
    geoRadius: '80000', // meters — adjust to your real service radius
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '40',
  },
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Repair' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Replacement' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'New Roof Installation' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Storm Damage Response' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Insurance Claim Assistance' } },
  ],
  sameAs: [
    // TODO: fill in your real profile URLs
    // 'https://www.facebook.com/YOUR_PAGE',
    // 'https://www.bbb.org/YOUR_PROFILE',
    // 'https://www.yelp.com/biz/YOUR_PROFILE',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans font-light tracking-tighter antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}