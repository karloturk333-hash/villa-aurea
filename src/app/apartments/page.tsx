'use client';

import Link from 'next/link';
import { apartments } from '@/data/villa';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticButton from '@/components/animations/MagneticButton';
import ParallaxImage from '@/components/animations/ParallaxImage';
import { STAGGER } from '@/lib/animation-config';

export default function ApartmentsPage() {
  return (
    <main className="pt-0">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1800&q=85"
          alt="Villa Aurea apartments overview"
          className="absolute inset-0 w-full h-full"
          speed={0.1}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-midnight/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <SectionReveal variant="fade-up">
            <span className="font-label text-[11px] tracking-[0.4em] uppercase text-gold mb-4 block">
              Accommodations
            </span>
          </SectionReveal>
          <WordReveal
            text="Our Apartments"
            as="h1"
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-tight"
          />
          <SectionReveal variant="fade-up" delay={0.3}>
            <p className="font-body text-white/60 mt-4 max-w-md text-lg font-light">
              Three curated spaces. One extraordinary address.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Apartments list */}
      <section className="py-24 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {apartments.map((apt, i) => (
              <article
                key={apt.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:grid-flow-row-dense' : ''}`}
              >
                {/* Image */}
                <SectionReveal
                  variant={i % 2 === 0 ? 'slide-right' : 'slide-left'}
                  className={`relative overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={apt.image}
                    alt={apt.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5 bg-midnight/80 backdrop-blur-sm px-4 py-2">
                    <p className="font-label text-gold text-xs tracking-widest uppercase">
                      From €{apt.priceFrom}/night
                    </p>
                  </div>
                </SectionReveal>

                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <SectionReveal variant="fade-up" delay={0.1}>
                    <span className="font-label text-[11px] tracking-[0.3em] uppercase text-gold">
                      {apt.floor}
                    </span>
                    <div className="w-10 h-px bg-gold mt-3 mb-5" />
                  </SectionReveal>

                  <WordReveal
                    text={apt.name}
                    as="h2"
                    className="font-heading text-4xl lg:text-5xl text-midnight mb-6 leading-tight"
                    delay={0.15}
                  />

                  <SectionReveal variant="fade-up" delay={0.25}>
                    <p className="font-body text-muted leading-relaxed mb-8 font-light">
                      {apt.description}
                    </p>
                  </SectionReveal>

                  {/* Specs */}
                  <SectionReveal variant="fade-up" delay={0.35}>
                    <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-t border-b border-stone">
                      <div>
                        <p className="font-display text-2xl text-midnight">{apt.guests.max}</p>
                        <p className="font-label text-xs tracking-wider text-muted uppercase mt-1">
                          Guests max
                        </p>
                      </div>
                      <div>
                        <p className="font-display text-2xl text-midnight">{apt.size}m²</p>
                        <p className="font-label text-xs tracking-wider text-muted uppercase mt-1">
                          Living area
                        </p>
                      </div>
                      <div>
                        <p className="font-display text-2xl text-midnight">{apt.bathrooms}</p>
                        <p className="font-label text-xs tracking-wider text-muted uppercase mt-1">
                          Bathrooms
                        </p>
                      </div>
                    </div>
                  </SectionReveal>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-10">
                    {apt.highlights.map((h, j) => (
                      <SectionReveal key={h} variant="fade-up" delay={0.4 + j * STAGGER.fast}>
                        <li className="flex items-center gap-3 text-sm text-charcoal font-body font-light">
                          <span className="text-gold text-xs">◈</span>
                          {h}
                        </li>
                      </SectionReveal>
                    ))}
                  </ul>

                  <SectionReveal variant="fade-up" delay={0.6}>
                    <MagneticButton>
                      <Link
                        href={`/apartments/${apt.slug}`}
                        className="btn-fill font-label inline-flex items-center gap-3 px-10 py-4 border border-gold/40 text-midnight text-sm tracking-[0.2em] uppercase transition-colors duration-300 min-h-[52px]"
                      >
                        <span>View Apartment</span>
                        <span className="btn-arrow leading-none">→</span>
                      </Link>
                    </MagneticButton>
                  </SectionReveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-midnight text-center">
        <SectionReveal variant="fade-up">
          <p className="font-body text-white/50 text-sm tracking-widest uppercase mb-4">
            Ready to stay?
          </p>
        </SectionReveal>
        <WordReveal
          text="Book direct and save 15%"
          as="h2"
          className="font-heading text-4xl text-white mb-8"
        />
        <SectionReveal variant="fade-up" delay={0.3}>
          <MagneticButton className="inline-block">
            <Link
              href="/book"
              className="btn-shimmer font-label inline-flex items-center gap-3 px-12 py-4 text-white text-sm tracking-[0.2em] uppercase min-h-[56px]"
              style={{ background: 'linear-gradient(135deg,#b8943e 0%,#d4b96e 40%,#c5a55a 65%,#a88844 100%)' }}
            >
              <span>Check Availability</span>
              <span className="btn-arrow leading-none">→</span>
            </Link>
          </MagneticButton>
        </SectionReveal>
      </section>
    </main>
  );
}
