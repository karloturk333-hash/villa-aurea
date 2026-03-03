'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { apartments } from '@/data/villa';
import { PriceTag } from '@/components/ui/PriceTag';

export default function ApartmentsPreview() {
  return (
    <section className='py-16 lg:py-24 bg-midnight overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-10 lg:mb-14'
        >
          <span className='font-label text-[11px] tracking-[0.35em] uppercase text-gold'>
            Accommodations
          </span>
          <div className='w-12 h-px bg-gold mx-auto mt-4 mb-6' />
          <h2 className='font-heading text-4xl lg:text-6xl text-white leading-tight'>
            Choose your <em className='italic'>retreat</em>
          </h2>
        </motion.div>

        {/* Apartments grid — 1-col mobile, 2-col tablet, 3-col desktop */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6'>
          {apartments.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/apartments/${apt.slug}`}
                className='group block relative overflow-hidden h-[400px] md:h-[480px] lg:h-[520px]'
              >
                {/* Full-bleed image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={apt.image}
                  alt={apt.name}
                  className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />

                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/50 to-transparent to-60%' />

                {/* Price tag — pill component */}
                <PriceTag price={apt.priceFrom} />

                {/* Bottom text */}
                <div className='absolute inset-x-0 bottom-0 p-6 md:p-7'>
                  <div className='w-8 h-px bg-gold mb-4 transition-all duration-500 group-hover:w-16' />
                  <h3 className='font-display text-white text-2xl lg:text-3xl mb-3 font-normal leading-tight'>
                    {apt.name}
                  </h3>
                  <div className='font-body flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50 font-light mb-5'>
                    <span>{apt.guests.min}–{apt.guests.max} guests</span>
                    <span className='text-gold/60'>·</span>
                    <span>{apt.size}m²</span>
                    <span className='text-gold/60'>·</span>
                    <span>{apt.bathrooms} {apt.bathrooms === 1 ? 'bath' : 'baths'}</span>
                  </div>
                  <div className='flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0'>
                    <span className='font-label text-gold text-xs tracking-[0.25em] uppercase'>Explore</span>
                    <span className='text-gold text-sm'>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='text-center mt-12'
        >
          <Link
            href='/apartments'
            className='font-label inline-block px-10 sm:px-12 py-4 border border-white/20 text-white/70 text-sm tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-300 min-h-[52px]'
          >
            View All Apartments
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
