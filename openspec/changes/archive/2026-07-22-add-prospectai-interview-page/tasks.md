## 1. Scaffold the interview page

- [x] 1.1 Create `prospectai-interview.html` at the site root, copying the header (`<head>` boilerplate minus JSON-LD), nav, cookie-banner markup, and footer verbatim from `index.html`
- [x] 1.2 Rewrite nav anchor links on the new page to point to `index.html#<section>` instead of same-page anchors
- [x] 1.3 Include `styles.css` and `js/main.js` the same way `index.html` does, so shared behaviors (year insert, cookie banner, scroll reveal, nav hamburger, link tracking) work unchanged

## 2. Interview content

- [x] 2.1 Add a page-scoped `<section>` for the interview with title ("The best feedback I got was someone telling me my numbers were wrong"), subtitle/byline, and container width matching other content sections
- [x] 2.2 Render all Q&A pairs from `/Users/Moises_Prat/Downloads/prospectai-interview.md`, styling questions distinctly from answers (bold or serif question lead-in, e.g. new scoped classes `.interview-question` / `.interview-answer`) reusing existing typographic tokens (Syne/Geist/Instrument Serif) rather than introducing new fonts
- [x] 2.3 Render the closing disclaimer paragraph about ProspectAI being a technical demonstration, not investment advice, with a link to `https://prospect-ai.moisesprat.dev`
- [x] 2.4 Verify `.reveal`/`.stagger` scroll-reveal classes are applied consistently with the rest of the site

## 3. SEO metadata and structured data

- [x] 3.1 Add unique `<title>`, `<meta name="description">`, and `<link rel="canonical">` to the interview page's `<head>`
- [x] 3.2 Add Open Graph and Twitter Card meta tags (`og:title`, `og:description`, `og:url`, `og:type=article`, `twitter:card`) for the interview page
- [x] 3.3 Add a JSON-LD `@graph` with an `Article`/`BlogPosting` node (`headline`, `url`, `datePublished`, `author` referencing the existing `Person` `@id`, `about`/`mentions` referencing the ProspectAI `SoftwareApplication` `@id`), matching `@id` values used in `index.html`

## 4. Link from ProspectAI project card

- [x] 4.1 In `index.html`, add a new link inside the ProspectAI project card's `.project-links` row pointing to `prospectai-interview.html`, with `data-track="project_link:prospectai_interview"` and label such as "Read the Interview"

## 5. Sitemap and verification

- [x] 5.1 Add a `<url>` entry for `prospectai-interview.html` to `sitemap.xml` with today's date as `<lastmod>`
- [ ] 5.2 Open the new page locally and verify: header/nav/footer match `index.html` look and feel, nav links navigate to homepage sections, cookie banner and scroll-reveal animations work, mobile hamburger drawer works at a narrow viewport
- [ ] 5.3 Verify the new link on the ProspectAI card navigates to the interview page and fires the tracked GA4 event
- [x] 5.4 Validate JSON-LD (e.g., paste into a structured-data testing tool or manually check JSON parses and `@id` references match `index.html`)
