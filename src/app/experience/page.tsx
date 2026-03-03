'use client';

import Link from 'next/link';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import ParallaxImage from '@/components/animations/ParallaxImage';
import MagneticButton from '@/components/animations/MagneticButton';
import { STAGGER } from '@/lib/animation-config';

const sections = [
  {
    label: 'Wellness',
    title: 'The art of doing nothing',
    body: 'A private jacuzzi with views that stretch to Italy on clear days. A steam bath that conjures the ancient Roman tradition of bathing as ritual. A terrace where you can sit for hours and feel the day slow around you. Villa Aurea was designed for the kind of rest that actually restores you.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=85',
    items: [
      'Private jacuzzi on terrace',
      'Aromatic steam bath',
      'Sea-view sun terraces',
      'Full kitchen for slow mornings',
    ],
  },
  {
    label: 'Local Dining',
    title: 'Eat like an islander',
    body: "Hvar's dining scene punches far above its weight. From the harbour restaurants where the catch comes in that morning, to the konobas hidden in olive groves, to the 5-star rooftop bars with views to the islands — the island feeds you well. We'll share our favourites.",
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85',
    items: [
      'Fresh Adriatic seafood',
      'Plavac Mali & Bogdanuša wines',
      'Lavender liqueur & local honey',
      'Sunset terrace dining at Villa Aurea',
    ],
  },
  {
    label: 'Island Exploration',
    title: 'Hvar is a world',
    body: 'The 14th-century fortress above town. The Pakleni islands — a chain of pine-covered islets perfect for swimming, snorkelling, and losing track of time. Lavender fields that turn the island purple in June. Hidden coves reachable only by boat or foot. Hvar rewards the curious.',
    image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=1400&q=85',
    items: [
      'Pakleni Islands day trips',
      'Historic Hvar Fortress',
      'Lavender fields (June)',
      'Hidden swimming coves',
    ],
  },
  {
    label: 'Getting Here',
    title: 'The journey is part of it',
    body: 'Fly to Split (SPU) — served by most major European carriers. From Split Airport, a catamaran takes you directly to Hvar Town in under an hour. Step off the boat and Villa Aurea is an 8-minute walk. We can also arrange private water taxis from Split if you prefer to arrive in style.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85',
    items: [
      'Split Airport: 1h 20min total',
      'Direct catamaran to Hvar Town',
      'Villa: 8 min walk from ferry',
      'Private transfer available',
    ],
  },
];

export default function ExperiencePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1555990793-da11153b2473?w=2000&q=85"
          alt="Hvar island at sunset"
          className="absolute inset-0 w-full h-full"
          speed={0.1}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 to-midnight/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <SectionReveal variant="fade-up">
            <span className="font-label text-[11px] tracking-[0.4em] uppercase text-gold mb-4 block">
              The Full Picture
            </span>
          </SectionReveal>
          <WordReveal
            text="The Experience"
            as="h1"
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-tight"
          />
          <SectionReveal variant="fade-up" delay={0.3}>
            <p className="font-body text-white/60 mt-4 max-w-lg text-lg leading-relaxed font-light">
              What awaits you in Hvar — inside the villa and beyond.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Editorial sections */}
      {sections.map((s, i) => (
        <section
          key={s.label}
          className={`py-24 lg:py-32 ${i % 2 === 0 ? 'bg-warm-cream' : 'bg-stone'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Image */}
              <SectionReveal
                variant={i % 2 === 0 ? 'clip-reveal' : 'slide-right'}
                className={`relative overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-gold/60" />
                <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-gold/60" />
              </SectionReveal>

              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <SectionReveal variant="fade-up">
                  <span className="font-label text-[11px] tracking-[0.35em] uppercase text-gold">
                    {s.label}
                  </span>
                  <div className="w-10 h-px bg-gold mt-4 mb-5" />
                </SectionReveal>

                <WordReveal
                  text={s.title}
                  as="h2"
                  className="font-heading text-4xl lg:text-5xl text-midnight leading-tight mb-6"
                  delay={0.1}
                />

                <SectionReveal variant="fade-up" delay={0.2}>
                  <p className="font-body text-muted leading-relaxed mb-8 font-light">
                    {s.body}
                  </p>
                </SectionReveal>

                <ul className="space-y-2.5">
                  {s.items.map((item, j) => (
                    <SectionReveal key={item} variant="fade-up" delay={0.3 + j * STAGGER.fast}>
                      <li className="flex items-center gap-3 text-sm text-charcoal font-body font-light">
                        <span className="text-gold text-xs flex-shrink-0">◈</span>
                        {item}
                      </li>
                    </SectionReveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-midnight text-center">
        <WordReveal
          text="Ready to live it?"
          as="h2"
          className="font-heading text-4xl text-white mb-3"
        />
        <SectionReveal variant="fade-up" delay={0.2}>
          <p className="font-body text-white/50 mb-8 font-light">
            The experience you&apos;ve been reading about — it&apos;s just a booking away.
          </p>
        </SectionReveal>
        <SectionReveal variant="fade-up" delay={0.3}>
          <MagneticButton className="inline-block">
            <Link
              href="/book"
              className="font-label inline-block px-12 py-4 bg-gold text-white text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-300"
            >
              Reserve Your Stay
            </Link>
          </MagneticButton>
        </SectionReveal>
      </section>
    </main>
  );
}
