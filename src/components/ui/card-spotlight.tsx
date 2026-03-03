'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export function CardSpotlight({ children, className }: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden transition-all duration-500',
        'border border-white/8 hover:border-gold/30',
        className
      )}
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      {/* Gold spotlight that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(197,165,90,0.18), transparent 70%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
