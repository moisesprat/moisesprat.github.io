## Why

Moises has a Q&A interview about ProspectAI's multi-agent architecture, public feedback loop, and evaluation methodology (source: `/Users/Moises_Prat/Downloads/prospectai-interview.md`). Publishing it as a standalone page on the portfolio domain (rather than only on Medium/Dev.to) creates first-party long-form content on moisesprat.io, earning additional SEO signal (indexable content, internal links, structured data) and giving the ProspectAI project card a deeper piece of content to link to.

## What Changes

- Add a new standalone HTML page, `prospectai-interview.html`, reusing the existing "Paper & Code" design system (`styles.css`, header/footer, nav) to preserve site look and feel.
- Render the full interview content (title, intro, Q&A pairs, closing disclaimer) as readable article markup on that page.
- Add a link from the ProspectAI project card in `#research` (index.html) to the new interview page, with GA4 click tracking consistent with existing `data-track` taxonomy.
- Add `Article`/`Person` JSON-LD structured data for the interview page (own `<script type="application/ld+json">`), referencing the existing `Person` entity for Moises Prat and the `SoftwareApplication` entity for ProspectAI.
- Add the new page to `sitemap.xml`.
- Add basic on-page SEO meta (title, description, canonical, Open Graph/Twitter tags) for the interview page.

## Capabilities

### New Capabilities
- `prospectai-interview-page`: A standalone, SEO-optimized interview page about ProspectAI's architecture and evaluation approach, linked from the ProspectAI project card, sharing the site's design system.

### Modified Capabilities
(none — no existing spec's requirements change; this only adds a new page and a new outbound link from the existing ProspectAI project card, which is not yet covered by a spec)

## Impact

- Affected files: new `prospectai-interview.html`, `index.html` (add link + tracking in ProspectAI project card), `sitemap.xml` (add `<url>` entry).
- No changes to `styles.css` or `js/main.js` are expected — the new page reuses existing classes/components and existing JS behaviors (`insertYear`, `initScrollReveal`, `initNavHamburger`, `initLinkTracking`, `initSectionTracking` where applicable) by including the same `<script src="js/main.js">`.
- No build step; deploy is `git push origin main` per project conventions.
