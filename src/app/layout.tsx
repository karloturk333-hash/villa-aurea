import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import PageTransition from '@/components/providers/PageTransition';

const OG_IMAGE = 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80';

export const metadata: Metadata = {
  metadataBase: new URL('https://villa-aurea.com'),
  title: {
    default: 'Villa Aurea — Luxury Apartments in Hvar, Croatia',
    template: '%s | Villa Aurea Hvar',
  },
  description:
    'Experience the finest luxury villa on the island of Hvar. Direct booking — save 15% versus Booking.com. Private jacuzzi, panoramic sea views, 100m to beach.',
  keywords: [
    'villa hvar',
    'luxury apartments hvar',
    'croatia villa rental',
    'adriatic sea view villa',
    'hvar direct booking',
    'villa aurea',
    'private jacuzzi hvar',
    'hvar accommodation',
    'dalmatian coast villa',
    'book villa direct hvar',
  ],
  authors: [{ name: 'Villa Aurea', url: 'https://villa-aurea.com' }],
  creator: 'Villa Aurea',
  alternates: {
    canonical: 'https://villa-aurea.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://villa-aurea.com',
    siteName: 'Villa Aurea Hvar',
    title: 'Villa Aurea — Luxury Apartments in Hvar, Croatia',
    description:
      'Where golden light meets the Adriatic. Direct-booking luxury villa on the island of Hvar.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Villa Aurea — Luxury Villa in Hvar, Croatia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Aurea — Luxury Apartments in Hvar, Croatia',
    description: 'Where golden light meets the Adriatic.',
    images: [OG_IMAGE],
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
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body>
        <SmoothScrollProvider>
          <Navigation />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
