'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { apartments } from '@/data/villa';
import { PriceTag } from '@/components/ui/PriceTag';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { EASE_CINEMATIC, VIEWPORT_ONCE } from '@/lib/animation-config';

function HorizontalScrollDesktop() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll to horizontal translation
  // 3 cards => translate from 0% to -66.666% (2/3 of total width)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%']);

  return (
    <div
      ref={containerRef}
      // Height = cards * 100vh for scroll distance
      style={{ height: `${apartments.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          className="flex gap-8 pl-[10vw] will-change-transform"
          style={reduced ? undefined : { x }}
        >
          {apartments.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={reduced ? undefined : { scale: 0.95, opacity: 0.7 }}
              whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
              className="flex-shrink-0"
              style={{ width: '80vw', maxWidth: '900px' }}
            >
              <Link
                href={`/apartments/${apt.slug}`}
                className="group block relative overflow-hidden h-[70vh] max-h-[650px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={apt.image}
                  alt={apt.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/50 to-transparent to-60%" />
                <PriceTag price={apt.priceFrom} />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <div className="w-8 h-px bg-gold mb-4 transition-all duration-500 group-hover:w-16" />
                  <h3 className="font-display text-white text-3xl lg:text-4xl mb-3 font-normal leading-tight">
                    {apt.name}
                  </h3>
                  <div className="font-body flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50 font-light mb-5">
                    <span>
                      {apt.guests.min}–{apt.guests.max} guests
                    </span>
                    <span className="text-gold/60">·</span>
                    <span>{apt.size}m²</span>
                    <span className="text-gold/60">·</span>
                    <span>
                      {apt.bathrooms} {apt.bathrooms === 1 ? 'bath' : 'baths'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="font-label text-gold text-xs tracking-[0.25em] uppercase">
                      Explore
                    </span>
                    <span className="text-gold text-sm">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function VerticalCardsMobile() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
      {apartments.map((apt, i) => (
        <SectionReveal key={apt.id} variant="clip-reveal" delay={i * 0.15}>
          <Link
            href={`/apartments/${apt.slug}`}
            className="group block relative overflow-hidden h-[400px] md:h-[480px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={apt.image}
              alt={apt.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/50 to-transparent to-60%" />
            <PriceTag price={apt.priceFrom} />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <div className="w-8 h-px bg-gold mb-4 transition-all duration-500 group-hover:w-16" />
              <h3 className="font-display text-white text-2xl lg:text-3xl mb-3 font-normal leading-tight">
                {apt.name}
              </h3>
              <div className="font-body flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50 font-light mb-5">
                <span>
                  {apt.guests.min}–{apt.guests.max} guests
                </span>
                <span className="text-gold/60">·</span>
                <span>{apt.size}m²</span>
                <span className="text-gold/60">·</span>
                <span>
                  {apt.bathrooms} {apt.bathrooms === 1 ? 'bath' : 'baths'}
                </span>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="font-label text-gold text-xs tracking-[0.25em] uppercase">
                  Explore
                </span>
                <span className="text-gold text-sm">→</span>
              </div>
            </div>
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
}

export default function ApartmentsPreview() {
  const isDesktop = useIsDesktop();

  return (
    <section className="bg-midnight overflow-hidden">
      {/* Header — always shows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 lg:pt-24 pb-10 lg:pb-14 text-center">
        <SectionReveal variant="fade-up">
          <span className="font-label text-[11px] tracking-[0.35em] uppercase text-gold">
            Accommodations
          </span>
          <div className="w-12 h-px bg-gold mx-auto mt-4 mb-6" />
        </SectionReveal>
        <WordReveal
          text="Choose your retreat"
          as="h2"
          className="font-heading text-4xl lg:text-6xl text-white leading-tight"
        />
      </div>

      {/* Desktop: horizontal scroll, Mobile: vertical cards */}
      {isDesktop ? (
        <HorizontalScrollDesktop />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <VerticalCardsMobile />
        </div>
      )}

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 lg:pb-24 text-center">
        <SectionReveal variant="fade-up" delay={0.2}>
          <Link
            href="/apartments"
            className="btn-fill font-label inline-flex items-center gap-3 px-10 sm:px-12 py-4 border border-gold/40 text-white/80 text-sm tracking-[0.2em] uppercase transition-colors duration-300 min-h-[52px]"
          >
            <span>View All Apartments</span>
            <span className="btn-arrow leading-none">→</span>
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
