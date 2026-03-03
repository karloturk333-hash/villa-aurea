import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { apartments } from '@/data/villa';

describe('sitemap()', () => {
  const result = sitemap();

  it('returns an array', () => {
    expect(Array.isArray(result)).toBe(true);
  });

  it('has the correct total number of entries (5 static + 3 apartment pages)', () => {
    expect(result).toHaveLength(5 + apartments.length);
  });

  it('all URLs use the villa-aurea.com domain', () => {
    result.forEach((entry) => {
      expect(entry.url).toMatch(/^https:\/\/villa-aurea\.com/);
    });
  });

  it('all entries have a lastModified Date instance', () => {
    result.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });

  it('homepage has priority 1 and weekly change frequency', () => {
    const home = result.find((r) => r.url === 'https://villa-aurea.com');
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1);
    expect(home?.changeFrequency).toBe('weekly');
  });

  it('booking page has priority 0.95 (highest after homepage)', () => {
    const booking = result.find((r) => r.url === 'https://villa-aurea.com/book');
    expect(booking).toBeDefined();
    expect(booking?.priority).toBe(0.95);
  });

  it('apartments listing page has priority 0.9', () => {
    const aptList = result.find((r) => r.url === 'https://villa-aurea.com/apartments');
    expect(aptList).toBeDefined();
    expect(aptList?.priority).toBe(0.9);
  });

  it('experience page has priority 0.8 and monthly change frequency', () => {
    const exp = result.find((r) => r.url === 'https://villa-aurea.com/experience');
    expect(exp).toBeDefined();
    expect(exp?.priority).toBe(0.8);
    expect(exp?.changeFrequency).toBe('monthly');
  });

  it('gallery page has priority 0.7', () => {
    const gallery = result.find((r) => r.url === 'https://villa-aurea.com/gallery');
    expect(gallery).toBeDefined();
    expect(gallery?.priority).toBe(0.7);
  });

  it('includes all static pages', () => {
    const urls = result.map((r) => r.url);
    expect(urls).toContain('https://villa-aurea.com');
    expect(urls).toContain('https://villa-aurea.com/apartments');
    expect(urls).toContain('https://villa-aurea.com/experience');
    expect(urls).toContain('https://villa-aurea.com/gallery');
    expect(urls).toContain('https://villa-aurea.com/book');
  });

  it('includes a page for every apartment slug', () => {
    const urls = result.map((r) => r.url);
    apartments.forEach((a) => {
      expect(urls).toContain(`https://villa-aurea.com/apartments/${a.slug}`);
    });
  });

  it('apartment pages have priority 0.85 and weekly change frequency', () => {
    apartments.forEach((a) => {
      const entry = result.find((r) => r.url === `https://villa-aurea.com/apartments/${a.slug}`);
      expect(entry?.priority).toBe(0.85);
      expect(entry?.changeFrequency).toBe('weekly');
    });
  });

  it('no duplicate URLs', () => {
    const urls = result.map((r) => r.url);
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});
