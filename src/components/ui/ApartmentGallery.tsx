'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  name: string;
}

export default function ApartmentGallery({ images, name }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <section className='relative h-[70vh] min-h-[500px] bg-[#1A1A2E] overflow-hidden'>
        {/* Main image */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='absolute inset-0 cursor-pointer'
            onClick={() => setLightboxOpen(true)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex]}
              alt={`${name} — photo ${activeIndex + 1}`}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/50 to-transparent' />
          </motion.div>
        </AnimatePresence>

        {/* Title overlay */}
        <div className='absolute bottom-10 left-8 lg:left-12 z-10'>
          <h1
            className='text-4xl sm:text-5xl lg:text-6xl text-white leading-tight'
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            {name}
          </h1>
        </div>

        {/* Thumbnails */}
        <div className='absolute bottom-8 right-8 lg:right-12 z-10 flex gap-2'>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-14 h-10 overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex ? 'border-[#C5A55A]' : 'border-white/30 hover:border-white/60'
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt='' className='w-full h-full object-cover' />
            </button>
          ))}
        </div>

        {/* Photo count */}
        <div className='absolute top-8 right-8 z-10'>
          <span
            className='text-white/60 text-sm'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
          >
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] bg-[#0A0A0A]/95 flex items-center justify-center'
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className='absolute top-6 right-6 text-white/60 hover:text-white text-3xl'
              onClick={() => setLightboxOpen(false)}
              aria-label='Close lightbox'
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='max-w-5xl max-h-[90vh] mx-8'
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeIndex]}
                alt={`${name} — photo ${activeIndex + 1}`}
                className='max-w-full max-h-[80vh] object-contain'
              />
              {/* Lightbox thumbnails */}
              <div className='flex gap-3 mt-4 justify-center'>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-16 h-11 overflow-hidden border transition-all ${
                      i === activeIndex ? 'border-[#C5A55A]' : 'border-white/20'
                    }`}
                    aria-label={`View photo ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt='' className='w-full h-full object-cover' />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
