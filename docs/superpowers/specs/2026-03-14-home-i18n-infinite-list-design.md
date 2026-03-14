# Home I18n And Infinite List Design

## Summary

This spec covers the next iteration of the App Router migration for the pages already running on Next.js:

- `/`
- `/brands`
- `/manufacturers`

The goal is to improve two user-facing behaviors together:

1. Stabilize Chinese and English language switching on the migrated Next.js pages.
2. Upgrade the home product section from a static first-screen slice to a skeleton-backed, demand-loaded infinite list.

This round does not expand into detail pages, new routes, or SEO-oriented locale routing.

## Goals

- Keep the current `react-i18next` setup and make it reliable for the migrated App Router pages.
- Ensure language switching persists across refreshes and route changes.
- Show a home skeleton experience that feels intentional rather than blank.
- Load home product cards in batches as the user scrolls, instead of rendering the full collection up front.
- Preserve current desktop and mobile layouts while reducing first-load rendering cost.

## Non-Goals

- Do not introduce locale-prefixed routing such as `/zh-CN` or `/en-US`.
- Do not migrate non-App Router pages in this round.
- Do not replace the existing translation system with a new library.
- Do not convert brand and manufacturer list pages into infinite lists.
- Do not redesign the visual language of the site beyond what is needed for loading and bilingual support.

## Current State

- The project already initializes `i18next` in [src/lib/i18n.ts](/Users/user/Documents/Playground/tobacco-atlas-web/src/lib/i18n.ts).
- Shared navigation and the homepage hero already consume translations through `react-i18next`.
- The home page currently renders a fixed featured slice and a secondary archive section from the static `products` dataset.
- Skeleton loading states were added for the migrated App Router pages in the previous round.

This gives us a working base, but the language experience is not yet fully normalized across the migrated pages, and the home product experience is still a bounded showcase rather than an exploratory scrolling flow.

## Recommended Approach

Continue using the existing `react-i18next` foundation and extend it into a stable App Router-compatible pattern for the pages already migrated. For the homepage, keep the page shell as a Server Component and move the scroll-driven product loading into a focused Client Component that receives the product dataset in a minimal shape.

This approach is recommended because it:

- reuses the current locale files and language switcher behavior
- avoids a disruptive routing rewrite
- improves perceived and actual loading without forcing a backend pagination layer
- keeps server and client responsibilities clear

## Alternative Approaches Considered

### 1. Next.js locale-prefixed routing now

This would align with a more canonical Next.js i18n structure, but it would force immediate changes to routing, linking, navigation state, and page metadata across a codebase that is still mid-migration.

Verdict: deferred.

### 2. Keep fixed home slices and only add translation work

This would reduce scope, but it would leave the homepage browsing experience shallow and would not address the user's request for demand-loaded product cards.

Verdict: insufficient.

### 3. Build a client-only home page with all data and all language logic in the browser

This would simplify implementation in the short term but would weaken the App Router architecture, increase hydration work, and make loading behavior less efficient.

Verdict: rejected.

## Architecture

### Language Layer

- Keep `i18next` as the active translation engine.
- Continue to initialize translations from [src/lib/i18n.ts](/Users/user/Documents/Playground/tobacco-atlas-web/src/lib/i18n.ts) through the existing provider chain.
- Normalize the migrated App Router pages to consume translations through the same namespaces and fallback rules.
- Keep language persistence in local storage through the current detector setup.

### Home Page Layer

- Keep [src/app/page.tsx](/Users/user/Documents/Playground/tobacco-atlas-web/src/app/page.tsx) as a Server Component.
- Move the home product stream into a dedicated Client Component that:
  - receives a pre-sliced array or compact product input
  - renders an initial batch immediately
  - appends additional batches when a sentinel enters the viewport
  - shows bottom-loading skeleton cards between batches
  - shows a localized end-of-list state when complete

### List Pages

- Keep `/brands` and `/manufacturers` as their current App Router page shells.
- Improve their translated text stability without changing their data display model.

## UI Behavior

### Home Skeleton

- The top-level home route skeleton continues to reserve space for:
  - top navigation
  - hero content
  - product grid
  - mobile bottom navigation spacing
- Inside the home product flow, skeletons are split into two phases:
  - initial grid skeleton before the first rendered batch appears
  - bottom append skeleton when the next batch is loading

This avoids a full-page blank state and reduces layout shift as content appears.

### Infinite List

- Initial batch size should be conservative and tuned for both desktop and mobile.
- Additional batches should load with `IntersectionObserver` instead of scroll listeners.
- Each batch should append predictably so the grid remains stable.
- Once all cards are rendered, the list should display a localized completion message instead of leaving an ambiguous end.

### Bilingual Content Rules

- UI chrome, controls, helper text, loading text, and end-state labels come from locale files.
- Product, brand, and manufacturer primary names stay in their source form.
- Descriptions or supporting text should prefer an English field when the current language is English.
- If an English field is missing, the UI should gracefully fall back to Chinese rather than display emptiness.

## Component Design

### New Or Updated Components

- `HomeProductStream` client component
  - owns visible-count state
  - manages the intersection observer
  - renders batch append skeletons
  - emits localized status text

- shared product-grid rendering support
  - updated to support progressive rendering without assuming a full dataset render

- optional translation helpers
  - small helper functions may be added to centralize fallback logic for bilingual fields

### Existing Components Affected

- [src/app/page.tsx](/Users/user/Documents/Playground/tobacco-atlas-web/src/app/page.tsx)
- [src/components/ProductGrid.tsx](/Users/user/Documents/Playground/tobacco-atlas-web/src/components/ProductGrid.tsx)
- [src/components/LanguageSwitcher.tsx](/Users/user/Documents/Playground/tobacco-atlas-web/src/components/LanguageSwitcher.tsx)
- [src/components/Navbar.tsx](/Users/user/Documents/Playground/tobacco-atlas-web/src/components/Navbar.tsx)
- [src/components/MobileNav.tsx](/Users/user/Documents/Playground/tobacco-atlas-web/src/components/MobileNav.tsx)
- migrated page modules for `/brands` and `/manufacturers`

## Data Flow

### Home Page

1. Server page imports product data.
2. Server page passes the home product dataset into the client stream component.
3. Client stream renders the first batch.
4. A sentinel near the bottom triggers the next batch load.
5. The stream appends until all cards are shown.
6. The stream shows a localized completion state.

### Language

1. App bootstraps `i18next`.
2. Current language is resolved from detector state.
3. Shared navigation and migrated pages read from the same language source.
4. User changes language in the switcher.
5. The current language updates and persists.
6. Visible translated UI re-renders without route mismatch.

## Error Handling And Fallbacks

- If the observer is unavailable, the home product stream should fall back to a simple "load more" interaction or eagerly reveal the next batch in a safe way.
- Missing English translation keys should fall back to the default translation language.
- Missing English data fields should fall back to Chinese source text.
- Empty product datasets should render a translated empty state rather than a broken grid.

## Performance Considerations

- Keep the page shell and first contentful structure on the server.
- Avoid hydrating large decorative or non-essential modules before the user sees the main content.
- Use `IntersectionObserver` to avoid expensive scroll event work.
- Only render the cards needed for the current visible batch.
- Avoid copying or transforming the full product dataset repeatedly in render loops.

## Testing Strategy

### Automated Tests

- translation-related tests
  - language switch updates key homepage and list-page labels
  - fallback logic works when English data is missing

- home product stream tests
  - initial visible count is correct
  - observer trigger appends the next batch
  - bottom loading skeleton appears during append
  - localized end-state renders when the dataset is exhausted

- route-level safety tests
  - `/`, `/brands`, `/manufacturers` render successfully under the App Router shell

### Verification Commands

- `bun run test`
- `bun run typecheck`
- `bun run lint`
- manual route checks against:
  - `/`
  - `/brands`
  - `/manufacturers`

## Acceptance Criteria

- The migrated App Router pages support stable Chinese and English switching.
- Language choice persists across refresh and route navigation.
- Homepage first load shows a structured skeleton instead of blank waiting.
- Homepage product cards render in batches and append as the user scrolls.
- The home list ends with a clear localized completion state.
- No new typecheck failures or lint errors are introduced.

## Risks

- `react-i18next` in an App Router environment can produce subtle hydration mismatches if server and client assumptions diverge.
- Intersection observer behavior in tests needs controlled mocking to remain stable.
- Large static product arrays can still create heavy payloads if too much data is passed into the client component.

## Risk Mitigations

- Keep translated UI ownership in client-safe components where needed.
- Minimize the shape of product data passed to the client stream.
- Add focused tests around language switching and observer-driven loading.
- Preserve existing route-level loading shells as a fallback layer.

## Rollout

1. Stabilize language behavior on the three migrated App Router pages.
2. Add the home product stream component with test coverage.
3. Replace the fixed secondary home section with observer-driven batch loading.
4. Verify desktop and mobile behavior.
5. Use the same bilingual patterns when migrating later routes.
