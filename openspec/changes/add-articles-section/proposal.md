## Why

Moises has published 6 articles about AI, agentic systems, and their intersection with his work (ProspectAI, StrideIQ) and life (marathon training) on Medium and Dev.to, but none of them are linked from his portfolio site. Surfacing them as a dedicated section improves personal brand signal and gives search crawlers a clear on-site path connecting his name to this body of writing, boosting Google visibility.

## What Changes

- Add a new `#articles` section to `index.html`, positioned after `#research` and before `#sports` (fits the existing narrative flow: professional → research/products → writing → sports → contact).
- Add an "Articles" link to the nav bar (desktop + mobile hamburger drawer).
- Render each article as a card containing: title, source badge (Medium / Dev.to), short summary (2 sentences), and an outbound "Read on Medium/Dev.to" link that opens in a new tab.
- Add `data-track="project_link:article_<slug>"`-style attributes to each card link for GA4 tracking, consistent with existing event taxonomy.
- Add JSON-LD `BlogPosting` (or `Article`) entries to the existing `@graph` structured data block so crawlers can associate the articles with the `Person` entity via `author`.
- Update `sitemap.xml` `<lastmod>` for the homepage.
- Style the new section using existing design tokens in `styles.css` (no new framework, no new colors beyond existing accent blue/green).

## Capabilities

### New Capabilities
- `articles-section`: A new homepage section that lists external articles (Medium, Dev.to) as cards with title, summary, source, and outbound link, plus corresponding structured data for SEO.

### Modified Capabilities
(none — no existing spec covers site sections; this is additive)

## Impact

- `index.html`: new `<section id="articles">` markup, new nav link, new JSON-LD entries.
- `styles.css`: new `.articles-grid` / `.article-card` styles reusing existing design system (colors, radius, fonts).
- `js/main.js`: no new functions required — existing `initSectionTracking()`, `initLinkTracking()`, and `initActiveNav()` already generalize to the new section/links via `data-track` attributes and section IDs.
- `sitemap.xml`: `<lastmod>` bump.
- No build step, no new dependencies — pure static content addition.
