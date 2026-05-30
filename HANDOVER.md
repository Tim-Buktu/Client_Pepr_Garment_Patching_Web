# Pe-Pr Redesign — Handover

Full-site redesign of a custom fashion brand (custom pants + upcycle/patch service).
Pick up from here in a new chat. Read everything before touching any file.

---

## Stack

- **Next.js 15** App Router · TypeScript · Tailwind CSS v3
- **Auth:** NextAuth v4 + Prisma adapter (PostgreSQL)
- **DB:** Prisma + PostgreSQL (via Docker)
- **Uploads:** UploadThing
- **UI base:** Shadcn/UI (partially adopted — being replaced)

Run with: `npm run dev` → `http://localhost:3000`

`.env.local` exists with `NEXTAUTH_SECRET` and `NEXTAUTH_URL` for local dev.
Database env vars (`DATABASE_URL`, `POSTGRES_URL_NON_POOLING`) are NOT set —
DB-dependent features (profile, orders) won't work locally without them.

---

## Approved Design System

**File:** `app/tokens.css` (imported in `app/layout.tsx` before `globals.css`)

### Palette — full monochrome, no color
```
--color-black:    #0a0a0a
--color-white:    #fafafa
--color-gray-50 → gray-900  (9-step scale)
```
No burgundy. No blue. No gradients. Everything is black/white/gray.

### Fonts (Option A — approved)
- **Display/headlines:** Fraunces (variable optical serif, Google Fonts)
  - loaded via `next/font/google` as `--font-fraunces`
- **Body/UI:** Geist Sans (local woff at `app/fonts/GeistVF.woff`)
  - loaded via `next/font/local` as `--font-geist`
- **Mono/specs/prices:** Geist Mono (local woff at `app/fonts/GeistMonoVF.woff`)
  - loaded via `next/font/geist-mono` as `--font-geist-mono`
- CSS vars: `--font-display`, `--font-body`, `--font-mono` resolve via the Next.js variables

### Type scale (CSS vars, rem)
`--text-xs` (0.75) → `--text-sm` (0.875) → `--text-base` (1) → `--text-lg` (1.125) →
`--text-xl` (1.25) → `--text-2xl` (1.5) → `--text-3xl` (2) → `--text-4xl` (2.75) → `--text-5xl` (4)

### Spacing — 4px base unit
`--space-1` (0.25rem) through `--space-20` (5rem)

### Border radius
```
--radius-sharp: 2px     ← inputs, buttons, config controls
--radius-soft:  8px     ← cards, panels, modals
--radius-pill:  9999px  ← nav CTA, tags
```
Tailwind aliases: `rounded-sharp`, `rounded-soft`, `rounded-pill`

### Motion (for Step 5)
```
--duration-fast: 150ms  --ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--duration-base: 250ms  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
--duration-slow: 400ms  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Tailwind config
`tailwind.config.ts` — colors are hardcoded to match tokens (so opacity modifiers work):
`black: '#0a0a0a'`, `white: '#fafafa'`, `gray-50` through `gray-900`.
Font families: `font-display`, `font-body`, `font-sans`, `font-mono`.

---

## Aesthetic Direction

**References:** Linear.app · Teenage Engineering · Figma.com
- Precision, restraint, confidence
- Fashion brand that also feels like a software product
- No decorative elements — layout and typography do the work
- Every interactive element shows all options simultaneously (no hidden states)
- Motion is minimal: 200–300ms, ease-out, no scroll-jacking

---

## Files Created / Modified

### Infrastructure
| File | Status | Notes |
|---|---|---|
| `app/tokens.css` | ✅ Created | All design tokens |
| `app/globals.css` | ✅ Rewritten | Clean base styles, Tailwind directives |
| `app/layout.tsx` | ✅ Updated | Fraunces + Geist + Geist Mono fonts |
| `tailwind.config.ts` | ✅ Updated | Monochrome palette, font families, radius tokens |
| `types/next-auth.d.ts` | ✅ Updated | Added `image?: string \| null` to Session/User types |
| `.env.local` | ✅ Created | NEXTAUTH_SECRET + NEXTAUTH_URL for local dev |

### Layout shells
| File | Status | Notes |
|---|---|---|
| `components/layout/nav-shell.tsx` | ✅ Created | Skeleton nav — only used during Step 3 skeleton phase |
| `components/layout/page-shell.tsx` | ✅ Created | `<main>` wrapper: `min-h-screen bg-white pt-16 font-body` |
| `components/layout/section-shell.tsx` | ✅ Created | `py-20` sections with `tinted`/`dark` variants + `label` prop |

### Components — built
| File | Status | Notes |
|---|---|---|
| `components/navigation.tsx` | ✅ Rebuilt | Desktop nav + auth state; imports MobileMenu |
| `components/mobile-menu.tsx` | ✅ Rebuilt | Full-screen Fraunces overlay, body scroll lock |
| `components/hero-section.tsx` | ✅ Rebuilt | Centered Fraunces headline + image strip at bottom |
| `components/product-card.tsx` | ✅ Created | `ProductCard` + `ProductGrid`; whole card is a Link |
| `components/pants-configurator.tsx` | ✅ Rebuilt | Segmented controls, fabric swatches, live BMI, sticky preview |
| `components/ui/button.tsx` | ✅ Updated | Shadcn tokens removed; uses black/white/gray |

### Pages — built
| File | Status | Notes |
|---|---|---|
| `app/page.tsx` | ✅ Updated | Nav + Hero real; Features/Customization/Footer still skeleton |
| `app/products/page.tsx` | ✅ Rebuilt | Catalog grid + UGC section + designer templates |
| `app/custom/page.tsx` | ✅ Updated | Uses PageShell + PantsConfigurator |
| `app/about/page.tsx` | ✅ Created | Stub (skeleton) — needs real content in Step 4.5 |

### Data
| File | Status | Notes |
|---|---|---|
| `lib/products.ts` | ✅ Created | `PRODUCTS` array + `Product` type |

### Not yet touched (still old code/styles)
- `components/upcycle-configurator.tsx` — uses old burgundy classes; functional but unstyled
- `app/upcycle/page.tsx` — renders but old layout
- `app/contact/page.tsx` — renders but old layout + blue accents
- `app/checkout/page.tsx` — renders but old layout + blue accents
- `components/footer.tsx` — still old; not mounted on any page yet
- `app/login/page.tsx` + `app/register/page.tsx` — functional, old style

---

## Step Progress

### ✅ Step 1 — Audit (done, no code written)
Full audit delivered in conversation: structure, design critique, technical debt.

### ✅ Step 2 — Design system (approved)
Tokens proposed and approved. Option A fonts (Fraunces + Geist) selected.

### ✅ Step 3 — Layout shells
Infrastructure written. Skeleton homepage demonstrated structure/rhythm.

### ✅ Step 4.1 — Navigation
Desktop + mobile complete. Mobile = full-screen Fraunces overlay.
Nav links: Products `/products`, Upcycle `/upcycle`, About `/about`, Contact `/contact`.
CTA: "Customize" → `/custom`.

### ✅ Step 4.2 — Hero section
Centered editorial layout. Fraunces `text-5xl`→`text-7xl`.
Three-image strip at bottom (`catalog-1.jpg`, `catalog-2.jpg`, `catalog-3.jpg`).

### ✅ Step 4.3 — Product card + grid
`ProductCard`: whole card is a Link, `aspect-[3/4]` image, `scale-[1.03]` hover.
Tag badge: `bg-black font-mono text-[9px] tracking-widest uppercase`.
Price: Geist Mono right-aligned. "Customize →" secondary text below.
Products page: catalog → UGC `#PEoplePRoject` → designer `#PErfectPRoject`.

### ✅ Step 4.4 — Configurator UI
`PantsConfigurator` fully rebuilt:
- Left: sticky preview panel (`bg-gray-50`, `aspect-[3/4]`), live config summary
- Fabric: 2×2 image swatch grid, `border-2 border-black` selected state
- Volume/Cut/Button: segmented controls (selected = `bg-black text-white`)
- Measurements: two inputs, BMI calculates live (no button)
- Cost breakdown: specs table with Geist Mono numbers
- Buy CTA: `rounded-sharp`, price baked into label

### 🔲 Step 4.5 — About page (NEXT)
`app/about/page.tsx` is a stub. Needs real content:
- Brand story (4th-generation Bandung tailors, premium fabrics from brands like Zara)
- Stats/highlights (founding year, tailor generations, fabric sources)
- A fabric/process image
- Team or founder section (optional)
- Suggested layout: editorial split (large Fraunces heading, body copy, image)

### 🔲 Step 4.6 — Contact page
`app/contact/page.tsx` still has old layout with blue accents (`bg-blue-50`).
Needs rebuilding with:
- PageShell + Navigation
- No blue — use gray-50 for card backgrounds
- Three contact cards: Location, Email, Phone
- Clean inputs/forms in design system style

### 🔲 Step 4.7 — Footer
`components/footer.tsx` exists (old version, not mounted anywhere).
Footer skeleton exists on homepage. Needs real content:
- Brand column: "Pe-Pr" wordmark + brief tagline + social links
- Links columns: Products, Upcycle, About, Contact; Custom, Upcycle
- Contact column: email + phone
- Bottom bar: copyright + legal links
- Mount on ALL pages that use PageShell

### 🔲 Step 4 remaining — Upcycle page
`app/upcycle/page.tsx` + `components/upcycle-configurator.tsx` still old.
Same configurator redesign pattern as pants: sticky preview, explicit controls.
The drag-and-drop patch mechanic should be preserved — it's a genuine differentiator.

### 🔲 Step 5 — Motion and polish (last)
Only after all structure is approved:
- Nav: `backdrop-blur` + border fade on scroll (using `scrollY` in useEffect)
- Mobile menu: slide-in from right or fade (currently instant)
- Product card image: already has `transition-transform duration-500` ✓
- Configurator: image crossfade when switching configs
- Page transitions (optional, careful — no scroll-jacking)
- Hero: subtle entrance animation on headline
- All hover states audit

---

## Key Design Decisions Made

1. **Full monochrome** — zero color. Burgundy completely removed.
2. **Fraunces for display** — editorial quality at large sizes; Geist for body/UI precision.
3. **Hero layout** — centered text + 3-image strip (not split-panel; portrait product images cropped badly in a tall column).
4. **Segmented controls** — binary options show all choices at once; no chevron cycling.
5. **Whole product card is a link** — works on mobile, no hover dependency.
6. **`rounded-sharp` for transactional buttons** — pill only for nav CTA and tags.
7. **`SectionShell`** — consistent `py-20` vertical rhythm across all sections.
8. **Monospaced eyebrow labels** — `font-mono text-[10px] tracking-widest uppercase text-gray-400` used consistently as section markers.

---

## Known Issues / Watch-outs

- `next.config.js` and `next.config.ts` both exist — `.js` is canonical, `.ts` is dead weight.
- `lib/auth.ts` has a pre-existing TypeScript error (suppressed by `ignoreBuildErrors: true`).
- `contexts/AuthContext.tsx` and `contexts/auth-context.tsx` both exist — one may be unused.
- `components/configurator.tsx` is a dead generic placeholder — safe to delete.
- `components/features.tsx`, `catalog.tsx`, `customization.tsx` are unused dead components.
- The About nav link previously pointed to `/` — now correctly points to `/about`.
- BMI-based pricing on the configurator is opaque to users (price changes without explanation until BMI is entered). Worth noting in the About/FAQ.
- `PUBLIC/pants-config/final/*.png` — 32 pre-rendered pants configuration images exist; the configurator uses them via filename key (`fabricId-volumeId-cutId-buttonId.png`).

---

## How the Configurator Image System Works

Config IDs map to image filenames:
- Fabric: linen=1, nylon=2, twill=3, satin=4
- Volume: wide=1, pencil=2
- Cut: middle=1, 2-line=2
- Button: button=1, hook=2

Image path: `/pants-config/final/{fabric}-{volume}-{cut}-{button}.png`
Example: linen + wide + middle + button → `/pants-config/final/1-1-1-1.png`
All 32 combinations exist in `public/pants-config/final/`.

---

## Conversation Context for New Chat

Tell the new chat:

> "We're redesigning a fashion brand site called Pe-Pr. The design system is approved (full monochrome, Fraunces + Geist fonts). Steps 1–4.4 are complete. Read HANDOVER.md at the project root for everything you need. Continue from Step 4.5 (About page). The design aesthetic is Linear.app × Teenage Engineering × Figma — precision, restraint, no decoration. Follow the same patterns already established: PageShell wrapper, SectionShell sections, monospaced eyebrow labels, Fraunces display headlines, segmented controls for binary choices."

The project is at: `/Users/timothys/Downloads/TSTPepr-main`
