'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const leftLinks = [
  { href: '/apartments', label: 'Apartments' },
  { href: '/experience', label: 'Experience' },
];

const rightLinks = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/book', label: 'Book Direct' },
];

// Shared link animation variant
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const linkVariant = {
  hidden: { opacity: 0, y: 8 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: EASE },
  }),
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-midnight/95 backdrop-blur-md shadow-lg border-b border-white/5 py-3'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between'>

          {/* Left nav — desktop */}
          <div className='hidden md:flex items-center gap-8 flex-1'>
            {leftLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={0.2 + i * 0.07}
                variants={linkVariant}
                initial='hidden'
                animate='show'
              >
                <Link
                  href={link.href}
                  className='font-body text-white/75 hover:text-white text-[13px] tracking-[0.12em] uppercase transition-colors duration-200 relative group'
                >
                  {link.label}
                  <span className='absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300' />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Center — Logo (anchored scale entrance) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className='absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-none md:mx-auto'
          >
            <Link href='/' className='flex flex-col items-center group'>
              <span className='font-display text-xl md:text-2xl tracking-[0.25em] text-white font-normal whitespace-nowrap'>
                VILLA AUREA
              </span>
              <span className='font-label text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gold opacity-70 group-hover:opacity-100 transition-opacity duration-300'>
                Hvar · Croatia
              </span>
            </Link>
          </motion.div>

          {/* Right nav — desktop */}
          <div className='hidden md:flex items-center gap-8 flex-1 justify-end'>
            {rightLinks.map((link, i) =>
              link.label === 'Book Direct' ? (
                <motion.div
                  key={link.href}
                  custom={0.3 + i * 0.07}
                  variants={linkVariant}
                  initial='hidden'
                  animate='show'
                >
                  <Link
                    href={link.href}
                    className='font-label flex items-center gap-2 px-5 py-2.5 border border-gold/70 text-gold text-[12px] tracking-[0.15em] uppercase hover:bg-gold hover:border-gold hover:text-white transition-all duration-300 min-h-[44px]'
                  >
                    <span>Book Direct</span>
                    <span className='text-[10px]'>→</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={link.href}
                  custom={0.3 + i * 0.07}
                  variants={linkVariant}
                  initial='hidden'
                  animate='show'
                >
                  <Link
                    href={link.href}
                    className='font-body text-white/75 hover:text-white text-[13px] tracking-[0.12em] uppercase transition-colors duration-200 relative group'
                  >
                    {link.label}
                    <span className='absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300' />
                  </Link>
                </motion.div>
              )
            )}
          </div>

          {/* Mobile burger — fades in last */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className='md:hidden flex flex-col gap-[5px] p-3 ml-auto min-w-[48px] min-h-[48px] items-center justify-center z-50'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block h-px w-6 bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className='fixed inset-0 z-40 bg-midnight flex flex-col items-center justify-center'
          >
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-gold/30' aria-hidden='true' />
            <nav className='flex flex-col items-center gap-8'>
              {[...leftLinks, ...rightLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.45 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className='font-heading block text-5xl text-white hover:text-gold transition-colors duration-300'
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className='absolute bottom-12 text-center space-y-1'
            >
              <p className='font-body text-muted text-sm tracking-widest uppercase'>stay@villa-aurea.com</p>
              <p className='font-body text-muted text-sm'>+385 21 742 800</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
