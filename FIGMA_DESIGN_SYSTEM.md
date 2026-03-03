# Villa Aurea — Figma Design System Rules

> For use with the Figma MCP (Model Context Protocol) when translating Figma designs into code for this project.

---

## 1. Token Definitions

### Colors

Tokens are defined in `src/app/globals.css` via `@theme inline {}` (Tailwind v4) and `:root` CSS custom properties.

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `midnight` | `#1A1A2E` | `bg-[#1A1A2E]` / `text-[#1A1A2E]` | Dark sections, nav, footer, overlays |
| `warm-cream` | `#FAF7F2` | `bg-[#FAF7F2]` / `text-[#FAF7F2]` | Primary page background |
| `stone` | `#E8E0D4` | `bg-[#E8E0D4]` / `text-[#E8E0D4]` | Secondary backgrounds, alternating sections |
| `gold` | `#C5A55A` | `bg-[#C5A55A]` / `text-[#C5A55A]` | Primary accent — CTAs, borders, icons, decorative lines |
| `gold-light` | `#D4B96E` | `bg-[#D4B96E]` / `text-[#D4B96E]` | Hover state for gold elements |
| `terracotta` | `#C67D4B` | `bg-[#C67D4B]` / `text-[#C67D4B]` | Warm secondary accent (reserved) |
| `adriatic` | `#2E6B7F` | `bg-[#2E6B7F]` / `text-[#2E6B7F]` | Sea-blue accent (reserved) |
| `charcoal` | `#2D2D2D` | `bg-[#2D2D2D]` / `text-[#2D2D2D]` | Body text |
| `muted` | `#8A8580` | `bg-[#8A8580]` / `text-[#8A8580]` | Secondary text, inactive states |

**Important:** In code, colors are applied as Tailwind arbitrary values (`bg-[#1A1A2E]`) rather than semantic class names. When translating from Figma, map Figma color variables to these hex values.

**Opacity patterns:**
- White text on dark: `text-white/70`, `text-white/60`, `text-white/50`
- Dark overlays: `bg-[#1A1A2E]/80`, `bg-[#1A1A2E]/60`
- Subtle borders: `border-[#C5A55A]/30`, `border-white/20`
- Badge backgrounds: `bg-[#C5A55A]/10`

### Spacing

Uses Tailwind's default spacing scale. Common values:
- Section padding: `py-24` to `py-32`
- Container horizontal padding: `px-6`
- Card gaps: `gap-6` to `gap-8`
- Section internal gaps: `gap-12` to `gap-16`

### Container

Universal layout constraint:
```
max-w-7xl mx-auto px-6
```
This is the standard content container used across all sections (equivalent to a 1280px max-width centered layout with 24px side padding).

---

## 2. Typography

### Font Families

| Role | Font | Weights | Tailwind / Style |
|---|---|---|---|
| Display / Headings | Cormorant Garamond | 300, 400 | `style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}` |
| Body | Outfit | 300, 400, 500 | `style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}` |

Fonts are loaded via Google Fonts `@import` in `globals.css` and preconnected in `layout.tsx`.

### Type Scale

| Element | Size Pattern | Weight | Notes |
|---|---|---|---|
| Hero headline | `clamp(4rem, 12vw, 8rem)` via inline style | 300 | Cormorant Garamond, light weight |
| Page title (h1) | `text-5xl sm:text-6xl lg:text-7xl` | 300 | Cormorant Garamond |
| Section heading (h2) | `text-4xl lg:text-6xl` or `text-5xl lg:text-6xl` | 300–400 | Cormorant Garamond |
| Subsection heading (h3) | `text-2xl lg:text-3xl` | 400 | Cormorant Garamond |
| Eyebrow label | `text-[10px]` or `text-[11px]`, uppercase | 500 | Outfit, `tracking-[0.35em]` |
| Body text | `text-base lg:text-lg`, `leading-relaxed` | 300–400 | Outfit |
| Small/meta text | `text-xs` or `text-sm` | 400 | Outfit |
| Stat numbers | `text-3xl sm:text-4xl lg:text-5xl` | 300 | Cormorant Garamond |

### Typography Accent Pattern

Gold italic accent is a signature pattern:
```jsx
<em style={{ fontStyle: 'italic', color: '#C5A55A' }}>highlighted word</em>
```
Used within headings for emphasis.

---

## 3. Component Architecture

### Directory Structure

```
src/components/
  layout/          — Navigation.tsx, Footer.tsx
  sections/        — Home page section components (one per section)
  ui/              — Reusable feature components (Gallery, Booking, etc.)
  three/           — Reserved for 3D components (currently empty)
```

### Component Conventions

- All interactive components use `'use client'` directive
- Props typed with inline `interface Props { ... }`
- Content data imported from `@/data/villa` (typed constants in `src/data/villa.ts`)
- No component library — all components are custom-built
- No barrel exports — each component imported by its full path

### Reusable Design Primitives

**Eyebrow Label:**
```jsx
<div className="flex items-center gap-3">
  <div className="w-12 h-px bg-[#C5A55A]" />
  <span className="text-[11px] tracking-[0.35em] uppercase text-[#C5A55A]"
        style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500 }}>
    LABEL TEXT
  </span>
</div>
```

**Gold Line Divider:**
```jsx
<div className="w-12 h-px bg-[#C5A55A]" />
```

**Corner Bracket Motif (on image cards):**
```jsx
<div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-[#C5A55A]" />
<div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-[#C5A55A]" />
```

---

## 4. Animation System (Framer Motion)

### Standard Scroll Reveal

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
```

### Project-Wide Custom Easing

```
[0.22, 1, 0.36, 1]
```
A luxury ease-out deceleration curve used consistently throughout the site.

### Parallax Scrolling

```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
```

### Staggered Reveals

```jsx
transition={{ delay: index * 0.1 }}
```

### Mouse-Tracked Parallax

```jsx
const mouseX = useMotionValue(0);
const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
```

### Hover Interactions

- Image zoom: `hover:scale-105` or `hover:scale-110` with `transition-transform duration-700`
- Color transitions: `transition-colors duration-200`
- General: `transition-all duration-300`

---

## 5. Styling Approach

### Methodology: Tailwind CSS v4 (Utility-First)

- No CSS Modules, no CSS-in-JS, no styled-components
- All styling via Tailwind utility classes + inline `style` props for fonts
- Tailwind v4 configured via `@tailwindcss/postcss` (no `tailwind.config.js`)
- Tokens registered in `globals.css` via `@theme inline {}`

### Responsive Breakpoints (Mobile-First)

| Prefix | Width | Usage |
|---|---|---|
| (none) | 0+ | Mobile base styles |
| `sm:` | 640px | Mobile landscape / small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Rarely used |

Pattern: vertical stacking on mobile → horizontal grids on desktop.

### Common Layout Patterns

- **Split layout:** `grid grid-cols-1 lg:grid-cols-2 gap-12`
- **3-column grid:** `grid grid-cols-1 md:grid-cols-3 gap-6`
- **Full-bleed section:** No container, `w-full` with background
- **Aspect ratios:** `aspect-[4/3]`, `aspect-[4/5]`, `aspect-[16/9]`

---

## 6. Image Handling

### Current Approach

- All images from Unsplash via direct URLs
- `<img>` tags (not `next/image`) with ESLint suppression
- Pattern: `https://images.unsplash.com/photo-{ID}?w={width}&q={quality}`
- Hero images: `w=1800` or `w=2000`, `q=80`
- Card images: `w=800` or `w=1000`, `q=80`
- `loading="eager"` on hero/above-fold images
- Images wrapped in `overflow-hidden` containers for hover zoom effects

### Image Styling Pattern

```jsx
<div className="relative overflow-hidden aspect-[4/3]">
  <img
    src="..."
    alt="Descriptive alt text"
    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
  />
  {/* Optional overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/60 to-transparent" />
</div>
```

---

## 7. Icon System

No icon library. Icons are implemented as:

| Type | Examples | Usage |
|---|---|---|
| Unicode symbols | `◈` `★` `→` `←` `✓` `✕` | List markers, navigation, status |
| CSS constructs | Gold lines (`w-12 h-px bg-[#C5A55A]`), corner brackets | Decorative elements |
| Text abbreviations | `IG`, `FB`, `TK` | Social links in footer |

When translating Figma icons, convert to inline SVG or Unicode equivalents matching this pattern.

---

## 8. Data Architecture

All content lives in `src/data/villa.ts` as typed TypeScript constants:

```typescript
// Apartments, reviews, amenities, villa info — all typed and exported
export const apartments: Apartment[] = [...]
export const reviews: Review[] = [...]
export const villaInfo: VillaInfo = {...}
```

When adding new sections from Figma designs, add corresponding data types and constants to this file.

---

## 9. Figma-to-Code Translation Rules

1. **Map Figma colors** to the hex values in the token table above — use arbitrary Tailwind values (`bg-[#hex]`)
2. **Map Figma fonts** → Display/headings = Cormorant Garamond (300/400), Body = Outfit (300/400/500)
3. **Respect the eyebrow label pattern** for section headers: gold line + uppercase tracked small text
4. **Use Framer Motion** for any animated elements — standard scroll reveal as default
5. **Use the `[0.22, 1, 0.36, 1]` easing** for all motion transitions
6. **Keep the `max-w-7xl mx-auto px-6` container** pattern for content sections
7. **Maintain mobile-first responsive** — design for mobile, add `sm:`, `md:`, `lg:` for larger screens
8. **No external icon libraries** — use Unicode, inline SVG, or CSS constructs
9. **`'use client'`** directive on any component with state, effects, or event handlers
10. **Add corner bracket motifs** on image cards where the Figma design shows decorative framing
