import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import AboutSection from '@/components/sections/AboutSection';
import ApartmentsPreview from '@/components/sections/ApartmentsPreview';
import InteractiveExperience from '@/components/sections/InteractiveExperience';
import WellnessSection from '@/components/sections/WellnessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BookingCTABanner from '@/components/sections/BookingCTABanner';
import LocationSection from '@/components/sections/LocationSection';
import JsonLd from '@/components/ui/JsonLd';

const villaStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': 'https://villa-aurea.com/#villa',
  name: 'Villa Aurea',
  description:
    'Luxury villa with three exceptional apartments in Hvar, Croatia. Private jacuzzi, steam bath, 270° panoramic sea views, 100m to beach. Direct booking available — save 15% vs Booking.com.',
  url: 'https://villa-aurea.com',
  telephone: '+38521742800',
  email: 'stay@villa-aurea.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ul. Biskupa Jurja Dubokovića 12',
    addressLocality: 'Hvar',
    addressRegion: 'Split-Dalmatia County',
    postalCode: '21450',
    addressCountry: 'HR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.173,
    longitude: 16.441,
  },
  image: [
    'https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  ],
  priceRange: '€€€',
  starRating: { '@type': 'Rating', ratingValue: '5' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '4',
    bestRating: '5',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Clara & Thomas, Munich' },
      reviewBody:
        'We cancelled our hotel and stayed 10 days instead of 5. The terrace view at sunset is something you carry with you forever.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'James R., London' },
      reviewBody:
        "The jacuzzi overlooking the harbour at night... I've stayed at five-star hotels that couldn't match this.",
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    },
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Private Jacuzzi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Sea View', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Steam Bath', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private Terrace', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Beach Access', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
  ],
  numberOfRooms: 3,
  checkinTime: '14:00',
  checkoutTime: '11:00',
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why should I book Villa Aurea directly instead of Booking.com?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booking directly saves you 15% — Booking.com charges commissions that get added to your price. Direct booking also means personal communication, instant confirmation, and the best available rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Villa Aurea located in Hvar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Villa Aurea is located at Ul. Biskupa Jurja Dubokovića 12, 21450 Hvar — 100m from the beach, 5 minutes walk from Hvar Old Town, and 8 minutes from the ferry terminal.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many apartments does Villa Aurea have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Villa Aurea has three luxury apartments: The Sunset Penthouse (2-3 guests, from €280/night), The Royal Suite (2-4 guests, from €320/night), and The Garden Residence (4-6 guests, from €260/night).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get to Villa Aurea from the airport?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fly to Split Airport (SPU). From Split, take the catamaran to Hvar Town (50 minutes). Villa Aurea is an 8-minute walk from the ferry. We can arrange private transfers on request.',
      },
    },
  ],
};

const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Villa Aurea', item: 'https://villa-aurea.com' },
  ],
};

export default function Home() {
  return (
    <main>
      <JsonLd data={villaStructuredData} />
      <JsonLd data={faqStructuredData} />
      <JsonLd data={breadcrumbData} />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ApartmentsPreview />
      <InteractiveExperience />
      <WellnessSection />
      <TestimonialsSection />
      <BookingCTABanner />
      <LocationSection />
    </main>
  );
}
