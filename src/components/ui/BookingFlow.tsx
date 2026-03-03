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

  const inputClass = 'w-full border border-[#E8E0D4] px-4 py-3 text-sm text-[#2D2D2D] outline-none focus:border-[#C5A55A] transition-colors bg-white';
  const labelClass = 'text-[10px] tracking-widest uppercase text-[#8A8580] block mb-2';

  return (
    <section className='py-20 bg-[#FAF7F2]'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Progress steps */}
        <div className='flex items-center justify-between mb-16 relative'>
          <div className='absolute top-3 left-0 right-0 h-px bg-[#E8E0D4] -z-0' />
          {steps.map((s) => (
            <div key={s.n} className='flex flex-col items-center gap-2 z-10'>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  step >= s.n
                    ? 'bg-[#C5A55A] text-white'
                    : 'bg-white border border-[#E8E0D4] text-[#8A8580]'
                }`}
                style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
              >
                {step > s.n ? '✓' : s.n}
              </div>
              <span
                className={`text-xs tracking-wider hidden sm:block ${step >= s.n ? 'text-[#1A1A2E]' : 'text-[#8A8580]'}`}
                style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
              >
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
              <h2
                className='text-3xl text-[#1A1A2E] mb-8'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                Choose your apartment
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {apartments.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedApt(a.slug)}
                    className={`text-left border-2 transition-all duration-200 overflow-hidden ${
                      selectedApt === a.slug ? 'border-[#C5A55A]' : 'border-[#E8E0D4] hover:border-[#C5A55A]/50'
                    }`}
                  >
                    <div className='aspect-[16/9] overflow-hidden'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.image} alt={a.name} className='w-full h-full object-cover' />
                    </div>
                    <div className='p-4'>
                      <h3
                        className='text-lg text-[#1A1A2E] mb-1'
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {a.name}
                      </h3>
                      <p
                        className='text-[#8A8580] text-xs mb-2'
                        style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                      >
                        Up to {a.guests.max} guests · {a.size}m²
                      </p>
                      <p
                        className='text-[#C5A55A] text-sm'
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        from €{a.priceFrom}/night
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className='flex justify-end mt-8'>
                <button
                  onClick={() => selectedApt && setStep(2)}
                  disabled={!selectedApt}
                  className='px-10 py-4 bg-[#1A1A2E] text-white text-sm tracking-[0.15em] uppercase disabled:opacity-40 hover:bg-[#C5A55A] transition-all duration-300'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
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
              <h2
                className='text-3xl text-[#1A1A2E] mb-8'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
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
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
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
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                  />
                </div>
                <div>
                  <label className={labelClass}>Number of guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className={inputClass}
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                  >
                    {Array.from({ length: apt?.guests.max || 6 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} guest{n !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price summary */}
              {nights > 0 && apt && (
                <div className='bg-white border border-[#E8E0D4] p-6 mb-8'>
                  <h3
                    className='text-xl text-[#1A1A2E] mb-4'
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Price summary
                  </h3>
                  <div className='space-y-2' style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}>
                    <div className='flex justify-between text-sm'>
                      <span className='text-[#8A8580]'>{apt.name}</span>
                      <span className='text-[#1A1A2E]'>€{apt.priceFrom}/night</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-[#8A8580]'>{nights} nights</span>
                      <span className='text-[#1A1A2E]'>€{total}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-green-600'>Direct booking saving</span>
                      <span className='text-green-600'>-€{Math.round(total * 0.15)} (vs Booking.com)</span>
                    </div>
                    <div className='flex justify-between pt-3 border-t border-[#E8E0D4] font-medium'>
                      <span className='text-[#1A1A2E]'>Total</span>
                      <span className='text-[#C5A55A] text-lg' style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>€{total}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className='flex justify-between'>
                <button
                  onClick={() => setStep(1)}
                  className='px-8 py-4 border border-[#E8E0D4] text-[#8A8580] text-sm tracking-widest uppercase hover:border-[#1A1A2E] hover:text-[#1A1A2E] transition-all'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => checkIn && checkOut && nights > 0 && setStep(3)}
                  disabled={!checkIn || !checkOut || nights <= 0}
                  className='px-10 py-4 bg-[#1A1A2E] text-white text-sm tracking-[0.15em] uppercase disabled:opacity-40 hover:bg-[#C5A55A] transition-all duration-300'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
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
              <h2
                className='text-3xl text-[#1A1A2E] mb-8'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
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
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
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
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
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
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
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
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                />
              </div>

              <div className='flex justify-between'>
                <button
                  onClick={() => setStep(2)}
                  className='px-8 py-4 border border-[#E8E0D4] text-[#8A8580] text-sm tracking-widest uppercase hover:border-[#1A1A2E] hover:text-[#1A1A2E] transition-all'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => guestInfo.name && guestInfo.email && setStep(4)}
                  disabled={!guestInfo.name || !guestInfo.email}
                  className='px-10 py-4 bg-[#C5A55A] text-white text-sm tracking-[0.15em] uppercase disabled:opacity-40 hover:bg-[#D4B96E] transition-all duration-300'
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
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
              <div className='w-16 h-16 rounded-full bg-[#C5A55A]/10 border border-[#C5A55A] flex items-center justify-center mx-auto mb-6'>
                <span className='text-[#C5A55A] text-2xl'>✓</span>
              </div>
              <h2
                className='text-4xl text-[#1A1A2E] mb-4'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                Request received
              </h2>
              <p
                className='text-[#8A8580] max-w-md mx-auto mb-8 leading-relaxed'
                style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
              >
                Thank you, <strong className='text-[#1A1A2E]'>{guestInfo.name}</strong>. We've received your reservation request for{' '}
                <strong className='text-[#1A1A2E]'>{apt?.name}</strong> and will confirm within 24 hours at{' '}
                <strong className='text-[#1A1A2E]'>{guestInfo.email}</strong>.
              </p>

              {/* Summary */}
              <div className='bg-[#FAF7F2] border border-[#E8E0D4] p-6 max-w-md mx-auto text-left mb-10'>
                <div className='space-y-3' style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}>
                  <div className='flex justify-between text-sm'>
                    <span className='text-[#8A8580]'>Apartment</span>
                    <span className='text-[#1A1A2E]'>{apt?.name}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-[#8A8580]'>Check-in</span>
                    <span className='text-[#1A1A2E]'>{checkIn}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-[#8A8580]'>Check-out</span>
                    <span className='text-[#1A1A2E]'>{checkOut}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-[#8A8580]'>Guests</span>
                    <span className='text-[#1A1A2E]'>{guests}</span>
                  </div>
                  <div className='flex justify-between pt-3 border-t border-[#E8E0D4]'>
                    <span className='text-[#1A1A2E] font-medium'>Total (direct rate)</span>
                    <span className='text-[#C5A55A]' style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>€{total}</span>
                  </div>
                </div>
              </div>

              <Link
                href='/'
                className='inline-block px-10 py-4 bg-[#1A1A2E] text-white text-sm tracking-[0.15em] uppercase hover:bg-[#C5A55A] transition-all duration-300'
                style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
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
