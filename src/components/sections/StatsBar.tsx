'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { stats } from '@/data/villa';
import { EASE_CINEMATIC, STAGGER } from '@/lib/animation-config';

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(value);
      return;
    }

    // Extract numeric part
    const match = value.match(/^(\d+)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = value.slice(match[1].length);
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value, reduced]);

  return <>{display}</>;
}

export default function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="bg-midnight -mt-1 relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={
                inView
                  ? { clipPath: 'inset(0% 0 0 0)' }
                  : { clipPath: 'inset(100% 0 0 0)' }
              }
              transition={{
                delay: i * STAGGER.slow,
                duration: 0.8,
                ease: EASE_CINEMATIC,
              }}
              className={`text-center py-8 sm:py-10 px-3 ${
                i % 2 === 0 ? 'border-r border-white/8' : ''
              } ${
                i >= 2 ? 'border-t border-white/8 lg:border-t-0' : ''
              } ${
                i < 3 ? 'lg:border-r lg:border-white/8' : ''
              }`}
            >
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-gold mb-1.5 font-light">
                <AnimatedCounter value={stat.value} inView={inView} />
              </div>
              <div className="font-label text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
