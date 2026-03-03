'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import { EASE_CINEMATIC, EASE_OUT, VIEWPORT_ONCE, STAGGER } from '@/lib/animation-config';

export default function AboutSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-warm-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Image with parallax + clip-path wipe from left */}
          <motion.div
            initial={reduced ? undefined : { clipPath: 'inset(0 100% 0 0)' }}
            whileInView={reduced ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
            className="relative overflow-hidden aspect-[4/3] lg:aspect-[4/5]"
          >
            <motion.div
              style={reduced ? undefined : { y: imageY }}
              className="absolute inset-0 scale-[1.15] will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&q=80"
                alt="Villa Aurea — panoramic terrace overlooking the Adriatic"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </motion.div>
            {/* Decorative corner brackets — animate scaleX/scaleY from 0 */}
            <motion.div
              initial={reduced ? undefined : { scaleX: 0, scaleY: 0 }}
              whileInView={reduced ? undefined : { scaleX: 1, scaleY: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
              className="absolute top-6 left-6 w-10 h-10 border-t border-l border-gold opacity-60 origin-top-left"
            />
            <motion.div
              initial={reduced ? undefined : { scaleX: 0, scaleY: 0 }}
              whileInView={reduced ? undefined : { scaleX: 1, scaleY: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT }}
              className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-gold opacity-60 origin-bottom-right"
            />
          </motion.div>

          {/* Text */}
          <div className="lg:pr-8">
            <SectionReveal variant="fade-up" delay={0.1}>
              <span className="font-label text-[11px] tracking-[0.35em] uppercase text-gold">
                Our Story
              </span>
              <div className="w-12 h-px bg-gold mt-4 mb-6" />
            </SectionReveal>

            <WordReveal
              text="Where stone meets sea"
              as="h2"
              className="font-heading text-4xl lg:text-6xl text-midnight leading-[1.1] mb-6 lg:mb-8"
              delay={0.2}
            />

            <div className="font-body space-y-5 text-charcoal/70 leading-relaxed font-light">
              {[
                'Built in 2019, Villa Aurea rises from the ancient limestone of Hvar with the quiet confidence of a home that knows its place in the world. Its facade — traditional Dalmatian stone, sun-worn and salt-kissed — conceals interiors of quiet modern luxury.',
                'Three apartments, each with its own soul, share a single philosophy: that the greatest luxury is waking to a view that makes you forget everything else.',
                'The Adriatic stretches beyond every terrace. The old town hums its ancient rhythms below. And somewhere between the two, you find the rare thing you came looking for.',
              ].map((p, i) => (
                <SectionReveal key={i} variant="fade-up" delay={0.3 + i * STAGGER.slow}>
                  <p className={i === 0 ? 'text-base lg:text-lg' : ''}>{p}</p>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal variant="fade-up" delay={0.7}>
              <div className="flex gap-8 lg:gap-12 mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-stone">
                <div>
                  <div className="font-display text-3xl text-gold mb-1 font-light">2019</div>
                  <div className="font-label text-xs tracking-wider text-muted uppercase">
                    Year built
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl text-gold mb-1 font-light">3</div>
                  <div className="font-label text-xs tracking-wider text-muted uppercase">
                    Apartments
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl text-gold mb-1 font-light">100m</div>
                  <div className="font-label text-xs tracking-wider text-muted uppercase">
                    To beach
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
