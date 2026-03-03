import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { apartments, seasonalPricing } from '@/data/villa';
import ApartmentGallery from '@/components/ui/ApartmentGallery';
import BookingWidget from '@/components/ui/BookingWidget';
import JsonLd from '@/components/ui/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return apartments.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apt = apartments.find((a) => a.slug === slug);
  if (!apt) return {};
  return {
    title: apt.name,
    description: `${apt.name} at Villa Aurea, Hvar. ${apt.description.slice(0, 120)}...`,
    openGraph: {
      title: `${apt.name} | Villa Aurea Hvar`,
      description: apt.description,
      images: [{ url: apt.image, width: 1200, height: 800, alt: apt.name }],
    },
  };
}

export default async function ApartmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const apt = apartments.find((a) => a.slug === slug);
  if (!apt) notFound();

  const others = apartments.filter((a) => a.slug !== slug);

  const ldData = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name: apt.name,
    description: apt.description,
    url: `https://villa-aurea.com/apartments/${apt.slug}`,
    image: apt.image,
    numberOfRooms: apt.bedrooms,
    amenityFeature: apt.highlights.map(h => ({
      '@type': 'LocationFeatureSpecification',
      name: h,
      value: true,
    })),
    containedInPlace: {
      '@type': 'LodgingBusiness',
      name: 'Villa Aurea',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ul. Biskupa Jurja Dubokovića 12',
        addressLocality: 'Hvar',
        postalCode: '21450',
        addressCountry: 'HR',
      },
    },
    offers: {
      '@type': 'Offer',
      price: apt.priceFrom,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://villa-aurea.com/book?apartment=${apt.slug}`,
    },
  };

  return (
    <main>
      <JsonLd data={ldData} />

      {/* Hero Gallery */}
      <ApartmentGallery images={apt.gallery} name={apt.name} />

      {/* Main content */}
      <section className='py-12 lg:py-20 bg-[#FAF7F2]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12'>
            {/* Left — description */}
            <div className='lg:col-span-2'>
              <span
                className='text-[11px] tracking-[0.3em] uppercase text-[#C5A55A]'
                style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
              >
                {apt.floor}
              </span>
              <div className='w-10 h-px bg-[#C5A55A] mt-3 mb-5' />
              <h1
                className='text-4xl lg:text-6xl text-[#1A1A2E] mb-5 lg:mb-6 leading-tight'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                {apt.name}
              </h1>

              <p
                className='text-base lg:text-xl text-[#8A8580] leading-relaxed mb-8 lg:mb-10'
                style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
              >
                {apt.description}
              </p>

              {/* Specs grid */}
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-t border-b border-[#E8E0D4] mb-10'>
                {[
                  { label: 'Guests', value: `${apt.guests.min}–${apt.guests.max}` },
                  { label: 'Size', value: `${apt.size}m²` },
                  { label: 'Bedrooms', value: apt.bedrooms },
                  { label: 'Bathrooms', value: apt.bathrooms.toString() },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p
                      className='text-2xl text-[#1A1A2E] mb-1'
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {spec.value}
                    </p>
                    <p
                      className='text-xs tracking-wider text-[#8A8580] uppercase'
                      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                    >
                      {spec.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <h2
                className='text-2xl text-[#1A1A2E] mb-5'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Highlights
              </h2>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12'>
                {apt.highlights.map((h) => (
                  <li
                    key={h}
                    className='flex items-center gap-3 text-sm text-[#2D2D2D]'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    <span className='text-[#C5A55A]'>◈</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Seasonal pricing */}
              <h2
                className='text-2xl text-[#1A1A2E] mb-5'
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Rates
              </h2>
              <div className='space-y-2 mb-8'>
                {seasonalPricing.map((s) => (
                  <div
                    key={s.season}
                    className='flex items-center justify-between py-4 px-6 bg-[#E8E0D4]'
                  >
                    <div>
                      <p
                        className='text-[#1A1A2E] font-medium text-sm'
                        style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                      >
                        {s.season}
                      </p>
                      <p
                        className='text-[#8A8580] text-xs mt-0.5'
                        style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                      >
                        {s.period}
                      </p>
                    </div>
                    <p
                      className='text-xl text-[#1A1A2E]'
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      from €{Math.round(apt.priceFrom * s.priceMultiplier)}
                      <span className='text-sm text-[#8A8580]'>/night</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct booking note */}
              <div className='bg-[#1A1A2E] p-6 flex items-start gap-5'>
                <span className='text-[#C5A55A] text-2xl mt-1'>★</span>
                <div>
                  <p
                    className='text-white font-medium mb-1'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
                  >
                    Best rate guaranteed — book direct
                  </p>
                  <p
                    className='text-white/50 text-sm'
                    style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    These prices are 15% lower than Booking.com or Airbnb. No platform fees. No surprises.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — booking widget */}
            <div className='lg:col-span-1'>
              <BookingWidget apartment={apt} />
            </div>
          </div>
        </div>
      </section>

      {/* Other apartments */}
      <section className='py-20 bg-[#E8E0D4]'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2
            className='text-3xl text-[#1A1A2E] mb-10 text-center'
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            Other <em style={{ fontStyle: 'italic' }}>apartments</em>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {others.map((a) => (
              <Link key={a.id} href={`/apartments/${a.slug}`} className='group block'>
                <div className='relative overflow-hidden aspect-[16/9] mb-4'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={a.name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/70 to-transparent' />
                  <div className='absolute bottom-4 left-4'>
                    <p
                      className='text-white text-xl'
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {a.name}
                    </p>
                    <p
                      className='text-[#C5A55A] text-sm mt-1'
                      style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300 }}
                    >
                      from €{a.priceFrom}/night
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='text-center mt-10'>
            <Link
              href='/book'
              className='inline-block px-12 py-4 bg-[#1A1A2E] text-white text-sm tracking-[0.2em] uppercase hover:bg-[#C5A55A] transition-all duration-300'
              style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}
            >
              Book This Apartment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
