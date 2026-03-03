'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={sectionRef} className='py-16 lg:py-32 bg-warm-cream overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center'>
          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className='relative overflow-hidden aspect-[4/3] lg:aspect-[4/5]'
          >
            <motion.div style={{ y: imageY }} className='absolute inset-0 scale-110'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&q=80'
                alt='Villa Aurea — panoramic terrace overlooking the Adriatic'
                className='w-full h-full object-cover object-center'
                loading='eager'
              />
            </motion.div>
            {/* Decorative corner bracket */}
            <div className='absolute top-6 left-6 w-10 h-10 border-t border-l border-gold opacity-60' />
            <div className='absolute bottom-6 right-6 w-10 h-10 border-b border-r border-gold opacity-60' />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className='lg:pr-8'
          >
            <span className='font-label text-[11px] tracking-[0.35em] uppercase text-gold'>
              Our Story
            </span>

            <div className='w-12 h-px bg-gold mt-4 mb-6' />

            <h2 className='font-heading text-4xl lg:text-6xl text-midnight leading-[1.1] mb-6 lg:mb-8'>
              Where stone<br />
              <em className='italic'>meets sea</em>
            </h2>

            <div className='font-body space-y-5 text-charcoal/70 leading-relaxed font-light'>
              <p className='text-base lg:text-lg'>
                Built in 2019, Villa Aurea rises from the ancient limestone of Hvar with the quiet confidence of a home that knows its place in the world. Its facade — traditional Dalmatian stone, sun-worn and salt-kissed — conceals interiors of quiet modern luxury.
              </p>
              <p>
                Three apartments, each with its own soul, share a single philosophy: that the greatest luxury is waking to a view that makes you forget everything else.
              </p>
              <p>
                The Adriatic stretches beyond every terrace. The old town hums its ancient rhythms below. And somewhere between the two, you find the rare thing you came looking for.
              </p>
            </div>

            <div className='flex gap-8 lg:gap-12 mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-stone'>
              <div>
                <div className='font-display text-3xl text-gold mb-1 font-light'>2019</div>
                <div className='font-label text-xs tracking-wider text-muted uppercase'>Year built</div>
              </div>
              <div>
                <div className='font-display text-3xl text-gold mb-1 font-light'>3</div>
                <div className='font-label text-xs tracking-wider text-muted uppercase'>Apartments</div>
              </div>
              <div>
                <div className='font-display text-3xl text-gold mb-1 font-light'>100m</div>
                <div className='font-label text-xs tracking-wider text-muted uppercase'>To beach</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
