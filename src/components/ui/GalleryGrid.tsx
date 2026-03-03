'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface Props {
  images: GalleryImage[];
}

const CATEGORIES = ['all', 'exterior', 'bedroom', 'bathroom', 'terrace', 'sea', 'local', 'jacuzzi', 'living'];

export default function GalleryGrid({ images }: Props) {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'all' ? images : images.filter((img) => img.category === filter);
  const activeCategories = ['all', ...Array.from(new Set(images.map((img) => img.category)))];

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

  const nextImage = () => {
    if (lightbox !== null) setLightbox((lightbox + 1) % filtered.length);
  };

  const prevImage = () => {
    if (lightbox !== null) setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  };

  return (
    <>
      {/* Filter bar */}
      <section className='bg-[#FAF7F2] py-8 border-b border-[#E8E0D4]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap gap-3 justify-center'>
          {activeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
                filter === cat
                  ? 'bg-[#1A1A2E] text-white'
                  : 'border border-[#E8E0D4] text-[#8A8580] hover:border-[#C5A55A] hover:text-[#C5A55A]'
              }`}
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section className='bg-[#FAF7F2] py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className='break-inside-avoid overflow-hidden cursor-pointer group relative'
                  onClick={() => openLightbox(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className='w-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-[#1A1A2E]/0 group-hover:bg-[#1A1A2E]/30 transition-all duration-300 flex items-center justify-center'>
                    <span
                      className='text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                    >
                      View
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] bg-black/95 flex items-center justify-center'
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className='absolute top-6 right-6 text-white/60 hover:text-white text-2xl z-10'
              onClick={closeLightbox}
              aria-label='Close'
            >
              ✕
            </button>

            {/* Prev */}
            <button
              className='absolute left-4 sm:left-8 text-white/60 hover:text-white text-3xl z-10 p-4'
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label='Previous image'
            >
              ←
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.3 }}
              className='max-w-5xl max-h-[85vh] mx-16'
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                className='max-w-full max-h-[80vh] object-contain'
              />
              <p
                className='text-white/50 text-sm mt-3 text-center'
                style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
              >
                {filtered[lightbox].alt}
              </p>
            </motion.div>

            {/* Next */}
            <button
              className='absolute right-4 sm:right-8 text-white/60 hover:text-white text-3xl z-10 p-4'
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label='Next image'
            >
              →
            </button>

            {/* Counter */}
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2'>
              <span
                className='text-white/40 text-sm'
                style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
              >
                {lightbox + 1} / {filtered.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
