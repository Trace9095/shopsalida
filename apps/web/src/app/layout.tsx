import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const APP_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://shopsalida.com'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Shop Salida — Downtown Salida, Colorado Shopping Directory',
    template: '%s | Shop Salida',
  },
  description:
    "Discover Salida's best local shops, art galleries, boutiques, outdoor gear, " +
    "vintage stores, and artisan makers. Colorado's largest Creative District — " +
    'over 100 artists and 50+ arts businesses in walkable downtown Salida, CO.',
  keywords: [
    'Salida shopping',
    'Salida Colorado shops',
    'Salida Creative District',
    'downtown Salida boutiques',
    'Salida art galleries',
    'Colorado creative district',
    'Salida artisan market',
    'Salida outdoor gear',
    'Chaffee County shopping',
    'Arkansas River valley shops',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Shop Salida',
    title: 'Shop Salida — Downtown Salida, Colorado Shopping Directory',
    description:
      "Colorado's largest Creative District. 100+ artists, 50+ galleries, boutiques, outdoor gear, and artisan makers in walkable downtown Salida.",
    url: APP_URL,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Shop Salida' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shopsalida',
    title: 'Shop Salida — Downtown Salida, Colorado',
    description:
      "Colorado's largest Creative District. Discover galleries, boutiques, outdoor gear, and artisan makers.",
    images: [{ url: '/opengraph-image', alt: 'Shop Salida' }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: APP_URL },
}

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        {children}
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
