# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Moises Prat (Data & AI Transformation Leader), hosted on GitHub Pages.
**Pure static site** — no framework, no build step, no dependencies.

## Deployment

```bash
git push origin main
```

GitHub Pages serves files directly from `main`. No build or compile step.

## Architecture

Single-page application (`index.html`) with anchor-based navigation. Vanilla HTML, CSS, and JS only.

Key files:
- `index.html` — all sections, structured data (JSON-LD), analytics scripts
- `styles.css` — complete design system (no CSS framework)
- `js/main.js` — all JavaScript (external file, vanilla, no ES modules)
- `assets/` — profile photos (WebP + PNG), CV PDF
- `assets/logos/` — (create this dir) drop company SVG/PNG logos here; see comment in `index.html` `.companies-grid`
- `sitemap.xml` — manually maintained; update `<lastmod>` when content changes

## Design System ("Paper & Code")

Defined in `styles.css` `:root`:
- **Accent blue:** `#1A56F0` — professional/AI sections
- **Accent green:** `#0EA66E` — sports/endurance sections
- **Background:** `#FFFFFF` / `#F9F9F9` (off-white for alt sections)
- **Dark sections:** `#0F0F0F` (hero, kpi strip, contact)
- **Max width:** 1160px
- **Border radius:** 12px
- **Fonts:** Syne (display/headings), Geist (body), Instrument Serif italic (accents), JetBrains Mono (code/diagrams) — Google Fonts

## JavaScript (`js/main.js`)

Plain vanilla JS, no modules. Functions:
1. `insertYear()` — dynamic copyright year (`#year`)
2. `initCookieBanner()` — localStorage `mp_cookie_consent`
3. `acceptCookies()` / `declineCookies()` — exposed on `window` for inline onclick
4. `initScrollReveal()` — IntersectionObserver on `.reveal` and `.stagger` elements
5. `initNavHamburger()` — mobile drawer toggle (`.nav-open` class on `<nav>`)
6. `initSectionTracking()` — fires `section_view` GA4 event once per section per page load
7. `initLinkTracking()` — fires GA4 events for `[data-track="event:label"]` links
8. `initActiveNav()` — adds `.active` class to nav link for visible section

## Analytics

- **GA4:** `G-GN75WJ31JM` — consent-aware (denied by default, granted on cookie accept)
- **SimpleAnalytics:** lightweight privacy-first analytics (no consent required)
- **Event taxonomy:** `data-track="event_name:label"` attributes on all tracked links
  - `nav_click:section` — navigation clicks
  - `link_click:linkedin|email|cv_download|github|cta_*` — contact/CTA links
  - `project_link:projectname_type` — project card links (github/demo/pypi)
  - `sports_link:ironman_results|strava_follow` — sports section links
  - `section_view:section_id` — automatic section visibility (IntersectionObserver)

## SEO & Structured Data

`index.html` `<head>` contains JSON-LD `@graph` with:
- `schema.org/Person` — Moises Prat profile
- `schema.org/SoftwareApplication` × 3 — RoadmapSnap, ProspectAI, StrideIQ

When updating professional content, keep JSON-LD in sync with visible HTML.
Update `<lastmod>` in `sitemap.xml` after significant content changes.

## Content Sections (anchor IDs)

`#hero` → `#professional` (contains `#companies`, `#kpis`) → `#research` → `#sports` → `#contact`

## Adding Company Logos

1. Create `/assets/logos/` directory
2. Add SVG (preferred) or PNG files: `aspentech.svg`, `cirsa.svg`, etc.
3. In `index.html`, inside each `.company-card`, replace the text node in `.company-name` with:
   ```html
   <img src="/assets/logos/aspentech.svg" alt="AspenTech" height="28">
   ```

## Adding the IRONMAN Nice Photo

1. Add `ironman-nice.jpg` (or `.webp`) to `/assets/`
2. In `index.html`, replace the `.sports-photo-placeholder` div with:
   ```html
   <div class="sports-photo">
     <img src="/assets/ironman-nice.jpg" alt="Moises Prat finishing IRONMAN Nice" width="300" height="400" loading="lazy">
   </div>
   ```

## License

CC BY-ND 4.0 — content may be shared with attribution, but no derivatives.
