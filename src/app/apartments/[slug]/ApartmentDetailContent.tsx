'use client';

import Link from 'next/link';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticButton from '@/components/animations/MagneticButton';
import { STAGGER } from '@/lib/animation-config';

interface Apartment {
  id: number;
  slug: string;
  name: string;
  floor: string;
  size: number;
  guests: { min: number; max: number };
  bedrooms: string;
  bathrooms: number;
  priceFrom: number;
  highlights: string[];
  description: string;
  image: string;
  gallery: string[];
}

interface SeasonalPricing {
  season: string;
  period: string;
  priceMultiplier: number;
}

interface Props {
  apt: Apartment;
  others: Apartment[];
  seasonalPricing: SeasonalPricing[];
}

export default function ApartmentDetailContent({ apt, others, seasonalPricing }: Props) {
  return (
    <>
      {/* Main content */}
      <section className="py-12 lg:py-20 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Left — description */}
            <div className="lg:col-span-2">
              <SectionReveal variant="fade-up">
                <span className="font-label text-[11px] tracking-[0.3em] uppercase text-gold">
                  {apt.floor}
                </span>
                <div className="w-10 h-px bg-gold mt-3 mb-5" />
              </SectionReveal>

              <WordReveal
                text={apt.name}
                as="h1"
                className="font-heading text-4xl lg:text-6xl text-midnight mb-5 lg:mb-6 leading-tight"
              />

              <SectionReveal variant="fade-up" delay={0.2}>
                <p className="font-body text-base lg:text-xl text-muted leading-relaxed mb-8 lg:mb-10 font-light">
                  {apt.description}
                </p>
              </SectionReveal>

              {/* Specs grid */}
              <SectionReveal variant="fade-up" delay={0.3}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-t border-b border-stone mb-10">
                  {[
                    { label: 'Guests', value: `${apt.guests.min}–${apt.guests.max}` },
                    { label: 'Size', value: `${apt.size}m²` },
                    { label: 'Bedrooms', value: apt.bedrooms },
                    { label: 'Bathrooms', value: apt.bathrooms.toString() },
                  ].map((spec) => (
                    <div key={spec.label}>
                      <p className="font-display text-2xl text-midnight mb-1">{spec.value}</p>
                      <p className="font-label text-xs tracking-wider text-muted uppercase">
                        {spec.label}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              {/* Highlights */}
              <SectionReveal variant="fade-up" delay={0.35}>
                <h2 className="font-display text-2xl text-midnight mb-5">Highlights</h2>
              </SectionReveal>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                {apt.highlights.map((h, i) => (
                  <SectionReveal key={h} variant="fade-up" delay={0.4 + i * STAGGER.fast}>
                    <li className="flex items-center gap-3 text-sm text-charcoal font-body font-light">
                      <span className="text-gold">◈</span>
                      {h}
                    </li>
                  </SectionReveal>
                ))}
              </ul>

              {/* Seasonal pricing */}
              <SectionReveal variant="fade-up" delay={0.5}>
                <h2 className="font-display text-2xl text-midnight mb-5">Rates</h2>
              </SectionReveal>
              <div className="space-y-2 mb-8">
                {seasonalPricing.map((s, i) => (
                  <SectionReveal key={s.season} variant="slide-left" delay={0.55 + i * STAGGER.normal}>
                    <div className="flex items-center justify-between py-4 px-6 bg-stone">
                      <div>
                        <p className="font-body text-midnight font-medium text-sm">{s.season}</p>
                        <p className="font-body text-muted text-xs mt-0.5 font-light">
                          {s.period}
                        </p>
                      </div>
                      <p className="font-display text-xl text-midnight">
                        from €{Math.round(apt.priceFrom * s.priceMultiplier)}
                        <span className="text-sm text-muted">/night</span>
                      </p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Direct booking note */}
              <SectionReveal variant="fade-up" delay={0.8}>
                <div className="bg-midnight p-6 flex items-start gap-5">
                  <span className="text-gold text-2xl mt-1">★</span>
                  <div>
                    <p className="font-body text-white font-medium mb-1">
                      Best rate guaranteed — book direct
                    </p>
                    <p className="font-body text-white/50 text-sm font-light">
                      These prices are 15% lower than Booking.com or Airbnb. No platform fees.
                      No surprises.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Right — booking widget (already a client component) */}
            <div className="lg:col-span-1">
              {/* BookingWidget is rendered in the server parent — we just add a sticky CTA */}
              <div className="sticky top-28">
                <SectionReveal variant="fade-up" delay={0.3}>
                  <MagneticButton className="w-full">
                    <Link
                      href={`/book?apartment=${apt.slug}`}
                      className="btn-shimmer font-label flex w-full items-center justify-center gap-3 px-8 py-4 text-white text-sm tracking-[0.2em] uppercase min-h-[52px]"
                      style={{ background: 'linear-gradient(135deg,#b8943e 0%,#d4b96e 40%,#c5a55a 65%,#a88844 100%)' }}
                    >
                      <span>Book This Apartment</span>
                      <span className="btn-arrow leading-none">→</span>
                    </Link>
                  </MagneticButton>
                  <p className="font-body text-center text-muted text-xs mt-3 font-light">
                    From €{apt.priceFrom}/night · Best rate guaranteed
                  </p>
                </SectionReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other apartments */}
      <section className="py-20 bg-stone">
        <div className="max-w-7xl mx-auto px-6">
          <WordReveal
            text="Other apartments"
            as="h2"
            className="font-heading text-3xl text-midnight mb-10 text-center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {others.map((a, i) => (
              <SectionReveal key={a.id} variant="scale-in" delay={i * 0.15}>
                <Link href={`/apartments/${a.slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[16/9] mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="font-display text-white text-xl">{a.name}</p>
                      <p className="font-body text-gold text-sm mt-1 font-light">
                        from €{a.priceFrom}/night
                      </p>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <SectionReveal variant="fade-up" delay={0.3}>
              <MagneticButton className="inline-block">
                <Link
                  href="/book"
                  className="btn-shimmer font-label inline-flex items-center gap-3 px-12 py-4 text-white text-sm tracking-[0.2em] uppercase min-h-[56px]"
                  style={{ background: 'linear-gradient(135deg,#b8943e 0%,#d4b96e 40%,#c5a55a 65%,#a88844 100%)' }}
                >
                  <span>Book This Apartment</span>
                  <span className="btn-arrow leading-none">→</span>
                </Link>
              </MagneticButton>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
