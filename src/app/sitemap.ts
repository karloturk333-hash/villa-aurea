import type { MetadataRoute } from 'next';
import { apartments } from '@/data/villa';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://villa-aurea.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/apartments`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/experience`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
  ];

  const apartmentPages: MetadataRoute.Sitemap = apartments.map((a) => ({
    url: `${base}/apartments/${a.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...apartmentPages];
}
