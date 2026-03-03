import type { Metadata } from 'next';
import GalleryGrid from '@/components/ui/GalleryGrid';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Photo gallery of Villa Aurea — luxury apartments in Hvar, Croatia. Sea views, interiors, terraces, and local scenery.',
  alternates: { canonical: 'https://villa-aurea.com/gallery' },
  openGraph: {
    title: 'Photo Gallery | Villa Aurea Hvar',
    description: 'Explore Villa Aurea through photography — sea views, interiors, terraces, and the beauty of Hvar.',
    images: [{ url: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80', width: 1200, height: 630, alt: 'Villa Aurea gallery' }],
  },
};

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80', alt: 'Hvar Old Town — panoramic view', category: 'local' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', alt: 'Sea view terrace at Villa Aurea', category: 'terrace' },
  { src: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80', alt: 'Royal Suite — private sea view terrace', category: 'terrace' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80', alt: 'Sunset Penthouse master bedroom', category: 'bedroom' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', alt: 'Croatian coastline at dusk', category: 'sea' },
  { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80', alt: 'Mediterranean villa exterior', category: 'exterior' },
  { src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80', alt: 'Luxury bathroom with terrace access', category: 'bathroom' },
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', alt: 'Modern Mediterranean living area', category: 'living' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', alt: 'Terrace dining under the stars', category: 'terrace' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', alt: 'Crystal clear Adriatic sea', category: 'sea' },
  { src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', alt: 'Royal Suite — king bedroom', category: 'bedroom' },
  { src: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80', alt: 'Morning sea view from penthouse', category: 'sea' },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80', alt: 'Wellness — jacuzzi at golden hour', category: 'jacuzzi' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', alt: 'Villa exterior — stone facade', category: 'exterior' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', alt: 'Garden Residence — private terrace', category: 'terrace' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', alt: 'Adriatic island panorama', category: 'sea' },
];

export default function GalleryPage() {
  return (
    <main>
      {/* Header */}
      <section className='bg-[#1A1A2E] pt-36 pb-20 text-center'>
        <span
          className='text-[11px] tracking-[0.4em] uppercase text-[#C5A55A]'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
        >
          Visual Journey
        </span>
        <div className='w-12 h-px bg-[#C5A55A] mx-auto mt-4 mb-6' />
        <h1
          className='text-5xl lg:text-6xl text-white'
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
        >
          The <em style={{ fontStyle: 'italic' }}>Gallery</em>
        </h1>
        <p
          className='text-white/50 mt-4 max-w-md mx-auto'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
        >
          A curated look into Villa Aurea and the world it inhabits
        </p>
      </section>

      {/* Gallery */}
      <GalleryGrid images={galleryImages} />
    </main>
  );
}
