'use client';

import BookingFlow from '@/components/ui/BookingFlow';
import { WordReveal } from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticButton from '@/components/animations/MagneticButton';

export default function BookPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-midnight pt-32 sm:pt-36 pb-16 sm:pb-20 text-center px-6">
        <SectionReveal variant="fade-up">
          <span className="font-label text-[11px] tracking-[0.4em] uppercase text-gold">
            Direct Reservation
          </span>
          <div className="w-12 h-px bg-gold mx-auto mt-4 mb-6" />
        </SectionReveal>

        <WordReveal
          text="Reserve your stay"
          as="h1"
          className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
        />

        <SectionReveal variant="fade-up" delay={0.3}>
          <p className="font-body text-white/50 mt-4 max-w-md mx-auto font-light">
            Best rate guaranteed. No Booking.com fees. Book in minutes.
          </p>
        </SectionReveal>

        {/* Trust signals */}
        <SectionReveal variant="fade-up" delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 text-gold/70 text-[10px] sm:text-xs tracking-widest uppercase font-body">
            <span>✓ Save 15% vs Booking.com</span>
            <span className="hidden sm:inline">·</span>
            <span>✓ Instant confirmation</span>
            <span className="hidden sm:inline">·</span>
            <span>✓ Free cancellation</span>
            <span className="hidden sm:inline">·</span>
            <span>✓ Secure payment</span>
          </div>
        </SectionReveal>
      </section>

      <BookingFlow />
    </main>
  );
}
