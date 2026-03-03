'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { apartments, seasonalPricing } from '@/data/villa';

type Step = 1 | 2 | 3 | 4;

export default function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [selectedApt, setSelectedApt] = useState<string>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '', notes: '' });

  const apt = apartments.find((a) => a.slug === selectedApt);
  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.floor((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 0;
  const total = apt ? nights * apt.priceFrom : 0;

  const steps = [
    { n: 1, label: 'Choose Apartment' },
    { n: 2, label: 'Select Dates' },
    { n: 3, label: 'Your Details' },
    { n: 4, label: 'Confirmation' },
  ];

  const inputClass = 'font-body w-full border border-stone px-4 py-3 text-sm text-charcoal outline-none focus:border-gold transition-colors bg-white';
  const labelClass = 'font-label text-[10px] tracking-widest uppercase text-muted block mb-2';

  return (
    <section className='py-12 lg:py-20 bg-warm-cream'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6'>
        {/* Progress steps */}
        <div className='flex items-center justify-between mb-10 lg:mb-16 relative'>
          <div className='absolute top-3 left-0 right-0 h-px bg-stone -z-0' />
          {steps.map((s) => (
            <div key={s.n} className='flex flex-col items-center gap-2 z-10'>
              <div
                className={`font-body w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  step >= s.n
                    ? 'bg-gold text-white'
                    : 'bg-white border border-stone text-muted'
                }`}
              >
                {step > s.n ? '✓' : s.n}
              </div>
              <span className={`font-label text-xs tracking-wider hidden sm:block ${step >= s.n ? 'text-midnight' : 'text-muted'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode='wait'>
          {/* Step 1: Choose apartment */}
          {step === 1 && (
            <motion.div
              key='step1'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className='font-heading text-2xl sm:text-3xl text-midnight mb-6 sm:mb-8'>
                Choose your apartment
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5'>
                {apartments.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedApt(a.slug)}
                    className={`text-left border-2 transition-all duration-200 overflow-hidden ${
                      selectedApt === a.slug ? 'border-gold' : 'border-stone hover:border-gold/50'
                    }`}
                  >
                    <div className='aspect-[16/9] overflow-hidden'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.image} alt={a.name} className='w-full h-full object-cover' />
                    </div>
                    <div className='p-4'>
                      <h3 className='font-display text-lg text-midnight mb-1'>
                        {a.name}
                      </h3>
                      <p className='font-body text-muted text-xs mb-2 font-light'>
                        Up to {a.guests.max} guests · {a.size}m²
                      </p>
                      <p className='font-display text-gold text-sm'>
                        from €{a.priceFrom}/night
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className='flex justify-end mt-6 sm:mt-8'>
                <button
                  onClick={() => selectedApt && setStep(2)}
                  disabled={!selectedApt}
                  className='font-label w-full sm:w-auto px-10 py-4 bg-midnight text-white text-sm tracking-[0.15em] uppercase disabled:opacity-40 hover:bg-gold transition-all duration-300'
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Dates */}
          {step === 2 && (
            <motion.div
              key='step2'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className='font-heading text-2xl sm:text-3xl text-midnight mb-6 sm:mb-8'>
                Select your dates
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div>
                  <label className={labelClass}>Check-in date</label>
                  <input
                    type='date'
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Check-out date</label>
                  <input
                    type='date'
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Number of guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className={inputClass}
                  >
                    {Array.from({ length: apt?.guests.max || 6 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} guest{n !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price summary */}
              {nights > 0 && apt && (
                <div className='bg-white border border-stone p-6 mb-8'>
                  <h3 className='font-display text-xl text-midnight mb-4'>
                    Price summary
                  </h3>
                  <div className='font-body space-y-2 font-light'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted'>{apt.name}</span>
                      <span className='text-midnight'>€{apt.priceFrom}/night</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted'>{nights} nights</span>
                      <span className='text-midnight'>€{total}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-green-600'>Direct booking saving</span>
                      <span className='text-green-600'>-€{Math.round(total * 0.15)} (vs Booking.com)</span>
                    </div>
                    <div className='flex justify-between pt-3 border-t border-stone font-medium'>
                      <span className='text-midnight'>Total</span>
                      <span className='font-display text-gold text-lg'>€{total}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0'>
                <button
                  onClick={() => setStep(1)}
                  className='font-label w-full sm:w-auto px-8 py-4 border border-stone text-muted text-sm tracking-widest uppercase hover:border-midnight hover:text-midnight transition-all'
                >
                  ← Back
                </button>
                <button
                  onClick={() => checkIn && checkOut && nights > 0 && setStep(3)}
                  disabled={!checkIn || !checkOut || nights <= 0}
                  className='font-label w-full sm:w-auto px-10 py-4 bg-midnight text-white text-sm tracking-[0.15em] uppercase disabled:opacity-40 hover:bg-gold transition-all duration-300'
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Guest info */}
          {step === 3 && (
            <motion.div
              key='step3'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className='font-heading text-2xl sm:text-3xl text-midnight mb-6 sm:mb-8'>
                Your details
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                <div>
                  <label className={labelClass}>Full name</label>
                  <input
                    type='text'
                    placeholder='Clara & Thomas Müller'
                    value={guestInfo.name}
                    onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email address</label>
                  <input
                    type='email'
                    placeholder='you@example.com'
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone number</label>
                  <input
                    type='tel'
                    placeholder='+49 170 1234567'
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className='mb-8'>
                <label className={labelClass}>Special requests (optional)</label>
                <textarea
                  rows={4}
                  placeholder='Dietary requirements, preferred room setup, airport transfer...'
                  value={guestInfo.notes}
                  onChange={(e) => setGuestInfo({ ...guestInfo, notes: e.target.value })}
                  className={inputClass + ' resize-none'}
                />
              </div>

              <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0'>
                <button
                  onClick={() => setStep(2)}
                  className='font-label w-full sm:w-auto px-8 py-4 border border-stone text-muted text-sm tracking-widest uppercase hover:border-midnight hover:text-midnight transition-all'
                >
                  ← Back
                </button>
                <button
                  onClick={() => guestInfo.name && guestInfo.email && setStep(4)}
                  disabled={!guestInfo.name || !guestInfo.email}
                  className='font-label w-full sm:w-auto px-10 py-4 bg-gold text-white text-sm tracking-[0.15em] uppercase disabled:opacity-40 hover:bg-gold-light transition-all duration-300'
                >
                  Complete Reservation →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key='step4'
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='text-center'
            >
              <div className='w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-6'>
                <span className='text-gold text-2xl'>✓</span>
              </div>
              <h2 className='font-heading text-4xl text-midnight mb-4'>
                Request received
              </h2>
              <p className='font-body text-muted max-w-md mx-auto mb-8 leading-relaxed font-light'>
                Thank you, <strong className='text-midnight'>{guestInfo.name}</strong>. We&apos;ve received your reservation request for{' '}
                <strong className='text-midnight'>{apt?.name}</strong> and will confirm within 24 hours at{' '}
                <strong className='text-midnight'>{guestInfo.email}</strong>.
              </p>

              {/* Summary */}
              <div className='bg-warm-cream border border-stone p-6 max-w-md mx-auto text-left mb-10'>
                <div className='font-body space-y-3 font-light'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted'>Apartment</span>
                    <span className='text-midnight'>{apt?.name}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted'>Check-in</span>
                    <span className='text-midnight'>{checkIn}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted'>Check-out</span>
                    <span className='text-midnight'>{checkOut}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted'>Guests</span>
                    <span className='text-midnight'>{guests}</span>
                  </div>
                  <div className='flex justify-between pt-3 border-t border-stone'>
                    <span className='font-label text-midnight font-medium'>Total (direct rate)</span>
                    <span className='font-display text-gold'>€{total}</span>
                  </div>
                </div>
              </div>

              <Link
                href='/'
                className='font-label inline-block px-10 py-4 bg-midnight text-white text-sm tracking-[0.15em] uppercase hover:bg-gold transition-all duration-300'
              >
                Back to Villa Aurea
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
