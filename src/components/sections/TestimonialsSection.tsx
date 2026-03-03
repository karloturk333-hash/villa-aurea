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
    <section className='py-24 lg:py-32 bg-stone overflow-hidden'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mb-16'
        >
          <span className='font-label text-[11px] tracking-[0.35em] uppercase text-gold'>
            Guest Stories
          </span>
          <div className='w-12 h-px bg-gold mx-auto mt-4 mb-0' />
        </motion.div>

        {/* Large quote mark */}
        <div
          className='font-display text-[120px] leading-none text-gold/20 select-none -mb-8'
          aria-hidden='true'
        >
          &ldquo;
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
              <blockquote className='font-display text-2xl lg:text-3xl text-midnight leading-relaxed mb-8 max-w-2xl mx-auto italic font-light'>
                {reviews[active].quote}
              </blockquote>
              <div className='flex items-center gap-4'>
                <span className='w-8 h-px bg-gold' />
                <span className='font-body text-sm text-midnight font-medium'>
                  {reviews[active].author}
                </span>
                <span className='text-gold text-xs'>·</span>
                <span className='font-body text-sm text-muted font-light'>
                  {reviews[active].location}
                </span>
                <span className='w-8 h-px bg-gold' />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Screen reader announcer */}
        <div aria-live='polite' aria-atomic='true' className='sr-only'>
          Review {active + 1} of {reviews.length}: {reviews[active].quote}
        </div>

        {/* Controls */}
        <div className='flex items-center justify-center gap-6 mt-12'>
          <button
            onClick={prev}
            className='w-12 h-12 border border-midnight/20 flex items-center justify-center text-midnight/50 hover:border-gold hover:text-gold transition-all duration-300'
            aria-label='Previous testimonial'
          >
            ←
          </button>
          {/* Dots */}
          <div className='flex gap-3 items-center'>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                className={`transition-all duration-300 touch-target ${
                  i === active
                    ? 'w-6 h-1 bg-gold'
                    : 'w-1.5 h-1.5 rounded-full bg-midnight/20 hover:bg-gold/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className='w-12 h-12 border border-midnight/20 flex items-center justify-center text-midnight/50 hover:border-gold hover:text-gold transition-all duration-300'
            aria-label='Next testimonial'
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
