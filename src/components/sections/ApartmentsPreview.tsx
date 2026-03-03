'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { apartments } from '@/data/villa';

export default function ApartmentsPreview() {
  return (
    <section className='py-16 lg:py-32 bg-[#E8E0D4] overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-10 lg:mb-16'
        >
          <span
            className='text-[11px] tracking-[0.35em] uppercase text-[#C5A55A]'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
          >
            Accommodations
          </span>
          <div className='w-12 h-px bg-[#C5A55A] mx-auto mt-4 mb-6' />
          <h2
            className='text-4xl lg:text-6xl text-[#1A1A2E] leading-tight'
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            Choose your <em style={{ fontStyle: 'italic' }}>retreat</em>
          </h2>
        </motion.div>

        {/* Apartments grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
          {apartments.map((apt, i) => (
            <motion.article
              key={apt.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/apartments/${apt.slug}`} className='group block'>
                {/* Image container */}
                <div className='relative overflow-hidden aspect-[4/3] md:aspect-[3/4] mb-5 lg:mb-6'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={apt.image}
                    alt={apt.name}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />

                  {/* Price badge */}
                  <div className='absolute top-5 right-5 bg-[#1A1A2E]/80 backdrop-blur-sm px-4 py-2 border border-[#C5A55A]/30'>
                    <span
                      className='text-[10px] tracking-widest text-[#C5A55A] uppercase block'
                      style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
                    >
                      From
                    </span>
                    <span
                      className='text-white text-xl'
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                    >
                      €{apt.priceFrom}
                      <span className='text-sm text-white/60'>/night</span>
                    </span>
                  </div>

                  {/* Explore button - appears on hover */}
                  <div className='absolute inset-x-0 bottom-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0'>
                    <span
                      className='px-8 py-3 bg-[#C5A55A] text-white text-xs tracking-[0.2em] uppercase'
                      style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
                    >
                      Explore
                    </span>
                  </div>
                </div>

                {/* Card info */}
                <div>
                  <h3
                    className='text-2xl text-[#1A1A2E] mb-2 group-hover:text-[#C5A55A] transition-colors duration-300'
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                  >
                    {apt.name}
                  </h3>
                  <div
                    className='flex gap-4 text-sm text-[#8A8580]'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    <span>{apt.guests.min}–{apt.guests.max} guests</span>
                    <span className='text-[#C5A55A]'>·</span>
                    <span>{apt.size}m²</span>
                    <span className='text-[#C5A55A]'>·</span>
                    <span>{apt.bathrooms} {apt.bathrooms === 1 ? 'bath' : 'baths'}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='text-center mt-14'
        >
          <Link
            href='/apartments'
            className='inline-block px-12 py-4 border border-[#1A1A2E] text-[#1A1A2E] text-sm tracking-[0.2em] uppercase hover:bg-[#1A1A2E] hover:text-white transition-all duration-300'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
          >
            View All Apartments
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
