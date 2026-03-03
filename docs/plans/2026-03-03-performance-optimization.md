# Performance Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Maximize perceived load speed by prioritizing the hero LCP image, deferring all below-fold JS, and removing ~500KB of unused Three.js dead weight.

**Architecture:** Three independent changes applied sequentially: (1) unlock `next/image` for Unsplash CDN, (2) swap raw `<img>` tags for `next/image` — `priority` on hero, lazy on below-fold, (3) convert 7 below-fold home sections to `next/dynamic` with CLS-prevention placeholders, (4) uninstall unused Three.js packages.

**Tech Stack:** Next.js 16 `next/image`, `next/dynamic`, Vitest + @testing-library/react for verification.

---

### Task 1: Unlock next/image for Unsplash

**Files:**
- Modify: `next.config.ts`

**Step 1: Verify the problem**

Run `npm run build` now and note any `next/image` warnings. They will say remote patterns are not configured.

**Step 2: Add remote pattern**

Replace the contents of `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

**Step 3: Verify build passes**

```bash
cd villa-aurea && npm run build
```
Expected: Build completes with no errors about remote patterns.

**Step 4: Commit**

```bash
git add next.config.ts
git commit -m "feat(perf): add Unsplash remotePatterns to enable next/image"
```

---

### Task 2: Hero image — next/image with priority

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`
- Create: `src/__tests__/components/HeroSection.test.tsx`

The hero `<img>` at `w=2400&q=90` is the LCP element. Switching to `next/image` with `priority` adds a `<link rel="preload">` to the document `<head>`, so the browser fetches the image before JS executes.

**Step 1: Write the failing test**

Create `src/__tests__/components/HeroSection.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/sections/HeroSection';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
    sizes,
    quality,
    className,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
    sizes?: string;
    quality?: number;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      data-priority={String(!!priority)}
      data-fill={String(!!fill)}
      data-sizes={sizes}
      data-quality={String(quality)}
      className={className}
    />
  ),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, className, initial, animate, transition, ...rest }: React.HTMLAttributes<HTMLDivElement> & { initial?: unknown; animate?: unknown; transition?: unknown; style?: React.CSSProperties }) =>
      <div style={style} className={className} {...rest}>{children}</div>,
    p: ({ children, style, className, initial, animate, transition, ...rest }: React.HTMLAttributes<HTMLParagraphElement> & { initial?: unknown; animate?: unknown; transition?: unknown; style?: React.CSSProperties }) =>
      <p style={style} className={className} {...rest}>{children}</p>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: (_v: unknown, _i: unknown, _o: unknown) => '0%',
}));

describe('HeroSection — image optimization', () => {
  it('renders using next/image (not a raw img)', () => {
    render(<HeroSection />);
    // next/image renders with data-priority attribute set by our mock
    const heroImg = document.querySelector('[data-priority]');
    expect(heroImg).not.toBeNull();
  });

  it('sets priority=true on the hero background image', () => {
    render(<HeroSection />);
    const heroImg = document.querySelector('[data-priority="true"]');
    expect(heroImg).not.toBeNull();
  });

  it('sets fill=true so the image covers the container', () => {
    render(<HeroSection />);
    const heroImg = document.querySelector('[data-fill="true"]');
    expect(heroImg).not.toBeNull();
  });

  it('includes sizes attribute for responsive srcset', () => {
    render(<HeroSection />);
    const heroImg = document.querySelector('[data-priority="true"]');
    expect(heroImg?.getAttribute('data-sizes')).toBeTruthy();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test src/__tests__/components/HeroSection.test.tsx
```
Expected: FAIL — `data-priority` attribute not found (raw `<img>` doesn't have it).

**Step 3: Implement the change**

In `src/components/sections/HeroSection.tsx`, at the top add:

```ts
import Image from 'next/image';
```

Replace the `<img>` element inside the parallax `motion.div` (around line 35):

```tsx
{/* BEFORE */}
{/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src='https://images.unsplash.com/photo-1555990793-da11153b2473?w=2400&q=90'
  alt=''
  className='w-full h-full object-cover'
  loading='eager'
  fetchPriority='high'
/>

{/* AFTER */}
<Image
  src='https://images.unsplash.com/photo-1555990793-da11153b2473?w=2400&q=90'
  alt=''
  fill
  priority
  sizes='100vw'
  quality={85}
  className='object-cover'
/>
```

**Step 4: Run test to verify it passes**

```bash
npm test src/__tests__/components/HeroSection.test.tsx
```
Expected: PASS (4 tests).

**Step 5: Run full suite to check no regressions**

```bash
npm test
```
Expected: 151 tests pass.

**Step 6: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/__tests__/components/HeroSection.test.tsx
git commit -m "feat(perf): replace hero <img> with next/image priority for LCP preload"
```

---

### Task 3: InteractiveExperience — next/image lazy

**Files:**
- Modify: `src/components/sections/InteractiveExperience.tsx`
- Create: `src/__tests__/components/InteractiveExperience.test.tsx`

This section has two large background images (`w=2000&q=85` and `w=1800&q=80`) loaded with raw `<img>` tags. Since this section is well below the fold, we want lazy loading — which `next/image` provides by default (no `priority` flag).

**Step 1: Write the failing test**

Create `src/__tests__/components/InteractiveExperience.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import InteractiveExperience from '@/components/sections/InteractiveExperience';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
    sizes,
    className,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
    sizes?: string;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      data-priority={String(!!priority)}
      data-fill={String(!!fill)}
      data-sizes={sizes}
      className={className}
    />
  ),
}));

vi.mock('framer-motion', () => {
  const passThrough =
    (Tag: string) =>
    ({ children, style, className, ...rest }: React.HTMLAttributes<HTMLElement> & { style?: React.CSSProperties }) =>
      <Tag style={style} className={className}>{children}</Tag>;
  return {
    motion: { div: passThrough('div'), section: passThrough('section') },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => '0%',
    useMotionValue: (v: number) => ({ get: () => v, set: () => {} }),
    useSpring: (v: unknown) => v,
  };
});

describe('InteractiveExperience — image optimization', () => {
  it('renders using next/image for background images', () => {
    render(<InteractiveExperience />);
    const optimizedImages = document.querySelectorAll('[data-fill]');
    expect(optimizedImages.length).toBeGreaterThanOrEqual(2);
  });

  it('does NOT set priority on below-fold images (lazy loading)', () => {
    render(<InteractiveExperience />);
    const priorityImages = document.querySelectorAll('[data-priority="true"]');
    expect(priorityImages.length).toBe(0);
  });

  it('uses fill layout on background images', () => {
    render(<InteractiveExperience />);
    const fillImages = document.querySelectorAll('[data-fill="true"]');
    expect(fillImages.length).toBeGreaterThanOrEqual(2);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test src/__tests__/components/InteractiveExperience.test.tsx
```
Expected: FAIL — `data-fill` attribute not found.

**Step 3: Implement the change**

In `src/components/sections/InteractiveExperience.tsx`, add at the top:

```ts
import Image from 'next/image';
```

Replace the first `<img>` (background layer, around line 59):

```tsx
{/* BEFORE */}
{/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src='https://images.unsplash.com/photo-1555990793-da11153b2473?w=2000&q=85'
  alt=''
  className='w-full h-full object-cover opacity-40'
/>

{/* AFTER */}
<Image
  src='https://images.unsplash.com/photo-1555990793-da11153b2473?w=2000&q=85'
  alt=''
  fill
  sizes='100vw'
  quality={80}
  className='object-cover opacity-40'
/>
```

Replace the second `<img>` (foreground layer, around line 80):

```tsx
{/* BEFORE */}
{/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src='https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=80'
  alt=''
  className='w-full h-full object-cover'
/>

{/* AFTER */}
<Image
  src='https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=80'
  alt=''
  fill
  sizes='100vw'
  quality={75}
  className='object-cover'
/>
```

**Step 4: Run test to verify it passes**

```bash
npm test src/__tests__/components/InteractiveExperience.test.tsx
```
Expected: PASS (3 tests).

**Step 5: Run full suite**

```bash
npm test
```
Expected: 154 tests pass.

**Step 6: Commit**

```bash
git add src/components/sections/InteractiveExperience.tsx src/__tests__/components/InteractiveExperience.test.tsx
git commit -m "feat(perf): replace InteractiveExperience raw imgs with next/image lazy"
```

---

### Task 4: Dynamic imports for below-fold sections

**Files:**
- Modify: `src/app/page.tsx`

Switching from static to dynamic imports means Next.js splits each section into its own JS chunk. Those chunks only download when they're about to scroll into view. The `loading` prop provides a height placeholder to prevent layout shift.

The `ssr: false` option is NOT needed here — these are standard React components that can server-render. We just want to split the client-side JavaScript bundle.

**Step 1: No new test needed — existing data tests cover the data layer**

The sections themselves render correctly (verified by existing component tests). Run the existing suite to confirm baseline:

```bash
npm test
```
Expected: All 154 tests pass.

**Step 2: Implement dynamic imports**

Replace `src/app/page.tsx` imports and component usage. The full new file:

```tsx
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import JsonLd from '@/components/ui/JsonLd';

// Below-fold sections — deferred JS chunks with CLS-prevention placeholders
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div style={{ minHeight: '700px' }} />,
});
const ApartmentsPreview = dynamic(() => import('@/components/sections/ApartmentsPreview'), {
  loading: () => <div style={{ minHeight: '800px' }} />,
});
const InteractiveExperience = dynamic(() => import('@/components/sections/InteractiveExperience'), {
  loading: () => <div style={{ minHeight: '100vh' }} />,
});
const WellnessSection = dynamic(() => import('@/components/sections/WellnessSection'), {
  loading: () => <div style={{ minHeight: '700px' }} />,
});
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => <div style={{ minHeight: '500px' }} />,
});
const BookingCTABanner = dynamic(() => import('@/components/sections/BookingCTABanner'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const LocationSection = dynamic(() => import('@/components/sections/LocationSection'), {
  loading: () => <div style={{ minHeight: '600px' }} />,
});

// ... keep the villaStructuredData, faqStructuredData, breadcrumbData constants unchanged ...

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
```

Keep all the `villaStructuredData`, `faqStructuredData`, and `breadcrumbData` constant definitions unchanged between the imports and the component.

**Step 3: Verify build**

```bash
npm run build
```
Expected: Build completes. The output should show separate chunks for each dynamic section, e.g.:
```
chunks/sections_AboutSection...    4 kB
chunks/sections_ApartmentsPreview... 6 kB
```

**Step 4: Run full test suite**

```bash
npm test
```
Expected: All 154 tests pass.

**Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(perf): dynamic import below-fold sections for code splitting"
```

---

### Task 5: Remove unused Three.js packages

**Files:**
- Modify: `package.json` (via npm uninstall)

`@react-three/fiber`, `@react-three/drei`, `three`, and `@types/three` are installed but the grep in the design phase confirmed zero imports across all 26 source files. These packages add ~500KB to `node_modules` and risk accidentally landing in the bundle.

**Step 1: Verify zero imports (sanity check)**

```bash
grep -r "@react-three\|from 'three'\|from \"three\"" src/
```
Expected: No output. If any files appear, stop and investigate before proceeding.

**Step 2: Uninstall**

```bash
npm uninstall @react-three/fiber @react-three/drei three @types/three
```

**Step 3: Verify no build errors**

```bash
npm run build
```
Expected: Clean build. If any errors reference three.js, a file was missed in step 1.

**Step 4: Run full test suite**

```bash
npm test
```
Expected: All 154 tests pass.

**Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(perf): remove unused Three.js packages (@react-three/fiber, drei, three)"
```

---

## Final Verification

After all 5 tasks are complete:

```bash
npm run build && npm test
```
Expected: Clean build + 154 tests passing.

**Manual check:** Open the built site (`npm run dev`), open DevTools → Network tab, hard reload. Verify:
1. The hero image appears in the `<head>` as a `<link rel="preload" as="image">` entry
2. The hero image is served as WebP (check Content-Type in the network request)
3. Sections below the fold load their JS chunks on scroll, not on initial page load
