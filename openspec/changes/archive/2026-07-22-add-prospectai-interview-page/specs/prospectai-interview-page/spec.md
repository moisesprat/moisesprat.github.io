## ADDED Requirements

### Requirement: Standalone interview page
The system SHALL provide a standalone static HTML page (`prospectai-interview.html`) containing the full ProspectAI author interview content (title, byline, all question/answer pairs, and closing disclaimer), independently reachable by direct URL without requiring the homepage to be loaded first.

#### Scenario: Page loads directly
- **WHEN** a visitor navigates directly to `prospectai-interview.html`
- **THEN** the page renders the interview title, byline, all Q&A pairs, and the closing disclaimer without errors

### Requirement: Consistent design system
The interview page SHALL reuse the existing "Paper & Code" design system (`styles.css`, fonts, header/nav, footer, cookie banner) so it is visually consistent with the rest of the site.

#### Scenario: Shared stylesheet and script are loaded
- **WHEN** the interview page is loaded
- **THEN** it references the same `styles.css` and `js/main.js` files used by `index.html`, and renders the same header/nav and footer markup

#### Scenario: Navigation links back to homepage sections
- **WHEN** a visitor clicks a nav link (e.g., "Professional", "Research") on the interview page
- **THEN** the browser navigates to the corresponding section of the homepage (`index.html#<section>`)

### Requirement: Link from ProspectAI project card
The ProspectAI project card in the homepage `#research` section SHALL include a link to the interview page, tracked with a GA4 event consistent with the existing `data-track` taxonomy.

#### Scenario: Interview link is present and tracked
- **WHEN** the ProspectAI project card renders on the homepage
- **THEN** its `.project-links` row contains a link to `prospectai-interview.html` with attribute `data-track="project_link:prospectai_interview"`

### Requirement: Structured data for the interview page
The interview page SHALL include a JSON-LD `@graph` with an `Article` (or `BlogPosting`) node whose `author` references the same `Person` entity used on the homepage, and whose `about`/`mentions` references the ProspectAI `SoftwareApplication` entity, using matching `@id` values.

#### Scenario: JSON-LD present and linked to Person/SoftwareApplication
- **WHEN** the interview page's `<head>` JSON-LD is parsed
- **THEN** it contains an `Article`/`BlogPosting` node with `headline`, `url`, `author` (referencing the Person `@id` used in `index.html`), and `about`/`mentions` (referencing the ProspectAI `SoftwareApplication` `@id` used in `index.html`)

### Requirement: On-page SEO metadata
The interview page SHALL include a unique `<title>`, meta description, canonical URL, and Open Graph/Twitter meta tags describing the interview content.

#### Scenario: Head contains SEO tags
- **WHEN** the interview page's `<head>` is parsed
- **THEN** it contains a `<title>` distinct from the homepage's title, a `<meta name="description">` summarizing the interview, a `<link rel="canonical">` pointing to the interview page's own URL, and `og:title`/`og:description`/`og:url` meta tags

### Requirement: Sitemap entry
The interview page SHALL be listed in `sitemap.xml` with a `<lastmod>` date.

#### Scenario: Sitemap includes the new page
- **WHEN** `sitemap.xml` is inspected
- **THEN** it contains a `<url>` entry whose `<loc>` points to the interview page's canonical URL and includes a `<lastmod>` date

### Requirement: Visual and responsive consistency
The interview page SHALL be responsive on mobile viewports and readable as long-form content, matching the layout conventions of other text-heavy sections on the site.

#### Scenario: Page renders correctly on mobile
- **WHEN** the interview page is viewed on a narrow viewport (e.g., 375px wide)
- **THEN** the content remains within a single readable column, with no horizontal overflow, and the mobile nav hamburger drawer functions as on the homepage
