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
      <section className='relative h-[55vh] sm:h-[65vh] lg:h-[70vh] min-h-[320px] bg-[#1A1A2E] overflow-hidden'>
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
        <div className='absolute bottom-16 sm:bottom-10 left-5 sm:left-8 lg:left-12 z-10'>
          <h1
            className='text-3xl sm:text-5xl lg:text-6xl text-white leading-tight'
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            {name}
          </h1>
        </div>

        {/* Thumbnails */}
        <div className='absolute bottom-4 left-0 right-0 z-10 flex gap-2 justify-center sm:justify-end sm:right-8 sm:left-auto lg:right-12 px-5 sm:px-0 overflow-x-auto'>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-12 h-9 sm:w-14 sm:h-10 overflow-hidden border-2 transition-all duration-200 ${
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
              className='absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white text-2xl'
              onClick={() => setLightboxOpen(false)}
              aria-label='Close lightbox'
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='max-w-5xl max-h-[90vh] mx-4 sm:mx-8'
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeIndex]}
                alt={`${name} — photo ${activeIndex + 1}`}
                className='max-w-full max-h-[75vh] object-contain'
              />
              {/* Lightbox thumbnails */}
              <div className='flex gap-2 sm:gap-3 mt-3 sm:mt-4 justify-center overflow-x-auto pb-1'>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`flex-shrink-0 w-12 h-9 sm:w-16 sm:h-11 overflow-hidden border transition-all ${
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
