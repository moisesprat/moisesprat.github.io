## ADDED Requirements

### Requirement: Articles section on homepage
The system SHALL display an "Articles" section (`#articles`) on the homepage listing external articles written by Moises Prat, positioned between the `#research` and `#sports` sections.

#### Scenario: Section is present and reachable via navigation
- **WHEN** a visitor loads the homepage
- **THEN** an `#articles` section is present in the DOM and a corresponding "Articles" link exists in both the desktop nav and the mobile hamburger drawer, each pointing to `#articles`

### Requirement: Article card content
Each article SHALL be rendered as a card showing its title, source (Medium or Dev.to), a short (1-2 sentence) summary, and a link to read the full article on the original platform.

#### Scenario: Card displays required fields
- **WHEN** the articles section renders
- **THEN** each card shows the article title, a source badge/label identifying "Medium" or "Dev.to", a short summary text, and a "Read on Medium"/"Read on Dev.to" link

#### Scenario: Outbound link opens in new tab
- **WHEN** a visitor clicks an article card's read link
- **THEN** the original article opens in a new browser tab (`target="_blank"` with `rel="noopener"`) and the portfolio page remains open

### Requirement: All published articles are listed
The articles section SHALL list all 6 currently published articles: 5 from Medium and 1 from Dev.to, each linking to its correct URL.

#### Scenario: Every known article appears with correct link
- **WHEN** the articles section renders
- **THEN** it contains one card for each of the following URLs, with matching titles:
  - https://medium.com/@moissprat/why-i-stopped-benchmarking-my-ai-stock-picker-only-against-the-s-p-500-55b4c6085755
  - https://medium.com/@moissprat/how-an-unexpected-reddit-spike-forced-me-to-learn-prompt-caching-the-hard-way-09ab88d80bb5
  - https://medium.com/@moissprat/applying-lessons-learned-from-claude-certified-architect-journey-c0aceb8e3618
  - https://medium.com/@moissprat/how-a-bad-prompt-ruined-my-marathon-30d6ef7c692f
  - https://medium.com/@moissprat/why-software-engineers-are-the-most-underrated-beneficiaries-of-the-ai-boom-4701b865d8b9
  - https://dev.to/moisesprat/building-a-6-agent-investment-research-pipeline-with-crewai-378j

### Requirement: Article link click tracking
Each article card's outbound link SHALL carry a `data-track` attribute following the existing GA4 event taxonomy so clicks are measurable.

#### Scenario: Click fires tracked GA4 event
- **WHEN** a visitor clicks an article card's read link
- **THEN** the link element has a `data-track="article_click:<slug>"` attribute that the existing `initLinkTracking()` function picks up and reports to GA4

### Requirement: Section view tracking
The articles section SHALL be tracked by the existing section-visibility instrumentation.

#### Scenario: Section becomes visible
- **WHEN** the `#articles` section scrolls into the viewport
- **THEN** the existing `initSectionTracking()` logic fires a `section_view` GA4 event with label `articles`, without requiring new JavaScript functions

### Requirement: Structured data for articles
The homepage JSON-LD `@graph` SHALL include a structured data entry (e.g., `BlogPosting`) for each listed article, associated with the `Person` entity as author, to help search engines connect the articles to Moises Prat's profile.

#### Scenario: Each article has a JSON-LD entry
- **WHEN** the homepage `<head>` JSON-LD is parsed
- **THEN** it contains one `BlogPosting` (or equivalent `Article`) node per listed article, each with `headline`, `url`, and `author` referencing the existing `Person` node

### Requirement: Visual and responsive consistency
The articles section SHALL use the existing "Paper & Code" design system (colors, spacing, radius, fonts) and SHALL be responsive on mobile viewports, matching the layout conventions of other card-based sections on the site.

#### Scenario: Section renders correctly on mobile
- **WHEN** the homepage is viewed on a narrow viewport (e.g., 375px wide)
- **THEN** article cards stack in a single column, remain fully readable, and no horizontal overflow occurs
