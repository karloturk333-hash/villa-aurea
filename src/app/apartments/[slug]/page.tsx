import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { apartments, seasonalPricing } from '@/data/villa';
import ApartmentGallery from '@/components/ui/ApartmentGallery';
import JsonLd from '@/components/ui/JsonLd';
import ApartmentDetailContent from './ApartmentDetailContent';

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
    amenityFeature: apt.highlights.map((h) => ({
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
      <ApartmentGallery images={apt.gallery} name={apt.name} />
      <ApartmentDetailContent apt={apt} others={others} seasonalPricing={seasonalPricing} />
    </main>
  );
}
