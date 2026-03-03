'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { reviews } from '@/data/villa';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import { EASE_MASK_REVEAL, STAGGER } from '@/lib/animation-config';

export default function TestimonialsSection() {
  const reduced = useReducedMotion();
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

  return (
    <section className="py-24 lg:py-32 bg-stone overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <SectionReveal variant="fade-up" className="mb-16">
          <span className="font-label text-[11px] tracking-[0.35em] uppercase text-gold">
            Guest Stories
          </span>
          <div className="w-12 h-px bg-gold mx-auto mt-4 mb-0" />
        </SectionReveal>

        {/* Large quote mark */}
        <div
          className="font-display text-[120px] leading-none text-gold/20 select-none -mb-8"
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Testimonial — WordReveal within AnimatePresence */}
        <div className="relative min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              {/* Quote text as WordReveal */}
              {reduced ? (
                <blockquote className="font-display text-2xl lg:text-3xl text-midnight leading-relaxed mb-8 max-w-2xl mx-auto italic font-light">
                  {reviews[active].quote}
                </blockquote>
              ) : (
                <blockquote className="mb-8 max-w-2xl mx-auto">
                  {reviews[active].quote.split(' ').map((word, i) => (
                    <span
                      key={`${active}-${i}`}
                      className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
                    >
                      <motion.span
                        className="inline-block font-display text-2xl lg:text-3xl text-midnight leading-relaxed italic font-light will-change-transform"
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{
                          duration: 0.6,
                          ease: EASE_MASK_REVEAL,
                          delay: i * STAGGER.word,
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </blockquote>
              )}

              {/* Author info — fades in 0.3s after quote */}
              <motion.div
                initial={reduced ? undefined : { opacity: 0, y: 8 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <span className="w-8 h-px bg-gold" />
                <span className="font-body text-sm text-midnight font-medium">
                  {reviews[active].author}
                </span>
                <span className="text-gold text-xs">·</span>
                <span className="font-body text-sm text-muted font-light">
                  {reviews[active].location}
                </span>
                <span className="w-8 h-px bg-gold" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Screen reader announcer */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Review {active + 1} of {reviews.length}: {reviews[active].quote}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="btn-corners w-14 h-14 border border-midnight/25 flex items-center justify-center text-midnight/35 hover:text-gold transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>→</span>
          </button>
          <div className="flex gap-3 items-center">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                className={`transition-all duration-500 touch-target ${
                  i === active
                    ? 'w-8 h-[3px] bg-gold'
                    : 'w-2 h-2 rounded-full bg-midnight/15 hover:bg-gold/60'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="btn-corners w-14 h-14 border border-midnight/25 flex items-center justify-center text-midnight/35 hover:text-gold transition-all duration-300"
            aria-label="Next testimonial"
          >
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
