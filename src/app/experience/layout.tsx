import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'The Experience',
  description:
    'Discover the Villa Aurea experience — wellness, local dining, island exploration, and the magic of Hvar. Your Adriatic story begins here.',
  alternates: { canonical: 'https://villa-aurea.com/experience' },
  openGraph: {
    title: 'The Experience | Villa Aurea Hvar',
    description:
      'Wellness, local dining, island exploration — discover the full Villa Aurea experience in Hvar.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Villa Aurea experience — Hvar, Croatia',
      },
    ],
  },
};

export default function ExperienceLayout({ children }: { children: ReactNode }) {
  return children;
}
