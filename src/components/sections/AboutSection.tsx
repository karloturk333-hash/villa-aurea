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
    <section ref={sectionRef} className='py-16 lg:py-32 bg-[#FAF7F2] overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6'>
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
                src='https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&q=80'
                alt='Villa Aurea — panoramic terrace overlooking the Adriatic'
                className='w-full h-full object-cover object-center'
                loading='eager'
              />
            </motion.div>
            {/* Decorative corner bracket */}
            <div className='absolute top-6 left-6 w-10 h-10 border-t border-l border-[#C5A55A] opacity-60' />
            <div className='absolute bottom-6 right-6 w-10 h-10 border-b border-r border-[#C5A55A] opacity-60' />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className='lg:pr-8'
          >
            <span
              className='text-[11px] tracking-[0.35em] uppercase text-[#C5A55A]'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              Our Story
            </span>

            <div className='w-12 h-px bg-[#C5A55A] mt-4 mb-6' />

            <h2
              className='text-4xl lg:text-6xl text-[#1A1A2E] leading-[1.1] mb-6 lg:mb-8'
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Where stone<br />
              <em style={{ fontStyle: 'italic' }}>meets sea</em>
            </h2>

            <div
              className='space-y-5 text-[#2D2D2D]/70 leading-relaxed'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
            >
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

            <div className='flex gap-8 lg:gap-12 mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-[#E8E0D4]'>
              <div>
                <div
                  className='text-3xl text-[#C5A55A] mb-1'
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                >
                  2019
                </div>
                <div
                  className='text-xs tracking-wider text-[#8A8580] uppercase'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  Year built
                </div>
              </div>
              <div>
                <div
                  className='text-3xl text-[#C5A55A] mb-1'
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                >
                  3
                </div>
                <div
                  className='text-xs tracking-wider text-[#8A8580] uppercase'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  Apartments
                </div>
              </div>
              <div>
                <div
                  className='text-3xl text-[#C5A55A] mb-1'
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                >
                  100m
                </div>
                <div
                  className='text-xs tracking-wider text-[#8A8580] uppercase'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  To beach
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
