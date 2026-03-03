'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { EASE_OUT, EASE_CINEMATIC, DURATION, VIEWPORT_ONCE } from '@/lib/animation-config';
import type { ReactNode } from 'react';

type Variant = 'fade-up' | 'clip-reveal' | 'scale-in' | 'slide-left' | 'slide-right';

interface SectionRevealProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  delay?: number;
  duration?: number;
}

const variants: Record<Variant, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'clip-reveal': {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)' },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
};

export default function SectionReveal({
  children,
  variant = 'fade-up',
  className = '',
  delay = 0,
  duration = DURATION.slow,
}: SectionRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const ease = variant === 'clip-reveal' ? EASE_CINEMATIC : EASE_OUT;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants[variant]}
      transition={{ duration, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
