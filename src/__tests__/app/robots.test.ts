import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';

describe('robots()', () => {
  const result = robots();

  it('returns a rules array', () => {
    expect(Array.isArray(result.rules)).toBe(true);
  });

  it('has at least one rule', () => {
    const rules = result.rules as Array<{ userAgent: string; allow?: string }>;
    expect(rules.length).toBeGreaterThan(0);
  });

  it('allows all user agents (wildcard *)', () => {
    const rules = result.rules as Array<{ userAgent: string; allow?: string }>;
    const wildcardRule = rules.find((r) => r.userAgent === '*');
    expect(wildcardRule).toBeDefined();
  });

  it('allows crawling of all pages (/)', () => {
    const rules = result.rules as Array<{ userAgent: string; allow?: string }>;
    const wildcardRule = rules.find((r) => r.userAgent === '*');
    expect(wildcardRule?.allow).toBe('/');
  });

  it('references the XML sitemap at the correct URL', () => {
    expect(result.sitemap).toBe('https://villa-aurea.com/sitemap.xml');
  });

  it('sitemap URL uses the villa-aurea.com domain', () => {
    expect(result.sitemap).toMatch(/villa-aurea\.com/);
  });
});
