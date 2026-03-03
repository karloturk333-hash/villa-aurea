'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import MagneticButton from '@/components/animations/MagneticButton';
import {
  EASE_OUT,
  EASE_CINEMATIC,
  EASE_MASK_REVEAL,
  HERO_TIMING,
  DURATION,
} from '@/lib/animation-config';

export default function HeroSection() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mask reveal helper
  const maskReveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { y: '110%' } as const,
          animate: { y: '0%' } as const,
          transition: {
            duration: DURATION.slow,
            ease: EASE_MASK_REVEAL,
            delay,
          },
        };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-midnight"
      style={{ height: '100svh', minHeight: '600px' }}
      aria-label="Villa Aurea hero"
    >
      {/* Background — "camera settling" zoom */}
      <motion.div
        style={{ y: reduced ? undefined : imageY }}
        initial={reduced ? undefined : { scale: 1.15, opacity: 0 }}
        animate={reduced ? undefined : { scale: 1.1, opacity: 1 }}
        transition={{
          duration: 1.8,
          ease: EASE_CINEMATIC,
          delay: HERO_TIMING.background,
        }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1555990793-da11153b2473?w=2400&q=90"
          alt=""
          className="w-full h-full object-cover scale-110"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-transparent via-40% to-midnight/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/20 via-transparent to-transparent" />
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={reduced ? undefined : { y: textY, opacity: scrollOpacity }}
        className="relative h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Pill badge — drops from above */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: -10 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.normal,
            delay: HERO_TIMING.badge,
            ease: EASE_OUT,
          }}
          className="flex items-center gap-2.5 mb-7 sm:mb-8"
          aria-label="Location: Hvar, Croatia"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm">
            <span
              className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"
              aria-hidden="true"
            />
            <span className="font-label text-white/90 text-[11px] tracking-[0.25em] uppercase">
              Exclusive Villa · Hvar, Croatia
            </span>
          </span>
        </motion.div>

        {/* Gold decorative line — draws from center */}
        <motion.div
          initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
          animate={reduced ? undefined : { scaleX: 1, opacity: 1 }}
          transition={{
            duration: DURATION.slow,
            delay: HERO_TIMING.goldLine,
            ease: EASE_CINEMATIC,
          }}
          className="w-16 h-px bg-gold mb-6 sm:mb-8 origin-center"
          aria-hidden="true"
        />

        {/* Split title — mask reveal "Villa" then "Aurea" */}
        <div
          className="font-heading text-white mb-6 sm:mb-7"
          style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)', lineHeight: 0.88 }}
          aria-label="Villa Aurea"
        >
          <div className="overflow-hidden">
            <motion.div
              className="will-change-transform"
              {...maskReveal(HERO_TIMING.titleFirst)}
            >
              Villa
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="italic text-gold will-change-transform"
              {...maskReveal(HERO_TIMING.titleSecond)}
            >
              Aurea
            </motion.div>
          </div>
        </div>

        {/* Tagline — blur + subtle y reveal */}
        <motion.p
          initial={reduced ? undefined : { opacity: 0, filter: 'blur(8px)', y: 20 }}
          animate={reduced ? undefined : { opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 1.2,
            delay: HERO_TIMING.tagline,
            ease: EASE_OUT,
          }}
          className="font-display text-white/60 max-w-xs sm:max-w-sm mx-auto mb-10 sm:mb-12 leading-relaxed italic font-light"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)' }}
        >
          Where golden light meets the Adriatic
        </motion.p>

        {/* CTAs — spring slide-up, wrapped in MagneticButton */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.slow,
            delay: HERO_TIMING.cta,
            ease: EASE_CINEMATIC,
          }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-[280px] sm:max-w-none sm:w-auto"
        >
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/book"
              className="btn-shimmer font-label w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 text-white text-[11px] sm:text-[12px] tracking-[0.22em] uppercase min-h-[52px]"
              style={{ background: 'linear-gradient(135deg,#b8943e 0%,#d4b96e 40%,#c5a55a 65%,#a88844 100%)' }}
            >
              <span>Book Direct</span>
              <span className="font-body text-xs opacity-70 normal-case tracking-normal">— Save 15%</span>
              <span className="btn-arrow text-sm leading-none">→</span>
            </Link>
          </MagneticButton>
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/apartments"
              className="btn-fill font-label w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 border border-white/40 text-white text-[11px] sm:text-[12px] tracking-[0.22em] uppercase transition-colors duration-300 min-h-[52px]"
            >
              <span>Explore Apartments</span>
              <span className="btn-arrow text-sm leading-none">→</span>
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — delayed pulse */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: HERO_TIMING.scrollIndicator }}
        style={reduced ? undefined : { opacity: scrollOpacity }}
        className="absolute bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-label text-white/35 text-[9px] tracking-[0.35em] uppercase">
          Scroll
        </span>
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute w-8 h-8 rounded-full border border-white/30"
          />
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center"
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <path
                d="M5 1v10M1 7l4 4 4-4"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
