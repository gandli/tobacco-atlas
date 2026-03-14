# Feed Page Alignment Design

## Summary

This change aligns the `brands`, `manufacturers`, and `feed` pages to a shared UI/UX language while reshaping `feed` into a real community activity stream inspired by `https://www.ciggies.app/feed`.

The goal is not to make all three pages identical. The goal is to make them feel like they belong to the same product family:

- shared page width, spacing, and header rhythm
- shared surface treatment for controls and content blocks
- shared mobile and desktop reading cadence
- page-specific content models that remain appropriate to each page

## Problems

The current pages diverge in ways that make the product feel fragmented:

- `brands` is a compact archive directory with a simple local search and grid
- `manufacturers` uses a heavier dashboard-like card system with form controls and larger card chrome
- `feed` is currently a signed-out collection placeholder rather than a true community activity stream

The result is inconsistent hierarchy, density, and intent.

## Design Goals

1. Make the three pages feel visually related without flattening their purpose.
2. Turn `feed` into a lightweight activity stream rather than an empty-state panel.
3. Keep the implementation incremental and compatible with the current codebase.
4. Preserve bilingual support and mobile responsiveness.

## Shared UX Language

The three pages will share:

- a common content width and top spacing
- a common page header component with eyebrow, title, subtitle, and optional action slot
- a common rounded surface treatment for filters, list containers, and supporting blocks
- softer borders and restrained shadow usage
- a consistent typography ladder for page titles, supporting copy, and metadata

The shared visual direction is:

- editorial rather than dashboard-heavy
- archive-like rather than marketing-heavy
- readable on mobile first, but polished on desktop

## Page-by-Page Strategy

### Brands

`brands` remains a directory page.

It keeps:

- region tabs
- search
- brand grid

It changes:

- header moves to the shared page header component
- tabs/search shift into a unified surface row
- section label and result count adopt the same metadata styling used by the other pages
- grid cards keep their current purpose but inherit more restrained spacing and border behavior

### Manufacturers

`manufacturers` remains a directory page, but becomes visually closer to `brands`.

It keeps:

- search
- region filter
- sort control
- manufacturer cards

It changes:

- header moves to the shared page header component
- search and filters sit inside a shared control surface
- cards lose some dashboard heaviness and align with the archive language used elsewhere
- stats and empty-state positioning match the layout rhythm used by `brands`

### Feed

`feed` becomes a true community activity stream.

It removes:

- the signed-out dashboard card
- collection summary counters as the primary content
- the large empty-state framing

It adds:

- a lightweight editorial header
- a single-column activity stream
- compact activity items with:
  - avatar
  - activity glyph (`◇`, `✓`, `★`)
  - username
  - action verb
  - product name in zh/en mixed display
  - relative timestamp

The stream will use local mock data first so the page can be implemented without waiting for a backend.

## Component Plan

### New shared components

- `CollectionPageHeader`
  - shared eyebrow/title/subtitle/action layout for these listing pages
- `CollectionPageSurface`
  - shared rounded surface wrapper for controls and content sections
- `FeedActivityList`
  - stream container
- `FeedActivityItem`
  - single activity row

### Data additions

- `src/data/feed-activity.ts`
  - local feed event data with usernames, avatars, actions, product names, timestamps, and links

## Copy and i18n

`feed` needs revised copy to match the new activity-stream structure.

Add or revise keys for:

- page eyebrow/title/subtitle
- section label
- action verbs
- timestamp helpers if needed

The brand and manufacturer pages can mostly reuse existing copy.

## Testing

Add or update tests to confirm:

- `feed` renders activity items instead of the old signed-out dashboard
- action types and usernames are visible
- shared headers still render translated copy on `brands` and `manufacturers`
- the new route-level behavior remains unaffected

## Implementation Scope

This iteration includes:

- shared alignment work for `brands`, `manufacturers`, and `feed`
- feed activity stream redesign with mock data
- updated tests and locale strings

This iteration does not include:

- backend-driven feed data
- interaction features like liking or filtering feed items
- full pixel-perfect implementation of every tiny source-site detail

The visual direction will be high-fidelity to the source while still fitting the established tobacco-atlas design system.
