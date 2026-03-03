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
      <div className='bg-white border border-stone p-5 lg:p-6 shadow-lg'>
        {/* Header */}
        <div className='flex items-baseline justify-between mb-6'>
          <div>
            <span className='font-display text-3xl text-midnight'>
              €{apartment.priceFrom}
            </span>
            <span className='font-body text-muted text-sm ml-1 font-light'>
              /night
            </span>
          </div>
          <span className='font-label text-[10px] tracking-widest uppercase text-gold bg-gold/10 px-3 py-1'>
            Best Rate
          </span>
        </div>

        {/* Date inputs */}
        <div className='grid grid-cols-2 gap-0 border border-stone mb-4 min-w-0'>
          <div className='p-3 border-r border-stone'>
            <label className='font-label text-[10px] tracking-widest uppercase text-muted block mb-1'>
              Check-in
            </label>
            <input
              type='date'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className='font-body w-full text-xs sm:text-sm text-midnight bg-transparent outline-none min-w-0'
            />
          </div>
          <div className='p-3'>
            <label className='font-label text-[10px] tracking-widest uppercase text-muted block mb-1'>
              Check-out
            </label>
            <input
              type='date'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className='font-body w-full text-xs sm:text-sm text-midnight bg-transparent outline-none min-w-0'
            />
          </div>
        </div>

        {/* Guests */}
        <div className='border border-stone p-3 mb-6 flex items-center justify-between'>
          <div>
            <label className='font-label text-[10px] tracking-widest uppercase text-muted block mb-1'>
              Guests
            </label>
            <span className='font-body text-sm text-midnight'>
              {guests} guest{guests !== 1 ? 's' : ''}
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className='w-7 h-7 border border-stone flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-all'
              aria-label='Remove guest'
            >
              −
            </button>
            <span className='font-body text-sm w-4 text-center text-midnight'>
              {guests}
            </span>
            <button
              onClick={() => setGuests(Math.min(apartment.guests.max, guests + 1))}
              className='w-7 h-7 border border-stone flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-all'
              aria-label='Add guest'
            >
              +
            </button>
          </div>
        </div>

        {/* Price summary */}
        {nights > 0 && (
          <div className='bg-warm-cream p-4 mb-5 space-y-2'>
            <div className='font-body flex justify-between text-sm font-light'>
              <span className='text-muted'>€{apartment.priceFrom} × {nights} nights</span>
              <span className='text-midnight'>€{total}</span>
            </div>
            <div className='font-body flex justify-between text-sm font-light'>
              <span className='text-muted'>Booking.com price (~+15%)</span>
              <span className='text-muted line-through'>€{Math.round(total * 1.15)}</span>
            </div>
            <div className='pt-2 border-t border-stone flex justify-between'>
              <span className='font-label text-midnight font-medium text-sm'>Total</span>
              <span className='font-display text-gold font-medium'>€{total}</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/book?apartment=${apartment.slug}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`}
          className='font-label block w-full py-4 bg-gold text-white text-center text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-300'
        >
          Reserve
        </Link>

        <p className='font-body text-center text-muted text-xs mt-4 font-light'>
          No charge until confirmation · Free cancellation available
        </p>
      </div>
    </div>
  );
}
