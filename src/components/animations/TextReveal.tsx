'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_MASK_REVEAL, STAGGER, DURATION, VIEWPORT_ONCE } from '@/lib/animation-config';
import type { ReactNode } from 'react';

/* ─── WordReveal ─── */
interface WordRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function WordReveal({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  duration = DURATION.slow,
  stagger: staggerDelay = STAGGER.word,
}: WordRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: '0%',
                transition: {
                  duration,
                  ease: EASE_MASK_REVEAL,
                  delay: delay + i * staggerDelay,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ─── LineReveal ─── */
interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function LineReveal({
  children,
  className = '',
  delay = 0,
  duration = DURATION.normal,
}: LineRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="will-change-transform"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration, ease: EASE_MASK_REVEAL, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── CharacterReveal ─── */
interface CharacterRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function CharacterReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  duration = DURATION.fast,
  stagger: staggerDelay = STAGGER.character,
}: CharacterRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: '0%',
                transition: {
                  duration,
                  ease: EASE_MASK_REVEAL,
                  delay: delay + i * staggerDelay,
                },
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
