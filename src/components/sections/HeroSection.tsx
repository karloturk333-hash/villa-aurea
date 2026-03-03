'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      className='relative overflow-hidden bg-midnight'
      style={{ height: '100svh', minHeight: '600px' }}
      aria-label='Villa Aurea hero'
    >
      {/* Spotlight */}
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20'
        fill='rgba(197,165,90,0.25)'
      />

      {/* Parallax background */}
      <motion.div
        style={{ y: imageY }}
        className='absolute inset-0 scale-110'
        aria-hidden='true'
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://images.unsplash.com/photo-1555990793-da11153b2473?w=2000&q=85'
          alt=''
          className='w-full h-full object-cover'
          loading='eager'
        />
        {/* Multi-layer cinematic overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-midnight/50 via-transparent to-midnight/80' />
        <div className='absolute inset-0 bg-gradient-to-r from-midnight/30 via-transparent to-transparent' />
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity }}
        className='relative h-full flex flex-col items-center justify-center text-center px-6'
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6'
        >
          <span className='block w-8 sm:w-12 h-px bg-gold' />
          <span className='font-label text-gold text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] uppercase'>
            Hvar, Croatia
          </span>
          <span className='block w-8 sm:w-12 h-px bg-gold' />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='font-heading text-white leading-[0.9] mb-5 sm:mb-6'
          style={{ fontSize: 'clamp(4rem, 12vw, 8rem)' }}
        >
          Villa<br />
          <em className='italic' style={{ color: '#C5A55A' }}>Aurea</em>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className='font-display text-white/70 max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed italic font-light'
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
        >
          Where golden light meets the Adriatic
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className='flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none sm:w-auto'
        >
          <Link
            href='/book'
            className='font-label w-full sm:w-auto px-8 sm:px-10 py-4 bg-gold text-white text-xs sm:text-sm tracking-[0.2em] uppercase text-center hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/30'
          >
            Book Direct — Save 15%
          </Link>
          <Link
            href='/apartments'
            className='font-label w-full sm:w-auto px-8 sm:px-10 py-4 border border-white/40 text-white text-xs sm:text-sm tracking-[0.2em] uppercase text-center hover:border-white hover:bg-white/10 transition-all duration-300'
          >
            Explore Apartments
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
        className='absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'
        aria-hidden='true'
      >
        <span className='font-body text-white/40 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase'>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='w-px h-8 sm:h-10 bg-gradient-to-b from-gold to-transparent'
        />
      </motion.div>
    </section>
  );
}
