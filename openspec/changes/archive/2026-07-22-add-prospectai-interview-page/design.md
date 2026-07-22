## Context

The site is a pure static single-page portfolio (`index.html` + `styles.css` + `js/main.js`, no build step, no framework). The `#research` section already has a ProspectAI project card with a `.project-links` row of outbound links (GitHub, PyPI, Architecture, Live System). The `#articles` section links out to Medium/Dev.to for long-form writing; none of that content lives on the domain itself. The interview text is a Q&A format (title, subtitle/byline, ~13 question/answer pairs, closing disclaimer) supplied as Markdown at `/Users/Moises_Prat/Downloads/prospectai-interview.md`.

## Goals / Non-Goals

**Goals:**
- Publish the interview as a first-party, indexable HTML page on the same domain, so it contributes to SEO (unlike the Medium/Dev.to articles).
- Preserve the exact "Paper & Code" look and feel (same header/nav, fonts, colors, footer, cookie banner, dark hero-style treatment where appropriate).
- Link to it from the ProspectAI project card so it's discoverable in context.
- Make the page self-contained and crawlable without JS (progressive enhancement only, matching current site behavior).

**Non-Goals:**
- No CMS, templating engine, or build step — the page is hand-authored static HTML like `index.html`.
- No comment system, related-posts engine, or pagination.
- No changes to `styles.css` component structure beyond reusing existing classes (adding a small number of new page-scoped classes is acceptable if scoped narrowly, e.g. `.interview-*`, but existing article-card/section patterns should be reused first).
- Not modifying the `articles-section` spec or its Medium/Dev.to article list.

## Decisions

**1. Standalone static HTML page (`prospectai-interview.html`) at site root, not a route under a JS router.**
Rationale: matches the project's "pure static site, no framework" architecture (CLAUDE.md). A root-level `.html` file is directly served by GitHub Pages with a clean, stable URL (`https://moisesprat.io/prospectai-interview.html` or similar, matching existing conventions — no `/blog/` subfolder exists yet).
Alternative considered: hosting the interview as another Medium/Dev.to post — rejected because the explicit goal is first-party SEO signal, which off-site posts don't provide to moisesprat.io.

**2. Reuse the site header/nav and footer verbatim (copy from `index.html`), linking nav anchors back to `index.html#section`.**
Rationale: preserves "look and feel" exactly as requested; visitors landing on the interview via search can still navigate the full site. The nav's in-page anchor links (`#hero`, `#professional`, etc.) become `index.html#hero`, etc., since this page lives outside the SPA anchor structure.
Alternative considered: a stripped-down minimal header — rejected, user explicitly asked to preserve look and feel.

**3. Content markup: article/Q&A layout using existing typographic primitives (`.section-title`, `.serif-part`, `container`, paragraph styles) plus a small new scoped block for Q&A pairs (e.g., `.interview-qa` wrapping `.interview-question` / normal `<p>` for answers).**
Rationale: minimizes new CSS while giving the Q&A format enough visual structure (bold/serif question, indented or distinctly styled from answer) to read well long-form.

**4. Structured data: dedicated JSON-LD `@graph` on the interview page with an `Article` (or `BlogPosting`) node referencing existing `Person` (`@id` matching the one already defined in `index.html`) as `author`, plus `about`/`mentions` pointing to the ProspectAI `SoftwareApplication` node's `@id`.**
Rationale: strengthens topical/entity association between Moises Prat, ProspectAI, and this content for search engines — the core SEO ask. Reusing the same `@id` values as `index.html` (rather than redefining the Person/SoftwareApplication nodes fully) keeps the graph consistent; since the two pages are fetched independently, the interview page's JSON-LD must fully define `Person` and `SoftwareApplication` stub nodes with matching `@id` (search engines don't merge graphs across page loads, but consistent `@id`s aid entity disambiguation).

**5. Link placement: add a new link in the ProspectAI project card's `.project-links` row (`project_link:prospectai_interview`), not a new standalone card.**
Rationale: keeps the interview contextually tied to the project it's about, consistent with how GitHub/PyPI/Architecture/Live System links already work there.

**6. sitemap.xml: add one `<url>` entry for the new page** with a `<lastmod>` of the implementation date, following the existing manual-maintenance convention.

## Risks / Trade-offs

- [Content duplication risk: interview text also could be cross-posted to Medium later] → Not in scope now; if it happens, add rel="canonical" pointing to whichever is authoritative. For now the new page is the sole canonical source.
- [New page must stay in sync if header/nav/footer change in `index.html` later] → Accepted trade-off of a no-build static site; documented via a CLAUDE.md-style comment isn't required but keeping markup structurally identical minimizes drift risk.
- [Manual sitemap maintenance could be forgotten] → Task list explicitly includes the sitemap update step.

## Open Questions

- None blocking; final page URL slug assumed to be `prospectai-interview.html` at site root, consistent with other root-level HTML files.
