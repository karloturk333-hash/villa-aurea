'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/villa';

// Asymmetric sizes for visual interest
const CARD_HEIGHTS = ['h-96', 'h-72', 'h-80', 'h-72', 'h-80', 'h-96'];

export default function WellnessSection() {
  return (
    <section className='py-24 lg:py-32 bg-[#FAF7F2] overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className='text-[11px] tracking-[0.35em] uppercase text-[#C5A55A]'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              The Experience
            </span>
            <div className='w-12 h-px bg-[#C5A55A] mt-4 mb-6' />
            <h2
              className='text-5xl lg:text-6xl text-[#1A1A2E] leading-tight'
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Rest is<br />
              <em style={{ fontStyle: 'italic' }}>an art</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className='text-[#8A8580] leading-relaxed lg:pb-2'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
          >
            Every element of Villa Aurea has been considered for one purpose: to give you days worth remembering. Six experiences that define a Hvar holiday done properly.
          </motion.p>
        </div>

        {/* Experience grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden group cursor-pointer ${CARD_HEIGHTS[i]}`}
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={exp.image}
                alt={exp.title}
                loading='eager'
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108'
                style={{ transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}
                onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = '1'; }}
              />
              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/20 to-transparent transition-opacity duration-300 group-hover:from-[#1A1A2E]/95' />

              {/* Content */}
              <div className='absolute inset-0 flex flex-col justify-end p-6'>
                <div className='w-8 h-px bg-[#C5A55A] mb-3 transition-all duration-500 group-hover:w-14' />
                <h3
                  className='text-white text-xl mb-2'
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                >
                  {exp.title}
                </h3>
                <p
                  className='text-white/0 group-hover:text-white/70 text-sm leading-relaxed transition-all duration-400 max-h-0 group-hover:max-h-20 overflow-hidden'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                >
                  {exp.description}
                </p>
              </div>

              {/* Number badge */}
              <div className='absolute top-5 right-5 opacity-30 group-hover:opacity-60 transition-opacity duration-300'>
                <span
                  className='text-white text-xs tracking-widest'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
