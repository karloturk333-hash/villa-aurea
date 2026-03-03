import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Experience',
  description:
    'Discover the Villa Aurea experience — wellness, local dining, island exploration, and the magic of Hvar. Your Adriatic story begins here.',
  alternates: { canonical: 'https://villa-aurea.com/experience' },
  openGraph: {
    title: 'The Experience | Villa Aurea Hvar',
    description: 'Wellness, local dining, island exploration — discover the full Villa Aurea experience in Hvar.',
    images: [{ url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', width: 1200, height: 630, alt: 'Villa Aurea experience — Hvar, Croatia' }],
  },
};

const sections = [
  {
    label: 'Wellness',
    title: 'The art of doing nothing',
    body: 'A private jacuzzi with views that stretch to Italy on clear days. A steam bath that conjures the ancient Roman tradition of bathing as ritual. A terrace where you can sit for hours and feel the day slow around you. Villa Aurea was designed for the kind of rest that actually restores you.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=85',
    items: ['Private jacuzzi on terrace', 'Aromatic steam bath', 'Sea-view sun terraces', 'Full kitchen for slow mornings'],
  },
  {
    label: 'Local Dining',
    title: 'Eat like an islander',
    body: "Hvar's dining scene punches far above its weight. From the harbour restaurants where the catch comes in that morning, to the konobas hidden in olive groves, to the 5-star rooftop bars with views to the islands — the island feeds you well. We'll share our favourites.",
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85',
    items: ['Fresh Adriatic seafood', 'Plavac Mali & Bogdanuša wines', 'Lavender liqueur & local honey', 'Sunset terrace dining at Villa Aurea'],
  },
  {
    label: 'Island Exploration',
    title: 'Hvar is a world',
    body: 'The 14th-century fortress above town. The Pakleni islands — a chain of pine-covered islets perfect for swimming, snorkelling, and losing track of time. Lavender fields that turn the island purple in June. Hidden coves reachable only by boat or foot. Hvar rewards the curious.',
    image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=1400&q=85',
    items: ['Pakleni Islands day trips', 'Historic Hvar Fortress', 'Lavender fields (June)', 'Hidden swimming coves'],
  },
  {
    label: 'Getting Here',
    title: 'The journey is part of it',
    body: 'Fly to Split (SPU) — served by most major European carriers. From Split Airport, a catamaran takes you directly to Hvar Town in under an hour. Step off the boat and Villa Aurea is an 8-minute walk. We can also arrange private water taxis from Split if you prefer to arrive in style.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85',
    items: ['Split Airport: 1h 20min total', 'Direct catamaran to Hvar Town', 'Villa: 8 min walk from ferry', 'Private transfer available'],
  },
];

export default function ExperiencePage() {
  return (
    <main>
      {/* Hero */}
      <section className='relative h-[70vh] min-h-[500px] overflow-hidden'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://images.unsplash.com/photo-1555990793-da11153b2473?w=2000&q=85'
          alt='Hvar island at sunset'
          className='absolute inset-0 w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/50 to-[#1A1A2E]/60' />
        <div className='relative h-full flex flex-col items-center justify-center text-center px-6'>
          <span
            className='text-[11px] tracking-[0.4em] uppercase text-[#C5A55A] mb-4'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
          >
            The Full Picture
          </span>
          <h1
            className='text-5xl sm:text-6xl lg:text-7xl text-white leading-tight'
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            The <em style={{ fontStyle: 'italic', color: '#C5A55A' }}>Experience</em>
          </h1>
          <p
            className='text-white/60 mt-4 max-w-lg text-lg leading-relaxed'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
          >
            What awaits you in Hvar — inside the villa and beyond.
          </p>
        </div>
      </section>

      {/* Editorial sections */}
      {sections.map((s, i) => (
        <section
          key={s.label}
          className={`py-24 lg:py-32 ${i % 2 === 0 ? 'bg-[#FAF7F2]' : 'bg-[#E8E0D4]'}`}
        >
          <div className='max-w-7xl mx-auto px-6'>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${i % 2 === 1 ? '' : ''}`}>
              {/* Image */}
              <div className={`relative overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                />
                <div className='absolute top-5 left-5 w-8 h-8 border-t border-l border-[#C5A55A]/60' />
                <div className='absolute bottom-5 right-5 w-8 h-8 border-b border-r border-[#C5A55A]/60' />
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <span
                  className='text-[11px] tracking-[0.35em] uppercase text-[#C5A55A]'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
                >
                  {s.label}
                </span>
                <div className='w-10 h-px bg-[#C5A55A] mt-4 mb-5' />
                <h2
                  className='text-4xl lg:text-5xl text-[#1A1A2E] leading-tight mb-6'
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                >
                  {s.title}
                </h2>
                <p
                  className='text-[#8A8580] leading-relaxed mb-8'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                >
                  {s.body}
                </p>
                <ul className='space-y-2.5'>
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className='flex items-center gap-3 text-sm text-[#2D2D2D]'
                      style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                    >
                      <span className='text-[#C5A55A] text-xs flex-shrink-0'>◈</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className='py-20 bg-[#1A1A2E] text-center'>
        <h2
          className='text-4xl text-white mb-3'
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
        >
          Ready to <em style={{ fontStyle: 'italic', color: '#C5A55A' }}>live it</em>?
        </h2>
        <p
          className='text-white/50 mb-8'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
        >
          The experience you've been reading about — it's just a booking away.
        </p>
        <Link
          href='/book'
          className='inline-block px-12 py-4 bg-[#C5A55A] text-white text-sm tracking-[0.2em] uppercase hover:bg-[#D4B96E] transition-all duration-300'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
        >
          Reserve Your Stay
        </Link>
      </section>
    </main>
  );
}
