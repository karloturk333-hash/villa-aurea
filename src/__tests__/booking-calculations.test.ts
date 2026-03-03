/**
 * Tests for the booking calculation logic used across BookingWidget and BookingFlow.
 * These formulas are extracted here as pure functions to verify correctness independently of the UI.
 */
import { describe, it, expect } from 'vitest';

// The exact calculation from BookingWidget.tsx and BookingFlow.tsx
function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  return Math.max(
    0,
    Math.floor(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    )
  );
}

function calculateTotal(nights: number, pricePerNight: number): number {
  return nights * pricePerNight;
}

// BookingWidget: Math.round(total * 1.15) — comparison price including OTA commission
function calculateBookingComPrice(total: number): number {
  return Math.round(total * 1.15);
}

// BookingFlow: Math.round(total * 0.15) — the saving shown when booking direct
function calculateDirectSaving(total: number): number {
  return Math.round(total * 0.15);
}

// BookingWidget guest counter: Math.min(max, Math.max(min, current + delta))
function clampGuests(current: number, delta: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, current + delta));
}

describe('calculateNights()', () => {
  it('calculates 7 nights correctly', () => {
    expect(calculateNights('2025-07-01', '2025-07-08')).toBe(7);
  });

  it('calculates 1 night correctly', () => {
    expect(calculateNights('2025-07-01', '2025-07-02')).toBe(1);
  });

  it('calculates 30 nights correctly', () => {
    expect(calculateNights('2025-07-01', '2025-07-31')).toBe(30);
  });

  it('calculates across a month boundary', () => {
    expect(calculateNights('2025-01-28', '2025-02-03')).toBe(6);
  });

  it('calculates across a year boundary', () => {
    expect(calculateNights('2025-12-28', '2026-01-04')).toBe(7);
  });

  it('returns 0 when check-out is before check-in (reversed dates)', () => {
    expect(calculateNights('2025-07-08', '2025-07-01')).toBe(0);
  });

  it('returns 0 when check-in equals check-out (same-day, 0 nights)', () => {
    expect(calculateNights('2025-07-01', '2025-07-01')).toBe(0);
  });

  it('returns 0 when check-in is empty', () => {
    expect(calculateNights('', '2025-07-08')).toBe(0);
  });

  it('returns 0 when check-out is empty', () => {
    expect(calculateNights('2025-07-01', '')).toBe(0);
  });

  it('returns 0 when both dates are empty', () => {
    expect(calculateNights('', '')).toBe(0);
  });
});

describe('calculateTotal()', () => {
  it('calculates total for Sunset Penthouse (€280/night × 7 nights)', () => {
    expect(calculateTotal(7, 280)).toBe(1960);
  });

  it('calculates total for Royal Suite (€320/night × 5 nights)', () => {
    expect(calculateTotal(5, 320)).toBe(1600);
  });

  it('calculates total for Garden Residence (€260/night × 10 nights)', () => {
    expect(calculateTotal(10, 260)).toBe(2600);
  });

  it('returns 0 for 0 nights', () => {
    expect(calculateTotal(0, 280)).toBe(0);
  });

  it('returns the nightly rate for exactly 1 night', () => {
    expect(calculateTotal(1, 280)).toBe(280);
  });
});

describe('calculateBookingComPrice() — +15% OTA commission comparison', () => {
  it('adds exactly 15% for a round number', () => {
    expect(calculateBookingComPrice(1000)).toBe(1150);
  });

  it('rounds to the nearest integer', () => {
    // 280 * 1.15 = 322.0
    expect(calculateBookingComPrice(280)).toBe(322);
  });

  it('calculates the Booking.com price for a 7-night Penthouse stay', () => {
    // €1960 * 1.15 = €2254
    expect(calculateBookingComPrice(1960)).toBe(2254);
  });

  it('returns 0 for a 0 total', () => {
    expect(calculateBookingComPrice(0)).toBe(0);
  });
});

describe('calculateDirectSaving() — 15% saving vs OTA', () => {
  it('calculates 15% saving from a round total', () => {
    expect(calculateDirectSaving(1000)).toBe(150);
  });

  it('rounds to the nearest integer', () => {
    // 280 * 0.15 = 42.0
    expect(calculateDirectSaving(280)).toBe(42);
  });

  it('direct total + saving equals the Booking.com price', () => {
    const directTotal = 1960;
    const saving = calculateDirectSaving(directTotal);
    const bookingComPrice = calculateBookingComPrice(directTotal);
    // 1960 + 294 = 2254
    expect(directTotal + saving).toBe(bookingComPrice);
  });

  it('returns 0 for a 0 total', () => {
    expect(calculateDirectSaving(0)).toBe(0);
  });
});

describe('clampGuests() — guest counter clamping', () => {
  it('increments guest count within bounds', () => {
    expect(clampGuests(2, 1, 1, 6)).toBe(3);
  });

  it('decrements guest count within bounds', () => {
    expect(clampGuests(3, -1, 1, 6)).toBe(2);
  });

  it('does not go below the minimum (1)', () => {
    expect(clampGuests(1, -1, 1, 6)).toBe(1);
  });

  it('does not exceed the maximum', () => {
    expect(clampGuests(6, 1, 1, 6)).toBe(6);
  });

  it('respects Sunset Penthouse max of 3 guests', () => {
    expect(clampGuests(3, 1, 2, 3)).toBe(3);
  });

  it('respects Royal Suite max of 4 guests', () => {
    expect(clampGuests(4, 1, 2, 4)).toBe(4);
  });

  it('respects Garden Residence max of 6 guests', () => {
    expect(clampGuests(6, 1, 4, 6)).toBe(6);
  });

  it('handles decrement at minimum for Sunset Penthouse (min 2)', () => {
    expect(clampGuests(2, -1, 2, 3)).toBe(2);
  });
});
