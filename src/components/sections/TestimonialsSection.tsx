'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviews } from '@/data/villa';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -dir * 60 }),
  };

  return (
    <section className='py-24 lg:py-32 bg-[#E8E0D4] overflow-hidden'>
      <div className='max-w-4xl mx-auto px-6 text-center'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mb-16'
        >
          <span
            className='text-[11px] tracking-[0.35em] uppercase text-[#C5A55A]'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
          >
            Guest Stories
          </span>
          <div className='w-12 h-px bg-[#C5A55A] mx-auto mt-4 mb-0' />
        </motion.div>

        {/* Large quote mark */}
        <div
          className='text-[120px] leading-none text-[#C5A55A]/20 select-none -mb-8'
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          aria-hidden='true'
        >
          "
        </div>

        {/* Testimonial */}
        <div className='relative min-h-[180px] flex items-center justify-center'>
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className='absolute inset-0 flex flex-col items-center justify-center px-4'
            >
              <blockquote
                className='text-2xl lg:text-3xl text-[#1A1A2E] leading-relaxed mb-8 max-w-2xl mx-auto'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300 }}
              >
                {reviews[active].quote}
              </blockquote>
              <div className='flex items-center gap-4'>
                <span className='w-8 h-px bg-[#C5A55A]' />
                <span
                  className='text-sm text-[#1A1A2E] font-medium'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  {reviews[active].author}
                </span>
                <span className='text-[#C5A55A] text-xs'>·</span>
                <span
                  className='text-sm text-[#8A8580]'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                >
                  {reviews[active].location}
                </span>
                <span className='w-8 h-px bg-[#C5A55A]' />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className='flex items-center justify-center gap-6 mt-12'>
          <button
            onClick={prev}
            className='w-10 h-10 border border-[#1A1A2E]/20 flex items-center justify-center text-[#1A1A2E]/50 hover:border-[#C5A55A] hover:text-[#C5A55A] transition-all duration-300'
            aria-label='Previous testimonial'
          >
            ←
          </button>
          {/* Dots */}
          <div className='flex gap-2.5'>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
                aria-label={`Go to review ${i + 1}`}
                className={`transition-all duration-300 ${
                  i === active
                    ? 'w-6 h-1 bg-[#C5A55A]'
                    : 'w-1 h-1 rounded-full bg-[#1A1A2E]/20 hover:bg-[#C5A55A]/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className='w-10 h-10 border border-[#1A1A2E]/20 flex items-center justify-center text-[#1A1A2E]/50 hover:border-[#C5A55A] hover:text-[#C5A55A] transition-all duration-300'
            aria-label='Next testimonial'
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
