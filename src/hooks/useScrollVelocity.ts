'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tracks scroll velocity and direction.
 * Uses Lenis scroll events when available, falls back to native scroll.
 */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  const handleScroll = useCallback(() => {
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt === 0) return;

    const currentY = window.scrollY;
    const dy = currentY - lastScrollY.current;
    const v = (dy / dt) * 1000; // px/s

    setVelocity(v);
    setDirection(dy > 0 ? 'down' : dy < 0 ? 'up' : null);

    lastScrollY.current = currentY;
    lastTime.current = now;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { velocity, direction, scrollY: lastScrollY };
}
