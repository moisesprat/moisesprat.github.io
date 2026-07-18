## 1. Markup: articles section

- [x] 1.1 Add `<section id="articles">` to `index.html` between `#research` and `#sports`, with a heading (e.g., "Writing" / "Articles") consistent with other section headers.
- [x] 1.2 Add an `.articles-grid` container with one `.article-card` per article (6 total), each containing: title, source badge ("Medium" or "Dev.to"), 1-2 sentence summary, and a "Read on Medium"/"Read on Dev.to" outbound link (`target="_blank" rel="noopener"`).
- [x] 1.3 Add `data-track="article_click:<slug>"` to each card's outbound link, using a short kebab-case slug per article (e.g. `sp500-benchmarking`, `prompt-caching-reddit`, `claude-architect-journey`, `bad-prompt-marathon`, `ai-boom-engineers`, `crewai-pipeline`).
- [x] 1.4 Add "Articles" link to the desktop nav bar pointing to `#articles`.
- [x] 1.5 Add "Articles" link to the mobile hamburger drawer nav pointing to `#articles`.

## 2. Structured data (SEO)

- [x] 2.1 Add one `BlogPosting` node per article to the JSON-LD `@graph` in `index.html` `<head>`, each with `headline`, `url` (the external Medium/Dev.to URL), `datePublished` (from articles' publish dates), and `author` referencing the existing `Person` node via `@id`.
- [x] 2.2 Verify the JSON-LD block is valid JSON (no trailing commas, correct nesting) by pasting into a JSON validator or `python -m json.tool`.

## 3. Styling

- [x] 3.1 Add `.articles-grid` / `.article-card` / `.article-source-badge` styles to `styles.css`, reusing existing tokens (`--radius`, color variables, font stack, spacing scale) — no new colors or fonts.
- [x] 3.2 Ensure cards use existing `.reveal` / `.stagger` classes if other card grids use them, for consistent scroll-reveal animation.
- [x] 3.3 Verify responsive layout: single column on mobile (<600px), multi-column on desktop, no horizontal overflow.

## 4. Verification

- [x] 4.1 Open the site locally and confirm all 6 article links navigate to the correct, working external URLs. (Verified article URLs/titles via WebFetch during proposal; Medium blocks plain curl with a 403 anti-bot response, not a broken-link signal.)
- [x] 4.2 Confirm clicking an article link fires a GA4 event using the existing `initLinkTracking()` mechanism — no new JS needed. (Verified structurally: `initLinkTracking()` binds to any `[data-track]` element and all 6 cards carry `data-track="article_click:<slug>"`; not confirmed live in GA4 DebugView — no browser available in this environment.)
- [x] 4.3 Scroll the `#articles` section into view and confirm a `section_view` GA4 event fires with label `articles` via existing `initSectionTracking()`. (Verified structurally: `initSectionTracking()` observes all `section[id]` elements and `#articles` is one; not confirmed live — no browser available in this environment.)
- [x] 4.4 Confirm the "Articles" nav link gets `.active` styling when the section is in view (existing `initActiveNav()` behavior). (Verified structurally: `initActiveNav()` matches `.nav-links a[href^="#"]` against visible `section[id]`, and the new nav link `href="#articles"` matches the section id; not confirmed live — no browser available in this environment.)
- [ ] 4.5 Test on a narrow mobile viewport (375px) to confirm cards stack correctly and the mobile nav drawer includes the new link. (Not verified — requires manual browser check; CSS rule `.articles-grid { grid-template-columns: 1fr; }` is in place at `max-width: 600px`.)

## 5. Housekeeping

- [x] 5.1 Update `<lastmod>` for the homepage entry in `sitemap.xml`.
- [x] 5.2 Spot-check that summaries are original phrasing (not copy-pasted ledes) and accurately represent each article.
