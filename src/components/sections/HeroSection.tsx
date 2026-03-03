'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className='relative overflow-hidden bg-midnight'
      style={{ height: '100svh', minHeight: '600px' }}
      aria-label='Villa Aurea hero'
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: imageY }}
        className='absolute inset-0 scale-110'
        aria-hidden='true'
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://images.unsplash.com/photo-1555990793-da11153b2473?w=2400&q=90'
          alt=''
          className='w-full h-full object-cover'
          loading='eager'
          fetchPriority='high'
        />
        {/* Cinematic overlay: bottom vignette + soft top */}
        <div className='absolute inset-0 bg-gradient-to-b from-midnight/40 via-transparent via-40% to-midnight/85' />
        <div className='absolute inset-0 bg-gradient-to-r from-midnight/20 via-transparent to-transparent' />
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity }}
        className='relative h-full flex flex-col items-center justify-center text-center px-6'
      >
        {/* Pill badge — inspired by reference design */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className='flex items-center gap-2.5 mb-7 sm:mb-8'
          aria-label='Location: Hvar, Croatia'
        >
          {/* Pill */}
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm'>
            {/* Dot */}
            <span className='w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0' aria-hidden='true' />
            <span className='font-label text-white/90 text-[11px] tracking-[0.25em] uppercase'>
              Exclusive Villa · Hvar, Croatia
            </span>
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className='font-heading text-white leading-[0.88] mb-6 sm:mb-7'
          style={{ fontSize: 'clamp(4.5rem, 13vw, 9rem)' }}
        >
          Villa<br />
          <em className='italic text-gold'>Aurea</em>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className='font-display text-white/60 max-w-xs sm:max-w-sm mx-auto mb-10 sm:mb-12 leading-relaxed italic font-light'
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)' }}
        >
          Where golden light meets the Adriatic
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className='flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-[320px] sm:max-w-none sm:w-auto'
        >
          <Link
            href='/book'
            className='font-label w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 bg-gold text-white text-[11px] sm:text-[12px] tracking-[0.22em] uppercase hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 min-h-[52px]'
          >
            <span>Book Direct</span>
            <span className='font-body text-xs opacity-80 normal-case tracking-normal'>— Save 15%</span>
          </Link>
          <Link
            href='/apartments'
            className='font-label w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-4 border border-white/35 text-white text-[11px] sm:text-[12px] tracking-[0.22em] uppercase hover:border-white/80 hover:bg-white/8 transition-all duration-300 min-h-[52px]'
          >
            Explore Apartments
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — refined circular style like reference */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{ opacity }}
        className='absolute bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3'
        aria-hidden='true'
      >
        <span className='font-label text-white/35 text-[9px] tracking-[0.35em] uppercase'>
          Scroll
        </span>
        {/* Animated circle + arrow like reference */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className='w-8 h-8 rounded-full border border-white/25 flex items-center justify-center'
        >
          <svg width='10' height='12' viewBox='0 0 10 12' fill='none' aria-hidden='true'>
            <path d='M5 1v10M1 7l4 4 4-4' stroke='rgba(255,255,255,0.5)' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
