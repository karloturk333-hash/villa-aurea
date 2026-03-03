import type { Metadata } from 'next';
import Link from 'next/link';
import { apartments } from '@/data/villa';

export const metadata: Metadata = {
  title: 'Luxury Apartments',
  description:
    'Three exceptional luxury apartments at Villa Aurea, Hvar. Panoramic sea views, private jacuzzi, steam bath. Direct booking — save 15% vs Booking.com.',
  alternates: { canonical: 'https://villa-aurea.com/apartments' },
  openGraph: {
    title: 'Luxury Apartments | Villa Aurea Hvar',
    description: 'Three exceptional apartments with panoramic Adriatic views. Book direct and save 15%.',
    images: [{ url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', width: 1200, height: 630, alt: 'Villa Aurea apartments — Hvar, Croatia' }],
  },
};

export default function ApartmentsPage() {
  return (
    <main className='pt-0'>
      {/* Hero */}
      <section className='relative h-[60vh] min-h-[400px] overflow-hidden'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1800&q=85'
          alt='Villa Aurea apartments overview'
          className='absolute inset-0 w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/60 to-[#1A1A2E]/40' />
        <div className='relative h-full flex flex-col items-center justify-center text-center px-6'>
          <span
            className='text-[11px] tracking-[0.4em] uppercase text-[#C5A55A] mb-4'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
          >
            Accommodations
          </span>
          <h1
            className='text-5xl sm:text-6xl lg:text-7xl text-white leading-tight'
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            Our <em style={{ fontStyle: 'italic' }}>Apartments</em>
          </h1>
          <p
            className='text-white/60 mt-4 max-w-md text-lg'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
          >
            Three curated spaces. One extraordinary address.
          </p>
        </div>
      </section>

      {/* Apartments list */}
      <section className='py-24 bg-[#FAF7F2]'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='space-y-24'>
            {apartments.map((apt, i) => (
              <article key={apt.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:grid-flow-row-dense' : ''}`}>
                {/* Image */}
                <div className={`relative overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={apt.image}
                    alt={apt.name}
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute top-5 left-5 bg-[#1A1A2E]/80 backdrop-blur-sm px-4 py-2'>
                    <p
                      className='text-[#C5A55A] text-xs tracking-widest uppercase'
                      style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
                    >
                      From €{apt.priceFrom}/night
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <span
                    className='text-[11px] tracking-[0.3em] uppercase text-[#C5A55A]'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
                  >
                    {apt.floor}
                  </span>
                  <div className='w-10 h-px bg-[#C5A55A] mt-3 mb-5' />
                  <h2
                    className='text-4xl lg:text-5xl text-[#1A1A2E] mb-6 leading-tight'
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                  >
                    {apt.name}
                  </h2>

                  <p
                    className='text-[#8A8580] leading-relaxed mb-8'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    {apt.description}
                  </p>

                  {/* Specs */}
                  <div className='grid grid-cols-3 gap-6 mb-8 py-6 border-t border-b border-[#E8E0D4]'>
                    <div>
                      <p className='text-2xl text-[#1A1A2E]' style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {apt.guests.max}
                      </p>
                      <p className='text-xs tracking-wider text-[#8A8580] uppercase mt-1' style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>Guests max</p>
                    </div>
                    <div>
                      <p className='text-2xl text-[#1A1A2E]' style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {apt.size}m²
                      </p>
                      <p className='text-xs tracking-wider text-[#8A8580] uppercase mt-1' style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>Living area</p>
                    </div>
                    <div>
                      <p className='text-2xl text-[#1A1A2E]' style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {apt.bathrooms}
                      </p>
                      <p className='text-xs tracking-wider text-[#8A8580] uppercase mt-1' style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>Bathrooms</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className='space-y-2 mb-10'>
                    {apt.highlights.map((h) => (
                      <li key={h} className='flex items-center gap-3 text-sm text-[#2D2D2D]' style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}>
                        <span className='text-[#C5A55A] text-xs'>◈</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/apartments/${apt.slug}`}
                    className='inline-block px-10 py-4 bg-[#1A1A2E] text-white text-sm tracking-[0.2em] uppercase hover:bg-[#C5A55A] transition-all duration-300'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
                  >
                    View Apartment
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className='py-20 bg-[#1A1A2E] text-center'>
        <p
          className='text-white/50 text-sm tracking-widest uppercase mb-4'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
        >
          Ready to stay?
        </p>
        <h2
          className='text-4xl text-white mb-8'
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
        >
          Book direct and <em style={{ fontStyle: 'italic', color: '#C5A55A' }}>save 15%</em>
        </h2>
        <Link
          href='/book'
          className='inline-block px-12 py-4 bg-[#C5A55A] text-white text-sm tracking-[0.2em] uppercase hover:bg-[#D4B96E] transition-all duration-300'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
        >
          Check Availability
        </Link>
      </section>
    </main>
  );
}
