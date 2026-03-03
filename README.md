# Villa Aurea — Luxury Villa Direct-Booking Demo

> A Volthr demo — proving why villa owners should book direct and skip the 15-20% Booking.com commission.

**Live demo:** Built for Hvar, Croatia. Ready to clone for any Adriatic villa.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Deployment | Vercel |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — cinematic hero, stats, about, apartments, interactive parallax, wellness, testimonials, CTA, location |
| `/apartments` | All apartments overview |
| `/apartments/[slug]` | Apartment detail + inline booking widget |
| `/gallery` | Masonry gallery with lightbox + category filter |
| `/book` | 4-step booking flow with price comparison |
| `/experience` | Editorial long-scroll experience page |

## Quick start

```bash
cd villa-aurea
npm install
npm run dev
# → http://localhost:3000
```

## Screenshot QA

```bash
npm run dev &
npx tsx scripts/screenshot.ts
# Saves desktop + mobile screenshots to ./screenshots/
```

## Deploy to Vercel

```bash
vercel --prod
```

## Customise for a client

1. Edit `src/data/villa.ts` — villa info, apartments, reviews, experiences
2. Replace Unsplash URLs with client photography
3. Update metadata in `src/app/layout.tsx`
4. Point custom domain in Vercel dashboard

## Brand

- **Display font:** Cormorant Garamond (Google Fonts)
- **Body font:** Outfit (Google Fonts)
- **Primary accent:** `#C5A55A` Gold
- **Dark background:** `#1A1A2E` Midnight Navy
- **Background:** `#FAF7F2` Warm Cream

---

Built by **Volthr** · Zagreb, Croatia
