'use client';

import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';
import { SPRING_MAGNETIC } from '@/lib/animation-config';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  href,
  onClick,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, SPRING_MAGNETIC);
  const y = useSpring(0, SPRING_MAGNETIC);

  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  const disabled = reduced || isTouchDevice;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [disabled, strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  // Always use a div wrapper — avoids polymorphic ref type issues
  return (
    <motion.div
      ref={ref}
      className={className}
      style={disabled ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-magnetic-hover={isHovered || undefined}
    >
      {href ? <a href={href}>{children}</a> : children}
    </motion.div>
  );
}
