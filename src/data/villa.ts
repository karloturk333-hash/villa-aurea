export const villaInfo = {
  name: 'Villa Aurea',
  tagline: 'Where golden light meets the Adriatic',
  location: 'Hvar, Croatia',
  address: 'Ul. Biskupa Jurja Dubokovića 12, 21450 Hvar',
  phone: '+385 21 742 800',
  email: 'stay@villa-aurea.com',
  yearBuilt: 2019,
  style: 'Modern Mediterranean — Dalmatian stone + contemporary design',
};

export const stats = [
  { value: '100m', label: 'to the beach' },
  { value: '3', label: 'unique apartments' },
  { value: '270°', label: 'panoramic sea views' },
  { value: '300+', label: 'sunny days per year' },
];

// All images are curated Unsplash photos with Mediterranean/Croatian/luxury villa themes
export const apartments = [
  {
    id: 1,
    slug: 'sunset-penthouse',
    name: 'The Sunset Penthouse',
    floor: '3rd floor (top)',
    size: 65,
    terraceSize: 40,
    guests: { min: 2, max: 3 },
    bedrooms: '1 king',
    bathrooms: 1,
    priceFrom: 280,
    currency: 'EUR',
    highlights: [
      '270° sea view',
      'Private terrace with dining',
      'Sunset facing',
      'Steam bath',
    ],
    description:
      'The pinnacle of Villa Aurea — a luminous penthouse where the Adriatic spreads before you in sweeping panorama. Your private terrace becomes a stage for the most spectacular sunsets on Hvar.',
    // Luxury rooftop terrace / sea view
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80',
    ],
  },
  {
    id: 2,
    slug: 'royal-suite',
    name: 'The Royal Suite',
    floor: '2nd floor',
    size: 80,
    terraceSize: 0,
    guests: { min: 2, max: 4 },
    bedrooms: '1 king + 1 sofa bed',
    bathrooms: 2,
    priceFrom: 320,
    currency: 'EUR',
    highlights: [
      'Private jacuzzi on terrace',
      'Sea-view living room',
      'Kitchenette',
      '2 bathrooms',
    ],
    description:
      'The most indulgent space at Villa Aurea — where a private jacuzzi meets sweeping sea views. The Royal Suite redefines the concept of a holiday residence, blending opulent comfort with authentic Dalmatian character.',
    // Luxury sea view villa terrace
    image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
    ],
  },
  {
    id: 3,
    slug: 'garden-residence',
    name: 'The Garden Residence',
    floor: 'Ground floor',
    size: 95,
    terraceSize: 0,
    guests: { min: 4, max: 6 },
    bedrooms: '2 (1 king + 2 singles)',
    bathrooms: 2,
    priceFrom: 260,
    currency: 'EUR',
    highlights: [
      'Direct garden access',
      'Family-friendly',
      'Largest apartment',
      'Full kitchen',
    ],
    description:
      'Generous, grounded, and alive with the scents of Mediterranean garden. The Garden Residence is the ideal haven for families or groups seeking space, privacy and the soul of authentic Hvar living.',
    // Mediterranean villa with garden
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    ],
  },
];

export const reviews = [
  {
    quote:
      'We cancelled our hotel and stayed 10 days instead of 5. The terrace view at sunset is something you carry with you forever.',
    author: 'Clara & Thomas',
    location: 'Munich',
  },
  {
    quote:
      "The jacuzzi overlooking the harbour at night... I've stayed at five-star hotels that couldn't match this.",
    author: 'James R.',
    location: 'London',
  },
  {
    quote:
      "Ivana welcomed us with local wine, figs and the warmest smile. This isn't a rental — it's someone's home, and they share it with love.",
    author: 'Amélie D.',
    location: 'Paris',
  },
  {
    quote:
      "Best direct booking experience we've had. No surprise fees, instant communication, and 20% cheaper than Booking.com.",
    author: 'Luca & Sofia',
    location: 'Milan',
  },
];

export const experiences = [
  {
    title: 'Private Jacuzzi',
    description: 'Unwind in your private jacuzzi with panoramic sea views. Day or night, it redefines relaxation.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
  },
  {
    title: 'Steam Bath',
    description: 'Restore mind and body in the aromatic steam bath — a Mediterranean ritual for the senses.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  },
  {
    title: 'Terrace Dining',
    description: 'Dine under the stars with the sea as your backdrop. Every meal becomes a memory.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  },
  {
    title: '100m to Beach',
    description: 'A two-minute stroll to the crystal-clear Adriatic. The sea is always within reach.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    title: 'Hvar Old Town',
    description: 'Stroll cobblestone alleys to Dalmatian palaces, lavender markets and sunset cocktail bars.',
    image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80',
  },
  {
    title: 'Island Exploration',
    description: 'Hidden coves, vineyards and lavender fields await. Hvar is an island that rewards wanderers.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
];

export const seasonalPricing = [
  { season: 'Low Season', period: 'Oct – Apr', priceMultiplier: 1 },
  { season: 'Mid Season', period: 'May – Jun, Sep', priceMultiplier: 1.3 },
  { season: 'High Season', period: 'Jul – Aug', priceMultiplier: 1.7 },
];
