'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import Link from 'next/link';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import { EASE_CINEMATIC, VIEWPORT_ONCE } from '@/lib/animation-config';

const floatingCards = [
  { title: 'Panoramic View', desc: '270° Adriatic sea panorama', x: '5%', y: '20%', delay: 0.2 },
  { title: 'Private Jacuzzi', desc: 'Under the stars', x: '68%', y: '12%', delay: 0.35 },
  { title: 'Steam Bath', desc: 'Mediterranean ritual', x: '70%', y: '60%', delay: 0.5 },
];

export default function InteractiveExperience() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-15%']);
  // Scroll-driven zoom: foreground scales down as user scrolls through
  const fgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.15, 1.08]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const bgParallaxX = useTransform(springX, [-1, 1], ['2%', '-2%']);
  const bgParallaxY = useTransform(springY, [-1, 1], ['2%', '-2%']);
  const fgParallaxX = useTransform(springX, [-1, 1], ['4%', '-4%']);
  const fgParallaxY = useTransform(springY, [-1, 1], ['3%', '-3%']);

  // Cursor glow position
  const glowX = useTransform(springX, [-1, 1], ['30%', '70%']);
  const glowY = useTransform(springY, [-1, 1], ['30%', '70%']);

  // Card parallax for floating cards
  const cardShiftX = useTransform(springX, [-1, 1], ['12px', '-12px']);
  const cardShiftY = useTransform(springY, [-1, 1], ['8px', '-8px']);

  return (
    <section
      ref={sectionRef}
      className="relative bg-midnight overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* === PARALLAX BACKGROUND LAYER === */}
      <motion.div
        style={reduced ? undefined : { y: bgY }}
        className="absolute inset-0 scale-[1.2]"
        aria-hidden="true"
      >
        <motion.div
          style={reduced ? undefined : { x: bgParallaxX, y: bgParallaxY }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1555990793-da11153b2473?w=2000&q=85"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/20 to-midnight/80" />
      </motion.div>

      {/* === FOREGROUND IMAGE LAYER (deeper parallax + scroll zoom) === */}
      <motion.div
        style={reduced ? undefined : { y: fgY, scale: fgScale }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <motion.div
          style={reduced ? undefined : { x: fgParallaxX, y: fgParallaxY }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-transparent" />
      </motion.div>

      {/* === 3rd LAYER: Golden gradient overlay at different speed === */}
      <motion.div
        style={
          reduced
            ? undefined
            : {
                y: useTransform(scrollYProgress, [0, 1], ['5%', '-5%']),
              }
        }
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3" />
      </motion.div>

      {/* === CURSOR GLOW === */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovering ? 0.6 : 0,
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(600px circle at ${gx} ${gy}, rgba(197,165,90,0.08), transparent 60%)`,
            ),
          }}
          aria-hidden="true"
        />
      )}

      {/* === GOLD GRAIN TEXTURE === */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* === CONTENT === */}
      <div
        className="relative min-h-screen flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
          setIsHovering(false);
        }}
      >
        {/* Top section — headline */}
        <motion.div
          style={reduced ? undefined : { y: textY }}
          className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-4 sm:px-6"
        >
          <SectionReveal variant="fade-up">
            <span className="font-label text-[11px] tracking-[0.4em] uppercase text-gold">
              Immersive Preview
            </span>
            <div className="w-12 h-px bg-gold mx-auto mt-5 mb-8" />
          </SectionReveal>

          <WordReveal
            text="Step inside before you arrive"
            as="h2"
            className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05]"
          />

          <SectionReveal variant="fade-up" delay={0.4}>
            <p className="font-body text-white/50 mt-6 max-w-sm mx-auto hidden md:block font-light">
              Move your cursor to explore — the view is different from every angle
            </p>
          </SectionReveal>
        </motion.div>

        {/* === INTERACTIVE VIEWPORT === */}
        <div className="relative flex-1 min-h-[450px] px-6 lg:px-20 mb-20">
          {/* Floating info cards */}
          {floatingCards.map((card) => (
            <motion.div
              key={card.title}
              initial={reduced ? undefined : { opacity: 0, scale: 0.85 }}
              whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay, duration: 0.6 }}
              style={
                reduced
                  ? { position: 'absolute' as const, left: card.x, top: card.y, zIndex: 10 }
                  : {
                      position: 'absolute' as const,
                      left: card.x,
                      top: card.y,
                      x: cardShiftX,
                      y: cardShiftY,
                      zIndex: 10,
                    }
              }
              className="hidden lg:block"
            >
              <div className="bg-midnight/80 backdrop-blur-md border border-gold/40 px-5 py-4 min-w-[160px]">
                <div className="w-5 h-px bg-gold mb-3" />
                <p className="font-display text-white text-base">{card.title}</p>
                <p className="font-body text-white/50 text-xs mt-1 font-light">{card.desc}</p>
              </div>
              <div className="absolute -bottom-2 left-6 w-2 h-2 rounded-full border border-gold bg-transparent" />
            </motion.div>
          ))}

          {/* Central frame */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 30 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-x-[15%] inset-y-[10%] border border-gold/20 hidden lg:block pointer-events-none"
          />

          {/* Corner brackets */}
          {[
            { pos: 'top-0 left-0', borders: 'border-t border-l' },
            { pos: 'top-0 right-0', borders: 'border-t border-r' },
            { pos: 'bottom-0 left-0', borders: 'border-b border-l' },
            { pos: 'bottom-0 right-0', borders: 'border-b border-r' },
          ].map(({ pos, borders }) => (
            <div
              key={pos}
              className={`absolute ${pos} w-12 h-12 ${borders} border-gold/60`}
            />
          ))}

          {/* Stats row */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-8 inset-x-0 flex items-center justify-center gap-0"
          >
            {[
              { n: '3', label: 'Apartments' },
              { n: '270°', label: 'Sea View' },
              { n: '€280', label: 'Per night from' },
              { n: '100m', label: 'To beach' },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className={`px-8 py-4 text-center bg-midnight/70 backdrop-blur-sm ${
                  i < arr.length - 1 ? 'border-r border-white/10' : ''
                }`}
              >
                <p className="font-display text-gold text-2xl">{item.n}</p>
                <p className="font-label text-white/40 text-[10px] tracking-widest uppercase mt-0.5">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <SectionReveal variant="fade-up" delay={0.5} className="flex justify-center pb-20">
          <Link href="/gallery" className="flex items-center gap-4 group">
            <span className="w-10 h-px bg-gold/50 group-hover:w-16 transition-all duration-300" />
            <span className="font-label text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-200">
              View Full Gallery
            </span>
            <span className="text-gold group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
