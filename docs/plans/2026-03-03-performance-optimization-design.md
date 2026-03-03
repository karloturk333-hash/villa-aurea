# Performance Optimization Design — Villa Aurea

**Date:** 2026-03-03
**Goal:** Fastest perceived load — hero visible as fast as possible, everything else deferred
**Approach:** Option B — Dynamic imports + image priority + package cleanup

---

## Problem

The Villa Aurea home page has three compounding performance issues:

1. **Hero image is a raw 2400px `<img>` at q=90** — no WebP conversion, no responsive srcset, no preload. The browser downloads the full image regardless of viewport size.
2. **All 9 home sections are static imports** — the browser parses every section's JavaScript (Framer Motion scroll hooks, animation configs, image arrays) before the page becomes interactive.
3. **Three.js packages installed but unused** — `@react-three/fiber`, `@react-three/drei`, `three`, `@types/three` are dependencies but never imported. They inflate install size and risk accidental bundle inclusion.

---

## Design

### Section 1: Image Pipeline

**`next.config.ts`** — Add Unsplash remote pattern:
```ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
}
```

**`HeroSection.tsx`** — Replace `<img>` with `<Image>` (next/image):
- `fill` layout (parent is already `position: absolute`)
- `priority` prop → emits `<link rel="preload">` in `<head>`, fires before JS
- `sizes="100vw"` → correct srcset breakpoints
- `quality={85}` → down from implicit 90, saves ~15% file size
- Remove `// eslint-disable-next-line @next/next/no-img-element` comment

**`InteractiveExperience.tsx`** — Same conversion for both parallax background images:
- No `priority` (below-fold, lazy loading is correct)
- `fill` + `sizes="100vw"`

### Section 2: Dynamic Imports

**`src/app/page.tsx`** — Keep above-fold sections static, defer the rest:

| Section | Import type | Reason |
|---------|-------------|--------|
| `HeroSection` | static | LCP element, must be immediate |
| `StatsBar` | static | tiny, right below hero |
| `AboutSection` | `next/dynamic` | below fold |
| `ApartmentsPreview` | `next/dynamic` | below fold |
| `InteractiveExperience` | `next/dynamic` | below fold |
| `WellnessSection` | `next/dynamic` | below fold |
| `TestimonialsSection` | `next/dynamic` | below fold |
| `BookingCTABanner` | `next/dynamic` | below fold |
| `LocationSection` | `next/dynamic` | below fold |

Each dynamic import gets a `loading` placeholder with a `minHeight` matching the section's approximate height. This prevents CLS (layout shift) when the JS loads in.

```ts
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div style={{ minHeight: '600px' }} />,
});
```

### Section 3: Package Cleanup

Verify no source file imports from `three`, `@react-three/fiber`, or `@react-three/drei` via grep, then uninstall:

```bash
npm uninstall @react-three/fiber @react-three/drei three @types/three
```

Remove from both `dependencies` and `devDependencies` in `package.json`.

---

## Files Changed

| File | Change |
|------|--------|
| `next.config.ts` | Add `images.remotePatterns` for Unsplash |
| `src/app/page.tsx` | Convert 7 sections to `next/dynamic` |
| `src/components/sections/HeroSection.tsx` | `<img>` → `<Image priority fill sizes="100vw">` |
| `src/components/sections/InteractiveExperience.tsx` | 2× `<img>` → `<Image fill sizes="100vw">` |
| `package.json` | Remove Three.js packages |

---

## Verification

1. `npm run build` — must complete without errors
2. `npm run test` — 147 tests must still pass
3. Check `next build` output — JS bundle sizes for home page should be reduced
4. Open browser DevTools → Network tab → reload: hero image request should show `as="image"` preload in initiator
