'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import { EASE_CINEMATIC, EASE_OUT, VIEWPORT_ONCE, STAGGER } from '@/lib/animation-config';

const distances = [
  { place: 'Beach', distance: '100m', duration: '2 min walk' },
  { place: 'Hvar Old Town', distance: '400m', duration: '5 min walk' },
  { place: 'Ferry Terminal', distance: '600m', duration: '8 min walk' },
  { place: 'Split Airport', distance: '80km', duration: '1h 20min' },
  { place: 'Pakleni Islands', distance: '1.5km', duration: '15 min by boat' },
  { place: 'Dubrovnik', distance: '200km', duration: '4h by ferry' },
];

export default function LocationSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-warm-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionReveal variant="fade-up">
            <span className="font-label text-[11px] tracking-[0.35em] uppercase text-gold">
              Location
            </span>
            <div className="w-12 h-px bg-gold mx-auto mt-4 mb-6" />
          </SectionReveal>
          <WordReveal
            text="Perfectly positioned"
            as="h2"
            className="font-heading text-5xl lg:text-6xl text-midnight"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Map visual — clip wipe from left */}
          <div>
            <motion.div
              initial={reduced ? undefined : { clipPath: 'inset(0 100% 0 0)' }}
              whileInView={reduced ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 scale-[1.15] will-change-transform"
                style={reduced ? undefined : { y: imageY }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80"
                  alt="Hvar island, Croatia — aerial view"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
              {/* Decorative corner brackets */}
              <motion.div
                initial={reduced ? undefined : { scaleX: 0, scaleY: 0 }}
                whileInView={reduced ? undefined : { scaleX: 1, scaleY: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
                className="absolute top-5 left-5 w-10 h-10 border-t border-l border-gold/70 origin-top-left"
              />
              <motion.div
                initial={reduced ? undefined : { scaleX: 0, scaleY: 0 }}
                whileInView={reduced ? undefined : { scaleX: 1, scaleY: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT }}
                className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-gold/70 origin-bottom-right"
              />
              {/* Address card overlay */}
              <div className="absolute bottom-6 left-6 bg-midnight/85 backdrop-blur-sm px-5 py-4">
                <p className="font-label text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                  Villa Aurea
                </p>
                <p className="font-body text-white text-sm leading-relaxed font-light">
                  Ul. Biskupa Jurja Dubokovića 12
                  <br />
                  21450 Hvar, Croatia
                </p>
                <a
                  href="https://maps.google.com/?q=Hvar,Croatia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body inline-flex items-center gap-2 mt-3 text-gold text-xs hover:text-gold-light transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>

            {/* Second image */}
            <SectionReveal variant="clip-reveal" delay={0.4}>
              <div className="relative mt-4 aspect-[16/7] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
                  alt="The Adriatic sea at Hvar — 100m from Villa Aurea"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-midnight/30" />
                <p className="font-label absolute bottom-4 left-5 text-white/70 text-xs tracking-widest uppercase">
                  100m to this
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Distances and info */}
          <div>
            <SectionReveal variant="fade-up" delay={0.15}>
              <p className="font-body text-muted leading-relaxed mb-10 text-lg font-light">
                Hvar is consistently ranked among Europe&apos;s most beautiful islands. Villa
                Aurea sits at its heart — placing every essential pleasure within easy reach.
              </p>
            </SectionReveal>

            {/* Distance list */}
            <div className="space-y-0 mb-10">
              {distances.map((d, i) => (
                <SectionReveal
                  key={d.place}
                  variant="slide-left"
                  delay={0.2 + i * STAGGER.normal}
                >
                  <div className="flex items-center justify-between py-4 border-b border-stone group">
                    <div className="flex items-center gap-4">
                      <span className="text-gold text-xs flex-shrink-0">◈</span>
                      <span className="font-body text-charcoal text-sm group-hover:text-gold transition-colors duration-200">
                        {d.place}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-muted text-sm block italic">
                        {d.duration}
                      </span>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Getting there box */}
            <SectionReveal variant="fade-up" delay={0.8}>
              <div className="bg-midnight p-8">
                <h4 className="font-label text-gold text-xs tracking-[0.3em] uppercase mb-3">
                  Getting here
                </h4>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-5 font-light">
                  Fly to Split Airport (SPU) — served by all major European carriers. From
                  Split, take the catamaran directly to Hvar Town (50 min). Villa Aurea is an
                  8-minute walk from the ferry. We can arrange private transfers — just ask when
                  booking.
                </p>
                <Link
                  href="/book"
                  className="btn-shimmer font-label inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase px-5 py-2.5 min-h-[40px]"
                  style={{ background: 'linear-gradient(135deg,#b8943e 0%,#d4b96e 40%,#c5a55a 65%,#a88844 100%)' }}
                >
                  <span>Ask about transfers</span>
                  <span className="btn-arrow leading-none">→</span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
