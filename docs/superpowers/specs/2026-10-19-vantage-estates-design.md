# Vantage Estates — Multi-Page Property Marketplace Demo — Design Spec

- **Date**: 2026-10-19
- **Type**: Portfolio demo (fictional brand) for PH real-estate market
- **Route**: multi-page static site, deployed on Vercel
- **Stack**: Next.js 15 App Router · TypeScript strict · Tailwind CSS · Framer Motion (`LazyMotion`) · `next/font`

## Brand & positioning

Vantage Estates is a modern Philippine property marketplace — condos, house-and-lot, townhouses,
lots and commercial spaces across **BGC, Makati, Alabang, Quezon City, Tagaytay, Cebu, Batangas and
Pampanga**. Crisp, trustworthy, data-forward. Prices in ₱, sizes in sqm.

- Palette: paper `#F7F8FA`, ink `#0B1220`, navy `#0E2A47`, emerald `#0F766E`, line `#E4E8EE`, amber
  `#D97706` for highlights.
- Type: **Sora** (display/UI) + **Inter** (body). Clean grid, 12 columns, sharp cards, subtle borders.
- Imagery: same curated architecture/interior set, optimized locally.

## Information architecture

| Route | Purpose |
|---|---|
| `/` | Hero with search (location/type/price → `/listings`), featured properties, stats, neighbourhoods, how-it-works, CTA |
| `/listings` | Search + filters (keyword, type, location, beds, max price), sort (newest, price), results count, grid, saved filter |
| `/properties/[slug]` | Gallery + lightbox, price/specs, amenities, description, agent card, map card, inquiry form, similar properties |
| `/agents` | 4 PH agents with areas + contact actions |
| `/contact` | Validated contact form + office info + hours |
| `404` | Themed not-found |

## Data (typed, local)

- 8 properties: BGC condo (₱18.5M), Makati penthouse (₱42M), Alabang house & lot (₱28M), Quezon City
  townhouse (₱9.8M), Tagaytay villa (₱22M), Cebu beach house (₱35M), Batangas lot (₱6.5M), Pampanga
  commercial (₱48M). Fields: slug, title, location, type, price, beds, baths, sqm, lot, year, images
  (3–4 each), amenities, description, featured, agentSlug.
- Helpers (unit tested): favorites parsing/persistence, `formatPeso`, filter/sort engine, inquiry
  validation.

## Interactions (must actually work)

- Live filtering + sort with URL query sync (`?q=&type=&location=&beds=&max=&sort=`), shareable links.
- Favorites (heart) persisted in `localStorage`, header badge, "Saved" filter.
- Gallery lightbox (keyboard arrows/Escape, focus trap).
- Inquiry + contact forms validate and show simulated success.
- Agent cards → mailto/contact with prefilled subject.
- Mobile filters drawer + sticky results bar; active filter chips with remove.
- Reduced-motion: no page/section transforms; content visible.

## Motion (Framer Motion)

`LazyMotion`; route transition via `template.tsx` (fade/slide), `AnimatePresence` + `layout` for
filter/grid re-ordering, card hover choreography, reveal-on-scroll, animated counters, lightbox
transitions, mobile drawer spring. Only transform/opacity.

## Technical

- Static SSG for all routes incl. `generateStaticParams` for 8 properties; `generateMetadata` per page;
  `sitemap.ts`, `robots.ts`, OG metadata, favicon.
- Images local `public/images/`; `next/image` with sizes; first hero image priority.
- A11y: landmarks, labels, focus-visible rings, focus traps, 44px targets, reduced motion.
- QA: build/typecheck/unit tests; QA matrix at 5 widths; E2E: filters/sort/saved persistence, lightbox,
  forms, mobile filters drawer, page transitions; Lighthouse ≥90 mobile / 100 a11y.
- Delivery: repo `chaze05/vantage-estates`, Vercel production URL, portfolio card.

## Non-goals

Real listings backend, payments, live maps, CMS, multi-language.
