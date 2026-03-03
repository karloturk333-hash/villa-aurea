import Link from 'next/link';

const footerLinks = {
  villa: [
    { href: '/', label: 'Home' },
    { href: '/apartments', label: 'Apartments' },
    { href: '/experience', label: 'Experience' },
    { href: '/gallery', label: 'Gallery' },
  ],
  book: [
    { href: '/book', label: 'Book Direct' },
    { href: '/book#availability', label: 'Check Availability' },
    { href: '/book#pricing', label: 'Rates & Pricing' },
    { href: '/book#policy', label: 'Cancellation Policy' },
  ],
};

export default function Footer() {
  return (
    <footer className='bg-[#1A1A2E] text-white/70'>
      {/* Main footer */}
      <div className='max-w-7xl mx-auto px-6 py-12 lg:py-20'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12'>
          {/* Brand */}
          <div className='col-span-2 md:col-span-1'>
            <h3
              className='text-2xl lg:text-3xl text-white tracking-widest mb-2'
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              VILLA AUREA
            </h3>
            <p
              className='text-[10px] tracking-[0.35em] uppercase text-[#C5A55A] mb-6'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              Hvar, Croatia
            </p>
            <p
              className='text-sm leading-relaxed text-white/50'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
            >
              Where golden light meets the Adriatic. Three exceptional apartments on the most beautiful island in the Mediterranean.
            </p>
            {/* Social icons */}
            <div className='flex gap-4 mt-6'>
              {['IG', 'FB', 'TK'].map((s) => (
                <button
                  key={s}
                  className='w-9 h-9 border border-white/20 flex items-center justify-center text-xs text-white/50 hover:border-[#C5A55A] hover:text-[#C5A55A] transition-all duration-300'
                  aria-label={s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Villa links */}
          <div>
            <h4
              className='text-[10px] tracking-[0.25em] uppercase text-[#C5A55A] mb-6'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              Explore
            </h4>
            <ul className='space-y-3'>
              {footerLinks.villa.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className='text-sm text-white/50 hover:text-white transition-colors duration-200'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking links */}
          <div>
            <h4
              className='text-[10px] tracking-[0.25em] uppercase text-[#C5A55A] mb-6'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              Reservations
            </h4>
            <ul className='space-y-3'>
              {footerLinks.book.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className='text-sm text-white/50 hover:text-white transition-colors duration-200'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className='text-[10px] tracking-[0.25em] uppercase text-[#C5A55A] mb-6'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              Contact
            </h4>
            <div className='space-y-4 text-sm text-white/50' style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
              <div>
                <p className='text-white/30 text-xs mb-1 tracking-wider uppercase'>Address</p>
                <p>Ul. Biskupa Jurja Dubokovića 12</p>
                <p>21450 Hvar, Croatia</p>
              </div>
              <div>
                <p className='text-white/30 text-xs mb-1 tracking-wider uppercase'>Phone</p>
                <a href='tel:+38521742800' className='hover:text-white transition-colors'>+385 21 742 800</a>
              </div>
              <div>
                <p className='text-white/30 text-xs mb-1 tracking-wider uppercase'>Email</p>
                <a href='mailto:stay@villa-aurea.com' className='hover:text-white transition-colors'>stay@villa-aurea.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct booking strip */}
      <div className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <span className='text-[#C5A55A] text-xs'>★</span>
            <p
              className='text-xs text-white/40 tracking-wider'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            >
              BEST RATE GUARANTEED — BOOK DIRECT AND SAVE 15%
            </p>
            <span className='text-[#C5A55A] text-xs'>★</span>
          </div>
          <p
            className='text-xs text-white/30'
            style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
          >
            © {new Date().getFullYear()} Villa Aurea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
