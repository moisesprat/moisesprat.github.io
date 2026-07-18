## Context

The site is a static, single-page portfolio (`index.html` + `styles.css` + `js/main.js`) with no build step, deployed straight to GitHub Pages. Other content sections (e.g. company logos, research/products) already use a card-grid pattern styled with the "Paper & Code" design tokens, and are wired into the existing GA4 event taxonomy via `data-track` attributes plus generic observers in `main.js`. Article content itself lives on Medium and Dev.to — the site only needs to reference it, not host or mirror it.

## Goals / Non-Goals

**Goals:**
- Add a static, hand-maintained list of article cards (title, source, short summary, outbound link) as a new `#articles` section.
- Reuse existing JS instrumentation (`initSectionTracking`, `initLinkTracking`, `initActiveNav`) with zero new functions.
- Add JSON-LD entries so search engines associate the articles with the `Person` node, improving personal-brand SEO.

**Non-Goals:**
- No RSS/API-based auto-sync with Medium or Dev.to (both articles lists are short and change infrequently; static HTML is simplest and matches the site's no-build-step philosophy).
- No full article content or reading view on-site — cards link out to the original platform.
- No pagination/filtering UI — 6 cards fit comfortably in a simple grid.

## Decisions

**1. Static HTML cards, manually maintained — not a JS-driven feed fetch.**
Alternative considered: fetch Medium/Dev.to RSS feeds client-side and render dynamically. Rejected because it adds runtime complexity (CORS proxying, fetch failure states) to a site whose CLAUDE.md explicitly says "no framework, no build step, no dependencies." Six articles is a small, slow-changing list — hardcoding in `index.html` is simpler and keeps content crawlable without JS execution (better for SEO).

**2. Section placement: after `#research`, before `#sports`.**
Matches the site's narrative arc (professional → research/products → writing → sports → contact) and groups the articles near the `#research` section since several articles are about ProspectAI/StrideIQ, the products showcased there.

**3. Reuse existing `data-track` + observer pattern instead of new JS.**
`initLinkTracking()` already generalizes over any `[data-track="event:label"]` element and `initSectionTracking()` over any section with an `id`. Adding article links/section requires zero changes to `js/main.js`. New event name `article_click` extends the existing taxonomy documented in CLAUDE.md.

**4. JSON-LD: add `BlogPosting` nodes to the existing `@graph`, each with `author` referencing the `Person` node by `@id`.**
Keeps a single structured-data graph (as CLAUDE.md instructs keeping JSON-LD in sync with visible HTML) rather than a separate script block, and lets Google's crawler directly connect authorship to the existing Person entity.

**5. Card styling: new `.articles-grid` / `.article-card` CSS classes, built from existing tokens (colors, `--radius`, spacing scale, font stack) rather than a new design pattern.**
Consistent with the project's single design system in `styles.css` `:root`.

## Risks / Trade-offs

- [Content goes stale as new articles are published] → Mitigation: this is a manual-update process consistent with how `sitemap.xml` and company logos are already maintained by hand; acceptable given low publishing frequency (~monthly).
- [Summaries duplicate/paraphrase Medium/Dev.to content] → Mitigation: summaries are short (1-2 sentences), original framing, and clearly link out to full content — standard practice, not full-text reproduction.
- [JSON-LD `BlogPosting` entries reference articles hosted elsewhere, which some validators flag as unusual] → Mitigation: this is standard practice for aggregator/portfolio pages; use `url` (not `mainEntityOfPage`) pointing to the external article to avoid implying the page hosts the canonical content.

## Migration Plan

Additive-only change to static files (`index.html`, `styles.css`, `sitemap.xml`); no data migration, no build step. Deploy via `git push origin main` per standard project deployment. Rollback is a straightforward revert commit if needed.
