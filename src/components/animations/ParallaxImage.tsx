'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scaleOnScroll?: boolean;
  clipReveal?: 'left' | 'right' | 'bottom' | 'none';
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.15,
  scaleOnScroll = false,
  clipReveal = 'none',
  priority = false,
}: ParallaxImageProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax: image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);

  // Optional zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);

  // Clip-path reveal animation
  const clipMap = {
    left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0% 0 0)' },
    right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0%)' },
    bottom: { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0% 0)' },
    none: { hidden: undefined, visible: undefined },
  };

  const clip = clipMap[clipReveal];

  if (reduced) {
    return (
      <div ref={containerRef} className={`overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      initial={clip.hidden ? { clipPath: clip.hidden } : undefined}
      whileInView={clip.visible ? { clipPath: clip.visible } : undefined}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative w-full h-full will-change-transform"
        style={{
          y,
          scale: scaleOnScroll ? scale : 1.15,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
}
