'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/apartments', label: 'Apartments' },
  { href: '/experience', label: 'Experience' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/book', label: 'Book Direct' },
];

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
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1A1A2E]/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className='max-w-7xl mx-auto px-6 flex items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex flex-col items-start group'>
            <span
              className='font-display text-2xl tracking-widest text-white'
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
            >
              VILLA AUREA
            </span>
            <span
              className='text-[10px] tracking-[0.35em] uppercase text-[#C5A55A] opacity-80 group-hover:opacity-100 transition-opacity'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              Hvar, Croatia
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center gap-10'>
            {navLinks.map((link) =>
              link.label === 'Book Direct' ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className='px-6 py-2.5 border border-[#C5A55A] text-[#C5A55A] text-sm tracking-[0.15em] uppercase hover:bg-[#C5A55A] hover:text-white transition-all duration-300'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
                >
                  Book Direct
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-white/80 hover:text-white text-sm tracking-[0.1em] uppercase transition-colors duration-200 relative group'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400 }}
                >
                  {link.label}
                  <span className='absolute -bottom-0.5 left-0 w-0 h-px bg-[#C5A55A] group-hover:w-full transition-all duration-300' />
                </Link>
              )
            )}
          </div>

          {/* Mobile burger */}
          <button
            className='md:hidden flex flex-col gap-1.5 p-2 z-50'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-7 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}
            />
            <span
              className={`block h-px w-7 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-7 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='fixed inset-0 z-40 bg-[#1A1A2E] flex flex-col items-center justify-center'
          >
            <nav className='flex flex-col items-center gap-10'>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className='block text-4xl text-white hover:text-[#C5A55A] transition-colors duration-300'
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
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
              className='absolute bottom-12 text-center'
            >
              <p className='text-[#8A8580] text-sm tracking-widest uppercase' style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                stay@villa-aurea.com
              </p>
              <p className='text-[#8A8580] text-sm mt-1' style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                +385 21 742 800
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
