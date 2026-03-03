import { describe, it, expect } from 'vitest';
import {
  villaInfo,
  apartments,
  reviews,
  experiences,
  seasonalPricing,
  stats,
} from '@/data/villa';

describe('villaInfo', () => {
  it('has the correct villa name', () => {
    expect(villaInfo.name).toBe('Villa Aurea');
  });

  it('has a tagline', () => {
    expect(typeof villaInfo.tagline).toBe('string');
    expect(villaInfo.tagline.length).toBeGreaterThan(0);
  });

  it('is located in Hvar, Croatia', () => {
    expect(villaInfo.location).toBe('Hvar, Croatia');
  });

  it('has a valid email address', () => {
    expect(villaInfo.email).toMatch(/@/);
    expect(villaInfo.email).toMatch(/villa-aurea\.com/);
  });

  it('has a Croatian phone number', () => {
    expect(villaInfo.phone).toMatch(/^\+385/);
  });

  it('was built in 2019', () => {
    expect(villaInfo.yearBuilt).toBe(2019);
  });

  it('has a style description', () => {
    expect(typeof villaInfo.style).toBe('string');
    expect(villaInfo.style.length).toBeGreaterThan(0);
  });

  it('has an address', () => {
    expect(typeof villaInfo.address).toBe('string');
    expect(villaInfo.address.length).toBeGreaterThan(0);
  });
});

describe('apartments', () => {
  it('contains exactly 3 apartments', () => {
    expect(apartments).toHaveLength(3);
  });

  it('all have unique slugs', () => {
    const slugs = apartments.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(apartments.length);
  });

  it('all have unique IDs', () => {
    const ids = apartments.map((a) => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(apartments.length);
  });

  it('all have positive base prices', () => {
    apartments.forEach((a) => {
      expect(a.priceFrom).toBeGreaterThan(0);
    });
  });

  it('all have valid guest ranges (min <= max, min > 0)', () => {
    apartments.forEach((a) => {
      expect(a.guests.min).toBeGreaterThan(0);
      expect(a.guests.min).toBeLessThanOrEqual(a.guests.max);
    });
  });

  it('all have positive sizes in m²', () => {
    apartments.forEach((a) => {
      expect(a.size).toBeGreaterThan(0);
    });
  });

  it('all have at least one gallery image', () => {
    apartments.forEach((a) => {
      expect(a.gallery.length).toBeGreaterThan(0);
    });
  });

  it('all use EUR currency', () => {
    apartments.forEach((a) => {
      expect(a.currency).toBe('EUR');
    });
  });

  it('all have at least one highlight', () => {
    apartments.forEach((a) => {
      expect(a.highlights.length).toBeGreaterThan(0);
    });
  });

  it('all have a non-empty description', () => {
    apartments.forEach((a) => {
      expect(typeof a.description).toBe('string');
      expect(a.description.length).toBeGreaterThan(0);
    });
  });

  it('all gallery images are Unsplash URLs', () => {
    apartments.forEach((a) => {
      a.gallery.forEach((url) => {
        expect(url).toMatch(/unsplash\.com/);
      });
    });
  });

  it('contains The Sunset Penthouse at €280/night', () => {
    const penthouse = apartments.find((a) => a.slug === 'sunset-penthouse');
    expect(penthouse).toBeDefined();
    expect(penthouse?.name).toBe('The Sunset Penthouse');
    expect(penthouse?.priceFrom).toBe(280);
    expect(penthouse?.guests.max).toBe(3);
  });

  it('contains The Royal Suite at €320/night', () => {
    const suite = apartments.find((a) => a.slug === 'royal-suite');
    expect(suite).toBeDefined();
    expect(suite?.name).toBe('The Royal Suite');
    expect(suite?.priceFrom).toBe(320);
    expect(suite?.bathrooms).toBe(2);
  });

  it('contains The Garden Residence at €260/night', () => {
    const garden = apartments.find((a) => a.slug === 'garden-residence');
    expect(garden).toBeDefined();
    expect(garden?.name).toBe('The Garden Residence');
    expect(garden?.priceFrom).toBe(260);
    expect(garden?.guests.max).toBe(6);
  });

  it('Garden Residence is the largest apartment', () => {
    const garden = apartments.find((a) => a.slug === 'garden-residence')!;
    apartments.forEach((a) => {
      expect(garden.size).toBeGreaterThanOrEqual(a.size);
    });
  });
});

describe('reviews', () => {
  it('contains exactly 4 reviews', () => {
    expect(reviews).toHaveLength(4);
  });

  it('all have non-empty quote, author, and location', () => {
    reviews.forEach((r) => {
      expect(typeof r.quote).toBe('string');
      expect(r.quote.length).toBeGreaterThan(0);
      expect(typeof r.author).toBe('string');
      expect(r.author.length).toBeGreaterThan(0);
      expect(typeof r.location).toBe('string');
      expect(r.location.length).toBeGreaterThan(0);
    });
  });

  it('includes a review from Munich', () => {
    const review = reviews.find((r) => r.location === 'Munich');
    expect(review).toBeDefined();
  });

  it('includes a review from London', () => {
    const review = reviews.find((r) => r.location === 'London');
    expect(review).toBeDefined();
  });
});

describe('experiences', () => {
  it('contains exactly 6 experiences', () => {
    expect(experiences).toHaveLength(6);
  });

  it('all have title, description, and image', () => {
    experiences.forEach((e) => {
      expect(typeof e.title).toBe('string');
      expect(e.title.length).toBeGreaterThan(0);
      expect(typeof e.description).toBe('string');
      expect(e.description.length).toBeGreaterThan(0);
      expect(typeof e.image).toBe('string');
      expect(e.image.length).toBeGreaterThan(0);
    });
  });

  it('all images are Unsplash URLs', () => {
    experiences.forEach((e) => {
      expect(e.image).toMatch(/unsplash\.com/);
    });
  });

  it('includes Private Jacuzzi experience', () => {
    const jacuzzi = experiences.find((e) => e.title === 'Private Jacuzzi');
    expect(jacuzzi).toBeDefined();
  });
});

describe('seasonalPricing', () => {
  it('has exactly 3 seasons', () => {
    expect(seasonalPricing).toHaveLength(3);
  });

  it('all have positive price multipliers', () => {
    seasonalPricing.forEach((s) => {
      expect(s.priceMultiplier).toBeGreaterThan(0);
    });
  });

  it('Low Season multiplier is 1 (base rate)', () => {
    const low = seasonalPricing.find((s) => s.season === 'Low Season');
    expect(low?.priceMultiplier).toBe(1);
  });

  it('Mid Season multiplier is 1.3', () => {
    const mid = seasonalPricing.find((s) => s.season === 'Mid Season');
    expect(mid?.priceMultiplier).toBe(1.3);
  });

  it('High Season multiplier is 1.7', () => {
    const high = seasonalPricing.find((s) => s.season === 'High Season');
    expect(high?.priceMultiplier).toBe(1.7);
  });

  it('multipliers increase from Low to Mid to High Season', () => {
    const low = seasonalPricing.find((s) => s.season === 'Low Season')!;
    const mid = seasonalPricing.find((s) => s.season === 'Mid Season')!;
    const high = seasonalPricing.find((s) => s.season === 'High Season')!;
    expect(mid.priceMultiplier).toBeGreaterThan(low.priceMultiplier);
    expect(high.priceMultiplier).toBeGreaterThan(mid.priceMultiplier);
  });

  it('all have a period string', () => {
    seasonalPricing.forEach((s) => {
      expect(typeof s.period).toBe('string');
      expect(s.period.length).toBeGreaterThan(0);
    });
  });
});

describe('stats', () => {
  it('has 4 stat items', () => {
    expect(stats).toHaveLength(4);
  });

  it('all have a value and label', () => {
    stats.forEach((s) => {
      expect(typeof s.value).toBe('string');
      expect(s.value.length).toBeGreaterThan(0);
      expect(typeof s.label).toBe('string');
      expect(s.label.length).toBeGreaterThan(0);
    });
  });

  it('includes the 100m beach distance stat', () => {
    const beachStat = stats.find((s) => s.value === '100m');
    expect(beachStat).toBeDefined();
    expect(beachStat?.label).toMatch(/beach/i);
  });

  it('includes the 300+ sunny days stat', () => {
    const sunnyStat = stats.find((s) => s.value === '300+');
    expect(sunnyStat).toBeDefined();
  });
});
