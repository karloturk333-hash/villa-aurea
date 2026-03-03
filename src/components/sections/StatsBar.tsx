'use client';

import { motion } from 'framer-motion';
import { stats } from '@/data/villa';

export default function StatsBar() {
  return (
    <section className='bg-[#1A1A2E] py-8 sm:py-10'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10'>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className='text-center py-2'
            >
              <div
                className='text-3xl sm:text-4xl lg:text-5xl text-[#C5A55A] mb-1.5'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                {stat.value}
              </div>
              <div
                className='text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/50'
                style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400 }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
