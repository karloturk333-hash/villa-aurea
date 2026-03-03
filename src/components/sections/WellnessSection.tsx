'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/villa';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

export default function WellnessSection() {
  return (
    <section className='py-24 lg:py-32 bg-warm-cream overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        {/* Header */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className='font-label text-[11px] tracking-[0.35em] uppercase text-gold'>
              The Experience
            </span>
            <div className='w-12 h-px bg-gold mt-4 mb-6' />
            <h2 className='font-heading text-5xl lg:text-6xl text-midnight leading-tight'>
              Rest is<br />
              <em className='italic'>an art</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className='font-body text-muted leading-relaxed lg:pb-2 font-light'
          >
            Every element of Villa Aurea has been considered for one purpose: to give you days worth remembering. Six experiences that define a Hvar holiday done properly.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <BentoGrid>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
            >
              <BentoGridItem
                className='h-full'
                header={
                  <div className='absolute inset-0'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent transition-opacity duration-300 group-hover:from-midnight/95' />
                  </div>
                }
              >
                {/* Number badge */}
                <div className='absolute top-5 right-5 opacity-30 group-hover:opacity-60 transition-opacity duration-300'>
                  <span className='font-label text-white text-xs tracking-widest'>
                    0{i + 1}
                  </span>
                </div>
                {/* Content */}
                <div className='w-8 h-px bg-gold mb-3 transition-all duration-500 group-hover:w-14' />
                <h3 className='font-display text-white text-xl mb-2 font-normal'>
                  {exp.title}
                </h3>
                <p className='font-body text-white/0 group-hover:text-white/70 text-sm leading-relaxed transition-all duration-400 max-h-0 group-hover:max-h-20 overflow-hidden font-light'>
                  {exp.description}
                </p>
              </BentoGridItem>
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
