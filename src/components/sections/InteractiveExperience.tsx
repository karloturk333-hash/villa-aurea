'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

const floatingCards = [
  { title: 'Panoramic View', desc: '270° Adriatic sea panorama', x: '5%', y: '20%', delay: 0.2 },
  { title: 'Private Jacuzzi', desc: 'Under the stars', x: '68%', y: '12%', delay: 0.35 },
  { title: 'Steam Bath', desc: 'Mediterranean ritual', x: '70%', y: '60%', delay: 0.5 },
];

export default function InteractiveExperience() {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <section
      ref={sectionRef}
      className='relative bg-[#1A1A2E] overflow-hidden'
      style={{ minHeight: '100vh' }}
    >
      {/* === PARALLAX BACKGROUND LAYER === */}
      <motion.div
        style={{ y: bgY }}
        className='absolute inset-0 scale-[1.2]'
        aria-hidden='true'
      >
        <motion.div
          style={{ x: bgParallaxX, y: bgParallaxY }}
          className='absolute inset-0'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='https://images.unsplash.com/photo-1555990793-da11153b2473?w=2000&q=85'
            alt=''
            className='w-full h-full object-cover opacity-40'
          />
        </motion.div>
        {/* Deep gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/60 via-[#1A1A2E]/20 to-[#1A1A2E]/80' />
      </motion.div>

      {/* === FOREGROUND IMAGE LAYER (deeper parallax) === */}
      <motion.div
        style={{ y: fgY }}
        className='absolute inset-0 scale-[1.15]'
        aria-hidden='true'
      >
        <motion.div
          style={{ x: fgParallaxX, y: fgParallaxY }}
          className='absolute inset-0'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=80'
            alt=''
            className='w-full h-full object-cover'
          />
        </motion.div>
        <div className='absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/10 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/60 to-transparent' />
      </motion.div>

      {/* === GOLD GRAIN TEXTURE === */}
      <div
        className='absolute inset-0 opacity-[0.03] pointer-events-none'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* === CONTENT === */}
      <div
        className='relative min-h-screen flex flex-col'
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovering(false); }}
      >
        {/* Top section — headline */}
        <motion.div
          style={{ y: textY }}
          className='flex flex-col items-center justify-center text-center pt-32 pb-20 px-6'
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className='text-[11px] tracking-[0.4em] uppercase text-[#C5A55A]'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              Immersive Preview
            </span>
            <div className='w-12 h-px bg-[#C5A55A] mx-auto mt-5 mb-8' />
            <h2
              className='text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05]'
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Step inside<br />
              <em style={{ fontStyle: 'italic', color: '#C5A55A' }}>before you arrive</em>
            </h2>
            <p
              className='text-white/50 mt-6 max-w-sm mx-auto hidden md:block'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
            >
              Move your cursor to explore — the view is different from every angle
            </p>
          </motion.div>
        </motion.div>

        {/* === INTERACTIVE VIEWPORT === */}
        <div className='relative flex-1 min-h-[450px] mx-6 lg:mx-20 mb-20'>
          {/* Floating info cards */}
          {floatingCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay, duration: 0.6 }}
              style={{
                position: 'absolute',
                left: card.x,
                top: card.y,
                x: useTransform(springX, [-1, 1], ['12px', '-12px']),
                y: useTransform(springY, [-1, 1], ['8px', '-8px']),
                zIndex: 10,
              }}
              className='hidden lg:block'
            >
              <div className='bg-[#1A1A2E]/80 backdrop-blur-md border border-[#C5A55A]/40 px-5 py-4 min-w-[160px]'>
                <div className='w-5 h-px bg-[#C5A55A] mb-3' />
                <p
                  className='text-white text-base'
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {card.title}
                </p>
                <p
                  className='text-white/50 text-xs mt-1'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                >
                  {card.desc}
                </p>
              </div>
              {/* Connecting dot */}
              <div className='absolute -bottom-2 left-6 w-2 h-2 rounded-full border border-[#C5A55A] bg-transparent' />
            </motion.div>
          ))}

          {/* Central frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className='absolute inset-x-[15%] inset-y-[10%] border border-[#C5A55A]/20 hidden lg:block pointer-events-none'
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
              className={`absolute ${pos} w-12 h-12 ${borders} border-[#C5A55A]/60`}
            />
          ))}

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='absolute bottom-8 inset-x-0 flex items-center justify-center gap-0'
          >
            {[
              { n: '3', label: 'Apartments' },
              { n: '270°', label: 'Sea View' },
              { n: '€280', label: 'Per night from' },
              { n: '100m', label: 'To beach' },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className={`px-8 py-4 text-center bg-[#1A1A2E]/70 backdrop-blur-sm ${i < arr.length - 1 ? 'border-r border-white/10' : ''}`}
              >
                <p
                  className='text-[#C5A55A] text-2xl'
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {item.n}
                </p>
                <p
                  className='text-white/40 text-[10px] tracking-widest uppercase mt-0.5'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className='flex justify-center pb-20'
        >
          <Link
            href='/gallery'
            className='flex items-center gap-4 group'
          >
            <span className='w-10 h-px bg-[#C5A55A]/50 group-hover:w-16 transition-all duration-300' />
            <span
              className='text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-200'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              View Full Gallery
            </span>
            <span className='text-[#C5A55A] group-hover:translate-x-2 transition-transform duration-300'>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
