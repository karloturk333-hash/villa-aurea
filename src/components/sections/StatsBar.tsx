'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { stats } from '@/data/villa';

export default function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className='bg-midnight -mt-1 relative z-10 border-b border-white/5'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='grid grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`text-center py-8 sm:py-10 px-3 ${
                // On 2-col mobile, right column of row 1 and row 2 get no right border at 3rd/4th
                i % 2 === 0 ? 'border-r border-white/8' : ''
              } ${
                // Row 2 on mobile gets top border
                i >= 2 ? 'border-t border-white/8 lg:border-t-0' : ''
              } ${
                // On lg, only first 3 get right border
                i < 3 ? 'lg:border-r lg:border-white/8' : ''
              }`}
            >
              <div className='font-display text-3xl sm:text-4xl lg:text-5xl text-gold mb-1.5 font-light'>
                {stat.value}
              </div>
              <div className='font-label text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/50'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
