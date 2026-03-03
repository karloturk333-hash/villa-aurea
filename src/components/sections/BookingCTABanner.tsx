'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { WordReveal, LineReveal } from '@/components/animations/TextReveal';
import MagneticButton from '@/components/animations/MagneticButton';
import SectionReveal from '@/components/animations/SectionReveal';
import { EASE_OUT, VIEWPORT_ONCE } from '@/lib/animation-config';

export default function BookingCTABanner() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 lg:py-48">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduced ? undefined : { y: bgY, scale: 1.15 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=85"
          alt="Adriatic sea at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-midnight/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 to-midnight/60" />
      </motion.div>

      {/* Spotlights */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(197,165,90,0.25)"
      />
      <Spotlight
        className="-top-40 right-0 md:right-60 md:-top-20"
        fill="rgba(46,107,127,0.2)"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <SectionReveal variant="fade-up">
          <span className="font-label text-[11px] tracking-[0.4em] uppercase text-gold">
            Best Rate Guaranteed
          </span>
          <div className="w-12 h-px bg-gold mx-auto mt-5 mb-8" />
        </SectionReveal>

        <WordReveal
          text="Book direct."
          as="h2"
          className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-1"
          delay={0.1}
        />
        <WordReveal
          text="Save 15%."
          as="h2"
          className="font-heading text-5xl sm:text-6xl lg:text-7xl text-gold leading-[1.05] mb-4 italic"
          delay={0.3}
        />

        <SectionReveal variant="fade-up" delay={0.5}>
          <p className="font-body text-white/60 text-lg mt-6 mb-12 max-w-xl mx-auto leading-relaxed font-light text-center">
            No commissions. No hidden fees. No Booking.com markup. The best rate is always on
            our website — and it comes with instant confirmation, personal service, and genuine
            hospitality.
          </p>
        </SectionReveal>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticButton>
            <Link
              href="/book"
              className="btn-shimmer font-label inline-flex items-center gap-3 px-12 py-5 text-white text-sm tracking-[0.2em] uppercase min-h-[56px]"
              style={{ background: 'linear-gradient(135deg,#b8943e 0%,#d4b96e 40%,#c5a55a 65%,#a88844 100%)' }}
            >
              <span>Check Availability</span>
              <span className="btn-arrow leading-none">→</span>
            </Link>
          </MagneticButton>
          <Link
            href="/apartments"
            className="btn-underline font-label text-white/60 text-sm tracking-[0.15em] uppercase font-light"
          >
            Explore Apartments First
          </Link>
        </motion.div>

        {/* Trust signals */}
        <SectionReveal variant="fade-up" delay={0.9}>
          <div className="font-body flex flex-wrap items-center justify-center gap-8 mt-12 text-white/40 text-xs tracking-widest uppercase">
            <span>Free cancellation available</span>
            <span className="text-gold">·</span>
            <span>Instant confirmation</span>
            <span className="text-gold">·</span>
            <span>Secure payment</span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
