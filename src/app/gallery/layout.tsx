import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Photo gallery of Villa Aurea — luxury apartments in Hvar, Croatia. Sea views, interiors, terraces, and local scenery.',
  alternates: { canonical: 'https://villa-aurea.com/gallery' },
  openGraph: {
    title: 'Photo Gallery | Villa Aurea Hvar',
    description:
      'Explore Villa Aurea through photography — sea views, interiors, terraces, and the beauty of Hvar.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Villa Aurea gallery',
      },
    ],
  },
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
