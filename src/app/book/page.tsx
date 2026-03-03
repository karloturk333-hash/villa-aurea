import type { Metadata } from 'next';
import BookingFlow from '@/components/ui/BookingFlow';
import JsonLd from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Book Direct — Save 15%',
  description:
    'Book Villa Aurea directly and save 15% vs Booking.com. No commissions, no hidden fees. Best rate guaranteed on luxury apartments in Hvar, Croatia.',
  openGraph: {
    title: 'Book Direct — Save 15% | Villa Aurea Hvar',
    description: 'Best rate guaranteed. No commissions. Book luxury apartments in Hvar directly.',
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

const bookingLd = {
  '@context': 'https://schema.org',
  '@type': 'ReservationPackage',
  name: 'Direct Booking — Villa Aurea Hvar',
  description: 'Book luxury villa apartments in Hvar, Croatia directly. Best rate guaranteed — 15% cheaper than Booking.com.',
  url: 'https://villa-aurea.com/book',
  provider: {
    '@type': 'LodgingBusiness',
    name: 'Villa Aurea',
    telephone: '+38521742800',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ul. Biskupa Jurja Dubokovića 12',
      addressLocality: 'Hvar',
      postalCode: '21450',
      addressCountry: 'HR',
    },
  },
};

export default function BookPage() {
  return (
    <main>
      <JsonLd data={bookingLd} />

      {/* Header */}
      <section className='bg-[#1A1A2E] pt-32 sm:pt-36 pb-16 sm:pb-20 text-center px-6'>
        <span
          className='text-[11px] tracking-[0.4em] uppercase text-[#C5A55A]'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
        >
          Direct Reservation
        </span>
        <div className='w-12 h-px bg-[#C5A55A] mx-auto mt-4 mb-6' />
        <h1
          className='text-4xl sm:text-5xl lg:text-6xl text-white leading-tight'
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
        >
          Reserve your <em style={{ fontStyle: 'italic' }}>stay</em>
        </h1>
        <p
          className='text-white/50 mt-4 max-w-md mx-auto'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
        >
          Best rate guaranteed. No Booking.com fees. Book in minutes.
        </p>

        {/* Trust signals */}
        <div
          className='flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 text-[#C5A55A]/70 text-[10px] sm:text-xs tracking-widest uppercase'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
        >
          <span>✓ Save 15% vs Booking.com</span>
          <span className='hidden sm:inline'>·</span>
          <span>✓ Instant confirmation</span>
          <span className='hidden sm:inline'>·</span>
          <span>✓ Free cancellation</span>
          <span className='hidden sm:inline'>·</span>
          <span>✓ Secure payment</span>
        </div>
      </section>

      <BookingFlow />
    </main>
  );
}
