'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Apartment {
  name: string;
  slug: string;
  priceFrom: number;
  guests: { min: number; max: number };
}

interface Props {
  apartment: Apartment;
}

export default function BookingWidget({ apartment }: Props) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [sticky, setSticky] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.floor(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const total = nights * apartment.priceFrom;

  return (
    <div className='lg:sticky lg:top-24'>
      <div className='bg-white border border-[#E8E0D4] p-5 lg:p-6 shadow-lg'>
        {/* Header */}
        <div className='flex items-baseline justify-between mb-6'>
          <div>
            <span
              className='text-3xl text-[#1A1A2E]'
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              €{apartment.priceFrom}
            </span>
            <span
              className='text-[#8A8580] text-sm ml-1'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
            >
              /night
            </span>
          </div>
          <span
            className='text-[10px] tracking-widest uppercase text-[#C5A55A] bg-[#C5A55A]/10 px-3 py-1'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
          >
            Best Rate
          </span>
        </div>

        {/* Date inputs */}
        <div className='grid grid-cols-2 gap-0 border border-[#E8E0D4] mb-4 min-w-0'>
          <div className='p-3 border-r border-[#E8E0D4]'>
            <label
              className='text-[10px] tracking-widest uppercase text-[#8A8580] block mb-1'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            >
              Check-in
            </label>
            <input
              type='date'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className='w-full text-xs sm:text-sm text-[#1A1A2E] bg-transparent outline-none min-w-0'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            />
          </div>
          <div className='p-3'>
            <label
              className='text-[10px] tracking-widest uppercase text-[#8A8580] block mb-1'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            >
              Check-out
            </label>
            <input
              type='date'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className='w-full text-xs sm:text-sm text-[#1A1A2E] bg-transparent outline-none min-w-0'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            />
          </div>
        </div>

        {/* Guests */}
        <div className='border border-[#E8E0D4] p-3 mb-6 flex items-center justify-between'>
          <div>
            <label
              className='text-[10px] tracking-widest uppercase text-[#8A8580] block mb-1'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            >
              Guests
            </label>
            <span
              className='text-sm text-[#1A1A2E]'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            >
              {guests} guest{guests !== 1 ? 's' : ''}
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className='w-7 h-7 border border-[#E8E0D4] flex items-center justify-center text-[#8A8580] hover:border-[#C5A55A] hover:text-[#C5A55A] transition-all'
              aria-label='Remove guest'
            >
              −
            </button>
            <span
              className='text-sm w-4 text-center text-[#1A1A2E]'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            >
              {guests}
            </span>
            <button
              onClick={() => setGuests(Math.min(apartment.guests.max, guests + 1))}
              className='w-7 h-7 border border-[#E8E0D4] flex items-center justify-center text-[#8A8580] hover:border-[#C5A55A] hover:text-[#C5A55A] transition-all'
              aria-label='Add guest'
            >
              +
            </button>
          </div>
        </div>

        {/* Price summary */}
        {nights > 0 && (
          <div className='bg-[#FAF7F2] p-4 mb-5 space-y-2'>
            <div className='flex justify-between text-sm' style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}>
              <span className='text-[#8A8580]'>€{apartment.priceFrom} × {nights} nights</span>
              <span className='text-[#1A1A2E]'>€{total}</span>
            </div>
            <div className='flex justify-between text-sm' style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}>
              <span className='text-[#8A8580]'>Booking.com price (~+15%)</span>
              <span className='text-[#8A8580] line-through'>€{Math.round(total * 1.15)}</span>
            </div>
            <div className='pt-2 border-t border-[#E8E0D4] flex justify-between'>
              <span className='text-[#1A1A2E] font-medium text-sm' style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>Total</span>
              <span className='text-[#C5A55A] font-medium' style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>€{total}</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/book?apartment=${apartment.slug}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`}
          className='block w-full py-4 bg-[#C5A55A] text-white text-center text-sm tracking-[0.2em] uppercase hover:bg-[#D4B96E] transition-all duration-300'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
        >
          Reserve
        </Link>

        <p
          className='text-center text-[#8A8580] text-xs mt-4'
          style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
        >
          No charge until confirmation · Free cancellation available
        </p>
      </div>
    </div>
  );
}
