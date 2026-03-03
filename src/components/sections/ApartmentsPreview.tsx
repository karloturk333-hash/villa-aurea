'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { apartments } from '@/data/villa';
import { CardSpotlight } from '@/components/ui/card-spotlight';

export default function ApartmentsPreview() {
  return (
    <section className='py-16 lg:py-32 bg-midnight overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-10 lg:mb-16'
        >
          <span className='font-label text-[11px] tracking-[0.35em] uppercase text-gold'>
            Accommodations
          </span>
          <div className='w-12 h-px bg-gold mx-auto mt-4 mb-6' />
          <h2 className='font-heading text-4xl lg:text-6xl text-white leading-tight'>
            Choose your <em className='italic'>retreat</em>
          </h2>
        </motion.div>

        {/* Apartments grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8'>
          {apartments.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <CardSpotlight className='h-full bg-midnight'>
                <Link href={`/apartments/${apt.slug}`} className='group block'>
                  {/* Image container */}
                  <div className='relative overflow-hidden aspect-[4/3] lg:aspect-[3/4]'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={apt.image}
                      alt={apt.name}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    {/* Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />

                    {/* Price badge — glass-dark */}
                    <div className='absolute top-5 right-5 glass-dark px-4 py-2'>
                      <span className='font-label text-[10px] tracking-widest text-gold uppercase block'>
                        From
                      </span>
                      <span className='font-display text-white text-xl font-light'>
                        €{apt.priceFrom}
                        <span className='text-sm text-white/60'>/night</span>
                      </span>
                    </div>

                    {/* Explore button - appears on hover */}
                    <div className='absolute inset-x-0 bottom-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0'>
                      <span className='font-label px-8 py-3 bg-gold text-white text-xs tracking-[0.2em] uppercase'>
                        Explore
                      </span>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className='p-6'>
                    <div className='w-6 h-px bg-gold mb-3 transition-all duration-500 group-hover:w-12' />
                    <h3 className='font-display text-2xl text-white mb-2 font-normal group-hover:text-gold transition-colors duration-300'>
                      {apt.name}
                    </h3>
                    <div className='font-body flex gap-4 text-sm text-white/50 font-light'>
                      <span>{apt.guests.min}–{apt.guests.max} guests</span>
                      <span className='text-gold'>·</span>
                      <span>{apt.size}m²</span>
                      <span className='text-gold'>·</span>
                      <span>{apt.bathrooms} {apt.bathrooms === 1 ? 'bath' : 'baths'}</span>
                    </div>
                  </div>
                </Link>
              </CardSpotlight>
            </motion.div>
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
            className='font-label inline-block px-12 py-4 border border-white/30 text-white/80 text-sm tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-300'
          >
            View All Apartments
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
