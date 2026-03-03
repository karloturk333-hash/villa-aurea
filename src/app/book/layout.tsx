import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Book Direct — Save 15%',
  description:
    'Book Villa Aurea directly and save 15% vs Booking.com. No commissions, no hidden fees. Best rate guaranteed on luxury apartments in Hvar, Croatia.',
  openGraph: {
    title: 'Book Direct — Save 15% | Villa Aurea Hvar',
    description:
      'Best rate guaranteed. No commissions. Book luxury apartments in Hvar directly.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Book Villa Aurea direct — Hvar, Croatia',
      },
    ],
  },
};

export default function BookLayout({ children }: { children: ReactNode }) {
  return children;
}
