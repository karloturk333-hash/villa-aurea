'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';

export default function BookingCTABanner() {
  return (
    <section className='relative overflow-hidden py-32 lg:py-48'>
      {/* Background */}
      <div className='absolute inset-0'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=85'
          alt='Adriatic sea at night'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-midnight/75' />
        <div className='absolute inset-0 bg-gradient-to-b from-midnight/40 to-midnight/60' />
      </div>

      {/* Spotlights */}
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20'
        fill='rgba(197,165,90,0.25)'
      />
      <Spotlight
        className='-top-40 right-0 md:right-60 md:-top-20'
        fill='rgba(46,107,127,0.2)'
      />

      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className='font-label text-[11px] tracking-[0.4em] uppercase text-gold'>
            Best Rate Guaranteed
          </span>

          <div className='w-12 h-px bg-gold mx-auto mt-5 mb-8' />

          <h2 className='font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-4'>
            Book direct.<br />
            <em className='italic' style={{ color: '#C5A55A' }}>Save 15%.</em>
          </h2>

          <p className='font-body text-white/60 text-lg mt-6 mb-12 max-w-xl mx-auto leading-relaxed font-light text-center'>
            No commissions. No hidden fees. No Booking.com markup. The best rate is always on our website — and it comes with instant confirmation, personal service, and genuine hospitality.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
            <Link
              href='/book'
              className='font-label px-12 py-5 bg-gold text-white text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-300 shadow-xl shadow-gold/30 hover:shadow-gold/50'
            >
              Check Availability
            </Link>
            <Link
              href='/apartments'
              className='font-label text-white/60 hover:text-white text-sm tracking-[0.15em] uppercase transition-colors duration-200 underline underline-offset-4 font-light'
            >
              Explore Apartments First
            </Link>
          </div>

          {/* Trust signals */}
          <div className='font-body flex flex-wrap items-center justify-center gap-8 mt-12 text-white/40 text-xs tracking-widest uppercase'>
            <span>Free cancellation available</span>
            <span className='text-gold'>·</span>
            <span>Instant confirmation</span>
            <span className='text-gold'>·</span>
            <span>Secure payment</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
