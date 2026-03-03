import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Luxury Apartments',
  description:
    'Three exceptional luxury apartments at Villa Aurea, Hvar. Panoramic sea views, private jacuzzi, steam bath. Direct booking — save 15% vs Booking.com.',
  alternates: { canonical: 'https://villa-aurea.com/apartments' },
  openGraph: {
    title: 'Luxury Apartments | Villa Aurea Hvar',
    description:
      'Three exceptional apartments with panoramic Adriatic views. Book direct and save 15%.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Villa Aurea apartments — Hvar, Croatia',
      },
    ],
  },
};

export default function ApartmentsLayout({ children }: { children: ReactNode }) {
  return children;
}
